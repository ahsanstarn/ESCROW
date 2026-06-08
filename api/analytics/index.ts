import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);

    const [totalEscrows, activeEscrows, totalVolume, totalFees, openDisputes, resolvedDisputes, totalUsers, merchants, buyers, couriers] = await Promise.all([
      prisma.escrow.count(),
      prisma.escrow.count({ where: { status: { in: ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'] } } }),
      prisma.escrow.aggregate({ _sum: { amount: true }, where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.escrow.aggregate({ _sum: { platformFee: true }, where: { status: 'RELEASED', releasedAt: { gte: thirtyDaysAgo } } }),
      prisma.dispute.count({ where: { status: { in: ['OPEN', 'UNDER_REVIEW', 'ESCALATED'] } } }),
      prisma.dispute.count({ where: { status: 'RESOLVED' } }),
      prisma.user.count(),
      prisma.user.count({ where: { role: 'MERCHANT' } }),
      prisma.user.count({ where: { role: 'BUYER' } }),
      prisma.user.count({ where: { role: 'COURIER' } }),
    ]);

    const [disputesByStatus, escrowsByStatus, recentEscrows] = await Promise.all([
      prisma.dispute.groupBy({ by: ['status'], _count: true }),
      prisma.escrow.groupBy({ by: ['status'], _count: true }),
      prisma.escrow.findMany({
        orderBy: { createdAt: 'desc' }, take: 10,
        include: { merchant: { select: { name: true } }, buyer: { select: { name: true } } },
      }),
    ]);

    return res.json({
      success: true,
      data: {
        overview: {
          totalEscrows, activeEscrows,
          totalVolume: totalVolume._sum.amount || 0,
          totalFeesCollected: totalFees._sum.platformFee || 0,
          openDisputes, resolvedDisputes,
          disputeRate: totalEscrows > 0 ? ((openDisputes / totalEscrows) * 100).toFixed(2) : '0',
        },
        users: { total: totalUsers, merchants, buyers, couriers },
        disputesByStatus, escrowsByStatus, recentEscrows,
      },
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
