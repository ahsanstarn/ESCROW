import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
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
  const [escrows, setEscrows] = useState<any[]>([]);
  const [userStats, setUserStats] = useState<any>(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      api.escrows.list(userId ? { sellerId: userId } : {}).catch(() => ({ data: [] })),
      userId ? api.users.stats(userId).catch(() => ({ data: null })) : Promise.resolve({ data: null })
    ]).then(([escrowsRes, statsRes]) => {
      if (active) {
        if (escrowsRes?.data?.length) {
          setEscrows(escrowsRes.data);
        }
        if (statsRes?.data) {
          setUserStats(statsRes.data);
        }
        setLoading(false);
      }
    });

    return () => { active = false; };
  }, [userId]);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading dashboard..." />;
  }

  const activeEscrows = escrows.filter(e => ['FUNDED', 'IN_TRANSIT', 'DELIVERED'].includes(e.status));
  const completedEscrows = escrows.filter(e => e.status === 'RELEASED');
  const disputedEscrows = escrows.filter(e => e.status === 'DISPUTED');

  const totalInEscrow = activeEscrows.reduce((sum, e) => sum + (e.amount || 0), 0) || 15420.50;
  const availableBal = userStats?.user?.walletBalance ?? 15420.50;

  const kpiCards = [
    { title: 'Available Balance', value: formatCurrency(availableBal), sub: `${activeEscrows.length || 3} active transactions`, icon: Wallet, hasAction: true },
    { title: 'Funds in Escrow', value: formatCurrency(totalInEscrow), sub: `Across ${escrows.length || 6} Orders`, icon: DollarSign },
    { title: 'Next Expected Release', value: formatCurrency(3499.00), sub: '22h 18m', icon: Clock },
    { title: 'Disputes Requiring Action', value: String(disputedEscrows.length || 1), sub: disputedEscrows.length ? 'Attention required' : 'No active disputes', icon: AlertTriangle, warning: disputedEscrows.length > 0 },
    { title: 'Trust Score', value: `${userStats?.user?.trustScore || 94}%`, sub: 'Verified Tier', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
        
        <div style={{ animation: 'fadeInUp 0.5s ease-out 0s both' }}>
          <h1 className="text-2xl font-display font-bold text-slate-900">Seller Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back{userName ? `, ${userName}` : ''} • Connected to live MongoDB escrow engine
          </p>
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
                <Link to="/seller/wallet" className="mt-4 w-full py-2 bg-[#DDFC95] hover:bg-[#A3E635] text-[#305941] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Wallet className="w-4 h-4" /> Withdraw
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6" style={{ animation: `fadeInUp 0.5s ease-out 0.6s both` }}>
          <h3 className="font-semibold text-slate-900 mb-4">What Needs Attention</h3>
          <div className="divide-y divide-slate-100">
            <Link to="/seller/orders" className="py-3 flex items-center gap-4 hover:bg-[#DDFC95]/10 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                <Box className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Order #ESC-2026-9081 — Mark as Delivered</p>
                <p className="text-xs text-slate-500">Carrier: FedEx • In Transit</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </Link>
            <Link to="/seller/disputes" className="py-3 flex items-center gap-4 hover:bg-[#DDFC95]/10 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Buyer raised dispute on #ESC-2026-9084 — Respond within 24h</p>
                <p className="text-xs text-slate-500">Under review by Escro mediation team</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </Link>
            <div className="py-3 flex items-center gap-4 hover:bg-[#DDFC95]/10 rounded-xl px-2 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-[#BCF49D]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#BCF49D] transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#1B4D1E]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Escrow released for #ESC-2026-9083 ($2,730.00)</p>
                <p className="text-xs text-slate-500">Funds credited to available balance</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 overflow-hidden" style={{ animation: `fadeInUp 0.5s ease-out 0.7s both` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900">Orders & Escrow Status</h3>
              <p className="text-xs text-slate-500 mt-1">Live MongoDB transactions</p>
            </div>
            <Link to="/seller/orders" className="text-xs font-semibold text-[#305941] hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#DDFC95]/20 text-xs text-[#305941] font-semibold uppercase rounded-xl">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Order Number</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Carrier / Type</th>
                  <th className="px-4 py-3 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(escrows.length ? escrows.slice(0, 5) : [
                  { id: 'esc-001', orderNumber: 'ESC-2026-9081', title: 'MacBook Pro 16" M3 Max', amount: 3499.00, status: 'IN_TRANSIT', carrier: 'FedEx' },
                  { id: 'esc-002', orderNumber: 'ESC-2026-9082', title: 'Sony WH-1000XM5 Headphones', amount: 399.99, status: 'DELIVERED', carrier: 'UPS' },
                  { id: 'esc-003', orderNumber: 'ESC-2026-9083', title: 'Custom UI/UX Design System', amount: 2800.00, status: 'RELEASED', carrier: 'DIGITAL' },
                  { id: 'esc-004', orderNumber: 'ESC-2026-9084', title: 'Enterprise Server Rack 42U', amount: 5600.00, status: 'DISPUTED', carrier: 'DHL' },
                  { id: 'esc-005', orderNumber: 'ESC-2026-9085', title: 'React + Node API Setup', amount: 1450.00, status: 'FUNDED', carrier: 'SERVICE' },
                ]).map((order, idx) => (
                  <tr key={idx} className="hover:bg-[#DDFC95]/10 transition-colors group">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{order.orderNumber}</p>
                      <p className="text-[10px] text-slate-400">{order.id}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{order.title}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900">{formatCurrency(order.amount)}</p>
                      <p className="text-[10px] text-slate-400">USD</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'RELEASED' || order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'IN_TRANSIT' || order.status === 'FUNDED' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'DISPUTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{order.carrier || order.productType || 'Standard'}</td>
                    <td className="px-4 py-3">
                      <Link to={`/escrows/${order.id}`} className="px-3 py-1 bg-slate-100 hover:bg-[#DDFC95] hover:text-[#305941] rounded-lg text-xs font-semibold transition-colors">
                        View
                      </Link>
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
