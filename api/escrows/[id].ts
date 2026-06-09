import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE = () => `${process.env.SUPABASE_URL}/rest/v1`;
const KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY!;
const HDRS = () => ({ apikey: KEY(), Authorization: `Bearer ${KEY()}`, 'Content-Type': 'application/json', Prefer: 'return=representation' });

async function sbGet(table: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE()}/${table}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), { headers: HDRS() });
  const text = await res.text();
  return { data: text ? JSON.parse(text) : [], error: res.ok ? null : { message: text } };
}

async function sbPost(table: string, row: Record<string, any> | Record<string, any>[]) {
  const res = await fetch(`${BASE()}/${table}`, { method: 'POST', headers: HDRS(), body: JSON.stringify(row) });
  const text = await res.text();
  const data = text ? JSON.parse(text) : [];
  return { data: Array.isArray(data) ? data[0] : data, error: res.ok ? null : { message: text } };
}

async function sbPatch(table: string, updates: Record<string, any>, filterCol: string, filterVal: string) {
  const res = await fetch(`${BASE()}/${table}?${filterCol}=eq.${encodeURIComponent(filterVal)}`, { method: 'PATCH', headers: HDRS(), body: JSON.stringify(updates) });
  const text = await res.text();
  return { data: text ? JSON.parse(text) : [], error: res.ok ? null : { message: text } };
}

const VALID_TRANSITIONS: Record<string, string[]> = {
  CREATED: ['DEPOSITED', 'CANCELLED'],
  DEPOSITED: ['SHIPPED', 'DISPUTED', 'CANCELLED'],
  SHIPPED: ['IN_TRANSIT', 'DELIVERED', 'DISPUTED'],
  IN_TRANSIT: ['DELIVERED', 'DISPUTED'],
  DELIVERED: ['CONFIRMED', 'DISPUTED'],
  CONFIRMED: ['RELEASED'],
  RELEASED: [],
  DISPUTED: ['REFUNDED', 'RELEASED', 'CONFIRMED', 'CANCELLED'],
  REFUNDED: [],
  CANCELLED: [],
};

async function transitionEscrow(escrowId: string, toState: string, triggeredBy?: string, reason?: string) {
  const { data: escrows } = await sbGet('escrows', { id: `eq.${escrowId}`, select: '*' });
  const escrow = Array.isArray(escrows) ? escrows[0] : escrows;
  if (!escrow) throw new Error('Escrow not found');

  const fromState = escrow.status;
  const allowed = VALID_TRANSITIONS[fromState] || [];
  if (!allowed.includes(toState)) throw new Error(`Invalid transition: ${fromState} → ${toState}`);

  const updates: Record<string, unknown> = { status: toState };
  const now = new Date().toISOString();
  if (toState === 'SHIPPED') updates.shipment_date = now;
  else if (toState === 'DELIVERED') {
    updates.delivery_date = now;
    if (!escrow.dispute_deadline) updates.dispute_deadline = new Date(Date.now() + escrow.confirmation_window_hours * 3600000).toISOString();
  } else if (toState === 'CONFIRMED') updates.confirmed_at = now;
  else if (toState === 'RELEASED') updates.released_at = now;

  await sbPatch('escrows', updates, 'id', escrowId);
  await sbPost('state_transitions', { escrow_id: escrowId, from_state: fromState, to_state: toState, triggered_by: triggeredBy, reason });
  return { fromState, toState, escrowId };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query as { id: string };

  try {
    if (req.method === 'GET') {
      const select = '*, merchant:users!escrows_merchant_id_fkey(id, name, email), buyer:users!escrows_buyer_id_fkey(id, name, email), milestones(*), disputes(*), state_transitions(*), ledger_entries(*)';
      const { data: escrows, error } = await sbGet('escrows', { id: `eq.${id}`, select });
      const escrow = Array.isArray(escrows) ? escrows[0] : escrows;
      if (error || !escrow) return res.status(404).json({ error: 'Not found' });
      return res.json({ success: true, data: escrow });
    }

    if (req.method === 'POST') {
      const { action, buyerId, courierId, trackingId, carrier, reason, description, openedById } = req.body;
      const { data: escrows } = await sbGet('escrows', { id: `eq.${id}`, select: '*' });
      const escrow = Array.isArray(escrows) ? escrows[0] : escrows;
      if (!escrow) return res.status(404).json({ error: 'Not found' });

      switch (action) {
        case 'deposit': {
          const result = await transitionEscrow(id, 'DEPOSITED', buyerId || escrow.buyer_id, 'Funds deposited');
          await sbPost('ledger_entries', { escrow_id: id, user_id: escrow.buyer_id || escrow.merchant_id, type: 'HOLD', amount: escrow.amount, balance: -escrow.amount, description: `Funds held in escrow for ${escrow.escrow_code}` });
          return res.json({ success: true, data: result });
        }
        case 'ship': {
          if (trackingId || carrier) await sbPatch('escrows', { tracking_id: trackingId, shipment_carrier: carrier }, 'id', id);
          const result = await transitionEscrow(id, 'SHIPPED', escrow.merchant_id, 'Shipment dispatched');
          return res.json({ success: true, data: result });
        }
        case 'deliver': {
          const result = await transitionEscrow(id, 'DELIVERED', courierId || escrow.courier_id, 'Delivery confirmed');
          return res.json({ success: true, data: result });
        }
        case 'confirm': {
          await transitionEscrow(id, 'CONFIRMED', buyerId || escrow.buyer_id, 'Buyer confirmed delivery');
          const result = await transitionEscrow(id, 'RELEASED', buyerId || escrow.buyer_id, 'Funds released');
          const releaseAmount = escrow.amount - escrow.platform_fee;
          await sbPost('ledger_entries', [
            { escrow_id: id, user_id: escrow.merchant_id, type: 'RELEASE', amount: releaseAmount, balance: releaseAmount, description: `Funds released from ${escrow.escrow_code}` },
            { escrow_id: id, user_id: escrow.merchant_id, type: 'FEE', amount: escrow.platform_fee, balance: releaseAmount - escrow.platform_fee, description: `Platform fee for ${escrow.escrow_code}` },
          ]);
          return res.json({ success: true, data: { status: 'RELEASED', amount: releaseAmount, fee: escrow.platform_fee } });
        }
        case 'dispute': {
          await transitionEscrow(id, 'DISPUTED', openedById, reason);
          const { data: dispute } = await sbPost('disputes', { escrow_id: id, opened_by_id: openedById, reason, description });
          return res.status(201).json({ success: true, data: dispute });
        }
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(400).json({ success: false, error: (err as Error).message });
  }
}
