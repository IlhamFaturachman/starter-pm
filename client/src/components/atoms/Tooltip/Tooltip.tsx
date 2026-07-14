import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface TooltipProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ label, children, className }: TooltipProps) {
  return (
    <span className={cn('group/tooltip relative flex', className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-[calc(100%+0.75rem)] top-1/2 z-40 w-max -translate-y-1/2 rounded-md bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 dark:bg-slate-700"
      >
        {label}
      </span>
    </span>
  );
}
