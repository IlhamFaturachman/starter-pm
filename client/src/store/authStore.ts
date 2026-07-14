import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/api';

interface AuthState {
  token: string | null;
  user: User | null;
  pendingEmail: string | null;
  setAuth: (token: string, user: User) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  setPendingEmail: (email: string) => void;
  clearPending: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      pendingEmail: null,
      setAuth: (token, user) => set({ token, user }),
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      setPendingEmail: (email) => set({ pendingEmail: email }),
      clearPending: () => set({ pendingEmail: null }),
    }),
    { name: 'pmfe-auth' },
  ),
);
