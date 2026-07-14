import { useEffect, type ReactNode } from 'react';
import { socketManager } from './SocketManager';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';

export function SocketProvider({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);
  const setStatus = useSocketStore((s) => s.setStatus);

  useEffect(() => {
    const socket = socketManager.connect(token);
    if (!socket) return;

    const onConnect = () => setStatus('connected');
    const onDisconnect = () => setStatus('disconnected');
    const onError = () => setStatus('error');

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onError);

    if (socket.connected) setStatus('connected');

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onError);
    };
  }, [token, setStatus]);

  return <>{children}</>;
}
