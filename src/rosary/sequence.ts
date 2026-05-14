import { PRAYER_TYPES, type MysterySet, type PrayerType } from "./prayers";

export type SequenceItem = {
  type: PrayerType;
  label: string;
  beadId?: string;
  mystery?: string;
  decade?: number;
  num?: number;
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
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave Maria", mystery: "qui adaúgeat nobis fidem",       beadId: "tail-hm-0" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave Maria", mystery: "qui corróboret nobis spem",      beadId: "tail-hm-1" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave Maria", mystery: "qui perfíciat nobis caritátem",  beadId: "tail-hm-2" });
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
