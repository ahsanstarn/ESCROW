import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import {
  Wallet,
  Building2,
  CreditCard,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Download,
} from 'lucide-react';
import { Escrow, UserStats } from '@/types';

interface SellerWalletProps {
  userId?: string;
  userName?: string;
}

export default function SellerWallet({ userId, userName }: SellerWalletProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [kycOpen, setKycOpen] = useState(true);

  useEffect(() => {
    if (!userId) return;
    Promise.all([
      api.escrows.list({ merchantId: userId }),
      api.users.stats(userId),
    ]).then(([escrowRes, statsRes]) => {
      setEscrows(escrowRes.data || []);
      setStats(statsRes.data || null);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [userId]);

  const activeEscrows = escrows.filter(e => ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'].includes(e.status));
  const releasedEscrows = escrows.filter(e => e.status === 'RELEASED');
  const escrowBalance = activeEscrows.reduce((sum, e) => sum + e.amount, 0);
  const totalFees = escrows.reduce((sum, e) => sum + e.platformFee, 0);
  const availableBalance = releasedEscrows.reduce((sum, e) => sum + (e.amount - e.platformFee), 0);

  const walletCards = [
    { label: 'Available Balance', value: formatCurrency(availableBalance || 0), subtitle: 'Ready to withdraw', icon: Wallet, color: 'text-emerald-600' },
    { label: 'Escrow Balance', value: formatCurrency(escrowBalance), subtitle: 'Held in active orders', icon: Clock, color: 'text-blue-600' },
    { label: 'Platform Fees', value: formatCurrency(totalFees), subtitle: 'Total fees', icon: Zap, color: 'text-amber-600' },
    { label: 'Risk Reserve', value: formatCurrency(escrowBalance * 0.05), subtitle: 'Dispute buffer', icon: Shield, color: 'text-red-500' },
  ];

  const payoutMethods = [
    { id: '1', type: 'Bank Account', label: 'Primary Bank Account', verified: true, icon: Building2 },
    { id: '2', type: 'Digital Wallet', label: 'Digital Wallet', verified: true, icon: CreditCard },
  ];

  const thisMonth = [
    { label: 'Total Escrows', value: formatCurrency(escrows.reduce((s, e) => s + e.amount, 0)) },
    { label: 'Platform Fees', value: formatCurrency(totalFees) },
    { label: 'Completed Escrows', value: String(releasedEscrows.length) },
    { label: 'Active Escrows', value: String(activeEscrows.length) },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Wallet & Payouts</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your balance, payout methods, and withdrawal history</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {walletCards.map((card, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between mb-3">
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-xs text-slate-500 mb-1">{card.label}</p>
              <p className="text-xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-400 mt-1">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {kycOpen && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">KYC Verification Required</p>
              <p className="text-sm text-amber-700 mt-0.5">Complete your identity verification to enable withdrawals above $10,000.</p>
            </div>
            <button onClick={() => setKycOpen(false)} className="text-sm text-amber-700 hover:text-amber-900 font-medium">Complete KYC</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Payout Methods</h2>
              <button className="flex items-center gap-1 px-3 py-2 bg-[#A3E635] text-black text-sm font-medium rounded-lg hover:bg-[#95d630] transition-colors">
                <Plus className="w-4 h-4" /> Add New
              </button>
            </div>
            <div className="space-y-3">
              {payoutMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{method.label}</p>
                      <p className="text-xs text-slate-500">{method.type}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 py-2.5 bg-[#A3E635] text-black text-sm font-semibold rounded-xl hover:bg-[#95d630] transition-colors">
                Withdraw Funds
              </button>
              <button className="flex-1 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors">
                Instant Payout
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Summary</h2>
            <div className="space-y-4">
              {thisMonth.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900">Total Balance</span>
                <span className="text-lg font-bold text-slate-900">{formatCurrency(availableBalance + escrowBalance)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Escrow History</h2>
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#A3E635]">
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Escrow ID</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Buyer</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {escrows.slice(0, 10).map((escrow) => (
                  <tr key={escrow.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">{escrow.escrowCode}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{formatCurrency(escrow.amount)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        escrow.status === 'RELEASED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {escrow.status === 'RELEASED' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {escrow.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{escrow.buyer?.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-slate-700">{new Date(escrow.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {escrows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">No escrow history found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
