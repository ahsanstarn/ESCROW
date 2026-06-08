import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { userId, escrowId } = req.query;
    if (userId) {
      const { data } = await supabase.from('ledger_entries').select(`
        *, escrow:escrows(id, escrow_code, status)
      `).eq('user_id', userId).order('created_at', { ascending: false }).limit(50);
      const balance = data && data.length > 0 ? data[0].balance : 0;
      return res.json({ success: true, data: { entries: data || [], balance } });
    }
    if (escrowId) {
      const { data } = await supabase.from('ledger_entries').select(`
        *, user:users(id, name, email)
      `).eq('escrow_id', escrowId).order('created_at', { ascending: true });
      return res.json({ success: true, data: data || [] });
    }
    return res.json({ success: true, data: [] });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
