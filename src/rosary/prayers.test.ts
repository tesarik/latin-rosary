import { describe, it, expect } from "vitest";
import {
  PRAYER_TYPES,
  PRAYERS,
  PRAYERS_CS,
  PRAYERS_EN,
  PRAYER_TRANSLATIONS,
  MYSTERIES,
  getHailMary,
  getHailMaryTr,
  type PrayerType,
  type MysteryKey,
} from "./prayers";
import { buildChaplet, buildRosarySequence, sliceLines, CHAPLETS, OTHER_PRAYER_SETS, ORDINARY_PRAYERS, LITANIES, type SequenceItem } from "./sequence";
import { parseLitany } from "./litany";
import { SUPPORTED_LOCALES, type Locale } from "./i18n";
import { STATE_VERSION } from "./storage";

// Resolve the displayed text for a sequence item's type. HAIL_MARY has no
// PRAYERS entry — its text is assembled by getHailMary(Tr) — and CUSTOM (a
// user's own prayer in a plan) carries its text on the item; no registry set
// contains one, so it resolves to nothing here.
const latinText = (type: PrayerType): string =>
  type === PRAYER_TYPES.HAIL_MARY ? getHailMary(undefined).after
  : type === PRAYER_TYPES.CUSTOM ? ""
  : PRAYERS[type];
const translatedText = (locale: Locale, type: PrayerType): string =>
  type === PRAYER_TYPES.HAIL_MARY ? getHailMaryTr(locale, undefined).after
  : type === PRAYER_TYPES.CUSTOM ? ""
  : PRAYER_TRANSLATIONS[locale][type];

// Every sequence the app can build, flattened to its items.
function allSequences(): { label: string; seq: SequenceItem[] }[] {
  const out: { label: string; seq: SequenceItem[] }[] = [];
  for (const key of Object.keys(MYSTERIES) as MysteryKey[]) {
    out.push({ label: `rosary:${key}`, seq: buildRosarySequence(MYSTERIES[key]) });
  }
  for (const [key, set] of Object.entries(CHAPLETS)) {
    out.push({ label: `chaplet:${key}`, seq: set.build() });
  }
  for (const [key, set] of Object.entries(OTHER_PRAYER_SETS)) {
    out.push({ label: `linear:${key}`, seq: set.build() });
  }
  for (const [key, set] of Object.entries(ORDINARY_PRAYERS)) {
    out.push({ label: `ordinary:${key}`, seq: set.build() });
  }
  for (const [key, set] of Object.entries(LITANIES)) {
    out.push({ label: `litany:${key}`, seq: set.build() });
  }
  return out;
}

describe("prayer text tables", () => {
  it("every translation table exposes exactly the Latin keys", () => {
    const latin = Object.keys(PRAYERS).sort();
    expect(Object.keys(PRAYERS_CS).sort()).toEqual(latin);
    expect(Object.keys(PRAYERS_EN).sort()).toEqual(latin);
  });

  it("PRAYER_TRANSLATIONS covers every supported locale", () => {
    expect(Object.keys(PRAYER_TRANSLATIONS).sort()).toEqual([...SUPPORTED_LOCALES].sort());
  });

  it("no prayer text is empty", () => {
    for (const [type, text] of Object.entries(PRAYERS)) {
      expect(text.trim(), `Latin ${type}`).not.toBe("");
    }
    for (const locale of SUPPORTED_LOCALES) {
      for (const [type, text] of Object.entries(PRAYER_TRANSLATIONS[locale])) {
        expect(text.trim(), `${locale} ${type}`).not.toBe("");
      }
    }
  });
});

describe("every prayer in every set resolves to Latin + a text in every locale", () => {
  for (const { label, seq } of allSequences()) {
    it(label, () => {
      expect(seq.length).toBeGreaterThan(0);
      // A section of a longer text must be non-empty on its own, too.
      const cut = (text: string | undefined, item: SequenceItem) =>
        text !== undefined && item.lines ? sliceLines(text, item.lines) : text;
      for (const item of seq) {
        expect(cut(latinText(item.type), item)?.trim(), `${label} → ${item.section ?? item.type} (la)`).toBeTruthy();
        for (const locale of SUPPORTED_LOCALES) {
          expect(
            cut(translatedText(locale, item.type), item)?.trim(),
            `${label} → ${item.section ?? item.type} (${locale})`
          ).toBeTruthy();
        }
      }
    });
  }
});

describe("display names", () => {
  const registries = {
    mystery: MYSTERIES,
    chaplet: CHAPLETS,
    linear: OTHER_PRAYER_SETS,
    ordinary: ORDINARY_PRAYERS,
    litany: LITANIES,
  };

  it("every prayer set has a localized name in every locale", () => {
    for (const [group, registry] of Object.entries(registries)) {
      for (const [key, set] of Object.entries(registry)) {
        for (const locale of SUPPORTED_LOCALES) {
          expect(set.nameTr[locale]?.trim(), `${group}:${key} (${locale})`).toBeTruthy();
        }
      }
    }
  });

  it("every mystery set has five clauses in every locale", () => {
    for (const key of Object.keys(MYSTERIES) as MysteryKey[]) {
      for (const locale of SUPPORTED_LOCALES) {
        const clauses = MYSTERIES[key].mysteriesTr[locale];
        expect(clauses.length, `${key} (${locale})`).toBe(5);
        for (const c of clauses) expect(c.trim(), `${key} (${locale})`).toBeTruthy();
      }
    }
  });
});

