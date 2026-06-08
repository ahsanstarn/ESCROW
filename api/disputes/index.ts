import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { status, escrowId, page = '1', limit = '50' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (escrowId) where.escrowId = escrowId;

    const [disputes, total] = await Promise.all([
      prisma.dispute.findMany({
        where, skip, take: Number(limit), orderBy: { createdAt: 'desc' },
        include: {
          escrow: { select: { id: true, escrowCode: true, amount: true, status: true, description: true } },
          opener: { select: { id: true, name: true, email: true } },
          arbiter: { select: { id: true, name: true } },
          evidence: true,
        },
      }),
      prisma.dispute.count({ where }),
    ]);
    return res.json({ success: true, data: disputes, total });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
