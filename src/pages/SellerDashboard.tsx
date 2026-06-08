import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { formatCurrency } from '@/lib/utils';
import {
  Wallet,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Package,
  Bell,
  User,
  Truck,
  Shield,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface SellerDashboardProps {
  userId?: string;
}

const stats = [
  { label: 'Available Balance', value: formatCurrency(124560), subtitle: 'Ready to withdraw', icon: Wallet, color: 'text-emerald-600' },
  { label: 'Funds in Escrow', value: formatCurrency(345200), subtitle: 'Awaiting release', icon: Clock, color: 'text-blue-600' },
  { label: 'Next Expected Release', value: 'Jan 20, 2025', subtitle: 'In 3 days', icon: ArrowUpRight, color: 'text-purple-600' },
  { label: 'Disputes Requiring Action', value: '2', subtitle: 'Urgent attention needed', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'Trust Score', value: '87/100', subtitle: 'Excellent standing', icon: TrendingUp, color: 'text-emerald-600' },
];

const attentionItems = [
  { id: '83421', text: 'Order #83421 - Mark as Delivered', type: 'delivery', urgent: true },
  { id: '83418', text: 'Order #83418 - Upload shipping proof', type: 'shipping', urgent: false },
  { id: '83415', text: 'Order #83415 - Buyer requested refund', type: 'refund', urgent: true },
];

const orders = [
  { id: 'ORD-83421', buyer: 'Acme Corp', amount: 125000, status: 'Funds Held', risk: 'Low', delivery: 'In Transit', expected: 'Jan 20, 2025', action: 'Mark Delivered' },
  { id: 'ORD-83418', buyer: 'TechStart Inc', amount: 45000, status: 'Payment Pending', risk: 'Medium', delivery: 'Pending', expected: 'Jan 22, 2025', action: 'View Details' },
  { id: 'ORD-83415', buyer: 'GlobalRetail', amount: 89000, status: 'Dispute', risk: 'High', delivery: 'Delivered', expected: 'On Hold', action: 'Resolve' },
  { id: 'ORD-83412', buyer: 'BlueSky Ltd', amount: 22000, status: 'Completed', risk: 'Low', delivery: 'Delivered', expected: 'Released', action: 'View Details' },
  { id: 'ORD-83409', buyer: 'RedStone Co', amount: 67000, status: 'Funds Held', risk: 'Low', delivery: 'In Transit', expected: 'Jan 21, 2025', action: 'Track' },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'Completed') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium"><CheckCircle className="w-3 h-3" />{status}</span>;
  }
  if (status === 'Funds Held') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#A3E635]/20 text-emerald-800 text-xs font-medium"><Clock className="w-3 h-3" />{status}</span>;
  }
  if (status === 'Dispute') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium"><XCircle className="w-3 h-3" />{status}</span>;
  }
  return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">{status}</span>;
}

function RiskBadge({ risk }: { risk: string }) {
  const color = risk === 'Low' ? 'bg-emerald-50 text-emerald-700' : risk === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700';
  return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>{risk}</span>;
}

export default function SellerDashboard({ userId }: SellerDashboardProps) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your escrows, payouts, and business metrics</p>
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
                <p className="text-sm font-medium text-slate-900">{userId ? 'Seller Account' : 'Account'}</p>
                <p className="text-[11px] text-slate-500">ID: {userId || 'acc_12345'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, i) => (
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

        {/* What Needs Attention */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">What Needs Attention</h2>
          <div className="space-y-2">
            {attentionItems.map((item, i) => (
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
                        : 'The buyer has initiated a refund request. Please review and respond within 48 hours.'}
                    </p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-[#A3E635] text-black text-sm font-medium rounded-lg hover:bg-[#95d630] transition-colors">
                        {item.type === 'delivery' ? 'Mark as Delivered' : item.type === 'shipping' ? 'Upload Proof' : 'Respond'}
                      </button>
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Orders & Escrow Status Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Orders & Escrow Status</h2>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-[#A3E635] text-black text-sm font-medium rounded-lg hover:bg-[#95d630] transition-colors">
                Withdraw
              </button>
            </div>
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
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Delivery</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Expected Release</th>
                  <th className="text-left py-3 px-4 text-black font-semibold text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">{order.id}</td>
                    <td className="py-3 px-4 text-slate-700">{order.buyer}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{formatCurrency(order.amount)}</td>
                    <td className="py-3 px-4"><StatusBadge status={order.status} /></td>
                    <td className="py-3 px-4"><RiskBadge risk={order.risk} /></td>
                    <td className="py-3 px-4 text-slate-700">{order.delivery}</td>
                    <td className="py-3 px-4 text-slate-700">{order.expected}</td>
                    <td className="py-3 px-4">
                      <button className="text-sm font-medium text-[#A3E635] hover:text-[#95d630] transition-colors">
                        {order.action}
                      </button>
                    </td>
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
