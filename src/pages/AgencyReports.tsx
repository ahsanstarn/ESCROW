import { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Shield, Download, FileText, FileSpreadsheet, FileBarChart, BarChart3 } from 'lucide-react';

export default function AgencyReports() {
  const stats = [
    { label: 'Conversion Uplift', value: '+31%', icon: TrendingUp, trend: 'up', sub: 'vs last month' },
    { label: 'Chargeback Rate', value: '-67%', icon: TrendingDown, trend: 'down', sub: 'Monthly rate' },
    { label: 'Escro Duration', value: '3.2 days', icon: Clock, trend: 'neutral', sub: 'Average hold time' },
    { label: 'Trust Score', value: '94/100', icon: Shield, trend: 'up', sub: 'Overall rating' },
  ];

  const conversionData = [
    { month: 'Feb', withEscrow: 30, withoutEscrow: 18 },
    { month: 'Mar', withEscrow: 50, withoutEscrow: 32 },
    { month: 'Apr', withEscrow: 35, withoutEscrow: 22 },
    { month: 'May', withEscrow: 55, withoutEscrow: 38 },
    { month: 'Jun', withEscrow: 70, withoutEscrow: 45 },
    { month: 'Jul', withEscrow: 55, withoutEscrow: 40 },
  ];
  const maxConversion = Math.max(...conversionData.map(d => Math.max(d.withEscrow, d.withoutEscrow)));

  const chargebackData = [
    { month: 'Feb', value: 80 },
    { month: 'Mar', value: 60 },
    { month: 'Apr', value: 75 },
    { month: 'May', value: 45 },
    { month: 'Jun', value: 35 },
    { month: 'Jul', value: 25 },
  ];
  const maxChargeback = Math.max(...chargebackData.map(d => d.value));

  const escrowDuration = [
    { category: 'Same-Day', value: 340, max: 892 },
    { category: '1-2 Days', value: 460, max: 892 },
    { category: '3-5 Days', value: 892, max: 892 },
    { category: '5-7 Days', value: 507, max: 892 },
    { category: '7+ Days', value: 150, max: 892 },
  ];

  return (
    <div className=" min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">Analytics, performance metrics, and exportable reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-5 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <stat.icon className={`w-5 h-5 ${stat.trend === 'up' ? 'text-emerald-600' : stat.trend === 'down' ? 'text-red-500' : 'text-blue-600'}`} />
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : stat.trend === 'down' ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-600'}`}>
                {stat.sub}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Export Reports */}
      <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100 mb-6 lg:mb-8">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Export Reports</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => alert('CSV export started. Your download will begin shortly.')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors text-sm">
            <FileText className="w-4 h-4" /> CSV Export
          </button>
          <button onClick={() => alert('PDF report generation started. It will be ready for download in a moment.')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors text-sm">
            <FileBarChart className="w-4 h-4" /> PDF Report
          </button>
          <button onClick={() => alert('Excel report generation started. Your download will begin shortly.')} className="inline-flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 hover:bg-[#84cc16] text-black font-semibold rounded-xl transition-colors text-sm">
            <FileSpreadsheet className="w-4 h-4" /> Excel Report
          </button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
        {/* Conversion Uplift via Escro */}
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Conversion Uplift via Escro</h3>
          <div className="flex items-end gap-3 h-52">
            {conversionData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex justify-center gap-1">
                  <div
                    className="w-full max-w-[18px] bg-gradient-to-t from-[#A3E635] to-[#84cc16] rounded-t-md"
                    style={{ height: `${(d.withEscrow / maxConversion) * 160}px` }}
                    title={`With Escro: ${d.withEscrow}%`}
                  />
                  <div
                    className="w-full max-w-[18px] bg-gradient-to-t from-slate-300 to-slate-200 rounded-t-md"
                    style={{ height: `${(d.withoutEscrow / maxConversion) * 160}px` }}
                    title={`Without Escro: ${d.withoutEscrow}%`}
                  />
                </div>
                <span className="text-xs text-slate-500 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-[#A3E635] to-[#84cc16]" />
              <span className="text-xs text-slate-500">With Escro</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-slate-300 to-slate-200" />
              <span className="text-xs text-slate-500">Without Escro</span>
            </div>
          </div>
        </div>

        {/* Chargeback Reduction Trend */}
        <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Chargeback Reduction Trend</h3>
          <div className="flex items-end gap-3 h-52">
            {chargebackData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-slate-500">{d.value}%</span>
                <div className="w-full flex justify-center">
                  <div
                    className="w-full max-w-[36px] bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg"
                    style={{ height: `${(d.value / maxChargeback) * 160}px` }}
                  />
                </div>
                <span className="text-xs text-slate-500 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Average Escro Duration by Category */}
      <div className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100 mb-6 lg:mb-8">
        <h3 className="text-sm font-semibold text-slate-900 mb-6">Average Escro Duration by Category</h3>
        <div className="space-y-5">
          {escrowDuration.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">{item.category}</span>
                <span className="text-sm font-semibold text-slate-900">{item.value} transactions</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-[#A3E635] to-[#84cc16] h-3 rounded-full transition-all"
                  style={{ width: `${(item.value / item.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
