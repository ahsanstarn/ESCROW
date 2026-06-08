import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

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

function calcFee(amount: number, bp: number = 250): number {
  return Math.round((amount * bp) / 10000 * 100) / 100;
}

async function transitionEscrow(escrowId: string, toState: string, triggeredBy?: string, reason?: string) {
  const { data: escrow } = await supabase.from('escrows').select('*').eq('id', escrowId).single();
  if (!escrow) throw new Error('Escrow not found');

  const fromState = escrow.status;
  const allowed = VALID_TRANSITIONS[fromState] || [];
  if (!allowed.includes(toState)) {
    throw new Error(`Invalid transition: ${fromState} → ${toState}`);
  }

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { merchantId, buyerId, status, page = '1', limit = '50' } = req.query;
      const from = (Number(page) - 1) * Number(limit);
      const to = from + Number(limit) - 1;

      let query = supabase.from('escrows').select(`
        *,
        merchant:users!escrows_merchant_id_fkey(id, name, email),
        buyer:users!escrows_buyer_id_fkey(id, name, email),
        disputes(id),
        milestones(id)
      `, { count: 'exact' });

      if (merchantId) query = query.eq('merchant_id', merchantId);
      if (buyerId) query = query.eq('buyer_id', buyerId);
      if (status) query = query.eq('status', status);

      const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to);
      if (error) throw error;

      const enriched = data?.map(e => ({
        ...e,
        _count: { disputes: e.disputes?.length || 0, milestones: e.milestones?.length || 0 },
      })) || [];

      return res.json({ success: true, data: enriched, total: count || 0 });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      const platformFee = calcFee(data.amount);
      const { data: escrow, error } = await supabase.from('escrows').insert({
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
      }).select().single();

      if (error) throw error;
      return res.status(201).json({ success: true, data: escrow });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, errors: err.errors });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
