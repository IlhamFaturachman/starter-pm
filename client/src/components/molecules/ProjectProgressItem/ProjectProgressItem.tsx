import { cn } from '@/lib/cn';

export type ProjectStatus = 'On Track' | 'At Risk' | 'Delayed';

const statusStyles: Record<ProjectStatus, string> = {
  'On Track': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  'At Risk': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Delayed: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

export interface ProjectProgressItemProps {
  name: string;
  progress: number;
  status: ProjectStatus;
  /** Hex color for the progress bar fill */
  barColor: string;
}

export function ProjectProgressItem({
  name,
  progress,
  status,
  barColor,
}: ProjectProgressItemProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
          {name}
        </span>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold', statusStyles[status])}>
            {status}
          </span>
          <span className="text-xs font-bold tabular-nums" style={{ color: barColor }}>
            {progress}%
          </span>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${progress}%`, background: barColor }}
        />
      </div>
    </div>
  );
}
