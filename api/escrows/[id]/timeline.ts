import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query as { id: string };

  if (req.method === 'GET') {
    const transitions = await prisma.stateTransition.findMany({
      where: { escrowId: id },
      orderBy: { createdAt: 'asc' },
    });
    return res.json({ success: true, data: transitions });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
