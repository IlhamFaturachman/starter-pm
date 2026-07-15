import { SparklineChart } from '@/components/molecules/SparklineChart';
import { ProjectProgressItem } from '@/components/molecules/ProjectProgressItem';
import type { ProjectStatus } from '@/components/molecules/ProjectProgressItem';
import { cn } from '@/lib/cn';

const CHART_DATA = [42, 58, 45, 72, 65, 80, 78, 91, 87, 95, 88, 97];
const CHART_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const PROJECTS: {
  id: string;
  name: string;
  progress: number;
  status: ProjectStatus;
  barColor: string;
}[] = [
  { id: 'p1', name: 'Starter PM Frontend', progress: 68, status: 'On Track', barColor: '#0d9488' },
  { id: 'p2', name: 'Express API Backend', progress: 45, status: 'At Risk', barColor: '#d97706' },
  { id: 'p3', name: 'Mobile App v2', progress: 23, status: 'Delayed', barColor: '#e11d48' },
  { id: 'p4', name: 'DevOps Infrastructure', progress: 89, status: 'On Track', barColor: '#059669' },
];

const TEAM_AVATARS = [
  { init: 'AR', bg: '#0d9488' },
  { init: 'SK', bg: '#7c3aed' },
  { init: 'BM', bg: '#059669' },
  { init: 'DL', bg: '#d97706' },
  { init: 'RP', bg: '#2563eb' },
];

const cardBase = cn(
  'rounded-2xl bg-white p-5',
  'border border-slate-200 shadow-sm',
  'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
  'dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600',
);

/**
 * Organism: performance sparkline chart (left 2/3) +
 * active projects list with team avatars (right 1/3).
 */
export function DashboardPerformanceRow() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

      {/* ── Sparkline Chart card ── */}
      <div className={cn(cardBase, 'col-span-2 border-t-[3px] border-t-blue-500')}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Project Performance
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Velocity trend — 2026</p>
          </div>
          <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            +24% YTD ↑
          </span>
        </div>

        <SparklineChart data={CHART_DATA} labels={CHART_LABELS} color="#2563eb" />
      </div>

      {/* ── Active Projects card ── */}
      <div className={cn(cardBase, 'border-t-[3px] border-t-violet-500')}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Projects</h2>
          <button
            type="button"
            className="text-xs font-semibold text-violet-600 transition-opacity hover:opacity-70 dark:text-violet-400"
          >
            View all →
          </button>
        </div>

        <div className="space-y-4">
          {PROJECTS.map((p) => (
            <ProjectProgressItem key={p.id} {...p} />
          ))}
        </div>

        {/* Team avatar stack */}
        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-700">
          <p className="mb-2 text-xs font-medium text-slate-400 dark:text-slate-500">
            Team Members
          </p>
          <div className="flex items-center">
            {TEAM_AVATARS.map((av, i) => (
              <div
                key={av.init}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-800"
                style={{
                  background: av.bg,
                  marginLeft: i > 0 ? '-6px' : '0',
                  zIndex: 10 - i,
                }}
              >
                {av.init}
              </div>
            ))}
            <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">+3 more</span>
          </div>
        </div>
      </div>

    </div>
  );
}
