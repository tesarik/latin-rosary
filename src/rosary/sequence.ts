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
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave María", mystery: "qui adaúgeat nobis fidem",      mysteryCs: "který v nás rozmnožuje víru",       beadId: "tail-hm-0" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave María", mystery: "qui corróboret nobis spem",     mysteryCs: "který v nás posiluje naději",      beadId: "tail-hm-1" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave María", mystery: "qui perfíciat nobis caritátem", mysteryCs: "který v nás zdokonaluje lásku",    beadId: "tail-hm-2" });
  seq.push({ type: PRAYER_TYPES.GLORY_BE,     label: "Gloria Patri" });

  // 5 decades
  for (let d = 0; d < 5; d++) {
    seq.push({ type: PRAYER_TYPES.OUR_FATHER, label: "Pater Noster", beadId: `ring-of-${d}` });
    for (let h = 1; h <= 10; h++) {
      seq.push({
        type: PRAYER_TYPES.HAIL_MARY,
        label: "Ave María",
        decade: d,
        num: h,
        mystery: mysterySet.mysteries[d],
        mysteryCs: mysterySet.mysteriesCs[d],
        beadId: `ring-hm-${d}-${h - 1}`,
      });
    }
    seq.push({ type: PRAYER_TYPES.GLORY_BE, label: "Gloria Patri" });
    seq.push({ type: PRAYER_TYPES.FATIMA,   label: "O mi Iesu" });
  }

  // Closing
  seq.push({ type: PRAYER_TYPES.SALVE_REGINA,  label: "Salve Regína" });
  seq.push({ type: PRAYER_TYPES.SIGN_OF_CROSS, label: "Signum Crucis" });
  return seq;
}

// Section labels for the Leonine post-Mass prayers. These drive the circular
// stepper above the prayer card; tap a node to jump to its first step.
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
    seq.push({ type: PRAYER_TYPES.HAIL_MARY, label: "Ave María", section: LEO_SECTIONS.AVE });
  }
  seq.push({ type: PRAYER_TYPES.SALVE_REGINA_LEONINE, label: "Salve Regína", section: LEO_SECTIONS.SALVE });
  seq.push({ type: PRAYER_TYPES.LEONINE_OREMUS,       label: "Orémus",       section: LEO_SECTIONS.OREMUS });
  seq.push({ type: PRAYER_TYPES.ST_MICHAEL,           label: "Sancte Míchael", section: LEO_SECTIONS.MICHAEL });
  for (let i = 0; i < 3; i++) {
    seq.push({ type: PRAYER_TYPES.COR_IESU, label: "Cor Iesu", section: LEO_SECTIONS.COR_IESU });
  }
  return seq;
}

// Seven Prayers of St. Bridget — the seven sheddings of the Precious Blood.
// Each shedding's ring node is anchored on its meditation prayer (the only
// sectioned item); the Pater Noster + Ave María that follow are unsectioned
// sub-steps, so the circular stepper stays at 8 nodes (opening + 7) instead of
// 22. The short `section` is the ring-pill label; the fuller `label` shows in
// the card's label chip. While on a Pater/Ave sub-step no ring node is the
// "active" one — its shedding node reads as already traversed, which is fine.
const BRIGIT_PRAYERS = [
  { type: PRAYER_TYPES.BRIGIT_CIRCUMCISION, section: "Circumcísio", label: "In Circumcisióne" },
  { type: PRAYER_TYPES.BRIGIT_AGONY,        section: "Agónia",      label: "In Agónia in Horto" },
  { type: PRAYER_TYPES.BRIGIT_SCOURGING,    section: "Flagellátio", label: "In Flagellatióne" },
  { type: PRAYER_TYPES.BRIGIT_THORNS,       section: "Spinæ",       label: "In Coronatióne Spinárum" },
  { type: PRAYER_TYPES.BRIGIT_CROSS,        section: "Via Crucis",  label: "In Baiulatióne Crucis" },
  { type: PRAYER_TYPES.BRIGIT_CRUCIFIXION,  section: "Crucifíxio",  label: "In Crucifixióne" },
  { type: PRAYER_TYPES.BRIGIT_PIERCING,     section: "Láncea",      label: "In Apertióne Láteris" },
] as const;

// Opening prayer + 7 sheddings × (meditation + Pater Noster + Ave María) =
// 22 steps. Linear, no beads. Texts are a translation, not a sourced edition
// (see the note in prayers.ts above the BRIGIT_* entries).
export function buildBrigitPrayers(): SequenceItem[] {
  const seq: SequenceItem[] = [];
  seq.push({ type: PRAYER_TYPES.BRIGIT_OPENING, label: "Inítium", section: "Inítium" });
  for (const p of BRIGIT_PRAYERS) {
    seq.push({ type: p.type, label: p.label, section: p.section });
    seq.push({ type: PRAYER_TYPES.OUR_FATHER, label: "Pater Noster" });
    seq.push({ type: PRAYER_TYPES.HAIL_MARY,  label: "Ave María" });
  }
  return seq;
}

