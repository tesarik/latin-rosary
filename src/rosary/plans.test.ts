import { describe, it, expect } from "vitest";
import {
  sanitizePlan,
  buildPlanSequence,
  planLength,
  encodePlan,
  decodePlan,
  readSharedPlanFromHash,
  isPlanItemKey,
  isPlanKey,
  planKeyOf,
  planIdOf,
  findPlan,
  PLAN_ITEM_GROUPS,
  MAX_PLAN_LENGTH,
  MAX_PLAN_NAME,
  MAX_PLAN_STEPS,
  MAX_REPEAT,
  MAX_CUSTOM_PRAYERS,
  MAX_CUSTOM_TEXT,
  MAX_CUSTOM_TITLE,
  exportPlans,
  parsePlansBackup,
  type Plan,
} from "./plans";
import { ORDINARY_PRAYERS, LITANIES } from "./sequence";
import { PRAYER_TYPES } from "./prayers";

const plan = (steps: Plan["steps"], name = "Večerní modlitba"): Plan =>
  ({ id: "abc123", name, steps });

describe("isPlanItemKey", () => {
  it("accepts every ordinary prayer and every litany", () => {
    for (const k of Object.keys(ORDINARY_PRAYERS)) expect(isPlanItemKey(k)).toBe(true);
    for (const k of Object.keys(LITANIES)) expect(isPlanItemKey(k)).toBe(true);
  });

  // The rosary would lose its bead ring and St. Bridget's Pater/Ave sub-steps
  // would each become a bead, so neither is offered.
  it("rejects the rosary sets and the St. Bridget prayers", () => {
    for (const k of ["radostny", "bolestny", "slavny", "brigit"]) {
      expect(isPlanItemKey(k)).toBe(false);
    }
  });

  it("accepts the Leonine prayers and inlines their nine steps", () => {
    expect(isPlanItemKey("leonine")).toBe(true);
    const seq = buildPlanSequence(plan([{ key: "leonine", repeat: 1 }]));
    expect(seq.length).toBe(9);
    expect(seq.every((i) => !!i.section)).toBe(true);
    expect(PLAN_ITEM_GROUPS.some((g) => g.keys.includes("leonine"))).toBe(true);
  });

  it("rejects prototype members and unknown keys", () => {
    for (const k of ["toString", "constructor", "__proto__", "nope"]) {
      expect(isPlanItemKey(k)).toBe(false);
    }
  });
});

describe("PLAN_ITEM_GROUPS", () => {
  it("offers every ordinary prayer, litany, the Leonine prayers and the prayers for the dead exactly once", () => {
    const offered = PLAN_ITEM_GROUPS.flatMap((g) => g.keys);
    const expected = [...Object.keys(ORDINARY_PRAYERS), ...Object.keys(LITANIES), "leonine", "defuncti"];
    expect(new Set(offered).size).toBe(offered.length);
    expect([...offered].sort()).toEqual([...expected].sort());
  });

  it("follows the start screen's groups, keeping only what a plan may hold", () => {
    expect(PLAN_ITEM_GROUPS.map((g) => g.title)).toEqual(
      ["Orationes cotidiánæ", "Ad Beátam Maríam Vírginem", "Missa", "Litaníæ", "Pro defúnctis", "Devotiónes"]);
    const missa = PLAN_ITEM_GROUPS.find((g) => g.title === "Missa")!;
    expect(missa.keys.slice(0, 3)).toEqual(["iudica_me", "confiteor", "kyrie"]);
    expect(missa.keys).toContain("leonine");
    // St. Bridget's and St. Joseph's step-by-step devotions may not be in a
    // plan; Devotiónes keeps only the single prayer to St. Joseph.
    expect(PLAN_ITEM_GROUPS.find((g) => g.title === "Devotiónes")!.keys).toEqual(["ad_te_ioseph"]);
  });
});