describe("rosary sequence structure", () => {
  // The label chip names the decade from `decade`, so every prayer of a
  // decade — not just its Ave Marías — must carry it, and nothing else may.
  it("stamps each decade's 13 prayers with its number, and only those", () => {
    const seq = buildRosarySequence(MYSTERIES.radostny);
    for (let d = 0; d < 5; d++) {
      const items = seq.filter((i) => i.decade === d);
      expect(items.length, `decade ${d}`).toBe(13);
      expect(items.map((i) => i.type)).toEqual([
        PRAYER_TYPES.OUR_FATHER,
        ...Array(10).fill(PRAYER_TYPES.HAIL_MARY),
        PRAYER_TYPES.GLORY_BE,
        PRAYER_TYPES.FATIMA,
      ]);
    }
    expect(seq.filter((i) => i.decade === undefined).length).toBe(74 - 65);
  });

  const seq = buildRosarySequence(MYSTERIES.radostny);

  it("is 74 steps", () => {
    expect(seq.length).toBe(74);
  });

  it("bead IDs match the RosaryBeads layout exactly and are unique", () => {
    const expected = new Set<string>([
      "tail-creed", "tail-of", "tail-hm-0", "tail-hm-1", "tail-hm-2",
    ]);
    for (let d = 0; d < 5; d++) {
      expected.add(`ring-of-${d}`);
      for (let h = 0; h < 10; h++) expected.add(`ring-hm-${d}-${h}`);
    }

    const beadIds = seq.map((s) => s.beadId).filter((b): b is string => !!b);
    expect(new Set(beadIds).size, "bead IDs are unique").toBe(beadIds.length);
    expect(new Set(beadIds)).toEqual(expected);
  });
});

