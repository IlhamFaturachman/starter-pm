import { useUiStore } from '@/store/uiStore';

export function ThemeToggle() {
  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="flex items-center gap-2 rounded-full border border-border-light bg-card-bg-light px-4 py-2 text-sm font-semibold text-text-main-light shadow-sm transition-all hover:shadow-md dark:border-border-dark dark:bg-card-bg-dark dark:text-text-main-dark"
    >
      <span className={isDark ? 'hidden' : 'group block transition-transform hover:rotate-12'}>
        🌙
      </span>
      <span className={isDark ? 'block' : 'hidden'}>☀️</span>
      <span className={isDark ? 'hidden' : 'block'}>Dark</span>
      <span className={isDark ? 'block' : 'hidden'}>Light</span>
    </button>
  );
}
