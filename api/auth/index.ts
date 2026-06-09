import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
          return res.json({ url: null, devMode: true });
        }
        const redirectUrl = `${req.headers.origin || 'https://escrow-trust-platform.vercel.app'}/auth/callback`;
        const authUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`;
        return res.json({ url: authUrl });
      }

      case 'dev-login': {
        const { email } = req.body || {};
        if (!email) return res.status(400).json({ error: 'Missing email' });
        let user: any = null;
        if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
          try {
            const userRes = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email as string)}&select=*`, {
              headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`, 'Content-Type': 'application/json' },
            });
            if (userRes.ok) {
              const users = await userRes.json();
              user = users?.[0];
              if (!user?.id) {
                const name = (email as string).split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
                const newUserRes = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
                  method: 'POST',
                  headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
                  body: JSON.stringify({ email: email as string, name, role: 'BUYER', kyc_status: 'PENDING', trust_score: 50, risk_score: 0 }),
                });
                if (newUserRes.ok) {
                  const newUsers = await newUserRes.json();
                  user = Array.isArray(newUsers) ? newUsers[0] : newUsers;
                }
              }
            }
          } catch { /* fallback below */ }
        }
        if (!user?.id) {
          const name = (email as string).split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
          user = { id: `dev-${(email as string).replace(/[^a-z0-9]/g, '-')}`, email: email as string, name, role: 'BUYER' };
        }
        const mockSession = {
          access_token: `dev_token_${user.id}`,
          refresh_token: `dev_refresh_${user.id}`,
          expires_at: Math.floor(Date.now() / 1000) + 86400,
          user: { id: user.id, email: user.email, user_metadata: { name: user.name, role: user.role } },
        };
        return res.json(mockSession);
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
