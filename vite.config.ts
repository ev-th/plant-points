import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      "@/": new URL("./", import.meta.url).pathname,
    },
    include: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/helpers/setup.ts",
    mockReset: true,
  },
});
