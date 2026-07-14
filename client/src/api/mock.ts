import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient } from '@/api/client';
import { config } from '@/config/env';

type Handler = (url: string, body: unknown) => unknown;

const handlers: Record<string, Handler> = {
  'POST:/auth/login': (_url, body) => {
    const { email } = body as { email: string };
    return {
      token: 'mock-jwt-token',
      user: { id: '1', email, name: email.split('@')[0], role: 'admin' as const },
    };
  },
  'POST:/auth/signup': (_url, body) => {
    const { email } = body as { email: string };
    return {
      token: 'mock-jwt-token',
      user: { id: '1', email, name: email.split('@')[0], role: 'admin' as const },
    };
  },
  'POST:/auth/forgot': () => ({ ok: true }),
  'POST:/auth/verify-otp': () => ({ ok: true }),
};

function matchHandler(method: string, url: string): Handler | undefined {
  const clean = url.replace(config.apiUrl, '').split('?')[0];
  return handlers[`${method}:${clean}`];
}

export function installMockApi(): void {
  apiClient.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    const handler = matchHandler(req.method?.toUpperCase() ?? 'GET', req.url ?? '');
    if (!handler) return req;

    const body = req.data ? JSON.parse(req.data as string) : undefined;
    const response: AxiosResponse = {
      data: handler(req.url ?? '', body),
      status: 200,
      statusText: 'OK',
      headers: {},
      config: req,
    } as AxiosResponse;

    return Promise.reject({
      __mock: true,
      response,
      config: req,
    });
  });
}

export function isMockError(err: unknown): err is { __mock: true; response: AxiosResponse } {
  return Boolean((err as { __mock?: boolean })?.__mock);
}
