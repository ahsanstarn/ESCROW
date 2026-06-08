import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { status, escrowId, page = '1', limit = '50' } = req.query;
    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;

    let query = supabase.from('disputes').select(`
      *,
      escrow:escrows(id, escrow_code, amount, status, description),
      opener:users!disputes_opened_by_id_fkey(id, name, email),
      arbiter:users!disputes_arbiter_id_fkey(id, name),
      evidence(*)
    `, { count: 'exact' });

    if (status) query = query.eq('status', status);
    if (escrowId) query = query.eq('escrow_id', escrowId);

    const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to);
    if (error) throw error;
    return res.json({ success: true, data: data || [], total: count || 0 });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
