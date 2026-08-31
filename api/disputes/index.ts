import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import { DisputeModel, EscrowModel } from '../../src/lib/models/index';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const createSchema = z.object({
  escrowId: z.string(),
  raisedBy: z.string(),
  reason: z.string(),
  evidence: z.array(z.object({
    type: z.enum(['TEXT', 'IMAGE', 'DOCUMENT']),
    content: z.string()
  })).optional()
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { escrowId, raisedBy, status } = req.query;
      const filter: any = {};
      if (escrowId) filter.escrowId = escrowId;
      if (raisedBy) filter.raisedBy = raisedBy;
      if (status) filter.status = status;

      const data = await DisputeModel.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      
      const escrow = await EscrowModel.findOne({ id: data.escrowId });
      if (!escrow) return res.status(404).json({ success: false, error: 'Escrow not found' });
      
      // Assume the respondent is the other party
      const respondentId = data.raisedBy === escrow.buyerId ? escrow.sellerId : escrow.buyerId;

      const dispute = new DisputeModel({
        id: uuidv4(),
        escrowId: data.escrowId,
        orderNumber: escrow.orderNumber,
        raisedBy: data.raisedBy,
        respondentId,
        reason: data.reason,
        status: 'OPEN',
        disputedAmount: escrow.amount,
        evidence: (data.evidence || []).map(e => ({
          id: uuidv4(),
          submittedBy: data.raisedBy,
          type: e.type,
          content: e.content
        }))
      });

      await dispute.save();
      
      // Update escrow status
      escrow.status = 'DISPUTED';
      await escrow.save();

      return res.status(201).json({ success: true, data: dispute });
    }
    
    if (req.method === 'PUT') {
      const { id, action, resolutionNotes } = req.body;
      const dispute = await DisputeModel.findOne({ id });
      if (!dispute) return res.status(404).json({ success: false, error: 'Dispute not found' });
      
      if (action === 'RESOLVE_BUYER') dispute.status = 'RESOLVED_BUYER';
      else if (action === 'RESOLVE_SELLER') dispute.status = 'RESOLVED_SELLER';
      else if (action === 'CANCEL') dispute.status = 'CANCELLED';
      
      if (resolutionNotes) dispute.resolutionNotes = resolutionNotes;
      
      await dispute.save();
      return res.json({ success: true, data: dispute });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, error: err.errors[0].message });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
