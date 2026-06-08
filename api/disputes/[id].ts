import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query as { id: string };

  try {
    if (req.method === 'GET') {
      const { data: dispute, error } = await supabase.from('disputes').select(`
        *,
        escrow(*),
        opener:users!disputes_opened_by_id_fkey(id, name, email),
        arbiter:users!disputes_arbiter_id_fkey(id, name),
        evidence(*)
      `).eq('id', id).single();

      if (error || !dispute) return res.status(404).json({ error: 'Not found' });
      return res.json({ success: true, data: dispute });
    }

    if (req.method === 'POST') {
      const { submittedBy, type, url, content } = req.body;
      const { data: evidence, error } = await supabase.from('evidence').insert({
        dispute_id: id, submitted_by: submittedBy, type, url, content,
      }).select().single();
      if (error) throw error;
      return res.status(201).json({ success: true, data: evidence });
    }

    if (req.method === 'PUT') {
      const { outcome, arbiterId, resolutionNotes } = req.body;
      const { data: dispute, error } = await supabase.from('disputes').update({
        status: 'RESOLVED', outcome, arbiter_id: arbiterId, resolution_notes: resolutionNotes, resolved_at: new Date().toISOString(),
      }).eq('id', id).select().single();
      if (error) throw error;
      return res.json({ success: true, data: dispute });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
