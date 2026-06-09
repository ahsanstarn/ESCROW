import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Eye } from 'lucide-react';
import { Escrow } from '@/types';

interface SellerOrdersProps {
  userId?: string;
  userName?: string;
}

const TABS = ['All', 'Pending', 'Completed', 'Active'];

export default function SellerOrders({ userId, userName }: SellerOrdersProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    if (!userId) return;
    api.escrows.list({ merchantId: userId })
      .then(res => setEscrows(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const getDisplayStatus = (status: string) => {
    const map: Record<string, string> = {
      CREATED: 'Pending', DEPOSITED: 'Active', SHIPPED: 'Active', IN_TRANSIT: 'Active',
      DELIVERED: 'Active', CONFIRMED: 'Completed', RELEASED: 'Completed',
      DISPUTED: 'Pending', REFUNDED: 'Completed', CANCELLED: 'Completed',
    };
    return map[status] || 'Pending';
  };

  const filtered = useMemo(() => {
    if (activeTab === 'All') return escrows;
    return escrows.filter(e => getDisplayStatus(e.status) === activeTab);
  }, [escrows, activeTab]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { All: escrows.length };
    TABS.forEach(tab => {
      if (tab === 'All') return;
      counts[tab] = escrows.filter(e => getDisplayStatus(e.status) === tab).length;
    });
    return counts;
  }, [escrows]);

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading transactions..." />;
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Transactions</h1>
          <Link to="/seller" className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
            + New transaction
          </Link>
        </div>

        <div className="flex gap-6 mb-6 border-b border-slate-200">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
              {tabCounts[tab] !== undefined && tab !== 'All' && (
                <span className="ml-1 text-xs text-slate-400">({tabCounts[tab]})</span>
              )}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A3E635]" />}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No transactions found for this filter.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f0f5f0]">
                    <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Transaction</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(order => (
                    <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 font-medium text-slate-900">{order.description || order.escrowCode}</td>
                      <td className="py-4 px-5 text-slate-500">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="py-4 px-5 font-semibold text-slate-900">{formatCurrency(order.amount)}</td>
                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          getDisplayStatus(order.status) === 'Completed' ? 'text-emerald-600' :
                          getDisplayStatus(order.status) === 'Active' ? 'text-blue-600' : 'text-amber-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            getDisplayStatus(order.status) === 'Completed' ? 'bg-emerald-500' :
                            getDisplayStatus(order.status) === 'Active' ? 'bg-blue-500' : 'bg-amber-500'
                          }`} />
                          {getDisplayStatus(order.status)}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <Link to={`/escrow/${order.id}`} className="p-1.5 hover:bg-slate-100 rounded-lg inline-flex transition-colors">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