describe("sanitizePlan", () => {
  it("passes a well-formed plan through unchanged", () => {
    const p = plan([{ key: "signum_crucis", repeat: 1 }, { key: "ave_maria", repeat: 3 }]);
    expect(sanitizePlan(p)).toEqual(p);
  });

  it("rejects a malformed id, so a plan key can't smuggle in punctuation", () => {
    for (const id of ["", "A B", "plan:x", "../x", "x".repeat(25)]) {
      expect(sanitizePlan({ ...plan([{ key: "ave_maria", repeat: 1 }]), id })).toBeNull();
    }
  });

  it("trims and caps the name, and rejects a blank one", () => {
    const steps = [{ key: "ave_maria" as const, repeat: 1 }];
    expect(sanitizePlan({ ...plan(steps), name: "  Ranní  " })?.name).toBe("Ranní");
    expect(sanitizePlan({ ...plan(steps), name: "   " })).toBeNull();
    expect(sanitizePlan({ ...plan(steps), name: "x".repeat(80) })?.name.length).toBe(MAX_PLAN_NAME);
  });

  it("drops unknown, prototype and non-object steps", () => {
    const p = sanitizePlan({
      ...plan([]),
      steps: [
        { key: "ave_maria", repeat: 1 },
        { key: "toString", repeat: 1 },
        { key: "radostny", repeat: 1 },
        { key: "nope", repeat: 1 },
        null,
        "ave_maria",
        { key: "loreto", repeat: 1 },
      ],
    });
    expect(p?.steps.map((s) => s.key)).toEqual(["ave_maria", "loreto"]);
  });

  it("rejects a plan left with no valid steps", () => {
    expect(sanitizePlan({ ...plan([]), steps: [{ key: "nope", repeat: 1 }] })).toBeNull();
    expect(sanitizePlan({ ...plan([]), steps: [] })).toBeNull();
  });

  it("clamps the repeat count", () => {
    const repeats = [0, -3, 99, 2.7, Number.NaN, undefined];
    const expected = [1, 1, MAX_REPEAT, 2, 1, 1];
    repeats.forEach((repeat, i) => {
      const p = sanitizePlan({ ...plan([]), steps: [{ key: "ave_maria", repeat }] });
      expect(p?.steps[0]!.repeat).toBe(expected[i]);
    });
  });

  it("caps the number of steps", () => {
    const steps = Array.from({ length: MAX_PLAN_STEPS + 10 }, () => ({ key: "signum_crucis", repeat: 1 }));
    expect(sanitizePlan({ ...plan([]), steps })?.steps.length).toBe(MAX_PLAN_STEPS);
  });

  // A hand-crafted share link must not hand the bead strand a thousand beads.
  it("stops once the built sequence would exceed MAX_PLAN_LENGTH", () => {
    const steps = Array.from({ length: MAX_PLAN_STEPS }, () => ({ key: "ave_maria", repeat: MAX_REPEAT }));
    const p = sanitizePlan({ ...plan([]), steps });
    expect(p).not.toBeNull();
    expect(planLength(p!.steps)).toBeLessThanOrEqual(MAX_PLAN_LENGTH);
  });
});

describe("buildPlanSequence", () => {
  it("expands repeats into one step each", () => {
    const seq = buildPlanSequence(plan([
      { key: "signum_crucis", repeat: 1 },
      { key: "ave_maria", repeat: 3 },
      { key: "signum_crucis", repeat: 1 },
    ]));
    expect(seq.length).toBe(5);
    expect(seq.map((i) => i.label)).toEqual(["Signum Crucis", "Ave María", "Ave María", "Ave María", "Signum Crucis"]);
  });

  it("marks every step as a section, so each gets a tappable bead", () => {
    const seq = buildPlanSequence(plan([{ key: "loreto", repeat: 1 }, { key: "sub_tuum", repeat: 2 }]));
    expect(seq.every((i) => !!i.section)).toBe(true);
  });

  // The one multi-step entry a plan may contain.
  it("inlines the Litany of the Saints as its fifteen sections", () => {
    const seq = buildPlanSequence(plan([{ key: "saints", repeat: 1 }]));
    expect(seq.length).toBe(15);
    expect(new Set(seq.map((i) => i.section)).size).toBe(15);
  });

  it("agrees with planLength", () => {
    const steps: Plan["steps"] = [
      { key: "pater_noster", repeat: 2 },
      { key: "saints", repeat: 1 },
      { key: "angelus", repeat: 1 },
    ];
    expect(buildPlanSequence(plan(steps)).length).toBe(planLength(steps));
  });
});

