import { Link } from 'react-router-dom';

export default function Careers() {
  const jobs = [
    { title: 'Senior Escro Operations Manager', dept: 'Operations', location: 'Remote', type: 'Full-time' },
    { title: 'Full Stack Developer', dept: 'Engineering', location: 'San Francisco, CA', type: 'Full-time' },
    { title: 'Compliance Officer', dept: 'Legal', location: 'New York, NY', type: 'Full-time' },
    { title: 'Customer Success Manager', dept: 'Support', location: 'Remote', type: 'Full-time' },
    { title: 'UI/UX Designer', dept: 'Design', location: 'London, UK', type: 'Full-time' },
    { title: 'DevOps Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
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

      <section className="pt-32 pb-20 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#A3E635] text-sm font-medium mb-4">Join Our Team</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">Build the future of trust</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Help us make online transactions safer for everyone. We're looking for passionate people to join our mission.</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: 'Remote-First Culture', desc: 'Work from anywhere in the world. We believe great talent isn\'t limited by geography.' },
            { title: 'Competitive Compensation', desc: 'Top of market salary, equity packages, and performance bonuses for every team member.' },
            { title: 'Growth & Learning', desc: 'Annual learning budget, mentorship programs, and clear career progression paths.' },
          ].map((p) => (
            <div key={p.title} className="bg-[#f5f5f5] rounded-2xl p-8">
              <h3 className="font-display font-bold text-lg mb-3">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.title} className="bg-white rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow cursor-pointer border border-slate-100">
                <div>
                  <h3 className="font-semibold mb-1">{job.title}</h3>
                  <p className="text-sm text-slate-500">{job.dept} · {job.location} · {job.type}</p>
                </div>
                <Link to="/register" className="text-sm font-medium text-[#A3E635] hover:text-[#b8ed5a] whitespace-nowrap">Apply Now →</Link>
              </div>
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
