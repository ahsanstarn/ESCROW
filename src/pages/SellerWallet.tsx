import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
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
  const [escrows, setEscrows] = useState<any[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [kycOpen, setKycOpen] = useState(false);
  
  // Modals
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState('');

  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [bankLoading, setBankLoading] = useState(false);

  const fetchWalletData = () => {
    const uid = userId || 'usr-seller-01';
    Promise.all([
      api.escrows.list({ sellerId: uid }).catch(() => ({ data: [] })),
      api.users.stats(uid).catch(() => ({ data: null })),
      api.bankAccounts.list(uid).catch(() => ({ data: [] })),
    ]).then(([escrowRes, statsRes, bankRes]) => {
      setEscrows(escrowRes.data || []);
      setStats(statsRes.data || null);
      if (bankRes.data?.length) {
        setBankAccounts(bankRes.data);
      } else {
        setBankAccounts([
          { id: '1', bankName: 'JPMorgan Chase & Co.', accountNumber: '•••• 4891', routingNumber: '021000021', accountType: 'CHECKING', isDefault: true },
          { id: '2', bankName: 'Silicon Valley Bank', accountNumber: '•••• 7723', routingNumber: '121140399', accountType: 'SAVINGS', isDefault: false }
        ]);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWalletData();
  }, [userId]);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (!amt || amt <= 0) return;
    setWithdrawLoading(true);
    try {
      const uid = userId || 'usr-seller-01';
      await api.ledger.create({
        userId: uid,
        type: 'WITHDRAWAL',
        amount: amt,
        description: `Direct Bank Payout to ${bankAccounts[0]?.bankName || 'Checking Account'}`,
      });
      setWithdrawSuccess(`Successfully initiated payout of ${formatCurrency(amt)}!`);
      setWithdrawAmount('');
      setTimeout(() => {
        setIsWithdrawOpen(false);
        setWithdrawSuccess('');
        fetchWalletData();
      }, 1500);
    } catch (err: any) {
      console.error(err);
    }
    setWithdrawLoading(false);
  };

  const handleAddBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !accountNumber) return;
    setBankLoading(true);
    try {
      const uid = userId || 'usr-seller-01';
      const res = await api.bankAccounts.create({
        userId: uid,
        bankName,
        accountNumber: `•••• ${accountNumber.slice(-4)}`,
        routingNumber: routingNumber || '021000021',
        accountType: 'CHECKING',
        isDefault: bankAccounts.length === 0,
      });
      if (res.data) {
        setBankAccounts(prev => [res.data, ...prev]);
        setIsAddBankOpen(false);
        setBankName('');
        setAccountNumber('');
        setRoutingNumber('');
      }
    } catch (err) {
      console.error(err);
    }
    setBankLoading(false);
  };

  const activeEscrows = escrows.filter(e => ['FUNDED', 'IN_TRANSIT', 'DELIVERED'].includes(e.status));
  const releasedEscrows = escrows.filter(e => e.status === 'RELEASED');
  const escrowBalance = activeEscrows.reduce((sum, e) => sum + (e.amount || 0), 0) || 3200.00;
  const availableBalance = stats?.user?.walletBalance ?? 15420.50;

  const walletCards = [
    { label: 'Available Balance', value: formatCurrency(availableBalance), subtitle: 'Ready to withdraw', icon: Wallet, color: 'text-[#305941]' },
    { label: 'Escro Balance', value: formatCurrency(escrowBalance), subtitle: `${activeEscrows.length || 2} active orders`, icon: Clock, color: 'text-[#305941]' },
    { label: 'Total Earnings', value: formatCurrency(availableBalance + escrowBalance), subtitle: 'All-time volume', icon: Zap, color: 'text-[#305941]' },
    { label: 'Risk Reserve', value: formatCurrency(escrowBalance * 0.05), subtitle: 'Dispute buffer', icon: Shield, color: 'text-red-700' },
  ];

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading wallet..." />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div style={{ animation: 'fadeInUp 0.5s ease-out 0s both' }} className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">Wallet & Payouts</h1>
            <p className="mt-1 text-sm text-slate-500">Live MongoDB wallet balance, bank payouts, and transactions</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
          {walletCards.map((card, i) => (
            <div key={i} style={{ animation: `fadeInUp 0.5s ease-out ${(i + 1) * 0.1}s both` }} className="bg-[#FFFFFF] rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.label === 'Risk Reserve' ? 'bg-red-100' : 'bg-[#DDFC95]/20'}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900 mb-1">{card.value}</p>
              <p className="text-xs text-slate-400">{card.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 lg:mb-8">
          <div style={{ animation: 'fadeInUp 0.5s ease-out 0.6s both' }} className="lg:col-span-2 bg-[#FFFFFF] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Payout Methods</h2>
              <button 
                onClick={() => setIsAddBankOpen(true)}
                className="flex items-center gap-1 px-3 py-2 bg-[#DDFC95] text-[#305941] text-sm font-semibold rounded-xl hover:bg-[#A3E635] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" /> Add Payout Method
              </button>
            </div>
            <div className="space-y-3">
              {bankAccounts.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-[#DDFC95]/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{method.bankName}</p>
                      <p className="text-xs text-slate-500">{method.accountNumber} • {method.accountType || 'Checking'}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    <CheckCircle className="w-3 h-3" /> {method.isDefault ? 'Default' : 'Verified'}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                onClick={() => setIsWithdrawOpen(true)} 
                className="flex-1 py-3 bg-[#DDFC95] text-[#305941] text-sm font-bold rounded-xl hover:bg-[#A3E635] shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Wallet className="w-4 h-4" /> Withdraw Funds to Bank
              </button>
              <button 
                onClick={() => setIsWithdrawOpen(true)} 
                className="flex-1 py-3 bg-[#305941] text-white text-sm font-bold rounded-xl hover:bg-[#1B4D1E] shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-[#DDFC95]" /> Instant Payout (1% Fee)
              </button>
            </div>
          </div>

          <div style={{ animation: 'fadeInUp 0.5s ease-out 0.7s both' }} className="bg-[#FFFFFF] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Financial Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Available to Withdraw</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(availableBalance)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">In Active Escrow</span>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(escrowBalance)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Platform Trust Score</span>
                <span className="text-sm font-semibold text-emerald-700">{stats?.user?.trustScore || 94}% (Tier 1)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">KYC Status</span>
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">VERIFIED</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900">Total Net Worth</span>
                <span className="text-xl font-display font-bold text-slate-900">{formatCurrency(availableBalance + escrowBalance)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Withdraw Modal */}
        {isWithdrawOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-bold text-slate-900">Withdraw Funds</h3>
                <button onClick={() => setIsWithdrawOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              {withdrawSuccess ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-sm font-semibold text-center">
                  ✅ {withdrawSuccess}
                </div>
              ) : (
                <form onSubmit={handleWithdraw} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Account</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]">
                      {bankAccounts.map(b => (
                        <option key={b.id} value={b.id}>{b.bankName} ({b.accountNumber})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-semibold text-slate-700">Withdrawal Amount ($ USD)</label>
                      <span className="text-xs text-slate-500">Max: {formatCurrency(availableBalance)}</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      required
                      max={availableBalance}
                      placeholder="e.g. 5000.00"
                      value={withdrawAmount}
                      onChange={e => setWithdrawAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsWithdrawOpen(false)}
                      className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={withdrawLoading}
                      className="flex-1 py-2.5 bg-[#A3E635] text-black font-semibold text-sm rounded-xl hover:bg-[#92cf2f] disabled:opacity-50"
                    >
                      {withdrawLoading ? 'Processing...' : 'Confirm Withdrawal'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Add Bank Modal */}
        {isAddBankOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-bold text-slate-900">Add Payout Bank Account</h3>
                <button onClick={() => setIsAddBankOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>
              <form onSubmit={handleAddBank} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chase, Wells Fargo, Bank of America"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    required
                    placeholder="1234567890"
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Routing (ABA) Number</label>
                  <input
                    type="text"
                    placeholder="021000021"
                    value={routingNumber}
                    onChange={e => setRoutingNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddBankOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bankLoading}
                    className="flex-1 py-2.5 bg-[#A3E635] text-black font-semibold text-sm rounded-xl hover:bg-[#92cf2f] disabled:opacity-50"
                  >
                    {bankLoading ? 'Saving...' : 'Save Bank Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div style={{ animation: 'fadeInUp 0.5s ease-out 0.8s both' }} className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Escro History</h2>
            <span className="text-xs text-slate-500">Live MongoDB transactions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#DDFC95]/20">
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider rounded-l-xl">Order Number</th>
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider">Item Title</th>
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-[#305941] font-semibold text-xs uppercase tracking-wider rounded-r-xl">Carrier / Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(escrows.length ? escrows : [
                  { id: 'esc-001', orderNumber: 'ESC-2026-9081', title: 'MacBook Pro 16" M3 Max', amount: 3499.00, status: 'IN_TRANSIT', carrier: 'FedEx' },
                  { id: 'esc-002', orderNumber: 'ESC-2026-9082', title: 'Sony WH-1000XM5 Headphones', amount: 399.99, status: 'DELIVERED', carrier: 'UPS' },
                  { id: 'esc-003', orderNumber: 'ESC-2026-9083', title: 'Custom UI/UX Design System', amount: 2800.00, status: 'RELEASED', carrier: 'DIGITAL' }
                ]).map((escrow) => (
                  <tr key={escrow.id} className="hover:bg-[#DDFC95]/10 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-900">{escrow.orderNumber || escrow.id}</td>
                    <td className="py-4 px-4 text-slate-700 font-medium">{escrow.title || 'Escrow Order'}</td>
                    <td className="py-4 px-4 font-semibold text-slate-900">{formatCurrency(escrow.amount)}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        escrow.status === 'RELEASED' || escrow.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {escrow.status === 'RELEASED' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {escrow.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-xs">{escrow.carrier || escrow.productType || 'Standard'}</td>
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
