import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { 
  Clock, CheckCircle, ShieldCheck, 
  AlertCircle, ChevronRight
} from 'lucide-react';

interface BuyerOverviewProps {
  userId?: string;
  userName?: string;
}

export default function BuyerOverview({ userId, userName }: BuyerOverviewProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-[#ECF4E9]">
      <div className="p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col animate-fadeInUp" style={{ animation: 'fadeInUp 0.1s ease-out both' }}>
          <h1 className="text-2xl font-display font-bold text-slate-900">Buyer Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of your purchases and escrow protection</p>
        </div>

        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Available Balance */}
          <div className="bg-[#305941] rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between" style={{ animation: 'fadeInUp 0.2s ease-out both' }}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white text-xs">↗</span>
              </div>
              <span className="px-2 py-1 bg-[#4A7258] text-white text-[10px] rounded uppercase font-semibold">Ready</span>
            </div>
            <div>
              <p className="text-xs font-medium text-white/70 mb-1 uppercase tracking-wider">Available Balance</p>
              <h2 className="text-3xl font-display font-bold text-white mb-2">$1,250.50</h2>
              <div className="flex justify-between items-center text-xs text-[#DDFC95]">
                <span>~ Ready to use</span>
                <span>Wallet</span>
              </div>
            </div>
          </div>

          {/* Card 2: Funds in Escrow */}
          <div className="bg-[#305941] rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden" style={{ animation: 'fadeInUp 0.3s ease-out both' }}>
            <div className="absolute right-0 top-0 opacity-20">
              <div className="w-16 h-16 border-2 border-white rounded-full -mr-4 -mt-4"></div>
              <div className="w-12 h-12 border-2 border-white rounded-full -mr-2 -mt-2 absolute top-4 right-4"></div>
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-xs font-medium text-white/70 mb-1 uppercase tracking-wider">Funds in Escrow</p>
              <h2 className="text-3xl font-display font-bold text-white mb-2">$44,300.00</h2>
              <div className="flex justify-between items-center text-xs text-[#DDFC95]">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Protected</span>
                <span className="text-right">Secure<br/>6 txns</span>
              </div>
            </div>
          </div>

          {/* Card 3: Active Orders */}
          <div className="bg-[#0B406B] rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden" style={{ animation: 'fadeInUp 0.4s ease-out both' }}>
            <div className="absolute right-4 top-4">
              <div className="w-2 h-2 rounded-full bg-[#4DB6AC]"></div>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white text-xs">▣</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-white/70 mb-1 uppercase tracking-wider">Active Orders</p>
              <h2 className="text-3xl font-display font-bold text-white mb-2">13</h2>
              <div className="flex justify-between items-center text-xs text-[#4DB6AC]">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> In progress</span>
                <span className="text-right">Status<br/>Tracking</span>
              </div>
            </div>
          </div>

          {/* Card 4: Disputes Open */}
          <div className="bg-[#8B1E28] rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between" style={{ animation: 'fadeInUp 0.5s ease-out both' }}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <span className="px-2 py-1 bg-white/20 text-white text-[10px] rounded uppercase font-semibold">Action</span>
            </div>
            <div>
              <p className="text-xs font-medium text-white/70 mb-1 uppercase tracking-wider">Disputes Open</p>
              <h2 className="text-3xl font-display font-bold text-white mb-2">6</h2>
              <div className="flex justify-between items-center text-xs text-[#FF8A8A]">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Needs attention</span>
                <span className="text-right">Active<br/>Cases</span>
              </div>
            </div>
          </div>

        </div>

        {/* What Needs Attention Section */}
        <div className="bg-white rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-900 text-sm">What Needs Attention</h3>
            </div>
            <span className="text-xs text-slate-400">3 items</span>
          </div>
          <div className="divide-y divide-slate-50">
            
            <div className="p-5 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#ECF4E9] flex items-center justify-center flex-shrink-0 mt-1">
                <AlertCircle className="w-4 h-4 text-[#305941]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-semibold text-slate-900">Delivery Confirmation Needed</p>
                  <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] rounded font-medium">High Priority</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">ORD-2026-0124 - Industrial Grade 3D Printer has been delivered</p>
                <button className="text-[#305941] text-xs font-semibold flex items-center gap-1 hover:underline">
                  Confirm Delivery <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="p-5 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#ECF4E9] flex items-center justify-center flex-shrink-0 mt-1">
                <AlertCircle className="w-4 h-4 text-[#305941]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-semibold text-slate-900">Auto-Release in 48 Hours</p>
                </div>
                <p className="text-xs text-slate-500 mb-3">ORD-2026-0118 will automatically release funds if not confirmed</p>
                <button className="text-[#305941] text-xs font-semibold flex items-center gap-1 hover:underline">
                  Review Order <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#FAFAFA] text-center border-t border-slate-50 rounded-b-2xl cursor-pointer hover:bg-slate-50 transition-colors">
              <span className="text-xs font-semibold text-[#305941]">Show 1 More Items</span>
            </div>
          </div>
        </div>

        {/* Active Orders Section */}
        <div className="bg-white rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: 'fadeInUp 0.7s ease-out both' }}>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 text-slate-500 border border-slate-500 rounded-sm inline-flex items-center justify-center text-[10px]">▣</span>
              <h3 className="font-semibold text-slate-900 text-sm">Active Orders</h3>
            </div>
            <Link to="/buyer/transactions" className="text-xs font-semibold text-[#305941] hover:underline underline-offset-2">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FCFDFB] text-[10px] text-slate-500 uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Seller</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Progress</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: 'ORD-2026-0124', name: 'Industrial Grade 3D Printer', seller: 'Tech Supplies Inc.', amt: '$2,450.00', status: 'Held in Escrow', statusBg: 'bg-[#BCF49D]', statusText: 'text-[#1B4D1E]', prog: '50%' },
                  { id: 'ORD-2026-0118', name: 'Custom Web Application Development - Phase 2 Milestone', seller: 'Tech Supplies Inc.', amt: '$8,750.00', status: 'Pending Release', statusBg: 'bg-[#BCF49D]', statusText: 'text-[#1B4D1E]', prog: '90%' },
                  { id: 'ORD-2026-0115', name: 'CNC Milling Machine MX-5000', seller: 'Tech Supplies Inc.', amt: '$15,200.00', status: 'Disputed', statusBg: 'bg-red-800', statusText: 'text-white', prog: '50%' },
                  { id: 'ORD-2026-0112', name: 'Professional Camera Kit (5x Canon EOS R5)', seller: 'Tech Supplies Inc.', amt: '$4,300.00', status: 'Held in Escrow', statusBg: 'bg-[#BCF49D]', statusText: 'text-[#1B4D1E]', prog: '25%' },
                  { id: 'ORD-2026-0125', name: 'High-Performance Server Rack', seller: 'Tech Supplies Inc.', amt: '$6,800.00', status: 'Pending', statusBg: 'bg-[#DDFC95]', statusText: 'text-[#305941]', prog: '10%' },
                ].map((order, idx) => (
                  <tr key={idx} className="hover:bg-[#ECF4E9]/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900 mb-1">{order.id}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{order.name}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-medium">{order.seller}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">{order.amt}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-semibold ${order.statusBg} ${order.statusText}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{order.prog}</td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-[#305941] font-semibold hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Business Health Summary */}
        <div className="bg-white rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 p-6" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
          <h3 className="font-display font-bold text-slate-900 mb-4">Business Health Summary</h3>
          <div className="space-y-3">
            {[
              { label: 'Dispute Ratio', value: '2.3%', stat: 'Good' },
              { label: 'Avg. Release Time', value: '4.2 days', stat: 'Good' },
              { label: 'On-Time Delivery', value: '94%', stat: 'Good' },
              { label: 'Repeat Buyer %', value: '67%', stat: 'Good' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#F8FCF5] rounded-xl p-4 flex justify-between items-end border border-transparent hover:border-[#DDFC95] transition-colors">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-medium mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-slate-900">{item.value}</p>
                </div>
                <span className="text-[10px] text-[#305941] font-medium">{item.stat}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
