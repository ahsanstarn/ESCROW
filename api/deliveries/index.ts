import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import { DeliveryModel } from '../../src/lib/models/index';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createSchema = z.object({
  escrowId: z.string(),
  courierId: z.string(),
  trackingNumber: z.string(),
  carrier: z.string(),
  notes: z.string().optional()
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { escrowId, courierId, status } = req.query;
      const filter: any = {};
      if (escrowId) filter.escrowId = escrowId;
      if (courierId) filter.courierId = courierId;
      if (status) filter.status = status;

      const data = await DeliveryModel.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      
      const delivery = new DeliveryModel({
        id: uuidv4(),
        ...data,
        status: 'ASSIGNED'
      });

      await delivery.save();
      return res.status(201).json({ success: true, data: delivery });
    }

    if (req.method === 'PUT') {
      const { id, status, actualDelivery, notes } = req.body;
      if (!id) return res.status(400).json({ success: false, error: 'Missing delivery id' });
      
      const updates: any = {};
      if (status) updates.status = status;
      if (actualDelivery) updates.actualDelivery = new Date(actualDelivery);
      if (notes) updates.notes = notes;
      
      const delivery = await DeliveryModel.findOneAndUpdate({ id }, { $set: updates }, { new: true });
      if (!delivery) return res.status(404).json({ success: false, error: 'Delivery not found' });
      return res.json({ success: true, data: delivery });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, error: err.errors[0].message });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
