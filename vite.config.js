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
        credits: "./credits.html",
        lvl1: "./lvl1.html",
        lvl2: "./lvl2.html",
        lvl3: "./lvl3.html",
        // ...
        // List all files you want in your build
      },
    },
  },
});
