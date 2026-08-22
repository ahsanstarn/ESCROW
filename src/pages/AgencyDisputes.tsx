import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, ShieldAlert, ShieldCheck, AlertOctagon, Eye, BarChart3 } from 'lucide-react';

export default function AgencyDisputes() {
  const stats = [
    { label: 'Active Disputes', value: 6, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Resolved', value: 12, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg Resolution Time', value: '4.2 days', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Resolution Rate', value: '96.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const disputeTrend = [
    { month: 'Jan', value: 8 },
    { month: 'Feb', value: 12 },
    { month: 'Mar', value: 6 },
    { month: 'Apr', value: 10 },
    { month: 'May', value: 4 },
    { month: 'Jun', value: 6 },
  ];
  const maxTrend = Math.max(...disputeTrend.map(d => d.value));

  const disputeFrequency = [
    { client: 'Tech Solutions Inc.', count: 8, max: 12 },
    { client: 'Global Logistics Co.', count: 6, max: 12 },
    { client: 'Metro Manufacturing', count: 5, max: 12 },
    { client: 'BuildCo LLC', count: 3, max: 12 },
    { client: 'Digital Marketing Pro', count: 2, max: 12 },
  ];

  const riskAlerts = [
    {
      title: 'High-Value Transaction Alert',
      description: 'Transaction ORD-2026-0132 ($52,000) flagged for manual review due to unusual velocity.',
      severity: 'high',
      time: '2 hours ago',
    },
    {
      title: 'Delayed Release Warning',
      description: '3 transactions from Enterprise Services Ltd. are approaching 7-day hold limit without buyer confirmation.',
      severity: 'medium',
      time: '5 hours ago',
    },
  ];

  const activeDisputes = [
    { id: 'DSP-2026-0042', orderId: 'ORD-2026-0115', client: 'Metro Manufacturing', amount: '$15,200.00', priority: 'High', opened: '13/01/2026' },
    { id: 'DSP-2026-0038', orderId: 'ORD-2026-0105', client: 'Tech Solutions Inc.', amount: '$3,450.00', priority: 'Medium', opened: '11/01/2026' },
    { id: 'DSP-2026-0035', orderId: 'ORD-2026-0098', client: 'BuildCo LLC', amount: '$8,200.00', priority: 'Low', opened: '09/01/2026' },
    { id: 'DSP-2026-0031', orderId: 'ORD-2026-0089', client: 'Global Logistics Co.', amount: '$22,100.00', priority: 'High', opened: '07/01/2026' },
    { id: 'DSP-2026-0028', orderId: 'ORD-2026-0081', client: 'Digital Marketing Pro', amount: '$1,850.00', priority: 'Medium', opened: '05/01/2026' },
    { id: 'DSP-2026-0024', orderId: 'ORD-2026-0075', client: 'Enterprise Services Ltd.', amount: '$12,400.00', priority: 'Low', opened: '03/01/2026' },
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertOctagon className="w-5 h-5 text-red-500" />;
      case 'medium': return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      default: return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className=" min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Disputes & Risk</h1>
        <p className="mt-1 text-sm text-slate-500">Monitor disputes, resolution metrics, and risk alerts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 ${stat.bg} rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
        {/* Dispute Trend Over Time */}
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Dispute Trend Over Time</h3>
          <div className="relative h-48">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="disputeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points="0,87.5 16.6,81.25 33.3,93.75 50,85.42 66.6,97.92 83.3,93.75 100,93.75 100,100 0,100" fill="url(#disputeGradient)" />
              <polyline points="0,87.5 16.6,81.25 33.3,93.75 50,85.42 66.6,97.92 83.3,93.75 100,93.75" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="0" cy="87.5" r="1.5" fill="#ef4444" />
              <circle cx="16.6" cy="81.25" r="1.5" fill="#ef4444" />
              <circle cx="33.3" cy="93.75" r="1.5" fill="#ef4444" />
              <circle cx="50" cy="85.42" r="1.5" fill="#ef4444" />
              <circle cx="66.6" cy="97.92" r="1.5" fill="#ef4444" />
              <circle cx="83.3" cy="93.75" r="1.5" fill="#ef4444" />
              <circle cx="100" cy="93.75" r="1.5" fill="#ef4444" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400 px-2">
              {disputeTrend.map((d, i) => <span key={i}>{d.month}</span>)}
            </div>
          </div>
        </div>

        {/* Dispute Frequency by Client */}
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Dispute Frequency by Client</h3>
          <div className="space-y-4">
            {disputeFrequency.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-600">{item.client}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.count}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-red-400 to-red-500 h-2.5 rounded-full transition-all"
                    style={{ width: `${(item.count / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Score + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 lg:mb-8">
        {/* Risk Score Scale */}
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Risk Score Scale</h3>
          <div className="relative pt-2 pb-6">
            <div className="w-full h-3 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500" />
            <div className="absolute top-5 left-0 -translate-x-1/2 text-center" style={{ left: '15%' }}>
              <div className="w-0.5 h-3 bg-slate-300 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 font-medium">Low</span>
            </div>
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center">
              <div className="w-0.5 h-3 bg-slate-300 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 font-medium">Medium</span>
            </div>
            <div className="absolute top-5 right-0 -translate-x-1/2 text-center" style={{ right: '-7.5%' }}>
              <div className="w-0.5 h-3 bg-slate-300 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 font-medium">High</span>
            </div>
            <div className="absolute top-0 left-0 w-4 h-4 bg-white border-2 border-slate-900 rounded-full -mt-0.5 shadow-md" style={{ left: '32%' }} />
          </div>
          <div className="mt-6 flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <div>
              <p className="text-xs text-emerald-600 font-medium">Current Agency Risk</p>
              <p className="text-lg font-bold text-slate-900">Low (32/100)</p>
            </div>
            <BarChart3 className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="lg:col-span-2 space-y-4">
          {riskAlerts.map((alert, i) => (
            <div key={i} className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-5 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${alert.severity === 'high' ? 'bg-red-50' : 'bg-amber-50'}`}>
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-slate-900">{alert.title}</h4>
                  <span className="text-xs text-slate-400">{alert.time}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Disputes Table */}
      <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Active Disputes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Dispute ID</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider hidden md:table-cell">Order ID</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Client</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Priority</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider hidden md:table-cell">Opened</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeDisputes.map((d, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-[#DDFC95]/10 transition-colors">
                  <td className="py-3 px-3 sm:px-4 lg:px-6 font-medium text-slate-900">{d.id}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 text-slate-600 hidden md:table-cell">{d.orderId}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 text-slate-600">{d.client}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 font-medium text-slate-900">{d.amount}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityStyle(d.priority)}`}>
                      {d.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 text-slate-500 hidden md:table-cell">{d.opened}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6">
                    <button onClick={() => alert('Viewing dispute ' + d.id)} className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
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
  );
}
