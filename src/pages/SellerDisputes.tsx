import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Bell,
  User,
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  MessageSquare,
  FileText,
} from 'lucide-react';

const stats = [
  { label: 'Active Disputes', value: '2', subtitle: 'Requires attention', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'Awaiting Response', value: '1', subtitle: 'Your turn to respond', icon: Clock, color: 'text-amber-600' },
  { label: 'Resolved', value: '8', subtitle: 'This month', icon: CheckCircle, color: 'text-emerald-600' },
  { label: 'Win Rate', value: '72%', subtitle: 'All time', icon: Shield, color: 'text-blue-600' },
];

const disputes = [
  { id: 'DSP-001', orderId: 'ORD-2025-0113', buyer: 'TechCorp Ltd.', reason: 'Product quality does not match description', amount: 135200, stage: 'Evidence Review', timer: '2d 14h', action: 'Submit Evidence', urgent: true },
  { id: 'DSP-002', orderId: 'ORD-2025-0114', buyer: 'Sigma M.', reason: 'Item not received', amount: 50200, stage: 'Admin Review', timer: '5d 8h', action: 'View Details', urgent: false },
  { id: 'DSP-003', orderId: 'ORD-2025-0115', buyer: 'Michael B.', reason: 'Quality issue', amount: 24500, stage: 'Resolved', timer: 'Closed', action: 'View Resolution', urgent: false },
  { id: 'DSP-004', orderId: 'ORD-2025-0108', buyer: 'Nova Systems', reason: 'Late delivery', amount: 78000, stage: 'Evidence Review', timer: '1d 6h', action: 'Respond', urgent: true },
  { id: 'DSP-005', orderId: 'ORD-2025-0102', buyer: 'GlobalRetail', reason: 'Wrong item shipped', amount: 34000, stage: 'Resolved', timer: 'Closed', action: 'View Resolution', urgent: false },
];

function StageBadge({ stage }: { stage: string }) {
  if (stage === 'Evidence Review') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium"><FileText className="w-3 h-3" />{stage}</span>;
  }
  if (stage === 'Admin Review') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"><Shield className="w-3 h-3" />{stage}</span>;
  }
  if (stage === 'Resolved') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium"><CheckCircle className="w-3 h-3" />{stage}</span>;
  }
  return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">{stage}</span>;
}

export default function SellerDisputes() {
  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Disputes</h1>
            <p className="mt-1 text-sm text-slate-500">Manage and resolve buyer disputes efficiently</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2 shadow-sm border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center text-xs font-semibold text-black">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-900">Seller Account</p>
                <p className="text-[11px] text-slate-500">ID: acc_12345</p>
              </div>
            </div>
          </div>
        </div>

        {/* Urgent Alert */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">Urgent: 2 disputes require your immediate action</p>
            <p className="text-sm text-red-700 mt-0.5">Submit evidence or respond before the deadline to avoid automatic rulings.</p>
          </div>
          <button className="text-sm text-red-700 hover:text-red-900 font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* All Disputes Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">All Disputes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#A3E635]">
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Dispute ID</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Buyer</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Reason</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Stage</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Timer</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dispute, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">{dispute.id}</td>
                    <td className="py-3 px-4 text-slate-700">{dispute.orderId}</td>
                    <td className="py-3 px-4 text-slate-700">{dispute.buyer}</td>
                    <td className="py-3 px-4 text-slate-700 max-w-[200px] truncate">{dispute.reason}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{formatCurrency(dispute.amount)}</td>
                    <td className="py-3 px-4"><StageBadge stage={dispute.stage} /></td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium ${dispute.urgent ? 'text-red-600' : 'text-slate-600'}`}>
                        {dispute.timer}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className={`text-sm font-medium transition-colors ${
                        dispute.urgent ? 'text-red-600 hover:text-red-700' : 'text-[#A3E635] hover:text-[#95d630]'
                      }`}>
                        {dispute.action}
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
