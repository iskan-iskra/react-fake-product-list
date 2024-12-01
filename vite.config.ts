import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@types": "/src/types",
      "@app": "/src/app",
    },
  },
});
