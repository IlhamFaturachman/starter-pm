import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface AuthCardProps {
  children: ReactNode;
  illustration?: ReactNode;
  className?: string;
}

export function AuthCard({ children, illustration, className }: AuthCardProps) {
  const hasIllustration = Boolean(illustration);
  return (
    <div className={cn('relative w-full', className)}>
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-blue to-brand-orange opacity-20 blur dark:opacity-30" />
      <div className="relative z-10 overflow-hidden rounded-2xl border border-border-light bg-card-bg-light shadow-xl transition-colors dark:border-border-dark dark:bg-card-bg-dark">
        <div
          className={cn(
            'p-8 animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)]',
            hasIllustration && 'md:p-12',
          )}
        >
          {!hasIllustration ? (
            <div>{children}</div>
          ) : (
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:items-center">
              <div>{children}</div>
              <div className="hidden justify-center md:flex md:items-center md:justify-center">
                {illustration}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
