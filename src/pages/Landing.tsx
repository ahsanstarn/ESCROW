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
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [payType, setPayType] = useState('Buying');
  const [itemType, setItemType] = useState('Services');
  const [amount, setAmount] = useState('1000');
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative w-full h-screen max-h-[900px] min-h-[700px] z-10 pb-[40px]">
        
        {/* Background container with rounded corners and overflow hidden */}
        <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden rounded-b-[48px] z-0">
          {/* Geometric Background Lines */}
          <div className="absolute top-0 right-0 w-[55%] h-[85%] pointer-events-none opacity-40 z-0">
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMaxYMin slice">
              <path d="M 200 600 L 200 300 L 500 100 L 800 300 L 800 600" fill="none" stroke="#0d503a" strokeWidth="1.2" />
              <path d="M 100 700 L 100 400 L 400 200 L 700 400 L 700 700" fill="none" stroke="#0d503a" strokeWidth="1.2" />
              <path d="M 200 300 L 400 450 L 700 400" fill="none" stroke="#0d503a" strokeWidth="1.2" />
              <path d="M 500 100 L 500 400" fill="none" stroke="#0d503a" strokeWidth="1.2" />
              <path d="M 400 200 L 400 450" fill="none" stroke="#0d503a" strokeWidth="1.2" />
            </svg>
          </div>

          {/* ===== CARDS: Moved inside so they get clipped by the bottom edge ===== */}
          <div className="absolute -bottom-[20px] md:-bottom-[40px] left-1/2 -translate-x-1/2 w-[600px] md:w-[700px] h-[380px] md:h-[420px] z-40 pointer-events-none scale-[0.68] sm:scale-85 md:scale-100 origin-bottom">
            
            {/* Blue Card (Left, behind Red) */}
            <div className="group absolute left-[20px] bottom-[20px] w-[210px] md:w-[230px] h-[320px] md:h-[350px] rounded-[18px] bg-gradient-to-br from-[#22d3ee] via-[#06b6d4] to-[#0891b2] shadow-[0_8px_30px_rgba(0,0,0,0.4)] transform -rotate-[15deg] z-10 p-6 overflow-hidden transition-transform duration-500 hover:-translate-y-3 hover:-rotate-[18deg] pointer-events-auto cursor-pointer">
              {/* Shiny Glare Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.4)_25%,transparent_30%,transparent_45%,rgba(255,255,255,0.15)_50%,transparent_55%)] pointer-events-none z-0"></div>
              {/* Animated Glare on Hover */}
              <div className="absolute top-0 bottom-0 left-0 w-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-overlay z-0"></div>
              {/* Glassy Inner Border */}
              <div className="absolute inset-0 rounded-[18px] border-[1.5px] border-white/40 pointer-events-none mix-blend-overlay z-0"></div>
              
              <div className="relative z-10">
                <span className="text-white text-[17px] font-bold tracking-[0.12em] drop-shadow-sm">ESCRO</span>
                <svg className="w-6 h-6 text-white mt-1.5 opacity-90 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01"/></svg>
              </div>
              <div className="absolute right-4 top-0 h-full flex items-center justify-center z-10">
                <p className="text-white/95 text-[26px] font-sans font-semibold tracking-[0.15em] drop-shadow-md" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  12 3456
                </p>
              </div>
              <div className="absolute right-[52px] top-0 h-full flex items-center justify-center z-10">
                <p className="text-white/70 text-[10px] font-sans font-medium uppercase tracking-[0.3em] drop-shadow-md" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  Name Surname
                </p>
              </div>
            </div>

            {/* Red Card (Center, front of Blue, behind Green) */}
            <div className="group absolute left-1/2 -translate-x-1/2 bottom-[40px] w-[240px] md:w-[270px] h-[360px] md:h-[400px] rounded-[20px] bg-gradient-to-b from-[#f43f5e] via-[#e11d48] to-[#dc2626] shadow-[0_12px_40px_rgba(0,0,0,0.6)] transform rotate-0 z-20 p-7 overflow-hidden transition-transform duration-500 hover:-translate-y-4 hover:scale-[1.03] pointer-events-auto cursor-pointer">
              {/* Shiny Glare Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.35)_25%,transparent_30%,transparent_45%,rgba(255,255,255,0.15)_50%,transparent_55%)] pointer-events-none z-0"></div>
              {/* Animated Glare on Hover */}
              <div className="absolute top-0 bottom-0 left-0 w-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-overlay z-0"></div>
              {/* Glassy Inner Border */}
              <div className="absolute inset-0 rounded-[20px] border-[1.5px] border-white/40 pointer-events-none mix-blend-overlay z-0"></div>

              <div className="relative z-10">
                <span className="text-white text-[19px] font-bold tracking-[0.15em] drop-shadow-sm">ESCRO</span>
                <svg className="w-7 h-7 text-white mt-2 opacity-90 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01"/></svg>
              </div>
              <div className="absolute right-5 top-0 h-full flex items-center justify-center z-10">
                <p className="text-white text-[32px] font-sans font-semibold tracking-[0.15em] drop-shadow-md" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  78 9012 3456
                </p>
              </div>
              <div className="absolute right-[64px] top-0 h-full flex items-center justify-center z-10">
                <p className="text-white/70 text-[12px] font-sans font-medium uppercase tracking-[0.35em] drop-shadow-md" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  Name Surname
                </p>
              </div>
            </div>

            {/* Green Card (Right, front of Red) */}
            <div className="group absolute right-[10px] bottom-[-20px] w-[210px] md:w-[230px] h-[320px] md:h-[350px] rounded-[18px] bg-gradient-to-br from-[#d9f99d] via-[#a3e635] to-[#65a30d] shadow-[0_15px_40px_rgba(0,0,0,0.5)] transform rotate-[15deg] z-30 p-6 overflow-hidden transition-transform duration-500 hover:-translate-y-3 hover:rotate-[18deg] pointer-events-auto cursor-pointer">
              {/* Shiny Glare Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.5)_25%,transparent_30%,transparent_45%,rgba(255,255,255,0.2)_50%,transparent_55%)] pointer-events-none z-0"></div>
              {/* Animated Glare on Hover */}
              <div className="absolute top-0 bottom-0 left-0 w-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-overlay z-0"></div>
              {/* Glassy Inner Border */}
              <div className="absolute inset-0 rounded-[18px] border-[1.5px] border-white/50 pointer-events-none mix-blend-overlay z-0"></div>

              <div className="relative z-10">
                <span className="text-white text-[17px] font-bold tracking-[0.12em] drop-shadow-sm">ESCRO</span>
                <svg className="w-6 h-6 text-white mt-1.5 opacity-90 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01"/></svg>
              </div>
              <div className="absolute right-4 top-0 h-full flex items-center justify-center z-10">
                <p className="text-white/95 text-[26px] font-sans font-semibold tracking-[0.15em] drop-shadow-md" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  34 5678 9012 3456
                </p>
              </div>
              <div className="absolute right-[52px] top-0 h-full flex items-center justify-center z-10">
                <p className="text-white/70 text-[10px] font-sans font-medium uppercase tracking-[0.3em] drop-shadow-md" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  Name Surname
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TOP CONTENT ROW: Heading + Description ===== */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-8 xl:px-12 z-30 flex items-start justify-between gap-8">
          {/* Left: Title */}
          <h1 className="text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[4.8rem] font-display font-bold text-white leading-[1.1] tracking-tight flex-shrink-0">
            Build trust in<br />every transaction
          </h1>
          
          {/* Right: Description + CTA */}
          <div className="hidden md:flex flex-col items-end pt-4 flex-shrink-0">
            <p className="text-[#9ca3af] text-[13px] leading-relaxed mb-5 text-right">
              Secure escrow for goods, services,<br/>and milestones — holding funds until<br/>delivery is confirmed.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/register" className="bg-[#b8f56c] text-black px-6 py-2.5 rounded-full font-bold text-[14px] hover:bg-[#a3e635] transition-all whitespace-nowrap">
                Shop Now
              </Link>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center hover:bg-[#2a2a2a] transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== TOP NAV ===== */}
        <div className="absolute top-8 w-full max-w-[1200px] left-1/2 -translate-x-1/2 px-8 xl:px-12 flex justify-between items-center z-50">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-[#b8f56c]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 5h14l-2 4H3V5zm4 6h14l-2 4H7v-4zm4 6h10l-2 4h-8v-4z" />
            </svg>
            <span className="text-[18px] font-bold text-white tracking-tight">Escro</span>
          </div>

          {/* Nav Links + Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5 text-[13px] font-semibold text-white/90">
              <a href="#features" className="hover:text-[#b8f56c] transition-colors">Features</a>
              <span className="text-white/20">-</span>
              <Link to="/pricing" className="hover:text-[#b8f56c] transition-colors">Pricing</Link>
              <Link to="/help" className="hover:text-[#b8f56c] transition-colors">Help</Link>
              <LanguageSwitcher />
            </div>

            <div className="flex items-center gap-4 ml-2">
              <Link to="/login" className="bg-[#b8f56c] text-black px-6 py-2 rounded-full font-bold text-[13px] hover:bg-[#a3e635] transition-all">
                Login
              </Link>
              <Link to="/register" className="text-white font-semibold text-[13px] hover:text-[#b8f56c] transition-colors">
                Register
              </Link>
            </div>
          </div>

          <button onClick={() => setMobileNavOpen(true)} className="lg:hidden p-2 text-white bg-white/10 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* ===== EXPLORE MORE CUTOUT ===== */}
        <div className="absolute bottom-[-85px] left-1/2 -translate-x-1/2 z-50">
          <div className="w-[170px] h-[170px] bg-white rounded-full flex items-center justify-center">
            <div 
              onClick={() => setIsVideoOpen(true)}
              className="w-[110px] h-[110px] bg-[#0a0a0a] rounded-full flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform duration-300 relative -translate-y-[15px]"
            >
              <div className="absolute inset-0 animate-[spin_12s_linear_infinite] p-[8px]">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <path id="circlePathText" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                  <text className="text-[13px] font-bold uppercase tracking-[0.2em]" fill="white">
                    <textPath href="#circlePathText" startOffset="0%">
                      Explore More • Explore More •
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="w-10 h-10 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#A3E635" />
                <path d="M10 14C12.5 11 15.5 11 18 14C20.5 17 23.5 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M10 20C12.5 17 15.5 17 18 20C20.5 23 23.5 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M10 26C12.5 23 15.5 23 18 26C20.5 29 23.5 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="text-xl font-bold text-white tracking-tight">Escro</span>
            </Link>
            <button onClick={() => setMobileNavOpen(false)} className="p-2 text-white">
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex flex-col gap-6 text-xl font-bold">
            <a href="#features" onClick={() => setMobileNavOpen(false)} className="text-white hover:text-[#A3E635] transition-colors">Features</a>
            <Link to="/pricing" onClick={() => setMobileNavOpen(false)} className="text-white hover:text-[#A3E635] transition-colors">Pricing</Link>
            <Link to="/help" onClick={() => setMobileNavOpen(false)} className="text-white hover:text-[#A3E635] transition-colors">Help</Link>
            <div className="pt-2">
              <span className="text-xs text-slate-400 font-medium block mb-2">Language</span>
              <LanguageSwitcher />
            </div>
          </div>
          <div className="mt-auto flex flex-col gap-4">
            <Link to="/login" onClick={() => setMobileNavOpen(false)} className="w-full py-4 text-center rounded-xl bg-white/10 text-white font-bold text-lg">
              Login
            </Link>
            <Link to="/register" onClick={() => setMobileNavOpen(false)} className="w-full py-4 text-center rounded-xl bg-[#A3E635] text-black font-bold text-lg">
              Register
            </Link>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-fade-in-up">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center text-slate-500">
              <div className="text-center">
                <Play className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p>Demo Video Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <ScrollReveal>
      <section id="features" className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="md:sticky md:top-24">
              <p className="text-[#A3E635] text-sm font-medium mb-3">{t.features.label}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6 leading-tight">{t.features.title}</h2>
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
                  <h3 className="font-display font-bold text-sm mb-2 md:mb-3 text-black">{f.title}</h3>
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">{t.about.title}</h2>
            </div>
            <div>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                {t.about.desc}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="bg-[#f5f5f5] rounded-2xl md:rounded-3xl p-4 md:p-10 text-center hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-300 cursor-pointer">
              <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-black mb-1 md:mb-2">10K+</p>
              <p className="text-[10px] sm:text-xs md:text-slate-500 text-slate-600 font-medium">{t.about.stats.users}</p>
            </div>
            <div className="bg-[#f5f5f5] rounded-2xl md:rounded-3xl p-4 md:p-10 text-center hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-300 cursor-pointer">
              <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-black mb-1 md:mb-2">100%</p>
              <p className="text-[10px] sm:text-xs md:text-slate-500 text-slate-600 font-medium">{t.about.stats.secure}</p>
            </div>
            <div className="bg-[#f5f5f5] rounded-2xl md:rounded-3xl p-4 md:p-10 text-center hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-300 cursor-pointer">
              <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-black mb-1 md:mb-2">4.9/5</p>
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">Make an impression with escrow</h2>
                <p className="text-slate-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
                  Show your customers that payments are protected by default. Funds are securely held and released only after delivery or milestone approval. Add visible escrow protection at checkout for a professional, trust-first experience. Available on eligible plans.
                </p>
                <a href="/register" className="inline-flex items-center gap-2 text-[#A3E635] font-medium text-sm hover:text-[#b8ed5a] transition-colors">
                  Enable Escro Protection <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="relative h-[340px] sm:h-[380px] md:h-[420px] flex items-end justify-center overflow-hidden rounded-b-2xl md:rounded-b-none md:rounded-r-3xl">
                {/* Floating Green Escro Card - Positioned in top-right well above the hand */}
                <div className="group absolute right-4 sm:right-10 md:right-16 top-3 sm:top-5 md:top-6 w-[140px] sm:w-[165px] md:w-[185px] h-[215px] sm:h-[250px] md:h-[280px] rounded-[16px] md:rounded-[20px] bg-gradient-to-br from-[#cbf865] via-[#a3e635] to-[#7ac714] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform rotate-[25deg] p-4 sm:p-5 overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:rotate-[28deg] z-20 cursor-pointer">
                  {/* Static Glare Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.15)_20%,rgba(255,255,255,0.7)_25%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0)_55%)] pointer-events-none z-0 mix-blend-overlay"></div>
                  {/* Animated Glare on Hover */}
                  <div className="absolute top-0 bottom-0 left-0 w-[150%] bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-overlay z-0"></div>
                  {/* Glassy Inner Border */}
                  <div className="absolute inset-0 rounded-[16px] md:rounded-[20px] border-[1.5px] border-white/60 pointer-events-none mix-blend-overlay z-0"></div>

                  {/* Contactless Icon (Top Right) */}
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 opacity-90">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" className="drop-shadow-sm mix-blend-overlay opacity-60">
                      <path d="M8.5 2.5a15 15 0 0 1 7 0 M6 6a11 11 0 0 1 12 0 M3.5 10a7 7 0 0 1 17 0" />
                    </svg>
                  </div>
                  
                  {/* EMV Chip (Bottom Left) */}
                  <div className="absolute left-3.5 sm:left-4 bottom-10 sm:bottom-14 w-8 h-9 sm:w-9 sm:h-11 rounded-md border border-black/25 bg-[#d9ea4b] flex flex-col justify-between p-[2px] opacity-80 shadow-sm z-10">
                    <div className="w-full h-[1px] bg-black/20 my-[2px]"></div>
                    <div className="w-full h-[1px] bg-black/20 my-[2px]"></div>
                    <div className="w-full h-[1px] bg-black/20 my-[2px]"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-black/20"></div>
                  </div>

                  {/* Text: Numbers */}
                  <div className="absolute right-3 sm:right-4 top-0 h-full flex items-center justify-center z-10">
                    <p className="text-white text-[18px] sm:text-[22px] md:text-[24px] font-sans font-bold tracking-[0.12em] drop-shadow-sm mix-blend-overlay" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      1234 5678 9012 3456
                    </p>
                  </div>
                  {/* Text: Name */}
                  <div className="absolute right-[34px] sm:right-[42px] md:right-[46px] top-0 h-full flex items-center justify-center z-10">
                    <p className="text-white/80 text-[8px] sm:text-[9px] md:text-[10px] font-sans font-semibold uppercase tracking-[0.25em] drop-shadow-sm mix-blend-overlay" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      NAME SURNAME
                    </p>
                  </div>
                </div>

                {/* Open Hand - Positioned at bottom flush with container edge */}
                <div className="absolute bottom-0 right-0 sm:right-2 md:right-4 w-[290px] sm:w-[360px] md:w-[420px] z-10 pointer-events-none" style={{ mixBlendMode: 'lighten' }}>
                  <img 
                    src="/hand.png" 
                    alt="Hand receiving escrow card" 
                    className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]" 
                    style={{ filter: 'brightness(1.08) contrast(1.12)' }} 
                  />
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
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">{t.international.title}</h2>
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
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold mb-4 md:mb-6">{t.stats.title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-8 md:mb-12 text-xs md:text-sm leading-relaxed">
              {t.stats.desc}
            </p>
          </div>

          {/* 5-Step Animated Workflow */}
          <div className="relative mb-12 md:mb-16">
            {/* Connecting line behind steps on md+ */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#A3E635]/20 via-[#A3E635]/60 to-[#A3E635]/20 z-0"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 relative z-10">
              {[
                {
                  num: 1,
                  title: t.steps[1].title,
                  desc: t.steps[1].desc,
                  icon: (
                    <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
                {
                  num: 2,
                  title: t.steps[2].title,
                  desc: t.steps[2].desc,
                  icon: (
                    <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M6 8h.01M10 8h.01" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 15v2" />
                    </svg>
                  ),
                },
                {
                  num: 3,
                  title: t.steps[3].title,
                  desc: t.steps[3].desc,
                  icon: (
                    <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                      <path d="m3.3 7 8.7 5 8.7-5" />
                      <path d="M12 22V12" />
                    </svg>
                  ),
                },
                {
                  num: 4,
                  title: t.steps[4].title,
                  desc: t.steps[4].desc,
                  icon: (
                    <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ),
                },
                {
                  num: 5,
                  title: t.steps[5].title,
                  desc: t.steps[5].desc,
                  icon: (
                    <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  ),
                },
              ].map((step, idx) => (
                <div 
                  key={step.num} 
                  className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-[#A3E635]/5 cursor-pointer"
                  style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}
                >
                  {/* Step Badge with Glow & Hover Pulse */}
                  <div className="relative mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#A3E635]/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#A3E635]/30 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                      <div className="w-9 h-9 md:w-10 md:h-10 bg-[#A3E635] rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:rotate-6">
                        {step.icon}
                      </div>
                    </div>
                    {/* Number Indicator Pill */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-[#A3E635] border border-[#A3E635]/50 rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                      {step.num}
                    </span>
                  </div>

                  <p className="font-display font-bold text-xs md:text-sm mb-1 text-black group-hover:text-emerald-800 transition-colors leading-tight">
                    {step.title}
                  </p>
                  <p className="text-[10px] md:text-xs text-slate-500 leading-normal max-w-[170px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/register" 
              className="group inline-flex items-center gap-3 bg-[#A3E635] text-black px-7 py-3.5 rounded-full font-bold text-sm shadow-[0_4px_14px_rgba(163,230,53,0.4)] hover:shadow-[0_6px_25px_rgba(163,230,53,0.6)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 mb-3"
            >
              <span>{t.steps.getStarted}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-xs text-[#65a30d] font-bold uppercase tracking-wider hover:underline cursor-pointer">
              {t.steps.learnMore}
            </p>
          </div>
        </div>
      </section>

      {/* Business Features Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-slate-400 text-xs md:text-sm mb-3">Teamwork makes the deal work</p>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-white leading-tight">Discover the meaning of efficiency<br className="hidden sm:block" /> with Escro Business</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Hold and release payments globally */}
            <div className="bg-[#A3E635] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between md:row-span-2 min-h-[280px] md:min-h-[400px] group hover:scale-[1.02] transition-transform duration-300">
              <div>
                <h3 className="text-lg md:text-2xl font-display font-bold text-black mb-2">Hold and release payments globally</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-black/70 hover:text-black">Explore Escro Payments →</a>
              </div>
              <div className="mt-4 md:mt-8 bg-white rounded-xl p-3 md:p-4 shadow-lg group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
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

            {/* Invoices backed by escrow */}
            <div className="bg-[#1f1f1f] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[190px] group hover:bg-[#2a2a2a] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div>
                <h3 className="text-base md:text-xl font-display font-bold text-white mb-2 group-hover:text-[#A3E635] transition-colors">Invoices backed by escrow</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">Learn more about Escro Invoices</a>
              </div>
              <div className="mt-3 md:mt-4 bg-white rounded-lg p-2 md:p-3 shadow-lg group-hover:-translate-y-1 group-hover:shadow-2xl transition-all duration-300">
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-[7px] md:text-[8px] text-slate-400">Invoice</span>
                  <span className="text-[7px] md:text-[8px] text-slate-400">11/24</span>
                </div>
                <p className="text-[8px] md:text-[10px] text-slate-600 font-mono">5095 7474 1103 7513 0014</p>
              </div>
            </div>

            {/* Smart company cards with spending control */}
            <div className="bg-[#1f1f1f] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between min-h-[220px] md:min-h-[260px] group hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer overflow-hidden relative">
              <div className="z-10">
                <h3 className="text-base md:text-xl font-display font-bold text-white mb-2 group-hover:text-[#A3E635] transition-colors">Smart company cards with spending control</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-blue-400 hover:text-blue-300">Learn more about Escro Cards</a>
              </div>
              
              <div className="absolute right-[-20px] bottom-[-40px] md:bottom-[-60px] w-full h-40 md:h-52 flex items-end justify-end perspective-1000">
                
                {/* Black Card */}
                <div className="absolute bottom-8 right-32 w-32 md:w-48 h-20 md:h-32 rounded-lg bg-gradient-to-br from-gray-700 to-black shadow-lg transform -rotate-45 group-hover:-rotate-[50deg] group-hover:-translate-x-12 group-hover:-translate-y-4 transition-all duration-500 ease-out border border-white/10">
                  <div className="p-2 md:p-4 h-full flex flex-col justify-between">
                    <span className="text-white/40 text-[6px] md:text-[8px] font-bold">ESCRO</span>
                  </div>
                </div>

                {/* Red Card */}
                <div className="absolute bottom-6 right-24 w-32 md:w-48 h-20 md:h-32 rounded-lg bg-gradient-to-br from-red-600 to-red-900 shadow-lg transform -rotate-35 group-hover:-rotate-[40deg] group-hover:-translate-x-6 group-hover:-translate-y-2 transition-all duration-500 ease-out border border-white/10">
                  <div className="p-2 md:p-4 h-full flex flex-col justify-between">
                    <span className="text-white/50 text-[6px] md:text-[8px] font-bold">ESCRO</span>
                  </div>
                </div>

                {/* Green Card */}
                <div className="absolute bottom-4 right-16 w-32 md:w-48 h-20 md:h-32 rounded-lg bg-gradient-to-br from-[#A3E635] to-green-600 shadow-lg transform -rotate-25 group-hover:-rotate-[30deg] group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out border border-black/10">
                  <div className="p-2 md:p-4 h-full flex flex-col justify-between">
                    <span className="text-black/60 text-[6px] md:text-[8px] font-bold">ESCRO</span>
                  </div>
                </div>

                {/* Blue/Teal Card (Top) */}
                <div className="absolute bottom-2 right-8 w-32 md:w-48 h-20 md:h-32 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-600 shadow-xl transform -rotate-15 group-hover:-rotate-[20deg] group-hover:translate-x-6 group-hover:translate-y-2 transition-all duration-500 ease-out border border-white/20">
                  <div className="p-2 md:p-4 h-full flex flex-col justify-between">
                    <span className="text-white/80 text-[6px] md:text-[8px] font-bold">ESCRO</span>
                    <p className="text-white text-[7px] md:text-[10px] font-mono tracking-widest text-right">5678 9012 3456</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hold, exchange, and release */}
            <div className="bg-[#1f1f1f] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-center items-center text-center min-h-[160px] md:min-h-[190px] group hover:bg-[#2a2a2a] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#A3E635] group-hover:rotate-180 transition-all duration-700">
                <span className="text-black text-xl font-bold">*</span>
              </div>
              <h3 className="text-base md:text-xl font-display font-bold text-white mb-2 group-hover:text-[#A3E635] transition-colors">Hold, exchange, and release at fair rates</h3>
              <a href="/register" className="text-xs md:text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">Explore Escro Exchange</a>
            </div>

            {/* Set and manage escrow permissions */}
            <div className="bg-[#1f1f1f] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[190px] sm:col-span-2 md:col-span-1 group hover:bg-[#2a2a2a] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
              <div>
                <h3 className="text-base md:text-xl font-display font-bold text-white mb-2 group-hover:text-[#A3E635] transition-colors">Set and manage escrow permissions with your team</h3>
                <p className="text-[10px] md:text-xs text-slate-400">Stay in control of who can approve, hold, release, or dispute funds across your organization.</p>
              </div>
              <div className="mt-4 md:mt-6 bg-white rounded-lg p-3 md:p-4 shadow-lg w-[80%] ml-auto group-hover:scale-105 transition-transform duration-300 origin-bottom-right">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-[10px] md:text-xs font-bold text-slate-800">Custom Role</span>
                  <span className="text-[10px] text-slate-400">×</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded">
                    <span className="text-[10px] text-slate-700 font-medium">Transfers</span>
                    <div className="w-5 h-3 bg-blue-500 rounded-full flex items-center px-0.5 justify-end"><div className="w-2 h-2 bg-white rounded-full"></div></div>
                  </div>
                  <div className="flex items-center justify-between p-1.5">
                    <span className="text-[10px] text-slate-700">View transfers</span>
                    <div className="w-5 h-3 bg-blue-500 rounded-full flex items-center px-0.5 justify-end"><div className="w-2 h-2 bg-white rounded-full"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control your spend with smart rules */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl lg:text-[64px] font-display font-bold text-white leading-tight tracking-tight">Control your spend<br className="hidden md:block" /> with smart rules</h2>
        </div>
        <div className="max-w-[540px] mx-auto flex flex-col gap-3 md:gap-4">
          {[
            { cat: 'Logistics', date: 'March 25, 2022', amount: '$100' },
            { cat: 'Graphics', date: 'March 29, 2022', amount: '$45' },
            { cat: 'Retail', date: 'March 27, 2022', amount: '-$241', active: true },
            { cat: 'Others', date: 'March 25, 2022', amount: '$100' },
            { cat: 'Tech', date: 'March 29, 2022', amount: '$45' },
          ].map((t, i) => (
            <div 
              key={i} 
              className={`group rounded-xl px-5 md:px-8 py-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${t.active ? 'bg-white text-black scale-[1.02] shadow-xl' : 'bg-[#29303D] text-slate-300 hover:bg-white hover:text-black'}`}
            >
              <div className="flex items-center gap-4 w-[65%]">
                <div className="relative flex items-center justify-center">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300 ${t.active ? 'border-[#ff7a00]' : 'border-slate-500 group-hover:border-[#ff7a00]'}`}></div>
                  <div className={`absolute w-1.5 h-1.5 rounded-full transition-colors duration-300 ${t.active ? 'bg-[#ff7a00]' : 'bg-transparent group-hover:bg-[#ff7a00]'}`}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full items-center">
                  <span className={`text-[15px] font-medium transition-colors duration-300 ${t.active ? 'text-black' : 'text-white group-hover:text-black'}`}>{t.cat}</span>
                  <span className={`text-[13px] transition-colors duration-300 ${t.active ? 'text-slate-500' : 'text-slate-400 group-hover:text-slate-500'}`}>{t.date}</span>
                </div>
              </div>
              <span className={`text-[15px] font-bold transition-colors duration-300 ${t.active ? 'text-black' : 'text-white group-hover:text-black'}`}>{t.amount}</span>
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 md:mb-4 leading-tight">Never transact online without using Escro protection</h2>
                <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
                  With Escro you can buy and sell anything safely without the risk of chargebacks. Truly secure payments.
                </p>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <span className="text-xs text-slate-500 w-8 md:w-12">Pay</span>
                    <select 
                      value={payType}
                      onChange={(e) => setPayType(e.target.value)}
                      className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-white w-28 md:w-32 focus:outline-none focus:border-[#A3E635]"
                    >
                      <option>Buying</option>
                      <option>Selling</option>
                    </select>
                    <span className="text-xs text-slate-500 hidden sm:inline">Item type</span>
                    <select 
                      value={itemType}
                      onChange={(e) => setItemType(e.target.value)}
                      className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-white w-28 md:w-32 focus:outline-none focus:border-[#A3E635]"
                    >
                      <option>Services</option>
                      <option>Products</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <span className="text-xs text-slate-500 w-8 md:w-12">For $</span>
                    <input 
                      type="text" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-white w-28 md:w-32 focus:outline-none focus:border-[#A3E635]" 
                    />
                    <span className="text-xs text-slate-500 hidden sm:inline">Currency</span>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="bg-[#2a2a2a] border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-white w-28 md:w-32 focus:outline-none focus:border-[#A3E635]"
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
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
                    <p className="text-white font-medium text-xs md:text-sm">Pay for {itemType.toLowerCase()} as you go with milestone payments</p>
                  </div>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {[
                    `${payType === 'Buying' ? 'Buyer and seller agree on schedule' : 'Seller and buyer agree on schedule'}`,
                    `${payType === 'Buying' ? 'Buyer pays Escro.com' : 'Buyer pays Escro.com'}`,
                    `${payType === 'Buying' ? 'Seller provides the ' : 'You provide the '}${itemType.toLowerCase().slice(0, -1)}`,
                    `${payType === 'Buying' ? 'Buyer approves the milestone' : 'Buyer approves the milestone'}`,
                    `Escro.com pays the seller`,
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
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold mb-4 md:mb-6">{t.cta.title}</h2>
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
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">{t.connect.title}</h2>
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
