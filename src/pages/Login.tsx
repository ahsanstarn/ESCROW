import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ShieldLogo } from '@/components/ui/Logo';

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/merchant';
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Black */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#1a1a1a] items-center p-12 relative overflow-hidden">
        {/* Subtle wave graphics */}
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
            Secure payments for modern businesses
          </h1>
          <p className="text-slate-400 mb-8 text-base leading-relaxed">
            Join thousands of businesses that trust Escrow for their payment processing needs.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors"
          >
            Learn more
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right Panel - White */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-[380px]">
          <div className="flex justify-center mb-6">
            <ShieldLogo className="w-12 h-12" />
          </div>

          <h2 className="text-2xl font-bold text-center text-black mb-6">Log in to your account</h2>

          <button
            onClick={signInWithGoogle}
            className="w-full py-2.5 border border-slate-200 rounded-lg text-black font-medium text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 mb-4"
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address or username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635]/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635]/50 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#A3E635] hover:text-[#b8ed5a] font-medium">Forgot your password?</a>
            </div>

            <button type="submit" className="w-full py-2.5 bg-[#A3E635] text-black font-semibold rounded-lg hover:bg-[#b8ed5a] transition-colors text-sm">
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#A3E635] hover:text-[#b8ed5a] font-medium">Sign up</Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link to="/" className="text-slate-500 hover:text-slate-700 underline">Back to Escrow homepage</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
