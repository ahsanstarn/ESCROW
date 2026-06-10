import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE = () => `${process.env.SUPABASE_URL}/rest/v1`;
const KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY!;
const HDRS = () => ({ apikey: KEY(), Authorization: `Bearer ${KEY()}`, 'Content-Type': 'application/json', Prefer: 'return=representation' });

function hasConfig() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function sbGet(table: string, params: Record<string, string> = {}) {
  if (!hasConfig()) return { data: [], error: null };
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

async function sbDelete(table: string, filterCol: string, filterVal: string) {
  const res = await fetch(`${BASE()}/${table}?${filterCol}=eq.${encodeURIComponent(filterVal)}`, { method: 'DELETE', headers: HDRS() });
  if (!res.ok) { const t = await res.text(); return { error: { message: t } }; }
  return { error: null };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { courierId } = req.query;
      if (courierId) {
        const { data, error } = await sbGet('deliveries', {
          select: '*, escrow:escrows(id, escrow_code, amount, status, product_type, description)',
          courier_id: `eq.${courierId}`,
          order: 'created_at.desc',
        });
        if (error) throw new Error(error.message);
        return res.json({ success: true, data: data || [] });
      }
      const { data, error } = await sbGet('deliveries', {
        select: '*',
        order: 'created_at.desc',
        limit: '50',
      });
      if (error) throw new Error(error.message);
      return res.json({ success: true, data: data || [] });
    }

    if (req.method === 'POST') {
      const { escrowId, courierId } = req.body;
      const { data, error } = await sbPost('deliveries', {
        escrow_id: escrowId, courier_id: courierId,
      });
      if (error) throw new Error(error.message);
      return res.status(201).json({ success: true, data });
    }

    if (req.method === 'PUT') {
      const { id, status, trackingId, proofUrl, notes } = req.body;
      const updates: Record<string, unknown> = { status, tracking_id: trackingId, proof_url: proofUrl, notes };
      if (status === 'PICKED_UP') updates.picked_up_at = new Date().toISOString();
      if (status === 'DELIVERED') updates.delivered_at = new Date().toISOString();

      const { data, error } = await sbPatch('deliveries', updates, 'id', id);
      if (error) throw new Error(error.message);
      return res.json({ success: true, data });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
