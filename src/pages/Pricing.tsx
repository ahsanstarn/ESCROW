import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    { name:'Starter',price:'29',features:['5 active escrows','Basic analytics','Email support','2 team members','0.25% platform fee'],cta:'Get Started' },
    { name:'Professional',price:'79',features:['Unlimited escrows','Advanced analytics','Priority support','10 team members','API access','Custom branding'],cta:'Get Started',popular:true },
    { name:'Enterprise',price:'Custom',features:['Custom volume pricing','Dedicated account manager','SLA guarantee','Unlimited team members','White-label option','Custom integrations'],cta:'Contact Sales' },
  ];

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
          <p className="text-[#A3E635] text-sm font-medium mb-4">Pricing</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Protect every payment without changing</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Choose the plan that fits your business needs. All plans include our core escrow protection.</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`bg-[#f5f5f5] border rounded-2xl p-8 ${plan.popular ? 'border-[#A3E635]/50 ring-1 ring-[#A3E635]/20' : 'border-slate-200'}`}>
              {plan.popular && <p className="text-[#A3E635] text-xs font-medium mb-3">Most Popular</p>}
              <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
              <div className="mb-6"><span className="text-4xl font-bold">${plan.price}</span>{plan.price!=='Custom'&&<span className="text-slate-500 text-sm">/month</span>}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f)=>(<li key={f} className="flex items-center gap-2 text-sm text-slate-600"><Check className="w-4 h-4 text-[#A3E635]" strokeWidth={2.5}/>{f}</li>))}
              </ul>
              <Link to="/register" className={`block text-center py-3 rounded-lg font-semibold text-sm ${plan.popular?'bg-[#A3E635] text-black hover:bg-[#b8ed5a]':'bg-black text-white hover:bg-slate-800'} transition-colors`}>{plan.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 bg-white border-t border-slate-100 text-center text-sm text-slate-400">
        &copy; 2026 Escrow. All rights reserved.
      </footer>
    </div>
  );
}
