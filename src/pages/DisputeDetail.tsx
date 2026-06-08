import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Dispute, UserRole } from '@/types';
import { formatCurrency, formatDate, getDisputeStatusLabel, getDisputeStatusColor } from '@/lib/utils';
import { api } from '@/lib/api';
import { ArrowLeft, Shield, FileText, Upload, Clock, User, AlertTriangle, CheckCircle, Gavel } from 'lucide-react';

interface DisputeDetailProps {
  userId?: string;
  userRole?: UserRole;
}

export function DisputeDetail({ userId, userRole }: DisputeDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [loading, setLoading] = useState(true);
  const [newEvidence, setNewEvidence] = useState('');
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [resolution, setResolution] = useState({
    outcome: '',
    resolutionNotes: '',
  });

  useEffect(() => {
    if (!id) return;
    api.disputes.get(id).then(res => {
      setDispute(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const submitEvidence = async () => {
    if (!id || !newEvidence.trim()) return;
    try {
      await api.disputes.submitEvidence(id, {
        submittedBy: userId,
        type: 'TEXT',
        content: newEvidence,
      });
      const res = await api.disputes.get(id);
      setDispute(res.data);
      setNewEvidence('');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleResolve = async () => {
    if (!id || !resolution.outcome) return;
    setResolving(true);
    try {
      await api.disputes.resolve(id, {
        outcome: resolution.outcome,
        arbiterId: userId,
        resolutionNotes: resolution.resolutionNotes,
      });
      const res = await api.disputes.get(id);
      setDispute(res.data);
      setShowResolveForm(false);
      setResolution({ outcome: '', resolutionNotes: '' });
    } catch (err) {
      alert((err as Error).message);
    }
    setResolving(false);
  };

  const isAdmin = userRole === 'ADMIN';

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!dispute) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="card p-12 text-center">
          <p className="text-slate-400">Dispute not found</p>
          <button onClick={() => navigate(-1)} className="btn-secondary mt-4">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <PageHeader
        title={`Dispute — ${dispute.escrow?.escrowCode || 'Unknown'}`}
        subtitle={dispute.reason}
        actions={
          <div className="flex items-center gap-3">
            <span className={getDisputeStatusColor(dispute.status)}>
              {getDisputeStatusLabel(dispute.status)}
            </span>
            <span className="badge-neutral">Tier {dispute.tier}</span>
          </div>
        }
      />

      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Dispute Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-caution-400 mt-0.5" />
              <div>
                <p className="text-sm text-slate-200">{dispute.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800/50">
              <div>
                <p className="text-[11px] text-slate-500">Opened by</p>
                <p className="text-sm text-slate-200">{dispute.opener?.name || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Date opened</p>
                <p className="text-sm text-slate-200">{formatDate(dispute.createdAt)}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Escrow amount</p>
                <p className="text-sm font-semibold text-slate-100">
                  {dispute.escrow ? formatCurrency(dispute.escrow.amount) : '-'}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Resolution tier</p>
                <p className="text-sm text-slate-200">
                  {dispute.tier === 1 && 'Automated rule-based'}
                  {dispute.tier === 2 && 'Evidence-based arbitration'}
                  {dispute.tier === 3 && 'Manual admin decision'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Evidence</h3>
          <div className="space-y-3">
            {dispute.evidence && dispute.evidence.length > 0 ? (
              dispute.evidence.map(ev => (
                <div key={ev.id} className="p-4 bg-slate-800/30 rounded-lg border border-slate-800/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-700/50 rounded-lg">
                      <FileText className="w-4 h-4 text-brand-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge-neutral">{ev.type}</span>
                        <span className="text-[11px] text-slate-500">{formatDate(ev.createdAt)}</span>
                      </div>
                      {ev.content && <p className="text-sm text-slate-300">{ev.content}</p>}
                      {ev.url && <p className="text-xs text-brand-400 mt-1">{ev.url}</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">No evidence submitted yet</p>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/50">
            <h4 className="text-xs font-medium text-slate-400 mb-2">Submit Additional Evidence</h4>
            <textarea
              value={newEvidence}
              onChange={(e) => setNewEvidence(e.target.value)}
              className="input-field h-20 resize-none"
              placeholder="Describe additional evidence or paste relevant information..."
            />
            <div className="flex gap-2 mt-2">
              <button onClick={submitEvidence} disabled={!newEvidence.trim()} className="btn-primary text-sm">
                Submit Evidence
              </button>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Resolution Process</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-trust-600/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-trust-400" />
              </div>
              <div>
                <p className="text-sm text-slate-200">Dispute opened</p>
                <p className="text-xs text-slate-500">{formatDate(dispute.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                dispute.status !== 'OPEN' ? 'bg-trust-600/20' : 'bg-brand-600/20'
              }`}>
                {dispute.status !== 'OPEN' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-trust-400" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-brand-400" />
                )}
              </div>
              <div>
                <p className="text-sm text-slate-200">Evidence collection phase</p>
                <p className="text-xs text-slate-500">Both parties can submit evidence</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                dispute.status === 'RESOLVED' ? 'bg-trust-600/20' : 'bg-slate-700/50'
              }`}>
                {dispute.status === 'RESOLVED' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-trust-400" />
                ) : (
                  <User className="w-3.5 h-3.5 text-slate-500" />
                )}
              </div>
              <div>
                <p className={`text-sm ${dispute.status === 'RESOLVED' ? 'text-slate-200' : 'text-slate-400'}`}>Arbitration review</p>
                <p className="text-xs text-slate-600">{dispute.status === 'RESOLVED' ? 'Completed' : 'Pending'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                dispute.outcome ? 'bg-trust-600/20' : 'bg-slate-700/50'
              }`}>
                {dispute.outcome ? (
                  <CheckCircle className="w-3.5 h-3.5 text-trust-400" />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                )}
              </div>
              <div>
                <p className={`text-sm ${dispute.outcome ? 'text-slate-200' : 'text-slate-400'}`}>Resolution</p>
                <p className="text-xs text-slate-600">
                  {dispute.outcome ? dispute.outcome.replace('_', ' ') : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {isAdmin && dispute.status !== 'RESOLVED' && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Gavel className="w-4 h-4 text-brand-400" />
                Admin Resolution
              </h3>
              {!showResolveForm && (
                <button onClick={() => setShowResolveForm(true)} className="btn-primary text-sm flex items-center gap-2">
                  <Gavel className="w-4 h-4" />
                  Resolve Dispute
                </button>
              )}
            </div>

            {showResolveForm && (
              <div className="space-y-4 animate-slide-up">
                <div>
                  <label className="text-xs text-slate-400">Resolution Outcome</label>
                  <select
                    value={resolution.outcome}
                    onChange={(e) => setResolution({ ...resolution, outcome: e.target.value })}
                    className="input-field mt-1"
                  >
                    <option value="">Select an outcome</option>
                    <option value="FULL_REFUND">Full Refund to Buyer</option>
                    <option value="PARTIAL_REFUND">Partial Refund to Buyer</option>
                    <option value="FULL_RELEASE">Full Release to Seller</option>
                    <option value="PARTIAL_RELEASE">Partial Release to Seller</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Resolution Notes</label>
                  <textarea
                    value={resolution.resolutionNotes}
                    onChange={(e) => setResolution({ ...resolution, resolutionNotes: e.target.value })}
                    className="input-field mt-1 h-24 resize-none"
                    placeholder="Provide detailed reasoning for your decision..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-800/50">
                  <div>
                    <p className="text-[11px] text-slate-500">Escrow amount</p>
                    <p className="text-sm font-semibold text-slate-100">
                      {dispute.escrow ? formatCurrency(dispute.escrow.amount) : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Selected outcome</p>
                    <p className="text-sm font-medium text-slate-200">
                      {resolution.outcome ? resolution.outcome.replace('_', ' ') : '—'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleResolve}
                    disabled={resolving || !resolution.outcome}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Gavel className="w-4 h-4" />
                    {resolving ? 'Resolving...' : 'Confirm Resolution'}
                  </button>
                  <button onClick={() => setShowResolveForm(false)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="card p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Possible Outcomes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-800/50">
              <p className="text-sm font-medium text-slate-200 mb-1">Full Refund to Buyer</p>
              <p className="text-xs text-slate-500">All funds returned to the buyer's account</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-800/50">
              <p className="text-sm font-medium text-slate-200 mb-1">Full Release to Seller</p>
              <p className="text-xs text-slate-500">All funds released to the merchant</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-800/50">
              <p className="text-sm font-medium text-slate-200 mb-1">Partial Refund</p>
              <p className="text-xs text-slate-500">Split between buyer and seller based on assessment</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-800/50">
              <p className="text-sm font-medium text-slate-200 mb-1">Partial Release</p>
              <p className="text-xs text-slate-500">Portion released to seller, remainder refunded</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
