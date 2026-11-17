// Where the bead strand of a linear set (PrayerSections) breaks into rows.
// Up to ONE_ROW beads it is one line. A longer set winds like a snake in
// rows of equal length (about TARGET_PER_ROW beads, at most MAX_ROWS rows),
// only the last one shorter, so the beads stand in columns and every row but
// the last reaches its half-turn. A very long plan keeps MAX_ROWS rows, its
// beads shrinking as they must.
export const ONE_ROW = 26;
export const TARGET_PER_ROW = 18;
export const MAX_ROWS = 4;

// The index each row starts at (the first is always 0).
export function strandRows(n: number): number[] {
  if (n <= ONE_ROW) return [0];
  const rows = Math.min(MAX_ROWS, Math.ceil(n / TARGET_PER_ROW));
  const perRow = Math.ceil(n / rows);
  return Array.from({ length: Math.ceil(n / perRow) }, (_, r) => r * perRow);
}
