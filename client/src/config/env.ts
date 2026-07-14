export const config = {
  apiUrl:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
    'http://localhost:3000/api',
  socketUrl:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOCKET_URL) ||
    'http://localhost:3000',
  mode:
    (typeof import.meta !== 'undefined' && import.meta.env?.MODE) ||
    'development',
  isDev:
    typeof import.meta !== 'undefined' ? Boolean(import.meta.env?.DEV) : true,
  isProd:
    typeof import.meta !== 'undefined' ? Boolean(import.meta.env?.PROD) : false,
} as const;
