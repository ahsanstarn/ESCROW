import { useCountdown } from '@/hooks/useFetch';
import { Shield, Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string | Date | null | undefined;
  label?: string;
}

export function CountdownTimer({ targetDate, label }: CountdownTimerProps) {
  const { hours, minutes, seconds, expired } = useCountdown(targetDate);

  if (expired) {
    return (
      <div className="card p-4 bg-trust-600/5 border-trust-600/15">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-trust-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-trust-400">Confirmation window has passed</p>
            <p className="text-xs text-slate-500">Funds will be released to the seller automatically</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4 bg-brand-600/5 border-brand-600/15">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-brand-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-400">{label || 'Auto-release in'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-xl font-mono font-semibold text-brand-400 tabular-nums">
              {String(hours).padStart(2, '0')}
            </div>
            <p className="text-[10px] text-slate-500">hrs</p>
          </div>
          <span className="text-lg text-slate-600">:</span>
          <div className="text-center">
            <div className="text-xl font-mono font-semibold text-brand-400 tabular-nums">
              {String(minutes).padStart(2, '0')}
            </div>
            <p className="text-[10px] text-slate-500">min</p>
          </div>
          <span className="text-lg text-slate-600">:</span>
          <div className="text-center">
            <div className="text-xl font-mono font-semibold text-brand-400 tabular-nums">
              {String(seconds).padStart(2, '0')}
            </div>
            <p className="text-[10px] text-slate-500">sec</p>
          </div>
        </div>
      </div>
    </div>
  );
}
