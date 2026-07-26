import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// Flat config. Non-type-checked preset (`recommended`, not `recommendedType-
// Checked`) so lint stays fast and needs no tsconfig project — `npm run
// typecheck` already covers type correctness.
export default tseslint.config(
  { ignores: ["dist", "node_modules"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // App source (browser).
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Empty catch blocks are a deliberate pattern here (best-effort calls to
      // vibrate / wakeLock / localStorage that must never throw).
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },

  // Service worker (its own global scope).
  {
    files: ["public/sw.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.serviceworker,
    },
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },

  // Node-side build/test config files.
  {
    files: ["*.config.{js,ts}"],
    languageOptions: { globals: globals.node },
  },
);
