import { useState } from 'react';
import { Zap, Activity, CheckCircle, Plus, Copy, Eye, Trash2, FileCode, BookOpen, Globe, Server, Clock, Key } from 'lucide-react';

export default function AgencyApi() {
  const [apiKey] = useState('sk_live_••••••••••••••••••••••••••••••••');

  const stats = [
    { label: 'API Status', value: 'Active', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50', sub: 'All systems operational' },
    { label: 'Requests Today', value: '1,247', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50', sub: 'Within API limits' },
    { label: 'Success Rate', value: '99.7%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', sub: 'Last 30 days' },
  ];

  const webhooks = [
    { event: 'payment.held', endpoint: 'https://api.your-company.com/webhooks/escrow/held', status: 'Active', lastTriggered: '2 hours ago' },
    { event: 'payment.released', endpoint: 'https://api.your-company.com/webhooks/escrow/released', status: 'Active', lastTriggered: '5 hours ago' },
    { event: 'dispute.opened', endpoint: 'https://api.your-company.com/webhooks/disputes/opened', status: 'Active', lastTriggered: '1 day ago' },
    { event: 'dispute.resolved', endpoint: 'https://api.your-company.com/webhooks/disputes/resolved', status: 'Active', lastTriggered: '2 days ago' },
  ];

  const recentActivity = [
    { method: 'POST', endpoint: '/v1/escrows', status: '200 OK', time: '2 min ago' },
    { method: 'GET', endpoint: '/v1/escrows/esc_123', status: '200 OK', time: '5 min ago' },
    { method: 'POST', endpoint: '/v1/payments/release', status: '201 Created', time: '12 min ago' },
    { method: 'GET', endpoint: '/v1/disputes', status: '200 OK', time: '18 min ago' },
    { method: 'DELETE', endpoint: '/v1/webhooks/wh_456', status: '204 No Content', time: '32 min ago' },
    { method: 'POST', endpoint: '/v1/bulk-orders', status: '201 Created', time: '45 min ago' },
  ];

  const getMethodStyle = (method: string) => {
    switch (method) {
      case 'POST': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'GET': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'DELETE': return 'bg-red-50 text-red-700 border border-red-200';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  const getStatusStyle = (status: string) => {
    if (status.startsWith('2')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (status.startsWith('4')) return 'bg-amber-50 text-amber-700 border border-amber-200';
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="bg-[#f0f5f0] min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">API & Webhooks</h1>
        <p className="mt-1 text-sm text-slate-500">Manage API keys, webhook endpoints, and monitor activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 lg:mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 ${stat.bg} rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* API Keys + Webhooks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
        {/* API Keys */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-slate-900">API Keys</h3>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-black bg-[#A3E635] hover:bg-[#84cc16] rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" /> Generate New Key
            </button>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-900">Production API Key</span>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5" /> Active
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <code className="flex-1 px-3 py-2 bg-white rounded-lg text-sm font-mono text-slate-600 border border-slate-200 truncate">
                {apiKey}
              </code>
              <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors" title="Copy">
                <Copy className="w-4 h-4 text-slate-500" />
              </button>
              <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors" title="Reveal">
                <Eye className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">Created Jan 10, 2025 • Last used 2 hours ago</p>
          </div>
        </div>

        {/* API Documentation Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-5">API Documentation</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">View Documentation</p>
                <p className="text-xs text-slate-500 mt-0.5">Comprehensive guides and tutorials</p>
              </div>
              <button className="ml-auto px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Open
              </button>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2 bg-emerald-50 rounded-lg flex-shrink-0">
                <FileCode className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">API Reference</p>
                <p className="text-xs text-slate-500 mt-0.5">Endpoint definitions and schemas</p>
              </div>
              <button className="ml-auto px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Open
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Endpoints Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6 lg:mb-8">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Webhook Endpoints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#A3E635]">
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Event Type</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider hidden md:table-cell">Endpoint URL</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider hidden md:table-cell">Last Triggered</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((wh, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 sm:px-4 lg:px-6">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-900">{wh.event}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 text-slate-600 truncate max-w-[200px] hidden md:table-cell">{wh.endpoint}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5" /> {wh.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 text-slate-500 hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {wh.lastTriggered}
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent API Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Recent API Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#A3E635]">
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Method</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider">Endpoint</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 text-xs font-semibold text-slate-900 uppercase tracking-wider hidden md:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((act, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 sm:px-4 lg:px-6">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${getMethodStyle(act.method)}`}>
                      {act.method}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 font-medium text-slate-900">{act.endpoint}</td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 hidden md:table-cell">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusStyle(act.status)}`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 lg:px-6 text-slate-500 hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {act.time}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
