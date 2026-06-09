import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Escrow } from '@/types';

interface BuyerTransactionsProps {
  userId?: string;
  userName?: string;
}

const TABS = ['All Orders', 'Payment Pending', 'In Escrow', 'In Delivery', 'Awaiting Confirmation', 'Completed', 'Disputed'];
const ITEMS_PER_PAGE = 8;

function getDisplayStatus(status: string) {
  const map: Record<string, { label: string; bg: string }> = {
    CREATED: { label: 'Payment Pending', bg: 'bg-amber-100 text-amber-700' },
    DEPOSITED: { label: 'In Escrow', bg: 'bg-[#A3E635]/20 text-black' },
    SHIPPED: { label: 'In Escrow', bg: 'bg-[#A3E635]/20 text-black' },
    IN_TRANSIT: { label: 'In Delivery', bg: 'bg-blue-100 text-blue-700' },
    DELIVERED: { label: 'Awaiting Confirmation', bg: 'bg-blue-100 text-blue-700' },
    CONFIRMED: { label: 'Completed', bg: 'bg-emerald-100 text-emerald-700' },
    RELEASED: { label: 'Completed', bg: 'bg-emerald-100 text-emerald-700' },
    DISPUTED: { label: 'Disputed', bg: 'bg-red-100 text-red-600' },
    REFUNDED: { label: 'Refunded', bg: 'bg-amber-100 text-amber-700' },
    CANCELLED: { label: 'Cancelled', bg: 'bg-slate-100 text-slate-600' },
  };
  return map[status] || { label: status, bg: 'bg-slate-100 text-slate-600' };
}

export default function BuyerTransactions({ userId, userName }: BuyerTransactionsProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!userId) return;
    api.escrows.list({ buyerId: userId })
      .then(res => setEscrows(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Orders': escrows.length };
    TABS.forEach(tab => {
      if (tab === 'All Orders') return;
      counts[tab] = escrows.filter(e => getDisplayStatus(e.status).label === tab).length;
    });
    return counts;
  }, [escrows]);

  const filtered = useMemo(() => {
    if (activeTab === 'All Orders') return escrows;
    return escrows.filter(e => getDisplayStatus(e.status).label === activeTab);
  }, [escrows, activeTab]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Transactions</h1>
            <p className="mt-1 text-sm text-slate-500">View and manage all your transactions</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-[#A3E635] text-black shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab} ({tabCounts[tab] || 0})
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {paginated.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No transactions found for this filter.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#A3E635]">
                      <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-black uppercase tracking-wider">Order ID</th>
                      <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-black uppercase tracking-wider">Seller</th>
                      <th className="hidden md:table-cell text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-black uppercase tracking-wider">Type</th>
                      <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-black uppercase tracking-wider">Amount</th>
                      <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-black uppercase tracking-wider">Status</th>
                      <th className="hidden md:table-cell text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-black uppercase tracking-wider">Timer</th>
                      <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-black uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map(order => {
                      const ds = getDisplayStatus(order.status);
                      const timer = order.status === 'DELIVERED'
                        ? `${order.confirmationWindowHours}h window`
                        : order.status === 'IN_TRANSIT'
                        ? 'In transit'
                        : order.status === 'RELEASED'
                        ? 'Released'
                        : 'Pending';
                      return (
                        <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-3 sm:px-4 lg:px-6 font-medium text-slate-900">{order.escrowCode}</td>
                          <td className="py-4 px-3 sm:px-4 lg:px-6 text-slate-700">{order.merchant?.name || 'N/A'}</td>
                          <td className="hidden md:table-cell py-4 px-3 sm:px-4 lg:px-6 text-slate-600">{order.productType}</td>
                          <td className="py-4 px-3 sm:px-4 lg:px-6 font-semibold text-slate-900">{formatCurrency(order.amount)}</td>
                          <td className="py-4 px-3 sm:px-4 lg:px-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${ds.bg}`}>{ds.label}</span>
                          </td>
                          <td className="hidden md:table-cell py-4 px-3 sm:px-4 lg:px-6 text-slate-500">{timer}</td>
                          <td className="py-4 px-3 sm:px-4 lg:px-6">
                            <Link to={`/escrow/${order.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">View</Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-4 lg:px-6 py-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500">Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40">
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-semibold ${page === p ? 'bg-[#A3E635] text-black' : 'text-slate-600 hover:bg-slate-50'}`}>{p}</button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40">
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
