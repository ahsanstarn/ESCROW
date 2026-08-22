import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldLogo } from '@/components/ui/Logo';
import { Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
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
        setError('Google login is not configured. Please use email registration.');
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
        setError(data.error || 'Registration failed. Try a different email.');
      }
    } catch {
      setError('Registration failed. Please try again.');
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
          <h1 className="text-5xl font-bold text-white leading-tight mb-12">
            Start accepting payments in minutes
          </h1>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-[#A3E635] flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-black" strokeWidth={3} />
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-1">Bank-level security</p>
                <p className="text-slate-400 text-base">Your data is always protected</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-[#A3E635] flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-black" strokeWidth={3} />
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-1">No setup fees</p>
                <p className="text-slate-400 text-base">Get started for free</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-[#A3E635] flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-black" strokeWidth={3} />
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-1">24/7 Support</p>
                <p className="text-slate-400 text-base">We're here to help</p>
              </div>
            </div>
          </div>
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
            Create your account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.3s both' }}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635] focus:border-[#A3E635] transition-all"
              />
            </div>
            
            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.4s both' }}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635] focus:border-[#A3E635] transition-all"
              />
            </div>
            
            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.5s both' }}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635] focus:border-[#A3E635] transition-all"
              />
              <p className="text-xs text-slate-400 mt-1.5">Must be at least 8 characters</p>
            </div>
            
            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.6s both' }}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635] focus:border-[#A3E635] transition-all"
              />
            </div>

            <div className="flex items-start gap-3 py-2" style={{ animation: 'fadeInUp 0.5s ease-out 0.7s both' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-slate-300 text-[#A3E635] focus:ring-[#A3E635]"
              />
              <span className="text-sm text-slate-500 leading-tight">
                I agree to Escro's{' '}
                <Link to="/terms" className="text-black hover:underline font-medium">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-black hover:underline font-medium">privacy policy</Link>
              </span>
            </div>

            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.8s both' }}>
              <button type="submit" disabled={loading} className="w-full py-3 bg-[#A3E635] text-black font-bold rounded-xl hover:bg-[#b8ed5a] hover:scale-[1.02] transition-all duration-300 text-sm disabled:opacity-50">
                {loading ? 'Creating account...' : 'Continue'}
              </button>
            </div>
          </form>

          <p 
            className="mt-8 text-center text-sm text-slate-500"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.9s both' }}
          >
            Already have an account?{' '}
            <Link to="/login" className="text-black font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
