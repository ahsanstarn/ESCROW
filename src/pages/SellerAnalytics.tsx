import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Bell,
  User,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Star,
  Zap,
  ArrowRight,
  ChevronRight,
  Info,
} from 'lucide-react';

const performanceMetrics = [
  { label: 'Dispute Rate', value: '2.3%', subtitle: 'Last 30 days', icon: AlertTriangle, color: 'text-amber-600', good: true },
  { label: 'Fraud Risk Level', value: 'Low', subtitle: 'Risk profile', icon: Shield, color: 'text-emerald-600', good: true },
  { label: 'Avg Delivery Time', value: '4.2 days', subtitle: 'To buyer', icon: Clock, color: 'text-blue-600', good: true },
  { label: 'Auto-Release Success', value: '82%', subtitle: 'Success rate', icon: Zap, color: 'text-emerald-600', good: true },
  { label: 'Buyer Satisfaction', value: '4.6/5.0', subtitle: 'Overall score', icon: Star, color: 'text-amber-600', good: true },
];

const insights = [
  { title: 'Increase response speed to disputes', description: 'Sellers who respond within 24h have 40% higher win rates.', impact: 'High', icon: TrendingUp },
  { title: 'Upload tracking for all shipments', description: 'Orders with tracking have 90% fewer delivery disputes.', impact: 'Medium', icon: CheckCircle },
  { title: 'Optimize product descriptions', description: 'Clear descriptions reduce quality-related disputes by 25%.', impact: 'Low', icon: Info },
];

const monthlyTrend = [
  { month: 'Nov', delivered: 1200, trend: '↑120' },
  { month: 'Dec', delivered: 1440, trend: '↑240' },
  { month: 'Jan', delivered: 1560, trend: '↑120' },
  { month: 'Feb', delivered: 1680, trend: '↑120' },
  { month: 'Mar', delivered: 1320, trend: '↓360' },
  { month: 'Apr', delivered: 1240, trend: '↓80' },
  { month: 'May', delivered: 1560, trend: '↑320' },
];

const trustBreakdown = [
  { label: 'Transaction Volume', score: 92, color: 'bg-emerald-500' },
  { label: 'On-Time Delivery', score: 78, color: 'bg-blue-500' },
  { label: 'Dispute Resolution', score: 85, color: 'bg-[#A3E635]' },
  { label: 'Buyer Feedback', score: 88, color: 'bg-amber-500' },
  { label: 'Account Age', score: 95, color: 'bg-emerald-600' },
];

const recommendedActions = [
  { title: 'Enable instant payouts', description: 'Get funds in your account within minutes.', action: 'Enable' },
  { title: 'Complete advanced KYC', description: 'Unlock higher transaction limits.', action: 'Complete' },
  { title: 'Set up webhook alerts', description: 'Receive real-time order updates.', action: 'Configure' },
];

export default function SellerAnalytics() {
  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics & Trust</h1>
            <p className="mt-1 text-sm text-slate-500">Monitor performance metrics and build buyer trust</p>
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

        {/* Performance Metrics */}
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
          {/* Strategic Insights */}
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

          {/* Account Status */}
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
                <span className="text-sm font-medium text-emerald-700">Low</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Trust Score</span>
                <span className="text-sm font-bold text-slate-900">87/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Member Since</span>
                <span className="text-sm text-slate-900">Mar 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Month Performance Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">5-Month Performance Trend</h2>
          <div className="flex items-end gap-3 h-48 mb-4">
            {monthlyTrend.slice(-5).map((metric, i) => {
              const max = Math.max(...monthlyTrend.map(m => m.delivered));
              const height = (metric.delivered / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs font-medium text-slate-700 mb-1">{metric.delivered}</span>
                    <div className="w-full bg-[#A3E635] rounded-t-lg relative" style={{ height: `${height}%` }}>
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 whitespace-nowrap">{metric.trend}</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{metric.month}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#A3E635] rounded" /> Delivered Orders
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Trust Score Breakdown */}
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

          {/* Recommended Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Recommended Actions</h2>
            <div className="space-y-3">
              {recommendedActions.map((action, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{action.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-[#A3E635] text-black text-xs font-medium rounded-lg hover:bg-[#95d630] transition-colors">
                    {action.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