describe("chaplet of Divine Mercy", () => {
  const core = buildChaplet(false);
  const full = buildChaplet(true);

  it("is 63 steps, or 69 with the optional prayers", () => {
    expect(core.length).toBe(63);
    expect(full.length).toBe(69);
  });

  it("adds only the optional prayers, around an unchanged core", () => {
    const optional = new Set<PrayerType>([
      PRAYER_TYPES.CHAPLET_OPENING, PRAYER_TYPES.CHAPLET_BLOOD_WATER,
      PRAYER_TYPES.CHAPLET_CLOSING, PRAYER_TYPES.CHAPLET_TRUST,
    ]);
    expect(core.some((i) => optional.has(i.type))).toBe(false);
    expect(full.filter((i) => !optional.has(i.type))).toEqual(core);
  });

  it("has five decades of Pater ætérne + ten Pro dolorósa, counted 1–10", () => {
    for (let d = 0; d < 5; d++) {
      const items = core.filter((i) => i.decade === d);
      expect(items.map((i) => i.type)).toEqual([
        PRAYER_TYPES.CHAPLET_ETERNAL_FATHER,
        ...Array(10).fill(PRAYER_TYPES.CHAPLET_PASSION),
      ]);
      expect(items.slice(1).map((i) => i.num)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
  });

  it("uses the rosary's bead IDs, once each, leaving two tail beads blank", () => {
    const rosaryBeads = new Set(buildRosarySequence(MYSTERIES.radostny).map((i) => i.beadId).filter(Boolean));
    for (const seq of [core, full]) {
      const beadIds = seq.map((i) => i.beadId).filter((b): b is string => !!b);
      expect(new Set(beadIds).size).toBe(beadIds.length);
      for (const b of beadIds) expect(rosaryBeads.has(b), b).toBe(true);
      expect(beadIds.length).toBe(rosaryBeads.size - 2);
    }
  });
});

describe("St. Joseph's seven sorrows and joys", () => {
  const seq = OTHER_PRAYER_SETS.ioseph.build();

  it("is eight sections: seven headings with a Glória Patri, then Vírginum custos", () => {
    expect(seq.length).toBe(8);
    expect(seq.every((i) => i.section)).toBe(true);
    for (const item of seq.slice(0, 7)) {
      expect(latinText(item.type)).toMatch(/^\{r\}[IVX]+\. .+\{\/r\}\n\nGlória Patri/);
      for (const locale of SUPPORTED_LOCALES) expect(translatedText(locale, item.type)).toMatch(/^\{r\}[IVX]+\. /);
    }
    expect(seq[7]!.type).toBe(PRAYER_TYPES.IOSEPH_VIRGINUM_CUSTOS);
  });
});

describe("ordinary prayers", () => {
  it("each builds exactly one step", () => {
    for (const [key, set] of Object.entries(ORDINARY_PRAYERS)) {
      expect(set.build().length, key).toBe(1);
    }
  });

  it("each has a non-empty name", () => {
    for (const [key, set] of Object.entries(ORDINARY_PRAYERS)) {
      expect(set.name.trim(), key).toBeTruthy();
    }
  });
});

describe("persistence", () => {
  it("STATE_VERSION is a positive integer", () => {
    expect(Number.isInteger(STATE_VERSION)).toBe(true);
    expect(STATE_VERSION).toBeGreaterThan(0);
  });
});

// Litanies are cut into sections by line number, once, for every language — so
// every translation must keep the Latin's line structure exactly.
describe("litany sections", () => {
  for (const [key, set] of Object.entries(LITANIES)) {
    const seq = set.build();
    const ranged = seq.filter((i) => i.lines);
    if (ranged.length === 0) continue;

    it(`${key}: every translation has the Latin's line count`, () => {
      const type = ranged[0]!.type;
      const n = PRAYERS[type as keyof typeof PRAYERS].split("\n").length;
      for (const locale of SUPPORTED_LOCALES) {
        expect(translatedText(locale, type)!.split("\n").length, locale).toBe(n);
      }
    });

    it(`${key}: sections are contiguous, start at line 0 and cover the text`, () => {
      expect(seq.every((i) => i.lines && i.section)).toBe(true);
      expect(seq[0]!.lines![0]).toBe(0);
      for (let i = 1; i < seq.length; i++) expect(seq[i]!.lines![0]).toBe(seq[i - 1]!.lines![1]);
      expect(seq.length).toBeGreaterThan(1);
    });
  }
});

describe("litany responses", () => {
  const runsOf = (type: PrayerType, locale?: Locale) =>
    parseLitany(locale ? translatedText(locale, type)! : PRAYERS[type as keyof typeof PRAYERS]).filter((b) => b.kind === "run");

  it("groups the Loreto invocations under one response in every language", () => {
    expect(runsOf(PRAYER_TYPES.LITANY_LORETO).map((r) => r.kind === "run" && r.response)).toEqual(["miserére nobis", "ora pro nobis"]);
    expect(runsOf(PRAYER_TYPES.LITANY_LORETO, "cs").map((r) => r.kind === "run" && r.response)).toEqual(["smiluj se nad námi", "oroduj za nás"]);
    expect(runsOf(PRAYER_TYPES.LITANY_LORETO, "en").map((r) => r.kind === "run" && r.response)).toEqual(["have mercy on us", "pray for us"]);
  });

  it("strips the response from every line of a run", () => {
    const run = runsOf(PRAYER_TYPES.LITANY_LORETO)[1]!;
    expect(run.kind === "run" && run.invocations[0]).toBe("Sancta María");
    expect(run.kind === "run" && run.invocations.every((i) => !i.includes("ora pro nobis"))).toBe(true);
  });

  it("keeps a lone response inline: the Agnus Dei and Propítius esto", () => {
    const blocks = parseLitany(PRAYERS[PRAYER_TYPES.LITANY_HOLY_NAME]);
    const singles = blocks.filter((b) => b.kind === "single").map((b) => b.kind === "single" && b.invocation);
    expect(singles).toContain("Propítius esto,");
    expect(singles.filter((s) => s && s.startsWith("Agnus Dei")).length).toBe(3);
  });

  // The Litany of the Saints alternates "ora" (one saint) and "oráte" (a
  // group); both are one response, so each section gets a single band.
  it("treats ora / oráte as one response: one band per saints' section", () => {
    for (const [locale, label] of [[undefined, "ora(te) pro nobis"], ["cs", "oroduj(te) za nás"]] as const) {
      const text = locale ? translatedText(locale, PRAYER_TYPES.LITANY_SAINTS_MARTYRS)! : PRAYERS[PRAYER_TYPES.LITANY_SAINTS_MARTYRS];
      const blocks = parseLitany(text).filter((b) => b.kind !== "blank");
      expect(blocks.length, locale ?? "la").toBe(1);
      expect(blocks[0]!.kind === "run" && blocks[0]!.response, locale ?? "la").toBe(label);
    }
  });

  it("keeps a run of only the singular form labelled as such", () => {
    const blocks = parseLitany(PRAYERS[PRAYER_TYPES.LITANY_SAINTS_LAITY]);
    expect(blocks[0]!.kind === "run" && blocks[0]!.response).toBe("ora pro nobis");
  });

  it("never groups the Kyrie or a versicle", () => {
    const blocks = parseLitany(PRAYERS[PRAYER_TYPES.LITANY_SACRED_HEART]);
    const plain = blocks.filter((b) => b.kind === "plain").map((b) => b.kind === "plain" && b.line);
    expect(plain).toContain("Kyrie, eléison. 2×");
    expect(plain.some((l) => l && l.startsWith("℣"))).toBe(true);
  });
});
