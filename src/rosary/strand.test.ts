import { describe, it, expect } from "vitest";
import { MAX_ROWS, strandRows } from "./strand";

describe("strandRows", () => {
  it("keeps a short set on one line", () => {
    expect(strandRows(22)).toEqual([0]);
    expect(strandRows(26)).toEqual([0]);
  });

  it("winds a longer set in rows of equal length, only the last shorter", () => {
    expect(strandRows(46)).toEqual([0, 16, 32]); // St. Bridget's fifteen prayers
    expect(strandRows(69)).toEqual([0, 18, 36, 54]); // the Seven Sorrows
    expect(strandRows(76)).toEqual([0, 19, 38, 57]); // the Way of the Cross
  });

  it("keeps a very long set to four rows", () => {
    expect(strandRows(200)).toHaveLength(MAX_ROWS);
  });
});
