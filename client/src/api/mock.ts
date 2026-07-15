import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { apiClient } from '@/api/client';
import { config } from '@/config/env';

type Handler = (url: string, body: unknown) => unknown;

const handlers: Record<string, Handler> = {
  'POST:/auth/login': (_url, body) => {
    const { email } = body as { email: string };
    return {
      token: 'mock-jwt-token',
      user: { id: '1', email, name: email.split('@')[0] || 'user', role: 'admin' as const },
    };
  },
  'POST:/auth/signup': (_url, body) => {
    const { email, name } = body as { email: string; name?: string };
    return {
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email,
        name: name || email.split('@')[0] || 'user',
        role: 'member' as const,
      },
    };
  },
  'POST:/auth/forgot': () => ({ ok: true }),
  'POST:/auth/verify-otp': () => ({ ok: true }),
};

function normalizePath(url: string): string {
  let path = url ?? '';
  if (path.startsWith('http')) {
    path = path.replace(config.apiUrl, '');
  }
  path = path.split('?')[0] || '';
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}

function matchHandler(method: string, url: string): Handler | undefined {
  return handlers[`${method}:${normalizePath(url)}`];
}

function parseBody(data: unknown): unknown {
  if (data == null || data === '') return undefined;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
  return data;
}

/** Dev-only mock that returns real Axios responses (mutations work). */
export function installMockApi(): void {
  apiClient.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    const method = (req.method ?? 'get').toUpperCase();
    const url = req.url ?? '';
    const handler = matchHandler(method, url);
    if (!handler) return req;

    const body = parseBody(req.data);
    const data = handler(url, body);

    const adapter: AxiosAdapter = async (config) => {
      const response: AxiosResponse = {
        data,
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        config,
        request: {},
      };
      return response;
    };

    req.adapter = adapter;
    return req;
  });
}
