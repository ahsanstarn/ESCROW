import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Zap, Package, DollarSign, TrendingUp, AlertTriangle, Settings } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function AgencyDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bulk' | 'finance' | 'disputes' | 'reports' | 'api'>('overview');

  const overviewData = {
    totalVolume: 138450.00,
    activeTransactions: 16,
    activeClients: 1,
    commission: 3461.25,
    weeklyVolume: [
      { day: 'Mon', amount: 12500 },
      { day: 'Tue', amount: 14200 },
      { day: 'Wed', amount: 13800 },
      { day: 'Thu', amount: 15100 },
      { day: 'Fri', amount: 12300 },
      { day: 'Sat', amount: 11200 },
      { day: 'Sun', amount: 13450 }
    ],
    escrowStatus: {
      held: 13,
      processing: 1,
      completed: 8,
      disputed: 2
    },
    recentTransactions: [
      { id: 'ORD-2026-0124', client: 'Tech Solutions Inc.', type: 'Product', amount: '$2,450', status: 'Funds Held', date: '24/01/2026' },
      { id: 'ORD-2026-0118', client: 'BuildCo LLC', type: 'Product', amount: '$8,750', status: 'Milestone 1', date: '15/01/2026' },
      { id: 'ORD-2026-0115', client: 'Metro Manufacturing', type: 'Service', amount: '$15,200', status: 'Dispute', date: '13/01/2026' }
    ]
  };

  const bulkOrdersData = {
    groups: [
      {
        id: 'bulk-001',
        company: 'Tech Solutions Inc.',
        status: 'Held in Escrow',
        orders: 26,
        type: 'SaaS Licenses',
        total: '$125,000.00',
        created: '15/01/2026'
      },
      {
        id: 'bulk-002',
        company: 'Global Logistics Co.',
        status: 'Pending Release',
        orders: 18,
        type: 'Hardware',
        total: '$89,500.00',
        created: '20/01/2026'
      },
      {
        id: 'bulk-003',
        company: 'Enterprise Services Ltd.',
        status: 'Completed',
        orders: 32,
        type: 'Consulting',
        total: '$156,000.00',
        created: '10/01/2026'
      },
      {
        id: 'bulk-004',
        company: 'Digital Marketing Pro',
        status: 'Held in Escrow',
        orders: 15,
        type: 'Services',
        total: '$67,800.00',
        created: '25/01/2026'
      }
    ]
  };

  const financeData = {
    available: 21050.00,
    held: 23550.00,
    pending: 23250.00,
    monthlyFlow: [
      { name: 'From Sample', amount: '$31K' },
      { name: 'To Sample', amount: '$52K' }
    ],
    payoutSchedule: [
      { day: 'Fri', amount: '$8,500' },
      { day: 'Wed', amount: '$18,000' },
      { day: 'Fri', amount: '$3,600' },
      { day: 'Wed', amount: '$21,667' }
    ],
    distribution: [
      { label: 'Initiated', count: '16', style: 'text-green-400' },
      { label: 'In-Transit', count: '4', style: 'text-blue-400' },
      { label: 'Deposited', count: '3', style: 'text-yellow-400' },
      { label: 'Released', count: '6', style: 'text-purple-400' },
      { label: 'Disputed', count: '6', style: 'text-red-400' }
    ]
  };

  const disputeData = {
    conversion: '+31%',
    chargeback: '-67%',
    duration: '3.2 days',
    score: '94/100',
    conversionData: [
      { month: 'Feb', value: 30 },
      { month: 'Mar', value: 50 },
      { month: 'Apr', value: 35 },
      { month: 'May', value: 55 },
      { month: 'Jun', value: 70 },
      { month: 'Jul', value: 55 }
    ],
    chargebackData: [
      { month: 'Feb', value: 80 },
      { month: 'Mar', value: 60 },
      { month: 'Apr', value: 75 },
      { month: 'May', value: 45 },
      { month: 'Jun', value: 35 },
      { month: 'Jul', value: 25 }
    ]
  };

  const reportsData = {
    conversionUplift: '+31%',
    conversionTrend: 'Last month',
    chargebackReduction: '-67%',
    chargebackTrend: 'Monthly chargeback rate',
    escrowDuration: '3.2 days',
    escrowTrend: 'Average escrow hold duration',
    trustScore: '94/100',
    trustTrend: 'Overall trust score',
    escrowDistribution: [
      { category: 'Same-Day', value: 340 },
      { category: '1-2 Days', value: 460 },
      { category: '3-5 Days', value: 892 },
      { category: '5-7 Days', value: 507 },
      { category: '7+ Days', value: 150 }
    ]
  };

  const apiData = {
    status: 'Active',
    requests: '1,247 requests',
    uptime: '99.7% uptime',
    apiKeys: [
      { name: 'Production API key', created: 'Jan 10, 2025', lastUsed: '2 hours ago', status: 'Active' },
      { name: 'Auto Key', created: 'Jan 10, 2025', lastUsed: '5 hours ago', status: 'Active' }
    ],
    webhooks: [
      { event: 'payment_held', endpoint: 'https://api.your-company.com/webhooks/escrow/webhook-id', status: 'active', lastTriggered: '2 hours ago' },
      { event: 'payment_released', endpoint: 'https://api.your-company.com/webhooks/escrow/webhook-id', status: 'active', lastTriggered: '5 hours ago' },
      { event: 'dispute.opened', endpoint: 'https://api.your-company.com/webhooks/disputes/opened', status: 'active', lastTriggered: '1 day ago' },
      { event: 'dispute.resolved', endpoint: 'https://api.your-company.com/webhooks/disputes/resolved', status: 'active', lastTriggered: '2 days ago' }
    ]
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Agency Dashboard"
        subtitle="Monitor all client transactions and performance metrics"
      />

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-slate-700 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: Zap },
          { id: 'bulk', label: 'Bulk Orders', icon: Package },
          { id: 'finance', label: 'Finance', icon: DollarSign },
          { id: 'disputes', label: 'Disputes & Risk', icon: AlertTriangle },
          { id: 'reports', label: 'Reports', icon: TrendingUp },
          { id: 'api', label: 'API', icon: Settings }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-brand-400 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Volume" value={formatCurrency(overviewData.totalVolume)} subtitle="All transactions" icon={<DollarSign className="w-5 h-5" />} />
            <StatCard label="Active Transactions" value={overviewData.activeTransactions} subtitle="Ongoing orders" icon={<Package className="w-5 h-5" />} />
            <StatCard label="Active Clients" value={overviewData.activeClients} subtitle="Using platform" icon={<Zap className="w-5 h-5" />} />
            <StatCard label="Commission Earned" value={formatCurrency(overviewData.commission)} subtitle="This month" icon={<TrendingUp className="w-5 h-5" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Weekly Transaction Volume</h3>
              <div className="flex items-end gap-2 h-40">
                {overviewData.weeklyVolume.map((metric, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-brand-400 to-green-400 rounded-t" style={{ height: `${(metric.amount / 15100) * 100}%` }}></div>
                    <p className="text-xs text-slate-400 mt-2">{metric.day}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Escrow Status Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Held</span>
                  <span className="text-sm font-semibold text-green-400">{overviewData.escrowStatus.held}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Processing</span>
                  <span className="text-sm font-semibold text-blue-400">{overviewData.escrowStatus.processing}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Completed</span>
                  <span className="text-sm font-semibold text-purple-400">{overviewData.escrowStatus.completed}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Disputed</span>
                  <span className="text-sm font-semibold text-red-400">{overviewData.escrowStatus.disputed}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Order ID</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Client</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Type</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Amount</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {overviewData.recentTransactions.map(tx => (
                    <tr key={tx.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-3 px-3 font-medium text-white">{tx.id}</td>
                      <td className="py-3 px-3 text-slate-300">{tx.client}</td>
                      <td className="py-3 px-3 text-slate-400">{tx.type}</td>
                      <td className="py-3 px-3 font-medium text-white">{tx.amount}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs">{tx.status}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Orders Tab */}
      {activeTab === 'bulk' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Managing 5 bulk order groups</h2>
            <button className="px-4 py-2 bg-brand-400 text-black rounded-lg font-medium hover:bg-brand-300">+ Create Bulk Order</button>
          </div>

          {bulkOrdersData.groups.map(group => (
            <div key={group.id} className="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{group.company}</h3>
                  <p className="text-sm text-slate-400">{group.orders} orders • {group.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{group.total}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded text-xs font-medium ${
                    group.status === 'Held in Escrow' ? 'bg-blue-900/30 text-blue-400' :
                    group.status === 'Pending Release' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-green-900/30 text-green-400'
                  }`}>
                    {group.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <span className="text-sm text-slate-400">Created: {group.created}</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-slate-700 text-white rounded text-sm hover:bg-slate-600">View Details</button>
                  <button className="px-3 py-1 bg-brand-400/10 text-brand-400 rounded text-sm hover:bg-brand-400/20">Release All</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Finance Tab */}
      {activeTab === 'finance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-sm text-slate-400 mb-2">Available</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(financeData.available)}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-sm text-slate-400 mb-2">Held in Escrow</p>
              <p className="text-2xl font-bold text-blue-400">{formatCurrency(financeData.held)}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-sm text-slate-400 mb-2">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{formatCurrency(financeData.pending)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Money Flow Diagram</h3>
              {financeData.monthlyFlow.map((flow, i) => (
                <div key={i} className="flex items-center justify-between mb-6">
                  <span className="text-sm text-slate-400">{flow.name}</span>
                  <span className="text-lg font-semibold text-white">{flow.amount}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Payout Schedule</h3>
              {financeData.payoutSchedule.map((payout, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg mb-2">
                  <span className="text-sm text-slate-400">{payout.day}</span>
                  <span className="text-sm font-semibold text-white">{payout.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Transaction Flow & Distribution</h3>
            <div className="grid grid-cols-5 gap-4">
              {financeData.distribution.map((item, i) => (
                <div key={i} className="text-center">
                  <p className={`text-2xl font-bold ${item.style}`}>{item.count}</p>
                  <p className="text-xs text-slate-400 mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Disputes Tab */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Conversion Uplift" value={disputeData.conversion} subtitle="vs. last month" icon={<TrendingUp className="w-5 h-5" />} valueClassName="text-green-400" />
            <StatCard label="Chargeback Reduction" value={disputeData.chargeback} subtitle="Monthly chargeback rate" icon={<TrendingUp className="w-5 h-5" />} valueClassName="text-green-400" />
            <StatCard label="Escrow Duration" value={disputeData.duration} subtitle="Average hold time" icon={<TrendingUp className="w-5 h-5" />} />
            <StatCard label="Trust Score" value={disputeData.score} subtitle="Overall score" icon={<TrendingUp className="w-5 h-5" />} valueClassName="text-green-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Conversion Uplift vs Escrow</h3>
              <div className="flex items-end gap-2 h-40">
                {disputeData.conversionData.map((metric, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-brand-400 to-green-400 rounded-t" style={{ height: `${metric.value}%` }}></div>
                    <p className="text-xs text-slate-400 mt-2">{metric.month}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Chargeback Reduction Trend</h3>
              <div className="flex items-end gap-2 h-40">
                {disputeData.chargebackData.map((metric, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-red-500 to-orange-500 rounded-t" style={{ height: `${metric.value}%` }}></div>
                    <p className="text-xs text-slate-400 mt-2">{metric.month}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="px-4 py-2 bg-brand-400 text-black rounded-lg font-medium hover:bg-brand-300">📊 Export Reports</button>
            <button className="px-4 py-2 bg-brand-400 text-black rounded-lg font-medium hover:bg-brand-300">📈 Export CSV</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-xs text-slate-400 mb-1">Conversion Uplift</p>
              <p className="text-3xl font-bold text-green-400">+31%</p>
              <p className="text-xs text-slate-500 mt-2">Last month</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-xs text-slate-400 mb-1">Chargeback Rate</p>
              <p className="text-3xl font-bold text-red-400">-67%</p>
              <p className="text-xs text-slate-500 mt-2">Monthly changes</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-xs text-slate-400 mb-1">Escrow Duration</p>
              <p className="text-3xl font-bold text-white">3.2</p>
              <p className="text-xs text-slate-500 mt-2">Average hold time</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-xs text-slate-400 mb-1">Trust Score</p>
              <p className="text-3xl font-bold text-blue-400">94/100</p>
              <p className="text-xs text-slate-500 mt-2">Overall rating</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Average Escrow Duration by Category</h3>
            <div className="space-y-3">
              {reportsData.escrowDistribution.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{item.category}</span>
                  <div className="flex-1 mx-4 bg-slate-700 rounded-full h-2">
                    <div className="bg-brand-400 h-2 rounded-full" style={{ width: `${(item.value / 892) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Tab */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="API Status" value={apiData.status} subtitle="All systems operational" icon={<Zap className="w-5 h-5" />} valueClassName="text-green-400" />
            <StatCard label="Requests Today" value={apiData.requests} subtitle="Within API limits" icon={<Package className="w-5 h-5" />} />
            <StatCard label="Uptime" value={apiData.uptime} subtitle="Last 30 days" icon={<TrendingUp className="w-5 h-5" />} valueClassName="text-blue-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">API Keys</h3>
                <button className="px-3 py-1 bg-brand-400 text-black rounded text-xs font-medium">Generate New Key</button>
              </div>
              <div className="space-y-3">
                {apiData.apiKeys.map((key, i) => (
                  <div key={i} className="p-3 bg-slate-800 rounded-lg">
                    <p className="text-sm font-medium text-white">{key.name}</p>
                    <p className="text-xs text-slate-400 mt-1">Created {key.created} • Last used {key.lastUsed}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Webhook Endpoints</h3>
                <button className="px-3 py-1 bg-brand-400 text-black rounded text-xs font-medium">Add Endpoint</button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {apiData.webhooks.map((webhook, i) => (
                  <div key={i} className="p-2 bg-slate-800 rounded text-xs">
                    <p className="text-white font-medium">{webhook.event}</p>
                    <p className="text-slate-400 truncate">{webhook.endpoint}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
