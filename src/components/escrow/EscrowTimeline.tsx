import { StateTransition, EscrowStatus } from '@/types';
import { formatDate, getEscrowStatusLabel } from '@/lib/utils';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface EscrowTimelineProps {
  transitions: StateTransition[];
}

const STATE_ORDER: EscrowStatus[] = ['CREATED', 'DEPOSITED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'CONFIRMED', 'RELEASED'];

export function EscrowTimeline({ transitions }: EscrowTimelineProps) {
  if (!transitions || transitions.length === 0) return null;

  const completedStates = new Set(transitions.map(t => t.toState));
  const currentState = transitions[transitions.length - 1]?.toState || 'CREATED';

  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-slate-300 mb-6">Transaction Progress</h3>
      <div className="flex items-center justify-between relative">
        {STATE_ORDER.map((state, index) => {
          const isCompleted = completedStates.has(state) || STATE_ORDER.indexOf(state) < STATE_ORDER.indexOf(currentState as EscrowStatus);
          const isCurrent = state === currentState;

          return (
            <div key={state} className="flex flex-col items-center flex-1 relative z-10">
              <div className="relative">
                {isCompleted && !isCurrent ? (
                  <CheckCircle className="w-6 h-6 text-trust-500" />
                ) : isCurrent ? (
                  <div className="relative">
                    <Circle className="w-6 h-6 text-escrow-500 fill-escrow-500/20" />
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-slate-700" />
                )}
              </div>
              <p className={`mt-2 text-[11px] font-medium text-center ${
                isCompleted ? 'text-trust-400' : isCurrent ? 'text-escrow-400' : 'text-slate-600'
              }`}>
                {getEscrowStatusLabel(state)}
              </p>
              {index < STATE_ORDER.length - 1 && (
                <div className={`absolute h-0.5 top-3 ${
                  isCompleted ? 'bg-trust-600/50' : 'bg-slate-800'
                }`} style={{ left: 'calc(50% + 1rem)', width: 'calc(100% - 2rem)', zIndex: -1 }} />
              )}
            </div>
          );
        })}
      </div>
      {transitions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-800/50">
          <div className="space-y-3">
            {transitions.slice(-5).reverse().map((t) => (
              <div key={t.id} className="flex items-center gap-3 text-xs">
                <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span className="text-slate-400">
                  {getEscrowStatusLabel(t.fromState as EscrowStatus)} → {getEscrowStatusLabel(t.toState as EscrowStatus)}
                </span>
                {t.reason && <span className="text-slate-600">— {t.reason}</span>}
                <span className="ml-auto text-slate-600">{formatDate(t.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
