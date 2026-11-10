import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { buildStaticPages } from "./src/rosary/staticPages";

// Stamps `__SW_VERSION__` in dist/sw.js with `<pkg.version>-<build-id>` so each
// production build gets its own Cache Storage bucket and stale assets are
// dropped on activate. The same version is defined for the app, which
// registers `sw.js?v=<version>`: the hosting's CDN keeps sw.js for days
// whatever the browser asks, so under one URL a new build went unseen (no
// update prompt) until the CDN's copy expired. A new build is a new URL.
function swVersion(version: string): Plugin {
  return {
    name: "sw-version",
    apply: "build",
    writeBundle(options) {
      const outDir = options.dir ?? "dist";
      const swPath = path.join(outDir, "sw.js");
      if (!fs.existsSync(swPath)) return;
      const content = fs.readFileSync(swPath, "utf-8").replace(/__SW_VERSION__/g, version);
      fs.writeFileSync(swPath, content);
    },
  };
}

// A fingerprint of the app's pictures: the icons, the heart and the start
// screen's paintings and the Misál look's engravings. The server lets browsers keep them for 30 days, and
// Safari keeps an apple-touch-icon even across removing the app from the home
// screen, so a changed picture under the same URL would go unseen. Every
// reference carries `?v=<fingerprint>` instead: a new picture is a new URL.
function iconFingerprint(): string {
  const dir = "public";
  const files = [
    ...fs.readdirSync(dir).filter((f) => /^(icon-|heart-).*\.(png|webp)$/.test(f)),
    ...fs.readdirSync(path.join(dir, "icons")).map((f) => path.join("icons", f)),
    ...fs.readdirSync(path.join(dir, "missal")).map((f) => path.join("missal", f)),
  ].sort();
  const hash = crypto.createHash("sha1");
  for (const f of files) hash.update(f).update(fs.readFileSync(path.join(dir, f)));
  return hash.digest("hex").slice(0, 8);
}

// Puts the fingerprint into index.html (`%ICON_VERSION%`) and, at build time,
// the manifest's icons (`__ICON_VERSION__`, the manifest being copied from
// public/ as it is). The app's own <img>s read `__ICON_VERSION__` (define).
function iconVersion(v: string): Plugin {
  return {
    name: "icon-version",
    transformIndexHtml: (html) => html.replace(/%ICON_VERSION%/g, v),
    writeBundle(options) {
      const manifest = path.join(options.dir ?? "dist", "manifest.webmanifest");
      if (!fs.existsSync(manifest)) return;
      fs.writeFileSync(manifest, fs.readFileSync(manifest, "utf-8").replace(/__ICON_VERSION__/g, v));
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
function staticPages(siteUrl: string | undefined, base: string, iconV: string): Plugin {
  return {
    name: "static-pages",
    apply: "build",
    generateBundle() {
      const { pages, sitemap } = buildStaticPages(base, siteUrl);
      // Their favicon carries the pictures' fingerprint too (see iconFingerprint).
      for (const page of pages) {
        const html = page.html.replace(/icon-48\.png"/g, `icon-48.png?v=${iconV}"`);
        this.emitFile({ type: "asset", fileName: page.fileName, source: html });
      }
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
  const iconV = iconFingerprint();
  const swV = `${pkg.version}-${Date.now().toString(36)}`;
  return {
    base,
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      __ICON_VERSION__: JSON.stringify(iconV),
      __SW_VERSION__: JSON.stringify(swV),
    },
    build: {
      rollupOptions: {
        output: {
          // React apart from the app: it changes far less often, so after an
          // update the browser keeps it and fetches only the app's chunk.
          // (The prayer translations are split by their dynamic imports, see
          // src/rosary/translations.ts.)
          manualChunks: { react: ["react", "react-dom", "react-dom/client"] },
        },
      },
    },
    plugins: [react(), swVersion(swV), iconVersion(iconV), appUrl(env.SITE_URL, base), staticPages(env.SITE_URL, base, iconV)],
  };
});
