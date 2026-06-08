import { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Delivery, DeliveryStatus, User } from '@/types';
import { formatCurrency, formatDate, getDeliveryStatusLabel, getTrustScoreLabel, getTrustScoreColor } from '@/lib/utils';
import { api } from '@/lib/api';
import { Truck, MapPin, CheckCircle, Star, AlertTriangle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourierDashboardProps {
  userId?: string;
}

export function CourierDashboard({ userId }: CourierDashboardProps) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | DeliveryStatus>('all');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchData = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    try {
      const [deliveriesRes, userRes] = await Promise.all([
        api.deliveries.list(userId),
        api.users.get(userId),
      ]);
      setDeliveries(deliveriesRes.data);
      setCurrentUser(userRes.data);
    } catch { /* empty */ }
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalDeliveries = deliveries.length;
  const completedDeliveries = deliveries.filter(d => d.status === 'DELIVERED').length;
  const inTransit = deliveries.filter(d => d.status === 'IN_TRANSIT').length;
  const successRate = totalDeliveries > 0 ? ((completedDeliveries / totalDeliveries) * 100).toFixed(0) : '0';
  const filteredDeliveries = filter === 'all' ? deliveries : deliveries.filter(d => d.status === filter);

  const trustScore = currentUser?.trustScore ?? 88;

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-escrow-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader
        title="Courier Dashboard"
        subtitle="Your deliveries and trust performance"
      />

      <div className="space-y-6">
        <div className="card p-5 bg-caution-600/5 border-caution-600/15">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-caution-600/10 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-caution-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Late delivery may delay fund release</h3>
              <p className="text-sm text-slate-400 mt-1">
                Your delivery performance directly affects escrow outcomes. High on-time rates help ensure 
                smooth fund releases for sellers.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Deliveries"
            value={totalDeliveries}
            subtitle="All time"
            icon={<Truck className="w-5 h-5" />}
          />
          <StatCard
            label="Completed"
            value={completedDeliveries}
            subtitle={`${successRate}% success rate`}
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <StatCard
            label="In Transit"
            value={inTransit}
            subtitle="Currently being delivered"
            icon={<MapPin className="w-5 h-5" />}
          />
          <StatCard
            label="Trust Score"
            value={trustScore.toFixed(0)}
            subtitle={getTrustScoreLabel(trustScore)}
            icon={<Star className="w-5 h-5" />}
            valueClassName={getTrustScoreColor(trustScore)}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-slate-300">Your Deliveries</h2>
            <div className="flex gap-1 ml-auto">
              {(['all', 'IN_TRANSIT', 'DELIVERED', 'ASSIGNED'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    filter === f ? 'bg-slate-700 text-slate-200' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {f === 'all' ? 'All' : f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {filteredDeliveries.length === 0 ? (
            <div className="card p-12 text-center">
              <Package className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No deliveries found</p>
              <p className="text-slate-600 text-xs mt-1">Assigned deliveries will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDeliveries.map(delivery => (
                <Link
                  key={delivery.id}
                  to={`/escrow/${delivery.escrowId}`}
                  className="card p-5 hover:border-slate-700/80 transition-all duration-200 block"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-mono text-slate-400">{delivery.escrow?.escrowCode}</p>
                        <span className={`badge ${
                          delivery.status === 'DELIVERED' ? 'badge-success' :
                          delivery.status === 'IN_TRANSIT' ? 'badge-active' :
                          'badge-neutral'
                        }`}>
                          {getDeliveryStatusLabel(delivery.status)}
                        </span>
                        {delivery.escrow?.status === 'DISPUTED' && (
                          <span className="badge-danger">Disputed</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-300">{delivery.escrow?.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        {delivery.trackingId && <span>Tracking: {delivery.trackingId}</span>}
                        {delivery.carrier && <span>Carrier: {delivery.carrier}</span>}
                        {delivery.deliveredAt && <span>Delivered: {formatDate(delivery.deliveredAt)}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-100">
                        {delivery.escrow ? formatCurrency(delivery.escrow.amount) : '-'}
                      </p>
                      <p className="text-[11px] text-slate-500">Escrow value</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
