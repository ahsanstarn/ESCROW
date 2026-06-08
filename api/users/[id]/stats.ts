import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query as { id: string };

  if (req.method === 'GET') {
    const { data: user } = await supabase.from('users').select('*').eq('id', id).single();
    if (!user) return res.status(404).json({ error: 'Not found' });

    const field = user.role === 'MERCHANT' ? 'merchant_id' : 'buyer_id';

    const [totalRes, activeRes, completedRes, disputesRes] = await Promise.all([
      supabase.from('escrows').select('*', { count: 'exact', head: true }).eq(field, id),
      supabase.from('escrows').select('*', { count: 'exact', head: true }).eq(field, id).in('status', ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED']),
      supabase.from('escrows').select('*', { count: 'exact', head: true }).eq(field, id).eq('status', 'RELEASED'),
      supabase.from('disputes').select('*', { count: 'exact', head: true }).eq('opened_by_id', id),
    ]);

    const totalEscrows = totalRes.count || 0;
    const activeEscrows = activeRes.count || 0;
    const completedEscrows = completedRes.count || 0;
    const disputes = disputesRes.count || 0;

    return res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, role: user.role, trustScore: user.trust_score },
        totalEscrows, activeEscrows, completedEscrows, disputes,
        successRate: totalEscrows > 0 ? ((completedEscrows / totalEscrows) * 100).toFixed(1) : '0',
      },
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
