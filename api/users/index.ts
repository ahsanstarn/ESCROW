import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const BASE = () => `${process.env.SUPABASE_URL}/rest/v1`;
const KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY!;
const HDRS = () => ({ apikey: KEY(), Authorization: `Bearer ${KEY()}`, 'Content-Type': 'application/json', Prefer: 'return=representation' });

function hasSupabaseConfig() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function sbGet(table: string, params: Record<string, string> = {}, countOnly = false) {
  if (!hasSupabaseConfig()) return { data: [], count: 0, error: null };
  const url = new URL(`${BASE()}/${table}`);
  url.searchParams.set('select', '*');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const headers: Record<string, string> = { ...HDRS() };
  if (countOnly) { headers.Prefer = 'count=exact'; headers.Range = '0-0'; }
  const res = await fetch(url.toString(), { headers });
  if (countOnly) {
    const cr = res.headers.get('content-range');
    return { data: null, count: cr ? parseInt(cr.split('/')[1]) : 0, error: null };
  }
  const text = await res.text();
  const rows = text ? JSON.parse(text) : [];
  return { data: rows, error: res.ok ? null : { message: text } };
}

async function sbPost(table: string, row: Record<string, any>) {
  if (!hasSupabaseConfig()) return { data: row, error: null };
  const res = await fetch(`${BASE()}/${table}`, { method: 'POST', headers: HDRS(), body: JSON.stringify(row) });
  const text = await res.text();
  const data = text ? JSON.parse(text) : [];
  return { data: Array.isArray(data) ? data[0] : data, error: res.ok ? null : { message: text } };
}

const createSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['BUYER', 'MERCHANT', 'COURIER', 'ADMIN', 'SELLER', 'AGENCY']),
  phone: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { role, id, stats, email } = req.query;

      if (email) {
        const { data: users } = await sbGet('users', { email: `eq.${email}` });
        const user = Array.isArray(users) ? users[0] : users;
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.json({ success: true, data: user });
      }

      if (stats === 'true' && id) {
        const { data: users } = await sbGet('users', { id: `eq.${id}` });
        const user = Array.isArray(users) ? users[0] : users;
        if (!user) return res.status(404).json({ error: 'Not found' });
        const field = (user.role === 'MERCHANT' || user.role === 'SELLER') ? 'merchant_id' : 'buyer_id';
        const [totalRes, activeRes, completedRes, disputesRes] = await Promise.all([
          sbGet('escrows', { [field]: `eq.${id}` }, true),
          sbGet('escrows', { [field]: `eq.${id}`, status: 'in.(CREATED,DEPOSITED,SHIPPED,IN_TRANSIT,DELIVERED)' }, true),
          sbGet('escrows', { [field]: `eq.${id}`, status: 'eq.RELEASED' }, true),
          sbGet('disputes', { opened_by_id: `eq.${id}` }, true),
        ]);
        const totalEscrows = totalRes.count || 0;
        const completedEscrows = completedRes.count || 0;
        return res.json({
          success: true,
          data: {
            user: { id: user.id, name: user.name, role: user.role, trustScore: user.trust_score },
            totalEscrows, activeEscrows: activeRes.count || 0, completedEscrows, disputes: disputesRes.count || 0,
            successRate: totalEscrows > 0 ? ((completedEscrows / totalEscrows) * 100).toFixed(1) : '0',
          },
        });
      }

      const params: Record<string, string> = {};
      if (role) params.role = `eq.${role}`;
      const { data, error } = await sbGet('users', params);
      if (error) throw error;
      return res.json({ success: true, data: data || [] });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      const { data: user, error } = await sbPost('users', {
        email: data.email, name: data.name, role: data.role, phone: data.phone,
      });
      if (error) throw error;
      return res.status(201).json({ success: true, data: user });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, errors: err.errors });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
