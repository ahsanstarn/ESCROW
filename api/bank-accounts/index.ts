import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import { BankAccountModel } from '../../src/lib/models/index';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createSchema = z.object({
  userId: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
  routingNumber: z.string(),
  accountType: z.enum(['CHECKING', 'SAVINGS', 'BUSINESS']).default('CHECKING'),
  isDefault: z.boolean().default(false)
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { userId } = req.query;
      const filter: any = {};
      if (userId) filter.userId = userId;

      const data = await BankAccountModel.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      
      // If setting to default, unset other defaults
      if (data.isDefault) {
        await BankAccountModel.updateMany({ userId: data.userId }, { $set: { isDefault: false } });
      }

      const account = new BankAccountModel({
        id: uuidv4(),
        ...data
      });

      await account.save();
      return res.status(201).json({ success: true, data: account });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, error: 'Missing account id' });
      
      const account = await BankAccountModel.findOneAndDelete({ id });
      if (!account) return res.status(404).json({ success: false, error: 'Account not found' });
      
      return res.json({ success: true, data: { deleted: true } });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, error: err.errors[0].message });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
