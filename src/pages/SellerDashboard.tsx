import { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Wallet, AlertTriangle, TrendingUp, Settings, Zap, HelpCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';

interface SellerDashboardProps {
  userId?: string;
}

export function SellerDashboard({ userId }: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'wallet' | 'disputes' | 'analytics' | 'api' | 'settings'>('overview');
  const [walletData, setWalletData] = useState({
    availableBalance: 124560,
    pendingBalance: 345200,
    platformFee: 12340,
    reserved: 25000,
    payoutMethods: [
      { id: '1', type: 'HDFC Bank', label: 'HDFC Bank ****2132', verified: true, status: 'Verified' },
      { id: '2', type: 'UPI', label: 'seller@okhdfcbank', verified: true, status: 'Verified' }
    ],
    payoutHistory: [
      { id: 'PO-1234', amount: 95000, method: 'HDFC Bank', status: 'Completed', date: 'Jan 15, 2025' },
      { id: 'PO-1233', amount: 125000, method: 'HDFC Bank', status: 'Completed', date: 'Jan 15, 2025' },
      { id: 'PO-1232', amount: 65000, method: 'UPI', status: 'Processing', date: 'Jan 9, 2025' },
      { id: 'PO-1231', amount: 57500, method: 'HDFC Bank', status: 'Completed', date: 'Jan 9, 2025' }
    ]
  });

  const [disputeData, setDisputeData] = useState({
    activeDisputes: 2,
    incomingResponse: 1,
    resolved: 8,
    winRate: '72%',
    disputes: [
      { id: 'DSP-001', orderId: 'ORD-2025-0113', buyer: 'TechCorp Ltd.', reason: 'Product quality does not match description', amount: 135200, status: 'Under Review', severity: 'high' },
      { id: 'DSP-002', orderId: 'ORD-2025-0114', buyer: 'Sigma M.', reason: 'Item not received', amount: 50200, status: 'Action Required', severity: 'high' },
      { id: 'DSP-003', orderId: 'ORD-2025-0115', buyer: 'Michael B.', reason: 'Quality issue', amount: 24500, status: 'Pending Review', severity: 'medium' }
    ]
  });

  const [analyticsData, setAnalyticsData] = useState({
    dispatchRate: '2.3%',
    fraudAlert: 'Low',
    avgDelivery: '4.2 days',
    autoResolution: '82%',
    buyerSatisfaction: '4.6/5.0',
    monthlyMetrics: [
      { month: 'Nov', delivered: 1200, trend: '↑120' },
      { month: 'Dec', delivered: 1440, trend: '↑240' },
      { month: 'Jan', delivered: 1560, trend: '↑120' },
      { month: 'Feb', delivered: 1680, trend: '↑120' },
      { month: 'Mar', delivered: 1320, trend: '↑120' },
      { month: 'Apr', delivered: 1240, trend: '↓80' },
      { month: 'May', delivered: 1560, trend: '↑320' }
    ]
  });

  const [apiData, setApiData] = useState({
    status: 'Active',
    requests: 'AI stats operational',
    usage: '99.98% Uptime',
    keys: [
      { id: 'prod_key_1', name: 'Production API Key', created: 'Jan 10, 2025', lastUsed: '2 hours ago', active: true },
      { id: 'test_key_1', name: 'Auto Key', created: 'Dec 10, 2024', lastUsed: '5 hours ago', active: true }
    ],
    webhooks: [
      { event: 'orders.created', url: 'https://api.your-company.com/webhooks/orders/created', status: 'active', lastTriggered: '2 hours ago' },
      { event: 'orders.updated', url: 'https://api.your-company.com/webhooks/orders/updated', status: 'active', lastTriggered: '5 hours ago' },
      { event: 'disputes.opened', url: 'https://api.your-company.com/webhooks/disputes/opened', status: 'active', lastTriggered: '1 day ago' },
      { event: 'disputes.resolved', url: 'https://api.your-company.com/webhooks/disputes/resolved', status: 'active', lastTriggered: '2 days ago' }
    ]
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Seller Dashboard"
        subtitle="Manage your escrows, payouts, and business metrics"
      />

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-slate-700 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: Wallet },
          { id: 'wallet', label: 'Wallet & Payouts', icon: Wallet },
          { id: 'disputes', label: 'Disputes', icon: AlertTriangle },
          { id: 'analytics', label: 'Analytics & Trust', icon: TrendingUp },
          { id: 'api', label: 'API & Webhooks', icon: Zap },
          { id: 'settings', label: 'Settings & Compliance', icon: Settings }
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
            <StatCard label="Available Balance" value={formatCurrency(walletData.availableBalance)} subtitle="Ready to withdraw" icon={<Wallet className="w-5 h-5" />} />
            <StatCard label="Pending Balance" value={formatCurrency(walletData.pendingBalance)} subtitle="Awaiting confirmation" icon={<TrendingUp className="w-5 h-5" />} />
            <StatCard label="Active Disputes" value={disputeData.activeDisputes} subtitle={`${disputeData.winRate} win rate`} icon={<AlertTriangle className="w-5 h-5" />} />
            <StatCard label="Buyer Satisfaction" value={analyticsData.buyerSatisfaction} subtitle="Based on reviews" icon={<TrendingUp className="w-5 h-5" />} />
          </div>
        </div>
      )}

      {/* Wallet Tab */}
      {activeTab === 'wallet' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-xs text-slate-400 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(walletData.availableBalance)}</p>
              <p className="text-xs text-slate-500 mt-2">Withdraw available</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-xs text-slate-400 mb-1">Pending Balance</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(walletData.pendingBalance)}</p>
              <p className="text-xs text-slate-500 mt-2">Awaiting confirmation</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-xs text-slate-400 mb-1">Platform Fee</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(walletData.platformFee)}</p>
              <p className="text-xs text-slate-500 mt-2">Monthly charges</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-xs text-slate-400 mb-1">Reserved</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(walletData.reserved)}</p>
              <p className="text-xs text-slate-500 mt-2">Dispute reserve</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Payout Methods</h3>
              <div className="space-y-3">
                {walletData.payoutMethods.map(method => (
                  <div key={method.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">{method.label}</p>
                      <p className="text-xs text-slate-400">{method.status}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs">{method.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-brand-400 text-black rounded-lg font-medium hover:bg-brand-300 transition">+ Add New</button>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">This Month</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Total Withdrawal</span>
                  <span className="text-sm font-semibold text-white">{formatCurrency(342500)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Commission Charges</span>
                  <span className="text-sm font-semibold text-white">{formatCurrency(12340)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Net Receivable</span>
                  <span className="text-sm font-semibold text-white">{formatCurrency(329160)}</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">✓ Withdraw Funds</button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Payout History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Transaction ID</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Amount</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Method</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {walletData.payoutHistory.map(payout => (
                    <tr key={payout.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                      <td className="py-3 px-3 text-white font-medium">{payout.id}</td>
                      <td className="py-3 px-3 text-white">{formatCurrency(payout.amount)}</td>
                      <td className="py-3 px-3 text-slate-400">{payout.method}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          payout.status === 'Completed' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{payout.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Disputes Tab */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Active Disputes" value={disputeData.activeDisputes} subtitle="Requires attention" icon={<AlertTriangle className="w-5 h-5" />} valueClassName="text-red-400" />
            <StatCard label="Incoming Response" value={disputeData.incomingResponse} subtitle="Awaiting buyer feedback" icon={<AlertTriangle className="w-5 h-5" />} valueClassName="text-yellow-400" />
            <StatCard label="Resolved (8)" value={disputeData.resolved} subtitle="This month" icon={<AlertTriangle className="w-5 h-5" />} valueClassName="text-green-400" />
            <StatCard label="Win Rate" value={disputeData.winRate} subtitle="All time" icon={<TrendingUp className="w-5 h-5" />} valueClassName="text-blue-400" />
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white mb-4">All Disputes</h3>
            <div className="space-y-3">
              {disputeData.disputes.map(dispute => (
                <div key={dispute.id} className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-white">{dispute.id} • {dispute.orderId}</p>
                      <p className="text-sm text-slate-400">{dispute.buyer} • {dispute.reason}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      dispute.severity === 'high' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {dispute.severity === 'high' ? '⚠️ High' : '⚡ Medium'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{formatCurrency(dispute.amount)}</p>
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        dispute.status === 'Under Review' ? 'bg-blue-900/30 text-blue-400' :
                        dispute.status === 'Action Required' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {dispute.status}
                      </span>
                      <button className="text-brand-400 hover:text-brand-300 text-sm font-medium">View Details →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Dispute Rate</p>
              <p className="text-2xl font-bold text-white">{analyticsData.dispatchRate}</p>
              <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Fraud Alert Level</p>
              <p className="text-2xl font-bold text-green-400">{analyticsData.fraudAlert}</p>
              <p className="text-xs text-slate-500 mt-1">Risk profile</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Avg. Delivery</p>
              <p className="text-2xl font-bold text-white">{analyticsData.avgDelivery}</p>
              <p className="text-xs text-slate-500 mt-1">To buyer</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Auto Resolution</p>
              <p className="text-2xl font-bold text-white">{analyticsData.autoResolution}</p>
              <p className="text-xs text-slate-500 mt-1">Success rate</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Buyer Satisfaction</p>
              <p className="text-2xl font-bold text-white">{analyticsData.buyerSatisfaction}</p>
              <p className="text-xs text-slate-500 mt-1">Overall score</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white mb-4">5-Month Performance Trend</h3>
            <div className="flex items-end gap-2 h-40">
              {analyticsData.monthlyMetrics.map((metric, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-brand-400 rounded-t" style={{ height: `${(metric.delivered / 1680) * 100}%` }}></div>
                  <p className="text-xs text-slate-400 mt-2">{metric.month}</p>
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
            <StatCard label="Requests Today" value={apiData.requests} subtitle="Within API limits" icon={<TrendingUp className="w-5 h-5" />} />
            <StatCard label="Uptime" value={apiData.usage} subtitle="Last 30 days" icon={<TrendingUp className="w-5 h-5" />} valueClassName="text-blue-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">API Keys</h3>
                <button className="px-3 py-1 bg-brand-400 text-black rounded text-xs font-medium hover:bg-brand-300">Generate New Key</button>
              </div>
              <div className="space-y-3">
                {apiData.keys.map(key => (
                  <div key={key.id} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <p className="text-sm font-medium text-white">{key.name}</p>
                    <p className="text-xs text-slate-400 mt-1">Created on Jan 10, 2025 • Last used 2 hours ago</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 bg-green-900/30 text-green-400 rounded">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Webhook Endpoints</h3>
                <button className="px-3 py-1 bg-brand-400 text-black rounded text-xs font-medium hover:bg-brand-300">Add Endpoint</button>
              </div>
              <div className="space-y-2">
                {apiData.webhooks.map((webhook, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <div>
                      <p className="text-sm font-medium text-white">{webhook.event}</p>
                      <p className="text-xs text-slate-400">{webhook.url}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded">active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Recent Webhook Events</h3>
            <div className="space-y-2 text-sm">
              {[
                { time: 'Today 2:45 PM', event: 'funds.received', status: 'Success', code: '200' },
                { time: 'Today 1:20 PM', event: 'orders.created', status: 'Success', code: '200' },
                { time: 'Yesterday 11:15 AM', event: 'disputes.opened', status: 'Failed', code: '500' },
                { time: 'Yesterday 3:30 PM', event: 'payments.released', status: 'Success', code: '200' }
              ].map((event, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-800 rounded">
                  <span className="text-slate-400">{event.time}</span>
                  <span className="font-medium text-white">{event.event}</span>
                  <span className={`text-xs px-2 py-1 rounded ${event.status === 'Success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Compliance & Verification</h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">KYC Verification</p>
                    <p className="text-xs text-slate-400">Identity & business verification</p>
                  </div>
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">Verified</span>
                </div>
                <div className="p-3 bg-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Business Verification (ITR)</p>
                    <p className="text-xs text-slate-400">Business document certified</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 text-xs rounded">In Progress</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm font-medium">Complete KYC</button>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Account Settings</h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">Account Email</p>
                  <p className="text-sm text-slate-400">seller@business.com</p>
                </div>
                <div className="p-3 bg-slate-800 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-400">Enabled</p>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm font-medium">Change Settings</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
