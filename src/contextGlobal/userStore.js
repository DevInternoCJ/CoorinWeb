import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    set({ user: null, isAuthenticated: false });
  },
  
  clearUserData: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    set({ user: null, isAuthenticated: false });
  }
}));