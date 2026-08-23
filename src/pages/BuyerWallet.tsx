import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { 
  ArrowUpRight, ShieldCheck, RefreshCcw, Filter, Search
} from 'lucide-react';

export default function BuyerWallet() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading wallet..." />;
  }

  return (
    <div className="min-h-screen bg-[#ECF4E9]">
      <div className="p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col animate-fadeInUp" style={{ animation: 'fadeInUp 0.1s ease-out both' }}>
          <h1 className="text-2xl font-display font-bold text-slate-900">Wallet</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your funds and transaction history</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Available Balance */}
          <div className="bg-[#305941] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between" style={{ animation: 'fadeInUp 0.2s ease-out both' }}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
              <span className="px-3 py-1 bg-white/20 text-white text-[10px] rounded-full uppercase font-semibold">Ready to withdraw</span>
            </div>
            <div>
              <p className="text-xs font-medium text-white/70 mb-1 uppercase tracking-wider">Available Balance</p>
              <h2 className="text-3xl font-display font-bold text-white mb-4">$1,250.50</h2>
              <button className="w-full bg-white text-[#305941] py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
                <ArrowUpRight className="w-4 h-4" /> Withdraw Funds
              </button>
            </div>
          </div>

          {/* Card 2: In Escrow */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between" style={{ animation: 'fadeInUp 0.3s ease-out both' }}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#ECF4E9] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#305941]" />
              </div>
              <span className="text-xs font-bold text-slate-900">Protected</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">In Escrow</p>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-1">$11,200.00</h2>
              <p className="text-xs text-slate-400">2 active orders</p>
            </div>
          </div>

          {/* Card 3: Total Refunds */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between" style={{ animation: 'fadeInUp 0.4s ease-out both' }}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center">
                <RefreshCcw className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-bold text-slate-900">Lifetime</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Total Refunds</p>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-1">$890.00</h2>
              <p className="text-xs text-slate-400">1 refund processed</p>
            </div>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6" style={{ animation: 'fadeInUp 0.5s ease-out both' }}>
          <h3 className="font-display font-bold text-slate-900 mb-4">Transaction History</h3>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex gap-2">
              <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50"><Filter className="w-4 h-4" /></button>
              <div className="flex bg-[#F8FAFC] rounded-lg p-1">
                <button className="px-4 py-1.5 bg-[#DDFC95] text-[#305941] text-xs font-bold rounded-md shadow-sm">All</button>
                <button className="px-4 py-1.5 text-slate-600 text-xs font-medium hover:text-slate-900 rounded-md">In Escrow</button>
                <button className="px-4 py-1.5 text-slate-600 text-xs font-medium hover:text-slate-900 rounded-md">Completed</button>
                <button className="px-4 py-1.5 text-slate-600 text-xs font-medium hover:text-slate-900 rounded-md">Refunds</button>
              </div>
            </div>
            <div className="relative flex-1 md:max-w-xs ml-auto">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search by order ID or description..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#305941] focus:ring-1 focus:ring-[#305941]" />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              { title: 'Industrial Grade 3D Printer', id: 'ORD-2026-0124', status: 'In Escrow', date: 'Jan 24, 2026', amt: '$2,450.00', icon: ShieldCheck, iconColor: 'text-[#305941]', bg: 'bg-[#ECF4E9]', badgeBg: 'bg-[#BCF49D]', badgeText: 'text-[#1B4D1E]' },
              { title: 'Custom Web Application Development', id: 'ORD-2026-0118', status: 'In Escrow', date: 'Jan 18, 2026', amt: '$8,750.00', icon: ShieldCheck, iconColor: 'text-[#305941]', bg: 'bg-[#ECF4E9]', badgeBg: 'bg-[#BCF49D]', badgeText: 'text-[#1B4D1E]' },
              { title: 'Premium Wireless Headphones', id: 'ORD-2026-0110', status: 'Completed', date: 'Jan 10, 2026', amt: '$1,250.50', icon: ArrowUpRight, iconColor: 'text-slate-600', bg: 'bg-slate-100', badgeBg: 'bg-[#DDFC95]', badgeText: 'text-[#305941]' },
              { title: 'Designer Sneakers', id: 'ORD-2025-1228', status: 'Completed', date: 'Dec 28, 2025', amt: '$3,200.00', icon: ArrowUpRight, iconColor: 'text-slate-600', bg: 'bg-slate-100', badgeBg: 'bg-[#DDFC95]', badgeText: 'text-[#305941]' },
              { title: 'Refund - Vintage Watch (Quality Issue)', id: 'ORD-2025-1220', status: 'Completed', date: 'Dec 20, 2025', amt: '+$890.00', amtColor: 'text-green-600', icon: RefreshCcw, iconColor: 'text-green-700', bg: 'bg-[#DDFC95]', badgeBg: 'bg-[#DDFC95]', badgeText: 'text-[#305941]' },
              { title: 'Mechanical Keyboard', id: 'ORD-2025-1215', status: 'Completed', date: 'Dec 16, 2025', amt: '$5,400.00', icon: ArrowUpRight, iconColor: 'text-slate-600', bg: 'bg-slate-100', badgeBg: 'bg-[#DDFC95]', badgeText: 'text-[#305941]' },
              { title: 'Wireless Mouse & Keyboard Set', id: 'ORD-2025-1210', status: 'Completed', date: 'Dec 10, 2025', amt: '$2,100.00', icon: ArrowUpRight, iconColor: 'text-slate-600', bg: 'bg-slate-100', badgeBg: 'bg-[#DDFC95]', badgeText: 'text-[#305941]' },
              { title: 'Professional Camera Kit', id: 'ORD-2025-1205', status: 'Completed', date: 'Dec 5, 2025', amt: '$12,500.00', icon: ArrowUpRight, iconColor: 'text-slate-600', bg: 'bg-slate-100', badgeBg: 'bg-[#DDFC95]', badgeText: 'text-[#305941]' },
            ].map((txn, idx) => (
              <div key={idx} className="py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors px-2 -mx-2 rounded-xl group cursor-pointer">
                <div className={`w-10 h-10 rounded-xl ${txn.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <txn.icon className={`w-4 h-4 ${txn.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">{txn.title}</h4>
                  <p className="text-xs text-slate-500 mb-1">{txn.id}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${txn.badgeBg} ${txn.badgeText}`}>{txn.status}</span>
                    <span className="text-[10px] text-slate-400">{txn.date}</span>
                  </div>
                </div>
                <div className={`font-bold text-sm ${txn.amtColor || 'text-slate-900'}`}>
                  {txn.amt}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Footer */}
        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row gap-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
          <div className="md:w-1/4">
            <div className="w-12 h-12 rounded-xl bg-[#DDFC95] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#305941]" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-sm">How Escrow Protects Your Money</h3>
          </div>
          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Secure Payment Hold</h4>
              <p className="text-xs text-slate-500">Your payment is held securely in escrow. Sellers cannot access funds until you confirm delivery and satisfaction with your order.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Inspection Period</h4>
              <p className="text-xs text-slate-500">You have time to inspect your purchase. If there's an issue, you can open a dispute and your money stays protected in escrow.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Automatic Protection</h4>
              <p className="text-xs text-slate-500">Even if you forget to confirm, your funds are protected with automatic release timers and dispute windows for your safety.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Quick Refunds</h4>
              <p className="text-xs text-slate-500">If a dispute is resolved in your favor, refunds are processed quickly and returned to your available balance for immediate use.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
