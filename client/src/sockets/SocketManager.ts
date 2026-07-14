import { io, Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from './events';
import { config } from '@/config/env';

class SocketManager {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  connect(token: string | null) {
    if (this.socket?.connected) return this.socket;
    this.socket = io(config.socketUrl, {
      autoConnect: true,
      auth: token ? { token } : undefined,
      transports: ['websocket'],
    });
    return this.socket;
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  get(): Socket<ServerToClientEvents, ClientToServerEvents> | null {
    return this.socket;
  }
}

export const socketManager = new SocketManager();
