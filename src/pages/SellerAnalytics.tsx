import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import AccountHeader from '@/components/layout/AccountHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
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
    return <LoadingSpinner fullScreen message="Loading analytics..." />;
  }

  return (
    <div className="min-h-screen bg-[#ECF4E9] p-8 font-sans">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Trust</h1>
            <p className="text-sm text-gray-500 mt-1">Performance insights and trust score analytics</p>
          </div>
          <AccountHeader userId={userId} userName={userName} accountId={userId} />
        </div>

        <div>
          <div className="grid grid-cols-5 gap-4">
            {performanceMetrics.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both` }}>
                <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <span className="text-gray-400">↓</span> {stat.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 mt-6">Strategic Insights</h2>
          <div className="grid grid-cols-3 gap-4">
            {insights.map((insight, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex items-start gap-4" style={{ animation: `fadeInUp 0.5s ease-out ${0.5 + i * 0.1}s both` }}>
                <div className={`p-2 rounded-xl ${insight.impact === 'High' ? 'bg-[#BCF49D]/20 text-[#305941]' : 'bg-orange-50 text-orange-600'}`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full mb-2 inline-block ${insight.impact === 'High' ? 'bg-[#BCF49D]/20 text-[#305941]' : 'bg-orange-100 text-orange-800'}`}>
                    {insight.impact} Impact
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">{insight.title}</h4>
                  <p className="text-xs text-gray-500">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.8s both` }}>
          <h2 className="text-lg font-bold text-gray-900 mb-6">5-Month Performance Trend</h2>
          <div className="space-y-6">
            {monthlyTrend.map((m, i) => (
              <div key={i} className="flex items-center gap-8 text-sm">
                <div className="w-12 text-gray-500">{m.month}</div>
                <div className="flex-1 flex items-center gap-4">
                  <span className="w-16 text-xs text-gray-400">Revenue</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#DDFC95] rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <span className="w-12 font-bold">₹{m.delivered * 10}K</span>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <span className="w-16 text-xs text-gray-400">Disputes</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-800 rounded-full" style={{width: '20%'}}></div>
                  </div>
                  <span className="w-4 font-bold">{Math.round(m.delivered/3)}</span>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <span className="w-20 text-xs text-gray-400">Trust Score</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#DDFC95] rounded-full" style={{width: '90%'}}></div>
                  </div>
                  <span className="w-6 font-bold">92</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 0.9s both` }}>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Trust Score Breakdown</h2>
            <div className="space-y-6">
              {trustBreakdown.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-32 text-sm text-gray-500">{item.label}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#DDFC95] rounded-full" style={{width: `${item.score}%`}}></div>
                  </div>
                  <span className="text-sm font-bold">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animation: `fadeInUp 0.5s ease-out 1.0s both` }}>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Account Status</h2>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gray-200 rounded-lg"><Shield className="w-4 h-4 text-gray-600" /></div>
              <div>
                <p className="text-sm font-bold text-gray-900">Low Risk Account</p>
                <p className="text-xs text-gray-500">Auto-release enabled</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Risk Level</p>
                <p className="text-lg font-bold text-gray-900">Low</p>
                <p className="text-xs text-gray-400">This improves auto-release eligibility</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Account Age</p>
                <p className="text-lg font-bold text-gray-900">8 months</p>
                <p className="text-xs text-gray-400">Member since May 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
