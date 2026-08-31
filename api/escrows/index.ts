import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import { EscrowModel, UserModel, DisputeModel } from '../../src/lib/models/index';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createSchema = z.object({
  merchantId: z.string(),
  buyerId: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  productType: z.enum(['PHYSICAL', 'DIGITAL', 'SERVICE', 'MILESTONE']).default('PHYSICAL'),
  title: z.string(),
  description: z.string().optional(),
  confirmationWindowHours: z.number().min(1).max(168).default(72),
  metadata: z.record(z.unknown()).optional(),
});

function calcFee(amount: number, bp: number = 250): number {
  return Math.round((amount * bp) / 10000 * 100) / 100;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { merchantId, buyerId, sellerId, status, page = '1', limit = '50' } = req.query;

      const filter: any = {};
      if (merchantId) filter.merchantId = merchantId;
      if (buyerId) filter.buyerId = buyerId;
      if (sellerId) filter.sellerId = sellerId;
      if (status) filter.status = status;

      const skip = (Number(page) - 1) * Number(limit);
      
      const total = await EscrowModel.countDocuments(filter);
      const data = await EscrowModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

      return res.json({ success: true, data, total });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      const fee = calcFee(data.amount);
      const netAmount = data.amount - fee;

      const escrow = new EscrowModel({
        id: uuidv4(),
        orderNumber: `ESC-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`,
        sellerId: data.merchantId, // Using merchantId as sellerId for backwards compatibility
        merchantId: data.merchantId,
        buyerId: data.buyerId || 'pending',
        title: data.title,
        description: data.description,
        amount: data.amount,
        fee,
        netAmount,
        currency: data.currency,
        status: 'PENDING',
        productType: data.productType,
        confirmationWindowHours: data.confirmationWindowHours,
        metadata: data.metadata,
      });

      await escrow.save();
      return res.status(201).json({ success: true, data: escrow });
    }
    
    if (req.method === 'PUT') {
      const { id, action } = req.body;
      if (!id || !action) return res.status(400).json({ success: false, error: 'Missing id or action' });
      
      const escrow = await EscrowModel.findOne({ id });
      if (!escrow) return res.status(404).json({ success: false, error: 'Escrow not found' });
      
      if (action === 'FUND') escrow.status = 'FUNDED';
      else if (action === 'SHIP') escrow.status = 'IN_TRANSIT';
      else if (action === 'DELIVER') escrow.status = 'DELIVERED';
      else if (action === 'RELEASE') escrow.status = 'RELEASED';
      else if (action === 'DISPUTE') escrow.status = 'DISPUTED';
      else if (action === 'REFUND') escrow.status = 'REFUNDED';
      else if (action === 'CANCEL') escrow.status = 'CANCELLED';
      
      await escrow.save();
      return res.json({ success: true, data: escrow });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, error: err.errors[0].message });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
