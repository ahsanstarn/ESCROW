import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';
import { z } from 'zod';

const createSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['BUYER', 'MERCHANT', 'COURIER', 'ADMIN']),
  phone: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { role, id, stats } = req.query;

      if (stats === 'true' && id) {
        const { data: user } = await supabase.from('users').select('*').eq('id', id as string).single();
        if (!user) return res.status(404).json({ error: 'Not found' });
        const field = user.role === 'MERCHANT' ? 'merchant_id' : 'buyer_id';
        const [totalRes, activeRes, completedRes, disputesRes] = await Promise.all([
          supabase.from('escrows').select('*', { count: 'exact', head: true }).eq(field, id as string),
          supabase.from('escrows').select('*', { count: 'exact', head: true }).eq(field, id as string).in('status', ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED']),
          supabase.from('escrows').select('*', { count: 'exact', head: true }).eq(field, id as string).eq('status', 'RELEASED'),
          supabase.from('disputes').select('*', { count: 'exact', head: true }).eq('opened_by_id', id as string),
        ]);
        const totalEscrows = totalRes.count || 0;
        const completedEscrows = completedRes.count || 0;
        return res.json({
          success: true,
          data: {
            user: { id: user.id, name: user.name, role: user.role, trustScore: user.trust_score },
            totalEscrows, activeEscrows: activeRes.count || 0, completedEscrows, disputes: disputesRes.count || 0,
            successRate: totalEscrows > 0 ? ((completedEscrows / totalEscrows) * 100).toFixed(1) : '0',
          },
        });
      }

      let query = supabase.from('users').select('*');
      if (role) query = query.eq('role', role as string);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return res.json({ success: true, data: data || [] });
    }

    if (req.method === 'POST') {
      const data = createSchema.parse(req.body);
      const { data: user, error } = await supabase.from('users').insert({
        email: data.email, name: data.name, role: data.role, phone: data.phone,
      }).select().single();
      if (error) throw error;
      return res.status(201).json({ success: true, data: user });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ success: false, errors: err.errors });
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
