import { Link } from 'react-router-dom';
import { Shield, Lock, ArrowRight, CreditCard, Zap, Globe, ChevronRight, Star, Check, ChevronDown } from 'lucide-react';

const FEATURES = [
  { icon: Shield, title: 'Secure Payments', desc: 'Every transaction is protected with bank-grade encryption and escrow safeguards.' },
  { icon: Zap, title: 'Instant Processing', desc: 'Funds are released instantly once both parties confirm the deal.' },
  { icon: Lock, title: 'Transparent Fees', desc: 'No hidden charges. Know exactly what you pay before you commit.' },
  { icon: Globe, title: 'Global Coverage', desc: 'Accept and send payments across 180+ countries in multiple currencies.' },
];

const STEPS = [
  { num: '01', title: 'Create an Account', desc: 'Sign up in seconds and complete your profile.' },
  { num: '02', title: 'Start a Transaction', desc: 'Set terms, amount, and conditions for your deal.' },
  { num: '03', title: 'Secure the Payment', desc: 'Buyer deposits funds into the escrow vault.' },
  { num: '04', title: 'Deliver & Confirm', desc: 'Seller delivers, buyer verifies the product or service.' },
  { num: '05', title: 'Funds Released', desc: 'Payment is released to the seller once confirmed.' },
];

const BUSINESS_FEATURES = [
  { icon: Shield, title: 'Hold and release payments', desc: 'Automatically hold funds until delivery is confirmed.' },
  { icon: CreditCard, title: 'Invoices', desc: 'Generate and send professional invoices in seconds.' },
  { icon: Zap, title: 'Smart company cards', desc: 'Issue virtual cards with real-time spend controls.' },
  { icon: Globe, title: 'Exchange', desc: 'Convert currencies at competitive rates with low fees.' },
  { icon: Lock, title: 'Permissions', desc: 'Manage team access with granular roles and permissions.' },
];

const TESTIMONIALS = [
  { name: 'Sarah Johnson', role: 'E-commerce Owner', text: 'Escrow transformed how I handle international deals. My dispute rate dropped to nearly zero.' },
  { name: 'Michael Chen', role: 'Freelance Developer', text: 'Finally a platform where I feel safe delivering work before getting paid. The escrow system just works.' },
  { name: 'Emma Davis', role: 'Logistics Manager', text: 'Real-time tracking and instant fund release has made our operations incredibly smooth.' },
];

