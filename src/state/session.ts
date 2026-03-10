import { create } from 'zustand';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
};

type SessionState = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  setUser: (user: SessionUser | null) => void;
  signOut: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  signOut: () => set({ user: null, isAuthenticated: false }),
}));
