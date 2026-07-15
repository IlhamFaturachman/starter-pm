const meta =
  typeof import.meta !== 'undefined'
    ? (import.meta as ImportMeta & {
        env?: Record<string, string | boolean | undefined>;
      }).env
    : undefined;

/** When true in dev, axios auth routes are mocked (default). Set VITE_USE_MOCK=false to hit real BE. */
const useMockEnv = String(meta?.VITE_USE_MOCK ?? 'true');
const isDev = typeof import.meta !== 'undefined' ? Boolean(meta?.DEV) : true;

export const config = {
  apiUrl: (meta?.VITE_API_URL as string | undefined) || 'http://localhost:3000/api',
  socketUrl: (meta?.VITE_SOCKET_URL as string | undefined) || 'http://localhost:3000',
  mode: (meta?.MODE as string | undefined) || 'development',
  isDev,
  isProd: typeof import.meta !== 'undefined' ? Boolean(meta?.PROD) : false,
  useMock: isDev && useMockEnv !== 'false',
} as const;
