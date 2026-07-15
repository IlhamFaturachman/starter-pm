import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useUiStore } from '@/store/uiStore';
import { cn } from '@/lib/cn';

const AUTO_DISMISS_MS = 4500;

const toneClass: Record<string, string> = {
  info: 'border-brand-blue/30 bg-white text-text-main-light dark:bg-card-bg-dark dark:text-text-main-dark',
  success:
    'border-emerald-500/40 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-100',
  warning:
    'border-amber-500/40 bg-amber-50 text-amber-900 dark:bg-amber-950/80 dark:text-amber-100',
  danger: 'border-red-500/40 bg-red-50 text-red-900 dark:bg-red-950/80 dark:text-red-100',
};

export function ToastViewport() {
  const toasts = useUiStore((s) => s.toasts);
  const removeToast = useUiStore((s) => s.removeToast);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback(
    (id: string) => {
      const t = timers.current.get(id);
      if (t) {
        clearTimeout(t);
        timers.current.delete(id);
      }
      removeToast(id);
    },
    [removeToast],
  );

  useEffect(() => {
    for (const toast of toasts) {
      if (timers.current.has(toast.id)) continue;
      const handle = setTimeout(() => dismiss(toast.id), AUTO_DISMISS_MS);
      timers.current.set(toast.id, handle);
    }
    return () => {
      /* keep timers across re-renders; cleaned on dismiss / unmount below */
    };
  }, [toasts, dismiss]);

  useEffect(() => {
    const active = timers.current;
    return () => {
      for (const handle of active.values()) clearTimeout(handle);
      active.clear();
    };
  }, []);

  const items = useMemo(() => toasts, [toasts]);

  if (items.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6"
      aria-live="polite"
      aria-relevant="additions"
    >
      {items.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={cn(
            'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg animate-[fadeIn_0.25s_ease-out]',
            toneClass[toast.tone] ?? toneClass.info,
          )}
        >
          <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className="shrink-0 rounded-md px-1.5 text-sm font-bold opacity-60 transition hover:opacity-100"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
