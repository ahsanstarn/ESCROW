import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  valueClassName?: string;
}

export function StatCard({ label, value, subtitle, icon, className = '', valueClassName = '' }: StatCardProps) {
  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="stat-label">{label}</p>
          <p className={`stat-value ${valueClassName}`}>{value}</p>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {icon && (
          <div className="p-2 bg-slate-800/50 rounded-lg text-slate-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
