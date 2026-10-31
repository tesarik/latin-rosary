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
  it("gives only the Marian antiphon on a day with nothing else", () => {
    expect(inSeason(new Date(2026, 7, 12))).toEqual(["salve_regina"]);
  });

  it("adds the sequence of a feast", () => {
    // Easter 2026 is 5 April; Pentecost 24 May; Corpus Christi 4 June.
    expect(inSeason(new Date(2026, 3, 8))).toEqual(["regina_caeli", "victimae_paschali"]);
    expect(inSeason(new Date(2026, 4, 24))).toEqual(["regina_caeli", "veni_sancte_spiritus", "loreto"]);
    expect(inSeason(new Date(2026, 5, 4))).toEqual(["salve_regina", "lauda_sion", "sacred_heart"]);
    expect(inSeason(new Date(2026, 8, 15))).toEqual(["salve_regina", "stabat_mater"]);
    // The Friday before Palm Sunday, 27 March 2026: in Lent and St. Joseph's month too.
    expect(inSeason(new Date(2026, 2, 27))).toEqual(["ave_regina_caelorum", "stabat_mater", "st_joseph", "ioseph", "ad_te_ioseph", "brigit"]);
  });

  it("adds the prayers for the dead through November, and All Saints' litany on its day", () => {
    expect(inSeason(new Date(2026, 10, 1))).toEqual(["salve_regina", "saints", "requiem", "de_profundis", "dies_irae", "defuncti"]);
    expect(inSeason(new Date(2026, 10, 2))).toEqual(["salve_regina", "requiem", "de_profundis", "dies_irae", "defuncti"]);
  });

  it("adds the litany of the month's devotion", () => {
    expect(inSeason(new Date(2026, 0, 14))).toEqual(["alma_redemptoris", "holy_name"]);
    expect(inSeason(new Date(2026, 6, 14))).toEqual(["salve_regina", "precious_blood"]);
    expect(inSeason(new Date(2026, 9, 31))).toEqual(["salve_regina", "loreto"]);
  });

  it("adds the Sacred Heart on its feast and on first Fridays", () => {
    expect(inSeason(new Date(2026, 7, 7))).toEqual(["salve_regina", "sacred_heart"]);
    expect(inSeason(new Date(2026, 7, 14))).toEqual(["salve_regina"]);
  });
});
