import { useState, useEffect, useCallback } from 'react';

interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; email: string; user_metadata: any } | null;
}

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthSession['user']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('escrow_session');
    if (stored) {
      try {
        const parsed: AuthSession = JSON.parse(stored);
        if (parsed.expires_at && parsed.expires_at > Date.now() / 1000) {
          setSession(parsed);
          setUser(parsed.user);
        } else if (parsed.refresh_token) {
          refreshSession(parsed.refresh_token);
        } else {
          localStorage.removeItem('escrow_session');
        }
      } catch {
        localStorage.removeItem('escrow_session');
      }
    }
    setLoading(false);
  }, []);

  const refreshSession = async (refreshToken: string) => {
    try {
      const res = await fetch('/api/auth?action=refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (res.ok) {
        const data: AuthSession = await res.json();
        setSession(data);
        setUser(data.user);
        localStorage.setItem('escrow_session', JSON.stringify(data));
      } else {
        localStorage.removeItem('escrow_session');
        setSession(null);
        setUser(null);
      }
    } catch {
      localStorage.removeItem('escrow_session');
      setSession(null);
      setUser(null);
    }
  };

  const signInWithGoogle = useCallback(async () => {
    try {
      const res = await fetch('/api/auth?action=login');
      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Failed to sign in with Google.');
    }
  }, []);

  const handleCallback = useCallback(async (code: string) => {
    try {
      const res = await fetch('/api/auth?action=callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) throw new Error('Auth failed');
      const data: AuthSession = await res.json();
      setSession(data);
      setUser(data.user);
      localStorage.setItem('escrow_session', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Callback error:', error);
      return false;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      if (session?.access_token) {
        await fetch('/api/auth?action=logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token: session.access_token }),
        });
      }
    } catch { /* empty */ }
    localStorage.removeItem('escrow_session');
    setSession(null);
    setUser(null);
  }, [session]);

  return { session, user, loading, signInWithGoogle, handleCallback, signOut };
}
