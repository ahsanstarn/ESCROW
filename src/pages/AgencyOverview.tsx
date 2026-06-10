import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Package, DollarSign, Users, TrendingUp, Activity, Bell, CheckCircle, ArrowUpRight, Eye } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AgencyOverview() {
  const [notifications] = useState(3);

  const stats = [
    { label: 'Total Volume', value: formatCurrency(138450.00), icon: DollarSign, change: '+12.5%' },
    { label: 'Total Transactions', value: 16, icon: Package, change: '+4' },
    { label: 'Active Clients', value: 1, icon: Users, change: 'New' },
    { label: 'Revenue Share', value: formatCurrency(3461.25), icon: TrendingUp, change: '+8.2%' },
  ];

  const weeklyVolume = [
    { day: 'Mon', amount: 12500 },
    { day: 'Tue', amount: 14200 },
    { day: 'Wed', amount: 13800 },
    { day: 'Thu', amount: 15100 },
    { day: 'Fri', amount: 12300 },
    { day: 'Sat', amount: 11200 },
    { day: 'Sun', amount: 13450 },
  ];

  const maxVolume = Math.max(...weeklyVolume.map(d => d.amount));

  const transactions = [
    { id: 'ORD-2026-0124', client: 'Tech Solutions Inc.', amount: '$2,450.00', status: 'Funds Held', date: '24/01/2026' },
    { id: 'ORD-2026-0118', client: 'BuildCo LLC', amount: '$8,750.00', status: 'Released', date: '15/01/2026' },
    { id: 'ORD-2026-0115', client: 'Metro Manufacturing', amount: '$15,200.00', status: 'Disputed', date: '13/01/2026' },
    { id: 'ORD-2026-0108', client: 'Global Logistics Co.', amount: '$45,000.00', status: 'Funds Held', date: '10/01/2026' },
    { id: 'ORD-2026-0102', client: 'Digital Marketing Pro', amount: '$67,050.00', status: 'Released', date: '05/01/2026' },
  ];

  const escrowSegments = [
    { label: 'Funds Held', value: 13, color: '#A3E635' },
    { label: 'Released', value: 8, color: '#22c55e' },
    { label: 'Disputed', value: 2, color: '#ef4444' },
  ];
  const totalEscrow = escrowSegments.reduce((sum, s) => sum + s.value, 0);
  const donutGradient = escrowSegments.reduce((acc, seg, i) => {
    const prev = escrowSegments.slice(0, i).reduce((s, x) => s + x.value, 0);
    const pctStart = (prev / totalEscrow) * 100;
    const pctEnd = ((prev + seg.value) / totalEscrow) * 100;
    return `${acc}${seg.color} ${pctStart}% ${pctEnd}%, `;
  }, '').slice(0, -2);

  const activityPoints = [
    [0, 80], [16, 65], [32, 70], [48, 50], [64, 55], [80, 35], [100, 40]
  ];
  const polylinePoints = activityPoints.map(p => p.join(',')).join(' ');
  const areaPoints = `${polylinePoints} 100,100 0,100`;

  return (
    <div className="bg-[#f0f5f0] min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Agency Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor all client transactions and performance metrics</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" /> API Active
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
            <Activity className="w-3.5 h-3.5" /> 99.98% Uptime
          </span>
          <button className="relative p-2 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{notifications}</span>
            )}
          </button>
          <div className="w-9 h-9 rounded-full bg-[#A3E635] flex items-center justify-center text-xs font-semibold text-black">A</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <stat.icon className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 lg:mb-8">
        {/* Weekly Volume Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Weekly Transaction Volume</h3>
          <div className="flex items-end gap-3 h-48">
            {weeklyVolume.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-slate-500">${(d.amount / 1000).toFixed(1)}k</span>
                <div className="w-full flex justify-center">
                  <div
                    className="w-full max-w-[28px] bg-gradient-to-t from-[#A3E635] to-[#84cc16] rounded-t-lg"
                    style={{ height: `${(d.amount / maxVolume) * 140}px` }}
                  />
                </div>
                <span className="text-xs text-slate-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Activity Area Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Transaction Activity</h3>
          <div className="relative h-48">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A3E635" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#A3E635" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={areaPoints} fill="url(#areaGradient)" />
              <polyline points={polylinePoints} fill="none" stroke="#A3E635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {activityPoints.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r="1.5" fill="#A3E635" />
              ))}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400 px-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Escrow States Donut */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Escro States Distribution</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="relative w-32 h-32 flex-shrink-0">
              <div
                className="w-32 h-32 rounded-full"
                style={{ background: `conic-gradient(${donutGradient})` }}
              />
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-slate-900">{totalEscrow}</span>
              </div>
            </div>
            <div className="space-y-3">
              {escrowSegments.map((seg, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
                  <span className="text-sm text-slate-600">{seg.label}</span>
                  <span className="text-sm font-semibold text-slate-900 ml-auto">{seg.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#A3E635]">
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Order ID</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider hidden md:table-cell">Client</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 sm:px-4 lg:px-6 font-medium text-slate-900">{tx.id}</td>
                  <td className="py-3 px-6 text-slate-600 hidden md:table-cell">{tx.client}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 font-medium text-slate-900">{tx.amount}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'Funds Held' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      tx.status === 'Released' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 text-slate-500">{tx.date}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6">
                    <Link to={`/escrow/${tx.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                      <Eye className="w-3.5 h-3.5" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
