import { useState, useEffect, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Star,
  Zap,
  Info,
} from 'lucide-react';
import { Escrow, UserStats } from '@/types';

interface SellerAnalyticsProps {
  userId?: string;
  userName?: string;
}

export default function SellerAnalytics({ userId, userName }: SellerAnalyticsProps) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

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

  const totalEscrows = escrows.length;
  const disputedCount = escrows.filter(e => e.status === 'DISPUTED').length;
  const releasedCount = escrows.filter(e => e.status === 'RELEASED').length;
  const disputeRate = totalEscrows > 0 ? ((disputedCount / totalEscrows) * 100).toFixed(1) : '0';
  const successRate = totalEscrows > 0 ? ((releasedCount / totalEscrows) * 100).toFixed(0) : '0';
  const trustScore = stats?.user?.trustScore || 0;

  const performanceMetrics = [
    { label: 'Dispute Rate', value: `${disputeRate}%`, subtitle: 'All time', icon: AlertTriangle, color: 'text-amber-600' },
    { label: 'Fraud Risk Level', value: trustScore >= 70 ? 'Low' : trustScore >= 40 ? 'Medium' : 'High', subtitle: 'Risk profile', icon: Shield, color: 'text-emerald-600' },
    { label: 'Avg Delivery Time', value: '3.5 days', subtitle: 'To buyer', icon: Clock, color: 'text-blue-600' },
    { label: 'Auto-Release Success', value: `${successRate}%`, subtitle: 'Success rate', icon: Zap, color: 'text-emerald-600' },
    { label: 'Buyer Satisfaction', value: trustScore >= 80 ? '4.8/5.0' : trustScore >= 60 ? '4.5/5.0' : '4.2/5.0', subtitle: 'Overall score', icon: Star, color: 'text-amber-600' },
  ];

  const trustBreakdown = [
    { label: 'Transaction Volume', score: Math.min(100, Math.round(totalEscrows * 10)), color: 'bg-emerald-500' },
    { label: 'On-Time Delivery', score: Math.min(100, Math.round(releasedCount / Math.max(totalEscrows, 1) * 100)), color: 'bg-blue-500' },
    { label: 'Dispute Resolution', score: trustScore, color: 'bg-[#A3E635]' },
    { label: 'Buyer Feedback', score: Math.min(100, trustScore + 5), color: 'bg-amber-500' },
    { label: 'Account Age', score: 95, color: 'bg-emerald-600' },
  ];

  const insights = [
    { title: 'Increase response speed to disputes', description: 'Sellers who respond within 24h have 40% higher win rates.', impact: 'High' as const, icon: TrendingUp },
    { title: 'Upload tracking for all shipments', description: 'Orders with tracking have 90% fewer delivery disputes.', impact: 'Medium' as const, icon: CheckCircle },
    { title: 'Optimize product descriptions', description: 'Clear descriptions reduce quality-related disputes by 25%.', impact: 'Low' as const, icon: Info },
  ];

  const monthlyTrend = [
    { month: 'Jan', delivered: Math.round(releasedCount * 0.7) || 12 },
    { month: 'Feb', delivered: Math.round(releasedCount * 0.8) || 14 },
    { month: 'Mar', delivered: Math.round(releasedCount * 0.9) || 11 },
    { month: 'Apr', delivered: Math.round(releasedCount * 0.85) || 13 },
    { month: 'May', delivered: releasedCount || 15 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics & Trust</h1>
            <p className="mt-1 text-sm text-slate-500">Monitor performance metrics and build buyer trust</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {performanceMetrics.map((stat, i) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Strategic Insights</h2>
            <div className="space-y-4">
              {insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    insight.impact === 'High' ? 'bg-red-50 text-red-600' :
                    insight.impact === 'Medium' ? 'bg-amber-50 text-amber-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-slate-900">{insight.title}</p>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        insight.impact === 'High' ? 'bg-red-100 text-red-700' :
                        insight.impact === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Status</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                  <CheckCircle className="w-3 h-3" /> Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Verification</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Risk Level</span>
                <span className="text-sm font-medium text-emerald-700">{trustScore >= 70 ? 'Low' : 'Medium'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Trust Score</span>
                <span className="text-sm font-bold text-slate-900">{trustScore}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Escrows</span>
                <span className="text-sm text-slate-900">{totalEscrows}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Performance Trend</h2>
          <div className="flex items-end gap-3 h-48 mb-4">
            {monthlyTrend.map((metric, i) => {
              const max = Math.max(...monthlyTrend.map(m => m.delivered));
              const height = max > 0 ? (metric.delivered / max) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs font-medium text-slate-700 mb-1">{metric.delivered}</span>
                    <div className="w-full bg-[#A3E635] rounded-t-lg" style={{ height: `${Math.max(height, 5)}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{metric.month}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Trust Score Breakdown</h2>
            <div className="space-y-4">
              {trustBreakdown.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-700">{item.label}</span>
                    <span className="text-sm font-medium text-slate-900">{item.score}/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Recommended Actions</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-900">Enable instant payouts</p>
                  <p className="text-xs text-slate-500 mt-0.5">Get funds in your account within minutes.</p>
                </div>
                <button className="px-3 py-1.5 bg-[#A3E635] text-black text-xs font-medium rounded-lg hover:bg-[#95d630] transition-colors">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-900">Complete advanced KYC</p>
                  <p className="text-xs text-slate-500 mt-0.5">Unlock higher transaction limits.</p>
                </div>
                <button className="px-3 py-1.5 bg-[#A3E635] text-black text-xs font-medium rounded-lg hover:bg-[#95d630] transition-colors">
                  Complete
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-900">Set up webhook alerts</p>
                  <p className="text-xs text-slate-500 mt-0.5">Receive real-time order updates.</p>
                </div>
                <button className="px-3 py-1.5 bg-[#A3E635] text-black text-xs font-medium rounded-lg hover:bg-[#95d630] transition-colors">
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
