import { describe, it, expect } from "vitest";
import { buildStaticPages, slugify } from "./staticPages";
import { isBuiltInKey } from "./navigation";
import { LITANIES, ORDINARY_PRAYERS, OTHER_PRAYER_SETS } from "./sequence";
import { MYSTERIES } from "./prayers";
import { SUPPORTED_LOCALES } from "./i18n";

const BASE = "/latin-rosary/";
const SITE = "https://example.com";
const { pages, sitemap } = buildStaticPages(BASE, SITE);
const byName = new Map(pages.map((p) => [p.fileName, p.html]));

describe("static prayer pages", () => {
  it("folds Latin names into URL slugs", () => {
    expect(slugify("Litaníæ Lauretánæ")).toBe("litaniae-lauretanae");
    expect(slugify("Pro defunctis (Réquiem)")).toBe("pro-defunctis-requiem");
    expect(slugify("Ánima Christi")).toBe("anima-christi");
  });

  it("has an index and a page for every prayer set, in every locale", () => {
    const sets = 2 + Object.keys(ORDINARY_PRAYERS).length + Object.keys(LITANIES).length + Object.keys(OTHER_PRAYER_SETS).length;
    expect(pages).toHaveLength(SUPPORTED_LOCALES.length * (sets + 1));
    expect(new Set(pages.map((p) => p.fileName)).size).toBe(pages.length);
    for (const locale of SUPPORTED_LOCALES) {
      expect(byName.has(`${locale}/index.html`)).toBe(true);
      expect(byName.has(`${locale}/rosarium/index.html`)).toBe(true);
      expect(byName.has(`${locale}/coronula-divinae-misericordiae/index.html`)).toBe(true);
      expect(byName.has(`${locale}/litaniae-lauretanae/index.html`)).toBe(true);
    }
  });

  it("links every page to its counterpart in the other locale", () => {
    for (const { fileName, html } of pages) {
      const alternates = [...html.matchAll(/hreflang="(cs|en)" href="([^"]+)"/g)].map((m) => m[2]!);
      expect(alternates.length, fileName).toBe(SUPPORTED_LOCALES.length);
      for (const url of alternates) {
        expect(byName.has(url.slice((SITE + BASE).length) + "index.html"), url).toBe(true);
      }
    }
  });

  it("opens only real prayer sets in the app", () => {
    const keys = pages.flatMap((p) => [...p.html.matchAll(/#pray=([\w-]+)/g)].map((m) => m[1]!));
    expect(keys.length).toBeGreaterThan(0);
    for (const k of keys) expect(isBuiltInKey(k), k).toBe(true);
    for (const k of Object.keys(MYSTERIES)) expect(keys).toContain(k);
  });

  it("renders rubric markup, and never tags the Latin lang=la", () => {
    for (const { fileName, html } of pages) {
      expect(html, fileName).not.toMatch(/\{\/?r\}/);
      expect(html, fileName).not.toContain('lang="la"');
    }
    expect(byName.get("en/alma-redemptoris-mater/index.html")).toContain('class="rubric"');
  });

  it("gives the rosary's mysteries in Latin and the translation", () => {
    const html = byName.get("cs/rosarium/index.html")!;
    expect(html).toContain("quem, Virgo, de Spiritu Sancto concepísti");
    expect(html).toContain("kterého jsi, Panno, z Ducha Svatého počala");
    expect(html).toContain("qui adaúgeat nobis fidem");
  });

  it("lists every page in the sitemap, and only with a known origin", () => {
    for (const p of pages) expect(sitemap).toContain(`${SITE}${BASE}${p.fileName.replace(/index\.html$/, "")}</loc>`);
    expect(buildStaticPages(BASE, undefined).sitemap).toBeNull();
  });
});
