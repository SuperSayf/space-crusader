import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        level: "./level.html",
        // ...
        // List all files you want in your build
      },
    },
  },
});
