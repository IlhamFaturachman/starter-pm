import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from '@/routes/router';
import { queryClient } from '@/api/queryClient';
import { SocketProvider } from '@/sockets/SocketProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useUiStore } from '@/store/uiStore';

function ThemeSync() {
  const theme = useUiStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }, [theme]);
  return null;
}

export function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <ThemeSync />
          <RouterProvider router={router} />
        </SocketProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
