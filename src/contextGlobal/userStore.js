import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getWalletProduct } from '../services/mark/Orochi/LokiServices';

export const useUserStore = create(
  persist(
    (set) => ({
      // Inicializar desde sessionStorage si existe
      user: JSON.parse(sessionStorage.getItem('userData') || 'null'),
      isAuthenticated: !!JSON.parse(sessionStorage.getItem('userData') || 'null'),
      setUser: (user) => {
        try {
          sessionStorage.setItem('userData', JSON.stringify(user));
        } catch (e) {
          console.warn('No se pudo guardar userData en sessionStorage', e);
        }
        set({ user, isAuthenticated: !!user });
      },
      logout: () => {
        try {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userData');
        } catch (e) {
          console.warn('No se pudo limpiar sessionStorage en logout', e);
        }
        set({ user: null, isAuthenticated: false });
      },
      
      clearUserData: () => {
        try {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userData');
        } catch (e) {
          console.warn('No se pudo limpiar sessionStorage', e);
        }

        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'coorin-user', // clave en sessionStorage
      getStorage: () => sessionStorage,
    },
  ),
);

export const useWalletProductStore = create((set) => ({
  walletProducts: null,
  isLoading: false,
  error: null,

  // Acción mejorada que se puede llamar desde cualquier componente
  loadWalletProducts: async () => {
    // Preferir sessionStorage (persistir en recarga, limpiar al cerrar pestaña),
    // pero mantener fallback a localStorage por compatibilidad.
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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


