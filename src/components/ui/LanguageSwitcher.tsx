import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/i18n';
import { ChevronDown, Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, languages } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find(l => l.code === language);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-base">{current?.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden z-50 shadow-xl min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                language === lang.code
                  ? 'bg-[#A3E635]/10 text-[#A3E635]'
                  : 'text-slate-300 hover:bg-[#252525] hover:text-white'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="font-medium">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
