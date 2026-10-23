import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: { port: 3000, strictPort: true },
  preview: { port: 4173, strictPort: true },
  resolve: { tsconfigPaths: true },
  plugins: [react(), tailwindcss()],
});
