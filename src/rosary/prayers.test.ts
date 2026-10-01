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
import { buildRosarySequence, OTHER_PRAYER_SETS, ORDINARY_PRAYERS, LITANIES, type SequenceItem } from "./sequence";
import { SUPPORTED_LOCALES, type Locale } from "./i18n";
import { STATE_VERSION } from "./storage";

// Resolve the displayed text for a sequence item's type. HAIL_MARY is the one
// type with no PRAYERS entry — its text is assembled by getHailMary(Tr).
const latinText = (type: PrayerType): string =>
  type === PRAYER_TYPES.HAIL_MARY ? getHailMary(undefined).after : PRAYERS[type];
const translatedText = (locale: Locale, type: PrayerType): string =>
  type === PRAYER_TYPES.HAIL_MARY
    ? getHailMaryTr(locale, undefined).after
    : PRAYER_TRANSLATIONS[locale][type];

// Every sequence the app can build, flattened to its items.
function allSequences(): { label: string; seq: SequenceItem[] }[] {
  const out: { label: string; seq: SequenceItem[] }[] = [];
  for (const key of Object.keys(MYSTERIES) as MysteryKey[]) {
    out.push({ label: `rosary:${key}`, seq: buildRosarySequence(MYSTERIES[key]) });
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
      for (const item of seq) {
        expect(latinText(item.type)?.trim(), `${label} → ${item.type} (la)`).toBeTruthy();
        for (const locale of SUPPORTED_LOCALES) {
          expect(
            translatedText(locale, item.type)?.trim(),
            `${label} → ${item.type} (${locale})`
          ).toBeTruthy();
        }
      }
    });
  }
});

describe("display names", () => {
  const registries = {
    mystery: MYSTERIES,
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
