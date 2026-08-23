import { Link } from 'react-router-dom';

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#A3E635"/><path d="M10 14C12.5 11 15 11 18 14C20.5 17 23 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round"/><path d="M10 20C12.5 17 15 17 18 20C20.5 23 23 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round"/><path d="M10 26C12.5 23 15 23 18 26C20.5 29 23 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round"/></svg>
            <span className="text-lg font-bold text-white">Escro</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-white hover:text-slate-200 px-4 py-2">Login</Link>
            <Link to="/register" className="text-sm font-semibold bg-[#A3E635] text-black px-5 py-2 rounded-lg hover:bg-[#b8ed5a]">Register</Link>
          </div>
        </div>
      </nav>
      <section className="pt-32 pb-20 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">{title}</h1>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto prose prose-slate text-sm leading-relaxed">
          {children}
        </div>
      </section>
      <footer className="py-8 px-4 sm:px-6 bg-white border-t border-slate-100 text-center text-sm text-slate-400">
        &copy; 2026 Escro. All rights reserved.
      </footer>
    </div>
  );
}

export function Privacy() {
  return (
    <Page title="Privacy Policy">
      <p className="mb-4"><strong>Last Updated:</strong> January 1, 2026</p>
      <p className="mb-6">Escro is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.</p>
      <h2 className="text-lg font-display font-bold mb-3">Information We Collect</h2>
      <p className="mb-6">We collect information you provide directly: name, email address, phone number, payment information, and identity verification documents. We also automatically collect usage data, IP addresses, and device information.</p>
      <h2 className="text-lg font-display font-bold mb-3">How We Use Information</h2>
      <p className="mb-6">We use your information to process transactions, verify identities, prevent fraud, communicate with you about your account, and improve our services. We never sell your personal data.</p>
      <h2 className="text-lg font-display font-bold mb-3">Data Security</h2>
      <p className="mb-6">We employ bank-grade encryption, secure data centers, and regular security audits. Your financial data is stored in segregated, encrypted databases with strict access controls.</p>
      <h2 className="text-lg font-display font-bold mb-3">Contact</h2>
      <p>For privacy-related inquiries, contact us at privacy@escrow.com.</p>
    </Page>
  );
}

export function Terms() {
  return (
    <Page title="Terms of Service">
      <p className="mb-4"><strong>Last Updated:</strong> January 1, 2026</p>
      <p className="mb-6">By using Escro's services, you agree to these Terms of Service. Please read them carefully.</p>
      <h2 className="text-lg font-display font-bold mb-3">1. Account Registration</h2>
      <p className="mb-6">You must provide accurate information when creating an account. You are responsible for maintaining the security of your login credentials.</p>
      <h2 className="text-lg font-display font-bold mb-3">2. Escro Services</h2>
      <p className="mb-6">Escro holds funds in trust accounts. Funds are released only when all conditions of the transaction are met as agreed by both parties.</p>
      <h2 className="text-lg font-display font-bold mb-3">3. Fees</h2>
      <p className="mb-6">Platform fees are calculated as a percentage of the transaction amount. Current fee schedule: Standard 2.5%, with volume discounts for Enterprise plans.</p>
      <h2 className="text-lg font-display font-bold mb-3">4. Disputes</h2>
      <p className="mb-6">In case of disputes, Escro will review evidence from both parties and make a binding resolution. Disputes must be filed within the confirmation window.</p>
      <h2 className="text-lg font-display font-bold mb-3">5. Limitation of Liability</h2>
      <p>Escro's liability is limited to the amount held in escrow for the specific transaction. We are not liable for indirect or consequential damages.</p>
    </Page>
  );
}

export default Privacy;

