import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Eye, ArrowUpRight, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AgencyBulkOrders() {
  const [groups] = useState([
    {
      id: 'bulk-001',
      company: 'Tech Solutions Inc.',
      status: 'Held in Escro',
      orders: 24,
      type: 'SaaS Licenses',
      total: '$125,000.00',
      created: '15/01/2026',
      description: 'Annual SaaS license procurement for 450 enterprise seats across engineering and sales departments.',
    },
    {
      id: 'bulk-002',
      company: 'Global Logistics Co.',
      status: 'Pending Release',
      orders: 18,
      type: 'Hardware',
      total: '$89,500.00',
      created: '20/01/2026',
      description: 'Server hardware refresh including rack-mounted units, networking gear, and backup appliances.',
    },
    {
      id: 'bulk-003',
      company: 'Enterprise Services Ltd.',
      status: 'Completed',
      orders: 32,
      type: 'Consulting',
      total: '$156,000.00',
      created: '10/01/2026',
      description: 'Management consulting engagement for operational restructuring and process optimization.',
    },
    {
      id: 'bulk-004',
      company: 'Digital Marketing Pro',
      status: 'Held in Escro',
      orders: 15,
      type: 'Services',
      total: '$67,800.00',
      created: '25/01/2026',
      description: 'Multi-channel digital marketing campaign spanning Q1 with performance-based milestones.',
    },
    {
      id: 'bulk-005',
      company: 'Metro Manufacturing',
      status: 'Disputed',
      orders: 12,
      type: 'Raw Materials',
      total: '$45,200.00',
      created: '28/01/2026',
      description: 'Raw material supply agreement with quality verification at each delivery milestone.',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Held in Escro': return <Shield className="w-3.5 h-3.5" />;
      case 'Pending Release': return <ArrowUpRight className="w-3.5 h-3.5" />;
      case 'Completed': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'Disputed': return <AlertTriangle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Held in Escro': return 'bg-green-100 text-green-800';
      case 'Pending Release': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Disputed': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className=" min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Bulk Orders</h1>
          <p className="mt-1 text-sm text-slate-500">Managing {groups.length} bulk order groups</p>
        </div>
        <button onClick={() => alert('Create Bulk Order form would open here.')} className="inline-flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 hover:bg-[#84cc16] text-black font-semibold rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Create Bulk Order
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fadeInUp p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-slate-900">{group.company}</h3>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(group.status)}`}>
                    {getStatusIcon(group.status)}
                    {group.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{group.description}</p>
              </div>
              <div className="text-right ml-6">
                <p className="text-2xl font-bold text-slate-900">{group.total}</p>
                <p className="text-xs text-slate-500 mt-1">Created {group.created}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-5 py-4 border-y border-slate-100">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600"><span className="font-semibold text-slate-900">{group.orders}</span> orders</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Type: <span className="font-medium text-slate-900">{group.type}</span></span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">ID: <span className="font-medium text-slate-900">{group.id}</span></span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-500">
                  +{Math.max(0, group.orders - 3)}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => alert('Viewing details for ' + group.id)} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" /> View Details
                </button>
                <button onClick={() => alert('Release initiated for ' + group.company)} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-black border-b border-slate-100 hover:bg-[#84cc16] rounded-lg transition-colors">
                  <ArrowUpRight className="w-4 h-4" /> Release All
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
