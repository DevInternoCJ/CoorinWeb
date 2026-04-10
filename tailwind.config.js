import preline from "preline/plugin";
import tailwindcssForms from "@tailwindcss/forms";
import iconify from "@iconify/tailwind4";
import tailwindcssAnimated from 'tailwindcss-animated'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Para Vite + React
     './index.html',
    './src/**/*.{js,ts,jsx,tsx}',

    // Para Preline UI
       'node_modules/preline/dist/*.js',
  ],
  darkMode: 'class', // Habilitar dark mode por clase en el <html>
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#1E40AF",
      },
    },
  },
  plugins: [
    preline,
    iconify,
    tailwindcssAnimated,
  ],
};
