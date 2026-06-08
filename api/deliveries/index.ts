import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { courierId } = req.query;
      if (courierId) {
        const deliveries = await prisma.delivery.findMany({
          where: { courierId: courierId as string },
          orderBy: { createdAt: 'desc' },
          include: { escrow: { select: { id: true, escrowCode: true, amount: true, status: true, productType: true, description: true } } },
        });
        return res.json({ success: true, data: deliveries });
      }
      const deliveries = await prisma.delivery.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
      return res.json({ success: true, data: deliveries });
    }

    if (req.method === 'POST') {
      const { escrowId, courierId } = req.body;
      const delivery = await prisma.delivery.create({ data: { escrowId, courierId } });
      return res.status(201).json({ success: true, data: delivery });
    }

    if (req.method === 'PUT') {
      const { id, status, trackingId, proofUrl, notes } = req.body;
      const delivery = await prisma.delivery.update({
        where: { id },
        data: {
          status, trackingId, proofUrl, notes,
          pickedUpAt: status === 'PICKED_UP' ? new Date() : undefined,
          deliveredAt: status === 'DELIVERED' ? new Date() : undefined,
        },
      });
      return res.json({ success: true, data: delivery });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
