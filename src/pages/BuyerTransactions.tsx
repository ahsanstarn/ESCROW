import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, ChevronLeft, ChevronRight } from 'lucide-react';

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
  { id: 'ORD-83421', seller: 'Acme Corporation', type: 'Product', amount: '$2,450', status: 'Funds Held', timer: 'Under review', action: 'View' },
  { id: 'ORD-83420', seller: 'TechStart Inc.', type: 'Service', amount: '$5,200', status: 'Funds Held', timer: 'Under review', action: 'View' },
  { id: 'ORD-83419', seller: 'BuildCo LLC', type: 'Product', amount: '$2,500', status: 'Dispute', timer: 'Under review', action: 'View' },
  { id: 'ORD-83418', seller: 'Cafe Network LLC', type: 'Product', amount: '$9,200', status: 'Funds Held', timer: 'Under review', action: 'View' },
  { id: 'ORD-83417', seller: 'SafeGuard Security', type: 'Service', amount: '$5,100', status: 'Funds Held', timer: 'Under review', action: 'View' },
  { id: 'ORD-83416', seller: 'Nova Systems', type: 'Product', amount: '$3,400', status: 'Pending', timer: '2h left', action: 'View' },
  { id: 'ORD-83415', seller: 'Peak Industries', type: 'Service', amount: '$15,600', status: 'Completed', timer: 'Released', action: 'View' },
  { id: 'ORD-83414', seller: 'Zenith Corp', type: 'Product', amount: '$7,800', status: 'Dispute', timer: 'Under review', action: 'View' },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Funds Held': 'bg-[#A3E635]/20 text-black',
    'Pending': 'bg-amber-100 text-amber-700',
    'Completed': 'bg-emerald-100 text-emerald-700',
    'Dispute': 'bg-red-100 text-red-600',
  };
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>;
}

export default function BuyerTransactions() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [page, setPage] = useState(1);

  const filtered = activeTab === 'All Orders' ? allOrders : allOrders.filter(o => {
    if (activeTab === 'Payment Pending') return o.status === 'Pending';
    if (activeTab === 'In Escrow') return o.status === 'Funds Held';
    if (activeTab === 'Completed') return o.status === 'Completed';
    if (activeTab === 'Disputed') return o.status === 'Dispute';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
            <p className="mt-1 text-sm text-slate-500">View and manage all your transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-sm relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">3</span>
            </button>
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm font-medium text-slate-700">Buyer</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.label}
              onClick={() => { setActiveTab(tab.label); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.label
                  ? 'bg-[#A3E635] text-black shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No orders found for this filter</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#A3E635]">
                      <th className="text-left py-3 px-6 text-xs font-semibold text-black uppercase tracking-wider">Order ID</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-black uppercase tracking-wider">Seller</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-black uppercase tracking-wider">Type</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-black uppercase tracking-wider">Amount</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-black uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-black uppercase tracking-wider">Timer</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-black uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-900">{order.id}</td>
                        <td className="py-4 px-6 text-slate-700">{order.seller}</td>
                        <td className="py-4 px-6 text-slate-600">{order.type}</td>
                        <td className="py-4 px-6 font-semibold text-slate-900">{order.amount}</td>
                        <td className="py-4 px-6"><StatusBadge status={order.status} /></td>
                        <td className="py-4 px-6 text-slate-500">{order.timer}</td>
                        <td className="py-4 px-6">
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">{order.action}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                <span className="text-sm text-slate-500">Showing 1 to {filtered.length} of {allOrders.length} entries</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40">
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#A3E635] text-black text-sm font-semibold">1</button>
                  <button onClick={() => setPage(2)} className="w-8 h-8 rounded-lg text-slate-600 text-sm hover:bg-slate-50">2</button>
                  <button onClick={() => setPage(p => Math.min(2, p + 1))} disabled={page === 2} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
