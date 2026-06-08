import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

    const [totalEscrows, activeEscrows, totalVolume, totalFees, openDisputes, resolvedDisputes, totalUsers, merchants, buyers, couriers] = await Promise.all([
      supabase.from('escrows').select('*', { count: 'exact', head: true }),
      supabase.from('escrows').select('*', { count: 'exact', head: true }).in('status', ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED']),
      supabase.from('escrows').select('amount').gte('created_at', thirtyDaysAgo),
      supabase.from('escrows').select('platform_fee').eq('status', 'RELEASED').gte('released_at', thirtyDaysAgo),
      supabase.from('disputes').select('*', { count: 'exact', head: true }).in('status', ['OPEN', 'UNDER_REVIEW', 'ESCALATED']),
      supabase.from('disputes').select('*', { count: 'exact', head: true }).eq('status', 'RESOLVED'),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'MERCHANT'),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'BUYER'),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'COURIER'),
    ]);

    const totalVol = totalVolume.data?.reduce((sum: number, e: any) => sum + (e.amount || 0), 0) || 0;
    const totalFee = totalFees.data?.reduce((sum: number, e: any) => sum + (e.platform_fee || 0), 0) || 0;

    // Fetch status counts individually
    const statusList = ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'CONFIRMED', 'RELEASED', 'DISPUTED', 'REFUNDED', 'CANCELLED'];
    const disputeStatusList = ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'ESCALATED'];

    const escrowsByStatus = (await Promise.all(
      statusList.map(async (s) => {
        const { count } = await supabase.from('escrows').select('*', { count: 'exact', head: true }).eq('status', s);
        return { status: s, count: count || 0 };
      })
    )).filter((item) => item.count > 0);

    const disputesByStatus = (await Promise.all(
      disputeStatusList.map(async (s) => {
        const { count } = await supabase.from('disputes').select('*', { count: 'exact', head: true }).eq('status', s);
        return { status: s, count: count || 0 };
      })
    )).filter((item) => item.count > 0);

    const { data: recentEscrows } = await supabase.from('escrows').select(`
      *,
      merchant:users!escrows_merchant_id_fkey(name),
      buyer:users!escrows_buyer_id_fkey(name)
    `).order('created_at', { ascending: false }).limit(10);

    const tE = totalEscrows.count || 0;
    const oD = openDisputes.count || 0;

    return res.json({
      success: true,
      data: {
        overview: {
          totalEscrows: tE,
          activeEscrows: activeEscrows.count || 0,
          totalVolume: totalVol,
          totalFeesCollected: totalFee,
          openDisputes: oD,
          resolvedDisputes: resolvedDisputes.count || 0,
          disputeRate: tE > 0 ? ((oD / tE) * 100).toFixed(2) : '0',
        },
        users: {
          total: totalUsers.count || 0,
          merchants: merchants.count || 0,
          buyers: buyers.count || 0,
          couriers: couriers.count || 0,
        },
        disputesByStatus,
        escrowsByStatus,
        recentEscrows: recentEscrows || [],
      },
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
