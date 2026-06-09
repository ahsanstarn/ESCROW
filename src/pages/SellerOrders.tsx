import { useState, useEffect, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Package,
} from 'lucide-react';
import { Escrow, EscrowStatus } from '@/types';

interface SellerOrdersProps {
  userId?: string;
  userName?: string;
}

const STATUS_MAP: Record<string, { label: string; bg: string; icon: React.ReactNode }> = {
  RELEASED: { label: 'Completed', bg: 'bg-emerald-50 text-emerald-700', icon: <CheckCircle className="w-3 h-3" /> },
  DEPOSITED: { label: 'In Escrow', bg: 'bg-[#A3E635]/20 text-emerald-800', icon: <Clock className="w-3 h-3" /> },
  SHIPPED: { label: 'In Escrow', bg: 'bg-[#A3E635]/20 text-emerald-800', icon: <Clock className="w-3 h-3" /> },
  IN_TRANSIT: { label: 'In Delivery', bg: 'bg-[#A3E635]/20 text-emerald-800', icon: <Clock className="w-3 h-3" /> },
  DELIVERED: { label: 'Awaiting Confirmation', bg: 'bg-blue-50 text-blue-700', icon: <Package className="w-3 h-3" /> },
  CONFIRMED: { label: 'Completed', bg: 'bg-emerald-50 text-emerald-700', icon: <CheckCircle className="w-3 h-3" /> },
  DISPUTED: { label: 'Disputed', bg: 'bg-red-50 text-red-700', icon: <XCircle className="w-3 h-3" /> },
  CREATED: { label: 'Payment Pending', bg: 'bg-amber-50 text-amber-700', icon: <Clock className="w-3 h-3" /> },
  REFUNDED: { label: 'Refunded', bg: 'bg-amber-50 text-amber-700', icon: <AlertTriangle className="w-3 h-3" /> },
  CANCELLED: { label: 'Cancelled', bg: 'bg-slate-100 text-slate-500', icon: <XCircle className="w-3 h-3" /> },
};

function getDisplayStatus(status: EscrowStatus) {
  return STATUS_MAP[status] || { label: status, bg: 'bg-slate-100 text-slate-700', icon: null };
}

const TABS = ['All Orders', 'Payment Pending', 'In Escrow', 'In Delivery', 'Awaiting Confirmation', 'Completed', 'Disputed'];
const ITEMS_PER_PAGE = 8;

export default function SellerOrders({ userId, userName }: SellerOrdersProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!userId) return;
    api.escrows.list({ merchantId: userId })
      .then(res => setEscrows(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Orders': escrows.length };
    TABS.forEach(tab => {
      if (tab === 'All Orders') return;
      counts[tab] = escrows.filter(e => {
        const ds = getDisplayStatus(e.status).label;
        return ds === tab;
      }).length;
    });
    return counts;
  }, [escrows]);

  const filtered = useMemo(() => {
    if (activeTab === 'All Orders') return escrows;
    return escrows.filter(e => getDisplayStatus(e.status).label === activeTab);
  }, [escrows, activeTab]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
            <p className="mt-1 text-sm text-slate-500">Track and manage all your orders and escrow transactions</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#A3E635] text-black'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab} ({tabCounts[tab] || 0})
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {paginated.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">No orders found</h3>
              <p className="text-sm text-slate-500">Orders will appear here once you have escrow transactions.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#A3E635]">
                      <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Order ID</th>
                      <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Buyer</th>
                      <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Type</th>
                      <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Amount</th>
                      <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Escrow Status</th>
                      <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Timer</th>
                      <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Action</th>
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
                        <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-900">{order.escrowCode}</td>
                          <td className="py-3 px-4 text-slate-700">{order.buyer?.name || 'N/A'}</td>
                          <td className="py-3 px-4 text-slate-700">{order.productType}</td>
                          <td className="py-3 px-4 font-medium text-slate-900">{formatCurrency(order.amount)}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${ds.bg}`}>
                              {ds.icon} {ds.label}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-700">{timer}</td>
                          <td className="py-3 px-4">
                            <button className="text-sm font-medium text-[#A3E635] hover:text-[#95d630] transition-colors">
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page ? 'bg-[#A3E635] text-black' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
