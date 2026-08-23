import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">Get in touch</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Have questions about Escro? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#A3E635] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Message sent!</h2>
              <p className="text-slate-500 mb-6">We'll get back to you within 24 hours.</p>
              <Link to="/" className="text-[#A3E635] font-medium hover:text-[#b8ed5a]">Back to homepage</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                <input type="text" placeholder="Enter your name" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea rows={5} placeholder="How can we help?" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 resize-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#A3E635] text-black font-semibold rounded-lg hover:bg-[#b8ed5a] transition-colors">Send Message</button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 bg-white border-t border-slate-100 text-center text-sm text-slate-400">
        &copy; 2026 Escro. All rights reserved.
      </footer>
    </div>
  );
}
