import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import type { User } from '@/types/api';

interface SetAuthOptions {
  remember?: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  pendingEmail: string | null;
  remember: boolean;
  setAuth: (token: string, user: User, options?: SetAuthOptions) => void;
  logout: () => void;
  setPendingEmail: (email: string) => void;
  clearPending: () => void;
}

const STORAGE_KEY = 'pmfe-auth';

/** Prefer localStorage when "remember me"; otherwise sessionStorage. */
const authStorage: StateStorage = {
  getItem: (name) => localStorage.getItem(name) ?? sessionStorage.getItem(name),
  setItem: (name, value) => {
    try {
      const parsed = JSON.parse(value) as { state?: { remember?: boolean } };
      const remember = parsed.state?.remember !== false;
      if (remember) {
        localStorage.setItem(name, value);
        sessionStorage.removeItem(name);
      } else {
        sessionStorage.setItem(name, value);
        localStorage.removeItem(name);
      }
    } catch {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      pendingEmail: null,
      remember: true,
      setAuth: (token, user, options) =>
        set({
          token,
          user,
          pendingEmail: null,
          remember: options?.remember !== false,
        }),
      logout: () =>
        set({
          token: null,
          user: null,
          pendingEmail: null,
        }),
      setPendingEmail: (email) => set({ pendingEmail: email }),
      clearPending: () => set({ pendingEmail: null }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => authStorage),
      partialize: (s) => ({
        token: s.token,
        user: s.user,
        pendingEmail: s.pendingEmail,
        remember: s.remember,
      }),
    },
  ),
);
