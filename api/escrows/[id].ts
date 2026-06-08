import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';
import { transitionEscrow, calcFee } from '../lib/engine';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query as { id: string };

  try {
    if (req.method === 'GET') {
      const escrow = await prisma.escrow.findUnique({
        where: { id },
        include: {
          merchant: { select: { id: true, name: true, email: true } },
          buyer: { select: { id: true, name: true, email: true } },
          milestones: true,
          disputes: true,
          stateTransitions: { orderBy: { createdAt: 'asc' } },
          ledgerEntries: { orderBy: { createdAt: 'asc' } },
        },
      });
      if (!escrow) return res.status(404).json({ error: 'Not found' });
      return res.json({ success: true, data: escrow });
    }

    if (req.method === 'POST') {
      const { action, buyerId, courierId, trackingId, carrier, reason, description, openedById } = req.body;
      const escrow = await prisma.escrow.findUnique({ where: { id } });
      if (!escrow) return res.status(404).json({ error: 'Not found' });

      switch (action) {
        case 'deposit': {
          const result = await transitionEscrow(id, 'DEPOSITED', buyerId || escrow.buyerId, 'Funds deposited');
          await prisma.ledgerEntry.create({
            data: {
              escrowId: id, userId: escrow.buyerId || escrow.merchantId,
              type: 'HOLD', amount: escrow.amount,
              balance: -escrow.amount,
              description: `Funds held in escrow for ${escrow.escrowCode}`,
            },
          });
          return res.json({ success: true, data: result });
        }
        case 'ship': {
          if (trackingId || carrier) {
            await prisma.escrow.update({ where: { id }, data: { trackingId, shipmentCarrier: carrier } });
          }
          const result = await transitionEscrow(id, 'SHIPPED', escrow.merchantId, 'Shipment dispatched', { trackingId, carrier });
          return res.json({ success: true, data: result });
        }
        case 'deliver': {
          const result = await transitionEscrow(id, 'DELIVERED', courierId || escrow.courierId, 'Delivery confirmed');
          return res.json({ success: true, data: result });
        }
        case 'confirm': {
          await transitionEscrow(id, 'CONFIRMED', buyerId || escrow.buyerId, 'Buyer confirmed delivery');
          const result = await transitionEscrow(id, 'RELEASED', buyerId || escrow.buyerId, 'Funds released');
          const releaseAmount = escrow.amount - escrow.platformFee;
          await prisma.ledgerEntry.create({
            data: { escrowId: id, userId: escrow.merchantId, type: 'RELEASE', amount: releaseAmount, balance: releaseAmount, description: `Funds released from ${escrow.escrowCode}` },
          });
          await prisma.ledgerEntry.create({
            data: { escrowId: id, userId: escrow.merchantId, type: 'FEE', amount: escrow.platformFee, balance: releaseAmount - escrow.platformFee, description: `Platform fee for ${escrow.escrowCode}` },
          });
          return res.json({ success: true, data: { status: 'RELEASED', amount: releaseAmount, fee: escrow.platformFee } });
        }
        case 'dispute': {
          await transitionEscrow(id, 'DISPUTED', openedById, reason);
          const dispute = await prisma.dispute.create({
            data: { escrowId: id, openedById, reason, description },
          });
          return res.status(201).json({ success: true, data: dispute });
        }
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(400).json({ success: false, error: (err as Error).message });
  }
}
