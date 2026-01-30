import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getWalletProduct } from '../services/mark/Orochi/LokiServices';

export const useUserStore = create(
  persist(
    (set) => ({
      // Inicializar desde localStorage si existe
      user: JSON.parse(localStorage.getItem('userData') || 'null'),
      isAuthenticated: !!JSON.parse(localStorage.getItem('userData') || 'null'),
      setUser: (user) => {
        try {
          localStorage.setItem('userData', JSON.stringify(user));
        } catch (e) {
          console.warn('No se pudo guardar userData en localStorage', e);
        }
        set({ user, isAuthenticated: !!user });
      },
      logout: () => {
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
        } catch (e) {
          console.warn('No se pudo limpiar localStorage en logout', e);
        }
        set({ user: null, isAuthenticated: false });
      },
      
      clearUserData: () => {
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
        } catch (e) {
          console.warn('No se pudo limpiar localStorage', e);
        }

        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'coorin-user', // clave en localStorage
      getStorage: () => localStorage,
    },
  ),
);

export const useWalletProductStore = create((set) => ({
  walletProducts: null,
  isLoading: false,
  error: null,

  // Acción mejorada que se puede llamar desde cualquier componente
  loadWalletProducts: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ 
        error: "No se puede cargar: Usuario no autenticado.",
        isLoading: false 
      });
      return null;
    } 
    set({ isLoading: true, error: null });   
    try {
      const result = await getWalletProduct();
      set({ 
        walletProducts: result, 
        isLoading: false, 
        error: null 
      });
      return result;
    } catch (err) {
      const errorMessage = err.message || "Error al cargar carteras y productos.";
      set({ 
        error: errorMessage, 
        isLoading: false,
        walletProducts: null 
      });
      throw err;
    }
  },

  setWalletProducts: (data) => set({ 
    walletProducts: data, 
    isLoading: false, 
    error: null 
  }),

  setLoading: () => set({ 
    isLoading: true, 
    error: null 
  }),
  
  setError: (errorMessage) => set({ 
    error: errorMessage, 
    isLoading: false,
    walletProducts: null 
  }),

  clearWalletProducts: () => set({ 
    walletProducts: null, 
    isLoading: false, 
    error: null 
  }),
}));


