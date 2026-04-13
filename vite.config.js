import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    hmr: {
      overlay: false, // Opcional: desactiva el overlay de errores HMR
    },
    watch: {
      usePolling: true, // Útil en algunos entornos como Docker/WSL2
    },
  },
});
