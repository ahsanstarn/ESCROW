import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import { UserModel } from '../../src/lib/models/index';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = (req.query.action as string) || (req.body?.action as string);

  try {
    const db = await connectToDatabase();
    if (!db.connected) {
      return res.status(500).json({ error: 'Database connection failed' });
    }

    switch (action) {
      case 'config': {
        return res.json({ provider: 'mongodb', ready: true });
      }

      case 'login':
      case 'dev-login': {
        const { email, name, role } = req.body || {};
        if (!email) return res.status(400).json({ error: 'Missing email' });

        const normalizedEmail = (email as string).trim().toLowerCase();
        let user = await UserModel.findOne({ email: normalizedEmail });

        if (!user) {
          const userName = name || normalizedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
          const userRole = role || (normalizedEmail.includes('seller') ? 'SELLER' : normalizedEmail.includes('admin') ? 'ADMIN' : normalizedEmail.includes('agency') ? 'AGENCY' : normalizedEmail.includes('merchant') ? 'MERCHANT' : 'BUYER');
          
          user = await UserModel.create({
            id: `usr-${uuidv4().slice(0, 8)}`,
            email: normalizedEmail,
            name: userName,
            role: userRole,
            kycStatus: 'VERIFIED',
            trustScore: 85,
            riskScore: 5,
            walletBalance: 2500,
            inEscrowBalance: 0,
          });
        }

        const session = {
          access_token: `token_${user.id}_${Date.now()}`,
          refresh_token: `refresh_${user.id}_${Date.now()}`,
          expires_at: Math.floor(Date.now() / 1000) + 86400 * 7,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            trustScore: user.trustScore,
            kycStatus: user.kycStatus,
            walletBalance: user.walletBalance,
            inEscrowBalance: user.inEscrowBalance,
            user_metadata: {
              name: user.name,
              role: user.role,
              trustScore: user.trustScore,
              walletBalance: user.walletBalance,
            },
          },
        };

        return res.json(session);
      }

      case 'register': {
        const { email, name, role = 'BUYER' } = req.body || {};
        if (!email || !name) return res.status(400).json({ error: 'Missing email or name' });

        const normalizedEmail = (email as string).trim().toLowerCase();
        let existing = await UserModel.findOne({ email: normalizedEmail });
        if (existing) {
          return res.status(400).json({ error: 'User with this email already exists. Please log in.' });
        }

        const newUser = await UserModel.create({
          id: `usr-${uuidv4().slice(0, 8)}`,
          email: normalizedEmail,
          name: name.trim(),
          role,
          kycStatus: 'PENDING',
          trustScore: 75,
          riskScore: 10,
          walletBalance: 1000,
          inEscrowBalance: 0,
        });

        const session = {
          access_token: `token_${newUser.id}_${Date.now()}`,
          refresh_token: `refresh_${newUser.id}_${Date.now()}`,
          expires_at: Math.floor(Date.now() / 1000) + 86400 * 7,
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            trustScore: newUser.trustScore,
            kycStatus: newUser.kycStatus,
            walletBalance: newUser.walletBalance,
            inEscrowBalance: newUser.inEscrowBalance,
            user_metadata: {
              name: newUser.name,
              role: newUser.role,
            },
          },
        };

        return res.status(201).json(session);
      }

      case 'refresh': {
        const { refresh_token } = req.body || {};
        if (!refresh_token) return res.status(400).json({ error: 'Missing refresh_token' });
        
        const parts = (refresh_token as string).split('_');
        const userId = parts[1];
        if (userId) {
          const user = await UserModel.findOne({ id: userId });
          if (user) {
            return res.json({
              access_token: `token_${user.id}_${Date.now()}`,
              refresh_token: `refresh_${user.id}_${Date.now()}`,
              expires_at: Math.floor(Date.now() / 1000) + 86400 * 7,
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                user_metadata: { name: user.name, role: user.role },
              },
            });
          }
        }
        return res.json({ access_token: refresh_token, expires_at: Math.floor(Date.now() / 1000) + 86400 });
      }

      case 'logout': {
        return res.json({ success: true });
      }

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
