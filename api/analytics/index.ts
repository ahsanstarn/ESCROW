import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import { EscrowModel, TransactionModel, UserModel, DisputeModel } from '../../src/lib/models/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    await connectToDatabase();
    
    const { userId } = req.query;
    
    const filter: any = {};
    if (userId) filter.userId = userId;

    const totalUsers = await UserModel.countDocuments();
    const totalEscrows = await EscrowModel.countDocuments();
    
    const escrowFilter = userId ? { $or: [{ merchantId: userId }, { buyerId: userId }] } : {};
    const activeEscrows = await EscrowModel.countDocuments({ ...escrowFilter, status: { $in: ['PENDING', 'FUNDED', 'IN_TRANSIT'] } });
    const completedEscrows = await EscrowModel.countDocuments({ ...escrowFilter, status: 'RELEASED' });
    const disputedEscrows = await EscrowModel.countDocuments({ ...escrowFilter, status: 'DISPUTED' });

    // Aggregate volume
    const volumeData = await EscrowModel.aggregate([
      { $match: { ...escrowFilter, status: 'RELEASED' } },
      { $group: { _id: null, totalVolume: { $sum: '$amount' } } }
    ]);
    const totalVolume = volumeData.length > 0 ? volumeData[0].totalVolume : 0;

    return res.json({
      success: true,
      data: {
        totalUsers,
        totalEscrows,
        activeEscrows,
        completedEscrows,
        disputedEscrows,
        totalVolume
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
