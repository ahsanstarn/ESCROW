import { Link } from 'react-router-dom';
import { ArrowRight, Play, Check, ChevronDown } from 'lucide-react';

const FEATURES = [
  { title: 'Payments you control', desc: 'Set your release conditions, hold transfers conditionally upon approval, or pay out shift milestones with full visibility.' },
  { title: 'Spend like a local, globally', desc: 'Provide a local builder experience with Escrow, creating a local bank details in many regions and countries.' },
  { title: 'Stay secure throughout the transaction', desc: 'Built-in safeguards protect against fraud, non-delivery, and payment disputes from start to finish.' },
  { title: 'Empower your team with permissions', desc: 'Manage your team, your team, and company needs from one powerful central account.' },
];

const STEPS = [
  { num: 1, title: 'Buyer and Seller agree to terms', desc: 'Both parties confirm transaction details' },
  { num: 2, title: 'Buyer submits payment to Escrow', desc: 'Funds held securely in escrow' },
  { num: 3, title: 'Seller delivers goods or service to buyer', desc: 'Product or service provided' },
  { num: 4, title: 'Buyer approves goods or services', desc: 'Buyer confirms satisfaction' },
  { num: 5, title: 'Escrow releases payment to seller', desc: 'Transaction complete' },
];

const BUSINESS_CARDS = [
  { title: 'Hold and release payments globally', link: 'Explore Escrow Payments', color: 'bg-[#A3E635]', textColor: 'text-black', span: 'md:col-span-1 md:row-span-2' },
  { title: 'Invoices backed by escrow', link: 'Learn more about Escrow Invoices', color: 'bg-[#2a2a2a]', textColor: 'text-white', span: 'md:col-span-1' },
  { title: 'Smart company cards with spending control', link: 'Learn more about Escrow Cards', color: 'bg-[#2a2a2a]', textColor: 'text-white', span: 'md:col-span-1' },
  { title: 'Hold, exchange, and release at fair rates', link: 'Explore Escrow Exchange', color: 'bg-[#2a2a2a]', textColor: 'text-white', span: 'md:col-span-1' },
  { title: 'Set and manage escrow permissions with your team', link: '', color: 'bg-[#2a2a2a]', textColor: 'text-white', span: 'md:col-span-1' },
];

