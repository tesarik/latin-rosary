import { describe, expect, it } from "vitest";
import { foldName, menuEntry } from "./menu";
import { PRAYER_TRANSLATIONS } from "./allTranslations";
import { MIN_TEXT_QUERY, searchTexts } from "./textSearch";

const cs = PRAYER_TRANSLATIONS.cs;

describe("search in the prayers' text", () => {
  it("finds a litany's invocation, on the step it is on", () => {
    const hits = searchTexts("turris eburnea", "cs", cs);
    const loreto = hits.find((h) => h.key === "loreto")!;
    expect(loreto).toBeTruthy();
    expect(menuEntry("loreto").build()[loreto.step]!.label).toBe("Spéculum iustítiæ");
    expect(loreto.tr).toBe(false);
  });

  it("marks the matched words in the snippet", () => {
    const [hit] = searchTexts("turris eburnea", "cs", cs).filter((h) => h.key === "loreto");
    const marked = hit!.marks.map(([a, b]) => foldName(hit!.snippet.slice(a, b)));
    expect(marked).toContain("turris");
    expect(marked).toContain("eburnea");
  });

  it("finds a shared text only where it is at home", () => {
    const keys = searchTexts("panem nostrum quotidianum", "cs", cs).map((h) => h.key);
    expect(keys).toContain("pater_noster");
    // Not every chaplet that prays it (St. Joseph's sorrows print it within
    // each heading's step, so they are found).
    for (const k of ["angelica", "sanguis", "spiritus", "leonine", "via_crucis"] as const) expect(keys).not.toContain(k);
  });

  it("finds a text in the translation of the UI language", () => {
    const hit = searchTexts("pod ochranu tvou", "cs", cs).find((h) => h.key === "sub_tuum");
    expect(hit?.tr).toBe(true);
  });

  it("needs every word on one step, and a few letters at least", () => {
    expect(searchTexts("turris zzzz", "cs", cs)).toEqual([]);
    expect(searchTexts("a".repeat(MIN_TEXT_QUERY - 1), "cs", cs)).toEqual([]);
  });

  it("leaves out what was found by name", () => {
    expect(searchTexts("turris eburnea", "cs", cs, ["loreto"]).some((h) => h.key === "loreto")).toBe(false);
  });

  it("works with the Latin alone, before the translation has loaded", () => {
    expect(searchTexts("pertransibit gladius", "en", undefined).some((h) => h.key === "septem_dolores")).toBe(true);
  });
});
