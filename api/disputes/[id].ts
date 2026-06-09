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
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query as { id: string };

  try {
    if (req.method === 'GET') {
      const { data: disputes, error } = await sbGet('disputes', {
        select: '*, escrow(*), opener:users!disputes_opened_by_id_fkey(id, name, email), arbiter:users!disputes_arbiter_id_fkey(id, name), evidence(*)',
        id: `eq.${id}`,
      });
      const dispute = Array.isArray(disputes) ? disputes[0] : disputes;
      if (error || !dispute) return res.status(404).json({ error: 'Not found' });
      return res.json({ success: true, data: dispute });
    }

    if (req.method === 'POST') {
      const { submittedBy, type, url, content } = req.body;
      const { data: evidence, error } = await sbPost('evidence', {
        dispute_id: id, submitted_by: submittedBy, type, url, content,
      });
      if (error) throw new Error(error.message);
      return res.status(201).json({ success: true, data: evidence });
    }

    if (req.method === 'PUT') {
      const { outcome, arbiterId, resolutionNotes } = req.body;
      const { data: disputes, error } = await sbPatch('disputes', {
        status: 'RESOLVED', outcome, arbiter_id: arbiterId, resolution_notes: resolutionNotes, resolved_at: new Date().toISOString(),
      }, 'id', id);
      const dispute = Array.isArray(disputes) ? disputes[0] : disputes;
      if (error) throw new Error(error.message);
      return res.json({ success: true, data: dispute });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
