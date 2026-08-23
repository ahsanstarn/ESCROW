import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { 
  Wallet, DollarSign, Clock, AlertTriangle, ShieldCheck, 
  ChevronRight, Box, CheckCircle2, TrendingUp, MoreHorizontal 
} from 'lucide-react';

interface SellerDashboardProps {
  userId?: string;
  userName?: string;
}

export default function SellerDashboard({ userId, userName }: SellerDashboardProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading dashboard..." />;
  }

  const kpiCards = [
    { title: 'Available Balance', value: '$15,500.00', sub: '3 active transactions', icon: Wallet, hasAction: true },
    { title: 'Funds in Escrow', value: '$15,500.00', sub: 'Across 6 Orders', icon: DollarSign },
    { title: 'Next Expected Release', value: '$8,750.00', sub: '22h 18m', icon: Clock },
    { title: 'Disputes Requiring Action', value: '1', sub: 'Immediate attention required', icon: AlertTriangle, warning: true },
    { title: 'Trust Score', value: '33%', sub: 'Success Rate', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
        
        <div style={{ animation: 'fadeInUp 0.5s ease-out 0s both' }}>
          <h1 className="text-2xl font-display font-bold text-slate-900">Seller Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor funds in escrow, release timers, and disputes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpiCards.map((card, index) => (
            <div key={index} style={{ animation: `fadeInUp 0.5s ease-out ${(index + 1) * 0.1}s both` }} className="bg-[#FFFFFF] rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${card.warning ? 'bg-red-100' : 'bg-[#DDFC95]/20'}`}>
                <card.icon className={`w-5 h-5 ${card.warning ? 'text-red-700' : 'text-[#305941]'}`} />
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">{card.title}</p>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-1">{card.value}</h2>
              <p className="text-xs text-slate-400 flex-1">{card.sub}</p>
              {card.hasAction && (
                <button className="mt-4 w-full py-2 bg-[#DDFC95] hover:bg-[#A3E635] text-[#305941] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Wallet className="w-4 h-4" /> Withdraw
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6" style={{ animation: `fadeInUp 0.5s ease-out 0.6s both` }}>
          <h3 className="font-semibold text-slate-900 mb-4">What Needs Attention</h3>
          <div className="divide-y divide-slate-100">
            <div className="py-3 flex items-center gap-4 hover:bg-[#DDFC95]/10 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                <Box className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Order #83421 — Mark as Delivered</p>
                <p className="text-xs text-slate-500">12h left</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
            <div className="py-3 flex items-center gap-4 hover:bg-[#DDFC95]/10 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-[#BCF49D]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#BCF49D] transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#1B4D1E]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Milestone 2 ready for submission</p>
                <p className="text-xs text-slate-500">Order #83422</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
            <div className="py-3 flex items-center gap-4 hover:bg-[#DDFC95]/10 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Buyer raised a dispute — respond within 24h</p>
                <p className="text-xs text-slate-500">ORD-2026-0115</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
            <div className="py-3 flex items-center gap-4 hover:bg-[#DDFC95]/10 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-100 transition-colors">
                <ShieldCheck className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">KYC required to enable payouts</p>
                <p className="text-xs text-slate-500">Compliance Now</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 overflow-hidden" style={{ animation: `fadeInUp 0.5s ease-out 0.7s both` }}>
          <div className="mb-4">
            <h3 className="font-semibold text-slate-900">Orders & Escrow Status</h3>
            <p className="text-xs text-slate-500 mt-1">All transactions sorted by expected release date</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#DDFC95]/20 text-xs text-[#305941] font-semibold uppercase rounded-xl">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Order ID</th>
                  <th className="px-4 py-3">Buyer</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Risk</th>
                  <th className="px-4 py-3">Delivery</th>
                  <th className="px-4 py-3">Expected Release</th>
                  <th className="px-4 py-3 rounded-r-xl"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: 'ORD-2026-0107', sub: 'esc_6p7g8t9s', buyer: 'NetConnect Solutions', amt: '$3,800.00', status: 'Completed', statusCls: 'bg-green-100 text-green-800', risk: 'Low Risk', riskBg: 'bg-[#BCF49D]', delivery: 'Confirmed', time: 'Expired' },
                  { id: 'ORD-2026-0113', sub: 'esc_2l3m4n5o', buyer: 'HomeTech Solutions', amt: '$7,650.00', status: 'Completed', statusCls: 'bg-green-100 text-green-800', risk: 'Low Risk', riskBg: 'bg-[#BCF49D]', delivery: 'Confirmed', time: 'Expired' },
                  { id: 'ORD-2026-0108', sub: 'esc_5o6p7q8r', buyer: 'Global Enterprises', amt: '$12,100.00', status: 'Completed', statusCls: 'bg-green-100 text-green-800', risk: 'Low Risk', riskBg: 'bg-[#BCF49D]', delivery: 'Confirmed', time: 'Expired' },
                  { id: 'ORD-2026-0116', sub: 'esc_1k2l3m4n', buyer: 'RoboTech Industries', amt: '$18,300.00', status: 'Disputed', statusCls: 'bg-red-100 text-red-800', risk: 'High Risk', riskBg: 'bg-red-100 text-red-800', delivery: 'Delivered', time: 'Expired' },
                  { id: 'ORD-2026-0109', sub: 'esc_5o6p7q8r', buyer: 'SafeGuard Security', amt: '$5,100.00', status: 'Pending', statusCls: 'bg-yellow-100 text-yellow-800', risk: 'Medium Risk', riskBg: 'bg-yellow-100 text-yellow-800', delivery: 'In Transit', time: 'Expired' },
                ].map((order, idx) => (
                  <tr key={idx} className="hover:bg-[#DDFC95]/10 transition-colors group">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{order.id}</p>
                      <p className="text-[10px] text-slate-400">{order.sub}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{order.buyer}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{order.amt}</p>
                      <p className="text-[10px] text-slate-400">USD</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-semibold ${order.statusCls}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-semibold text-slate-700 ${order.riskBg}`}>
                        {order.risk}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{order.delivery}</td>
                    <td className="px-4 py-3 text-slate-600 flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3" /> {order.time}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6" style={{ animation: `fadeInUp 0.5s ease-out 0.8s both` }}>
          <h3 className="font-semibold text-slate-900 mb-6">Business Health Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100">
            <div className="text-center px-4 hover:-translate-y-1 transition-transform cursor-default">
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-1">2.3%</h2>
              <p className="text-xs text-slate-500 mb-2">Dispute Ratio</p>
              <div className="flex items-center justify-center gap-1 text-xs font-semibold text-[#1B4D1E]">
                <TrendingUp className="w-3 h-3" /> Good
              </div>
            </div>
            <div className="text-center px-4 hover:-translate-y-1 transition-transform cursor-default">
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-1">4.2 days</h2>
              <p className="text-xs text-slate-500 mb-2">Avg. Release Time</p>
              <div className="flex items-center justify-center gap-1 text-xs font-semibold text-[#1B4D1E]">
                <TrendingUp className="w-3 h-3" /> Good
              </div>
            </div>
            <div className="text-center px-4 hover:-translate-y-1 transition-transform cursor-default">
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-1">94%</h2>
              <p className="text-xs text-slate-500 mb-2">On-Time Delivery</p>
              <div className="flex items-center justify-center gap-1 text-xs font-semibold text-[#1B4D1E]">
                <TrendingUp className="w-3 h-3" /> Good
              </div>
            </div>
            <div className="text-center px-4 hover:-translate-y-1 transition-transform cursor-default">
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-1">67%</h2>
              <p className="text-xs text-slate-500 mb-2">Repeat Buyer %</p>
              <div className="flex items-center justify-center gap-1 text-xs font-semibold text-[#1B4D1E]">
                <TrendingUp className="w-3 h-3" /> Good
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
