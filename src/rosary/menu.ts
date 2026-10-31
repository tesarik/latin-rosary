// The start screen's prayer groups, below the rosary and the chaplet: which
// prayer is listed where, in what order. Grouped by occasion rather than by
// kind, and every prayer in exactly one place (menu.test.ts checks that each
// registry key is listed once). The menu, the plan editor's picker and the
// static pages' index all read it, so they never disagree.
//
// Only the listing lives here: the prayers themselves stay in their registries
// (sequence.ts), so moving a prayer to another group changes no key, page slug
// or saved plan.

import type { Localized } from "./prayers";
import {
  LITANIES,
  ORDINARY_PRAYERS,
  OTHER_PRAYER_SETS,
  type LitanyKey,
  type OrdinaryPrayerKey,
  type OtherPrayerKey,
  type SequenceItem,
} from "./sequence";
import { marianAntiphon, occasionsOf, type Occasion } from "./liturgy";

export type MenuKey = OrdinaryPrayerKey | LitanyKey | OtherPrayerKey;

export type MenuEntry = { name: string; nameTr: Localized; color: string; build: () => SequenceItem[] };

const has = (obj: object, k: string): boolean => Object.prototype.hasOwnProperty.call(obj, k);

export const menuEntry = (k: MenuKey): MenuEntry =>
  has(ORDINARY_PRAYERS, k) ? ORDINARY_PRAYERS[k as OrdinaryPrayerKey]
  : has(LITANIES, k) ? LITANIES[k as LitanyKey]
  : OTHER_PRAYER_SETS[k as OtherPrayerKey];

// A group may be cut into titled sections (the Mass: its order, the sequences,
// the prayers after it); a section without a heading is shown plain.
export type MenuSection = { heading?: string; keys: readonly MenuKey[] };
export type MenuGroupKey = "cotidianae" | "mariales" | "missa" | "litaniae" | "defuncti" | "devotiones";
// The symbol drawn in a group's header (GroupIcon in MysteryMenu.tsx).
export type GroupIconName = "calendar" | "hands" | "marian" | "chalice" | "list" | "candle" | "heart";
export type MenuGroup = {
  key: MenuGroupKey;
  title: string;
  subtitle: Localized;
  // The header's symbol and its colour (liturgical where there is one).
  icon: GroupIconName;
  color: string;
  sections: readonly MenuSection[];
};

// The "in season" card's symbol and colour (liturgical green).
export const IN_SEASON_ICON: GroupIconName = "calendar";
export const IN_SEASON_COLOR = "#2E7D32";

// Listed in the order they are prayed or learned, not alphabetically.
export const MENU_GROUPS: readonly MenuGroup[] = [
  {
    key: "cotidianae",
    title: "Orationes cotidiánæ",
    subtitle: { cs: "Každodenní modlitby", en: "Daily prayers" },
    icon: "hands",
    color: "#1565C0",
    sections: [{ keys: [
      "signum_crucis", "pater_noster", "ave_maria", "gloria_patri",
      "symbolum_apostolorum", "symbolum_nicenum", "symbolum_athanasianum",
      "angelus", "anima_christi", "angele_dei", "sancte_michael", "decalogue",
    ] }],
  },
  {
    key: "mariales",
    title: "Ad Beátam Maríam Vírginem",
    subtitle: { cs: "K Panně Marii", en: "To Our Lady" },
    // The four seasonal antiphons in the order of the year.
    icon: "marian",
    color: "#3A6EA5",
    sections: [{ keys: [
      "alma_redemptoris", "ave_regina_caelorum", "regina_caeli", "salve_regina",
      "sub_tuum", "stabat_mater",
    ] }],
  },
  {
    key: "missa",
    title: "Missa",
    subtitle: { cs: "Mše svatá", en: "Holy Mass" },
    icon: "chalice",
    color: "#B8860B",
    sections: [
      { heading: "Ordo Missæ", keys: [
        "confiteor", "kyrie", "gloria_in_excelsis", "praefatio_dialog", "sanctus",
        "agnus_dei", "ante_communionem", "domine_non_sum_dignus", "post_communionem",
      ] },
      { heading: "Sequéntiæ", keys: ["victimae_paschali", "veni_sancte_spiritus", "lauda_sion"] },
      { heading: "Post Missam", keys: ["leonine"] },
    ],
  },
  {
    key: "litaniae",
    title: "Litaníæ",
    subtitle: { cs: "Litanie", en: "Litanies" },
    icon: "list",
    color: "#3949AB",
    sections: [{ keys: ["loreto", "sacred_heart", "holy_name", "st_joseph", "precious_blood", "saints", "humility"] }],
  },
  {
    key: "defuncti",
    title: "Pro defúnctis",
    subtitle: { cs: "Za zemřelé", en: "For the dead" },
    icon: "candle",
    color: "#546E7A",
    sections: [{ keys: ["requiem", "de_profundis", "dies_irae", "defuncti"] }],
  },
  {
    key: "devotiones",
    title: "Devotiónes",
    subtitle: { cs: "Pobožnosti", en: "Devotions" },
    icon: "heart",
    color: "#C62828",
    sections: [{ keys: ["brigit", "ioseph"] }],
  },
];

export const groupKeys = (g: MenuGroup): MenuKey[] => g.sections.flatMap((s) => s.keys);

const OCCASION_PRAYERS: Record<Occasion, readonly MenuKey[]> = {
  easter_octave: ["victimae_paschali"],
  pentecost_octave: ["veni_sancte_spiritus"],
  corpus_christi: ["lauda_sion"],
  seven_sorrows: ["stabat_mater"],
  november: ["requiem", "de_profundis", "dies_irae", "defuncti"],
  all_saints: ["saints"],
  st_joseph: ["st_joseph", "ioseph"],
  sacred_heart: ["sacred_heart"],
  precious_blood: ["precious_blood"],
  holy_name: ["holy_name"],
  marian_month: ["loreto"],
  lent: ["brigit"],
};

// What belongs to the day, for the start screen's "in season" card and the
// "now" pills: the Marian antiphon of the season, then the prayers of any
// feast, season or month the day falls in (each once).
export const inSeason = (date: Date): MenuKey[] =>
  [...new Set<MenuKey>([marianAntiphon(date), ...occasionsOf(date).flatMap((o) => OCCASION_PRAYERS[o])])];
