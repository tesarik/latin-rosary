import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Stamps `__SW_VERSION__` in dist/sw.js with `<pkg.version>-<build-id>` so each
// production build gets its own Cache Storage bucket and stale assets are
// dropped on activate.
function swVersion(): Plugin {
  return {
    name: "sw-version",
    apply: "build",
    writeBundle(options) {
      const outDir = options.dir ?? "dist";
      const swPath = path.join(outDir, "sw.js");
      if (!fs.existsSync(swPath)) return;
      const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8")) as { version: string };
      const version = `${pkg.version}-${Date.now().toString(36)}`;
      const content = fs.readFileSync(swPath, "utf-8").replace(/__SW_VERSION__/g, version);
      fs.writeFileSync(swPath, content);
    },
  };
}

// Fills in `%APP_URL%` in index.html (canonical link, Open Graph tags) with the
// app's absolute URL: SITE_URL (the origin) + the base path. Link previews need
// an absolute image URL; without SITE_URL the tags fall back to the bare path.
function appUrl(siteUrl: string | undefined, base: string): Plugin {
  const url = (siteUrl ?? "").replace(/\/+$/, "") + base;
  return {
    name: "app-url",
    transformIndexHtml: (html) => html.replace(/%APP_URL%/g, url),
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8")) as { version: string };
  const base = env.BASE_PATH || "/";
  return {
    base,
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    },
    plugins: [react(), swVersion(), appUrl(env.SITE_URL, base)],
  };
});
