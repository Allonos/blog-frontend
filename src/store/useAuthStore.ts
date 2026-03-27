import { create } from "zustand";

export interface IAuthUser {
  _id: string;
  username: string;
  email: string;
  bio: string;
  profilePic: string;
}

interface IProps {
  authUser: IAuthUser | null;
  token: string | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  setAuthUser: (user: IAuthUser | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<IProps>((set) => ({
  authUser: null,
  token: null,
  isSigningUp: false,
  isLoggingIn: false,

  setAuthUser: (user) => set({ authUser: user }),
  setToken: (token) => set({ token }),
}));
