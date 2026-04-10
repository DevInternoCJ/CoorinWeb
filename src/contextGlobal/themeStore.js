import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store para la gestión del tema (claro/oscuro).
 * Persiste la preferencia del usuario en localStorage bajo la clave 'coorin-theme'.
 * Aplica / quita la clase 'dark' en <html> para activar los estilos de Tailwind darkMode:'class'.
 */
export const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: false,

      /** Inicializa el DOM según el valor guardado — llamar en main.jsx o App.jsx */
      initTheme: () => {
        const isDark = get().isDark;
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      /** Activa el modo oscuro */
      enableDark: () => {
        document.documentElement.classList.add('dark');
        set({ isDark: true });
      },

      /** Activa el modo claro */
      enableLight: () => {
        document.documentElement.classList.remove('dark');
        set({ isDark: false });
      },

      /** Alterna entre los dos modos */
      toggleTheme: () => {
        const current = get().isDark;
        if (current) {
          document.documentElement.classList.remove('dark');
          set({ isDark: false });
        } else {
          document.documentElement.classList.add('dark');
          set({ isDark: true });
        }
      },
    }),
    {
      name: 'coorin-theme',
      getStorage: () => localStorage,
    },
  ),
);
