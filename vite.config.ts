import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { buildStaticPages } from "./src/rosary/staticPages";

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

// Emits the crawlable prayer pages (src/rosary/staticPages.ts) into the build,
// with a sitemap when SITE_URL is known. robots.txt only counts at a domain's
// root, so it is written only when the app is served from there; under a
// sub-path, submit the sitemap in Google Search Console instead.
function staticPages(siteUrl: string | undefined, base: string): Plugin {
  return {
    name: "static-pages",
    apply: "build",
    generateBundle() {
      const { pages, sitemap } = buildStaticPages(base, siteUrl);
      for (const page of pages) this.emitFile({ type: "asset", fileName: page.fileName, source: page.html });
      if (!sitemap) {
        this.warn("SITE_URL is not set: no sitemap.xml, and the prayer pages get relative canonical links.");
        return;
      }
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
      if (base === "/") {
        const url = `${siteUrl!.replace(/\/+$/, "")}/sitemap.xml`;
        this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *\nAllow: /\nSitemap: ${url}\n` });
      }
    },
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
    plugins: [react(), swVersion(), appUrl(env.SITE_URL, base), staticPages(env.SITE_URL, base)],
  };
});
