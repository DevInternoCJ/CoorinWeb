import { create } from 'zustand';

//estato global del usuario de inicio de sesion(store )
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
})); 