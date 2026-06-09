import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ShieldLogo } from '@/components/ui/Logo';
import { Check } from 'lucide-react';

export default function Register() {
  const { signInWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/merchant';
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Black */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#1a1a1a] items-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path d="M40 40 C80 20, 120 60, 160 40" stroke="#A3E635" strokeWidth="1.5" fill="none" opacity="0.4" />
            <path d="M30 80 C70 60, 110 100, 150 80" stroke="#A3E635" strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M50 120 C90 100, 130 140, 170 120" stroke="#A3E635" strokeWidth="1.5" fill="none" opacity="0.2" />
            <path d="M40 160 C80 140, 120 180, 160 160" stroke="#A3E635" strokeWidth="1.5" fill="none" opacity="0.15" />
          </svg>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#A3E635" />
              <path d="M10 14C12.5 11 15.5 11 18 14C20.5 17 23.5 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 20C12.5 17 15.5 17 18 20C20.5 23 23.5 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 26C12.5 23 15.5 23 18 26C20.5 29 23.5 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-bold text-white">Escrow</span>
          </div>
          <p className="text-xs text-slate-400 mb-6">Payment Platform</p>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Start accepting payments in minutes
          </h1>
          <p className="text-slate-400 mb-8 text-base leading-relaxed">
            Sign up for Escrow and join thousands of businesses using Escrow for secure payment processing.
          </p>

          <div className="space-y-5 mb-8">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-[#A3E635] flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-black" strokeWidth={3} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Bank-level security</p>
                <p className="text-slate-400 text-sm">Your data is always protected</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-[#A3E635] flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-black" strokeWidth={3} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">No setup fees</p>
                <p className="text-slate-400 text-sm">Get started for free</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-[#A3E635] flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-black" strokeWidth={3} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">24/7 Support</p>
                <p className="text-slate-400 text-sm">We're here to help</p>
              </div>
            </div>
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors"
          >
            Explore features
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right Panel - White */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-white">
        <div className="w-full max-w-[380px]">
          <div className="flex justify-center mb-4 md:mb-6">
            <ShieldLogo className="w-10 h-10 md:w-12 md:h-12" />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-center text-black mb-4 md:mb-6">Create your account</h2>

          <button
            onClick={signInWithGoogle}
            className="w-full py-2.5 border border-slate-200 rounded-lg text-black font-medium text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 mb-4 min-h-[44px]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-400">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635]/50 transition-all min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635]/50 transition-all min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635]/50 transition-all min-h-[44px]"
              />
              <p className="text-xs text-slate-400 mt-1">Must be at least 8 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635]/50 transition-all min-h-[44px]"
              />
            </div>

            <button type="submit" className="w-full py-2.5 bg-[#A3E635] text-black font-semibold rounded-lg hover:bg-[#b8ed5a] transition-colors text-sm min-h-[44px]">
              Continue
            </button>
          </form>

          <div className="mt-4 flex items-start gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#A3E635] focus:ring-[#A3E635]"
            />
            <span className="text-xs md:text-sm text-slate-500">
              I agree to Escrow's{' '}
              <Link to="/terms" className="text-[#A3E635] hover:text-[#b8ed5a] font-medium">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-[#A3E635] hover:text-[#b8ed5a] font-medium">privacy policy</Link>
            </span>
          </div>

          <p className="mt-4 md:mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/login" className="text-[#A3E635] hover:text-[#b8ed5a] font-medium">Sign up</Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link to="/" className="text-slate-500 hover:text-slate-700 underline">Back to Escrow homepage</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
