import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import {
  Wallet,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Escrow, UserStats, User } from '@/types';

interface SellerDashboardProps {
  userId?: string;
  userName?: string;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; icon: React.ReactNode; label: string }> = {
    RELEASED: { bg: 'bg-emerald-50 text-emerald-700', icon: <CheckCircle className="w-3 h-3" />, label: 'Released' },
    DEPOSITED: { bg: 'bg-[#A3E635]/20 text-emerald-800', icon: <Clock className="w-3 h-3" />, label: 'Funds Held' },
    SHIPPED: { bg: 'bg-[#A3E635]/20 text-emerald-800', icon: <Clock className="w-3 h-3" />, label: 'Shipped' },
    IN_TRANSIT: { bg: 'bg-[#A3E635]/20 text-emerald-800', icon: <Clock className="w-3 h-3" />, label: 'In Transit' },
    DELIVERED: { bg: 'bg-amber-50 text-amber-700', icon: <Package className="w-3 h-3" />, label: 'Delivered' },
    CONFIRMED: { bg: 'bg-emerald-50 text-emerald-700', icon: <CheckCircle className="w-3 h-3" />, label: 'Confirmed' },
    DISPUTED: { bg: 'bg-red-50 text-red-700', icon: <XCircle className="w-3 h-3" />, label: 'Disputed' },
    CREATED: { bg: 'bg-slate-100 text-slate-700', icon: <Clock className="w-3 h-3" />, label: 'Created' },
    REFUNDED: { bg: 'bg-amber-50 text-amber-700', icon: <AlertTriangle className="w-3 h-3" />, label: 'Refunded' },
    CANCELLED: { bg: 'bg-slate-100 text-slate-500', icon: <XCircle className="w-3 h-3" />, label: 'Cancelled' },
  };
  const s = map[status] || { bg: 'bg-slate-100 text-slate-700', icon: null, label: status };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg}`}>
      {s.icon} {s.label}
    </span>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const color = risk === 'Low' ? 'bg-emerald-50 text-emerald-700' : risk === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700';
  return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>{risk}</span>;
}

function getRiskLevel(score: number): string {
  if (score >= 80) return 'Low';
  if (score >= 50) return 'Medium';
  return 'High';
}

export default function SellerDashboard({ userId, userName }: SellerDashboardProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(0);

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
  const disputes = escrows.filter(e => e.status === 'DISPUTED');
  const nextRelease = escrows.find(e => e.status === 'DELIVERED' || e.status === 'CONFIRMED');

  const statCards = [
    { label: 'Available Balance', value: formatCurrency((stats?.completedEscrows || 0) * 500), subtitle: 'Ready to withdraw', icon: Wallet, color: 'text-emerald-600' },
    { label: 'Funds in Escrow', value: formatCurrency(activeEscrows.reduce((sum, e) => sum + e.amount, 0)), subtitle: 'Awaiting release', icon: Clock, color: 'text-blue-600' },
    { label: 'Next Expected Release', value: nextRelease ? new Date(nextRelease.updatedAt).toLocaleDateString() : 'N/A', subtitle: nextRelease ? 'Upcoming' : 'No pending releases', icon: ArrowUpRight, color: 'text-purple-600' },
    { label: 'Disputes Requiring Action', value: String(disputes.length), subtitle: disputes.length > 0 ? 'Urgent attention needed' : 'All clear', icon: AlertTriangle, color: 'text-red-500' },
    { label: 'Trust Score', value: `${stats?.user?.trustScore || 0}/100`, subtitle: (stats?.user?.trustScore || 0) >= 80 ? 'Excellent standing' : 'Good standing', icon: TrendingUp, color: 'text-emerald-600' },
  ];

  const attentionItems = activeEscrows.slice(0, 3).map(e => ({
    id: e.id,
    text: `${e.escrowCode} - ${e.status === 'DELIVERED' ? 'Confirm delivery' : e.status === 'SHIPPED' ? 'Track shipment' : 'Action needed'}`,
    type: e.status === 'DELIVERED' ? 'delivery' : e.status === 'SHIPPED' ? 'shipping' : 'general',
    urgent: e.status === 'DELIVERED',
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your escrows, payouts, and business metrics</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">What Needs Attention</h2>
          <div className="space-y-2">
            {attentionItems.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No items requiring attention right now.</p>
            ) : (
              attentionItems.map((item, i) => (
                <div key={item.id} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.urgent ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      {item.type === 'delivery' ? <Truck className="w-4 h-4" /> : item.type === 'shipping' ? <Package className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <span className="flex-1 text-sm font-medium text-slate-900">{item.text}</span>
                    {expanded === i ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expanded === i && (
                    <div className="px-4 pb-4 pl-16">
                      <p className="text-sm text-slate-500 mb-3">
                        {item.type === 'delivery'
                          ? 'This order has been marked as shipped. Please confirm delivery once the package reaches the buyer.'
                          : item.type === 'shipping'
                          ? 'Upload tracking information and shipping proof to proceed with escrow release.'
                          : 'This item requires your attention.'}
                      </p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-[#A3E635] text-black text-sm font-medium rounded-lg hover:bg-[#95d630] transition-colors">
                          {item.type === 'delivery' ? 'Mark as Delivered' : item.type === 'shipping' ? 'Upload Proof' : 'View'}
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Orders & Escrow Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#A3E635]">
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Buyer</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Risk</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Created</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {escrows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">No orders found.</td>
                  </tr>
                ) : (
                  escrows.slice(0, 10).map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">{order.escrowCode}</td>
                      <td className="py-3 px-4 text-slate-700">{order.buyer?.name || 'N/A'}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{formatCurrency(order.amount)}</td>
                      <td className="py-3 px-4"><StatusBadge status={order.status} /></td>
                      <td className="py-3 px-4"><RiskBadge risk={getRiskLevel(order.platformFee > 50 ? 30 : 80)} /></td>
                      <td className="py-3 px-4 text-slate-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <button className="text-sm font-medium text-[#A3E635] hover:text-[#95d630] transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
