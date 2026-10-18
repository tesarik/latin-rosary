import { PRAYER_TYPES, type Localized, type MysterySet, type PrayerType } from "./prayers";

export type SequenceItem = {
  type: PrayerType;
  label: string;
  beadId?: string;
  mystery?: string;
  // The same clause in each UI language; the card picks the active one.
  mysteryTr?: Localized;
  // The decade (0–4) a rosary item belongs to: its Pater Noster, ten Ave
  // Marías, Gloria Patri and Fatima prayer. Unset outside the decades.
  decade?: number;
  num?: number;
  // Section name for linear (non-rosary) prayer sets — drives the segmented
  // stepper shown above the prayer card. Rosary items leave this unset.
  section?: string;
  // For one section of a longer text: the [start, end) line range to show.
  // Line-based, so one range serves every language (see sliceLines).
  lines?: readonly [number, number];
  // A user's own prayer (type CUSTOM): its text, and optionally a second
  // version that the language button switches to.
  custom?: { text: string; textTr?: string };
};

// The [start, end) lines of a text, without the blank spacer lines a section
// boundary leaves at either edge.
export function sliceLines(text: string, [start, end]: readonly [number, number]): string {
  const lines = text.split("\n").slice(start, end);
  while (lines.length > 0 && lines[0]!.trim() === "") lines.shift();
  while (lines.length > 0 && lines[lines.length - 1]!.trim() === "") lines.pop();
  return lines.join("\n");
}

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
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave María", mystery: "qui adaúgeat nobis fidem",      mysteryTr: { cs: "který v nás rozmnožuje víru",  en: "who may increase our faith" },     beadId: "tail-hm-0" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave María", mystery: "qui corróboret nobis spem",     mysteryTr: { cs: "který v nás posiluje naději", en: "who may strengthen our hope" },    beadId: "tail-hm-1" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY,    label: "Ave María", mystery: "qui perfíciat nobis caritátem", mysteryTr: { cs: "který v nás zdokonaluje lásku", en: "who may perfect our charity" },   beadId: "tail-hm-2" });
  seq.push({ type: PRAYER_TYPES.GLORY_BE,     label: "Gloria Patri" });

  // 5 decades
  for (let d = 0; d < 5; d++) {
    seq.push({ type: PRAYER_TYPES.OUR_FATHER, label: "Pater Noster", decade: d, beadId: `ring-of-${d}` });
    for (let h = 1; h <= 10; h++) {
      seq.push({
        type: PRAYER_TYPES.HAIL_MARY,
        label: "Ave María",
        decade: d,
        num: h,
        mystery: mysterySet.mysteries[d],
        mysteryTr: {
          cs: mysterySet.mysteriesTr.cs[d]!,
          en: mysterySet.mysteriesTr.en[d]!,
        },
        beadId: `ring-hm-${d}-${h - 1}`,
      });
    }
    seq.push({ type: PRAYER_TYPES.GLORY_BE, label: "Gloria Patri", decade: d });
    seq.push({ type: PRAYER_TYPES.FATIMA,   label: "O mi Iesu",    decade: d });
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
  nameTr: Localized;
  color: string;
  build: () => SequenceItem[];
}> = {
  leonine: {
    name: "Orationes Leonis XIII",
    nameTr: { cs: "Modlitby Lva XIII.", en: "The Leonine Prayers" },
    color: "#5E35B1",
    build: buildLeoninePrayers,
  },
  brigit: {
    name: "Orationes Sanctæ Brigittæ",
    nameTr: { cs: "Modlitby svaté Brigity", en: "The Prayers of Saint Bridget" },
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
// The Latin `name` titles the entry; `nameTr` is the localized subtitle under it
// on the start screen and in the plan editor's picker.
const ordinary = (name: string, nameTr: Localized, type: PrayerType): OrdinaryEntry =>
  ({ name, nameTr, color: ORDINARY_COLOR, build: () => [{ type, label: name }] });

type OrdinaryEntry = {
  name: string;
  nameTr: Localized;
  color: string;
  build: () => SequenceItem[];
};

export const ORDINARY_PRAYERS: Record<OrdinaryPrayerKey, OrdinaryEntry> = {
  alma_redemptoris:     ordinary("Alma Redemptóris Mater", { cs: "Slavná Matko Spasitele", en: "Loving Mother of the Redeemer" }, PRAYER_TYPES.ALMA_REDEMPTORIS),
  ave_regina_caelorum:  ordinary("Ave Regína Cælórum", { cs: "Zdráva buď, Královno nebes", en: "Hail, Queen of Heaven" },   PRAYER_TYPES.AVE_REGINA_CAELORUM),
  signum_crucis:        ordinary("Signum Crucis", { cs: "Znamení kříže", en: "The Sign of the Cross" },        PRAYER_TYPES.SIGN_OF_CROSS),
  pater_noster:         ordinary("Pater Noster", { cs: "Otče náš", en: "The Our Father" },         PRAYER_TYPES.OUR_FATHER),
  ave_maria:            ordinary("Ave María", { cs: "Zdrávas, Maria", en: "The Hail Mary" },            PRAYER_TYPES.HAIL_MARY),
  gloria_patri:         ordinary("Gloria Patri", { cs: "Sláva Otci", en: "The Glory Be" },         PRAYER_TYPES.GLORY_BE),
  symbolum_apostolorum: ordinary("Symbolum Apostolórum", { cs: "Apoštolské vyznání víry", en: "The Apostles' Creed" }, PRAYER_TYPES.CREED),
  symbolum_athanasianum:ordinary("Symbolum Athanasiánum", { cs: "Athanasiánské vyznání víry", en: "The Athanasian Creed" }, PRAYER_TYPES.ATHANASIAN_CREED),
  symbolum_nicenum:     ordinary("Symbolum Nicænum", { cs: "Nicejsko-cařihradské vyznání víry", en: "The Nicene Creed" },     PRAYER_TYPES.NICENE_CREED),
  salve_regina:         ordinary("Salve Regína", { cs: "Zdrávas Královno", en: "Hail, Holy Queen" },         PRAYER_TYPES.SALVE_REGINA_LEONINE),
  sub_tuum:             ordinary("Sub tuum præsídium", { cs: "Pod ochranu tvou", en: "Under Thy Protection" },   PRAYER_TYPES.SUB_TUUM),
  angelus:              ordinary("Angelus Dómini", { cs: "Anděl Páně", en: "The Angelus" },       PRAYER_TYPES.ANGELUS),
  regina_caeli:         ordinary("Regína Cæli", { cs: "Raduj se, Královno nebeská", en: "Queen of Heaven" },          PRAYER_TYPES.REGINA_CAELI),
  anima_christi:        ordinary("Ánima Christi", { cs: "Duše Kristova", en: "Soul of Christ" },        PRAYER_TYPES.ANIMA_CHRISTI),
  angele_dei:           ordinary("Angele Dei", { cs: "Anděle Boží", en: "Angel of God" },           PRAYER_TYPES.ANGELE_DEI),
  sancte_michael:       ordinary("Sancte Míchael", { cs: "Svatý Michaeli", en: "Saint Michael the Archangel" },       PRAYER_TYPES.ST_MICHAEL),
  requiem:              ordinary("Pro defunctis (Réquiem)", { cs: "Za zemřelé", en: "Eternal Rest" }, PRAYER_TYPES.REQUIEM),
  decalogue:            ordinary("Decálogus", { cs: "Desatero", en: "The Ten Commandments" },            PRAYER_TYPES.DECALOGUE),
};

export type LitanyKey =
  | "loreto"
  | "sacred_heart"
  | "holy_name"
  | "humility"
  | "st_joseph"
  | "precious_blood"
  | "saints";

const LITANY_COLOR = "#3949AB";

type LitanyEntry = {
  name: string;
  nameTr: Localized;
  color: string;
  build: () => SequenceItem[];
  // "linear" steps through sections (and therefore persists — see
  // isPersistableKey); a litany without a kind is one single step. Every
  // litany is linear today: the Litany of the Saints with one prayer type per
  // section, the others cut from one text by line range (see `litany`).
  kind?: "single" | "linear";
};

// A litany stepped through section by section, cut out of its one text by line
// number. Each section is [label, first line]; it runs to the next section's
// first line, and the last one to the end. The translations keep the Latin's
// line structure (prayers.test.ts checks it), so one set of cuts fits every
// language. The label is the section's opening words, or its theme.
const litany = (
  name: string,
  nameTr: Localized,
  type: PrayerType,
  sections: readonly (readonly [string, number])[]
): LitanyEntry => ({
  name,
  nameTr,
  color: LITANY_COLOR,
  kind: "linear",
  build: () =>
    sections.map(([label, start], i) => ({
      type,
      label,
      section: label,
      lines: [start, sections[i + 1]?.[1] ?? Number.MAX_SAFE_INTEGER] as const,
    })),
});

// The Litany of the Saints, section by section — the source's own five divisions,
// with the saints split into their labelled groups and the long conclusion into
// three parts. The `section` on each item is what the bead strand and the card's
// label chip show; each is one step.
const LITANY_SAINTS_SECTIONS = [
  { type: PRAYER_TYPES.LITANY_SAINTS_SUPPLICATIO, section: "Supplicátio" },
  { type: PRAYER_TYPES.LITANY_SAINTS_MARY,        section: "Sancta María" },
  { type: PRAYER_TYPES.LITANY_SAINTS_PATRIARCHS,  section: "Patriárchæ" },
  { type: PRAYER_TYPES.LITANY_SAINTS_APOSTLES,    section: "Apóstoli" },
  { type: PRAYER_TYPES.LITANY_SAINTS_MARTYRS,     section: "Mártyres" },
  { type: PRAYER_TYPES.LITANY_SAINTS_BISHOPS,     section: "Epíscopi" },
  { type: PRAYER_TYPES.LITANY_SAINTS_RELIGIOUS,   section: "Presbýteri" },
  { type: PRAYER_TYPES.LITANY_SAINTS_WOMEN,       section: "Sanctæ Dei" },
  { type: PRAYER_TYPES.LITANY_SAINTS_LAITY,       section: "Láici" },
  { type: PRAYER_TYPES.LITANY_SAINTS_CHRIST,      section: "Ad Christum" },
  { type: PRAYER_TYPES.LITANY_SAINTS_NECESSITIES, section: "Necessitátes" },
  { type: PRAYER_TYPES.LITANY_SAINTS_CONCLUSION,  section: "Conclúsio" },
  { type: PRAYER_TYPES.LITANY_SAINTS_PSALM,       section: "Psalmus LXIX" },
  { type: PRAYER_TYPES.LITANY_SAINTS_VERSICLES,   section: "Versículi" },
  { type: PRAYER_TYPES.LITANY_SAINTS_COLLECTS,    section: "Collectæ" },
] as const;

export function buildSaintsLitany(): SequenceItem[] {
  return LITANY_SAINTS_SECTIONS.map((s) => ({ type: s.type, label: s.section, section: s.section }));
}

// Litanies — shown as expandable links under "Litaníæ" on the start screen.
// Each steps through its sections with the bead strand, like the Leonine
// prayers: the six litanies approved for public recitation, plus the Litany of
// Humility (a private devotion). Sections follow each litany's own divisions —
// the Kyrie and the Trinity, the groups of invocations, then the Agnus Dei
// with the versicle and collect — splitting a long run of one form roughly
// evenly where the text has no division of its own.
export const LITANIES: Record<LitanyKey, LitanyEntry> = {
  loreto: litany("Litaníæ Lauretánæ", { cs: "Loretánské litanie", en: "The Litany of Loreto" }, PRAYER_TYPES.LITANY_LORETO, [
    ["Kyrie", 0],
    ["Sancta María", 10],
    ["Virgo", 27],
    ["Spéculum iustítiæ", 33],
    ["Regína", 51],
    ["Agnus Dei", 65],
  ]),
  sacred_heart: litany("Litaníæ Sacratíssimi Cordis Iesu", { cs: "Litanie k Nejsvětějšímu Srdci Ježíšovu", en: "The Litany of the Sacred Heart" }, PRAYER_TYPES.LITANY_SACRED_HEART, [
    ["Kyrie", 0],
    ["Cor Iesu I", 10],
    ["Cor Iesu II", 23],
    ["Cor Iesu III", 32],
    ["Agnus Dei", 44],
  ]),
  holy_name: litany("Litaníæ Sanctíssimi Nóminis Iesu", { cs: "Litanie k nejsvětějšímu jménu Ježíš", en: "The Litany of the Holy Name" }, PRAYER_TYPES.LITANY_HOLY_NAME, [
    ["Kyrie", 0],
    ["Iesu I", 10],
    ["Iesu II", 29],
    ["Ab omni malo", 49],
    ["Per mystérium", 60],
    ["Agnus Dei", 75],
  ]),
  // Private devotion, not one of the approved liturgical litanies; its Latin is
  // ours rather than a sourced original (see the banner in prayers.ts).
  humility: litany("Litaníæ Humilitátis", { cs: "Litanie pokory", en: "The Litany of Humility" }, PRAYER_TYPES.LITANY_HUMILITY, [
    ["A desidério", 0],
    ["A timóre", 11],
    ["Ut álii", 20],
  ]),
  st_joseph: litany("Litaníæ Sancti Ioseph", { cs: "Litanie k svatému Josefu", en: "The Litany of Saint Joseph" }, PRAYER_TYPES.LITANY_ST_JOSEPH, [
    ["Kyrie", 0],
    ["Sancte Ioseph", 10],
    ["Ioseph iustíssime", 22],
    ["Custos vírginum", 32],
    ["Agnus Dei", 44],
  ]),
  precious_blood: litany("Litaníæ Pretiosíssimi Sánguinis D.N.I.C.", { cs: "Litanie k Nejdražší Krvi Páně", en: "The Litany of the Precious Blood" }, PRAYER_TYPES.LITANY_PRECIOUS_BLOOD, [
    ["Kyrie", 0],
    ["Sanguis Christi I", 10],
    ["Sanguis Christi II", 22],
    ["Agnus Dei", 35],
  ]),
  saints: {
    name: "Litaníæ Omnium Sanctórum",
    nameTr: { cs: "Litanie ke všem svatým", en: "The Litany of the Saints" },
    color: LITANY_COLOR,
    build: buildSaintsLitany,
    kind: "linear",
  },
};
