import { Link } from 'react-router-dom';
import { Escrow } from '@/types';
import { formatCurrency, formatDate, getEscrowStatusLabel, getEscrowStatusColor, getEscrowProgress } from '@/lib/utils';
import { ArrowRight, Clock, Package, AlertTriangle } from 'lucide-react';

interface EscrowCardProps {
  escrow: Escrow;
  showBuyer?: boolean;
  showMerchant?: boolean;
}

export function EscrowCard({ escrow, showBuyer, showMerchant }: EscrowCardProps) {
  const progress = getEscrowProgress(escrow.status);
  const hasDispute = escrow._count?.disputes && escrow._count.disputes > 0;

  return (
    <Link
      to={`/escrow/${escrow.id}`}
      className="card p-5 hover:border-slate-700/80 transition-all duration-200 group block"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-mono text-slate-400">{escrow.escrowCode}</p>
            {escrow.productType === 'PHYSICAL' ? (
              <Package className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">Digital</span>
            )}
          </div>
          <p className="text-sm text-slate-300 line-clamp-1">{escrow.description || 'No description'}</p>
        </div>
        <span className={getEscrowStatusColor(escrow.status)}>
          {getEscrowStatusLabel(escrow.status)}
        </span>
      </div>

      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="stat-label">Amount</p>
          <p className="text-lg font-semibold text-slate-100">{formatCurrency(escrow.amount)}</p>
        </div>
        {(showBuyer && escrow.buyer) && (
          <div className="text-right">
            <p className="stat-label">Buyer</p>
            <p className="text-sm text-slate-300">{escrow.buyer.name}</p>
          </div>
        )}
        {(showMerchant && escrow.merchant) && (
          <div className="text-right">
            <p className="stat-label">Seller</p>
            <p className="text-sm text-slate-300">{escrow.merchant.name}</p>
          </div>
        )}
        {escrow.disputeDeadline && escrow.status === 'DELIVERED' && (
          <div className="text-right">
            <div className="flex items-center gap-1 text-caution-400">
              <Clock className="w-3.5 h-3.5" />
              <p className="text-xs font-medium">Auto-release</p>
            </div>
            <p className="text-xs text-slate-500">{formatDate(escrow.disputeDeadline)}</p>
          </div>
        )}
      </div>

      <div className="relative h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
            escrow.status === 'RELEASED' ? 'bg-trust-500' :
            escrow.status === 'DISPUTED' ? 'bg-danger-500' :
            'bg-brand-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-[11px] text-slate-600">{formatDate(escrow.createdAt)}</p>
        <div className="flex items-center gap-1 text-slate-600 group-hover:text-slate-400 transition-colors">
          <span className="text-[11px]">View details</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>

      {hasDispute && (
        <div className="mt-3 flex items-center gap-2 text-caution-400 text-xs bg-caution-600/10 px-3 py-2 rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Active dispute on this transaction</span>
        </div>
      )}
    </Link>
  );
}
