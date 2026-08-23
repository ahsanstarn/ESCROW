import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PlatformAnalytics } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.analytics.platform();
      setAnalytics(res.data);
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading || !analytics) {
    return <LoadingSpinner fullScreen message="Loading dashboard..." />;
  }

  const statCards = [
    { label: 'No. of users', value: analytics.users.total || 3000, data: [30, 45, 35, 50, 65, 55, 70] },
    { label: 'No. of transactions', value: analytics.overview.totalEscrows || 3000, data: [20, 35, 45, 40, 55, 60, 50] },
    { label: 'No. of transaction Volume in USD', value: `$${analytics.overview.totalVolume || 3000}`, data: [40, 30, 50, 45, 60, 55, 65] },
    { label: 'Transaction Fee in USD', value: `$${analytics.overview.totalFeesCollected || 3000}`, data: [25, 35, 40, 50, 45, 55, 60] },
    { label: 'Chargeback rate in USD', value: `$${analytics.overview.disputeRate || 3000}`, data: [35, 25, 40, 30, 45, 35, 50] },
    { label: 'Dispute rate in USD', value: `$${analytics.overview.disputeRate || 3000}`, data: [30, 40, 35, 45, 40, 50, 45] },
  ];

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <p className="text-sm text-slate-500 mb-1">Dashboard</p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900">Welcome back, Admin</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mb-3">{stat.value}</p>
              <div className="flex items-end gap-1 h-8">
                {stat.data.map((val, j) => (
                  <div key={j} className="flex-1 bg-[#A3E635] rounded-sm" style={{ height: `${val}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
