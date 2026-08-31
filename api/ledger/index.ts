import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import { TransactionModel, UserModel } from '../../src/lib/models/index';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createSchema = z.object({
  userId: z.string(),
  escrowId: z.string().optional(),
  type: z.enum(['DEPOSIT', 'WITHDRAWAL', 'ESCROW_LOCK', 'ESCROW_RELEASE', 'FEE', 'REFUND']),
  amount: z.number().positive(),
  description: z.string()
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { userId, escrowId, type } = req.query;
      const filter: any = {};
      if (userId) filter.userId = userId;
      if (escrowId) filter.escrowId = escrowId;
      if (type) filter.type = type;

      const data = await TransactionModel.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      
      const user = await UserModel.findOne({ id: data.userId });
      if (!user) return res.status(404).json({ success: false, error: 'User not found' });
      
      let balanceAfter = user.walletBalance;
      if (data.type === 'DEPOSIT' || data.type === 'ESCROW_RELEASE' || data.type === 'REFUND') {
        balanceAfter += data.amount;
      } else if (data.type === 'WITHDRAWAL' || data.type === 'ESCROW_LOCK' || data.type === 'FEE') {
        balanceAfter -= data.amount;
      }

      const transaction = new TransactionModel({
        id: uuidv4(),
        userId: data.userId,
        escrowId: data.escrowId,
        type: data.type,
        amount: data.amount,
        balanceAfter,
        description: data.description,
        status: 'COMPLETED'
      });

      await transaction.save();
      
      // Update user balance
      user.walletBalance = balanceAfter;
      await user.save();

      return res.status(201).json({ success: true, data: transaction });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, error: err.errors[0].message });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
