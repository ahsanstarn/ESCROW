import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (authError) throw authError;
      if (data?.url) window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || 'Google login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
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
        setError(data.error || 'Registration failed. Try one of the seed emails.');
      }
    } catch {
      setError('Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
      
      {/* Left Panel - Black */}
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center p-16 xl:p-24 relative overflow-hidden">
        <div className="relative z-10 max-w-lg w-full" style={{ animation: 'slideInLeft 0.8s ease-out both' }}>
          <div className="mb-8">
            <h2 className="text-white text-2xl font-bold mb-1">Escro</h2>
            <p className="text-gray-400 text-sm">Payment Platform</p>
          </div>
          
          <h1 className="text-[3.5rem] font-display font-bold text-white leading-[1.1] mb-6">
            Start<br/>accepting<br/>payments in<br/>minutes
          </h1>
          
          <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
            Create your free account and join thousands of businesses using Escro for secure payment processing.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#A3E635] flex-shrink-0" fill="#A3E635" color="black" />
              <div>
                <h3 className="text-white font-semibold text-sm">Bank-level security</h3>
                <p className="text-gray-400 text-sm">Your data is always protected</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#A3E635] flex-shrink-0" fill="#A3E635" color="black" />
              <div>
                <h3 className="text-white font-semibold text-sm">No setup fees</h3>
                <p className="text-gray-400 text-sm">Get started for free</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#A3E635] flex-shrink-0" fill="#A3E635" color="black" />
              <div>
                <h3 className="text-white font-semibold text-sm">24/7 Support</h3>
                <p className="text-gray-400 text-sm">We're here to help</p>
              </div>
            </div>
          </div>
          
          <Link to="/help" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#92cf2f] transition-colors">
            Explore features <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Right Panel - White */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-[400px]" style={{ animation: 'fadeInRight 0.8s ease-out both' }}>
          
          <div className="flex justify-center mb-6" style={{ animation: 'fadeInUp 0.5s ease-out 0.1s both' }}>
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#A3E635]">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold text-center text-black mb-8" style={{ animation: 'fadeInUp 0.5s ease-out 0.2s both' }}>
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
              className="w-full py-2.5 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 mb-6"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="relative mb-6" style={{ animation: 'fadeInUp 0.5s ease-out 0.4s both' }}>
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-2 bg-white text-gray-400">or</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.5s both' }}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635] transition-all"
              />
            </div>

            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.5s both' }}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635] transition-all"
              />
            </div>
            
            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.6s both' }}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
                className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635] transition-all"
              />
              <p className="text-[10px] text-gray-400 mt-1">Must be at least 8 characters</p>
            </div>

            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.6s both' }}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635] transition-all"
              />
            </div>

            <div style={{ animation: 'fadeInUp 0.5s ease-out 0.8s both' }}>
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-[#A3E635] text-black font-semibold rounded-lg hover:bg-[#92cf2f] transition-colors text-sm disabled:opacity-50 mt-2">
                {loading ? 'Continuing...' : 'Continue'}
              </button>
            </div>

            <div className="flex items-start gap-2 mt-4" style={{ animation: 'fadeInUp 0.5s ease-out 0.8s both' }}>
              <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-[#A3E635] focus:ring-[#A3E635]" />
              <p className="text-xs text-gray-500">
                I agree to Escro's <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy policy</a>
              </p>
            </div>
          </form>

          <div className="mt-8 text-center space-y-2" style={{ animation: 'fadeInUp 0.5s ease-out 0.9s both' }}>
            <p className="text-xs text-gray-500">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
            </p>
            <p>
              <Link to="/" className="text-xs text-blue-600 hover:underline">Back to Escro homepage</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
