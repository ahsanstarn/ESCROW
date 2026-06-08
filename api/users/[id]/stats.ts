import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query as { id: string };

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: 'Not found' });

    const whereField = user.role === 'MERCHANT' ? 'merchantId' : 'buyerId';
    const [totalEscrows, activeEscrows, completedEscrows, disputes] = await Promise.all([
      prisma.escrow.count({ where: { [whereField]: id } }),
      prisma.escrow.count({ where: { [whereField]: id, status: { in: ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'] } } }),
      prisma.escrow.count({ where: { [whereField]: id, status: 'RELEASED' } }),
      prisma.dispute.count({ where: { escrow: { [whereField]: id } } }),
    ]);

    return res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, role: user.role, trustScore: user.trustScore },
        totalEscrows, activeEscrows, completedEscrows, disputes,
        successRate: totalEscrows > 0 ? ((completedEscrows / totalEscrows) * 100).toFixed(1) : '0',
      },
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
