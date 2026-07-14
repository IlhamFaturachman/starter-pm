import { create } from 'zustand';

export type SocketStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface SocketState {
  status: SocketStatus;
  setStatus: (s: SocketStatus) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  status: 'disconnected',
  setStatus: (status) => set({ status }),
}));
