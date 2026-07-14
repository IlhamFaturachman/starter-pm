import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  tone: 'info' | 'success' | 'warning' | 'danger';
}

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem('pmfe-theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* ignore */
  }
  return 'light';
}

interface UiState {
  sidebarOpen: boolean;
  theme: Theme;
  toasts: Toast[];
  toggleSidebar: () => void;
  setTheme: (t: Theme) => void;
  pushToast: (t: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  theme: getInitialTheme(),
  toasts: [],
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setTheme: (theme) => {
    try {
      localStorage.setItem('pmfe-theme', theme);
    } catch {
      /* ignore */
    }
    set({ theme });
  },
  pushToast: (t) =>
    set((s) => ({
      toasts: [...s.toasts, { ...t, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