export type OtherPrayerKey = "leonine" | "brigit";

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
  brigit: {
    name: "Orationes Sanctæ Brigittæ",
    color: "#8E1B1B",
    build: buildBrigitPrayers,
  },
};

export type OrdinaryPrayerKey =
  | "alma_redemptoris"
  | "ave_regina_caelorum"
  | "signum_crucis"
  | "pater_noster"
  | "ave_maria"
  | "gloria_patri"
  | "symbolum_apostolorum"
  | "symbolum_athanasianum"
  | "symbolum_nicenum"
  | "salve_regina"
  | "sub_tuum"
  | "angelus"
  | "regina_caeli"
  | "anima_christi"
  | "angele_dei"
  | "sancte_michael"
  | "requiem"
  | "decalogue";

// Shared accent for the standalone "ordinary" prayers (no liturgical color of
// their own) — the app's brand blue.
const ORDINARY_COLOR = "#1565C0";

// Orationes utilissimæ — standalone single prayers, shown as expandable links
// on the start screen. Each builds a one-step sequence: no beads, no stepper,
// not persisted. Prayers the app already had reuse their existing type; the
// rest use the types added in prayers.ts. The start-screen menu sorts these
// alphabetically by name, so registry order here doesn't matter. Salve Regína
// reuses the Leonine antiphon (which also carries the ℣/℟ versicle).
const ordinary = (name: string, type: PrayerType): { name: string; color: string; build: () => SequenceItem[] } =>
  ({ name, color: ORDINARY_COLOR, build: () => [{ type, label: name }] });

export const ORDINARY_PRAYERS: Record<OrdinaryPrayerKey, {
  name: string;
  color: string;
  build: () => SequenceItem[];
}> = {
  alma_redemptoris:     ordinary("Alma Redemptóris Mater", PRAYER_TYPES.ALMA_REDEMPTORIS),
  ave_regina_caelorum:  ordinary("Ave Regína Cælórum",   PRAYER_TYPES.AVE_REGINA_CAELORUM),
  signum_crucis:        ordinary("Signum Crucis",        PRAYER_TYPES.SIGN_OF_CROSS),
  pater_noster:         ordinary("Pater Noster",         PRAYER_TYPES.OUR_FATHER),
  ave_maria:            ordinary("Ave María",            PRAYER_TYPES.HAIL_MARY),
  gloria_patri:         ordinary("Gloria Patri",         PRAYER_TYPES.GLORY_BE),
  symbolum_apostolorum: ordinary("Symbolum Apostolórum", PRAYER_TYPES.CREED),
  symbolum_athanasianum:ordinary("Symbolum Athanasiánum", PRAYER_TYPES.ATHANASIAN_CREED),
  symbolum_nicenum:     ordinary("Symbolum Nicænum",     PRAYER_TYPES.NICENE_CREED),
  salve_regina:         ordinary("Salve Regína",         PRAYER_TYPES.SALVE_REGINA_LEONINE),
  sub_tuum:             ordinary("Sub tuum præsídium",   PRAYER_TYPES.SUB_TUUM),
  angelus:              ordinary("Angelus Dómini",       PRAYER_TYPES.ANGELUS),
  regina_caeli:         ordinary("Regína Cæli",          PRAYER_TYPES.REGINA_CAELI),
  anima_christi:        ordinary("Ánima Christi",        PRAYER_TYPES.ANIMA_CHRISTI),
  angele_dei:           ordinary("Angele Dei",           PRAYER_TYPES.ANGELE_DEI),
  sancte_michael:       ordinary("Sancte Míchael",       PRAYER_TYPES.ST_MICHAEL),
  requiem:              ordinary("Pro defunctis (Réquiem)", PRAYER_TYPES.REQUIEM),
  decalogue:            ordinary("Decálogus",            PRAYER_TYPES.DECALOGUE),
};

export type LitanyKey = "loreto" | "sacred_heart";

const LITANY_COLOR = "#3949AB";

const litany = (name: string, type: PrayerType): { name: string; color: string; build: () => SequenceItem[] } =>
  ({ name, color: LITANY_COLOR, build: () => [{ type, label: name }] });

// Litanies — shown as expandable links under "Litaníæ" on the start screen,
// same single-prayer model as ORDINARY_PRAYERS (one long step, no beads). More
// litanies will be added.
export const LITANIES: Record<LitanyKey, {
  name: string;
  color: string;
  build: () => SequenceItem[];
}> = {
  loreto:       litany("Litaníæ Lauretánæ", PRAYER_TYPES.LITANY_LORETO),
  sacred_heart: litany("Litaníæ Sacratíssimi Cordis Iesu", PRAYER_TYPES.LITANY_SACRED_HEART),
};
