import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HelpCenter() {
  const faqs = [
    { q:'How does escro work?', a:'Escro holds funds securely until both parties confirm the transaction is complete. The buyer deposits payment, the seller delivers the goods or service, and once the buyer confirms satisfaction, funds are released to the seller.' },
    { q:'How long does an escrow transaction take?', a:'Transaction duration depends on the confirmation window set by the merchant. Typically, transactions complete within 3-7 days, but you can set windows from 1 to 168 hours.' },
    { q:'What happens if there is a dispute?', a:'If a dispute arises, both parties can submit evidence. Our arbitration team reviews the case and makes a fair resolution based on the evidence provided. Most disputes are resolved within 48 hours.' },
    { q:'What are the fees?', a:'Our standard platform fee is 2.5% of the transaction amount. This covers escrow protection, dispute resolution, and platform maintenance. Volume discounts are available for Enterprise plans.' },
    { q:'Is my money safe?', a:'Yes. Funds are held in segregated trust accounts with top-tier banking partners. We never commingle client funds with operating capital. Every transaction is protected by bank-grade security.' },
    { q:'Can I cancel an escrow?', a:'Escrows can be cancelled before the buyer deposits funds. Once funds are deposited, cancellation requires mutual agreement from both parties or a dispute resolution.' },
  ];

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

      <section className="pt-32 pb-20 px-4 sm:px-6 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            How can we help?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg mb-8"
          >
            Find answers to common questions about escrow, transactions, and our platform.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <input type="text" placeholder="Search for help..." className="w-full px-5 py-3.5 bg-[#1a1a1a] border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 transition-shadow" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-bold mb-10 text-center"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                key={faq.q} 
                className="bg-[#f5f5f5] rounded-xl p-6 group cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <summary className="font-semibold text-sm list-none flex items-center justify-between outline-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </summary>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed overflow-hidden animate-fade-in">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 bg-white border-t border-slate-100 text-center text-sm text-slate-400">
        &copy; 2026 Escro. All rights reserved.
      </footer>
    </div>
  );
}
