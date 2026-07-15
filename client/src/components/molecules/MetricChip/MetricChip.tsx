import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface MetricChipProps {
  label: string;
  value: string;
  icon: ReactNode;
  /** Tailwind color key: 'emerald' | 'blue' | 'violet' | 'amber' */
  color: 'emerald' | 'blue' | 'violet' | 'amber';
}

const chipStyles: Record<
  MetricChipProps['color'],
  { iconWrap: string; value: string; border: string }
> = {
  emerald: {
    iconWrap: 'bg-emerald-50 dark:bg-emerald-900/30',
    value: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  blue: {
    iconWrap: 'bg-blue-50 dark:bg-blue-900/30',
    value: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
  },
  violet: {
    iconWrap: 'bg-violet-50 dark:bg-violet-900/30',
    value: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-800',
  },
  amber: {
    iconWrap: 'bg-amber-50 dark:bg-amber-900/30',
    value: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
  },
};

export function MetricChip({ label, value, icon, color }: MetricChipProps) {
  const s = chipStyles[color];
  return (
    <div
      className={cn(
        'flex items-center gap-3.5 rounded-2xl bg-white p-4',
        'border shadow-sm',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        'dark:bg-slate-800 dark:hover:border-slate-600',
        s.border,
      )}
    >
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl', s.iconWrap)}>
        {icon}
      </div>
      <div>
        <p className={cn('text-xl font-bold tabular-nums', s.value)}>{value}</p>
        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{label}</p>
      </div>
    </div>
  );
}
