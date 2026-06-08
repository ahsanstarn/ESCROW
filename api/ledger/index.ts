import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { userId, escrowId } = req.query;
    if (userId) {
      const entries = await prisma.ledgerEntry.findMany({
        where: { userId: userId as string },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: { escrow: { select: { id: true, escrowCode: true, status: true } } },
      });
      const lastEntry = entries[0];
      return res.json({ success: true, data: { entries, balance: lastEntry?.balance || 0 } });
    }
    if (escrowId) {
      const entries = await prisma.ledgerEntry.findMany({
        where: { escrowId: escrowId as string },
        orderBy: { createdAt: 'asc' },
        include: { user: { select: { id: true, name: true, email: true } } },
      });
      return res.json({ success: true, data: entries });
    }
    return res.json({ success: true, data: [] });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