describe("share links", () => {
  it("round-trips a plan, minus its id", () => {
    const p = plan([{ key: "signum_crucis", repeat: 1 }, { key: "ave_maria", repeat: 3 }]);
    expect(decodePlan(encodePlan(p))).toEqual({ name: p.name, steps: p.steps });
  });

  // encodeURIComponent escapes both separators, so a name may contain them.
  it("survives a name with separators and diacritics", () => {
    const p = plan([{ key: "ave_maria", repeat: 1 }], "Ráno; večer, denně — æ");
    expect(decodePlan(encodePlan(p))?.name).toBe("Ráno; večer, denně — æ");
  });

  it("validates a decoded payload like any stored plan", () => {
    expect(decodePlan("Plán;nope,toString")).toBeNull();
    expect(decodePlan("Plán;ave_maria*999")?.steps[0]!.repeat).toBe(MAX_REPEAT);
    expect(decodePlan("Plán;ave_maria,radostny")?.steps.map((s) => s.key)).toEqual(["ave_maria"]);
  });

  it("rejects junk payloads", () => {
    for (const junk of ["", "no-separator", ";", "Plán;", "%E0%A4%A;ave_maria"]) {
      expect(decodePlan(junk)).toBeNull();
    }
  });

  it("reads the plan out of a URL fragment", () => {
    expect(readSharedPlanFromHash("#plan=R%C3%A1no;ave_maria*2")).toEqual({
      name: "Ráno",
      steps: [{ key: "ave_maria", repeat: 2 }],
    });
    expect(readSharedPlanFromHash("#other=1")).toBeNull();
    expect(readSharedPlanFromHash("")).toBeNull();
  });
});

describe("plan set keys", () => {
  it("prefixes ids so they can't collide with a registry key", () => {
    expect(planKeyOf("abc123")).toBe("plan:abc123");
    expect(planIdOf(planKeyOf("abc123"))).toBe("abc123");
    expect(isPlanKey("plan:abc123")).toBe(true);
    for (const k of ["radostny", "loreto", "leonine", "ave_maria"]) expect(isPlanKey(k)).toBe(false);
  });

  it("resolves a key against the live plan list", () => {
    const p = plan([{ key: "ave_maria", repeat: 1 }]);
    expect(findPlan([p], "plan:abc123")).toBe(p);
    expect(findPlan([p], "plan:gone")).toBeNull();
    expect(findPlan([], "plan:abc123")).toBeNull();
  });
});

