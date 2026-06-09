import { Link } from 'react-router-dom';
import { Bell, User, AlertTriangle } from 'lucide-react';

const ongoingOrders = [
  { id: 'ORD-83421', buyer: 'Acme Corporation', amount: '$2,450', status: 'Funds Held', action: 'View' },
  { id: 'ORD-83420', buyer: 'TechStart Inc.', amount: '$5,200', status: 'Funds Held', action: 'View' },
  { id: 'ORD-83419', buyer: 'BuildCo LLC', amount: '$2,500', status: 'Dispute', action: 'View' },
  { id: 'ORD-83418', buyer: 'Cafe Network LLC', amount: '$9,200', status: 'Funds Held', action: 'View' },
  { id: 'ORD-83417', buyer: 'SafeGuard Security', amount: '$5,100', status: 'Funds Held', action: 'View' },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'Funds Held') {
    return <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#A3E635]/20 text-black text-xs font-semibold">{status}</span>;
  }
  if (status === 'Dispute') {
    return <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">{status}</span>;
  }
  return <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">{status}</span>;
}

export default function BuyerOverview() {
  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Overview</h1>
            <p className="mt-1 text-sm text-slate-500">Track all your transactions and manage disputes</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 shadow-sm">
              <option>All Time</option>
              <option>This Month</option>
              <option>This Week</option>
            </select>
            <button className="px-4 py-2 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
              Add Money
            </button>
            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-sm relative">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-[#A3E635]">$52,000.00</p>
            <Link to="/buyer/transactions" className="text-sm text-blue-600 hover:text-blue-700 mt-3 inline-block">View Transactions →</Link>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">In Escrow</p>
            <p className="text-3xl font-bold text-[#A3E635]">$52,000.00</p>
            <Link to="/buyer/transactions" className="text-sm text-blue-600 hover:text-blue-700 mt-3 inline-block">View Transactions →</Link>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">In Disputes</p>
            <p className="text-3xl font-bold text-red-500">$3,200.00</p>
            <Link to="/buyer/disputes" className="text-sm text-blue-600 hover:text-blue-700 mt-3 inline-block">View Disputes →</Link>
          </div>
        </div>

        {/* Ongoing Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Ongoing Transactions</h2>
            <Link to="/buyer/transactions" className="px-4 py-2 bg-[#A3E635] text-black font-semibold text-sm rounded-lg hover:bg-[#b8ed5a] transition-colors">
              Add Escrow
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f0f5f0]">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Buyer</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {ongoingOrders.map((order, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{order.id}</td>
                    <td className="py-4 px-6 text-slate-700">{order.buyer}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{order.amount}</td>
                    <td className="py-4 px-6"><StatusBadge status={order.status} /></td>
                    <td className="py-4 px-6">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">{order.action}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
          <h2 className="font-bold text-slate-900 mb-4">Recent Actions</h2>
          <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-slate-900">Dispute Raised — Awaiting response from Seller</p>
              <p className="text-sm text-blue-600 mt-1 cursor-pointer hover:underline">Resolve Dispute →</p>
            </div>
            <span className="text-xs text-slate-400 whitespace-nowrap">2 hours ago</span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            You will receive a 5% cashback for every confirmed transaction and will receive refunds within 72 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
