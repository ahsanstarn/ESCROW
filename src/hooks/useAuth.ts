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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      try {
        const stored = localStorage.getItem('escrow_session');
        if (!stored) {
          if (!cancelled) setLoading(false);
          return;
        }
        let parsed: AuthSession;
        try {
          parsed = JSON.parse(stored);
        } catch {
          localStorage.removeItem('escrow_session');
          setError('Invalid session data. Please sign in again.');
          if (!cancelled) setLoading(false);
          return;
        }
        if (parsed.expires_at && parsed.expires_at > Date.now() / 1000) {
          if (!cancelled) {
            setSession(parsed);
            setUser(parsed.user);
          }
        } else if (parsed.refresh_token) {
          try {
            const res = await fetch('/api/auth?action=refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: parsed.refresh_token }),
            });
            if (res.ok) {
              const data: AuthSession = await res.json();
              if (!cancelled) {
                setSession(data);
                setUser(data.user);
                setError(null);
              }
              localStorage.setItem('escrow_session', JSON.stringify(data));
            } else {
              localStorage.removeItem('escrow_session');
              if (!cancelled) {
                setSession(null);
                setUser(null);
                setError('Session refresh failed. Please sign in again.');
              }
            }
          } catch {
            localStorage.removeItem('escrow_session');
            if (!cancelled) {
              setSession(null);
              setUser(null);
              setError('Network error during session refresh.');
            }
          }
        } else {
          localStorage.removeItem('escrow_session');
          setError('Session expired. Please sign in again.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    init();
    return () => { cancelled = true; };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const res = await fetch('/api/auth?action=login');
      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Failed to initiate Google sign in.');
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
      setError(null);
      return true;
    } catch (error) {
      console.error('Callback error:', error);
      setError('Authentication failed. Please try again.');
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
    } catch {
      // Logout endpoint may fail, but we still clear local state
    }
    localStorage.removeItem('escrow_session');
    setSession(null);
    setUser(null);
    setError(null);
  }, [session]);

  const clearError = useCallback(() => setError(null), []);

  return { session, user, loading, error, clearError, signInWithGoogle, handleCallback, signOut };
}
