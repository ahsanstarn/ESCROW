import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../src/lib/mongodb';
import { 
  UserModel, EscrowModel, DisputeModel, TransactionModel, 
  BankAccountModel, WebhookModel, DeliveryModel 
} from '../src/lib/models/index';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const db = await connectToDatabase();
    if (!db.connected) throw new Error('Database connection failed');

    const force = req.query.force === 'true';
    if (!force) {
      const count = await UserModel.countDocuments();
      if (count > 0) {
        return res.json({ success: true, message: 'Database already seeded. Use ?force=true to overwrite.' });
      }
    }

    // Clear existing data
    await Promise.all([
      UserModel.deleteMany({}),
      EscrowModel.deleteMany({}),
      DisputeModel.deleteMany({}),
      TransactionModel.deleteMany({}),
      BankAccountModel.deleteMany({}),
      WebhookModel.deleteMany({}),
      DeliveryModel.deleteMany({})
    ]);

    // 1. Create Users
    const users = await UserModel.insertMany([
      { id: uuidv4(), email: 'seller@example.com', name: 'Pro Seller Store', role: 'SELLER', trustScore: 88, kycStatus: 'VERIFIED', walletBalance: 1500 },
      { id: uuidv4(), email: 'buyer@example.com', name: 'Sarah Johnson', role: 'BUYER', trustScore: 85, kycStatus: 'VERIFIED', walletBalance: 5000 },
      { id: uuidv4(), email: 'merchant@example.com', name: 'TechStore Global', role: 'MERCHANT', trustScore: 78, kycStatus: 'VERIFIED', walletBalance: 12000 },
      { id: uuidv4(), email: 'courier@example.com', name: 'QuickDeliver Express', role: 'COURIER', trustScore: 88, kycStatus: 'VERIFIED', walletBalance: 0 },
      { id: uuidv4(), email: 'admin@example.com', name: 'Platform Admin', role: 'ADMIN', trustScore: 100, kycStatus: 'VERIFIED', walletBalance: 0 },
      { id: uuidv4(), email: 'agency@example.com', name: 'Global Agency', role: 'AGENCY', trustScore: 95, kycStatus: 'VERIFIED', walletBalance: 3000 }
    ]);

    const seller = users[0];
    const buyer = users[1];
    const merchant = users[2];
    const courier = users[3];

    // 2. Create Escrows
    const escrowsData = [
      { id: uuidv4(), orderNumber: `ESC-${Date.now()}-1`, sellerId: merchant.id, buyerId: buyer.id, merchantId: merchant.id, title: 'MacBook Pro 14"', amount: 2499.99, fee: 62.50, netAmount: 2437.49, status: 'DELIVERED', productType: 'PHYSICAL', trackingNumber: 'TRK-987654', carrier: 'FedEx' },
      { id: uuidv4(), orderNumber: `ESC-${Date.now()}-2`, sellerId: seller.id, buyerId: buyer.id, merchantId: seller.id, title: 'Sony Headphones', amount: 899.00, fee: 22.48, netAmount: 876.52, status: 'IN_TRANSIT', productType: 'PHYSICAL', trackingNumber: 'TRK-123456', carrier: 'UPS' },
      { id: uuidv4(), orderNumber: `ESC-${Date.now()}-3`, sellerId: merchant.id, buyerId: buyer.id, merchantId: merchant.id, title: 'Design Package', amount: 150.00, fee: 3.75, netAmount: 146.25, status: 'RELEASED', productType: 'DIGITAL' },
      { id: uuidv4(), orderNumber: `ESC-${Date.now()}-4`, sellerId: merchant.id, buyerId: buyer.id, merchantId: merchant.id, title: 'Gaming PC', amount: 3200.00, fee: 80.00, netAmount: 3120.00, status: 'DISPUTED', productType: 'PHYSICAL', trackingNumber: 'TRK-555666', carrier: 'DHL' },
      { id: uuidv4(), orderNumber: `ESC-${Date.now()}-5`, sellerId: seller.id, buyerId: buyer.id, merchantId: seller.id, title: 'WordPress Setup', amount: 450.00, fee: 11.25, netAmount: 438.75, status: 'FUNDED', productType: 'SERVICE' },
      { id: uuidv4(), orderNumber: `ESC-${Date.now()}-6`, sellerId: merchant.id, buyerId: buyer.id, merchantId: merchant.id, title: 'SEO Consultation', amount: 750.00, fee: 18.75, netAmount: 731.25, status: 'DISPUTED', productType: 'SERVICE' },
      { id: uuidv4(), orderNumber: `ESC-${Date.now()}-7`, sellerId: seller.id, buyerId: buyer.id, merchantId: seller.id, title: 'Smart Watch', amount: 299.00, fee: 7.48, netAmount: 291.52, status: 'PENDING', productType: 'PHYSICAL' },
      { id: uuidv4(), orderNumber: `ESC-${Date.now()}-8`, sellerId: merchant.id, buyerId: buyer.id, merchantId: merchant.id, title: 'API Integration', amount: 1200.00, fee: 30.00, netAmount: 1170.00, status: 'CANCELLED', productType: 'DIGITAL' },
    ];
    
    const escrows = await EscrowModel.insertMany(escrowsData);

    // 3. Create Disputes
    await DisputeModel.insertMany([
      { id: uuidv4(), escrowId: escrows[3].id, orderNumber: escrows[3].orderNumber, raisedBy: buyer.id, respondentId: merchant.id, reason: 'Item not as described', status: 'UNDER_REVIEW', disputedAmount: 3200.00 },
      { id: uuidv4(), escrowId: escrows[5].id, orderNumber: escrows[5].orderNumber, raisedBy: buyer.id, respondentId: merchant.id, reason: 'Service not delivered', status: 'OPEN', disputedAmount: 750.00 },
      { id: uuidv4(), escrowId: escrows[0].id, orderNumber: escrows[0].orderNumber, raisedBy: buyer.id, respondentId: merchant.id, reason: 'Late delivery', status: 'RESOLVED_SELLER', disputedAmount: 2499.99 },
    ]);

    // 4. Create Transactions (Ledger)
    await TransactionModel.insertMany([
      { id: uuidv4(), userId: buyer.id, escrowId: escrows[0].id, type: 'ESCROW_LOCK', amount: 2499.99, balanceAfter: 2500.01, description: 'Funds held for ESC-1' },
      { id: uuidv4(), userId: buyer.id, escrowId: escrows[2].id, type: 'ESCROW_LOCK', amount: 150.00, balanceAfter: 2350.01, description: 'Funds held for ESC-3' },
      { id: uuidv4(), userId: merchant.id, escrowId: escrows[2].id, type: 'ESCROW_RELEASE', amount: 146.25, balanceAfter: 12146.25, description: 'Funds released from ESC-3' },
      { id: uuidv4(), userId: buyer.id, type: 'DEPOSIT', amount: 5000.00, balanceAfter: 7350.01, description: 'Wallet top-up' },
    ]);

    // 5. Create Bank Accounts
    await BankAccountModel.insertMany([
      { id: uuidv4(), userId: merchant.id, bankName: 'Chase Bank', accountNumber: '****1234', routingNumber: '123456789', accountType: 'BUSINESS', isDefault: true },
      { id: uuidv4(), userId: seller.id, bankName: 'Bank of America', accountNumber: '****5678', routingNumber: '987654321', accountType: 'CHECKING', isDefault: true },
    ]);

    // 6. Create Webhooks
    await WebhookModel.insertMany([
      { id: uuidv4(), userId: merchant.id, url: 'https://merchant.com/api/webhooks', events: ['escrow.created', 'escrow.released'], secret: 'whsec_12345', isActive: true },
    ]);

    // 7. Create Deliveries
    await DeliveryModel.insertMany([
      { id: uuidv4(), escrowId: escrows[0].id, courierId: courier.id, status: 'DELIVERED', trackingNumber: 'TRK-987654', carrier: 'FedEx', actualDelivery: new Date() },
      { id: uuidv4(), escrowId: escrows[1].id, courierId: courier.id, status: 'IN_TRANSIT', trackingNumber: 'TRK-123456', carrier: 'UPS' },
      { id: uuidv4(), escrowId: escrows[3].id, courierId: courier.id, status: 'DELIVERED', trackingNumber: 'TRK-555666', carrier: 'DHL', actualDelivery: new Date(Date.now() - 86400000) },
    ]);

    return res.json({ success: true, message: 'Database seeded successfully with MongoDB data' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
