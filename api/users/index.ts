import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import { UserModel, EscrowModel, DisputeModel } from '../../src/lib/models/index';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['BUYER', 'MERCHANT', 'COURIER', 'ADMIN', 'SELLER', 'AGENCY']),
  phone: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { role, id, stats, email } = req.query;

      if (email) {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        return res.json({ success: true, data: user });
      }

      if (stats === 'true' && id) {
        const user = await UserModel.findOne({ id });
        if (!user) return res.status(404).json({ success: false, error: 'Not found' });
        
        const field = (user.role === 'MERCHANT' || user.role === 'SELLER') ? 'merchantId' : 'buyerId';
        const totalEscrows = await EscrowModel.countDocuments({ [field]: id });
        const activeEscrows = await EscrowModel.countDocuments({ [field]: id, status: { $in: ['PENDING', 'FUNDED', 'IN_TRANSIT'] } });
        const completedEscrows = await EscrowModel.countDocuments({ [field]: id, status: 'RELEASED' });
        const disputes = await DisputeModel.countDocuments({ raisedBy: id });

        return res.json({
          success: true,
          data: {
            user: { id: user.id, name: user.name, role: user.role, trustScore: user.trustScore },
            totalEscrows,
            activeEscrows,
            completedEscrows,
            disputes,
            successRate: totalEscrows > 0 ? ((completedEscrows / totalEscrows) * 100).toFixed(1) : '0',
          },
        });
      }

      const params: any = {};
      if (role) params.role = role;
      const data = await UserModel.find(params).sort({ createdAt: -1 });
      return res.json({ success: true, data });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      const user = new UserModel({
        id: uuidv4(),
        ...data,
      });
      await user.save();
      return res.status(201).json({ success: true, data: user });
    }

    if (req.method === 'PUT') {
      const { userId, name, phone, username } = req.body || {};
      if (!userId) return res.status(400).json({ success: false, error: 'Missing userId' });
      
      const updates: any = {};
      if (name) updates.name = name;
      if (phone) updates.phone = phone; // Assuming phone exists or added to schema or flexible
      if (username) updates.name = username;
      
      if (Object.keys(updates).length === 0) return res.status(400).json({ success: false, error: 'No fields to update' });
      
      const user = await UserModel.findOneAndUpdate({ id: userId }, { $set: updates }, { new: true });
      if (!user) return res.status(404).json({ success: false, error: 'User not found' });
      return res.json({ success: true, data: user });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, error: err.errors[0].message });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
