export function WaveLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#A3E635" />
      <path d="M10 14C12.5 11 15.5 11 18 14C20.5 17 23.5 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 20C12.5 17 15.5 17 18 20C20.5 23 23.5 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 26C12.5 23 15.5 23 18 26C20.5 29 23.5 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#A3E635" />
      <path d="M20 8L10 13V19C10 25.6 14.2 31.7 20 33.5C25.8 31.7 30 25.6 30 19V13L20 8Z" fill="black" fillOpacity="0.85" />
      <path d="M16 20L19 23L25 17" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
