import { describe, it, expect } from "vitest";
import { MEDITATIONS } from "./meditations";
import { MYSTERIES } from "./prayers";
import { SUPPORTED_LOCALES } from "./i18n";

describe("the fruits and verses of the mysteries", () => {
  it("give every mystery a fruit, a reference and a verse in Latin and every locale", () => {
    for (const key of Object.keys(MYSTERIES) as (keyof typeof MYSTERIES)[]) {
      expect(MEDITATIONS[key], key).toHaveLength(5);
      for (const m of MEDITATIONS[key]) {
        for (const lang of ["la", ...SUPPORTED_LOCALES] as const) {
          expect(m.fruit[lang].trim(), `${key} fruit ${lang}`).not.toBe("");
          expect(m.ref[lang].trim(), `${key} ref ${lang}`).not.toBe("");
          expect(m.verse[lang].trim(), `${key} verse ${lang}`).not.toBe("");
        }
        // An omitted opening is marked in every language alike.
        const cut = m.verse.la.startsWith("…");
        for (const l of SUPPORTED_LOCALES) expect(m.verse[l].startsWith("…"), m.ref.la).toBe(cut);
      }
    }
  });
});
