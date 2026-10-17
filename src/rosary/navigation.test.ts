import { describe, it, expect } from "vitest";
import {
  isPersistableKey,
  resolveSession,
  resumeStep,
  canGoToStep,
  buildSequence,
  getPrayerSetMeta,
} from "./navigation";
import { STATE_VERSION, type SavedState } from "./storage";
import { MYSTERIES } from "./prayers";
import { OTHER_PRAYER_SETS, ORDINARY_PRAYERS, LITANIES } from "./sequence";
import { PLAN_COLOR, type Plan } from "./plans";

const saved = (active: string | null, progress: Record<string, number>): SavedState => ({
  version: STATE_VERSION,
  active,
  progress,
});

// The common case: one set open at a saved step.
const open = (key: string, step: number, plans: Plan[] = []) =>
  resolveSession(saved(key, { [key]: step }), plans);

describe("isPersistableKey", () => {
  it("accepts every rosary mystery set", () => {
    for (const k of Object.keys(MYSTERIES)) expect(isPersistableKey(k)).toBe(true);
  });

  it("accepts every linear devotion", () => {
    for (const k of Object.keys(OTHER_PRAYER_SETS)) expect(isPersistableKey(k)).toBe(true);
  });

  it("rejects single-prayer sets (one-card litanies + ordinaries)", () => {
    for (const k of Object.keys(ORDINARY_PRAYERS)) expect(isPersistableKey(k)).toBe(false);
    for (const [k, v] of Object.entries(LITANIES)) {
      if (v.kind !== "linear") expect(isPersistableKey(k)).toBe(false);
    }
  });

  // The Litany of the Saints steps through sections, so it has progress to resume.
  it("accepts a litany that declares itself linear", () => {
    const linear = Object.entries(LITANIES).filter(([, v]) => v.kind === "linear");
    expect(linear.length).toBeGreaterThan(0);
    for (const [k] of linear) expect(isPersistableKey(k)).toBe(true);
  });

  it("rejects unknown / garbage keys", () => {
    expect(isPersistableKey("")).toBe(false);
    expect(isPersistableKey("nope")).toBe(false);
    expect(isPersistableKey("constructor")).toBe(false);
    expect(isPersistableKey("toString")).toBe(false);
  });
});

describe("resolveSession", () => {
  it("returns nothing to resume when there's nothing saved", () => {
    expect(resolveSession(null)).toEqual({ active: null, progress: {} });
  });

  it("reopens a valid rosary position with a rebuilt sequence", () => {
    const { active } = open("radostny", 5);
    expect(active).not.toBeNull();
    expect(active!.key).toBe("radostny");
    expect(active!.step).toBe(5);
    expect(active!.sequence.length).toBe(74);
  });

  it("reopens a linear devotion", () => {
    const { active } = open("brigit", 3);
    expect(active!.key).toBe("brigit");
    expect(active!.sequence.length).toBe(buildSequence("brigit").length);
  });

  it("keeps the place of every unfinished set, not just the open one", () => {
    const res = resolveSession(saved("leonine", { radostny: 23, leonine: 2, saints: 5 }));
    expect(res.progress).toEqual({ radostny: 23, leonine: 2, saints: 5 });
    expect(res.active).toMatchObject({ key: "leonine", step: 2 });
  });

  it("can hold progress with nothing open (the user went back to the menu)", () => {
    const res = resolveSession(saved(null, { slavny: 40 }));
    expect(res.active).toBeNull();
    expect(res.progress).toEqual({ slavny: 40 });
  });

  it("opens a set with no saved step at its start", () => {
    expect(resolveSession(saved("bolestny", {})).active).toMatchObject({ key: "bolestny", step: 0 });
  });

  it("rejects a non-persistable key, as the open set and as progress", () => {
    const res = resolveSession(saved("loreto", { loreto: 1, pater_noster: 1 }));
    expect(res.active).toBeNull();
    expect(res.progress).toEqual({});
  });

  it("rejects prototype keys", () => {
    const res = resolveSession(saved("toString", { toString: 3, constructor: 2 }));
    expect(res.active).toBeNull();
    expect(res.progress).toEqual({});
  });

  it("drops a step past the end of the (possibly shrunk) sequence", () => {
    const len = buildSequence("radostny").length;
    expect(open("radostny", len).progress).toEqual({});
    expect(open("radostny", len + 100).progress).toEqual({});
    expect(open("radostny", len).active).toMatchObject({ key: "radostny", step: 0 });
  });

  it("accepts the last valid step but not one beyond it", () => {
    const len = buildSequence("slavny").length;
    expect(open("slavny", len - 1).progress).toEqual({ slavny: len - 1 });
    expect(open("slavny", len).progress).toEqual({});
  });

  it("drops step 0 and negative steps: nothing to resume", () => {
    expect(open("radostny", 0).progress).toEqual({});
    expect(open("radostny", -1).progress).toEqual({});
  });
});

