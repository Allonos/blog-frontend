import { create } from "zustand";

export interface IAuthUser {
  _id: string;
  fullName: string;
  email: string;
}

interface IProps {
  authUser: IAuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  setAuthUser: (user: IAuthUser | null) => void;
}

export const useAuthStore = create<IProps>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,

  setAuthUser: (user) => set({ authUser: user }),
}));
