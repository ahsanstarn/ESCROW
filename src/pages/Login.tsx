import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldLogo } from '@/components/ui/Logo';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (authError) {
        setError(authError.message || 'Google login failed. Please try again.');
        setLoading(false);
        return;
      }
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setError('Google login is not configured. Please use email login.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to start Google login. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth?action=dev-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem('escrow_session', JSON.stringify(data));
        const role = data.user?.user_metadata?.role || 'SELLER';
        window.location.href = `/${role.toLowerCase()}`;
      } else {
        setError(data.error || 'Login failed. Try one of the seed emails.');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      
      {/* Left Panel - Black */}
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center p-12 relative overflow-hidden">
        <div 
          className="relative z-10 max-w-xl mx-auto"
          style={{ animation: 'slideInLeft 0.8s ease-out both' }}
        >
          <h1 className="text-5xl font-bold text-white leading-tight mb-8">
            Secure payments for modern businesses
          </h1>
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-[#A3E635] text-black px-8 py-3.5 rounded-full font-bold text-base hover:scale-[1.02] transition-transform duration-300"
          >
            Learn more
          </Link>
        </div>
      </div>

      {/* Right Panel - White */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div 
          className="w-full max-w-[420px]"
          style={{ animation: 'fadeInRight 0.8s ease-out both' }}
        >
          <div className="flex justify-center mb-8" style={{ animation: 'fadeInUp 0.5s ease-out 0.1s both' }}>
            <div className="flex items-center gap-2">
              <ShieldLogo className="w-8 h-8 text-[#A3E635]" />
              <span className="text-xl font-bold text-black">Escro</span>
            </div>
          </div>

          <h2 
            className="text-2xl font-bold text-center text-black mb-8"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.2s both' }}
          >
            Log in to your account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <div style={{ animation: 'fadeInUp 0.5s ease-out 0.3s both' }}>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 border border-slate-200 rounded-xl text-black font-semibold text-sm hover:bg-slate-50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 mb-6 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="relative mb-6" style={{ animation: 'fadeInUp 0.5s ease-out 0.4s both' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.5s both' }}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635] focus:border-[#A3E635] transition-all"
              />
            </div>
            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.6s both' }}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635] focus:border-[#A3E635] transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-start" style={{ animation: 'fadeInUp 0.5s ease-out 0.7s both' }}>
              <a href="/help" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">Forgot your password?</a>
            </div>

            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.8s both' }}>
              <button type="submit" disabled={loading} className="w-full py-3 bg-[#A3E635] text-black font-bold rounded-xl hover:bg-[#b8ed5a] hover:scale-[1.02] transition-all duration-300 text-sm disabled:opacity-50">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          <p 
            className="mt-8 text-center text-sm text-slate-500"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.9s both' }}
          >
            Don't have an account?{' '}
            <Link to="/register" className="text-black font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
