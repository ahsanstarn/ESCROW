import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#A3E635"/><path d="M10 14C12.5 11 15 11 18 14C20.5 17 23 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round"/><path d="M10 20C12.5 17 15 17 18 20C20.5 23 23 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round"/><path d="M10 26C12.5 23 15 23 18 26C20.5 29 23 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round"/></svg>
            <span className="text-lg font-bold text-white">Escrow</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-white hover:text-slate-200 px-4 py-2">Login</Link>
            <Link to="/register" className="text-sm font-semibold bg-[#A3E635] text-black px-5 py-2 rounded-lg hover:bg-[#b8ed5a]">Register</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#A3E635] text-sm font-medium mb-4">About Us</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Making transactions safer for everyone</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">We're building the world's most trusted escrow platform, protecting buyers and sellers in every transaction.</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our mission</h2>
            <p className="text-slate-500 leading-relaxed mb-6">Founded in 2022, Escrow was built on a simple belief: every transaction deserves to be protected. We eliminate the trust gap between buyers and sellers by holding funds securely until both parties are satisfied.</p>
            <p className="text-slate-500 leading-relaxed">Today, we process over $3.2 billion in transactions annually, serving over 1.5 million customers across 180+ countries.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{num:'10K+',label:'Active Users'},{num:'100%',label:'Secure'},{num:'4.9/5',label:'Trust Rating'},{num:'180+',label:'Countries'}].map(s=>(
              <div key={s.label} className="bg-[#f5f5f5] rounded-2xl p-8 text-center">
                <p className="text-3xl font-bold mb-1">{s.num}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our values</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[{t:'Trust First',d:'Every decision starts with protecting our users'},{t:'Radical Transparency',d:'No hidden fees, no surprises, ever'},{t:'Global Reach',d:'Empowering commerce across borders without barriers'}].map(v=>(
              <div key={v.t} className="bg-[#1a1a1a] rounded-2xl p-8 border border-slate-800/50">
                <h3 className="text-xl font-bold mb-3">{v.t}</h3>
                <p className="text-slate-400 text-sm">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 bg-white border-t border-slate-100 text-center text-sm text-slate-400">
        &copy; 2026 Escrow. All rights reserved.
      </footer>
    </div>
  );
}
