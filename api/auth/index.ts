import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action as string;

  try {
    switch (action) {
      case 'config': {
        return res.json({ url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY });
      }

      case 'login': {
        const redirectUrl = `${req.headers.origin || 'https://escrow-trust-platform.vercel.app'}/auth/callback`;
        const authUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`;
        return res.json({ url: authUrl });
      }

      case 'callback': {
        const { code } = req.body || {};
        if (!code) return res.status(400).json({ error: 'Missing code' });
        const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=authorization_code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY! },
          body: JSON.stringify({ code }),
        });
        const data = await r.json();
        if (!r.ok) return res.status(r.status).json({ error: data.error_description || 'Auth failed' });
        return res.json({ access_token: data.access_token, refresh_token: data.refresh_token, expires_in: data.expires_in, expires_at: data.expires_at, user: data.user });
      }

      case 'refresh': {
        const { refresh_token } = req.body || {};
        if (!refresh_token) return res.status(400).json({ error: 'Missing refresh_token' });
        const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY! },
          body: JSON.stringify({ refresh_token }),
        });
        const data = await r.json();
        if (!r.ok) return res.status(r.status).json({ error: data.error_description || 'Refresh failed' });
        return res.json({ access_token: data.access_token, refresh_token: data.refresh_token, expires_in: data.expires_in, expires_at: data.expires_at, user: data.user });
      }

      case 'logout': {
        const { access_token } = req.body || {};
        if (access_token) {
          await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY!, 'Authorization': `Bearer ${access_token}` },
          });
        }
        return res.json({ success: true });
      }

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
