import { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { EscrowCard } from '@/components/escrow/EscrowCard';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { Escrow, EscrowStatus, User } from '@/types';
import { formatCurrency, getTrustScoreLabel, getTrustScoreColor } from '@/lib/utils';
import { api } from '@/lib/api';
import { DollarSign, Clock, AlertTriangle, Shield, Plus, X } from 'lucide-react';

interface MerchantDashboardProps {
  userId?: string;
}

export function MerchantDashboard({ userId }: MerchantDashboardProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | EscrowStatus>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [buyers, setBuyers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [form, setForm] = useState({
    buyerId: '',
    amount: '',
    productType: 'PHYSICAL' as 'PHYSICAL' | 'DIGITAL',
    description: '',
    confirmationWindowHours: '72',
  });

  const fetchData = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    try {
      const [escrowsRes, userRes, buyersRes] = await Promise.all([
        api.escrows.list({ merchantId: userId }),
        api.users.get(userId),
        api.users.list('BUYER'),
      ]);
      setEscrows(escrowsRes.data);
      setCurrentUser(userRes.data);
      setBuyers(buyersRes.data);
    } catch { /* empty */ }
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async () => {
    if (!userId || !form.amount || Number(form.amount) <= 0) return;
    setCreating(true);
    try {
      await api.escrows.create({
        merchantId: userId,
        buyerId: form.buyerId || undefined,
        amount: Number(form.amount),
        productType: form.productType,
        description: form.description || undefined,
        confirmationWindowHours: Number(form.confirmationWindowHours),
      });
      setShowCreate(false);
      setForm({ buyerId: '', amount: '', productType: 'PHYSICAL', description: '', confirmationWindowHours: '72' });
      fetchData();
    } catch (err) {
      alert((err as Error).message);
    }
    setCreating(false);
  };

  const activeEscrows = escrows.filter(e => ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'].includes(e.status));
  const fundsInEscrow = activeEscrows.reduce((sum, e) => sum + e.amount, 0);
  const blockedByDispute = escrows.filter(e => e.status === 'DISPUTED').reduce((sum, e) => sum + e.amount, 0);
  const deliveredAwaiting = escrows.filter(e => e.status === 'DELIVERED');
  const filteredEscrows = filter === 'all' ? escrows : escrows.filter(e => e.status === filter);

  const trustScore = currentUser?.trustScore ?? 50;

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader
        title="Merchant Dashboard"
        subtitle="Monitor your escrow activity and pending fund releases"
        actions={
          <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Escrow
          </button>
        }
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Funds in Escrow"
            value={formatCurrency(fundsInEscrow)}
            subtitle={`${activeEscrows.length} active transactions`}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <StatCard
            label="Awaiting Confirmation"
            value={deliveredAwaiting.length}
            subtitle={deliveredAwaiting.length > 0 ? 'Buyers reviewing delivery' : 'All clear'}
            icon={<Clock className="w-5 h-5" />}
          />
          <StatCard
            label="Held by Disputes"
            value={formatCurrency(blockedByDispute)}
            subtitle={blockedByDispute > 0 ? 'Requires your attention' : 'No active disputes'}
            icon={<AlertTriangle className="w-5 h-5" />}
          />
          <StatCard
            label="Trust Score"
            value={trustScore.toFixed(0)}
            subtitle={getTrustScoreLabel(trustScore)}
            icon={<Shield className="w-5 h-5" />}
            valueClassName={getTrustScoreColor(trustScore)}
          />
        </div>

        {deliveredAwaiting.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-300">Waiting for Buyer Confirmation</h2>
            {deliveredAwaiting.map(escrow => (
              <CountdownTimer
                key={escrow.id}
                targetDate={escrow.disputeDeadline}
                label={`${escrow.escrowCode} — ${escrow.buyer?.name || 'Buyer'} must confirm or dispute before auto-release`}
              />
            ))}
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-slate-300">Your Escrows</h2>
            <div className="flex gap-1 ml-auto">
              {(['all', 'DELIVERED', 'IN_TRANSIT', 'DISPUTED', 'RELEASED', 'DEPOSITED'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    filter === f ? 'bg-slate-700 text-slate-200' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {f === 'all' ? 'All' : f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
          {filteredEscrows.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-slate-500 text-sm">No escrows found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEscrows.map(escrow => (
                <EscrowCard key={escrow.id} escrow={escrow} showBuyer />
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="card p-6 w-full max-w-lg mx-4 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-slate-100">Create New Escrow</h3>
              <button onClick={() => setShowCreate(false)} className="p-1 text-slate-500 hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">Buyer (optional)</label>
                <select
                  value={form.buyerId}
                  onChange={(e) => setForm({ ...form, buyerId: e.target.value })}
                  className="input-field mt-1"
                >
                  <option value="">Select a buyer</option>
                  {buyers.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400">Amount (USD)</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="input-field mt-1"
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Product Type</label>
                <select
                  value={form.productType}
                  onChange={(e) => setForm({ ...form, productType: e.target.value as 'PHYSICAL' | 'DIGITAL' })}
                  className="input-field mt-1"
                >
                  <option value="PHYSICAL">Physical Product</option>
                  <option value="DIGITAL">Digital Service</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-field mt-1 h-20 resize-none"
                  placeholder="Describe what is being sold..."
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Confirmation Window (hours)</label>
                <input
                  type="number"
                  value={form.confirmationWindowHours}
                  onChange={(e) => setForm({ ...form, confirmationWindowHours: e.target.value })}
                  className="input-field mt-1"
                  min="1"
                  max="168"
                />
                <p className="text-[11px] text-slate-500 mt-1">How long the buyer has to confirm delivery (1-168 hours)</p>
              </div>
              {form.amount && Number(form.amount) > 0 && (
                <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-800/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Platform fee (2.5%)</span>
                    <span className="text-slate-300">{formatCurrency(Math.round(Number(form.amount) * 250) / 10000)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1 pt-1 border-t border-slate-800/50">
                    <span className="text-slate-400">Seller receives</span>
                    <span className="font-semibold text-trust-400">
                      {formatCurrency(Number(form.amount) - Math.round(Number(form.amount) * 250) / 10000)}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={handleCreate} disabled={creating || !form.amount} className="btn-primary flex-1">
                  {creating ? 'Creating...' : 'Create Escrow'}
                </button>
                <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
