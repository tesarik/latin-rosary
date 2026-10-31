import { describe, expect, it } from "vitest";
import { MENU_GROUPS, groupKeys, inSeason, menuEntry } from "./menu";
import { LITANIES, ORDINARY_PRAYERS, OTHER_PRAYER_SETS } from "./sequence";

describe("MENU_GROUPS", () => {
  const listed = MENU_GROUPS.flatMap(groupKeys);

  it("lists every prayer of the registries exactly once", () => {
    const all = [...Object.keys(ORDINARY_PRAYERS), ...Object.keys(LITANIES), ...Object.keys(OTHER_PRAYER_SETS)];
    expect([...listed].sort()).toEqual([...all].sort());
    expect(new Set(listed).size).toBe(listed.length);
  });

  it("resolves every key to its entry", () => {
    for (const k of listed) expect(menuEntry(k).name, k).toBeTruthy();
  });

  it("keeps the Mass in its order and gathers the prayers for the dead", () => {
    const missa = MENU_GROUPS.find((g) => g.key === "missa")!;
    expect(missa.sections.map((s) => s.heading)).toEqual(["Ordo Missæ", "Sequéntiæ", "Post Missam"]);
    expect(groupKeys(MENU_GROUPS.find((g) => g.key === "defuncti")!)).toEqual(["requiem", "de_profundis", "dies_irae", "defuncti"]);
  });
});

describe("inSeason", () => {
  it("always gives the Marian antiphon first", () => {
    expect(inSeason(new Date(2026, 6, 1))).toEqual(["salve_regina"]);
  });

  it("adds the sequence of a feast", () => {
    // Easter 2026 is 5 April; Pentecost 24 May; Corpus Christi 4 June.
    expect(inSeason(new Date(2026, 3, 8))).toEqual(["regina_caeli", "victimae_paschali"]);
    expect(inSeason(new Date(2026, 4, 24))).toEqual(["regina_caeli", "veni_sancte_spiritus"]);
    expect(inSeason(new Date(2026, 5, 4))).toEqual(["salve_regina", "lauda_sion"]);
    expect(inSeason(new Date(2026, 8, 15))).toEqual(["salve_regina", "stabat_mater"]);
    // The Friday before Palm Sunday: 27 March 2026.
    expect(inSeason(new Date(2026, 2, 27))).toContain("stabat_mater");
  });

  it("adds the prayers for the dead through November", () => {
    expect(inSeason(new Date(2026, 10, 2))).toEqual(["salve_regina", "requiem", "de_profundis", "dies_irae", "defuncti"]);
    expect(inSeason(new Date(2026, 9, 31))).toEqual(["salve_regina"]);
  });
});