describe("resumeStep", () => {
  it("returns the saved step only when it is worth resuming", () => {
    expect(resumeStep("radostny", 23)).toBe(23);
    expect(resumeStep("radostny", 0)).toBeNull();
    expect(resumeStep("radostny", 74)).toBeNull();
    expect(resumeStep("pater_noster", 1)).toBeNull();
  });
});

describe("canGoToStep", () => {
  const LEN = 74;

  it("allows a move to a different in-range step", () => {
    expect(canGoToStep(5, 4, LEN)).toBe(true);
    expect(canGoToStep(0, 1, LEN)).toBe(true);
    expect(canGoToStep(LEN - 1, LEN - 2, LEN)).toBe(true);
  });

  it("rejects moving past the last step (next at the end)", () => {
    expect(canGoToStep(LEN, LEN - 1, LEN)).toBe(false);
  });

  it("rejects moving before the first step (prev at the start)", () => {
    expect(canGoToStep(-1, 0, LEN)).toBe(false);
  });

  it("rejects a no-op move to the current step", () => {
    expect(canGoToStep(3, 3, LEN)).toBe(false);
  });

  it("handles a single-step sequence (no valid moves)", () => {
    expect(canGoToStep(1, 0, 1)).toBe(false);
    expect(canGoToStep(-1, 0, 1)).toBe(false);
    expect(canGoToStep(0, 0, 1)).toBe(false);
  });
});

describe("getPrayerSetMeta", () => {
  it("classifies each registry into the right kind", () => {
    expect(getPrayerSetMeta("radostny").kind).toBe("rosary");
    expect(getPrayerSetMeta("leonine").kind).toBe("linear");
    expect(getPrayerSetMeta("brigit").kind).toBe("linear");
    expect(getPrayerSetMeta("pater_noster").kind).toBe("single");
    expect(getPrayerSetMeta("loreto").kind).toBe("single");
    expect(getPrayerSetMeta("saints").kind).toBe("linear");
  });

  it("builds the Litany of the Saints as one step per section", () => {
    const seq = buildSequence("saints");
    expect(seq.length).toBe(15);
    // Every step is a section, so the bead strand shows nine tappable nodes.
    expect(seq.every((i) => !!i.section)).toBe(true);
    expect(new Set(seq.map((i) => i.type)).size).toBe(15);
  });
});

// User plans aren't a static registry — they're loaded from storage and can be
// edited or deleted — so every lookup is resolved against the list passed in.
describe("user prayer plans", () => {
  const plan: Plan = {
    id: "abc123",
    name: "Večerní modlitba",
    steps: [{ key: "signum_crucis", repeat: 1 }, { key: "ave_maria", repeat: 3 }, { key: "loreto", repeat: 1 }],
  };
  const key = "plan:abc123";

  it("classifies a plan as linear, so it gets the bead strand", () => {
    const meta = getPrayerSetMeta(key, [plan]);
    expect(meta).toEqual({ name: "Večerní modlitba", color: PLAN_COLOR, kind: "linear" });
  });

  it("builds the plan's flattened sequence", () => {
    expect(buildSequence(key, [plan]).length).toBe(5);
  });

  it("builds nothing for a plan that no longer exists", () => {
    expect(buildSequence(key, [])).toEqual([]);
  });

  it("persists a plan that exists and refuses one that doesn't", () => {
    expect(isPersistableKey(key, [plan])).toBe(true);
    expect(isPersistableKey(key, [])).toBe(false);
    expect(isPersistableKey("plan:", [plan])).toBe(false);
  });

  it("resumes a saved plan mid-sequence", () => {
    expect(open(key, 3, [plan]).active).toMatchObject({ key, step: 3 });
  });

  it("drops saved progress once the plan is deleted", () => {
    expect(open(key, 3, [])).toEqual({ active: null, progress: {} });
  });

  it("drops saved progress once the plan has been shortened past it", () => {
    const shorter: Plan = { ...plan, steps: [{ key: "signum_crucis", repeat: 1 }] };
    expect(open(key, 3, [shorter]).progress).toEqual({});
  });
});
