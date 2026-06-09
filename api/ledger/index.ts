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

async function sbDelete(table: string, filterCol: string, filterVal: string) {
  const res = await fetch(`${BASE()}/${table}?${filterCol}=eq.${encodeURIComponent(filterVal)}`, { method: 'DELETE', headers: HDRS() });
  if (!res.ok) { const t = await res.text(); return { error: { message: t } }; }
  return { error: null };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { userId, escrowId } = req.query;
    if (userId) {
      const { data, error } = await sbGet('ledger_entries', {
        select: '*, escrow:escrows(id, escrow_code, status)',
        user_id: `eq.${userId}`,
        order: 'created_at.desc',
        limit: '50',
      });
      const balance = data && data.length > 0 ? data[0].balance : 0;
      return res.json({ success: true, data: { entries: data || [], balance } });
    }
    if (escrowId) {
      const { data, error } = await sbGet('ledger_entries', {
        select: '*, user:users(id, name, email)',
        escrow_id: `eq.${escrowId}`,
        order: 'created_at.asc',
      });
      return res.json({ success: true, data: data || [] });
    }
    return res.json({ success: true, data: [] });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
