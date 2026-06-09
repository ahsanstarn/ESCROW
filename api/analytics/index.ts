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
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

    const [totalEscrows, activeEscrows, totalVolume, totalFees, openDisputes, resolvedDisputes, totalUsers, merchants, buyers, couriers] = await Promise.all([
      sbCount('escrows'),
      sbCount('escrows', { status: 'in.(CREATED,DEPOSITED,SHIPPED,IN_TRANSIT,DELIVERED)' }),
      sbGet('escrows', { select: 'amount', created_at: `gte.${thirtyDaysAgo}` }),
      sbGet('escrows', { select: 'platform_fee', status: 'eq.RELEASED', released_at: `gte.${thirtyDaysAgo}` }),
      sbCount('disputes', { status: 'in.(OPEN,UNDER_REVIEW,ESCALATED)' }),
      sbCount('disputes', { status: 'eq.RESOLVED' }),
      sbCount('users'),
      sbCount('users', { role: 'eq.MERCHANT' }),
      sbCount('users', { role: 'eq.BUYER' }),
      sbCount('users', { role: 'eq.COURIER' }),
    ]);

    const totalVol = totalVolume.data?.reduce((sum: number, e: any) => sum + (e.amount || 0), 0) || 0;
    const totalFee = totalFees.data?.reduce((sum: number, e: any) => sum + (e.platform_fee || 0), 0) || 0;

    const statusList = ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'CONFIRMED', 'RELEASED', 'DISPUTED', 'REFUNDED', 'CANCELLED'];
    const disputeStatusList = ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'ESCALATED'];

    const escrowsByStatus = (await Promise.all(
      statusList.map(async (s) => {
        const { count } = await sbCount('escrows', { status: `eq.${s}` });
        return { status: s, count: count || 0 };
      })
    )).filter((item) => item.count > 0);

    const disputesByStatus = (await Promise.all(
      disputeStatusList.map(async (s) => {
        const { count } = await sbCount('disputes', { status: `eq.${s}` });
        return { status: s, count: count || 0 };
      })
    )).filter((item) => item.count > 0);

    const { data: recentEscrows } = await sbGet('escrows', {
      select: '*, merchant:users!escrows_merchant_id_fkey(name), buyer:users!escrows_buyer_id_fkey(name)',
      order: 'created_at.desc',
      limit: '10',
    });

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
