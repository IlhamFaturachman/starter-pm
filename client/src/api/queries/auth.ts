import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '@/api/client';
import { useAuthStore } from '@/store/authStore';
import type { AuthResponse, ApiErrorResponse } from '@/types/api';
import { isMockError } from '@/api/mock';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPayload {
  email: string;
}

export interface VerifyOtpPayload {
  mode: 'signup' | 'forgot';
  email: string;
  code: string;
}

const unwrap = (err: unknown) => {
  if (isMockError(err)) return err.response;
  return (err as AxiosError<ApiErrorResponse>).response;
};

export function useLoginMutation() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
      return data;
    },
    onSuccess: ({ token, user }) => setAuth(token, user),
  });
}

export function useSignupMutation() {
  const setPendingEmail = useAuthStore((s) => s.setPendingEmail);
  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      await apiClient.post('/auth/signup', payload);
      return payload.email;
    },
    onSuccess: (email) => setPendingEmail(email, 'signup'),
  });
}

export function useForgotPasswordMutation() {
  const setPendingEmail = useAuthStore((s) => s.setPendingEmail);
  return useMutation({
    mutationFn: async (payload: ForgotPayload) => {
      await apiClient.post('/auth/forgot', payload);
      return payload.email;
    },
    onSuccess: (email) => setPendingEmail(email, 'forgot'),
  });
}

export function useVerifyOtpMutation() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearPending = useAuthStore((s) => s.clearPending);
  return useMutation({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/verify-otp', payload);
      return { data, mode: payload.mode };
    },
    onSuccess: ({ data, mode }) => {
      if (mode === 'signup') setAuth(data.token, data.user);
      else clearPending();
    },
  });
}

export { unwrap as unwrapAuthError };
