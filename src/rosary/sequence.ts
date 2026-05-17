import { PRAYER_TYPES, type MysterySet, type PrayerType } from "./prayers";

export type SequenceItem = {
  type: PrayerType;
  label: string;
  beadId?: string;
  mystery?: string;
  mysteryCs?: string;
  decade?: number;
  num?: number;
  // Section name for linear (non-rosary) prayer sets — drives the segmented
  // stepper shown above the prayer card. Rosary items leave this unset.
  section?: string;
};

// Rosary structure (74 positions total):
//   Opening (7): Sign of Cross + Creed + Pater Noster + 3 Ave Marias + Gloria Patri
//   5 decades (5 * 13 = 65): Pater Noster + 10 Ave Marias + Gloria Patri + Fatima
//   Closing (2): Salve Regina + Sign of Cross
//
// Bead IDs link sequence items to bead positions in the SVG (see RosaryBeads).
// Items without a beadId have no bead — the Sign of the Cross uses the cross
// glyph; Gloria Patri / Fatima / Salve Regina are "said at the junction".
export function buildRosarySequence(mysterySet: MysterySet): SequenceItem[] {
  const seq: SequenceItem[] = [];

  // Opening
  seq.push({ type: PRAYER_TYPES.SIGN_OF_CROSS, label: "Signum Crucis" });
  seq.push({ type: PRAYER_TYPES.CREED,        label: "Credo",        beadId: "tail-creed" });
  seq.push({ type: PRAYER_TYPES.OUR_FATHER,   label: "Pater Noster", beadId: "tail-of" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave Maria", mystery: "qui adaúgeat nobis fidem",      mysteryCs: "který v nás rozmnožuje víru",       beadId: "tail-hm-0" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave Maria", mystery: "qui corróboret nobis spem",     mysteryCs: "který v nás posiluje naději",      beadId: "tail-hm-1" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave Maria", mystery: "qui perfíciat nobis caritátem", mysteryCs: "který v nás zdokonaluje lásku",    beadId: "tail-hm-2" });
  seq.push({ type: PRAYER_TYPES.GLORY_BE,     label: "Gloria Patri" });

  // 5 decades
  for (let d = 0; d < 5; d++) {
    seq.push({ type: PRAYER_TYPES.OUR_FATHER, label: "Pater Noster", beadId: `ring-of-${d}` });
    for (let h = 1; h <= 10; h++) {
      seq.push({
        type: PRAYER_TYPES.HAIL_MARY,
        label: "Ave Maria",
        decade: d,
        num: h,
        mystery: mysterySet.mysteries[d],
        mysteryCs: mysterySet.mysteriesCs[d],
        beadId: `ring-hm-${d}-${h - 1}`,
      });
    }
    seq.push({ type: PRAYER_TYPES.GLORY_BE, label: "Gloria Patri" });
    seq.push({ type: PRAYER_TYPES.FATIMA,   label: "O mi Jesu" });
  }

  // Closing
  seq.push({ type: PRAYER_TYPES.SALVE_REGINA,  label: "Salve Regina" });
  seq.push({ type: PRAYER_TYPES.SIGN_OF_CROSS, label: "Signum Crucis" });
  return seq;
}

// Section labels for the Leonine post-Mass prayers. These drive the segmented
// stepper above the prayer card; tap a segment to jump to its first step.
const LEO_SECTIONS = {
  AVE: "Ave María",
  SALVE: "Salve Regína",
  OREMUS: "Orémus",
  MICHAEL: "S. Míchael",
  COR_IESU: "Cor Iesu",
} as const;

// Orationes Leonis XIII — 9 steps across 5 sections. Linear, no beads, no
// per-prayer counters. Source: orationes-leonis-xiii.pdf.
export function buildLeoninePrayers(): SequenceItem[] {
  const seq: SequenceItem[] = [];
  for (let i = 0; i < 3; i++) {
    seq.push({ type: PRAYER_TYPES.HAIL_MARY_LEONINE, label: "Ave María", section: LEO_SECTIONS.AVE });
  }
  seq.push({ type: PRAYER_TYPES.SALVE_REGINA_LEONINE, label: "Salve Regína", section: LEO_SECTIONS.SALVE });
  seq.push({ type: PRAYER_TYPES.LEONINE_OREMUS,       label: "Orémus",       section: LEO_SECTIONS.OREMUS });
  seq.push({ type: PRAYER_TYPES.ST_MICHAEL,           label: "Sancte Míchael", section: LEO_SECTIONS.MICHAEL });
  for (let i = 0; i < 3; i++) {
    seq.push({ type: PRAYER_TYPES.COR_IESU, label: "Cor Iesu", section: LEO_SECTIONS.COR_IESU });
  }
  return seq;
}

export type OtherPrayerKey = "leonine";

// Linear prayer sets (no beads, not persisted). Keyed by `OtherPrayerKey`,
// rendered as a separate block on the start screen.
export const OTHER_PRAYER_SETS: Record<OtherPrayerKey, {
  name: string;
  color: string;
  build: () => SequenceItem[];
}> = {
  leonine: {
    name: "Orationes Leonis XIII",
    color: "#5E35B1",
    build: buildLeoninePrayers,
  },
};
