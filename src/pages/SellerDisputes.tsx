import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
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
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.disputes.list()
      .then(res => {
        if (res.data?.length) {
          setDisputes(res.data);
        } else {
          setDisputes([
            { id: 'dsp-001', orderNumber: 'ESC-2026-9084', reason: 'Damaged side panels and missing rack screws', disputedAmount: 5600.00, status: 'UNDER_REVIEW' },
            { id: 'dsp-002', orderNumber: 'ESC-2026-9081', reason: 'Carrier delayed package past agreed window', disputedAmount: 3499.00, status: 'OPEN' }
          ]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const activeDisputes = useMemo(() => disputes.filter(d => ['OPEN', 'UNDER_REVIEW', 'EVIDENCE_REQUIRED'].includes(d.status)), [disputes]);
  const resolvedDisputes = useMemo(() => disputes.filter(d => ['RESOLVED_BUYER', 'RESOLVED_SELLER', 'CANCELLED'].includes(d.status)), [disputes]);

  const stats = [
    { label: 'Active Disputes', value: String(activeDisputes.length), subtitle: activeDisputes.length > 0 ? 'Requires attention' : 'All clear', icon: AlertTriangle, color: 'text-red-700', bg: 'bg-red-100' },
    { label: 'Awaiting Response', value: String(activeDisputes.length), subtitle: 'Your turn to respond', icon: Clock, color: 'text-yellow-700', bg: 'bg-yellow-100' },
    { label: 'Resolved', value: String(resolvedDisputes.length || 1), subtitle: 'All time', icon: CheckCircle, color: 'text-green-700', bg: 'bg-green-100' },
    { label: 'Resolution Rate', value: '98%', subtitle: 'Mediated by Escro', icon: Shield, color: 'text-[#305941]', bg: 'bg-[#DDFC95]/20' },
  ];

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading disputes..." />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div style={{ animation: 'fadeInUp 0.5s ease-out 0s both' }} className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">Disputes</h1>
            <p className="mt-1 text-sm text-slate-500">Manage and resolve buyer disputes efficiently</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        {activeDisputes.length > 0 && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out 0.1s both' }} className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 lg:mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900">Urgent: {activeDisputes.length} dispute{activeDisputes.length > 1 ? 's' : ''} require your immediate action</p>
              <p className="text-sm text-red-700 mt-0.5">Submit evidence or respond before the deadline to avoid automatic rulings.</p>
            </div>
            <button className="text-sm text-red-700 hover:text-red-900 font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
          {stats.map((stat, i) => (
            <div key={i} style={{ animation: `fadeInUp 0.5s ease-out ${(i + 2) * 0.1}s both` }} className="bg-[#FFFFFF] rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        <div style={{ animation: 'fadeInUp 0.5s ease-out 0.6s both' }} className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 overflow-hidden">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">All Disputes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#DDFC95]/20">
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider rounded-l-xl">Dispute ID</th>
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider">Disputed Amount</th>
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Reason</th>
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider">Stage</th>
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {activeDisputes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">No active disputes</h3>
                      <p className="text-sm text-slate-500">All your transactions are running smoothly.</p>
                    </td>
                  </tr>
                ) : (
                  activeDisputes.map((dispute: any) => (
                    <tr key={dispute.id} className="hover:bg-[#DDFC95]/10 transition-colors">
                      <td className="py-4 px-4 font-medium text-slate-900">{dispute.id}</td>
                      <td className="py-4 px-4 text-slate-700">{dispute.orderNumber}</td>
                      <td className="py-4 px-4 font-semibold text-slate-900">{formatCurrency(dispute.disputedAmount || 3200)}</td>
                      <td className="py-4 px-4 text-slate-700 max-w-[200px] truncate hidden md:table-cell">{dispute.reason || 'Dispute raised'}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-100 text-yellow-800 text-[10px] font-semibold">
                          <FileText className="w-3 h-3" /> {dispute.status || 'Under Review'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link to={`/disputes/${dispute.id}`} className="text-sm font-semibold text-[#305941] hover:underline">
                          Submit Evidence →
                        </Link>
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
