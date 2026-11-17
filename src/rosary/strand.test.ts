import { describe, it, expect } from "vitest";
import { MAX_PER_ROW, MAX_ROWS, strandRows } from "./strand";
import { OTHER_PRAYER_SETS } from "./sequence";

const rowsOf = (key: keyof typeof OTHER_PRAYER_SETS) => {
  const seq = OTHER_PRAYER_SETS[key].build();
  return { seq, rows: strandRows(seq.map((i) => !!i.section)) };
};

describe("strandRows", () => {
  it("keeps a short set on one line", () => {
    expect(rowsOf("brigit").rows).toEqual([0]);
    expect(rowsOf("ioseph").rows).toEqual([0]);
  });

  it("breaks a long set where its parts start", () => {
    // Five of the fifteen prayers a row; two of the seven sorrows a row.
    expect(rowsOf("brigit_xv").rows).toEqual([0, 15, 30]);
    expect(rowsOf("septem_dolores").rows).toEqual([0, 19, 37, 55]);
    // At most four rows, though 76 steps would want five of 18: the opening
    // and three stations, then four stations a row, the closing in the last.
    expect(rowsOf("via_crucis").rows).toEqual([0, 16, 36, 56]);
    for (const key of ["brigit_xv", "via_crucis", "spiritus", "angelica", "septem_dolores", "sanguis", "cor_iesu"] as const) {
      const { seq, rows } = rowsOf(key);
      expect(rows.length, key).toBeGreaterThan(1);
      expect(rows.length, key).toBeLessThanOrEqual(MAX_ROWS);
      for (const r of rows.slice(1)) expect(seq[r]!.section, `${key} ${r}`).toBeTruthy();
      const bounds = [...rows, seq.length];
      for (let i = 0; i < rows.length; i++) expect(bounds[i + 1]! - bounds[i]!, key).toBeLessThanOrEqual(MAX_PER_ROW);
    }
  });

  it("cuts a long set without parts evenly, into at most four rows", () => {
    expect(strandRows(Array(100).fill(false))).toEqual([0, 25, 50, 75]);
    expect(strandRows(Array(40).fill(false))).toEqual([0, 13, 27]);
  });
});
