import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';

function generateSecret(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < 32; i++) array[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { userId } = req.query;
      const { data, error } = await supabase.from('webhook_configs').select('*').eq('user_id', userId as string);
      if (error) throw error;
      return res.json({ success: true, data: data || [] });
    }

    if (req.method === 'POST') {
      const { userId, url, events } = req.body;
      const secret = generateSecret();
      const { data, error } = await supabase.from('webhook_configs').insert({
        user_id: userId, url, events: events.join(','), secret,
      }).select().single();
      if (error) throw error;
      return res.status(201).json({ success: true, data });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ success: false, error: (err as Error).message });
  }
}
