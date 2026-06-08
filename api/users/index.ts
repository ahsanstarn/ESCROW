import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const createSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['BUYER', 'MERCHANT', 'COURIER', 'ADMIN']),
  phone: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { role } = req.query;
      const where = role ? { role: role as string } : {};
      const users = await prisma.user.findMany({ where, orderBy: { createdAt: 'desc' } });
      return res.json({ success: true, data: users });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      const user = await prisma.user.create({ data });
      return res.status(201).json({ success: true, data: user });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, errors: err.errors });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
