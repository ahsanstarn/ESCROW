import { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { PlatformAnalytics, Dispute, DisputeStatus } from '@/types';
import { formatCurrency, formatDate, getDisputeStatusLabel, getDisputeStatusColor } from '@/lib/utils';
import { api } from '@/lib/api';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, TrendingUp, Users, DollarSign, Activity, CheckCircle } from 'lucide-react';

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'disputes' | 'users' | 'settings'>('overview');
  const [disputeFilter, setDisputeFilter] = useState<'all' | DisputeStatus>('all');

  const fetchData = useCallback(async () => {
    try {
      const [analyticsRes, disputesRes] = await Promise.all([
        api.analytics.platform(),
        api.disputes.list(),
      ]);
      setAnalytics(analyticsRes.data);
      setDisputes(disputesRes.data);
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredDisputes = disputeFilter === 'all' ? disputes : disputes.filter(d => d.status === disputeFilter);
  const openDisputes = disputes.filter(d => d.status === 'OPEN' || d.status === 'UNDER_REVIEW');

  if (loading || !analytics) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader
        title="Platform Overview"
        subtitle="Monitor escrow operations, disputes, and platform health"
        actions={
          <div className="flex gap-2">
            {(['overview', 'disputes', 'users', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab ? 'bg-slate-700 text-slate-200' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        }
      />

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Volume (30d)" value={formatCurrency(analytics.overview.totalVolume)} subtitle={`${analytics.overview.totalEscrows} total escrows`} icon={<DollarSign className="w-5 h-5" />} />
            <StatCard label="Active Escrows" value={analytics.overview.activeEscrows} subtitle="Currently in progress" icon={<Activity className="w-5 h-5" />} />
            <StatCard label="Fees Collected (30d)" value={formatCurrency(analytics.overview.totalFeesCollected)} subtitle="Platform revenue" icon={<TrendingUp className="w-5 h-5" />} />
            <StatCard label="Open Disputes" value={openDisputes.length} subtitle={`${analytics.overview.disputeRate}% dispute rate`} icon={<AlertTriangle className="w-5 h-5" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Users by Role</h3>
              <div className="space-y-3">
                {[
                  { label: 'Merchants', count: analytics.users.merchants, color: 'bg-brand-500' },
                  { label: 'Buyers', count: analytics.users.buyers, color: 'bg-trust-500' },
                  { label: 'Couriers', count: analytics.users.couriers, color: 'bg-caution-500' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm text-slate-400 flex-1">{item.label}</span>
                    <span className="text-sm font-medium text-slate-200">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Escrow Status Distribution</h3>
              <div className="space-y-3">
                {analytics.escrowsByStatus.map(item => {
                  const total = analytics.escrowsByStatus.reduce((s, i) => s + i._count, 0);
                  return (
                    <div key={item.status} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'RELEASED' ? 'bg-trust-500' :
                        item.status === 'DISPUTED' ? 'bg-danger-500' :
                        item.status === 'DELIVERED' ? 'bg-caution-500' : 'bg-brand-500'
                      }`} />
                      <span className="text-sm text-slate-400 flex-1">{item.status.replace('_', ' ')}</span>
                      <span className="text-sm font-medium text-slate-200">{item._count}</span>
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.status === 'RELEASED' ? 'bg-trust-500' :
                            item.status === 'DISPUTED' ? 'bg-danger-500' : 'bg-brand-500'
                          }`}
                          style={{ width: `${total > 0 ? (item._count / total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {analytics.recentEscrows.length > 0 && (
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Recent Escrows</h3>
              <div className="space-y-2">
                {analytics.recentEscrows.map(e => (
                  <Link key={e.id} to={`/escrow/${e.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-slate-400">{e.escrowCode}</span>
                      <span className="text-sm text-slate-300">{e.description}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`badge ${
                        e.status === 'RELEASED' ? 'badge-success' :
                        e.status === 'DISPUTED' ? 'badge-danger' :
                        e.status === 'DELIVERED' ? 'badge-caution' : 'badge-active'
                      }`}>{e.status}</span>
                      <span className="text-sm font-medium text-slate-200">{formatCurrency(e.amount)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'disputes' && (
        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-sm font-semibold text-slate-300">All Disputes</h2>
            <div className="flex gap-1 ml-auto">
              {(['all', 'OPEN', 'UNDER_REVIEW', 'RESOLVED', 'ESCALATED'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setDisputeFilter(f)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    disputeFilter === f ? 'bg-slate-700 text-slate-200' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {f === 'all' ? 'All' : f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {(analytics.disputesByStatus || []).map(item => (
              <StatCard
                key={item.status}
                label={item.status.replace('_', ' ')}
                value={item._count}
                icon={<AlertTriangle className="w-5 h-5" />}
              />
            ))}
          </div>

          <div className="space-y-3">
            {filteredDisputes.length === 0 ? (
              <div className="card p-12 text-center">
                <CheckCircle className="w-10 h-10 text-trust-500/50 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No disputes found</p>
                <p className="text-slate-600 text-xs mt-1">All clear</p>
              </div>
            ) : (
              filteredDisputes.map(dispute => (
                <Link key={dispute.id} to={`/dispute/${dispute.id}`} className="card p-5 hover:border-slate-700/80 transition-all duration-200 block">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-mono text-slate-400">{dispute.escrow?.escrowCode}</p>
                        <span className={getDisputeStatusColor(dispute.status)}>{getDisputeStatusLabel(dispute.status)}</span>
                        <span className="badge-neutral">Tier {dispute.tier}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-200">{dispute.reason}</p>
                      <p className="text-sm text-slate-400 line-clamp-1">{dispute.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>Opened by: {dispute.opener?.name}</span>
                        <span>{formatDate(dispute.createdAt)}</span>
                        {dispute.outcome && (
                          <span className="text-trust-400">Outcome: {dispute.outcome.replace('_', ' ')}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-100">{dispute.escrow ? formatCurrency(dispute.escrow.amount) : '-'}</p>
                      <p className="text-[11px] text-slate-500">Escrow amount</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard label="Total Users" value={analytics.users.total} icon={<Users className="w-5 h-5" />} />
            <StatCard label="Merchants" value={analytics.users.merchants} icon={<Shield className="w-5 h-5" />} />
            <StatCard label="Buyers" value={analytics.users.buyers} icon={<Users className="w-5 h-5" />} />
            <StatCard label="Couriers" value={analytics.users.couriers} icon={<Users className="w-5 h-5" />} />
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-4 animate-slide-up">
          <div className="card p-6 max-w-2xl">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Platform Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">Default Confirmation Window (hours)</label>
                <input type="number" defaultValue={72} className="input-field mt-1" />
              </div>
              <div>
                <label className="text-xs text-slate-400">Maximum Confirmation Window (hours)</label>
                <input type="number" defaultValue={168} className="input-field mt-1" />
              </div>
              <div>
                <label className="text-xs text-slate-400">Platform Fee (basis points)</label>
                <input type="number" defaultValue={250} className="input-field mt-1" />
                <p className="text-[11px] text-slate-500 mt-1">250 basis points = 2.5%</p>
              </div>
              <div>
                <label className="text-xs text-slate-400">Maximum Escrow Amount</label>
                <input type="number" defaultValue={1000000} className="input-field mt-1" />
              </div>
              <button className="btn-primary">Save Configuration</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
