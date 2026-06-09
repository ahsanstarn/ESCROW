import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const BASE = () => `${process.env.SUPABASE_URL}/rest/v1`;
const KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY!;
const HDRS = () => ({ apikey: KEY(), Authorization: `Bearer ${KEY()}`, 'Content-Type': 'application/json', Prefer: 'return=representation' });

async function sbGet(table: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE()}/${table}`);
  url.searchParams.set('select', '*');
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

const createSchema = z.object({
  merchantId: z.string(),
  buyerId: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  productType: z.enum(['PHYSICAL', 'DIGITAL']),
  description: z.string().optional(),
  confirmationWindowHours: z.number().min(1).max(168).default(72),
  metadata: z.record(z.unknown()).optional(),
});

function calcFee(amount: number, bp: number = 250): number {
  return Math.round((amount * bp) / 10000 * 100) / 100;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { merchantId, buyerId, status, page = '1', limit = '50' } = req.query;

      let select = '*, merchant:users!escrows_merchant_id_fkey(id, name, email), buyer:users!escrows_buyer_id_fkey(id, name, email), disputes(id), milestones(id)';
      const params: Record<string, string> = { select, order: 'created_at.desc', limit: String(limit) };
      if (merchantId) params.merchant_id = `eq.${merchantId}`;
      if (buyerId) params.buyer_id = `eq.${buyerId}`;
      if (status) params.status = `eq.${status}`;

      const url = new URL(`${BASE()}/escrows`);
      for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

      const res2 = await fetch(url.toString(), { headers: { ...HDRS(), Range: `${(Number(page) - 1) * Number(limit)}-${Number(page) * Number(limit) - 1}` } });
      const text = await res2.text();
      const data = text ? JSON.parse(text) : [];
      const cr = res2.headers.get('content-range');
      const total = cr ? parseInt(cr.split('/')[1]) : 0;

      const enriched = data.map((e: any) => ({
        ...e,
        _count: { disputes: e.disputes?.length || 0, milestones: e.milestones?.length || 0 },
      }));

      return res.json({ success: true, data: enriched, total });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      const platformFee = calcFee(data.amount);
      const { data: escrow, error } = await sbPost('escrows', {
        escrow_code: `ESC-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`,
        merchant_id: data.merchantId,
        buyer_id: data.buyerId,
        amount: data.amount,
        currency: data.currency,
        platform_fee: platformFee,
        product_type: data.productType,
        description: data.description,
        confirmation_window_hours: data.confirmationWindowHours,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        status: 'CREATED',
      });

      if (error) throw error;
      return res.status(201).json({ success: true, data: escrow });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, errors: err.errors });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
