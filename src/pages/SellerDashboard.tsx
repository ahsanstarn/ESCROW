import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Eye, X } from 'lucide-react';
import { Escrow, User } from '@/types';

interface SellerDashboardProps {
  userId?: string;
  userName?: string;
}

export default function SellerDashboard({ userId, userName }: SellerDashboardProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [buyers, setBuyers] = useState<User[]>([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ buyerId: '', amount: '', description: '', productType: 'DIGITAL' as 'DIGITAL' | 'PHYSICAL' });

  useEffect(() => {
    if (!userId) return;
    Promise.all([
      api.escrows.list({ merchantId: userId }),
      api.users.list('BUYER'),
    ]).then(([escrowRes, buyerRes]) => {
      setEscrows(escrowRes.data || []);
      setBuyers(buyerRes.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [userId]);

  const thisMonth = useMemo(() => {
    const now = new Date();
    return escrows.filter(e => {
      const d = new Date(e.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  }, [escrows]);

  const totalReceived = useMemo(() => escrows.reduce((s, e) => s + e.amount, 0), [escrows]);
  const recentEscrows = useMemo(() => [...escrows].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5), [escrows]);

  const handleCreate = async () => {
    if (!form.buyerId || !form.amount || !userId) return;
    setCreating(true);
    try {
      await api.escrows.create({
        merchantId: userId,
        buyerId: form.buyerId,
        amount: parseFloat(form.amount),
        productType: form.productType,
        description: form.description,
      });
      const res = await api.escrows.list({ merchantId: userId });
      setEscrows(res.data || []);
      setShowCreateModal(false);
      setForm({ buyerId: '', amount: '', description: '', productType: 'DIGITAL' });
    } catch (err) {
      console.error('Failed to create escrow:', err);
    }
    setCreating(false);
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8">
          <div>
            <p className="text-sm text-slate-500 mb-1">Dashboard</p>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Welcome back, {userName?.split(' ')[0] || 'User'}</h1>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
            + New transaction
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 lg:mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">Transactions this month</p>
            <p className="text-2xl font-bold text-slate-900">{thisMonth.length}</p>
            <div className="mt-3 flex items-end gap-1 h-8">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="flex-1 bg-[#A3E635] rounded-sm" style={{ height: `${Math.max(20, (thisMonth.filter((_, j) => j <= i).length / Math.max(thisMonth.length, 1)) * 100)}%` }} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">Amount received</p>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalReceived)}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 sm:col-span-2 lg:col-span-1">
            <p className="text-sm text-slate-500 mb-1">Volume in USD</p>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalReceived)}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recent Transactions</h2>
            <Link to="/seller/transactions" className="text-sm text-slate-500 hover:text-slate-700">View all →</Link>
          </div>
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
                {recentEscrows.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-slate-500">No transactions yet. Create your first escrow!</td></tr>
                ) : (
                  recentEscrows.map(order => (
                    <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 font-medium text-slate-900">{order.description || order.escrowCode}</td>
                      <td className="py-4 px-5 text-slate-500">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="py-4 px-5 font-semibold text-slate-900">{formatCurrency(order.amount)}</td>
                      <td className="py-4 px-5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {order.status === 'RELEASED' || order.status === 'CONFIRMED' ? 'Completed' : order.status === 'DISPUTED' ? 'Disputed' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <Link to={`/escrow/${order.id}`} className="p-1.5 hover:bg-slate-100 rounded-lg inline-flex transition-colors">
                          <Eye className="w-4 h-4 text-slate-400" />
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

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">New Transaction</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Buyer</label>
                <select value={form.buyerId} onChange={e => setForm({ ...form, buyerId: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50">
                  <option value="">Choose a buyer</option>
                  {buyers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (USD)</label>
                <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0.00" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Type</label>
                <select value={form.productType} onChange={e => setForm({ ...form, productType: e.target.value as 'DIGITAL' | 'PHYSICAL' })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50">
                  <option value="DIGITAL">Digital Service</option>
                  <option value="PHYSICAL">Physical Product</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the transaction..." rows={3} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 resize-none" />
              </div>
              <button onClick={handleCreate} disabled={creating || !form.buyerId || !form.amount} className="w-full py-2.5 bg-[#A3E635] text-black font-semibold rounded-lg hover:bg-[#b8ed5a] transition-colors disabled:opacity-50">
                {creating ? 'Creating...' : 'Create Escrow'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
