import { describe, it, expect } from "vitest";
import { buildFullRosary, buildRosarySequence, FULL_ROSARY, ROSARY_OPENING_EXTRA, setRosaryOpeningFull } from "./sequence";
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

  it("lays its fifteen decades on one ring, every bead once, every decade item tagged with its set", () => {
    const ring = seq.filter((s) => s.beadId?.startsWith("ring-")).map((s) => s.beadId);
    expect(ring).toHaveLength(165);
    expect(new Set(ring).size).toBe(165);
    expect(seq.find((s) => s.part === "bolestny" && s.type === PRAYER_TYPES.OUR_FATHER)!.beadId).toBe("ring-of-5");
    expect(seq.find((s) => s.part === "slavny" && s.type === PRAYER_TYPES.OUR_FATHER)!.beadId).toBe("ring-of-10");
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

describe("the rosary's optional opening prayers", () => {
  it("add two steps after the Sign of the Cross, and leave the beads as they were", () => {
    const beads = (s: { beadId?: string }[]) => s.map((i) => i.beadId).filter(Boolean);
    const plain = buildRosarySequence(MYSTERIES.radostny);
    setRosaryOpeningFull(true);
    try {
      const full = buildRosarySequence(MYSTERIES.radostny);
      expect(full).toHaveLength(plain.length + ROSARY_OPENING_EXTRA);
      expect(full.slice(1, 3).map((i) => i.type)).toEqual([PRAYER_TYPES.ROSARY_APERI, PRAYER_TYPES.ROSARY_DIGNARE]);
      expect(full.slice(3)).toEqual(plain.slice(1));
      expect(beads(full)).toEqual(beads(plain));
      expect(buildFullRosary()).toHaveLength(seq.length + ROSARY_OPENING_EXTRA);
    } finally {
      setRosaryOpeningFull(false);
    }
  });
});
