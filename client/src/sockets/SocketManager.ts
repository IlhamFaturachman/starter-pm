import { io, type Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from './events';
import { config } from '@/config/env';

class SocketManager {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private authToken: string | null = null;

  connect(token: string | null) {
    if (!token) {
      this.disconnect();
      return null;
    }

    if (this.socket?.connected && this.authToken === token) {
      return this.socket;
    }

    this.disconnect();
    this.authToken = token;
    this.socket = io(config.socketUrl, {
      autoConnect: true,
      auth: { token },
      transports: ['websocket'],
    });
    return this.socket;
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.authToken = null;
  }

  get(): Socket<ServerToClientEvents, ClientToServerEvents> | null {
    return this.socket;
  }
}

export const socketManager = new SocketManager();
