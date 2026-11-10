// Which of the Misál look's engravings (MissalArt.tsx) closes which prayer:
// the thorn-crowned cross after the Passion, the sorrows and the prayers for
// the dead and for mercy; the flowered tailpiece after every other one.
const CRUX_SETS: ReadonlySet<string> = new Set([
  "bolestny", "septem_dolores", "sanguis", "brigit", "stabat_mater", "miserere",
  "requiem", "de_profundis", "dies_irae", "defuncti",
]);

export const finisFor = (key: string): "crux" | "finis" => (CRUX_SETS.has(key) ? "crux" : "finis");
