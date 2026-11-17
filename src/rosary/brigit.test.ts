import { describe, it, expect } from "vitest";
import { brigitKey, brigitToOpen } from "./brigit";
import { buildSequence } from "./navigation";

describe("brigitToOpen", () => {
  it("follows the switch when neither form has a kept place", () => {
    expect(brigitToOpen(false, [])).toBe("brigit-brevis");
    expect(brigitToOpen(true, ["radostny"])).toBe("brigit");
    expect(brigitKey(false)).toBe("brigit-brevis");
  });

  it("resumes a kept place in either form, the later of two", () => {
    expect(brigitToOpen(false, ["brigit"])).toBe("brigit");
    expect(brigitToOpen(true, ["brigit-brevis", "slavny"])).toBe("brigit-brevis");
    expect(brigitToOpen(false, ["brigit-brevis", "brigit"])).toBe("brigit");
  });
});

describe("St. Bridget's prayers without the optional ones", () => {
  it("are the seven Paters and Aves, each Pater a section", () => {
    const seq = buildSequence("brigit-brevis");
    expect(seq.map((i) => i.label)).toEqual(Array.from({ length: 7 }, () => ["Pater Noster", "Ave María"]).flat());
    expect(seq.filter((i) => i.section).map((i) => i.label)).toEqual(Array(7).fill("Pater Noster"));
  });

  it("leave the full form as it was", () => {
    expect(buildSequence("brigit")).toHaveLength(22);
  });
});
