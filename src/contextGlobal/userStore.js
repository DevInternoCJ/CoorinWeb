import { create } from 'zustand';
import { getWalletProduct } from '../services/mark/orochi/LokiServices';

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


