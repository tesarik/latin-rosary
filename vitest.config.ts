import { defineConfig } from "vitest/config";

// Standalone test config — we don't load the app's Vite plugins here. Most
// tests are pure data logic in the node environment; the component tests
// (`*.test.tsx`) opt into jsdom with a `// @vitest-environment jsdom` line
// and render with React Testing Library. The build-time constants the app
// reads get fixed values.
export default defineConfig({
  esbuild: { jsx: "automatic" },
  define: {
    __APP_VERSION__: JSON.stringify("0.0.0-test"),
    __BUILD_DATE__: JSON.stringify("2026-01-01T00:00:00.000Z"),
    __ICON_VERSION__: JSON.stringify("test"),
    __SW_VERSION__: JSON.stringify("test"),
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
