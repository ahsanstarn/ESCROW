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
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-600'}`}>
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
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Overview</h1>
            <p className="mt-1 text-sm text-slate-500">Track all your transactions and manage disputes</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-[#A3E635]">{formatCurrency(totalSpent)}</p>
            <Link to="/buyer/transactions" className="text-sm text-blue-600 hover:text-blue-700 mt-3 inline-block">View Transactions →</Link>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">In Escrow</p>
            <p className="text-3xl font-bold text-[#A3E635]">{formatCurrency(inEscrowAmount)}</p>
            <Link to="/buyer/transactions" className="text-sm text-blue-600 hover:text-blue-700 mt-3 inline-block">View Transactions →</Link>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">In Disputes</p>
            <p className="text-3xl font-bold text-red-500">{formatCurrency(inDisputeAmount)}</p>
            <span className="text-sm text-slate-400 mt-3 inline-block">{inDisputes.length} active dispute{inDisputes.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Ongoing Transactions</h2>
            <Link to="/buyer/transactions" className="px-4 py-2 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f0f5f0]">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Seller</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {escrows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">No transactions yet. Create your first escrow!</td>
                  </tr>
                ) : (
                  escrows.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-900">{order.escrowCode}</td>
                      <td className="py-4 px-6 text-slate-700">{order.merchant?.name || 'N/A'}</td>
                      <td className="py-4 px-6 font-semibold text-slate-900">{formatCurrency(order.amount)}</td>
                      <td className="py-4 px-6"><StatusBadge status={order.status} /></td>
                      <td className="py-4 px-6">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">View</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {inDisputes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
            <h2 className="font-bold text-slate-900 mb-4">Recent Actions</h2>
            {inDisputes.slice(0, 1).map(d => (
              <div key={d.id} className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-900">Dispute Raised — {d.escrowCode}</p>
                  <p className="text-sm text-blue-600 mt-1 cursor-pointer hover:underline">Resolve Dispute →</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            You will receive a 5% cashback for every confirmed transaction and will receive refunds within 72 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
