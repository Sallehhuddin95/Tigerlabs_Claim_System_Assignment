/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      exclude: [
        "vite.config.*",
        "eslint.config.*",
        "src/main.tsx",
        "src/index.tsx",
        "src/types/**",
        "**/*.d.ts",
        "**/index.ts",
        "**/*.config.*",
      ],
    },
  },
});
