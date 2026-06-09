import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import { AlertTriangle } from 'lucide-react';
import { Escrow } from '@/types';

interface BuyerOverviewProps {
  userId?: string;
  userName?: string;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    DEPOSITED: 'bg-[#A3E635]/20 text-black',
    SHIPPED: 'bg-[#A3E635]/20 text-black',
    IN_TRANSIT: 'bg-[#A3E635]/20 text-black',
    CONFIRMED: 'bg-emerald-100 text-emerald-700',
    RELEASED: 'bg-emerald-100 text-emerald-700',
    DISPUTED: 'bg-red-100 text-red-600',
    CREATED: 'bg-amber-100 text-amber-700',
    DELIVERED: 'bg-blue-100 text-blue-700',
    REFUNDED: 'bg-amber-100 text-amber-700',
    CANCELLED: 'bg-slate-100 text-slate-600',
  };
  const labelMap: Record<string, string> = {
    DEPOSITED: 'Funds Held',
    SHIPPED: 'Shipped',
    IN_TRANSIT: 'In Transit',
    CONFIRMED: 'Confirmed',
    RELEASED: 'Released',
    DISPUTED: 'Dispute',
    CREATED: 'Pending',
    DELIVERED: 'Delivered',
    REFUNDED: 'Refunded',
    CANCELLED: 'Cancelled',
  };
  return (
    <span className={`inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-600'}`}>
      {labelMap[status] || status}
    </span>
  );
}

export default function BuyerOverview({ userId, userName }: BuyerOverviewProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    api.escrows.list({ buyerId: userId })
      .then(res => setEscrows(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const totalSpent = useMemo(() => escrows.reduce((s, e) => s + e.amount, 0), [escrows]);
  const inEscrow = useMemo(() => escrows.filter(e => ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'].includes(e.status)), [escrows]);
  const inDisputes = useMemo(() => escrows.filter(e => e.status === 'DISPUTED'), [escrows]);
  const inEscrowAmount = useMemo(() => inEscrow.reduce((s, e) => s + e.amount, 0), [inEscrow]);
  const inDisputeAmount = useMemo(() => inDisputes.reduce((s, e) => s + e.amount, 0), [inDisputes]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 md:gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">Overview</h1>
            <p className="mt-1 text-xs md:text-sm text-slate-500">Track all your transactions and manage disputes</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100">
            <p className="text-xs md:text-sm text-slate-500 mb-1.5 md:mb-2">Total Spent</p>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#A3E635]">{formatCurrency(totalSpent)}</p>
            <Link to="/buyer/transactions" className="text-xs md:text-sm text-blue-600 hover:text-blue-700 mt-2 md:mt-3 inline-block">View Transactions →</Link>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100">
            <p className="text-xs md:text-sm text-slate-500 mb-1.5 md:mb-2">In Escrow</p>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#A3E635]">{formatCurrency(inEscrowAmount)}</p>
            <Link to="/buyer/transactions" className="text-xs md:text-sm text-blue-600 hover:text-blue-700 mt-2 md:mt-3 inline-block">View Transactions →</Link>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 sm:col-span-2 md:col-span-1">
            <p className="text-xs md:text-sm text-slate-500 mb-1.5 md:mb-2">In Disputes</p>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-red-500">{formatCurrency(inDisputeAmount)}</p>
            <span className="text-xs md:text-sm text-slate-400 mt-2 md:mt-3 inline-block">{inDisputes.length} active dispute{inDisputes.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6 md:mb-8">
          <div className="px-4 md:px-6 py-3 md:py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm md:font-bold font-semibold text-slate-900">Ongoing Transactions</h2>
            <Link to="/buyer/transactions" className="px-3 md:px-4 py-1.5 md:py-2 bg-[#A3E635] text-black font-semibold text-xs md:text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="bg-[#f0f5f0]">
                  <th className="text-left py-2.5 md:py-3 px-3 md:px-6 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-2.5 md:py-3 px-3 md:px-6 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Seller</th>
                  <th className="text-left py-2.5 md:py-3 px-3 md:px-6 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-2.5 md:py-3 px-3 md:px-6 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-2.5 md:py-3 px-3 md:px-6 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {escrows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 md:py-8 text-center text-slate-500">No transactions yet. Create your first escrow!</td>
                  </tr>
                ) : (
                  escrows.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 md:py-4 px-3 md:px-6 font-medium text-slate-900">{order.escrowCode}</td>
                      <td className="py-3 md:py-4 px-3 md:px-6 text-slate-700 hidden sm:table-cell">{order.merchant?.name || 'N/A'}</td>
                      <td className="py-3 md:py-4 px-3 md:px-6 font-semibold text-slate-900">{formatCurrency(order.amount)}</td>
                      <td className="py-3 md:py-4 px-3 md:px-6"><StatusBadge status={order.status} /></td>
                      <td className="py-3 md:py-4 px-3 md:px-6">
                        <Link to={`/escrow/${order.id}`} className="text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">View</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {inDisputes.length > 0 && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-sm md:font-bold font-semibold text-slate-900 mb-3 md:mb-4">Recent Actions</h2>
            {inDisputes.slice(0, 1).map(d => (
              <div key={d.id} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs md:text-sm text-slate-900">Dispute Raised — {d.escrowCode}</p>
                  <p className="text-xs md:text-sm text-blue-600 mt-1 cursor-pointer hover:underline">Resolve Dispute →</p>
                </div>
                <span className="text-[10px] md:text-xs text-slate-400 whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            You will receive a 5% cashback for every confirmed transaction and will receive refunds within 72 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
