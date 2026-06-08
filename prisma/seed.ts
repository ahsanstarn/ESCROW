import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding database...');

  const merchant = await prisma.user.upsert({
    where: { email: 'merchant@example.com' },
    update: {},
    create: { email: 'merchant@example.com', name: 'TechStore Global', role: 'MERCHANT', trustScore: 78, kycStatus: 'VERIFIED' },
  });

  const merchant2 = await prisma.user.upsert({
    where: { email: 'designstudio@example.com' },
    update: {},
    create: { email: 'designstudio@example.com', name: 'DesignStudio Pro', role: 'MERCHANT', trustScore: 92, kycStatus: 'VERIFIED' },
  });

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: { email: 'buyer@example.com', name: 'Sarah Johnson', role: 'BUYER', trustScore: 85, kycStatus: 'VERIFIED' },
  });

  const buyer2 = await prisma.user.upsert({
    where: { email: 'buyer2@example.com' },
    update: {},
    create: { email: 'buyer2@example.com', name: 'James Wilson', role: 'BUYER', trustScore: 92, kycStatus: 'VERIFIED' },
  });

  const buyer3 = await prisma.user.upsert({
    where: { email: 'emily@example.com' },
    update: {},
    create: { email: 'emily@example.com', name: 'Emily Chen', role: 'BUYER', trustScore: 70, kycStatus: 'VERIFIED' },
  });

  const courier = await prisma.user.upsert({
    where: { email: 'courier@example.com' },
    update: {},
    create: { email: 'courier@example.com', name: 'QuickDeliver Express', role: 'COURIER', trustScore: 88, kycStatus: 'VERIFIED' },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@escrowtrust.com' },
    update: {},
    create: { email: 'admin@escrowtrust.com', name: 'Platform Admin', role: 'ADMIN', trustScore: 100, kycStatus: 'VERIFIED' },
  });

  // Escrow 1: Physical product, delivered, awaiting confirmation
  const escrow1 = await prisma.escrow.upsert({
    where: { escrowCode: 'ESC-2026-001' },
    update: {},
    create: {
      escrowCode: 'ESC-2026-001', merchantId: merchant.id, buyerId: buyer.id, courierId: courier.id,
      amount: 2499.99, currency: 'USD', platformFee: 62.50, status: 'DELIVERED', productType: 'PHYSICAL',
      description: 'MacBook Pro 14" M3 Pro - Brand New', confirmationWindowHours: 72,
      trackingId: 'TRK-9876543210', shipmentCarrier: 'FedEx',
      shipmentDate: new Date(Date.now() - 5 * 86400000),
      deliveryDate: new Date(Date.now() - 86400000),
      disputeDeadline: new Date(Date.now() + 2 * 86400000),
    },
  });

  // Escrow 2: Physical product, in transit
  const escrow2 = await prisma.escrow.upsert({
    where: { escrowCode: 'ESC-2026-002' },
    update: {},
    create: {
      escrowCode: 'ESC-2026-002', merchantId: merchant.id, buyerId: buyer2.id, courierId: courier.id,
      amount: 899.00, currency: 'USD', platformFee: 22.48, status: 'IN_TRANSIT', productType: 'PHYSICAL',
      description: 'Sony WH-1000XM5 Headphones', confirmationWindowHours: 48,
      trackingId: 'TRK-1234567890', shipmentCarrier: 'UPS',
      shipmentDate: new Date(Date.now() - 2 * 86400000),
    },
  });

  // Escrow 3: Digital service, released
  const escrow3 = await prisma.escrow.upsert({
    where: { escrowCode: 'ESC-2026-003' },
    update: {},
    create: {
      escrowCode: 'ESC-2026-003', merchantId: merchant2.id, buyerId: buyer.id,
      amount: 150.00, currency: 'USD', platformFee: 3.75, status: 'RELEASED', productType: 'DIGITAL',
      description: 'UI/UX Design Package - 10 Screens', confirmationWindowHours: 24,
      confirmedAt: new Date(Date.now() - 3 * 86400000),
      releasedAt: new Date(Date.now() - 3 * 86400000),
    },
  });

  // Escrow 4: Physical product, disputed
  const escrow4 = await prisma.escrow.upsert({
    where: { escrowCode: 'ESC-2026-004' },
    update: {},
    create: {
      escrowCode: 'ESC-2026-004', merchantId: merchant.id, buyerId: buyer2.id, courierId: courier.id,
      amount: 3200.00, currency: 'USD', platformFee: 80.00, status: 'DISPUTED', productType: 'PHYSICAL',
      description: 'Gaming PC Custom Build - RTX 4090', confirmationWindowHours: 72,
      trackingId: 'TRK-5556667778', shipmentCarrier: 'DHL',
      shipmentDate: new Date(Date.now() - 7 * 86400000),
      deliveryDate: new Date(Date.now() - 4 * 86400000),
    },
  });

  // Escrow 5: Digital service, deposited (milestone-based)
  const escrow5 = await prisma.escrow.upsert({
    where: { escrowCode: 'ESC-2026-005' },
    update: {},
    create: {
      escrowCode: 'ESC-2026-005', merchantId: merchant.id, buyerId: buyer.id,
      amount: 450.00, currency: 'USD', platformFee: 11.25, status: 'DEPOSITED', productType: 'DIGITAL',
      description: 'WordPress E-commerce Setup - Full Store', confirmationWindowHours: 168,
    },
  });

  // Escrow 6: Digital service, disputed
  const escrow6 = await prisma.escrow.upsert({
    where: { escrowCode: 'ESC-2026-006' },
    update: {},
    create: {
      escrowCode: 'ESC-2026-006', merchantId: merchant2.id, buyerId: buyer3.id,
      amount: 750.00, currency: 'USD', platformFee: 18.75, status: 'DISPUTED', productType: 'DIGITAL',
      description: 'SEO Consultation - 3 Month Package', confirmationWindowHours: 48,
      shipmentDate: new Date(Date.now() - 10 * 86400000),
    },
  });

  // Disputes
  await prisma.dispute.upsert({
    where: { id: 'dispute-1' },
    update: {},
    create: {
      id: 'dispute-1', escrowId: escrow4.id, openedById: buyer2.id,
      reason: 'Item not as described',
      description: 'Received PC with different specs than advertised. GPU is RTX 4080 instead of RTX 4090 as listed.',
      status: 'UNDER_REVIEW', tier: 2,
    },
  });

  await prisma.dispute.upsert({
    where: { id: 'dispute-2' },
    update: {},
    create: {
      id: 'dispute-2', escrowId: escrow6.id, openedById: buyer3.id,
      reason: 'Service not delivered',
      description: 'Freelancer stopped responding after initial consultation. No deliverables provided.',
      status: 'OPEN', tier: 1,
    },
  });

  // Milestones for escrow5
  await prisma.milestone.createMany({
    data: [
      { escrowId: escrow5.id, title: 'Wireframes & Mockups', amount: 100, status: 'COMPLETED', completedAt: new Date() },
      { escrowId: escrow5.id, title: 'Frontend Development', amount: 150, status: 'IN_PROGRESS' },
      { escrowId: escrow5.id, title: 'Backend Integration', amount: 120, status: 'PENDING' },
      { escrowId: escrow5.id, title: 'Final Delivery & Launch', amount: 80, status: 'PENDING' },
    ],
  });

  // State transitions for escrow1
  await prisma.stateTransition.createMany({
    data: [
      { escrowId: escrow1.id, fromState: 'CREATED', toState: 'DEPOSITED', triggeredBy: buyer.id, reason: 'Funds deposited' },
      { escrowId: escrow1.id, fromState: 'DEPOSITED', toState: 'SHIPPED', triggeredBy: merchant.id, reason: 'Shipment dispatched' },
      { escrowId: escrow1.id, fromState: 'SHIPPED', toState: 'IN_TRANSIT', triggeredBy: courier.id, reason: 'Package picked up' },
      { escrowId: escrow1.id, fromState: 'IN_TRANSIT', toState: 'DELIVERED', triggeredBy: courier.id, reason: 'Delivered to recipient' },
    ],
  });

  // Ledger entries
  await prisma.ledgerEntry.createMany({
    data: [
      { escrowId: escrow1.id, userId: buyer.id, type: 'HOLD', amount: 2499.99, balance: -2499.99, description: 'Funds held in escrow for ESC-2026-001' },
      { escrowId: escrow3.id, userId: buyer.id, type: 'HOLD', amount: 150, balance: -2649.99, description: 'Funds held for ESC-2026-003' },
      { escrowId: escrow3.id, userId: buyer.id, type: 'RELEASE', amount: 146.25, balance: -2503.74, description: 'Funds released from ESC-2026-003' },
      { escrowId: escrow3.id, userId: merchant2.id, type: 'RELEASE', amount: 146.25, balance: 146.25, description: 'Received from ESC-2026-003' },
    ],
  });

  console.log('Seed completed successfully!');
  console.log(`  Users: merchant, merchant2, buyer, buyer2, buyer3, courier, admin`);
  console.log(`  Escrows: 6 created`);
  console.log(`  Disputes: 2 created`);
  console.log(`  Milestones: 4 created`);
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
