import type { ReactNode } from 'react';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { AuthCard } from '@/components/molecules/AuthCard';
import { AuthIllustration } from '@/components/organisms/AuthIllustration';
import { cn } from '@/lib/cn';

export interface AuthLayoutProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  withIllustration?: boolean;
}

export function AuthLayout({ title, subtitle, children, withIllustration }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-app-bg-light p-4 transition-colors duration-300 dark:bg-app-bg-dark lg:p-8">
      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div
        className={cn(
          'w-full transition-all duration-500 ease-in-out',
          withIllustration ? 'max-w-4xl' : 'max-w-lg',
        )}
      >
        <AuthCard illustration={withIllustration ? <AuthIllustration /> : undefined}>
          {!withIllustration && (
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {withIllustration && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark md:text-4xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm text-text-muted-light dark:text-text-muted-dark md:text-base">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </AuthCard>
      </div>
    </div>
  );
}
