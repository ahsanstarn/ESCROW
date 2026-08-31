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
    <div className="min-h-screen bg-white text-black font-sans">
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

          {/* ===== CARDS: Metallic 3D credit cards with rich vibrant metallic tones ===== */}
          <div className="absolute -bottom-[20px] md:-bottom-[40px] left-1/2 -translate-x-1/2 w-[600px] md:w-[700px] h-[380px] md:h-[420px] z-40 pointer-events-none scale-[0.68] sm:scale-85 md:scale-100 origin-bottom" style={{ perspective: '1500px' }}>
            
            {/* Sapphire Blue Titanium Card (Left) */}
            <div className="group absolute left-[20px] bottom-[20px] w-[210px] md:w-[230px] h-[320px] md:h-[350px] rounded-[18px] transform -rotate-[15deg] z-10 overflow-hidden pointer-events-auto cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:-rotate-[18deg]" style={{ transformStyle: 'preserve-3d' }}>
              {/* Metallic base */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#082f49]"></div>
              {/* Brushed metal texture */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.06) 1px, rgba(255,255,255,0.06) 3px)' }}></div>
              {/* Chrome diagonal band */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_35%,rgba(255,255,255,0.35)_48%,rgba(255,255,255,0.05)_52%,transparent_65%)] pointer-events-none"></div>
              {/* Subtle holographic shimmer on hover */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.4)_25%,rgba(147,197,253,0.2)_30%,transparent_40%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[120%] -translate-x-[100%] transition-all duration-[1000ms] pointer-events-none z-30"></div>
              {/* Glass border */}
              <div className="absolute inset-0 rounded-[18px] border-[1px] border-white/30 pointer-events-none z-20"></div>
              {/* Shadow */}
              <div className="absolute inset-0 rounded-[18px] shadow-[0_16px_40px_rgba(0,0,0,0.6)]"></div>
              
              <div className="relative z-10 p-5 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="text-white text-[17px] font-bold tracking-[0.12em] drop-shadow-md">ESCRO</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01"/></svg>
                </div>
                {/* Gold EMV chip */}
                <div className="mt-5 w-10 h-7 rounded-md overflow-hidden shadow-sm">
                  <div className="w-full h-full bg-gradient-to-br from-[#f5e6b8] via-[#d4af37] to-[#8c6b00] relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-[#523e00]/60 -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-[#523e00]/60 -translate-y-1/2"></div>
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-white/95 text-[14px] font-mono font-semibold tracking-[0.15em] drop-shadow-md mb-3">4921 •••• •••• 7812</p>
                  <div className="flex justify-between items-end">
                    <p className="text-white/70 text-[9px] uppercase tracking-wider">A. SMITH</p>
                    <p className="text-white/70 text-[9px] tracking-wider">03/27</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ruby Crimson Metallic Card (Center, tallest) */}
            <div className="group absolute left-1/2 -translate-x-1/2 bottom-[40px] w-[240px] md:w-[270px] h-[360px] md:h-[400px] rounded-[20px] transform rotate-0 z-20 overflow-hidden pointer-events-auto cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:scale-[1.03]" style={{ transformStyle: 'preserve-3d' }}>
              {/* Metallic base */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#e11d48] via-[#be123c] to-[#4c0519]"></div>
              {/* Brushed metal */}
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.06) 1px, rgba(255,255,255,0.06) 3px)' }}></div>
              {/* Chrome band */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.35)_45%,rgba(255,255,255,0.05)_55%,transparent_70%)] pointer-events-none"></div>
              {/* Holographic shimmer */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.4)_25%,rgba(255,150,150,0.2)_30%,transparent_40%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[120%] -translate-x-[100%] transition-all duration-[1000ms] pointer-events-none z-30"></div>
              {/* Glass border */}
              <div className="absolute inset-0 rounded-[20px] border-[1px] border-white/30 pointer-events-none z-20"></div>
              {/* Shadow */}
              <div className="absolute inset-0 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.7)]"></div>
              
              <div className="relative z-10 p-6 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="text-white text-[19px] font-bold tracking-[0.15em] drop-shadow-md">ESCRO</span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01"/></svg>
                </div>
                {/* Gold EMV chip */}
                <div className="mt-6 w-11 h-8 rounded-md overflow-hidden shadow-md">
                  <div className="w-full h-full bg-gradient-to-br from-[#f5e6b8] via-[#d4af37] to-[#8c6b00] relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-[#523e00]/60 -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-[#523e00]/60 -translate-y-1/2"></div>
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-white text-[17px] font-mono font-semibold tracking-[0.15em] drop-shadow-md mb-4">5234 6789 0123 4567</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[7px] text-white/50 uppercase tracking-wider mb-0.5">Card Holder</p>
                      <p className="text-white/90 text-[10px] font-semibold uppercase tracking-[0.2em]">J. WILSON</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[7px] text-white/50 uppercase tracking-wider mb-0.5">Valid</p>
                      <p className="text-white/90 text-[10px] font-semibold tracking-wider">09/28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emerald Titanium Metallic Card (Right) */}
            <div className="group absolute right-[10px] bottom-[-20px] w-[210px] md:w-[230px] h-[320px] md:h-[350px] rounded-[18px] transform rotate-[15deg] z-30 overflow-hidden pointer-events-auto cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:rotate-[18deg]" style={{ transformStyle: 'preserve-3d' }}>
              {/* Metallic base */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#84cc16] via-[#4d7c0f] to-[#14532d]"></div>
              {/* Brushed metal */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.06) 1px, rgba(255,255,255,0.06) 3px)' }}></div>
              {/* Chrome band */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.35)_42%,rgba(255,255,255,0.05)_55%,transparent_65%)] pointer-events-none"></div>
              {/* Holographic shimmer */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_15%,rgba(255,255,255,0.4)_22%,rgba(163,230,53,0.2)_28%,transparent_38%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[120%] -translate-x-[100%] transition-all duration-[1000ms] pointer-events-none z-30"></div>
              {/* Glass border */}
              <div className="absolute inset-0 rounded-[18px] border-[1px] border-white/30 pointer-events-none z-20"></div>
              {/* Shadow */}
              <div className="absolute inset-0 rounded-[18px] shadow-[0_16px_45px_rgba(0,0,0,0.6)]"></div>
              
              <div className="relative z-10 p-5 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="text-white text-[17px] font-bold tracking-[0.12em] drop-shadow-md">ESCRO</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01"/></svg>
                </div>
                {/* Gold EMV chip */}
                <div className="mt-5 w-10 h-7 rounded-md overflow-hidden shadow-sm">
                  <div className="w-full h-full bg-gradient-to-br from-[#f5e6b8] via-[#d4af37] to-[#8c6b00] relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-[#523e00]/60 -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-[#523e00]/60 -translate-y-1/2"></div>
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-white/95 text-[14px] font-mono font-semibold tracking-[0.15em] drop-shadow-md mb-3">3456 •••• •••• 9012</p>
                  <div className="flex justify-between items-end">
                    <p className="text-white/70 text-[9px] uppercase tracking-wider">M. CHEN</p>
                    <p className="text-white/70 text-[9px] tracking-wider">12/26</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TOP CONTENT ROW: Heading + Description Matching Reference ===== */}
        <div className="absolute top-[16%] sm:top-[18%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6 sm:px-8 xl:px-12 z-30 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8">
          {/* Left: Headline with exact wrap */}
          <h1 className="text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[4.75rem] font-display font-bold text-white leading-[1.08] tracking-tight max-w-[560px]">
            Build trust in<br />every transaction
          </h1>
          
          {/* Right: Subtitle + Shop Now & Play CTA */}
          <div className="flex flex-col items-start md:items-end pt-1 md:pt-4 max-w-sm">
            <p className="text-slate-300 text-[13.5px] sm:text-[14px] leading-relaxed mb-5 text-left md:text-right font-normal">
              Secure escrow for goods, services, and milestones — holding funds until delivery is confirmed.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/register" className="bg-[#A3E635] hover:bg-[#b8f56c] text-black px-7 py-3 rounded-full font-bold text-[14px] shadow-[0_4px_16px_rgba(163,230,53,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all whitespace-nowrap">
                Shop Now
              </Link>
              <button 
                onClick={() => setIsVideoOpen(true)}
                aria-label="Play video"
                className="w-11 h-11 rounded-full bg-[#18181b] hover:bg-[#27272a] border border-white/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
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
              <a href="#features" className="hover:text-[#b8f56c] transition-colors">{t.nav.features}</a>
              <span className="text-white/20">-</span>
              <Link to="/pricing" className="hover:text-[#b8f56c] transition-colors">{t.nav.pricing}</Link>
              <Link to="/help" className="hover:text-[#b8f56c] transition-colors">{t.nav.help}</Link>
              <LanguageSwitcher />
            </div>

            <div className="flex items-center gap-4 ml-2">
              <Link to="/login" className="bg-[#b8f56c] text-black px-6 py-2 rounded-full font-bold text-[13px] shadow-[0_4px_12px_rgba(184,245,108,0.3)] hover:bg-[#a3e635] hover:scale-[1.03] active:scale-[0.98] transition-all">
                {t.nav.login}
              </Link>
              <Link to="/register" className="text-white font-semibold text-[13px] hover:text-[#b8f56c] transition-colors">
                {t.nav.register}
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
            <a href="#features" onClick={() => setMobileNavOpen(false)} className="text-white hover:text-[#A3E635] transition-colors">{t.nav.features}</a>
            <Link to="/pricing" onClick={() => setMobileNavOpen(false)} className="text-white hover:text-[#A3E635] transition-colors">{t.nav.pricing}</Link>
            <Link to="/help" onClick={() => setMobileNavOpen(false)} className="text-white hover:text-[#A3E635] transition-colors">{t.nav.help}</Link>
            <div className="pt-2">
              <span className="text-xs text-slate-400 font-medium block mb-2">Language</span>
              <LanguageSwitcher />
            </div>
          </div>
          <div className="mt-auto flex flex-col gap-4">
            <Link to="/login" onClick={() => setMobileNavOpen(false)} className="w-full py-4 text-center rounded-xl bg-white/10 text-white font-bold text-lg">
              {t.nav.login}
            </Link>
            <Link to="/register" onClick={() => setMobileNavOpen(false)} className="w-full py-4 text-center rounded-xl bg-[#A3E635] text-black font-bold text-lg">
              {t.nav.register}
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
            <div className="w-full h-full flex items-center justify-center text-white text-center p-8">
              <div>
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
                <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-full font-semibold text-sm shadow-[0_4px_14px_rgba(163,230,53,0.35)] hover:bg-[#b8ed5a] hover:scale-[1.03] active:scale-[0.98] transition-all">
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
          <div className="bg-[#0a0a0a] rounded-3xl md:rounded-[36px] overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="p-6 md:p-12 lg:p-16">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">
                  {t.impression.title}
                </h2>
                <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed max-w-lg">
                  {t.impression.desc}
                </p>
                <a href="/register" className="inline-flex items-center gap-2 text-[#A3E635] font-bold text-sm hover:text-[#b8ed5a] transition-colors">
                  {t.impression.enable} <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Right Visual: Centered 3D Metallic Card — No Hand */}
              <div className="relative h-[340px] sm:h-[400px] md:h-[440px] flex items-center justify-center overflow-hidden">
                
                {/* Ambient glow behind the card */}
                <div className="absolute w-[280px] h-[280px] rounded-full bg-[#A3E635]/15 blur-[80px] pointer-events-none z-0"></div>
                
                {/* 3D Metallic Credit Card */}
                <div 
                  className="group relative w-[220px] sm:w-[260px] md:w-[290px] h-[340px] sm:h-[400px] md:h-[440px] z-10 cursor-pointer"
                  style={{ perspective: '1200px' }}
                >
                  <div 
                    className="relative w-full h-full rounded-[22px] md:rounded-[26px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(163,230,53,0.15)] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    style={{ 
                      transform: 'rotateY(-8deg) rotateX(5deg) rotate(12deg)',
                      transformStyle: 'preserve-3d',
                      animation: 'cardFloat 6s ease-in-out infinite',
                    }}
                  >
                    {/* Metallic Gradient Base: Vivid Emerald Titanium */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#84cc16] via-[#4d7c0f] to-[#14532d]"></div>

                    {/* Brushed Metal Texture Overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)',
                    }}></div>

                    {/* Chrome Band (diagonal) */}
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.35)_45%,rgba(255,255,255,0.05)_55%,transparent_70%)] pointer-events-none"></div>

                    {/* Holographic Shimmer — sweeps on hover */}
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.45)_25%,rgba(163,230,53,0.2)_30%,rgba(100,255,200,0.15)_35%,transparent_45%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[100%] -translate-x-[100%] transition-all duration-[1200ms] ease-in-out pointer-events-none z-30"></div>

                    {/* Glass Inner Border */}
                    <div className="absolute inset-0 rounded-[22px] md:rounded-[26px] border-[1px] border-white/35 pointer-events-none z-20"></div>

                    {/* Card Content */}
                    <div className="relative z-10 p-5 sm:p-6 h-full flex flex-col">
                      {/* Top Row: Brand + Contactless */}
                      <div className="flex items-start justify-between">
                        <span className="text-white text-[18px] sm:text-[20px] font-bold tracking-[0.15em] drop-shadow-md" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>ESCRO</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round">
                          <path d="M8.5 2.5a15 15 0 0 1 7 0 M6 6a11 11 0 0 1 12 0 M3.5 10a7 7 0 0 1 17 0" />
                        </svg>
                      </div>

                      {/* EMV Chip — Metallic */}
                      <div className="mt-6 sm:mt-8 w-11 h-8 sm:w-12 sm:h-9 rounded-md overflow-hidden shadow-md">
                        <div className="w-full h-full bg-gradient-to-br from-[#f5e6b8] via-[#d4af37] to-[#b8860b] relative">
                          <div className="absolute inset-0 flex flex-col justify-between p-[3px]">
                            <div className="h-[1px] bg-[#a0852a]/40"></div>
                            <div className="h-[1px] bg-[#a0852a]/40"></div>
                            <div className="h-[1px] bg-[#a0852a]/40"></div>
                          </div>
                          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#a0852a]/40 -translate-x-1/2"></div>
                          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#a0852a]/40 -translate-y-1/2"></div>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="mt-auto">
                        <p className="text-white text-[15px] sm:text-[17px] md:text-[19px] font-mono font-semibold tracking-[0.18em] drop-shadow-md mb-4 sm:mb-5" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
                          5234 5678 9012 3456
                        </p>
                        
                        {/* Bottom Row: Name + Expiry */}
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[8px] text-white/50 uppercase tracking-wider mb-0.5">Card Holder</p>
                            <p className="text-white/90 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] drop-shadow-sm">JAMES WILSON</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[8px] text-white/50 uppercase tracking-wider mb-0.5">Expires</p>
                            <p className="text-white/90 text-[11px] sm:text-[12px] font-semibold tracking-wider drop-shadow-sm">09/28</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Float keyframe animation */}
        <style>{`
          @keyframes cardFloat {
            0%, 100% { transform: rotateY(-8deg) rotateX(5deg) rotate(12deg) translateY(0px); }
            50% { transform: rotateY(-8deg) rotateX(5deg) rotate(12deg) translateY(-14px); }
          }
        `}</style>
      </section>

      {/* International Escro Section */}
      <section className="py-8 md:py-16 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0a0a0a] rounded-3xl md:rounded-[36px] overflow-hidden p-6 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <p className="text-[#A3E635] text-xs font-semibold mb-3 tracking-wider uppercase">{t.international.label}</p>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">{t.international.title}</h2>
                <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed max-w-md">
                  {t.international.desc}
                </p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 rounded-full font-bold text-sm shadow-[0_4px_14px_rgba(163,230,53,0.35)] hover:bg-[#b8ed5a] hover:scale-[1.03] active:scale-[0.98] transition-all">
                    {t.international.getStarted}
                  </Link>
                  <Link to="/register" className="inline-flex items-center gap-2 border border-slate-700 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-slate-800 transition-colors">
                    {t.international.contactSales}
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center p-8">
                <div className="w-52 h-80 bg-[#141414] rounded-3xl border-2 border-slate-800 shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-b from-[#1c1c1c] to-[#121212] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#A3E635]/10 flex items-center justify-center text-[#A3E635] mb-4">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h.01M10 8h.01" /><circle cx="12" cy="12" r="3" /></svg>
                    </div>
                    <span className="text-sm font-bold text-white mb-1">Global Payouts</span>
                    <span className="text-xs text-slate-400">180+ countries supported</span>
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
              <p className="text-[10px] md:text-xs text-slate-500 mt-1">{t.stats.processed}</p>
            </div>
            <div className="text-center">
              <p className="text-lg md:text-2xl lg:text-3xl font-bold">1,500,000+</p>
              <p className="text-[10px] md:text-xs text-slate-500 mt-1">{t.stats.customers}</p>
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
            <p className="text-slate-400 text-xs md:text-sm mb-3">{t.business.subtitle}</p>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-display font-bold text-white leading-tight">
              {t.business.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Hold and release payments globally */}
            <div className="bg-[#A3E635] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col justify-between md:row-span-2 min-h-[280px] md:min-h-[400px] group hover:scale-[1.02] transition-transform duration-300">
              <div>
                <h3 className="text-lg md:text-2xl font-display font-bold text-black mb-2">{t.business.holdRelease}</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-black/70 hover:text-black">{t.business.explore}</a>
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
                <h3 className="text-base md:text-xl font-display font-bold text-white mb-2 group-hover:text-[#A3E635] transition-colors">{t.business.invoices}</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">{t.business.learnInvoices}</a>
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
                <h3 className="text-base md:text-xl font-display font-bold text-white mb-2 group-hover:text-[#A3E635] transition-colors">{t.business.cards}</h3>
                <a href="/register" className="text-xs md:text-sm font-medium text-blue-400 hover:text-blue-300">{t.business.learnCards}</a>
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
              <h3 className="text-base md:text-xl font-display font-bold text-white mb-2 group-hover:text-[#A3E635] transition-colors">{t.business.exchange}</h3>
              <a href="/register" className="text-xs md:text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a]">{t.business.learnExchange}</a>
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
          <h2 className="text-3xl md:text-5xl lg:text-[64px] font-display font-bold text-white leading-tight tracking-tight">{t.spend.title}</h2>
        </div>
        <div className="max-w-[540px] mx-auto flex flex-col gap-3 md:gap-4">
          {[
            { cat: 'Logistics', date: 'March 25, 2022', amount: '$100' },
            { cat: 'Graphics', date: 'March 29, 2022', amount: '$45' },
            { cat: 'Retail', date: 'March 27, 2022', amount: '-$241', active: true },
            { cat: 'Others', date: 'March 25, 2022', amount: '$100' },
            { cat: 'Tech', date: 'March 29, 2022', amount: '$45' },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`group rounded-xl px-5 md:px-8 py-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${item.active ? 'bg-white text-black scale-[1.02] shadow-xl' : 'bg-[#29303D] text-slate-300 hover:bg-white hover:text-black'}`}
            >
              <div className="flex items-center gap-4 w-[65%]">
                <div className="relative flex items-center justify-center">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300 ${item.active ? 'border-[#ff7a00]' : 'border-slate-500 group-hover:border-[#ff7a00]'}`}></div>
                  <div className={`absolute w-1.5 h-1.5 rounded-full transition-colors duration-300 ${item.active ? 'bg-[#ff7a00]' : 'bg-transparent group-hover:bg-[#ff7a00]'}`}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full items-center">
                  <span className={`text-[15px] font-medium transition-colors duration-300 ${item.active ? 'text-black' : 'text-white group-hover:text-black'}`}>{item.cat}</span>
                  <span className={`text-[13px] transition-colors duration-300 ${item.active ? 'text-slate-500' : 'text-slate-400 group-hover:text-slate-500'}`}>{item.date}</span>
                </div>
              </div>
              <span className={`text-[15px] font-bold transition-colors duration-300 ${item.active ? 'text-black' : 'text-white group-hover:text-black'}`}>{item.amount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator & Escrow Protection Form */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0a0a0a] rounded-3xl md:rounded-[36px] overflow-hidden p-6 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 md:mb-4 leading-tight">{t.protect.title}</h2>
                <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
                  {t.protect.desc}
                </p>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <span className="text-xs text-slate-500 w-8 md:w-12">Pay</span>
                    <select 
                      value={payType}
                      onChange={(e) => setPayType(e.target.value)}
                      className="bg-[#1f1f1f] border border-slate-700 rounded-lg px-3 py-2 text-xs md:text-sm text-white w-28 md:w-32 focus:outline-none focus:border-[#A3E635]"
                    >
                      <option>Buying</option>
                      <option>Selling</option>
                    </select>
                    <span className="text-xs text-slate-500 hidden sm:inline">Item type</span>
                    <select 
                      value={itemType}
                      onChange={(e) => setItemType(e.target.value)}
                      className="bg-[#1f1f1f] border border-slate-700 rounded-lg px-3 py-2 text-xs md:text-sm text-white flex-1 min-w-[120px] focus:outline-none focus:border-[#A3E635]"
                    >
                      <option>Services</option>
                      <option>Physical Goods</option>
                      <option>Digital Goods</option>
                      <option>Milestone Contract</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xs text-slate-500 w-8 md:w-12">For</span>
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-[#1f1f1f] border border-slate-700 rounded-lg px-3 py-2 text-xs md:text-sm text-white w-28 md:w-32 focus:outline-none focus:border-[#A3E635]"
                      placeholder="1000"
                    />
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="bg-[#1f1f1f] border border-slate-700 rounded-lg px-3 py-2 text-xs md:text-sm text-white w-24 focus:outline-none focus:border-[#A3E635]"
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                      <option>NGN</option>
                    </select>
                  </div>
                  <div className="pt-4">
                    <Link to="/register" className="w-full inline-block py-3 bg-[#A3E635] text-black font-bold rounded-xl text-center text-sm shadow-[0_4px_14px_rgba(163,230,53,0.35)] hover:bg-[#b8ed5a] hover:scale-[1.02] active:scale-[0.98] transition-all">
                      {t.protect.cta}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Milestone Steps */}
              <div className="bg-[#141414] rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-center border border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#A3E635]/10 flex items-center justify-center text-[#A3E635]">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base md:text-lg">{t.protect.milestone}</h3>
                </div>

                <div className="space-y-4">
                  {t.protect.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-[#A3E635] text-black' : 'border border-slate-600 text-slate-400'}`}>
                        {idx === 0 ? '✓' : idx + 1}
                      </div>
                      <span className={`text-xs md:text-sm ${idx === 0 ? 'text-white font-semibold' : 'text-slate-400'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-xs md:text-sm mb-3">{t.cta.subtitle}</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 md:mb-8 leading-tight">{t.cta.title}</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-7 py-3.5 rounded-full font-bold text-sm shadow-[0_4px_14px_rgba(163,230,53,0.35)] hover:bg-[#b8ed5a] hover:scale-[1.03] active:scale-[0.98] transition-all">
              {t.cta.tryProtection}
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border border-slate-300 text-black px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-slate-50 transition-colors">
              {t.cta.contactSales}
            </Link>
          </div>
        </div>
      </section>

      {/* Connect Platform with Escrow Trust */}
      <section className="px-4 md:px-6 pb-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0a0a0a] rounded-3xl md:rounded-[40px] p-8 md:p-16 lg:p-20 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 md:mb-8 leading-tight">
              {t.connect.title}
            </h2>
            <div className="mb-12">
              <Link to="/register" className="inline-block bg-[#A3E635] text-black px-8 md:px-10 py-4 rounded-full font-bold text-base shadow-[0_4px_20px_rgba(163,230,53,0.4)] hover:bg-[#b8ed5a] hover:scale-[1.04] active:scale-[0.98] transition-all">
                {t.connect.cta}
              </Link>
            </div>

            {/* Bottom Footer inside card */}
            <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center bg-[#1f1f1f] p-1 rounded-full border border-white/10 text-xs">
                <button className="px-4 py-1.5 rounded-full bg-[#A3E635] text-black font-bold">{t.footer.personal}</button>
                <button className="px-4 py-1.5 rounded-full text-slate-400 hover:text-white transition-colors">{t.footer.business}</button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
                <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
                <Link to="/pricing" className="hover:text-white transition-colors">{t.nav.pricing}</Link>
                <Link to="/help" className="hover:text-white transition-colors">{t.nav.help}</Link>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
