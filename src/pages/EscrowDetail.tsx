import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EscrowTimeline } from '@/components/escrow/EscrowTimeline';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { Escrow, UserRole } from '@/types';
import { formatCurrency, formatDate, getEscrowStatusLabel, getEscrowStatusColor } from '@/lib/utils';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ArrowLeft, Shield, Package, Clock, DollarSign, User, AlertTriangle, Truck, CheckCircle } from 'lucide-react';

interface EscrowDetailProps {
  userId?: string;
  userRole?: UserRole;
}

export function EscrowDetail({ userId, userRole }: EscrowDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [escrow, setEscrow] = useState<Escrow | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDesc, setDisputeDesc] = useState('');
  const [showShipForm, setShowShipForm] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [carrier, setCarrier] = useState('');

  useEffect(() => {
    if (!id) return;
    api.escrows.get(id).then(res => {
      setEscrow(res.data);
    }).catch(() => {
      showToast('Failed to load escrow details', 'error');
    }).finally(() => setLoading(false));
  }, [id, showToast]);

  const handleAction = async (action: string, data: any = {}) => {
    if (!id) return;
    setActionLoading(true);
    try {
      await api.escrows.action(id, action, data);
      const res = await api.escrows.get(id);
      setEscrow(res.data);
      setShowDisputeForm(false);
      setShowShipForm(false);
      showToast(`Action "${action}" completed successfully`, 'success');
    } catch (err) {
      showToast((err as Error).message || 'Action failed', 'error');
    }
    setActionLoading(false);
  };

  const handleDispute = async () => {
    if (!disputeReason.trim()) return;
    await handleAction('dispute', {
      openedById: userId,
      reason: disputeReason,
      description: disputeDesc,
    });
  };

  const handleShip = async () => {
    await handleAction('ship', { trackingId: trackingId || undefined, carrier: carrier || undefined });
  };

  const isMerchant = userRole === 'MERCHANT' || escrow?.merchantId === userId;
  const isBuyer = userRole === 'BUYER' || escrow?.buyerId === userId;
  const isCourier = userRole === 'COURIER' || escrow?.courierId === userId;

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <LoadingSpinner message="Loading escrow..." />
      </div>
    );
  }

  if (!escrow) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="card p-12 text-center">
          <p className="text-slate-400">Escro not found</p>
          <button onClick={() => navigate(-1)} className="btn-secondary mt-4">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <PageHeader
        title={escrow.escrowCode}
        subtitle={escrow.description || 'Escro transaction details'}
        actions={
          <div className="flex items-center gap-3">
            <span className={getEscrowStatusColor(escrow.status)}>
              {getEscrowStatusLabel(escrow.status)}
            </span>
          </div>
        }
      />

      <div className="space-y-6">
        {escrow.status === 'DELIVERED' && escrow.disputeDeadline && (
          <CountdownTimer
            targetDate={escrow.disputeDeadline}
            label="Your confirmation deadline — funds release automatically after this time"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-brand-400" />
              <h3 className="text-sm font-semibold text-slate-300">Transaction</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Amount</span>
                <span className="text-sm font-semibold text-slate-100">{formatCurrency(escrow.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Platform Fee</span>
                <span className="text-sm text-slate-300">{formatCurrency(escrow.platformFee)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2">
                <span className="text-sm text-slate-400">Seller Receives</span>
                <span className="text-sm font-semibold text-trust-400">
                  {formatCurrency(escrow.amount - escrow.platformFee)}
                </span>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-brand-400" />
              <h3 className="text-sm font-semibold text-slate-300">Parties</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] text-slate-500">Seller</p>
                <p className="text-sm text-slate-200">{escrow.merchant?.name || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Buyer</p>
                <p className="text-sm text-slate-200">{escrow.buyer?.name || 'Unknown'}</p>
              </div>
              {escrow.courierId && (
                <div>
                  <p className="text-[11px] text-slate-500">Courier</p>
                  <p className="text-sm text-slate-200">Assigned</p>
                </div>
              )}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <Package className="w-5 h-5 text-brand-400" />
              <h3 className="text-sm font-semibold text-slate-300">Delivery</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] text-slate-500">Type</p>
                <p className="text-sm text-slate-200">{escrow.productType === 'PHYSICAL' ? 'Physical Product' : 'Digital Service'}</p>
              </div>
              {escrow.trackingId && (
                <div>
                  <p className="text-[11px] text-slate-500">Tracking</p>
                  <p className="text-sm font-mono text-slate-200">{escrow.trackingId}</p>
                </div>
              )}
              {escrow.shipmentCarrier && (
                <div>
                  <p className="text-[11px] text-slate-500">Carrier</p>
                  <p className="text-sm text-slate-200">{escrow.shipmentCarrier}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {escrow.milestones && escrow.milestones.length > 0 && (
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Milestones</h3>
            <div className="space-y-3">
              {escrow.milestones.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      m.status === 'COMPLETED' ? 'bg-trust-500' :
                      m.status === 'IN_PROGRESS' ? 'bg-brand-500' : 'bg-slate-600'
                    }`} />
                    <div>
                      <p className="text-sm text-slate-200">{m.title}</p>
                      <p className="text-[11px] text-slate-500">{m.status.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-300">{formatCurrency(m.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {escrow.stateTransitions && escrow.stateTransitions.length > 0 && (
          <EscrowTimeline transitions={escrow.stateTransitions} />
        )}

        <div className="card p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Your Protection</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-brand-400 mt-0.5" />
              <div>
                <p className="text-sm text-slate-200">Funds are securely held in a segregated escrow ledger</p>
                <p className="text-xs text-slate-500 mt-1">The seller cannot access these funds until you confirm delivery</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-400 mt-0.5" />
              <div>
                <p className="text-sm text-slate-200">Auto-release protection</p>
                <p className="text-xs text-slate-500 mt-1">If no action is taken, funds release automatically after the confirmation window</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-caution-400 mt-0.5" />
              <div>
                <p className="text-sm text-slate-200">Dispute protection</p>
                <p className="text-xs text-slate-500 mt-1">You can open a dispute before the deadline if there is an issue with your order</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {escrow.status === 'DELIVERED' && isBuyer && (
            <button
              onClick={() => handleAction('confirm', { buyerId: userId })}
              disabled={actionLoading}
              className="btn-success flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {actionLoading ? 'Processing...' : 'Confirm Delivery & Release Funds'}
            </button>
          )}

          {escrow.status === 'DEPOSITED' && isMerchant && (
            <button
              onClick={() => setShowShipForm(!showShipForm)}
              className="btn-primary flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              Mark as Shipped
            </button>
          )}

          {(escrow.status === 'SHIPPED' || escrow.status === 'IN_TRANSIT') && isCourier && (
            <button
              onClick={() => handleAction('deliver', { courierId: userId })}
              disabled={actionLoading}
              className="btn-success flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {actionLoading ? 'Processing...' : 'Confirm Delivery'}
            </button>
          )}

          {['DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'].includes(escrow.status) && (
            <button
              onClick={() => setShowDisputeForm(!showDisputeForm)}
              className="btn-secondary flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Open a Dispute
            </button>
          )}

          {escrow.status === 'CREATED' && (
            <button
              onClick={() => handleAction('deposit', { buyerId: userId })}
              disabled={actionLoading}
              className="btn-primary flex items-center gap-2"
            >
              {actionLoading ? 'Processing...' : 'Deposit Funds'}
            </button>
          )}
        </div>

        {showShipForm && (
          <div className="card p-6 animate-slide-up">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Ship Order</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">Tracking ID</label>
                <input
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="input-field mt-1"
                  placeholder="e.g. TRK-1234567890"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Carrier</label>
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="input-field mt-1"
                >
                  <option value="">Select carrier</option>
                  <option value="FedEx">FedEx</option>
                  <option value="UPS">UPS</option>
                  <option value="DHL">DHL</option>
                  <option value="USPS">USPS</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={handleShip} disabled={actionLoading} className="btn-primary flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  {actionLoading ? 'Processing...' : 'Confirm Shipment'}
                </button>
                <button onClick={() => setShowShipForm(false)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showDisputeForm && (
          <div className="card p-6 animate-slide-up">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Open a Dispute</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">Reason</label>
                <select
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="input-field mt-1"
                >
                  <option value="">Select a reason</option>
                  <option value="Item not as described">Item not as described</option>
                  <option value="Item not received">Item not received</option>
                  <option value="Damaged or defective">Damaged or defective</option>
                  <option value="Service not delivered">Service not delivered</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  value={disputeDesc}
                  onChange={(e) => setDisputeDesc(e.target.value)}
                  className="input-field mt-1 h-24 resize-none"
                  placeholder="Describe the issue in detail..."
                />
              </div>
              <div className="flex gap-3">
                <button onClick={handleDispute} disabled={actionLoading || !disputeReason} className="btn-danger">
                  {actionLoading ? 'Submitting...' : 'Submit Dispute'}
                </button>
                <button onClick={() => setShowDisputeForm(false)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
