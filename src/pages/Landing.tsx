import { Link } from 'react-router-dom';
import { ArrowRight, Play, Check, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useAnimations';
import { useTranslation } from '@/i18n';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Landing() {
  const { t } = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#A3E635" />
              <path d="M10 14C12.5 11 15.5 11 18 14C20.5 17 23.5 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 20C12.5 17 15.5 17 18 20C20.5 23 23.5 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 26C12.5 23 15.5 23 18 26C20.5 29 23.5 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
                <span className="text-base md:text-lg font-bold text-white">Escro</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
            <Link to="/pricing" className="hover:text-white transition-colors">{t.nav.pricing}</Link>
            <Link to="/help" className="hover:text-white transition-colors">{t.nav.help}</Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/login" className="text-sm font-medium text-white hover:text-slate-200 transition-colors px-3 py-2">
              {t.nav.login}
            </Link>
            <Link to="/register" className="text-sm font-semibold bg-[#A3E635] text-black px-4 md:px-5 py-2 rounded-lg hover:bg-[#b8ed5a] transition-colors">
              {t.nav.register}
            </Link>
          </div>
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="md:hidden p-2 text-white">
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-slate-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" onClick={() => setMobileNavOpen(false)} className="block text-sm text-slate-300 hover:text-white transition-colors py-2">{t.nav.features}</a>
              <Link to="/pricing" onClick={() => setMobileNavOpen(false)} className="block text-sm text-slate-300 hover:text-white transition-colors py-2">{t.nav.pricing}</Link>
              <Link to="/help" onClick={() => setMobileNavOpen(false)} className="block text-sm text-slate-300 hover:text-white transition-colors py-2">{t.nav.help}</Link>
              <div className="border-t border-slate-800 pt-3 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileNavOpen(false)} className="text-sm font-medium text-white py-2">{t.nav.login}</Link>
                <Link to="/register" onClick={() => setMobileNavOpen(false)} className="text-sm font-semibold bg-[#A3E635] text-black px-5 py-2.5 rounded-lg text-center">{t.nav.register}</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-black pt-20 md:pt-24 pb-0 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-center min-h-[400px] md:min-h-[520px]">
          <div className="pt-4 md:pt-8 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 md:mb-8">
              {t.hero.title}
            </h1>
          </div>
          <div className="relative hidden md:block">
            <div className="text-right mb-6 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <p className="text-sm text-slate-300 max-w-xs ml-auto mb-4">
                {t.hero.subtitle}
              </p>
              <div className="flex items-center justify-end gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-all hover:scale-105">
                  {t.hero.shopNow}
                </Link>
                <button className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 hover:scale-110 transition-all">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </button>
              </div>
            </div>
            <div className="relative h-80 flex items-center justify-center">
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#1a1a1a] border-2 border-slate-600 flex flex-col items-center justify-center z-20">
                <span className="text-[9px] text-slate-400 font-medium">Explore</span>
                <span className="text-[9px] text-white font-bold">More</span>
                <Play className="w-3 h-3 text-white mt-0.5" fill="white" />
              </div>
            </div>
          </div>
          {/* Mobile hero CTA */}
          <div className="md:hidden flex flex-col items-center text-center pb-8">
            <p className="text-sm text-slate-300 mb-4">{t.hero.subtitle}</p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-all">
              {t.hero.shopNow}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <ScrollReveal>
      <section id="features" className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="md:sticky md:top-24">
              <p className="text-[#A3E635] text-sm font-medium mb-3">{t.features.label}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">{t.features.title}</h2>
              <p className="text-slate-500 text-sm md:text-base mb-6 md:mb-8 max-w-md leading-relaxed">
                {t.features.desc}
              </p>
              <div className="flex items-center gap-4">
                <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors">
                  {t.features.seeHow}
                </Link>
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-black transition-colors">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5" fill="white" />
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {t.features.items.map((f, i) => (
                <div key={i} className="bg-[#f5f5f5] rounded-xl p-5 md:p-6 hover:shadow-md hover:scale-105 transition-all" style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both` }}>
                  <h3 className="font-bold text-sm mb-2 md:mb-3 text-black">{f.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 mb-3 md:mb-4 leading-relaxed">{f.desc}</p>
                  <a href="/register" className="text-sm font-medium text-black hover:text-[#A3E635] transition-colors">{t.features.learnMore}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* About Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-10 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{t.about.title}</h2>
            </div>
            <div>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                {t.about.desc}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="bg-[#f5f5f5] rounded-2xl md:rounded-3xl p-4 md:p-10 text-center">
              <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-1 md:mb-2">10K+</p>
              <p className="text-[10px] sm:text-xs md:text-slate-500 text-slate-600 font-medium">{t.about.stats.users}</p>
            </div>
            <div className="bg-[#f5f5f5] rounded-2xl md:rounded-3xl p-4 md:p-10 text-center">
              <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-1 md:mb-2">100%</p>
              <p className="text-[10px] sm:text-xs md:text-slate-500 text-slate-600 font-medium">{t.about.stats.secure}</p>
            </div>
            <div className="bg-[#f5f5f5] rounded-2xl md:rounded-3xl p-4 md:p-10 text-center">
              <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-1 md:mb-2">4.9/5</p>
              <p className="text-[10px] sm:text-xs md:text-slate-500 text-slate-600 font-medium">{t.about.stats.rating}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Make an Impression Section */}
      <section className="px-4 md:px-6 pb-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="p-6 md:p-10 lg:p-14">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">Make an impression with escrow</h2>
                <p className="text-slate-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
                  Show your customers that payments are protected by default. Funds are securely held and released only after delivery or milestone approval. Add visible escrow protection at checkout for a professional, trust-first experience. Available on eligible plans.
                </p>
                <a href="/register" className="inline-flex items-center gap-2 text-[#A3E635] font-medium text-sm hover:text-[#b8ed5a] transition-colors">
                  Enable Escro Protection <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="relative h-48 md:h-80 flex items-center justify-center">
                <div className="w-36 h-24 md:w-48 md:h-32 bg-gradient-to-br from-[#A3E635] to-[#78c800] rounded-2xl shadow-2xl transform rotate-12 translate-x-4 rotate-y-6">
                  <div className="p-3 md:p-4 h-full flex flex-col justify-between">
                    <span className="text-black/60 text-[6px] md:text-[8px] font-bold tracking-wider">ESCRO</span>
                    <div>
                      <p className="text-black text-[10px] md:text-xs font-mono">4532 •••• 3456</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 md:bottom-8 right-6 md:right-8">
                  <svg width="80" height="70" viewBox="0 0 120 100" fill="none" className="md:w-[120px] md:h-[100px]">
                    <path d="M60 90 C50 70, 30 60, 40 40 C45 30, 55 25, 65 30 C75 35, 80 50, 75 65 C72 72, 65 85, 60 90Z" fill="#c4845e" />
                    <path d="M65 30 C68 25, 72 22, 75 25 C78 28, 76 35, 73 40" fill="#d49570" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Escro Section */}
      <section className="py-8 md:py-16 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="p-6 md:p-10 lg:p-14">
                <p className="text-[#A3E635] text-xs font-medium mb-3 tracking-wide uppercase">{t.international.label}</p>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">{t.international.title}</h2>
                <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
                  {t.international.desc}
                </p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors">
                    {t.international.getStarted}
                  </Link>
                  <Link to="/register" className="inline-flex items-center gap-2 border border-slate-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors">
                    {t.international.contactSales}
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center p-8">
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
      <section className="py-10 md:py-16 px-4 md:px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-8 md:mb-12">
            <div className="text-center">
              <p className="text-lg md:text-2xl lg:text-3xl font-bold">$3,200,000,000+</p>
              <p className="text-[10px] md:text-xs text-slate-500 mt-1">USD Processed</p>
            </div>
            <div className="text-center">
              <p className="text-lg md:text-2xl lg:text-3xl font-bold">1,500,000+</p>
              <p className="text-[10px] md:text-xs text-slate-500 mt-1">Customers Trust Ecoro</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <span className="text-[10px] md:text-xs text-slate-400 font-medium">BBB Tech Awards</span>
              <span className="text-sm md:text-lg font-bold text-slate-300">eBay</span>
              <span className="text-sm md:text-lg font-bold text-slate-300">Shopify</span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">{t.stats.title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-8 md:mb-12 text-xs md:text-sm leading-relaxed">
              {t.stats.desc}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-6 mb-8 md:mb-12">
            {([1,2,3,4,5] as const).map((num) => (
              <div key={num} className="text-center">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#A3E635]/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <div className="w-7 h-7 md:w-10 md:h-10 bg-[#A3E635] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs md:text-sm">{num}</span>
                  </div>
                </div>
                <p className="font-semibold text-[10px] md:text-xs mb-0.5 md:mb-1 text-black">{t.steps[num].title}</p>
                <p className="text-[8px] md:text-[11px] text-slate-500 leading-tight">{t.steps[num].desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors mb-3 md:mb-4">
              {t.steps.getStarted}
            </Link>
            <p className="text-xs text-[#A3E635] font-medium">{t.steps.learnMore}</p>
          </div>
        </div>
      </section>

      {/* Business Features Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-slate-400 text-xs md:text-sm mb-3">Teamwork makes the deal work</p>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight">Discover the meaning of efficiency<br className="hidden sm:block" /> with Escro Business</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-[#A3E635] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between md:row-span-2 min-h-[280px] md:min-h-[400px]">
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-black mb-2">Hold and release payments globally</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-black/70 hover:text-black">Explore Escro Payments →</a>
              </div>
              <div className="mt-4 md:mt-8 bg-white rounded-xl p-3 md:p-4 shadow-lg">
                <p className="text-[10px] md:text-xs text-slate-500 mb-1">Escro Amount</p>
                <p className="text-lg md:text-2xl font-bold mb-2 md:mb-4">NGN 1,000,000</p>
                <div className="space-y-1.5 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 md:w-8 md:h-5 bg-slate-200 rounded flex items-center justify-center"><span className="text-[5px] md:text-[6px] font-bold">VISA</span></div>
                    <span className="text-[10px] md:text-xs text-slate-600">•••• 4819</span>
                    <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#A3E635] flex items-center justify-center ml-auto"><Check className="w-2 h-2 md:w-2.5 md:h-2.5 text-black" /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 md:w-8 md:h-5 bg-slate-200 rounded flex items-center justify-center"><span className="text-[5px] md:text-[6px] font-bold">MC</span></div>
                    <span className="text-[10px] md:text-xs text-slate-600">•••• 8934</span>
                  </div>
                </div>
                <button className="w-full mt-3 md:mt-4 py-1.5 md:py-2 bg-[#A3E635] text-black text-[10px] md:text-xs font-semibold rounded-lg">Funds Held</button>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[190px]">
              <div>
                <h3 className="text-base md:text-xl font-bold text-white mb-2">Invoices backed by escrow</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">Learn more about Escro Invoices</a>
              </div>
              <div className="mt-3 md:mt-4 bg-white rounded-lg p-2 md:p-3 shadow-lg">
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-[7px] md:text-[8px] text-slate-400">Invoice</span>
                  <span className="text-[7px] md:text-[8px] text-slate-400">11/24</span>
                </div>
                <p className="text-[8px] md:text-[10px] text-slate-600 font-mono">5095 7474 1103 7513 0014</p>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[190px]">
              <div>
                <h3 className="text-base md:text-xl font-bold text-white mb-2">Smart company cards with spending control</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">Learn more about Escro Cards</a>
              </div>
              <div className="mt-3 md:mt-4 relative h-14 md:h-20">
                <div className="absolute left-0 top-0 w-24 md:w-32 h-14 md:h-20 rounded-lg bg-gradient-to-br from-[#A3E635] to-[#78c800] shadow-lg transform -rotate-6">
                  <div className="p-2 md:p-3 h-full flex flex-col justify-between">
                    <span className="text-black/60 text-[5px] md:text-[6px] font-bold">ESCRO</span>
                    <p className="text-black text-[7px] md:text-[8px] font-mono">4532 •••• 2104</p>
                  </div>
                </div>
                <div className="absolute left-5 md:left-6 top-2 w-24 md:w-32 h-14 md:h-20 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg transform rotate-3">
                  <div className="p-2 md:p-3 h-full flex flex-col justify-between">
                    <span className="text-white/60 text-[5px] md:text-[6px] font-bold">ESCRO</span>
                    <p className="text-white text-[7px] md:text-[8px] font-mono">5891 •••• 7813</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[190px]">
              <div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#A3E635] flex items-center justify-center mb-2 md:mb-3">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
                </div>
                <h3 className="text-base md:text-xl font-bold text-white mb-2">Hold, exchange, and release at fair rates</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">Explore Escro Exchange</a>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[190px] sm:col-span-2 md:col-span-1">
              <div>
                <h3 className="text-base md:text-xl font-bold text-white mb-2">Set and manage escrow permissions with your team</h3>
              </div>
              <div className="mt-3 md:mt-4 bg-white rounded-lg p-2 md:p-3 shadow-lg max-w-[140px] md:max-w-[180px]">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <span className="text-[8px] md:text-[10px] font-medium text-slate-600">Custom Role</span>
                  <span className="text-[7px] md:text-[8px] text-slate-400">×</span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#A3E635]" />
                    <span className="text-[8px] md:text-[10px] text-slate-600">Transfers</span>
                    <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#A3E635] ml-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control your spend with smart rules */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight">Control your spend with smart rules</h2>
        </div>
        <div className="max-w-md mx-auto space-y-2 md:space-y-3">
          {[
            { cat: 'Logistics', date: 'March 23, 2022', amount: '$100', color: 'bg-slate-700' },
            { cat: 'Graphics', date: 'March 25, 2022', amount: '$45', color: 'bg-slate-700' },
            { cat: 'Retail', date: 'March 27, 2022', amount: '-$241', color: 'bg-white' },
            { cat: 'Others', date: 'March 25, 2022', amount: '$100', color: 'bg-slate-700' },
            { cat: 'Tech', date: 'March 29, 2022', amount: '$45', color: 'bg-slate-700' },
          ].map((t, i) => (
            <div key={i} className={`${t.color} rounded-lg px-4 md:px-5 py-2.5 md:py-3 flex items-center justify-between ${t.color === 'bg-white' ? 'text-black' : 'text-slate-300'}`}>
              <div className="flex items-center gap-2 md:gap-3">
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${t.color === 'bg-white' ? 'bg-red-400' : 'bg-slate-500'}`} />
                <span className="text-xs md:text-sm font-medium">{t.cat}</span>
                <span className="text-[10px] md:text-xs text-slate-500">{t.date}</span>
              </div>
              <span className="text-xs md:text-sm font-semibold">{t.amount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Never transact online without using Escro protection */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl md:rounded-3xl overflow-hidden p-6 md:p-10 lg:p-14">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">Never transact online without using Escro protection</h2>
                <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
                  With Escro you can buy and sell anything safely without the risk of chargebacks. Truly secure payments.
                </p>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <span className="text-xs text-slate-500 w-8 md:w-12">Pay</span>
                    <select className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-white w-28 md:w-32">
                      <option>Buying</option>
                      <option>Services</option>
                    </select>
                    <span className="text-xs text-slate-500 hidden sm:inline">Item type</span>
                    <select className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-white w-28 md:w-32">
                      <option>Services</option>
                      <option>Products</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <span className="text-xs text-slate-500 w-8 md:w-12">For $</span>
                    <input type="text" value="1000" className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-white w-28 md:w-32" readOnly />
                    <span className="text-xs text-slate-500 hidden sm:inline">Currency</span>
                    <select className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-white w-28 md:w-32">
                      <option>USD</option>
                    </select>
                  </div>
                </div>
                <button className="mt-4 md:mt-6 w-full py-2.5 md:py-3 bg-[#A3E635] text-black font-semibold rounded-lg hover:bg-[#b8ed5a] transition-colors text-sm" onClick={() => window.location.href = '/register'}>
                  Get started now
                </button>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-2.5 md:gap-3 bg-[#2a2a2a] rounded-xl p-3 md:p-4">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#A3E635] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-xs md:text-sm">Pay for services as you go with milestone payments</p>
                  </div>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {[
                    'Buyer and seller agree on schedule',
                    'Buyer pays Escro.com',
                    'Seller provides the service',
                    'Buyer approves the milestone',
                    'Escro.com pays the seller',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 md:gap-3">
                      <div className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border ${i === 0 ? 'border-[#A3E635] bg-[#A3E635]' : 'border-slate-600'} flex items-center justify-center`}>
                        {i === 0 && <svg className="w-2 h-2 md:w-2.5 md:h-2.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>}
                      </div>
                      <span className="text-xs md:text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protect every payment */}
      <section className="py-8 md:py-12 px-4 md:px-6 bg-white text-center">
            <p className="text-xs text-slate-400 mb-3 md:mb-4">{t.cta.subtitle}</p>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">{t.cta.title}</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm hover:bg-[#b8ed5a] transition-colors w-full sm:w-auto justify-center">
                {t.cta.tryProtection}
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-slate-300 text-black px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center">
                {t.cta.contactSales}
              </Link>
        </div>
      </section>

      {/* Connect your platform */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">{t.connect.title}</h2>
          <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm hover:bg-[#b8ed5a] transition-colors">
            {t.connect.cta}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 md:px-6 bg-black border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-white font-medium hover:text-[#A3E635] transition-colors">{t.footer.personal}</Link>
              <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">{t.footer.business}</Link>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
              <a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a>
              <a href="#help" className="hover:text-white transition-colors">{t.nav.help}</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-6 md:py-8 border-t border-slate-800">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="#A3E635" />
                  <path d="M10 14C12.5 11 15.5 11 18 14C20.5 17 23.5 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M10 20C12.5 17 15.5 17 18 20C20.5 23 23.5 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M10 26C12.5 23 15.5 23 18 26C20.5 29 23.5 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            <span className="text-base md:text-lg font-bold text-white">Escro</span>
              </div>
              <p className="text-xs md:text-sm text-slate-500">The future of secure transactions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-3 text-xs md:text-sm text-white">{t.footer.product}</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-500">
                <li><Link to="/pricing" className="hover:text-white transition-colors">{t.footer.pricing}</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t.footer.about}</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">{t.footer.blog}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-3 text-xs md:text-sm text-white">{t.footer.company}</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-500">
                <li><Link to="/careers" className="hover:text-white transition-colors">{t.footer.careers}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t.footer.contact}</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">{t.footer.helpCenter}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-3 text-xs md:text-sm text-white">{t.footer.legal}</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-500">
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">{t.footer.cookies}</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 md:pt-8 border-t border-slate-800 text-center text-xs md:text-sm text-slate-500">
            &copy; {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
