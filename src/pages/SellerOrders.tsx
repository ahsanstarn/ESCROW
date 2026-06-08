import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Package,
} from 'lucide-react';

const tabs = [
  { label: 'All Orders', count: 16 },
  { label: 'Payment Pending', count: 1 },
  { label: 'In Escrow', count: 4 },
  { label: 'In Delivery', count: 3 },
  { label: 'Awaiting Confirmation', count: 2 },
  { label: 'Completed', count: 3 },
  { label: 'Disputed', count: 6 },
];

const allOrders = [
  { id: 'ORD-83421', buyer: 'Acme Corp', amount: 125000, status: 'In Escrow', risk: 'Low', delivery: 'In Transit', expected: 'Jan 20, 2025', action: 'Track' },
  { id: 'ORD-83420', buyer: 'TechStart Inc', amount: 45000, status: 'Payment Pending', risk: 'Medium', delivery: 'Pending', expected: 'Jan 22, 2025', action: 'Remind' },
  { id: 'ORD-83419', buyer: 'GlobalRetail', amount: 89000, status: 'Disputed', risk: 'High', delivery: 'Delivered', expected: 'On Hold', action: 'Resolve' },
  { id: 'ORD-83418', buyer: 'BlueSky Ltd', amount: 22000, status: 'Completed', risk: 'Low', delivery: 'Delivered', expected: 'Released', action: 'View' },
  { id: 'ORD-83417', buyer: 'RedStone Co', amount: 67000, status: 'In Escrow', risk: 'Low', delivery: 'In Transit', expected: 'Jan 21, 2025', action: 'Track' },
  { id: 'ORD-83416', buyer: 'Nova Systems', amount: 34000, status: 'In Delivery', risk: 'Low', delivery: 'Shipped', expected: 'Jan 23, 2025', action: 'Update' },
  { id: 'ORD-83415', buyer: 'Peak Industries', amount: 156000, status: 'Awaiting Confirmation', risk: 'Low', delivery: 'Delivered', expected: 'Jan 19, 2025', action: 'Nudge' },
  { id: 'ORD-83414', buyer: 'Zenith Corp', amount: 78000, status: 'Disputed', risk: 'High', delivery: 'Delivered', expected: 'On Hold', action: 'Resolve' },
  { id: 'ORD-83413', buyer: 'Apex Solutions', amount: 54000, status: 'Completed', risk: 'Low', delivery: 'Delivered', expected: 'Released', action: 'View' },
  { id: 'ORD-83412', buyer: 'Prime Logistics', amount: 92000, status: 'In Escrow', risk: 'Medium', delivery: 'In Transit', expected: 'Jan 25, 2025', action: 'Track' },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'Completed') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium"><CheckCircle className="w-3 h-3" />{status}</span>;
  }
  if (status === 'In Escrow' || status === 'In Delivery') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#A3E635]/20 text-emerald-800 text-xs font-medium"><Clock className="w-3 h-3" />{status}</span>;
  }
  if (status === 'Disputed') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium"><XCircle className="w-3 h-3" />{status}</span>;
  }
  if (status === 'Payment Pending') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium"><Clock className="w-3 h-3" />{status}</span>;
  }
  if (status === 'Awaiting Confirmation') {
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"><Package className="w-3 h-3" />{status}</span>;
  }
  return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">{status}</span>;
}

function RiskBadge({ risk }: { risk: string }) {
  const color = risk === 'Low' ? 'bg-emerald-50 text-emerald-700' : risk === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700';
  return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>{risk}</span>;
}

export default function SellerOrders() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeTab === 'All Orders'
    ? allOrders
    : allOrders.filter(o => {
        if (activeTab === 'Payment Pending') return o.status === 'Payment Pending';
        if (activeTab === 'In Escrow') return o.status === 'In Escrow';
        if (activeTab === 'In Delivery') return o.status === 'In Delivery';
        if (activeTab === 'Awaiting Confirmation') return o.status === 'Awaiting Confirmation';
        if (activeTab === 'Completed') return o.status === 'Completed';
        if (activeTab === 'Disputed') return o.status === 'Disputed';
        return true;
      });

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
            <p className="mt-1 text-sm text-slate-500">Track and manage all your orders and escrow transactions</p>
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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => { setActiveTab(tab.label); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.label
                  ? 'bg-[#A3E635] text-black'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">No orders found for this filter</h3>
              <p className="text-sm text-slate-500">Try selecting a different tab to view your orders.</p>
            </div>
          ) : (
            <>
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
                    {filtered.map((order, i) => (
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
              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex items-center gap-1">
                  {[1, 2].map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page ? 'bg-[#A3E635] text-black' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(2, p + 1))}
                  disabled={currentPage === 2}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
