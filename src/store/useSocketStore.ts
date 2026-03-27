import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketStore {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  connectSocket: () => {
    if (get().socket?.connected) return;
    const socket = io(import.meta.env.VITE_API_BASE_URL, {
      withCredentials: true,
    });
    set({ socket });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
    set({ socket: null });
  },
}));
