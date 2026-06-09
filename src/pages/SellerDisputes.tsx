import { useState, useEffect, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import {
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  ChevronRight,
  FileText,
  XCircle,
} from 'lucide-react';
import { Escrow } from '@/types';

interface SellerDisputesProps {
  userId?: string;
  userName?: string;
}

export default function SellerDisputes({ userId, userName }: SellerDisputesProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    api.escrows.list({ merchantId: userId })
      .then(res => setEscrows(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const disputedEscrows = useMemo(() => escrows.filter(e => e.status === 'DISPUTED'), [escrows]);
  const resolvedEscrows = useMemo(() => escrows.filter(e => e.status === 'RELEASED' || e.status === 'REFUNDED'), [escrows]);

  const stats = [
    { label: 'Active Disputes', value: String(disputedEscrows.length), subtitle: disputedEscrows.length > 0 ? 'Requires attention' : 'All clear', icon: AlertTriangle, color: 'text-red-500' },
    { label: 'Awaiting Response', value: String(disputedEscrows.length), subtitle: 'Your turn to respond', icon: Clock, color: 'text-amber-600' },
    { label: 'Resolved', value: String(resolvedEscrows.length), subtitle: 'All time', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Win Rate', value: escrows.length > 0 ? `${Math.round((resolvedEscrows.length / Math.max(escrows.length, 1)) * 100)}%` : '0%', subtitle: 'All time', icon: Shield, color: 'text-blue-600' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading disputes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Disputes</h1>
            <p className="mt-1 text-sm text-slate-500">Manage and resolve buyer disputes efficiently</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        {disputedEscrows.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900">Urgent: {disputedEscrows.length} dispute{disputedEscrows.length > 1 ? 's' : ''} require your immediate action</p>
              <p className="text-sm text-red-700 mt-0.5">Submit evidence or respond before the deadline to avoid automatic rulings.</p>
            </div>
            <button className="text-sm text-red-700 hover:text-red-900 font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

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
                {disputedEscrows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">No active disputes</h3>
                      <p className="text-sm text-slate-500">All your transactions are running smoothly.</p>
                    </td>
                  </tr>
                ) : (
                  disputedEscrows.map((escrow) => (
                    <tr key={escrow.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">DSP-{escrow.id.slice(0, 6)}</td>
                      <td className="py-3 px-4 text-slate-700">{escrow.escrowCode}</td>
                      <td className="py-3 px-4 text-slate-700">{escrow.buyer?.name || 'N/A'}</td>
                      <td className="py-3 px-4 text-slate-700 max-w-[200px] truncate">{escrow.description || 'Dispute raised'}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{formatCurrency(escrow.amount)}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                          <FileText className="w-3 h-3" /> Under Review
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-medium text-red-600">2d 14h</span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                          Submit Evidence
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
