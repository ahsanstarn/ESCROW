import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';
import { transitionEscrow, calcFee } from '../lib/engine';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createSchema = z.object({
  merchantId: z.string(),
  buyerId: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  productType: z.enum(['PHYSICAL', 'DIGITAL']),
  description: z.string().optional(),
  confirmationWindowHours: z.number().min(1).max(168).default(72),
  metadata: z.record(z.unknown()).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { merchantId, buyerId, status, page = '1', limit = '50' } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const where: Record<string, unknown> = {};
      if (merchantId) where.merchantId = merchantId;
      if (buyerId) where.buyerId = buyerId;
      if (status) where.status = status;

      const [escrows, total] = await Promise.all([
        prisma.escrow.findMany({
          where, skip, take: Number(limit), orderBy: { createdAt: 'desc' },
          include: {
            merchant: { select: { id: true, name: true, email: true } },
            buyer: { select: { id: true, name: true, email: true } },
            _count: { select: { disputes: true, milestones: true } },
          },
        }),
        prisma.escrow.count({ where }),
      ]);
      return res.json({ success: true, data: escrows, total });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      const platformFee = calcFee(data.amount);
      const escrow = await prisma.escrow.create({
        data: {
          escrowCode: `ESC-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`,
          merchantId: data.merchantId,
          buyerId: data.buyerId,
          amount: data.amount,
          currency: data.currency,
          platformFee,
          productType: data.productType,
          description: data.description,
          confirmationWindowHours: data.confirmationWindowHours,
          metadata: data.metadata ? JSON.stringify(data.metadata) : null,
          status: 'CREATED',
        },
      });
      return res.status(201).json({ success: true, data: escrow });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, errors: err.errors });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
