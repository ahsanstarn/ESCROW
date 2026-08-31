import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import { WebhookModel } from '../../src/lib/models/index';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createSchema = z.object({
  userId: z.string(),
  url: z.string().url(),
  events: z.array(z.string()),
  secret: z.string()
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { userId } = req.query;
      const filter: any = {};
      if (userId) filter.userId = userId;

      const data = await WebhookModel.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      
      const webhook = new WebhookModel({
        id: uuidv4(),
        ...data,
        isActive: true
      });

      await webhook.save();
      return res.status(201).json({ success: true, data: webhook });
    }

    if (req.method === 'PUT') {
      const { id, isActive, events, url } = req.body;
      if (!id) return res.status(400).json({ success: false, error: 'Missing webhook id' });
      
      const updates: any = {};
      if (isActive !== undefined) updates.isActive = isActive;
      if (events) updates.events = events;
      if (url) updates.url = url;
      
      const webhook = await WebhookModel.findOneAndUpdate({ id }, { $set: updates }, { new: true });
      if (!webhook) return res.status(404).json({ success: false, error: 'Webhook not found' });
      
      return res.json({ success: true, data: webhook });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, error: 'Missing webhook id' });
      
      const webhook = await WebhookModel.findOneAndDelete({ id });
      if (!webhook) return res.status(404).json({ success: false, error: 'Webhook not found' });
      
      return res.json({ success: true, data: { deleted: true } });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, error: err.errors[0].message });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