// A plan's own prayers: text the user writes, stored inside the plan.
describe("custom prayers", () => {
  const withCustom = (custom: unknown[], steps: unknown[]) =>
    sanitizePlan({ id: "abc123", name: "Můj plán", steps, custom });
  const mine = { id: "c1", title: "Za rodinu", text: "Pane, žehnej naší rodině.\nAmen.", textTr: "Lord, bless our family. Amen." };

  it("keeps a custom prayer a step uses, and builds it as one card", () => {
    const p = withCustom([mine], [{ key: "pater_noster", repeat: 1 }, { key: "custom:c1", repeat: 2 }])!;
    expect(p.custom).toEqual([mine]);
    const seq = buildPlanSequence(p);
    expect(seq.length).toBe(3);
    expect(seq[1]).toMatchObject({ type: PRAYER_TYPES.CUSTOM, label: "Za rodinu", section: "Za rodinu", custom: { text: mine.text, textTr: mine.textTr } });
    expect(planLength(p.steps)).toBe(3);
  });

  it("drops an unused custom prayer, and a step naming one the plan lacks", () => {
    const p = withCustom([mine, { ...mine, id: "c2" }], [{ key: "custom:c1", repeat: 1 }, { key: "custom:c9", repeat: 1 }])!;
    expect(p.custom!.map((c) => c.id)).toEqual(["c1"]);
    expect(p.steps.map((s) => s.key)).toEqual(["custom:c1"]);
  });

  it("rejects a plan whose only step is a missing custom prayer", () => {
    expect(withCustom([], [{ key: "custom:c1", repeat: 1 }])).toBeNull();
  });

  it("caps and cleans the fields", () => {
    const long = withCustom(
      [{ id: "c1", title: "  T  ".repeat(40), text: "x".repeat(MAX_CUSTOM_TEXT + 50), textTr: "   " }],
      [{ key: "custom:c1", repeat: 1 }]
    )!;
    const c = long.custom![0]!;
    expect(c.title.length).toBeLessThanOrEqual(MAX_CUSTOM_TITLE);
    expect(c.title).not.toMatch(/\s{2}/);
    expect(c.text.length).toBe(MAX_CUSTOM_TEXT);
    expect("textTr" in c).toBe(false);
    const crlf = withCustom([{ id: "c1", title: "A", text: "a\r\nb" }], [{ key: "custom:c1", repeat: 1 }])!;
    expect(crlf.custom![0]!.text).toBe("a\nb");
  });

  it("drops a custom prayer with no title or text, a bad id, or past the cap", () => {
    const steps = Array.from({ length: 12 }, (_, i) => ({ key: `custom:c${i + 1}`, repeat: 1 }));
    const many = Array.from({ length: 12 }, (_, i) => ({ id: `c${i + 1}`, title: `T${i}`, text: "x" }));
    expect(withCustom(many, steps)!.custom!.length).toBe(MAX_CUSTOM_PRAYERS);
    expect(withCustom([{ id: "c1", title: "", text: "x" }], [{ key: "custom:c1", repeat: 1 }])).toBeNull();
    expect(withCustom([{ id: "c1", title: "T", text: "  " }], [{ key: "custom:c1", repeat: 1 }])).toBeNull();
    expect(withCustom([{ id: "__proto__", title: "T", text: "x" }], [{ key: "custom:__proto__", repeat: 1 }])).toBeNull();
  });

  it("round-trips through a share link, whatever the text contains", () => {
    const tricky = { id: "c1", title: "Za; mír: a, víru %", text: "Řádek 1\nŘádek 2; 50 % : konec, ✝", textTr: "Line: one; two" };
    const p = withCustom([tricky], [{ key: "ave_maria", repeat: 3 }, { key: "custom:c1", repeat: 1 }])!;
    expect(decodePlan(encodePlan(p))).toEqual({ name: p.name, steps: p.steps, custom: [tricky] });
  });

  it("still reads a share link from before custom prayers", () => {
    expect(decodePlan("Ve%C4%8Der;pater_noster,ave_maria*3")).toEqual({
      name: "Večer",
      steps: [{ key: "pater_noster", repeat: 1 }, { key: "ave_maria", repeat: 3 }],
    });
  });
});

describe("backup", () => {
  const plans: Plan[] = [
    { id: "p1", name: "Ráno", steps: [{ key: "angelus", repeat: 1 }] },
    {
      id: "p2",
      name: "Večer",
      steps: [{ key: "loreto", repeat: 1 }, { key: "custom:c1", repeat: 1 }],
      custom: [{ id: "c1", title: "Za rodinu", text: "Amen." }],
    },
  ];

  it("round-trips every plan, without ids", () => {
    const withoutIds = plans.map((p) => { const rest: Partial<Plan> = { ...p }; delete rest.id; return rest; });
    expect(parsePlansBackup(exportPlans(plans))).toEqual(withoutIds);
  });

  it("rejects anything that isn't a backup of this app", () => {
    expect(parsePlansBackup("not json")).toBeNull();
    expect(parsePlansBackup(JSON.stringify({ plans }))).toBeNull();
    expect(parsePlansBackup(JSON.stringify({ app: "other", version: 1, plans }))).toBeNull();
  });

  it("drops invalid plans from a backup but keeps the rest", () => {
    const json = JSON.stringify({ app: "latin-rosary", version: 1, plans: [plans[0], { name: "", steps: [] }, null] });
    expect(parsePlansBackup(json)).toEqual([{ name: "Ráno", steps: [{ key: "angelus", repeat: 1 }] }]);
  });
});