const PRICING_PLANS = [
  { name: 'Starter', price: '29', features: ['5 active escrows', 'Basic analytics', 'Email support', '2 team members'], cta: 'Get Started' },
  { name: 'Professional', price: '79', features: ['Unlimited escrows', 'Advanced analytics', 'Priority support', '10 team members', 'API access'], cta: 'Get Started', popular: true },
  { name: 'Enterprise', price: 'Custom', features: ['Custom volume', 'Dedicated manager', 'SLA guarantee', 'Unlimited team', 'White-label option'], cta: 'Contact Sales' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold">Escrow</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#help" className="hover:text-white transition-colors">Help</a>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              EN <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2">
              Login
            </Link>
            <Link to="/register" className="text-sm font-semibold bg-brand-400 text-black px-5 py-2 rounded-lg hover:bg-brand-500 transition-colors">
              Register
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-400 text-sm font-medium mb-4">The Future of Secure Transactions</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Build trust in every transaction
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg">
              A complete escrow platform that protects buyers and sellers. Hold, verify, and release payments with confidence.
            </p>
            <div className="flex gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 bg-brand-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-500 transition-colors">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-72 h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
              <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl mb-4 flex items-center justify-center">
                <CreditCard className="w-16 h-16 text-brand-400" />
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-slate-700 rounded-full w-3/4" />
                <div className="h-3 bg-slate-700 rounded-full w-1/2" />
                <div className="h-8 bg-brand-400/20 rounded-lg w-full mt-4 flex items-center justify-center">
                  <span className="text-brand-400 text-sm font-semibold">Shop Now</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-400/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-brand-400/5 rounded-full blur-xl" />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-medium mb-3">Features</p>
            <h2 className="text-4xl font-bold mb-4">We keep your payments safe</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our platform ensures every transaction is secure, transparent, and hassle-free.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6 hover:border-brand-400/30 transition-colors">
                <div className="w-10 h-10 bg-brand-400/10 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-400 text-sm font-medium mb-3">About</p>
            <h2 className="text-4xl font-bold mb-6">Get to know more about Escrow</h2>
            <p className="text-slate-400 mb-8">
              We are on a mission to make online transactions safer for everyone. Our escrow platform eliminates risk for both buyers and sellers.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-brand-400">10,000+</p>
                <p className="text-sm text-slate-400 mt-1">Trusted Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-400">100%</p>
                <p className="text-sm text-slate-400 mt-1">Secure Transactions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-400">4.9/5</p>
                <p className="text-sm text-slate-400 mt-1">Customer Rating</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8">
            <div className="w-full h-64 bg-gradient-to-br from-brand-400/10 to-brand-400/5 rounded-xl flex items-center justify-center">
              <Shield className="w-24 h-24 text-brand-400/30" />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-medium mb-3">Testimonials</p>
            <h2 className="text-4xl font-bold mb-4">Make an impression</h2>
            <p className="text-slate-400">See what our users have to say about their experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-brand-400 text-sm font-medium mb-3">International Escrow</p>
          <h2 className="text-4xl font-bold mb-4">International escrow for your business</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Expand your business globally with our multi-currency escrow support. Accept payments from anywhere in the world.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-brand-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-500 transition-colors">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
          <div>
            <p className="text-3xl font-bold">$3.2B+</p>
            <p className="text-sm text-slate-400 mt-1">Processed</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1.5M+</p>
            <p className="text-sm text-slate-400 mt-1">Customers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-slate-300">Nets</p>
            <p className="text-xs text-slate-500">Payment Partner</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-slate-300">Shopify</p>
            <p className="text-xs text-slate-500">Integration</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-medium mb-3">How It Works</p>
            <h2 className="text-4xl font-bold mb-4">Simple, secure, and transparent</h2>
            <p className="text-slate-400">Get started in five easy steps.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 bg-brand-400 text-black rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-medium mb-3">Business Features</p>
            <h2 className="text-4xl font-bold mb-4">Built for modern businesses</h2>
            <p className="text-slate-400">Everything you need to manage payments at scale.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {BUSINESS_FEATURES.map((f) => (
              <div key={f.title} className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-5 hover:border-brand-400/30 transition-colors">
                <div className="w-9 h-9 bg-brand-400/10 rounded-lg flex items-center justify-center mb-3">
                  <f.icon className="w-4 h-4 text-brand-400" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-400 text-sm font-medium mb-3">Smart Rules</p>
            <h2 className="text-3xl font-bold mb-4">Automate your escrow workflows</h2>
            <p className="text-slate-400 mb-6">
              Set custom rules for automatic fund release, dispute handling, and payment conditions.
            </p>
            <ul className="space-y-3">
              {['Auto-release after delivery confirmation', 'Conditional milestone payouts', 'Real-time fraud detection'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-400" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm">Auto-release</span>
                <div className="w-10 h-5 bg-brand-400 rounded-full relative">
                  <div className="w-4 h-4 bg-black rounded-full absolute right-0.5 top-0.5" />
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm">Milestone payouts</span>
                <div className="w-10 h-5 bg-brand-400 rounded-full relative">
                  <div className="w-4 h-4 bg-black rounded-full absolute right-0.5 top-0.5" />
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm">Fraud detection</span>
                <div className="w-10 h-5 bg-brand-400 rounded-full relative">
                  <div className="w-4 h-4 bg-black rounded-full absolute right-0.5 top-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-brand-400 text-sm font-medium mb-3">Escrow Protection</p>
            <h2 className="text-3xl font-bold mb-4">Your funds, fully protected</h2>
            <p className="text-slate-400 mb-6">
              Every transaction is backed by our escrow protection. Funds are held securely until both parties are satisfied.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 text-brand-400 font-medium hover:text-brand-500 transition-colors">
              Learn more <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="order-1 md:order-2 bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8">
            <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-400/20 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-brand-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Funds Secured</p>
                  <p className="text-xs text-slate-500">$2,450.00 held in escrow</p>
                </div>
                <span className="text-xs bg-brand-400/20 text-brand-400 px-2 py-1 rounded-full">Protected</span>
              </div>
              <div className="h-px bg-slate-700" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-trust-600/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-trust-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Delivery Confirmed</p>
                  <p className="text-xs text-slate-500">Buyer verified receipt</p>
                </div>
              </div>
              <div className="h-px bg-slate-700" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-400/20 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-brand-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Release Pending</p>
                  <p className="text-xs text-slate-500">Awaiting seller confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-medium mb-3">Pricing</p>
            <h2 className="text-4xl font-bold mb-4">Protect every payment without changing</h2>
            <p className="text-slate-400">Choose the plan that fits your business needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.name} className={`bg-slate-900/50 border rounded-xl p-6 ${plan.popular ? 'border-brand-400/50 ring-1 ring-brand-400/20' : 'border-slate-800/50'}`}>
                {plan.popular && <p className="text-brand-400 text-xs font-medium mb-3">Most Popular</p>}
                <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-slate-500 text-sm">/month</span>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-brand-400" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${plan.popular ? 'bg-brand-400 text-black hover:bg-brand-500' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Connect your platform with Escrow</h2>
          <p className="text-slate-400 mb-8">Integrate our powerful escrow API into your existing workflow.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
            Reimagine Trust <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold">Escrow</span>
            </div>
            <p className="text-sm text-slate-400">The future of secure transactions.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800/50 text-center text-sm text-slate-500">
          &copy; 2026 Escrow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