export default function Landing() { // v2
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#A3E635" />
              <path d="M10 14C12.5 11 15.5 11 18 14C20.5 17 23.5 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 20C12.5 17 15.5 17 18 20C20.5 23 23.5 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 26C12.5 23 15.5 23 18 26C20.5 29 23.5 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-lg font-bold text-white">Escrow</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#help" className="hover:text-white transition-colors">Help</a>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              EN <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-white hover:text-slate-200 transition-colors px-4 py-2">
              Login
            </Link>
            <Link to="/register" className="text-sm font-semibold bg-[#A3E635] text-black px-5 py-2 rounded-lg hover:bg-[#b8ed5a] transition-colors">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-black pt-24 pb-0 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center min-h-[520px]">
          <div className="pt-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
              Build trust in every transaction
            </h1>
          </div>
          <div className="relative">
            <div className="text-right mb-6">
              <p className="text-sm text-slate-300 max-w-xs ml-auto mb-4">
                Secure escrow for goods, services, and subscriptions — holding funds until delivery is confirmed.
              </p>
              <div className="flex items-center justify-end gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors">
                  Shop Now
                </Link>
                <button className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 transition-colors">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </button>
              </div>
            </div>
            {/* Credit Cards */}
            <div className="relative h-80 flex items-center justify-center">
              {/* Teal card (back left) */}
              <div className="absolute left-0 top-10 w-56 h-36 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-2xl transform -rotate-12 -translate-x-4" style={{ perspective: '1000px' }}>
                <div className="p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-4" viewBox="0 0 24 16" fill="white" opacity="0.9"><circle cx="6" cy="8" r="5" /><circle cx="18" cy="8" r="5" opacity="0.6" /></svg>
                    <span className="text-white/80 text-xs font-medium tracking-wider">ESCRO</span>
                  </div>
                  <div>
                    <p className="text-white/60 text-[10px] mb-1">CARD NUMBER</p>
                    <p className="text-white text-sm font-mono tracking-wider">4532 •••• •••• 3456</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/60 text-[8px]">CARD HOLDER</p>
                      <p className="text-white text-[10px] font-medium">THE SURNAME</p>
                    </div>
                    <p className="text-white text-[10px]">09/26</p>
                  </div>
                </div>
              </div>
              {/* Red/orange card (back right) */}
              <div className="absolute right-4 top-0 w-56 h-36 rounded-2xl bg-gradient-to-br from-red-400 via-orange-400 to-red-500 shadow-2xl transform rotate-12 translate-x-4" style={{ perspective: '1000px' }}>
                <div className="p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-4" viewBox="0 0 24 16" fill="white" opacity="0.9"><circle cx="6" cy="8" r="5" /><circle cx="18" cy="8" r="5" opacity="0.6" /></svg>
                    <span className="text-white/80 text-xs font-medium tracking-wider">ESCRO</span>
                  </div>
                  <div>
                    <p className="text-white/60 text-[10px] mb-1">CARD NUMBER</p>
                    <p className="text-white text-sm font-mono tracking-wider">5891 •••• •••• 7813</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/60 text-[8px]">CARD HOLDER</p>
                      <p className="text-white text-[10px] font-medium">THE SURNAME</p>
                    </div>
                    <p className="text-white text-[10px]">11/24</p>
                  </div>
                </div>
              </div>
              {/* Green card (front center) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-16 w-60 h-40 rounded-2xl bg-gradient-to-br from-[#A3E635] to-[#78c800] shadow-2xl transform rotate-0 z-10">
                <div className="p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-4" viewBox="0 0 24 16" fill="black" opacity="0.7"><circle cx="6" cy="8" r="5" /><circle cx="18" cy="8" r="5" opacity="0.5" /></svg>
                    <span className="text-black/70 text-xs font-bold tracking-wider">ESCRO</span>
                  </div>
                  <div>
                    <p className="text-black/50 text-[10px] mb-1">CARD NUMBER</p>
                    <p className="text-black text-sm font-mono tracking-wider">4532 •••• •••• 2104</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-black/50 text-[8px]">CARD HOLDER</p>
                      <p className="text-black text-[10px] font-medium">THE SURNAME</p>
                    </div>
                    <p className="text-black text-[10px]">09/26</p>
                  </div>
                </div>
              </div>
              {/* Explore More circle */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#1a1a1a] border-2 border-slate-600 flex flex-col items-center justify-center z-20">
                <span className="text-[9px] text-slate-400 font-medium">Explore</span>
                <span className="text-[9px] text-white font-bold">More</span>
                <Play className="w-3 h-3 text-white mt-0.5" fill="white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="sticky top-24">
              <p className="text-[#A3E635] text-sm font-medium mb-3">Features</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">We keep your payments safe</h2>
              <p className="text-slate-500 text-base mb-8 max-w-md leading-relaxed">
                Your funds stay protected at every stage of the transaction. Escrow ensures money moves only when agreed conditions are met.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors">
                  See how
                </Link>
                <button className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-black transition-colors">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <div key={i} className="bg-[#f5f5f5] rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-sm mb-3 text-black">{f.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{f.desc}</p>
                  <a href="#" className="text-sm font-medium text-black hover:text-[#A3E635] transition-colors">Learn more →</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Get to know more about Escrow</h2>
            </div>
            <div>
              <p className="text-slate-500 text-base leading-relaxed">
                We are building a trust-first escrow platform designed to protect buyers, sellers, and businesses across modern transactions.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#f5f5f5] rounded-3xl p-10 text-center">
              <p className="text-5xl md:text-6xl font-bold text-black mb-2">10K+</p>
              <p className="text-slate-500 text-sm font-medium">Active Users</p>
            </div>
            <div className="bg-[#f5f5f5] rounded-3xl p-10 text-center">
              <p className="text-5xl md:text-6xl font-bold text-black mb-2">100%</p>
              <p className="text-slate-500 text-sm font-medium">Escrow Secure</p>
            </div>
            <div className="bg-[#f5f5f5] rounded-3xl p-10 text-center">
              <p className="text-5xl md:text-6xl font-bold text-black mb-2">4.9/5</p>
              <p className="text-slate-500 text-sm font-medium">Trust Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Make an Impression Section */}
      <section className="px-6 pb-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-10 md:p-14">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Make an impression with escrow</h2>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Show your customers that payments are protected by default. Funds are securely held and released only after delivery or milestone approval. Add visible escrow protection at checkout for a professional, trust-first experience. Available on eligible plans.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-[#A3E635] font-medium text-sm hover:text-[#b8ed5a] transition-colors">
                  Enable Escrow Protection <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="relative h-80 flex items-center justify-center">
                {/* Green card visual */}
                <div className="w-48 h-32 bg-gradient-to-br from-[#A3E635] to-[#78c800] rounded-2xl shadow-2xl transform rotate-12 translate-x-4 rotate-y-6">
                  <div className="p-4 h-full flex flex-col justify-between">
                    <span className="text-black/60 text-[8px] font-bold tracking-wider">ESCRO</span>
                    <div>
                      <p className="text-black text-xs font-mono">4532 •••• 3456</p>
                    </div>
                  </div>
                </div>
                {/* Hand illustration */}
                <div className="absolute bottom-8 right-8">
                  <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
                    <path d="M60 90 C50 70, 30 60, 40 40 C45 30, 55 25, 65 30 C75 35, 80 50, 75 65 C72 72, 65 85, 60 90Z" fill="#c4845e" />
                    <path d="M65 30 C68 25, 72 22, 75 25 C78 28, 76 35, 73 40" fill="#d49570" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Escrow Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-10 md:p-14">
                <p className="text-[#A3E635] text-xs font-medium mb-3 tracking-wide uppercase">Escrow Payments</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">International escrow for your business</h2>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  Join businesses protecting global transactions with escrow-backed payments, ensuring funds move only when conditions are met.
                </p>
                <div className="flex items-center gap-4">
                  <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors">
                    Get started
                  </Link>
                  <Link to="/register" className="inline-flex items-center gap-2 border border-slate-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors">
                    Contact sales
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center p-8">
                <div className="w-48 h-80 bg-slate-800 rounded-3xl border-4 border-slate-700 shadow-2xl">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-b from-slate-700 to-slate-800 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="3" /><line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-12 mb-12">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">$3,200,000,000+</p>
              <p className="text-xs text-slate-500 mt-1">USD Processed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">1,500,000+</p>
              <p className="text-xs text-slate-500 mt-1">Customers Trust Ecoro</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-slate-400 font-medium">BBB Tech Awards</span>
              <span className="text-lg font-bold text-slate-300">eBay</span>
              <span className="text-lg font-bold text-slate-300">Shopify</span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Over $3.2 billion of transactions<br />protected with Escrow</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-12 text-sm leading-relaxed">
              Escrow is the world's most secure payment method from a counterparty risk perspective — safeguarding both buyer and seller, all funds transacted using Escrow are kept in trust.
            </p>
          </div>

          {/* 5-Step Process */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {STEPS.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-14 h-14 bg-[#A3E635]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-10 h-10 bg-[#A3E635] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{s.num}</span>
                  </div>
                </div>
                <p className="font-semibold text-xs mb-1 text-black">{s.title}</p>
                <p className="text-[11px] text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors mb-4">
              Get started now
            </Link>
            <p className="text-xs text-[#A3E635] font-medium">LEARN MORE ABOUT ESCROW</p>
          </div>
        </div>
      </section>

      {/* Business Features Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-slate-400 text-sm mb-3">Teamwork makes the deal work</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Discover the meaning of efficiency<br />with Escrow Business</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Hold and release - tall card */}
            <div className="bg-[#A3E635] rounded-2xl p-8 flex flex-col justify-between md:row-span-2 min-h-[400px]">
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">Hold and release payments globally</h3>
                <a href="#" className="text-sm font-medium text-black/70 hover:text-black">Explore Escrow Payments →</a>
              </div>
              <div className="mt-8 bg-white rounded-xl p-4 shadow-lg">
                <p className="text-xs text-slate-500 mb-1">Escrow Amount</p>
                <p className="text-2xl font-bold mb-4">NGN 1,000,000</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-slate-200 rounded flex items-center justify-center"><span className="text-[6px] font-bold">VISA</span></div>
                    <span className="text-xs text-slate-600">•••• 4819</span>
                    <div className="w-4 h-4 rounded-full bg-[#A3E635] flex items-center justify-center ml-auto"><Check className="w-2.5 h-2.5 text-black" /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-slate-200 rounded flex items-center justify-center"><span className="text-[6px] font-bold">MC</span></div>
                    <span className="text-xs text-slate-600">•••• 8934</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-[#A3E635] text-black text-xs font-semibold rounded-lg">Funds Held</button>
              </div>
            </div>

            {/* Invoices */}
            <div className="bg-[#2a2a2a] rounded-2xl p-8 flex flex-col justify-between min-h-[190px]">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Invoices backed by escrow</h3>
                <a href="#" className="text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">Learn more about Escrow Invoices</a>
              </div>
              <div className="mt-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] text-slate-400">Invoice</span>
                  <span className="text-[8px] text-slate-400">11/24</span>
                </div>
                <p className="text-[10px] text-slate-600 font-mono">5095 7474 1103 7513 0014</p>
              </div>
            </div>

            {/* Smart cards */}
            <div className="bg-[#2a2a2a] rounded-2xl p-8 flex flex-col justify-between min-h-[190px]">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Smart company cards with spending control</h3>
                <a href="#" className="text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">Learn more about Escrow Cards</a>
              </div>
              <div className="mt-4 relative h-20">
                <div className="absolute left-0 top-0 w-32 h-20 rounded-lg bg-gradient-to-br from-[#A3E635] to-[#78c800] shadow-lg transform -rotate-6">
                  <div className="p-3 h-full flex flex-col justify-between">
                    <span className="text-black/60 text-[6px] font-bold">ESCRO</span>
                    <p className="text-black text-[8px] font-mono">4532 •••• 2104</p>
                  </div>
                </div>
                <div className="absolute left-6 top-2 w-32 h-20 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg transform rotate-3">
                  <div className="p-3 h-full flex flex-col justify-between">
                    <span className="text-white/60 text-[6px] font-bold">ESCRO</span>
                    <p className="text-white text-[8px] font-mono">5891 •••• 7813</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exchange */}
            <div className="bg-[#2a2a2a] rounded-2xl p-8 flex flex-col justify-between min-h-[190px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#A3E635] flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Hold, exchange, and release at fair rates</h3>
                <a href="#" className="text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">Explore Escrow Exchange</a>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-[#2a2a2a] rounded-2xl p-8 flex flex-col justify-between min-h-[190px]">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Set and manage escrow permissions with your team</h3>
              </div>
              <div className="mt-4 bg-white rounded-lg p-3 shadow-lg max-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-medium text-slate-600">Custom Role</span>
                  <span className="text-[8px] text-slate-400">×</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#A3E635]" />
                    <span className="text-[10px] text-slate-600">Transfers</span>
                    <svg className="w-3 h-3 text-[#A3E635] ml-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control your spend with smart rules */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Control your spend with smart rules</h2>
        </div>
        <div className="max-w-md mx-auto space-y-3">
          {[
            { cat: 'Logistics', date: 'March 23, 2022', amount: '$100', color: 'bg-slate-700' },
            { cat: 'Graphics', date: 'March 25, 2022', amount: '$45', color: 'bg-slate-700' },
            { cat: 'Retail', date: 'March 27, 2022', amount: '-$241', color: 'bg-white' },
            { cat: 'Others', date: 'March 25, 2022', amount: '$100', color: 'bg-slate-700' },
            { cat: 'Tech', date: 'March 29, 2022', amount: '$45', color: 'bg-slate-700' },
          ].map((t, i) => (
            <div key={i} className={`${t.color} rounded-lg px-5 py-3 flex items-center justify-between ${t.color === 'bg-white' ? 'text-black' : 'text-slate-300'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${t.color === 'bg-white' ? 'bg-red-400' : 'bg-slate-500'}`} />
                <span className="text-sm font-medium">{t.cat}</span>
                <span className="text-xs text-slate-500">{t.date}</span>
              </div>
              <span className="text-sm font-semibold">{t.amount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Never transact online without using Escro protection */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Never transact online without using Escro protection</h2>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  With Escro you can buy and sell anything safely without the risk of chargebacks. Truly secure payments.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-12">Pay</span>
                    <select className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-32">
                      <option>Buying</option>
                      <option>Services</option>
                    </select>
                    <span className="text-xs text-slate-500">Item type</span>
                    <select className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-32">
                      <option>Services</option>
                      <option>Products</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-12">For $</span>
                    <input type="text" value="1000" className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-32" readOnly />
                    <span className="text-xs text-slate-500">Currency</span>
                    <select className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-32">
                      <option>USD</option>
                    </select>
                  </div>
                </div>
                <button className="mt-6 w-full py-3 bg-[#A3E635] text-black font-semibold rounded-lg hover:bg-[#b8ed5a] transition-colors">
                  Get started now
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-[#2a2a2a] rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Pay for services as you go with milestone payments</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    'Buyer and seller agree on schedule',
                    'Buyer pays Escro.com',
                    'Seller provides the service',
                    'Buyer approves the milestone',
                    'Escro.com pays the seller',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border ${i === 0 ? 'border-[#A3E635] bg-[#A3E635]' : 'border-slate-600'} flex items-center justify-center`}>
                        {i === 0 && <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>}
                      </div>
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protect every payment */}
      <section className="py-12 px-6 bg-white text-center">
        <p className="text-xs text-slate-400 mb-4">Make your business transactions safer and smarter</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Protect every payment<br />without changing</h2>
        <div className="flex items-center justify-center gap-4">
          <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors">
            Try Escro protection
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 border border-slate-300 text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors">
            Contact sales
          </Link>
        </div>
      </section>

      {/* Connect your platform */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Connect your platform<br />with Escrow Trust</h2>
          <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-[#b8ed5a] transition-colors">
            Reimagine Trust
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-white font-medium hover:text-[#A3E635] transition-colors">Personal</Link>
              <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Business</Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#help" className="hover:text-white transition-colors">Help</a>
              <span className="flex items-center gap-1">EN <ChevronDown className="w-3 h-3" /></span>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-8 py-8 border-t border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="#A3E635" />
                  <path d="M10 14C12.5 11 15.5 11 18 14C20.5 17 23.5 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M10 20C12.5 17 15.5 17 18 20C20.5 23 23.5 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M10 26C12.5 23 15.5 23 18 26C20.5 29 23.5 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span className="text-lg font-bold text-white">Escrow</span>
              </div>
              <p className="text-sm text-slate-500">The future of secure transactions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm text-white">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm text-white">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; 2026 Escrow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
