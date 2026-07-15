import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { useAuthStore } from '@/store/authStore';
import type { AuthResponse } from '@/types/api';

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  remember?: boolean;
}

export interface ForgotPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  code: string;
}

export function useLoginMutation() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: async ({ remember: _remember, ...payload }: LoginPayload) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
      return { ...data, remember: _remember ?? true };
    },
    onSuccess: ({ token, user, remember }) => setAuth(token, user, { remember }),
  });
}

export function useSignupMutation() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: async ({ remember: _remember, ...payload }: SignupPayload) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/signup', payload);
      return { ...data, remember: _remember ?? true };
    },
    onSuccess: ({ token, user, remember }) => setAuth(token, user, { remember }),
  });
}

export function useForgotPasswordMutation() {
  const setPendingEmail = useAuthStore((s) => s.setPendingEmail);
  return useMutation({
    mutationFn: async (payload: ForgotPayload) => {
      await apiClient.post<{ ok: boolean }>('/auth/forgot', payload);
      return payload.email;
    },
    onSuccess: (email) => setPendingEmail(email),
  });
}

export function useVerifyOtpMutation() {
  const clearPending = useAuthStore((s) => s.clearPending);
  return useMutation({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const { data } = await apiClient.post<{ ok: boolean }>('/auth/verify-otp', payload);
      return data;
    },
    onSuccess: () => clearPending(),
  });
}

export function useResendOtpMutation() {
  return useMutation({
    mutationFn: async (email: string) => {
      await apiClient.post<{ ok: boolean }>('/auth/forgot', { email });
      return email;
    },
  });
}
