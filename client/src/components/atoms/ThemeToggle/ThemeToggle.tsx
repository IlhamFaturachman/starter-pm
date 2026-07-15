import { useUiStore } from '@/store/uiStore';
import { cn } from '@/lib/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={cn(
        'relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full',
        'border border-slate-200 bg-slate-100 transition-colors duration-300',
        'hover:border-slate-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'dark:border-slate-600 dark:bg-slate-700 dark:focus-visible:ring-offset-slate-900',
        isDark && 'bg-slate-800 border-slate-700',
        className,
      )}
    >
      {/* Track fill */}
      <span
        className={cn(
          'absolute inset-0 rounded-full transition-opacity duration-300',
          isDark ? 'opacity-100 bg-slate-700' : 'opacity-0',
        )}
      />

      {/* Thumb */}
      <span
        className={cn(
          'relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-sm',
          'transform transition-transform duration-300 ease-in-out',
          isDark
            ? 'translate-x-7 bg-slate-900 text-amber-400'
            : 'translate-x-1 bg-white text-slate-500',
        )}
      >
        {isDark ? (
          /* Moon icon */
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586Z" />
          </svg>
        ) : (
          /* Sun icon */
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm4 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-.464 4.95.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm2.12-10.607a1 1 0 0 1 0 1.414l-.706.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.413 0ZM17 11a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2h1Zm-7 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM5.05 6.464A1 1 0 1 0 6.465 5.05l-.708-.707a1 1 0 0 0-1.414 1.414l.707.707Zm1.414 8.486-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414ZM4 11a1 1 0 1 0 0-2H3a1 1 0 1 0 0 2h1Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
