import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";

interface SocketStore {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  connectSocket: () => {
    if (get().socket?.connected) return;
    const token = useAuthStore.getState().token;
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
      auth: { token },
    });
    set({ socket });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
    set({ socket: null });
  },
}));
