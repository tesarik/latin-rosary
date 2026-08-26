import { describe, it, expect } from "vitest";
import {
  sanitizePlan,
  buildPlanSequence,
  planLength,
  planItemName,
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
  type Plan,
} from "./plans";
import { ORDINARY_PRAYERS, LITANIES } from "./sequence";

const plan = (steps: Plan["steps"], name = "Večerní modlitba"): Plan =>
  ({ id: "abc123", name, steps });

describe("isPlanItemKey", () => {
  it("accepts every ordinary prayer and every litany", () => {
    for (const k of Object.keys(ORDINARY_PRAYERS)) expect(isPlanItemKey(k)).toBe(true);
    for (const k of Object.keys(LITANIES)) expect(isPlanItemKey(k)).toBe(true);
  });

  // A plan strings together short prayers; the rosary and the linear devotions
  // are deliberately not offered (they'd lose their own navigation).
  it("rejects the rosary sets and the linear devotions", () => {
    for (const k of ["radostny", "bolestny", "slavny", "leonine", "brigit"]) {
      expect(isPlanItemKey(k)).toBe(false);
    }
  });

  it("rejects prototype members and unknown keys", () => {
    for (const k of ["toString", "constructor", "__proto__", "nope"]) {
      expect(isPlanItemKey(k)).toBe(false);
    }
  });
});

describe("PLAN_ITEM_GROUPS", () => {
  it("offers every ordinary prayer and litany exactly once", () => {
    const offered = PLAN_ITEM_GROUPS.flatMap((g) => g.keys);
    const expected = [...Object.keys(ORDINARY_PRAYERS), ...Object.keys(LITANIES)];
    expect(new Set(offered).size).toBe(offered.length);
    expect([...offered].sort()).toEqual([...expected].sort());
  });

  it("sorts each group by name", () => {
    for (const group of PLAN_ITEM_GROUPS) {
      const names = group.keys.map(planItemName);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    }
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
