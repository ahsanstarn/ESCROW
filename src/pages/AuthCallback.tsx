import { useEffect, useState } from 'react';

export default function AuthCallback() {
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Completing authentication...');

  useEffect(() => {
    (async () => {
      try {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const expiresAt = params.get('expires_at');

        if (!accessToken) {
          setError('No access token received from authentication provider');
          setTimeout(() => { window.location.href = '/login'; }, 3000);
          return;
        }

        const res = await fetch('/api/auth?action=config');
        const { url, anonKey } = await res.json();

        const userRes = await fetch(`${url}/auth/v1/user`, {
          headers: { Authorization: `Bearer ${accessToken}`, apikey: anonKey },
        });
        const userData = await userRes.json();

        const session = {
          access_token: accessToken,
          refresh_token: refreshToken || '',
          expires_at: expiresAt ? parseInt(expiresAt, 10) : Math.floor(Date.now() / 1000) + 3600,
          user: userData ? {
            id: userData.id,
            email: userData.email,
            user_metadata: userData.user_metadata || {},
          } : null,
        };

        localStorage.setItem('escrow_session', JSON.stringify(session));

        const role = userData?.user_metadata?.role || 'SELLER';
        window.location.href = `/${role.toLowerCase()}`;
      } catch (err: any) {
        setError(err.message || 'Authentication failed');
        setTimeout(() => { window.location.href = '/login'; }, 3000);
      }
    })();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="text-center max-w-md mx-4">
        {error ? (
          <>
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <p className="text-sm text-red-400 mb-2">{error}</p>
            <a href="/login" className="text-xs text-[#A3E635] underline">Go to login</a>
          </>
        ) : (
          <>
            <div className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">{status}</p>
          </>
        )}
      </div>
    </div>
  );
}
