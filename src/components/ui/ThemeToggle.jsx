import React from "react";
import { useThemeStore } from "../../contextGlobal/themeStore";

/**
 * ThemeToggle — botón para alternar entre modo claro y oscuro.
 *
 * Uso rápido:
 *   import ThemeToggle from "../../components/ui/ThemeToggle";
 *   <ThemeToggle />
 *
 * Props opcionales:
 *   className — clases extra para el botón contenedor
 */
const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className={`
        relative inline-flex items-center justify-center
        w-9 h-9 rounded-full
        border border-jerarquia2/40
        bg-jerarquia1/10 hover:bg-jerarquia2/20
        text-jerarquia3 dark:text-jerarquia4
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-jerarquia2/50
        group cursor-pointer
        ${className}
      `}
    >
      {/* Ícono Sol (modo claro) */}
      <span
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      </span>

      {/* Ícono Luna (modo oscuro) */}
      <span
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle;
