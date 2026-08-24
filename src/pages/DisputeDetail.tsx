import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Dispute, UserRole } from '@/types';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { 
  ArrowLeft, Shield, Package, CheckCircle2, AlertTriangle, 
  ChevronDown, ChevronUp, FileText, Send, Clock, Check
} from 'lucide-react';

interface DisputeDetailProps {
  userId?: string;
  userRole?: UserRole;
}

export function DisputeDetail({ userId, userRole }: DisputeDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'types' | 'case'>('types');

  // Accordion open/close states for the 3 dispute types columns
  const [col1Expanded, setCol1Expanded] = useState(true);
  const [col2Expanded, setCol2Expanded] = useState(true);
  const [col3Expanded, setCol3Expanded] = useState(true);

  // Evidence & Resolve states
  const [newEvidence, setNewEvidence] = useState('');
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    if (!id || id === 'overview' || id === 'types') return;
    setLoading(true);
    api.disputes.get(id).then(res => {
      setDispute(res.data);
      setActiveTab('case');
    }).catch(() => {
      // Fallback gracefully to types view
      setActiveTab('types');
    }).finally(() => setLoading(false));
  }, [id]);

  const handleAction = (type: string) => {
    showToast(`Action "${type}" performed successfully!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#0E1116] text-white p-4 sm:p-6 lg:p-10 font-sans">
      {/* Top Header / Back Nav */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link to="/seller/disputes" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Disputes
          </Link>
          
          <div className="flex items-center gap-2 bg-[#1A1F2B] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('types')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'types' ? 'bg-[#A3E635] text-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dispute Types Matrix
            </button>
            <button
              onClick={() => setActiveTab('case')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'case' ? 'bg-[#A3E635] text-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Case Details & Mediation
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white mb-2">
          Dispute Types & Workflows
        </h1>
        <p className="text-sm text-slate-400">
          Standardized escrow dispute resolution protocols, delivery verifications, and milestone approvals.
        </p>
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto py-20 flex justify-center">
          <LoadingSpinner message="Loading dispute workflow..." />
        </div>
      ) : activeTab === 'types' ? (
        /* ================= 3-COLUMN DISPUTE TYPES FIGMA SCREEN 23 ================= */
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          {/* COLUMN 1: Mark as Delivered */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-display font-bold text-white mb-1">Mark as Delivered</h2>
              <p className="text-xs text-slate-400">Item was Marked Delivered and needs to confirm the delivery.</p>
            </div>

            <div className="bg-[#131823] rounded-2xl border border-slate-800/80 p-4 flex flex-col gap-3 flex-1">
              {/* Collapsed Item */}
              <div 
                onClick={() => setCol1Expanded(!col1Expanded)}
                className="bg-[#1A2130] hover:bg-[#20293C] rounded-xl p-3.5 flex items-center justify-between cursor-pointer border border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Order #83421 – Mark as Delivered</p>
                    <span className="text-[10px] text-slate-400">12h left</span>
                  </div>
                </div>
                {col1Expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>

              {/* Expanded Card */}
              {col1Expanded && (
                <div className="bg-[#161D2C] rounded-xl p-4 border border-slate-800 animate-fade-in text-xs space-y-4">
                  <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800/60">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Order ID</span>
                      <span className="text-white font-semibold">#83421</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Buyer</span>
                      <span className="text-white font-semibold">Acme Corporation</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Amount</span>
                      <span className="text-white font-bold text-sm">$2,450.00</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Delivery Deadline</span>
                      <span className="text-amber-400 font-medium">Jan 29, 2026 - 10:30 PM</span>
                    </div>
                  </div>

                  <div className="bg-[#241A14] border border-amber-900/40 rounded-lg p-3 text-[11px] text-amber-200 leading-relaxed">
                    <span className="font-semibold text-amber-300 block mb-0.5">Action Required:</span>
                    Confirm delivery to avoid automatic dispute filing by buyer. Once confirmed, funds will be released within 24-48 hours after buyer verification period.
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button 
                      onClick={() => handleAction('Mark as Delivered')}
                      className="flex-1 py-2.5 px-3 bg-[#FF9900] hover:bg-[#E68A00] text-black font-bold rounded-lg text-xs transition-colors text-center"
                    >
                      Mark as Delivered
                    </button>
                    <button 
                      onClick={() => handleAction('View Details')}
                      className="py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium rounded-lg text-xs transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: Ready for Submission */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-display font-bold text-white mb-1">Ready for Submission</h2>
              <p className="text-xs text-slate-400">Item needs to be uploaded and request approval.</p>
            </div>

            <div className="bg-[#131823] rounded-2xl border border-slate-800/80 p-4 flex flex-col gap-3 flex-1">
              {/* Collapsed Item */}
              <div 
                onClick={() => setCol2Expanded(!col2Expanded)}
                className="bg-[#1A2130] hover:bg-[#20293C] rounded-xl p-3.5 flex items-center justify-between cursor-pointer border border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-lime-500/10 flex items-center justify-center text-[#A3E635]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Milestone 2 ready for submission</p>
                    <span className="text-[10px] text-slate-400">Order #83422</span>
                  </div>
                </div>
                {col2Expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>

              {/* Expanded Card */}
              {col2Expanded && (
                <div className="bg-[#161D2C] rounded-xl p-4 border border-slate-800 animate-fade-in text-xs space-y-4">
                  <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800/60">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Order ID</span>
                      <span className="text-white font-semibold">#83422</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Milestone</span>
                      <span className="text-white font-semibold">Phase 2 - Development</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Milestone Value</span>
                      <span className="text-white font-bold text-sm">$8,750.00</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Status</span>
                      <span className="text-[#A3E635] font-semibold">Ready for Submission</span>
                    </div>
                  </div>

                  <div className="bg-[#1C2618] border border-lime-900/40 rounded-lg p-3 text-[11px] text-lime-200 leading-relaxed">
                    <span className="font-semibold text-[#A3E635] block mb-0.5">Next Step:</span>
                    Upload deliverables and request milestone approval from buyer. Buyer has 72 hours to review. Funds auto-release if no objection raised.
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button 
                      onClick={() => handleAction('Submit Deliverables')}
                      className="flex-1 py-2.5 px-3 bg-[#A3E635] hover:bg-[#8fd824] text-black font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>↑</span> Submit Deliverables
                    </button>
                    <button 
                      onClick={() => handleAction('View Contract')}
                      className="py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium rounded-lg text-xs transition-colors"
                    >
                      View Contract
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 3: Dispute Raised */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-display font-bold text-white mb-1">Dispute Raised</h2>
              <p className="text-xs text-slate-400">Needs to be resolved within given time frame</p>
            </div>

            <div className="bg-[#131823] rounded-2xl border border-slate-800/80 p-4 flex flex-col gap-3 flex-1">
              {/* Collapsed Item */}
              <div 
                onClick={() => setCol3Expanded(!col3Expanded)}
                className="bg-[#1A2130] hover:bg-[#20293C] rounded-xl p-3.5 flex items-center justify-between cursor-pointer border border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Buyer raised a dispute – respond within 24h</p>
                    <span className="text-[10px] text-slate-400">ORD-2026-0121</span>
                  </div>
                </div>
                {col3Expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>

              {/* Expanded Card */}
              {col3Expanded && (
                <div className="bg-[#161D2C] rounded-xl p-4 border border-slate-800 animate-fade-in text-xs space-y-4">
                  <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800/60">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Order ID</span>
                      <span className="text-white font-semibold">ORD-2026-0121</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Opened By</span>
                      <span className="text-white font-semibold">Buyer</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Amount in Dispute</span>
                      <span className="text-rose-400 font-bold text-sm">$3,200.00</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">Opened On</span>
                      <span className="text-slate-300 font-medium">Jan 24, 2026</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1.5">Dispute Reason</span>
                    <div className="bg-[#241A1C] border border-rose-900/30 rounded-lg p-2.5 text-slate-200 font-medium">
                      Wrong item delivered
                    </div>
                  </div>

                  <div className="bg-[#2B171A] border border-rose-900/40 rounded-lg p-3 text-[11px] text-rose-200 leading-relaxed">
                    <span className="font-semibold text-rose-300 block mb-0.5">Action Required:</span>
                    Provide evidence and response within 24 hours to avoid resolution in buyer's favor. Upload documentation, photos, tracking information, or any evidence supporting your position.
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button 
                      onClick={() => handleAction('Respond to Dispute')}
                      className="flex-1 py-2.5 px-3 bg-[#D96B6B] hover:bg-[#c95858] text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" /> Respond to Dispute
                    </button>
                    <button 
                      onClick={() => setActiveTab('case')}
                      className="py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium rounded-lg text-xs transition-colors flex items-center gap-1"
                    >
                      <span>↗</span> View Full Case
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* ================= FULL CASE MEDIATION TIMELINE VIEW ================= */
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          {/* Dispute Status Card */}
          <div className="bg-[#131823] rounded-2xl border border-slate-800 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Dispute Reference</span>
                <h2 className="text-xl font-bold text-white">{dispute?.id || 'DSP-83421-2026'}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold">
                  Under Mediation
                </span>
                <span className="text-xs text-slate-400">Resolution window: 48h</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 py-6 border-b border-slate-800 text-sm">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Disputed Escrow Amount</span>
                <span className="text-2xl font-bold text-[#A3E635]">$3,200.00</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Reason Stated</span>
                <span className="text-white font-medium">Wrong specifications delivered</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Escrow Arbiter</span>
                <span className="text-white font-medium flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#A3E635]" /> Escro Trust Guard
                </span>
              </div>
            </div>

            {/* Evidence Submission Area */}
            <div className="pt-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">Submit Evidence & Documents</h3>
              <textarea
                value={newEvidence}
                onChange={(e) => setNewEvidence(e.target.value)}
                placeholder="Provide detailed context, tracking numbers, screenshot URLs, or agreement clauses..."
                rows={4}
                className="w-full bg-[#1A2130] border border-slate-700/80 rounded-xl p-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#A3E635]/50 focus:border-[#A3E635]"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if (newEvidence.trim()) {
                      showToast('Evidence submitted to arbitration panel', 'success');
                      setNewEvidence('');
                    }
                  }}
                  className="px-6 py-2.5 bg-[#A3E635] text-black font-bold rounded-xl text-sm hover:bg-[#8fd824] transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Evidence
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisputeDetail;
