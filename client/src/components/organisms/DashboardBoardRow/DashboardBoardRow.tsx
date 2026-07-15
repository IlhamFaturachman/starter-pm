import { ActivityItem } from '@/components/molecules/ActivityItem';
import { cn } from '@/lib/cn';

/* ─── Kanban data ────────────────────────────────────────────────── */

type TagColor = 'teal' | 'violet' | 'amber' | 'rose' | 'blue';

const TAG_STYLES: Record<TagColor, { text: string; bg: string; border: string }> = {
  teal: {
    text: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    border: 'border-teal-200 dark:border-teal-700',
  },
  violet: {
    text: 'text-violet-700 dark:text-violet-300',
    bg: 'bg-violet-50 dark:bg-violet-900/30',
    border: 'border-violet-200 dark:border-violet-700',
  },
  amber: {
    text: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    border: 'border-amber-200 dark:border-amber-700',
  },
  rose: {
    text: 'text-rose-700 dark:text-rose-300',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    border: 'border-rose-200 dark:border-rose-700',
  },
  blue: {
    text: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-700',
  },
};

const COLUMNS: {
  id: string;
  label: string;
  count: number;
  dotColor: string;
  headerBg: string;
  tasks: { id: string; title: string; tag: string; tagColor: TagColor }[];
}[] = [
  {
    id: 'todo',
    label: 'To Do',
    count: 8,
    dotColor: '#64748b',
    headerBg: 'bg-slate-100 dark:bg-slate-700',
    tasks: [
      { id: 't1', title: 'Design System Update', tag: 'Design', tagColor: 'teal' },
      { id: 't2', title: 'API Integration Layer', tag: 'Backend', tagColor: 'violet' },
      { id: 't3', title: 'User Onboarding Flow', tag: 'UX', tagColor: 'amber' },
    ],
  },
  {
    id: 'inprogress',
    label: 'In Progress',
    count: 5,
    dotColor: '#2563eb',
    headerBg: 'bg-blue-50 dark:bg-blue-900/20',
    tasks: [
      { id: 't4', title: 'User Profile Page', tag: 'Feature', tagColor: 'blue' },
      { id: 't5', title: 'Mobile Notifications', tag: 'Bug', tagColor: 'rose' },
      { id: 't6', title: 'Search Indexing', tag: 'Feature', tagColor: 'violet' },
    ],
  },
  {
    id: 'review',
    label: 'In Review',
    count: 3,
    dotColor: '#7c3aed',
    headerBg: 'bg-violet-50 dark:bg-violet-900/20',
    tasks: [
      { id: 't7', title: 'Auth Refactor', tag: 'Security', tagColor: 'amber' },
      { id: 't8', title: 'Dashboard v2', tag: 'Feature', tagColor: 'teal' },
    ],
  },
  {
    id: 'done',
    label: 'Done',
    count: 12,
    dotColor: '#059669',
    headerBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    tasks: [
      { id: 't9', title: 'Kanban Board MVP', tag: 'Feature', tagColor: 'teal' },
      { id: 't10', title: 'CI/CD Pipeline', tag: 'DevOps', tagColor: 'violet' },
    ],
  },
];

/* ─── Activity data ─────────────────────────────────────────────── */

const ACTIVITIES = [
  { id: 'a1', user: 'Alex R.', initials: 'AR', avatarColor: '#0d9488', action: 'moved', target: '"Dashboard Redesign"', targetColor: '#0d9488', detail: 'to In Progress', time: '2m ago', isLatest: true },
  { id: 'a2', user: 'Sarah K.', initials: 'SK', avatarColor: '#7c3aed', action: 'commented on', target: '"Database Migration"', targetColor: '#7c3aed', detail: '"Great progress!"', time: '15m ago' },
  { id: 'a3', user: 'System', initials: '⚙', avatarColor: '#2563eb', action: 'deployed', target: 'Release v2.4.1', targetColor: '#2563eb', detail: '3 services updated', time: '1h ago' },
  { id: 'a4', user: 'Budi M.', initials: 'BM', avatarColor: '#059669', action: 'completed', target: '"CI/CD Pipeline"', targetColor: '#059669', detail: '100% test pass', time: '2h ago' },
  { id: 'a5', user: 'Dewi L.', initials: 'DL', avatarColor: '#d97706', action: 'created', target: '"Auth Refactor"', targetColor: '#d97706', detail: 'Sprint 14', time: '3h ago' },
];

/* ─── Shared card base ─────────────────────────────────────────── */

const cardBase = cn(
  'rounded-2xl bg-white p-5',
  'border border-slate-200 shadow-sm',
  'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
  'dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600',
);

/**
 * Organism: Sprint Board kanban preview (left 3/5) +
 * Activity Feed (right 2/5).
 */
export function DashboardBoardRow() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">

      {/* ── Sprint Board ── */}
      <div className={cn(cardBase, 'col-span-3 border-t-[3px] border-t-blue-500')}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Sprint Board</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Sprint 14 · July 2026</p>
          </div>
          <button
            type="button"
            className="text-xs font-semibold text-blue-600 transition-opacity hover:opacity-70 dark:text-blue-400"
          >
            Full Board →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.id} className="flex flex-col gap-2">
              {/* Column header */}
              <div className={cn('flex items-center gap-1.5 rounded-lg px-2 py-1', col.headerBg)}>
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: col.dotColor }}
                />
                <span
                  className="truncate text-[11px] font-bold uppercase tracking-wide"
                  style={{ color: col.dotColor }}
                >
                  {col.label}
                </span>
                <span
                  className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ background: col.dotColor }}
                >
                  {col.count}
                </span>
              </div>

              {/* Task cards */}
              {col.tasks.map((task) => {
                const ts = TAG_STYLES[task.tagColor];
                return (
                  <div
                    key={task.id}
                    className={cn(
                      'cursor-pointer rounded-lg p-2.5',
                      'border border-slate-200 bg-slate-50',
                      'transition-all duration-150 hover:-translate-y-0.5',
                      'dark:border-slate-600 dark:bg-slate-700/50 dark:hover:border-slate-500',
                    )}
                    style={{ transition: 'all 0.15s ease' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = col.dotColor + '60';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 8px ${col.dotColor}20`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '';
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                  >
                    <span
                      className={cn(
                        'mb-1.5 inline-block rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                        ts.text,
                        ts.bg,
                        ts.border,
                      )}
                    >
                      {task.tag}
                    </span>
                    <p className="text-xs font-medium leading-tight text-slate-600 dark:text-slate-300">
                      {task.title}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Activity Feed ── */}
      <div className={cn(cardBase, 'col-span-2 border-t-[3px] border-t-emerald-500')}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Activity Feed</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Real-time updates</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              style={{ animation: 'pulse 1.5s infinite' }}
            />
            LIVE
          </span>
        </div>

        <div className="space-y-1">
          {ACTIVITIES.map((a) => (
            <ActivityItem key={a.id} {...a} />
          ))}
        </div>
      </div>

    </div>
  );
}
