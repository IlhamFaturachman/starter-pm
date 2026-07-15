import { cn } from '@/lib/cn';

export interface ActivityItemProps {
  user: string;
  initials: string;
  /** Background color hex for avatar circle */
  avatarColor: string;
  action: string;
  target: string;
  /** Color for the target text */
  targetColor: string;
  detail: string;
  time: string;
  /** Highlight as the newest/latest item */
  isLatest?: boolean;
}

export function ActivityItem({
  user,
  initials,
  avatarColor,
  action,
  target,
  targetColor,
  detail,
  time,
  isLatest = false,
}: ActivityItemProps) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150',
        'hover:bg-slate-50 dark:hover:bg-slate-700/50',
        isLatest && [
          'bg-teal-50 dark:bg-teal-900/20',
          'border-l-[3px] border-teal-400 dark:border-teal-500',
        ],
        !isLatest && 'border-l-[3px] border-transparent',
      )}
      style={{ animation: isLatest ? 'fadeIn 0.4s ease' : 'none' }}
    >
      {/* Avatar */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ background: avatarColor }}
      >
        {initials}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <p className="text-xs leading-snug text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">{user}</span>{' '}
          {action}{' '}
          <span className="font-semibold" style={{ color: targetColor }}>
            {target}
          </span>
        </p>
        <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">{detail}</p>
        <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">{time}</p>
      </div>
    </div>
  );
}
