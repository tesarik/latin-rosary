import { describe, it, expect } from "vitest";
import { buildFullRosary, buildRosarySequence, FULL_ROSARY } from "./sequence";
import { MYSTERIES } from "./prayers";
import { buildSequence, getPrayerSetMeta, isBuiltInKey, isPersistableKey, resolveSession } from "./navigation";
import { STATE_VERSION } from "./storage";
import { PRAYER_TYPES } from "./prayers";

const seq = buildFullRosary();

describe("the full rosary", () => {
  it("is one opening, the three sets' fifteen decades and one closing: 204 steps", () => {
    expect(seq).toHaveLength(7 + 15 * 13 + 2);
    const single = buildRosarySequence(MYSTERIES.radostny);
    expect(seq.slice(0, 7)).toEqual(single.slice(0, 7));
    expect(seq.slice(-2)).toEqual(single.slice(-2));
    const paters = seq.filter((s) => s.type === PRAYER_TYPES.OUR_FATHER && s.decade !== undefined);
    expect(paters.map((p) => `${p.part}${p.decade}`)).toEqual(
      ["radostny", "bolestny", "slavny"].flatMap((part) => [0, 1, 2, 3, 4].map((d) => `${part}${d}`)),
    );
  });

  it("prays each set's own mysteries in its decades", () => {
    for (const s of seq) {
      if (s.type === PRAYER_TYPES.HAIL_MARY && s.part) expect(s.mystery).toBe(MYSTERIES[s.part].mysteries[s.decade!]);
    }
  });

  it("names each ring bead once per set, every decade item tagged with its set", () => {
    for (const part of ["radostny", "bolestny", "slavny"] as const) {
      const ids = seq.filter((s) => s.part === part && s.beadId).map((s) => s.beadId);
      expect(new Set(ids).size).toBe(55);
    }
    expect(seq.filter((s) => s.decade !== undefined).every((s) => s.part)).toBe(true);
  });

  it("is a built-in rosary set of its own that keeps its place", () => {
    expect(isBuiltInKey("psalterium")).toBe(true);
    expect(isPersistableKey("psalterium")).toBe(true);
    expect(getPrayerSetMeta("psalterium")).toEqual({ name: FULL_ROSARY.psalterium.name, color: FULL_ROSARY.psalterium.color, kind: "rosary" });
    expect(buildSequence("psalterium")).toHaveLength(204);
    const session = resolveSession({ version: STATE_VERSION, active: "psalterium", progress: { psalterium: 150 } });
    expect(session.progress).toEqual({ psalterium: 150 });
  });
});
