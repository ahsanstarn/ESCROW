import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from './lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const existing = await prisma.user.count();
    if (existing > 0) {
      return res.json({ success: true, message: 'Database already seeded' });
    }

    const merchant = await prisma.user.create({
      data: { email: 'merchant@example.com', name: 'TechStore Global', role: 'MERCHANT', trustScore: 78, kycStatus: 'VERIFIED' },
    });
    const merchant2 = await prisma.user.create({
      data: { email: 'designstudio@example.com', name: 'DesignStudio Pro', role: 'MERCHANT', trustScore: 92, kycStatus: 'VERIFIED' },
    });
    const buyer = await prisma.user.create({
      data: { email: 'buyer@example.com', name: 'Sarah Johnson', role: 'BUYER', trustScore: 85, kycStatus: 'VERIFIED' },
    });
    const buyer2 = await prisma.user.create({
      data: { email: 'buyer2@example.com', name: 'James Wilson', role: 'BUYER', trustScore: 92, kycStatus: 'VERIFIED' },
    });
    const courier = await prisma.user.create({
      data: { email: 'courier@example.com', name: 'QuickDeliver Express', role: 'COURIER', trustScore: 88, kycStatus: 'VERIFIED' },
    });
    const admin = await prisma.user.create({
      data: { email: 'admin@escrowtrust.com', name: 'Platform Admin', role: 'ADMIN', trustScore: 100, kycStatus: 'VERIFIED' },
    });

    const now = Date.now();
    const DAY = 86400000;

    const e1 = await prisma.escrow.create({
      data: {
        escrowCode: 'ESC-2026-001', merchantId: merchant.id, buyerId: buyer.id, courierId: courier.id,
        amount: 2499.99, currency: 'USD', platformFee: 62.50, status: 'DELIVERED', productType: 'PHYSICAL',
        description: 'MacBook Pro 14" M3 Pro - Brand New', confirmationWindowHours: 72,
        trackingId: 'TRK-9876543210', shipmentCarrier: 'FedEx',
        shipmentDate: new Date(now - 5 * DAY), deliveryDate: new Date(now - DAY),
        disputeDeadline: new Date(now + 2 * DAY),
      },
    });

    const e2 = await prisma.escrow.create({
      data: {
        escrowCode: 'ESC-2026-002', merchantId: merchant.id, buyerId: buyer2.id, courierId: courier.id,
        amount: 899.00, currency: 'USD', platformFee: 22.48, status: 'IN_TRANSIT', productType: 'PHYSICAL',
        description: 'Sony WH-1000XM5 Headphones', confirmationWindowHours: 48,
        trackingId: 'TRK-1234567890', shipmentCarrier: 'UPS',
        shipmentDate: new Date(now - 2 * DAY),
      },
    });

    const e3 = await prisma.escrow.create({
      data: {
        escrowCode: 'ESC-2026-003', merchantId: merchant2.id, buyerId: buyer.id,
        amount: 150.00, currency: 'USD', platformFee: 3.75, status: 'RELEASED', productType: 'DIGITAL',
        description: 'UI/UX Design Package - 10 Screens', confirmationWindowHours: 24,
        confirmedAt: new Date(now - 3 * DAY), releasedAt: new Date(now - 3 * DAY),
      },
    });

    const e4 = await prisma.escrow.create({
      data: {
        escrowCode: 'ESC-2026-004', merchantId: merchant.id, buyerId: buyer2.id, courierId: courier.id,
        amount: 3200.00, currency: 'USD', platformFee: 80.00, status: 'DISPUTED', productType: 'PHYSICAL',
        description: 'Gaming PC Custom Build - RTX 4090', confirmationWindowHours: 72,
        trackingId: 'TRK-5556667778', shipmentCarrier: 'DHL',
        shipmentDate: new Date(now - 7 * DAY), deliveryDate: new Date(now - 4 * DAY),
      },
    });

    const e5 = await prisma.escrow.create({
      data: {
        escrowCode: 'ESC-2026-005', merchantId: merchant.id, buyerId: buyer.id,
        amount: 450.00, currency: 'USD', platformFee: 11.25, status: 'DEPOSITED', productType: 'DIGITAL',
        description: 'WordPress E-commerce Setup - Full Store', confirmationWindowHours: 168,
      },
    });

    await prisma.escrow.create({
      data: {
        escrowCode: 'ESC-2026-006', merchantId: merchant2.id, buyerId: buyer2.id,
        amount: 750.00, currency: 'USD', platformFee: 18.75, status: 'DISPUTED', productType: 'DIGITAL',
        description: 'SEO Consultation - 3 Month Package', confirmationWindowHours: 48,
      },
    });

    await prisma.dispute.createMany({
      data: [
        { id: 'dispute-1', escrowId: e4.id, openedById: buyer2.id, reason: 'Item not as described', description: 'Received PC with different specs than advertised. GPU is RTX 4080 instead of RTX 4090 as listed.', status: 'UNDER_REVIEW', tier: 2 },
        { id: 'dispute-2', escrowId: e5.id, openedById: buyer.id, reason: 'Service not delivered', description: 'Waiting for merchant to begin work on the project.', status: 'OPEN', tier: 1 },
      ],
    });

    await prisma.milestone.createMany({
      data: [
        { escrowId: e5.id, title: 'Wireframes & Mockups', amount: 100, status: 'COMPLETED', completedAt: new Date() },
        { escrowId: e5.id, title: 'Frontend Development', amount: 150, status: 'IN_PROGRESS' },
        { escrowId: e5.id, title: 'Backend Integration', amount: 120, status: 'PENDING' },
        { escrowId: e5.id, title: 'Final Delivery & Launch', amount: 80, status: 'PENDING' },
      ],
    });

    await prisma.stateTransition.createMany({
      data: [
        { escrowId: e1.id, fromState: 'CREATED', toState: 'DEPOSITED', triggeredBy: buyer.id, reason: 'Funds deposited' },
        { escrowId: e1.id, fromState: 'DEPOSITED', toState: 'SHIPPED', triggeredBy: merchant.id, reason: 'Shipment dispatched' },
        { escrowId: e1.id, fromState: 'SHIPPED', toState: 'IN_TRANSIT', triggeredBy: courier.id, reason: 'Package picked up' },
        { escrowId: e1.id, fromState: 'IN_TRANSIT', toState: 'DELIVERED', triggeredBy: courier.id, reason: 'Delivered to recipient' },
      ],
    });

    await prisma.ledgerEntry.createMany({
      data: [
        { escrowId: e1.id, userId: buyer.id, type: 'HOLD', amount: 2499.99, balance: -2499.99, description: 'Funds held in escrow for ESC-2026-001' },
        { escrowId: e3.id, userId: buyer.id, type: 'HOLD', amount: 150, balance: -2649.99, description: 'Funds held for ESC-2026-003' },
        { escrowId: e3.id, userId: buyer.id, type: 'RELEASE', amount: 146.25, balance: -2503.74, description: 'Funds released from ESC-2026-003' },
        { escrowId: e3.id, userId: merchant2.id, type: 'RELEASE', amount: 146.25, balance: 146.25, description: 'Received from ESC-2026-003' },
      ],
    });

    return res.json({ success: true, message: 'Database seeded successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
