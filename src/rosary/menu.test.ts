import { describe, expect, it } from "vitest";
import { MENU_GROUPS, groupKeys, inSeason, menuEntry, searchMenu, type MenuKey } from "./menu";
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
    expect(missa.sections.map((s) => s.heading)).toEqual([undefined, "Ordo Missæ", "Sequéntiæ", "Post Missam"]);
    expect(missa.sections[0]!.keys).toEqual(["ordo_missae"]);
    expect(groupKeys(MENU_GROUPS.find((g) => g.key === "defuncti")!)).toEqual(["de_profundis", "dies_irae", "defuncti", "requiem"]);
  });

  it("sorts every section by Latin name, accents ignored, bar the Mass's", () => {
    const fold = (k: MenuKey) => menuEntry(k).name.toLowerCase().replace(/æ/g, "ae").replace(/œ/g, "oe").normalize("NFD").replace(/\p{M}/gu, "");
    for (const g of MENU_GROUPS.filter((g) => g.key !== "missa"))
      for (const s of g.sections) {
        const names = s.keys.map(fold);
        expect(names, g.title).toEqual([...names].sort((a, b) => a.localeCompare(b)));
      }
    expect(groupKeys(MENU_GROUPS.find((g) => g.key === "cotidianae")!).slice(0, 3)).toEqual(["angele_dei", "angelus", "anima_christi"]);
    expect(groupKeys(MENU_GROUPS.find((g) => g.key === "missa")!).slice(0, 4)).toEqual(["ordo_missae", "iudica_me", "confiteor", "kyrie"]);
  });
});

describe("inSeason", () => {
  it("gives only the Marian antiphon on a day with nothing else", () => {
    expect(inSeason(new Date(2026, 7, 12))).toEqual(["salve_regina"]);
  });

  it("adds the sequence of a feast", () => {
    // Easter 2026 is 5 April; Pentecost 24 May; Corpus Christi 4 June.
    expect(inSeason(new Date(2026, 3, 8))).toEqual(["regina_caeli", "victimae_paschali"]);
    expect(inSeason(new Date(2026, 4, 24))).toEqual(["regina_caeli", "veni_sancte_spiritus", "spiritus", "loreto"]);
    expect(inSeason(new Date(2026, 5, 4))).toEqual(["salve_regina", "lauda_sion", "pange_lingua", "sacred_heart", "cor_iesu"]);
    expect(inSeason(new Date(2026, 8, 15))).toEqual(["salve_regina", "stabat_mater", "septem_dolores"]);
    // The Friday before Palm Sunday, 27 March 2026: in Lent and St. Joseph's month too
    // (the Seven Sorrows chaplet, a Lenten devotion as well, is listed once).
    expect(inSeason(new Date(2026, 2, 27))).toEqual(["ave_regina_caelorum", "stabat_mater", "septem_dolores", "st_joseph", "ioseph", "ad_te_ioseph", "brigit"]);
  });

  it("adds the prayers for the dead through November, and All Saints' litany on its day", () => {
    expect(inSeason(new Date(2026, 10, 1))).toEqual(["salve_regina", "saints", "requiem", "de_profundis", "dies_irae", "defuncti"]);
    expect(inSeason(new Date(2026, 10, 2))).toEqual(["salve_regina", "requiem", "de_profundis", "dies_irae", "defuncti"]);
  });

  it("adds St. Michael's chaplet on his feast", () => {
    expect(inSeason(new Date(2026, 8, 29))).toEqual(["salve_regina", "angelica"]);
    expect(inSeason(new Date(2026, 8, 30))).toEqual(["salve_regina"]);
  });

  it("adds the litany of the month's devotion", () => {
    expect(inSeason(new Date(2026, 0, 14))).toEqual(["alma_redemptoris", "holy_name"]);
    expect(inSeason(new Date(2026, 6, 14))).toEqual(["salve_regina", "precious_blood", "sanguis"]);
    expect(inSeason(new Date(2026, 9, 31))).toEqual(["salve_regina", "loreto"]);
  });

  it("adds the Sacred Heart on its feast and on first Fridays", () => {
    expect(inSeason(new Date(2026, 7, 7))).toEqual(["salve_regina", "sacred_heart", "cor_iesu"]);
    expect(inSeason(new Date(2026, 7, 14))).toEqual(["salve_regina"]);
  });
});

describe("searchMenu", () => {
  it("finds a prayer by its Latin name, accents and æ ignored", () => {
    expect(searchMenu("memorare")).toEqual(expect.arrayContaining(["memorare", "memorare_ioseph"]));
    expect(searchMenu("Victimae")).toEqual(["victimae_paschali"]);
    expect(searchMenu("  DIES irae ")).toEqual(["dies_irae"]);
  });

  it("finds it by a translated name, in either language", () => {
    expect(searchMenu("pomni")).toContain("memorare");
    expect(searchMenu("Lamb of God")).toEqual(["agnus_dei"]);
    expect(searchMenu("beránku")).toEqual(["agnus_dei"]);
  });

  it("finds the creeds by their first word", () => {
    expect(searchMenu("credo")).toEqual(["symbolum_apostolorum", "symbolum_athanasianum", "symbolum_nicenum"]);
  });

  it("needs every word, sorts by Latin name, and finds nothing for nothing", () => {
    const litanies = searchMenu("litaniae");
    expect(litanies.length).toBe(7);
    expect(litanies[0]).toBe("humility");
    expect(searchMenu("litaniae ioseph")).toEqual(["st_joseph"]);
    expect(searchMenu("")).toEqual([]);
    expect(searchMenu(" ,. ")).toEqual([]);
    expect(searchMenu("xyzzy")).toEqual([]);
  });
});
