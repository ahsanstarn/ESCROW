import { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { EscrowCard } from '@/components/escrow/EscrowCard';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { Escrow, EscrowStatus } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import { Shield, Clock, CheckCircle, AlertTriangle, Wallet } from 'lucide-react';

interface CustomerDashboardProps {
  userId?: string;
}

export function CustomerDashboard({ userId }: CustomerDashboardProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | EscrowStatus>('all');

  const fetchData = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    try {
      const res = await api.escrows.list({ buyerId: userId });
      setEscrows(res.data);
    } catch { /* empty */ }
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const protectedFunds = escrows.filter(e => !['RELEASED', 'REFUNDED', 'CANCELLED'].includes(e.status))
    .reduce((sum, e) => sum + e.amount, 0);
  const completedTransactions = escrows.filter(e => e.status === 'RELEASED').length;
  const pendingConfirmation = escrows.filter(e => e.status === 'DELIVERED');
  const hasDisputes = escrows.some(e => e.status === 'DISPUTED');
  const filteredEscrows = filter === 'all' ? escrows : escrows.filter(e => e.status === filter);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader
        title="Your Protected Payments"
        subtitle="Your money is held securely until you confirm delivery"
      />

      <div className="space-y-6">
        <div className="card p-6 bg-brand-600/5 border-brand-600/15">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-600/10 rounded-xl">
              <Shield className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100">Your money is protected</h3>
              <p className="text-sm text-slate-400 mt-1">
                Funds are held in a secure escrow account. The seller will be paid only after you confirm 
                that your order has been delivered correctly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Protected Funds"
            value={formatCurrency(protectedFunds)}
            subtitle="Currently held in escrow"
            icon={<Wallet className="w-5 h-5" />}
          />
          <StatCard
            label="Awaiting Your Review"
            value={pendingConfirmation.length}
            subtitle={pendingConfirmation.length > 0 ? 'Review and confirm delivery' : 'Nothing pending'}
            icon={<Clock className="w-5 h-5" />}
          />
          <StatCard
            label="Completed"
            value={completedTransactions}
            subtitle="Successfully released"
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <StatCard
            label="Protection Status"
            value={hasDisputes ? 'Active' : 'Secure'}
            subtitle={hasDisputes ? 'Dispute in progress' : 'All transactions healthy'}
            icon={<AlertTriangle className="w-5 h-5" />}
          />
        </div>

        {pendingConfirmation.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-300">Please Confirm Your Deliveries</h2>
            {pendingConfirmation.map(escrow => (
              <CountdownTimer
                key={escrow.id}
                targetDate={escrow.disputeDeadline}
                label={`${escrow.escrowCode} — Confirm delivery of "${escrow.description || 'your order'}" or open a dispute before auto-release`}
              />
            ))}
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-slate-300">Your Transactions</h2>
            <div className="flex gap-1 ml-auto">
              {(['all', 'DELIVERED', 'DEPOSITED', 'DISPUTED', 'RELEASED'] as const).map(f => (
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
              <p className="text-slate-500 text-sm">No transactions found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEscrows.map(escrow => (
                <EscrowCard key={escrow.id} escrow={escrow} showMerchant />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
