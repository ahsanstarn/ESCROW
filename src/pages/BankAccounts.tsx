import { useState, useEffect } from 'react';
import { Eye, Trash2, X } from 'lucide-react';
import { api } from '@/lib/api';

interface BankAccountsProps {
  userId?: string;
  userName?: string;
  role?: 'buyer' | 'seller';
}

interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  currency: string;
}

export default function BankAccounts({ userId, userName, role = 'buyer' }: BankAccountsProps) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ bankName: '', accountNumber: '', currency: 'USD' });

  useEffect(() => {
    if (!userId) return;
    api.bankAccounts.list(userId)
      .then(res => setAccounts(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const handleAdd = async () => {
    if (!form.bankName || !form.accountNumber || !userId) return;
    setAdding(true);
    try {
      const res = await api.bankAccounts.create({
        userId,
        bankName: form.bankName,
        accountNumber: form.accountNumber,
        currency: form.currency,
      });
      setAccounts(prev => [...prev, res.data]);
      setShowAddModal(false);
      setForm({ bankName: '', accountNumber: '', currency: 'USD' });
    } catch (err) {
      console.error('Failed to add bank account:', err);
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.bankAccounts.delete(id);
      setAccounts(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Failed to delete bank account:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900">Bank Accounts</h1>
            <p className="mt-1 text-sm text-slate-500">Add and manage your bank accounts for receiving payments.</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
            + Add Bank Account
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center"><div className="w-6 h-6 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f0f5f0]">
                    <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Bank Name</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Account Number</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Currency</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.length === 0 ? (
                    <tr><td colSpan={4} className="py-8 text-center text-slate-500">No bank accounts yet. Add one to get started.</td></tr>
                  ) : (
                    accounts.map(account => (
                      <tr key={account.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-5 font-medium text-slate-900">{account.bank_name}</td>
                        <td className="py-4 px-5 text-slate-700">{account.account_number}</td>
                        <td className="py-4 px-5 text-slate-700">{account.currency}</td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-slate-400" />
                            </button>
                            <button onClick={() => handleDelete(account.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold text-slate-900">Add Bank Account</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bank Name</label>
                <input type="text" value={form.bankName} onChange={e => setForm({ ...form, bankName: e.target.value })} placeholder="e.g. Wells Fargo" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Account Number</label>
                <input type="text" value={form.accountNumber} onChange={e => setForm({ ...form, accountNumber: e.target.value })} placeholder="e.g. ****4567" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Currency</label>
                <select value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50">
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                  <option value="NGN">NGN</option>
                </select>
              </div>
              <button onClick={handleAdd} disabled={adding || !form.bankName || !form.accountNumber} className="w-full py-2.5 bg-[#A3E635] text-black font-semibold rounded-lg hover:bg-[#b8ed5a] transition-colors disabled:opacity-50">
                {adding ? 'Adding...' : 'Add Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
