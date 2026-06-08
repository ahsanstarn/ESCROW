import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const FEATURES = [
  { icon: Shield, text: 'Bank-level security' },
  { icon: Shield, text: 'No setup fees' },
  { icon: Shield, text: '24/7 Support' },
];

export default function Register() {
  const { signInWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/merchant';
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 to-transparent" />
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-brand-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">E</span>
            </div>
            <span className="text-2xl font-bold">Escrow</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Start accepting payments in minutes
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Join thousands of businesses using Escrow to protect their transactions.
          </p>
          <ul className="space-y-4">
            {FEATURES.map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-brand-400/20 rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-brand-400" />
                </div>
                <span className="text-slate-300">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-black">Escrow</span>
          </div>

          <h2 className="text-2xl font-bold text-black mb-2">Create an account</h2>
          <p className="text-sm text-slate-500 mb-8">Get started with your free account today.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400/50 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400/50 transition-all"
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-400 focus:ring-brand-400" />
              <span className="text-sm text-slate-500">
                I agree to the{' '}
                <a href="#" className="text-brand-500 hover:text-brand-600 font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-brand-500 hover:text-brand-600 font-medium">Privacy Policy</a>
              </span>
            </div>

            <button type="submit" className="w-full py-2.5 bg-brand-400 text-black font-semibold rounded-lg hover:bg-brand-500 transition-colors">
              Sign Up
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-400">or continue with</span>
            </div>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full py-2.5 bg-slate-50 border border-slate-200 text-black font-medium rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-500 hover:text-brand-600 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
