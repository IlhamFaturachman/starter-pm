import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { config } from '@/config/env';
import { useAuthStore } from '@/store/authStore';
import { paths } from '@/routes/paths';

export const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((req) => {
  const token = useAuthStore.getState().token;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const hadSession = Boolean(useAuthStore.getState().token);
      // Login/signup 401 must not wipe a non-existent session or hard-redirect.
      if (hadSession) {
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          const path = window.location.pathname;
          const isAuthRoute =
            path === paths.login ||
            path === paths.signup ||
            path === paths.forgotPassword ||
            path === paths.verifyOtp;
          if (!isAuthRoute) {
            window.location.assign(paths.login);
          }
        }
      }
    }
    return Promise.reject(error);
  },
);
