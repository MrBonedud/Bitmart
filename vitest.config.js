import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    include: [
      "**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "**/__tests__/**/*.?(c|m)[jt]s?(x)",
    ],
    setupFiles: ["./src/__tests__/setup.js"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.config.js",
        "**/*.test.js",
        "**/*.spec.js",
      ],
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src.*\.[jt]sx?$/,
    exclude: [],
  },
});
