import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige las peticiones que empiezan con /api al backend
      "/api": {
        target: "http://localhost:3001", // Tu servidor de backend
      },
    },
  },
});
