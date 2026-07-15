import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type StatTrend = 'up' | 'down' | 'neutral';
export type StatColor = 'teal' | 'violet' | 'amber' | 'rose' | 'blue' | 'emerald';

const colorStyles: Record<
  StatColor,
  { icon: string; stripe: string; trend: { text: string; bg: string } }
> = {
  teal: {
    icon: 'bg-teal-50 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400',
    stripe: 'bg-teal-500',
    trend: { text: 'text-teal-700 dark:text-teal-300', bg: 'bg-teal-50 dark:bg-teal-900/30' },
  },
  violet: {
    icon: 'bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
    stripe: 'bg-violet-500',
    trend: { text: 'text-violet-700 dark:text-violet-300', bg: 'bg-violet-50 dark:bg-violet-900/30' },
  },
  amber: {
    icon: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    stripe: 'bg-amber-500',
    trend: { text: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-900/30' },
  },
  rose: {
    icon: 'bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
    stripe: 'bg-rose-500',
    trend: { text: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-50 dark:bg-rose-900/30' },
  },
  blue: {
    icon: 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
    stripe: 'bg-blue-500',
    trend: { text: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  },
  emerald: {
    icon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
    stripe: 'bg-emerald-500',
    trend: { text: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  },
};

export interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: StatTrend;
  sub: string;
  color: StatColor;
  icon: ReactNode;
}

export function StatCard({ label, value, change, trend, sub, color, icon }: StatCardProps) {
  const c = colorStyles[color];
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '';
  const trendStyle =
    trend === 'up'
      ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-900/30'
      : trend === 'down'
        ? 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-900/30'
        : 'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-700';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white p-5',
        'border border-slate-200 shadow-sm',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        'dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600',
      )}
    >
      {/* Top color stripe */}
      <div className={cn('absolute inset-x-0 top-0 h-[3px] rounded-t-2xl', c.stripe)} />

      <div className="flex items-start justify-between">
        <span className={cn('rounded-xl p-2.5', c.icon)}>{icon}</span>
        <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-bold', trendStyle)}>
          {trendIcon} {change}
        </span>
      </div>

      <p className={cn('mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white')}>
        {value}
      </p>
      <p className={cn('mt-1 text-xs font-semibold uppercase tracking-widest', c.stripe.replace('bg-', 'text-'))}>
        {label}
      </p>
      <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{sub}</p>
    </div>
  );
}
