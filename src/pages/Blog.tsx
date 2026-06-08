import { Link } from 'react-router-dom';

export default function Blog() {
  const posts = [
    { title:'The Future of Escrow: Trends to Watch in 2026', date:'Jun 2, 2026', cat:'Industry', excerpt:'Explore the emerging trends shaping the escrow industry and how technology is transforming secure transactions.' },
    { title:'How Escrow Protects Freelancers and Clients', date:'May 28, 2026', cat:'Guides', excerpt:'A comprehensive guide on how escrow services create a safety net for both freelancers and their clients.' },
    { title:'Understanding Cross-Border Escrow Transactions', date:'May 20, 2026', cat:'Business', excerpt:'Navigate the complexities of international escrow with our expert guide on cross-border payments.' },
    { title:'5 Ways Escrow Reduces eCommerce Fraud', date:'May 15, 2026', cat:'Security', excerpt:'Learn how implementing escrow can dramatically reduce fraud risks in your online business.' },
    { title:'Escrow for SaaS Subscriptions: A New Standard', date:'May 8, 2026', cat:'Product', excerpt:'Why subscription businesses are adopting escrow to build trust and reduce churn.' },
    { title:'The Rise of Milestone-Based Escrow Payments', date:'Apr 30, 2026', cat:'Product', excerpt:'How milestone payments are revolutionizing project-based work across industries.' },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#A3E635"/><path d="M10 14C12.5 11 15 11 18 14C20.5 17 23 17 26 14" stroke="black" strokeWidth="2.5" strokeLinecap="round"/><path d="M10 20C12.5 17 15 17 18 20C20.5 23 23 23 26 20" stroke="black" strokeWidth="2.5" strokeLinecap="round"/><path d="M10 26C12.5 23 15 23 18 26C20.5 29 23 29 26 26" stroke="black" strokeWidth="2.5" strokeLinecap="round"/></svg>
            <span className="text-lg font-bold text-white">Escrow</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-white hover:text-slate-200 px-4 py-2">Login</Link>
            <Link to="/register" className="text-sm font-semibold bg-[#A3E635] text-black px-5 py-2 rounded-lg hover:bg-[#b8ed5a]">Register</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#A3E635] text-sm font-medium mb-4">Blog</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Insights & Updates</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Stay informed with the latest news, guides, and industry insights from the Escrow team.</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {posts.map((p) => (
            <article key={p.title} className="bg-[#f5f5f5] rounded-2xl p-8 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium bg-[#A3E635]/20 text-black px-3 py-1 rounded-full">{p.cat}</span>
                <span className="text-xs text-slate-400">{p.date}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 leading-snug">{p.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.excerpt}</p>
              <span className="text-[#A3E635] text-sm font-medium hover:text-[#b8ed5a]">Read more →</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="py-8 px-6 bg-white border-t border-slate-100 text-center text-sm text-slate-400">
        &copy; 2026 Escrow. All rights reserved.
      </footer>
    </div>
  );
}
