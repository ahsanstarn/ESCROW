import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../../src/lib/mongodb';
import { UserModel, EscrowModel, DisputeModel, TransactionModel } from '../../src/lib/models';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { connected, error } = await connectToDatabase();
    if (!connected) {
      return res.status(400).json({
        success: false,
        message: error || 'MongoDB not connected. Please configure MONGODB_URI.',
      });
    }

    // 1. Seed Users
    const seedUsers = [
      { id: 'usr_seller_1', email: 'seller@example.com', name: 'Alex Rivers', role: 'SELLER', kycStatus: 'VERIFIED', trustScore: 98, walletBalance: 24500, inEscrowBalance: 12400 },
      { id: 'usr_buyer_1', email: 'buyer@example.com', name: 'Sarah Connor', role: 'BUYER', kycStatus: 'VERIFIED', trustScore: 95, walletBalance: 15200, inEscrowBalance: 8750 },
      { id: 'usr_agency_1', email: 'agency@example.com', name: 'Apex Media Agency', role: 'AGENCY', kycStatus: 'VERIFIED', trustScore: 99, walletBalance: 148900, inEscrowBalance: 45000 },
      { id: 'usr_admin_1', email: 'admin@example.com', name: 'Escro System Admin', role: 'ADMIN', kycStatus: 'VERIFIED', trustScore: 100, walletBalance: 0, inEscrowBalance: 0 },
    ];

    for (const u of seedUsers) {
      await UserModel.findOneAndUpdate({ id: u.id }, u, { upsert: true, new: true });
    }

    // 2. Seed Escrows
    const seedEscrows = [
      {
        id: 'esc_83421',
        orderNumber: 'ORD-83421',
        buyerId: 'usr_buyer_1',
        sellerId: 'usr_seller_1',
        title: 'Custom Brand Identity & Asset Package',
        description: 'Complete vector logos, brand guide, typography specs and UI kit.',
        amount: 2450.00,
        fee: 61.25,
        netAmount: 2388.75,
        currency: 'USD',
        status: 'DELIVERED',
        productType: 'DIGITAL',
        confirmationWindowHours: 72,
      },
      {
        id: 'esc_83422',
        orderNumber: 'ORD-83422',
        buyerId: 'usr_buyer_1',
        sellerId: 'usr_seller_1',
        title: 'Full Stack Web Platform Development - Phase 2',
        description: 'API integrations, authentication workflow and responsive layout.',
        amount: 8750.00,
        fee: 218.75,
        netAmount: 8531.25,
        currency: 'USD',
        status: 'FUNDED',
        productType: 'MILESTONE',
        confirmationWindowHours: 120,
      },
    ];

    for (const e of seedEscrows) {
      await EscrowModel.findOneAndUpdate({ id: e.id }, e, { upsert: true, new: true });
    }

    // 3. Seed Disputes
    const seedDispute = {
      id: 'dsp_83423',
      escrowId: 'esc_83421',
      orderNumber: 'ORD-2026-0121',
      raisedBy: 'usr_buyer_1',
      respondentId: 'usr_seller_1',
      reason: 'Wrong item delivered',
      status: 'OPEN',
      disputedAmount: 3200.00,
      evidence: [
        {
          id: 'evi_1',
          submittedBy: 'usr_buyer_1',
          type: 'TEXT',
          content: 'The delivered assets do not match the agreed specification document.',
          createdAt: new Date(),
        },
      ],
    };

    await DisputeModel.findOneAndUpdate({ id: seedDispute.id }, seedDispute, { upsert: true, new: true });

    return res.status(200).json({
      success: true,
      message: 'MongoDB database successfully seeded with initial Escro platform data!',
      seeded: {
        users: seedUsers.length,
        escrows: seedEscrows.length,
        disputes: 1,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Database seeding failed',
    });
  }
}
