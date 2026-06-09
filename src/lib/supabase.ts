import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export async function getSupabase(): Promise<SupabaseClient> {
  if (client) return client;
  const res = await fetch('/api/auth?action=config');
  const { url, anonKey } = await res.json();
  client = createClient(url, anonKey);
  return client;
}

export const supabase = {
  auth: {
    getSession: async () => {
      const stored = localStorage.getItem('escrow_session');
      if (stored) {
        try {
          const session = JSON.parse(stored);
          if (session.expires_at && session.expires_at > Date.now() / 1000) {
            return { data: { session: { access_token: session.access_token, user: session.user } }, error: null };
          }
        } catch { /* empty */ }
      }
      return { data: { session: null }, error: null };
    },
    onAuthStateChange: () => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signOut: async () => {
      localStorage.removeItem('escrow_session');
      return { error: null };
    },
    signInWithOAuth: async () => {
      const res = await fetch('/api/auth?action=login');
      const { url } = await res.json();
      window.location.href = url;
      return { data: { url }, error: null };
    },
  },
};
