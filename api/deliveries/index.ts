import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { courierId } = req.query;
      if (courierId) {
        const { data, error } = await supabase.from('deliveries').select(`
          *,
          escrow:escrows(id, escrow_code, amount, status, product_type, description)
        `).eq('courier_id', courierId).order('created_at', { ascending: false });
        if (error) throw error;
        return res.json({ success: true, data: data || [] });
      }
      const { data, error } = await supabase.from('deliveries').select('*').order('created_at', { ascending: false }).limit(50);
      if (error) throw error;
      return res.json({ success: true, data: data || [] });
    }

    if (req.method === 'POST') {
      const { escrowId, courierId } = req.body;
      const { data, error } = await supabase.from('deliveries').insert({
        escrow_id: escrowId, courier_id: courierId,
      }).select().single();
      if (error) throw error;
      return res.status(201).json({ success: true, data });
    }

    if (req.method === 'PUT') {
      const { id, status, trackingId, proofUrl, notes } = req.body;
      const updates: Record<string, unknown> = { status, tracking_id: trackingId, proof_url: proofUrl, notes };
      if (status === 'PICKED_UP') updates.picked_up_at = new Date().toISOString();
      if (status === 'DELIVERED') updates.delivered_at = new Date().toISOString();

      const { data, error } = await supabase.from('deliveries').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return res.json({ success: true, data });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
