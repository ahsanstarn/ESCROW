import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query as { id: string };

  try {
    if (req.method === 'GET') {
      const dispute = await prisma.dispute.findUnique({
        where: { id },
        include: {
          escrow: true,
          opener: { select: { id: true, name: true, email: true } },
          arbiter: { select: { id: true, name: true } },
          evidence: true,
        },
      });
      if (!dispute) return res.status(404).json({ error: 'Not found' });
      return res.json({ success: true, data: dispute });
    }

    if (req.method === 'POST') {
      const { submittedBy, type, url, content } = req.body;
      const evidence = await prisma.evidence.create({
        data: { disputeId: id, submittedBy, type, url, content },
      });
      return res.status(201).json({ success: true, data: evidence });
    }

    if (req.method === 'PUT') {
      const { outcome, arbiterId, resolutionNotes } = req.body;
      const dispute = await prisma.dispute.update({
        where: { id },
        data: { status: 'RESOLVED', outcome, arbiterId, resolutionNotes, resolvedAt: new Date() },
      });
      return res.json({ success: true, data: dispute });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
