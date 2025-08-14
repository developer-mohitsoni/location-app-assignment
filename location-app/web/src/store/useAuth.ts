import { create } from 'zustand';
import { getToken, saveToken, clearToken } from '@/lib/auth';

interface AuthState {
  isAuthed: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthed: false,
  loading: true,
  login: (token) => {
    saveToken(token);
    set({ isAuthed: true });
  },
  logout: () => {
    clearToken();
    set({ isAuthed: false });
  },
  checkAuth: () => {
    if (typeof window !== 'undefined') {
      set({ isAuthed: Boolean(getToken()), loading: false });
    }
  },
}));
