import { useSocketStore } from '@/store/socketStore';
import { useAuthStore } from '@/store/authStore';
import { DashboardStatsRow } from '@/components/organisms/DashboardStatsRow';
import { DashboardPerformanceRow } from '@/components/organisms/DashboardPerformanceRow';
import { DashboardBoardRow } from '@/components/organisms/DashboardBoardRow';
import { DashboardMetricsRow } from '@/components/organisms/DashboardMetricsRow';

const DEFAULT_PROFILE = { name: 'Raka Pratama', role: 'admin' as const };

export function DashboardPage() {
  const socketStatus = useSocketStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
  const profile = user ?? DEFAULT_PROFILE;
  const isOnline = socketStatus === 'connected';

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-full space-y-6">
      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
            {greeting},{' '}
            <span className="font-semibold text-violet-600 dark:text-violet-400">
              {profile.name}
            </span>{' '}
            👋
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Mission Control
          </h1>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            {now.toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Live connection badge */}
        <div
          className={[
            'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold',
            isOnline
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'border border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400',
          ].join(' ')}
        >
          <span
            className={[
              'h-1.5 w-1.5 rounded-full',
              isOnline ? 'bg-emerald-500' : 'bg-slate-400',
            ].join(' ')}
            style={{ animation: isOnline ? 'pulse 2s infinite' : 'none' }}
          />
          {isOnline ? 'Live · Syncing' : socketStatus}
        </div>
      </div>

      {/* ── KPI Stats ────────────────────────────────────────────── */}
      <DashboardStatsRow />

      {/* ── Performance Chart + Projects ─────────────────────────── */}
      <DashboardPerformanceRow />

      {/* ── Sprint Board + Activity Feed ─────────────────────────── */}
      <DashboardBoardRow />

      {/* ── Quick Metrics ────────────────────────────────────────── */}
      <DashboardMetricsRow />
    </div>
  );
}
