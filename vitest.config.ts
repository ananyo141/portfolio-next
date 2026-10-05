import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@data": path.resolve(__dirname, "src/data"),
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
});
