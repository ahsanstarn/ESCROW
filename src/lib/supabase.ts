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
    signInWithOAuth: async (options?: { provider: string }) => {
      try {
        const supabase = await getSupabase();
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        return { data, error };
      } catch (err) {
        return { data: null, error: { message: 'Failed to initialize Google login. Please try again.' } };
      }
    },
  },
};
