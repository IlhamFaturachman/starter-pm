import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/api';

export type PendingMode = 'signup' | 'forgot';

interface AuthState {
  token: string | null;
  user: User | null;
  pendingEmail: string | null;
  pendingMode: PendingMode | null;
  setAuth: (token: string, user: User) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  setPendingEmail: (email: string, mode: PendingMode) => void;
  clearPending: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      pendingEmail: null,
      pendingMode: null,
      setAuth: (token, user) => set({ token, user }),
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      setPendingEmail: (email, mode) => set({ pendingEmail: email, pendingMode: mode }),
      clearPending: () => set({ pendingEmail: null, pendingMode: null }),
    }),
    { name: 'pmfe-auth' },
  ),
);
