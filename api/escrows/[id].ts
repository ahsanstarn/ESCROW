import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';

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
  const { data: escrow } = await supabase.from('escrows').select('*').eq('id', escrowId).single();
  if (!escrow) throw new Error('Escrow not found');

  const fromState = escrow.status;
  const allowed = VALID_TRANSITIONS[fromState] || [];
  if (!allowed.includes(toState)) throw new Error(`Invalid transition: ${fromState} → ${toState}`);

  const updates: Record<string, unknown> = { status: toState };
  const now = new Date().toISOString();

  if (toState === 'SHIPPED') updates.shipment_date = now;
  else if (toState === 'DELIVERED') {
    updates.delivery_date = now;
    if (!escrow.dispute_deadline) {
      updates.dispute_deadline = new Date(Date.now() + escrow.confirmation_window_hours * 3600000).toISOString();
    }
  } else if (toState === 'CONFIRMED') updates.confirmed_at = now;
  else if (toState === 'RELEASED') updates.released_at = now;

  await supabase.from('escrows').update(updates).eq('id', escrowId);
  await supabase.from('state_transitions').insert({
    escrow_id: escrowId, from_state: fromState, to_state: toState, triggered_by: triggeredBy, reason,
  });

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
      const { data: escrow, error } = await supabase.from('escrows').select(`
        *,
        merchant:users!escrows_merchant_id_fkey(id, name, email),
        buyer:users!escrows_buyer_id_fkey(id, name, email),
        milestones(*),
        disputes(*),
        state_transitions(*),
        ledger_entries(*)
      `).eq('id', id).single();

      if (error || !escrow) return res.status(404).json({ error: 'Not found' });

      const sorted = {
        ...escrow,
        state_transitions: escrow.state_transitions?.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
        ledger_entries: escrow.ledger_entries?.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
      };

      return res.json({ success: true, data: sorted });
    }

    if (req.method === 'POST') {
      const { action, buyerId, courierId, trackingId, carrier, reason, description, openedById } = req.body;
      const { data: escrow } = await supabase.from('escrows').select('*').eq('id', id).single();
      if (!escrow) return res.status(404).json({ error: 'Not found' });

      switch (action) {
        case 'deposit': {
          const result = await transitionEscrow(id, 'DEPOSITED', buyerId || escrow.buyer_id, 'Funds deposited');
          await supabase.from('ledger_entries').insert({
            escrow_id: id, user_id: escrow.buyer_id || escrow.merchant_id,
            type: 'HOLD', amount: escrow.amount,
            balance: -escrow.amount,
            description: `Funds held in escrow for ${escrow.escrow_code}`,
          });
          return res.json({ success: true, data: result });
        }
        case 'ship': {
          if (trackingId || carrier) {
            await supabase.from('escrows').update({ tracking_id: trackingId, shipment_carrier: carrier }).eq('id', id);
          }
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
          await supabase.from('ledger_entries').insert([
            { escrow_id: id, user_id: escrow.merchant_id, type: 'RELEASE', amount: releaseAmount, balance: releaseAmount, description: `Funds released from ${escrow.escrow_code}` },
            { escrow_id: id, user_id: escrow.merchant_id, type: 'FEE', amount: escrow.platform_fee, balance: releaseAmount - escrow.platform_fee, description: `Platform fee for ${escrow.escrow_code}` },
          ]);
          return res.json({ success: true, data: { status: 'RELEASED', amount: releaseAmount, fee: escrow.platform_fee } });
        }
        case 'dispute': {
          await transitionEscrow(id, 'DISPUTED', openedById, reason);
          const { data: dispute } = await supabase.from('disputes').insert({
            escrow_id: id, opened_by_id: openedById, reason, description,
          }).select().single();
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
