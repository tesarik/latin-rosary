// Where the bead strand of a linear set (PrayerSections) breaks into rows.
// Up to ONE_ROW beads it is one line. A longer set winds like a snake, and
// its rows break where a section starts, so each row opens with a large bead
// and holds whole parts of the prayer (five of St. Bridget's fifteen prayers,
// two of the Seven Sorrows): the fewest rows — from about TARGET_PER_ROW beads
// a row, at most MAX_ROWS — whose longest row holds no more than MAX_PER_ROW,
// and of those the most even. A set no such split fits (a long plan) is cut
// evenly into MAX_ROWS rows, its beads shrinking as they must.
export const ONE_ROW = 26;
export const TARGET_PER_ROW = 18;
export const MAX_PER_ROW = 22;
export const MAX_ROWS = 4;

// The index each row starts at (the first is always 0).
export function strandRows(sections: readonly boolean[]): number[] {
  const n = sections.length;
  if (n <= ONE_ROW) return [0];
  const starts = sections.map((s, i) => (s && i > 0 ? i : -1)).filter((i) => i > 0);
  for (let rows = Math.min(MAX_ROWS, Math.ceil(n / TARGET_PER_ROW)); rows <= MAX_ROWS; rows++) {
    const best = bestSplit(n, starts, rows);
    if (best) return best;
  }
  const rows = Math.min(MAX_ROWS, Math.ceil(n / TARGET_PER_ROW));
  return Array.from({ length: rows }, (_, r) => Math.round((r * n) / rows));
}

// The split into `rows` rows at section starts whose longest row is shortest
// (no longer than MAX_PER_ROW), ties going to the smaller spread; null if none.
function bestSplit(n: number, starts: number[], rows: number): number[] | null {
  let best: { breaks: number[]; max: number; spread: number } | null = null;
  const walk = (from: number, chosen: number[]) => {
    if (chosen.length === rows - 1) {
      const bounds = [0, ...chosen, n];
      const lens = bounds.slice(1).map((b, i) => b - bounds[i]!);
      const max = Math.max(...lens);
      const spread = max - Math.min(...lens);
      if (max <= MAX_PER_ROW && (!best || max < best.max || (max === best.max && spread < best.spread))) {
        best = { breaks: [0, ...chosen], max, spread };
      }
      return;
    }
    const prev = chosen.at(-1) ?? 0;
    for (let k = from; k < starts.length; k++) {
      // Rows only grow from here: a row already too long ends the search.
      if (starts[k]! - prev > MAX_PER_ROW) break;
      walk(k + 1, [...chosen, starts[k]!]);
    }
  };
  walk(0, []);
  return (best as { breaks: number[] } | null)?.breaks ?? null;
}
