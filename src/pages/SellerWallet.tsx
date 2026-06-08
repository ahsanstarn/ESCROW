import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Bell,
  User,
  Wallet,
  Building2,
  CreditCard,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Zap,
  Shield,
  ChevronRight,
  Download,
} from 'lucide-react';

const walletCards = [
  { label: 'Available Balance', value: formatCurrency(124560), subtitle: 'Ready to withdraw', icon: Wallet, color: 'text-emerald-600' },
  { label: 'Escrow Balance', value: formatCurrency(345200), subtitle: 'Held in active orders', icon: Clock, color: 'text-blue-600' },
  { label: 'Platform Fees', value: formatCurrency(12340), subtitle: 'This month', icon: Zap, color: 'text-amber-600' },
  { label: 'Risk Reserve', value: formatCurrency(25000), subtitle: 'Dispute buffer', icon: Shield, color: 'text-red-500' },
];

const payoutMethods = [
  { id: '1', type: 'HDFC Bank', label: 'HDFC Bank ****2132', verified: true, icon: Building2 },
  { id: '2', type: 'UPI', label: 'seller@okhdfcbank', verified: true, icon: CreditCard },
];

const payoutHistory = [
  { id: 'PO-1234', amount: 95000, method: 'HDFC Bank', status: 'Completed', date: 'Jan 15, 2025 02:30 PM' },
  { id: 'PO-1233', amount: 125000, method: 'HDFC Bank', status: 'Completed', date: 'Jan 15, 2025 10:15 AM' },
  { id: 'PO-1232', amount: 65000, method: 'UPI', status: 'Processing', date: 'Jan 9, 2025 04:45 PM' },
  { id: 'PO-1231', amount: 57500, method: 'HDFC Bank', status: 'Completed', date: 'Jan 9, 2025 11:00 AM' },
  { id: 'PO-1230', amount: 42000, method: 'UPI', status: 'Completed', date: 'Jan 5, 2025 09:20 AM' },
];

const thisMonth = [
  { label: 'Total Withdrawal', value: formatCurrency(342500) },
  { label: 'Commission Charges', value: formatCurrency(12340) },
  { label: 'Net Receivable', value: formatCurrency(329160) },
  { label: 'Pending Release', value: formatCurrency(156000) },
];

export default function SellerWallet() {
  const [kycOpen, setKycOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Wallet & Payouts</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your balance, payout methods, and withdrawal history</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2 shadow-sm border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center text-xs font-semibold text-black">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-900">Seller Account</p>
                <p className="text-[11px] text-slate-500">ID: acc_12345</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Overview */}
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

        {/* KYC Alert */}
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
          {/* Payout Methods */}
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

          {/* This Month */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">This Month</h2>
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
                <span className="text-lg font-bold text-slate-900">{formatCurrency(485260)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payout History */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Payout History</h2>
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#A3E635]">
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Method</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((payout, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">{payout.id}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{formatCurrency(payout.amount)}</td>
                    <td className="py-3 px-4 text-slate-700">{payout.method}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        payout.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {payout.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {payout.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{payout.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
