import { useEffect } from 'react';
import { socketManager } from './SocketManager';
import type { Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from './events';

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export function useSocket<E extends keyof ServerToClientEvents>(
  event: E,
  handler: ServerToClientEvents[E],
) {
  useEffect(() => {
    const socket = socketManager.get() as AppSocket | null;
    if (!socket) return;
    // socket.io's typed `.on` widens to a union; cast at the boundary.
    socket.on(event, handler as never);
    return () => {
      socket.off(event, handler as never);
    };
  }, [event, handler]);
}
