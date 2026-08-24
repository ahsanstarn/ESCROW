import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../../src/lib/mongodb';
import { UserModel, EscrowModel, DisputeModel, TransactionModel } from '../../src/lib/models';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const startTime = Date.now();
    const { connected, error } = await connectToDatabase();
    const latency = Date.now() - startTime;

    if (!connected) {
      return res.status(200).json({
        success: false,
        driver: 'mongodb',
        status: 'disconnected',
        message: error || 'MongoDB is not connected. Set MONGODB_URI in environment variables.',
        envConfigured: !!(process.env.MONGODB_URI || process.env.DATABASE_URL),
        timestamp: new Date().toISOString(),
      });
    }

    // Connected: Fetch collection statistics
    const [usersCount, escrowsCount, disputesCount, transactionsCount] = await Promise.all([
      UserModel.countDocuments().catch(() => 0),
      EscrowModel.countDocuments().catch(() => 0),
      DisputeModel.countDocuments().catch(() => 0),
      TransactionModel.countDocuments().catch(() => 0),
    ]);

    return res.status(200).json({
      success: true,
      driver: 'mongodb',
      status: 'connected',
      latencyMs: latency,
      database: 'escrow_saas',
      collections: {
        users: usersCount,
        escrows: escrowsCount,
        disputes: disputesCount,
        transactions: transactionsCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Failed to check database status',
    });
  }
}
