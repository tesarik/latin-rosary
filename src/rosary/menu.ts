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

// A key the menu's groups can list: an ordinary prayer, a litany or a linear
// devotion (not a mystery set, the chaplet or a plan). Own-property checks, so
// a stored "toString" is no key.
export const isMenuKey = (k: string): k is MenuKey =>
  has(ORDINARY_PRAYERS, k) || has(LITANIES, k) || has(OTHER_PRAYER_SETS, k);

export const menuEntry = (k: MenuKey): MenuEntry =>
  has(ORDINARY_PRAYERS, k) ? ORDINARY_PRAYERS[k as OrdinaryPrayerKey]
  : has(LITANIES, k) ? LITANIES[k as LitanyKey]
  : OTHER_PRAYER_SETS[k as OtherPrayerKey];

// A group may be cut into titled sections (the Mass: its order, the sequences,
// the prayers after it); a section without a heading is shown plain.
export type MenuSection = { heading?: string; keys: readonly MenuKey[] };
export type MenuGroupKey = "cotidianae" | "mariales" | "missa" | "litaniae" | "defuncti" | "devotiones";
// The symbol drawn in a group's header (GroupIcon in MysteryMenu.tsx).
export type GroupIconName = "calendar" | "sun" | "marian" | "ihs" | "list" | "cross" | "heart" | "star";
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

// The Favourites card's symbol and colour (a gold star).
export const FAVORITES_ICON: GroupIconName = "star";
export const FAVORITES_COLOR = "#B7791F";

// Folds a name for sorting and searching, as a prayer book's index would:
// lower case, accents ignored, æ and œ read as ae and oe.
export const foldName = (name: string): string =>
  name.toLowerCase().replace(/æ/g, "ae").replace(/œ/g, "oe").normalize("NFD").replace(/\p{M}/gu, "");
export const byLatinName = (a: MenuKey, b: MenuKey): number =>
  foldName(menuEntry(a).name).localeCompare(foldName(menuEntry(b).name));

// Each group's sections are listed alphabetically by Latin name (sorted below),
// except the Mass's, which follow the order of the Mass.
const GROUPS: readonly MenuGroup[] = [
  {
    key: "cotidianae",
    title: "Orationes cotidiánæ",
    subtitle: { cs: "Každodenní modlitby", en: "Daily prayers" },
    icon: "sun",
    color: "#1565C0",
    sections: [{ keys: [
      "signum_crucis", "pater_noster", "ave_maria", "gloria_patri",
      "symbolum_apostolorum", "symbolum_nicenum", "symbolum_athanasianum",
      "angelus", "benedictio_mensae", "gratiarum_actio", "anima_christi", "suscipe", "creator_ineffabilis",
      "angele_dei", "sancte_michael", "nunc_dimittis", "decalogue",
    ] }],
  },
  {
    key: "mariales",
    title: "Ad Beátam Maríam Vírginem",
    subtitle: { cs: "K Panně Marii", en: "To Our Lady" },
    icon: "marian",
    color: "#3A6EA5",
    sections: [{ keys: [
      "alma_redemptoris", "ave_regina_caelorum", "regina_caeli", "salve_regina",
      "sub_tuum", "memorare", "magnificat", "stabat_mater",
    ] }],
  },
  {
    key: "missa",
    title: "Missa",
    subtitle: { cs: "Mše svatá", en: "Holy Mass" },
    icon: "ihs",
    color: "#B8860B",
    sections: [
      // The whole Mass as one sequence to step through, then its parts one by one.
      { keys: ["ordo_missae"] },
      { heading: "Ordo Missæ", keys: [
        "iudica_me", "confiteor", "kyrie", "gloria_in_excelsis", "praefatio_dialog", "sanctus",
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
    icon: "cross",
    color: "#546E7A",
    sections: [{ keys: ["requiem", "de_profundis", "dies_irae", "defuncti"] }],
  },
  {
    key: "devotiones",
    title: "Devotiónes",
    subtitle: { cs: "Pobožnosti", en: "Devotions" },
    icon: "heart",
    color: "#C62828",
    sections: [
      { keys: ["spiritus", "sanguis", "brigit", "cor_iesu", "septem_dolores", "angelica"] },
      { heading: "Ad sanctum Ioseph", keys: [
        "ioseph", "ad_te_ioseph", "memorare_ioseph", "memento_ioseph", "o_ioseph_virgo", "fac_nos_innocuam", "commemoratio_ioseph",
      ] },
    ],
  },
];

const IN_ORDER: readonly MenuGroupKey[] = ["missa"];

export const MENU_GROUPS: readonly MenuGroup[] = GROUPS.map((g) =>
  IN_ORDER.includes(g.key) ? g : { ...g, sections: g.sections.map((sec) => ({ ...sec, keys: [...sec.keys].sort(byLatinName) })) });

export const groupKeys = (g: MenuGroup): MenuKey[] => g.sections.flatMap((s) => s.keys);

const OCCASION_PRAYERS: Record<Occasion, readonly MenuKey[]> = {
  easter_octave: ["victimae_paschali"],
  pentecost_octave: ["veni_sancte_spiritus", "spiritus"],
  corpus_christi: ["lauda_sion"],
  seven_sorrows: ["stabat_mater", "septem_dolores"],
  november: ["requiem", "de_profundis", "dies_irae", "defuncti"],
  st_michael: ["angelica"],
  all_saints: ["saints"],
  st_joseph: ["st_joseph", "ioseph", "ad_te_ioseph"],
  sacred_heart: ["sacred_heart", "cor_iesu"],
  precious_blood: ["precious_blood", "sanguis"],
  holy_name: ["holy_name"],
  marian_month: ["loreto"],
  lent: ["brigit", "septem_dolores"],
};

// What belongs to the day, for the start screen's "in season" card and the
// "now" pills: the Marian antiphon of the season, then the prayers of any
// feast, season or month the day falls in (each once).
export const inSeason = (date: Date): MenuKey[] =>
  [...new Set<MenuKey>([marianAntiphon(date), ...occasionsOf(date).flatMap((o) => OCCASION_PRAYERS[o])])];

// Words a prayer is searched by besides its names: what it is called aloud
// rather than in the index (the creeds by their first word).
const SEARCH_ALIASES: Partial<Record<MenuKey, string>> = {
  symbolum_apostolorum: "Credo",
  symbolum_nicenum: "Credo",
  symbolum_athanasianum: "Credo Quicumque",
};

// The start screen's search: every listed prayer whose Latin name, one of its
// translated names or an alias holds each word of the query (folded, so
// "memorare" finds Memoráre and "pomni" its Czech name), sorted by Latin name.
// An empty query finds nothing.
export const searchMenu = (query: string): MenuKey[] => {
  const words = foldName(query).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  if (words.length === 0) return [];
  return MENU_GROUPS.flatMap(groupKeys)
    .filter((k) => {
      const e = menuEntry(k);
      const hay = foldName([e.name, ...Object.values(e.nameTr), SEARCH_ALIASES[k] ?? ""].join(" "));
      return words.every((w) => hay.includes(w));
    })
    .sort(byLatinName);
};
