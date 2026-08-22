import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown, DollarSign, Lock, Wallet, Clock, ShieldCheck, AlertTriangle, CircleDot, Eye, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AgencyEscrowFinance() {
  const [transactions] = useState([
    { client: 'Tech Solutions Inc.', amount: '$45,000.00', status: 'In Escro', date: '24/01/2026' },
    { client: 'BuildCo LLC', amount: '$8,750.00', status: 'Released', date: '20/01/2026' },
    { client: 'Metro Manufacturing', amount: '$15,200.00', status: 'Disputed', date: '18/01/2026' },
    { client: 'Global Logistics Co.', amount: '$89,500.00', status: 'Released', date: '15/01/2026' },
    { client: 'Digital Marketing Pro', amount: '$67,800.00', status: 'In Escro', date: '10/01/2026' },
  ]);

  const payoutSchedule = [
    { month: 'Feb', amount: 18500 },
    { month: 'Mar', amount: 24000 },
    { month: 'Apr', amount: 15200 },
    { month: 'May', amount: 31000 },
    { month: 'Jun', amount: 28000 },
    { month: 'Jul', amount: 22500 },
  ];
  const maxPayout = Math.max(...payoutSchedule.map(p => p.amount));

  const flowDistribution = [
    { label: 'Initiated', count: 16, color: '#A3E635' },
    { label: 'In Escro', count: 8, color: '#22c55e' },
    { label: 'Released', count: 12, color: '#3b82f6' },
    { label: 'Disputed', count: 3, color: '#ef4444' },
  ];

  return (
    <div className=" min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Escro & Finance</h1>
        <p className="mt-1 text-sm text-slate-500">Track escrow balances, payouts, and financial flow</p>
      </div>

      {/* Top Finance Cards with Gradient Backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 lg:mb-8">
        <div className="relative overflow-hidden rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)' }}>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3 opacity-90">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Funds in Escro</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(23550.00)}</p>
            <p className="text-sm opacity-75 mt-1">Across 8 active transactions</p>
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
        </div>
        <div className="relative overflow-hidden rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3 opacity-90">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">Available Balance</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(21050.00)}</p>
            <p className="text-sm opacity-75 mt-1">Ready for withdrawal</p>
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
        </div>
        <div className="relative overflow-hidden rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)' }}>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3 opacity-90">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Pending Release</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(23250.00)}</p>
            <p className="text-sm opacity-75 mt-1">Awaiting milestone confirmation</p>
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
        </div>
      </div>

      {/* Money Flow + Payout Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
        {/* Money Flow Diagram */}
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Money Flow Diagram</h3>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-xs text-emerald-600 font-medium mb-1">From</p>
              <p className="text-sm font-semibold text-slate-900">Client Deposits</p>
              <p className="text-lg font-bold text-emerald-700 mt-1">$31,000</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ArrowRight className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] text-slate-400 font-medium uppercase">Escro</span>
            </div>
            <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100 text-center">
              <p className="text-xs text-blue-600 font-medium mb-1">Held</p>
              <p className="text-sm font-semibold text-slate-900">Escro Pool</p>
              <p className="text-lg font-bold text-blue-700 mt-1">$67,850</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ArrowRight className="w-5 h-5 text-blue-500" />
              <span className="text-[10px] text-slate-400 font-medium uppercase">Release</span>
            </div>
            <div className="flex-1 bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-right">
              <p className="text-xs text-emerald-600 font-medium mb-1">To</p>
              <p className="text-sm font-semibold text-slate-900">Merchant Payouts</p>
              <p className="text-lg font-bold text-emerald-700 mt-1">$52,000</p>
            </div>
          </div>
        </div>

        {/* Payout Schedule Bar Chart */}
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Payout Schedule</h3>
          <div className="flex items-end gap-3 h-44">
            {payoutSchedule.map((p, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-slate-500">${(p.amount / 1000).toFixed(1)}k</span>
                <div className="w-full flex justify-center">
                  <div
                    className="w-full max-w-[36px] bg-gradient-to-t from-[#A3E635] to-[#84cc16] rounded-t-lg"
                    style={{ height: `${(p.amount / maxPayout) * 120}px` }}
                  />
                </div>
                <span className="text-xs text-slate-500 font-medium">{p.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 lg:mb-8">
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm text-slate-500">Total Payout</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(52450.00)}</p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">+12.5% this month</p>
        </div>
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-slate-500">Total Amount</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(138450.00)}</p>
          <p className="text-xs text-blue-600 mt-1 font-medium">All time volume</p>
        </div>
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 rounded-lg">
              <TrendingDown className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-sm text-slate-500">Expected Growth</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">+8.4%</p>
          <p className="text-xs text-amber-600 mt-1 font-medium">Next quarter forecast</p>
        </div>
      </div>

      {/* Transaction Flow & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Transaction Flow & Distribution</h3>
          <div className="grid grid-cols-2 gap-4">
            {flowDistribution.map((item, i) => (
              <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: `${item.color}08`, borderColor: `${item.color}20` }}>
                <div className="flex items-center gap-2 mb-2">
                  <CircleDot className="w-4 h-4" style={{ color: item.color }} />
                  <span className="text-sm text-slate-600">{item.label}</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{item.count}</p>
                <p className="text-xs text-slate-400 mt-1">transactions</p>
              </div>
            ))}
          </div>
        </div>

        {/* Escrow Transactions by Client Table */}
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Escro Transactions by Client</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase">Client</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase">Amount</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase">Status</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-[#DDFC95]/10 transition-colors">
                    <td className="py-3 px-3 sm:px-4 lg:px-6 font-medium text-slate-900">{tx.client}</td>
                    <td className="py-3 px-3 sm:px-4 lg:px-6 font-medium text-slate-900">{tx.amount}</td>
                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        tx.status === 'In Escro' ? 'bg-green-100 text-green-800' :
                        tx.status === 'Released' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tx.status === 'In Escro' ? <ShieldCheck className="w-3 h-3" /> :
                         tx.status === 'Released' ? <CheckCircle className="w-3 h-3" /> :
                         <AlertTriangle className="w-3 h-3" />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                      <button onClick={() => alert('Viewing transaction for ' + tx.client)} className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
