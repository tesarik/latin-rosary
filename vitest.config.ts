import { defineConfig } from "vitest/config";

// Standalone test config — the prayer/sequence invariant tests are pure data
// logic (no DOM, no React), so we don't load the app's Vite plugins here.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
