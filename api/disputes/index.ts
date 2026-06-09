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

async function sbCount(table: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE()}/${table}`);
  url.searchParams.set('select', '*');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), { headers: { ...HDRS(), Prefer: 'count=exact', Range: '0-0' } });
  const cr = res.headers.get('content-range');
  return { count: cr ? parseInt(cr.split('/')[1]) : 0 };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { status, escrowId, page = '1', limit = '50' } = req.query;
    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;

    const params: Record<string, string> = {
      select: '*, escrow:escrows(id, escrow_code, amount, status, description), opener:users!disputes_opened_by_id_fkey(id, name, email), arbiter:users!disputes_arbiter_id_fkey(id, name), evidence(*)',
      order: 'created_at.desc',
      limit: String(to - from + 1),
      offset: String(from),
    };

    if (status) params.status = `eq.${status}`;
    if (escrowId) params.escrow_id = `eq.${escrowId}`;

    const { data: disputes, error } = await sbGet('disputes', params);
    const { count } = await sbCount('disputes', {
      ...Object.fromEntries(Object.entries(params).filter(([k]) => ['status', 'escrow_id'].includes(k))),
    });

    if (error) throw new Error(error.message);
    return res.json({ success: true, data: disputes || [], total: count || 0 });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
