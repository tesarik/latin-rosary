// Static, crawlable pages with the prayer texts, generated at build time (see
// the `staticPages` plugin in vite.config.ts). The app itself renders its texts
// from JavaScript, which search engines barely index; these pages give every
// prayer set a plain HTML page per locale — the Latin beside the translation —
// with a link that opens it in the app (`#pray=<key>`, handled by Rosary).
//
// Pure: data in, HTML strings out, no DOM. Texts come straight from the same
// registries the app uses, so the pages can't drift from it.

import { MYSTERIES, PRAYERS, PRAYER_TRANSLATIONS, PRAYER_TYPES, getHailMary, getHailMaryTr, type Localized } from "./prayers";
import {
  buildRosarySequence,
  sliceLines,
  CHAPLETS,
  type SequenceItem,
} from "./sequence";
import { MENU_GROUPS, groupKeys, menuEntry, type MenuGroupKey } from "./menu";
import { SUPPORTED_LOCALES, type Locale } from "./i18n";

export type StaticPage = { fileName: string; html: string };

type Group = "rosary" | MenuGroupKey;

type Entry = {
  // The app's prayer-set key the page opens (`#pray=<key>`); the rosary page
  // has one per mystery set instead.
  key: string | null;
  slug: string;
  name: string;
  nameTr: Localized;
  group: Group;
  items: SequenceItem[];
};

// Strings of the pages' own chrome, kept here rather than in i18n.ts: the app
// never shows them.
const PAGE_STRINGS: Record<Locale, {
  languageName: string;
  switchTo: string;
  latin: string;
  allPrayers: string;
  openApp: string;
  prayInApp: string;
  titleSuffix: (nameTr: string) => string;
  description: (nameTr: string, snippet: string) => string;
  indexTitle: string;
  indexIntro: string;
  indexDescription: string;
  rosaryGroup: string;
  rosaryIntro: string;
  rosaryOrder: string;
  rosaryPrayers: string;
  rosaryMysteries: string;
  rosaryMysteriesIntro: string;
  rosaryOpening: string;
  chapletOrder: string;
  appBlurb: string;
}> = {
  cs: {
    languageName: "Česky",
    switchTo: "English",
    latin: "Latinsky",
    allPrayers: "Všechny modlitby",
    openApp: "Otevřít aplikaci",
    prayInApp: "Modlit se v aplikaci",
    titleSuffix: (nameTr) => `${nameTr} latinsky a česky`,
    description: (nameTr, snippet) => `${nameTr} – latinský text s českým překladem: „${snippet}…“ A aplikace, ve které se ji pomodlíte.`,
    indexTitle: "Latinské modlitby s českým překladem",
    indexIntro: "Růženec, litanie a další modlitby v latině, každá s českým překladem. Všechny se dají modlit v aplikaci Rosarium, i bez připojení.",
    indexDescription: "Růženec, litanie a modlitby v latině s českým překladem: Salve Regína, Angelus, Loretánské litanie a další.",
    rosaryGroup: "Růženec a korunka",
    rosaryIntro: "Růženec v latině, jak se modlí v aplikaci: v každém Zdrávas se za jménem Ježíš vkládá tajemství desátku.",
    rosaryOrder: "Znamení kříže, Věřím v Boha, Otčenáš, tři Zdrávas (za víru, naději a lásku), Sláva Otci. Pak pět desátků: Otčenáš, deset Zdrávas s tajemstvím, Sláva Otci a „Ó můj Ježíši“. Na závěr Zdrávas Královno a znamení kříže.",
    rosaryPrayers: "Modlitby růžence",
    rosaryMysteries: "Tajemství",
    rosaryMysteriesIntro: "Tajemství se vkládá do každého Zdrávas za slovo Iesus.",
    rosaryOpening: "Úvodní tři Zdrávas",
    chapletOrder: "Korunka se modlí na růženci (Deníček sv. Faustyny 476). Znamení kříže, Otčenáš, Zdrávas a Věřím v Boha. Pak pět desátků: na velkém zrnu „Věčný Otče“, na deseti malých „Pro jeho bolestné utrpení“. Na závěr třikrát „Svatý Bože“ a znamení kříže. Nepovinně se po úvodním znamení kříže přidává modlitba „Zemřel jsi, Ježíši“ a třikrát „Ó Krvi a Vodo“, na konci modlitba „Věčný Bože“ a „Ježíši, důvěřuji ti“. V aplikaci je zapíná přepínač pod korunkou.",
    appBlurb: "Rosarium je bezplatná aplikace pro modlitbu v latině s překladem na jedno klepnutí. Funguje i bez připojení.",
  },
  en: {
    languageName: "English",
    switchTo: "Česky",
    latin: "Latin",
    allPrayers: "All prayers",
    openApp: "Open the app",
    prayInApp: "Pray it in the app",
    titleSuffix: (nameTr) => `${nameTr} in Latin and English`,
    description: (nameTr, snippet) => `${nameTr}: the Latin text with an English translation. “${snippet}…” And an app to pray it in.`,
    indexTitle: "Latin prayers with English translation",
    indexIntro: "The rosary, litanies and other prayers in Latin, each with an English translation. All of them can be prayed in the Rosarium app, offline too.",
    indexDescription: "The rosary, litanies and prayers in Latin with an English translation: Salve Regina, the Angelus, the Litany of Loreto and more.",
    rosaryGroup: "The Rosary and the Chaplet",
    rosaryIntro: "The rosary in Latin as the app prays it: in every Hail Mary, the mystery of the decade is added after the name of Jesus.",
    rosaryOrder: "The Sign of the Cross, the Apostles’ Creed, the Our Father, three Hail Marys (for faith, hope and charity), the Glory Be. Then five decades: the Our Father, ten Hail Marys with the mystery, the Glory Be and “O my Jesus”. Finally, the Hail, Holy Queen and the Sign of the Cross.",
    rosaryPrayers: "The prayers of the rosary",
    rosaryMysteries: "The mysteries",
    rosaryMysteriesIntro: "The mystery is added to every Hail Mary after the word Iesus.",
    rosaryOpening: "The three opening Hail Marys",
    chapletOrder: "The chaplet is prayed on rosary beads (Diary of St. Faustina 476). The Sign of the Cross, the Our Father, the Hail Mary and the Apostles’ Creed. Then five decades: “Eternal Father” on the large bead, “For the sake of his sorrowful Passion” on the ten small ones. Finally “Holy God” three times and the Sign of the Cross. Optionally, “You expired, Jesus” and three times “O Blood and Water” follow the opening Sign of the Cross, and the prayer “Eternal God” and “Jesus, I trust in you” close the chaplet. In the app, the switch under the chaplet turns them on.",
    appBlurb: "Rosarium is a free app for praying in Latin, with the translation one tap away. It works offline.",
  },
};

// Texts that are ours rather than transcribed (see the banners in prayers.ts).
// The pages say so, as the source comments do.
const NOTES: Record<string, Partial<Localized>> = {
  "misericordia-plena": {
    cs: "Latinské znění nepovinných modliteb (Expirásti, O Sanguis et Aqua, Ætérne Deus) je náš vlastní překlad: Deníček je psán polsky a oficiální latinské znění neexistuje.",
    en: "The Latin of the optional prayers (Expirásti, O Sanguis et Aqua, Ætérne Deus) is our own translation: the Diary was written in Polish, and no official Latin exists.",
  },
  brigit: {
    cs: "Latinské znění těchto modliteb je náš vlastní překlad: autoritativní latinský originál není znám.",
    en: "The Latin of these prayers is our own translation: no authoritative Latin original is known.",
  },
  dies_irae: {
    cs: "Český překlad podle Schallerova Římského misálu (1931).",
    en: "The English is W. J. Irons' verse translation, as printed in the Saint Andrew Daily Missal.",
  },
  de_profundis: {
    cs: "Žalm a verš „Od moci temnoty“ podle českého pohřebního obřadu (Manuale rituum, 1955), ostatní verše a závěrečná modlitba podle Schallerova Římského misálu (1931).",
  },
  defuncti: {
    cs: "Žalm a verš „Od moci temnoty“ podle českého pohřebního obřadu (Manuale rituum, 1955), ostatní verše a závěrečná modlitba podle Schallerova Římského misálu (1931).",
  },
  ioseph: {
    cs: "Krátká latinská podoba pobožnosti: sedm nadpisů, ke každému Otče náš, Zdrávas a Sláva Otci, a modlitba Vírginum custos. Český překlad nadpisů je náš vlastní.",
    en: "The short Latin form of the devotion: seven headings, each with an Our Father, a Hail Mary and a Glory Be, and the prayer Vírginum custos. The English of the headings is our own.",
  },
  humility: {
    cs: "Soukromá pobožnost z 19. století. Autoritativní latinský originál neexistuje; latinské znění jsme sestavili ze dvou latinských pramenů.",
    en: "A private devotion of the 19th century. No authoritative Latin original exists; this Latin is assembled from two Latin witnesses.",
  },
  spiritus: {
    en: "The English is the Raccolta's (1910), bar the sign of the cross and the Veni Creator, which we render line for line with the Latin.",
  },
  angelica: {
    cs: "Latinské znění je náš vlastní překlad: korunka vznikla italsky a v latinských sbírkách se nenašla. Český text podle Cesty k věčné spáse (1915), anglický podle Raccolty (1910).",
    en: "The Latin is our own translation: the chaplet was written in Italian and no Latin collection we searched has it. The English is the Raccolta's (1910).",
  },
  septem_dolores: {
    cs: "Latinské znění je náš vlastní překlad, kromě verše a modlitby Intervéniat z misálu. Český text podle Poutní knihy (1893), anglický podle Raccolty (1910).",
    en: "The Latin is our own translation, except the versicle and the Missal's collect Intervéniat. The English is the Raccolta's (1910).",
  },
  sanguis: {
    cs: "Latinské znění rozjímání a modlitby je náš vlastní překlad; verše a závěrečná modlitba jsou z misálu. Český text podle Cesty k věčné spáse (1915), anglický podle Raccolty (1910).",
    en: "The Latin of the meditations and the prayer is our own translation; the versicles and the collect are the Missal's. The English is the Raccolta's (1910).",
  },
  cor_iesu: {
    cs: "Latinské znění rozjímání a modliteb je náš vlastní překlad; verš a závěrečná modlitba jsou z Raccolty. Český text podle Cesty k věčné spáse (1915), anglický podle Raccolty (1878).",
    en: "The Latin of the considerations and prayers is our own translation; the versicle and the collect are the Raccolta's. The English is the Raccolta's (1878).",
  },
  creator_ineffabilis: {
    cs: "Český překlad je náš vlastní: v modlitebních knihách, které jsme prošli, se tato modlitba česky nenašla.",
  },
  saints: {
    cs: "Český text podle Schallerova Římského misálu (1931). Světce, které tamější tradiční podoba nemá (Abrahám, pozdější mučedníci, učitelé, zakladatelé a světice), jsme přeložili sami.",
  },
};

// "Litaníæ Lauretánæ" → "litaniae-lauretanae".
export function slugify(name: string): string {
  return name
    .replace(/æ/g, "ae").replace(/Æ/g, "Ae").replace(/œ/g, "oe").replace(/Œ/g, "Oe")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const escape = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Escaped text with `{r}…{/r}` turned into red rubrics, as PrayerCard does.
const withRubrics = (text: string): string =>
  escape(text).replace(/\{r\}([\s\S]*?)\{\/r\}/g, '<span class="rubric">$1</span>');

const plainText = (text: string): string => text.replace(/\{\/?r\}/g, "").replace(/\s+/g, " ").trim();

// One item's text in Latin, or in a locale.
function itemText(item: SequenceItem, locale: Locale | null): string {
  if (item.type === PRAYER_TYPES.HAIL_MARY) {
    const hm = locale ? getHailMaryTr(locale, item.mysteryTr?.[locale]) : getHailMary(item.mystery);
    return `${hm.before}${hm.mystery ? ` ${hm.mystery}.` : ""} ${hm.after}`;
  }
  if (item.type === PRAYER_TYPES.CUSTOM) return "";
  const full = locale ? PRAYER_TRANSLATIONS[locale][item.type] : PRAYERS[item.type];
  return item.lines ? sliceLines(full, item.lines) : full;
}

const sameText = (a: SequenceItem, b: SequenceItem): boolean =>
  a.type === b.type && a.mystery === b.mystery && a.lines?.[0] === b.lines?.[0];

function entries(): Entry[] {
  const list: Entry[] = [{
    key: null,
    slug: "rosarium",
    name: "Rosárium",
    nameTr: { cs: "Růženec", en: "The Rosary" },
    group: "rosary",
    items: [],
  }];
  // The chaplet's page gives the full form, optional prayers included, and its
  // first decade only: the other four repeat it (chapletOrder says so).
  const chaplet = CHAPLETS["misericordia-plena"];
  list.push({
    key: "misericordia-plena",
    slug: slugify(chaplet.name),
    name: chaplet.name,
    nameTr: chaplet.nameTr,
    group: "rosary",
    items: chaplet.build().filter((i) => (i.decade ?? 0) === 0),
  });
  // Every other prayer, grouped and ordered as on the start screen.
  for (const g of MENU_GROUPS) {
    for (const key of groupKeys(g)) {
      const e = menuEntry(key);
      list.push({ key, slug: slugify(e.name), name: e.name, nameTr: e.nameTr, group: g.key, items: e.build() });
    }
  }
  return list;
}

type TextBlock = { heading?: string; count?: number; la: string; tr: string };

const rows = (blocks: TextBlock[], locale: Locale): string =>
  blocks.map((b) => `
      <section class="prayer">
        ${b.heading ? `<h2>${escape(b.heading)}${b.count && b.count > 1 ? ` <span class="count">${b.count}×</span>` : ""}</h2>` : ""}
        <div class="pair">
          <div class="la">${withRubrics(b.la)}</div>
          <div class="tr" lang="${locale}">${withRubrics(b.tr)}</div>
        </div>
      </section>`).join("");

// A set's items as text blocks. Consecutive repeats (the Leonine prayers' three
// Ave Marías) collapse to one block with a count; a text already given in full
// higher up (St. Bridget's Pater Noster and Ave María after each meditation)
// shows only its name.
function setBody(entry: Entry, locale: Locale): string {
  const blocks: ({ kind: "text" } & TextBlock | { kind: "repeat"; heading: string })[] = [];
  const shown: SequenceItem[] = [];
  const single = entry.items.length === 1;
  entry.items.forEach((item, i) => {
    const prev = entry.items[i - 1];
    const last = blocks[blocks.length - 1];
    if (prev && sameText(prev, item)) {
      if (last?.kind === "text") last.count = (last.count ?? 1) + 1;
      return;
    }
    const heading = single ? undefined : item.section ?? item.label;
    if (shown.some((s) => sameText(s, item))) {
      const name = heading ?? item.label;
      if (last?.kind === "repeat") last.heading += ` · ${name}`;
      else blocks.push({ kind: "repeat", heading: name });
      return;
    }
    shown.push(item);
    blocks.push({ kind: "text", heading, la: itemText(item, null), tr: itemText(item, locale) });
  });
  return blocks.map((b) => b.kind === "repeat"
    ? `\n      <p class="repeat">${escape(b.heading)}</p>`
    : rows([b], locale)).join("");
}

function rosaryBody(locale: Locale, base: string): string {
  const s = PAGE_STRINGS[locale];
  const seq = buildRosarySequence(MYSTERIES.radostny);
  const prayers: SequenceItem[] = [];
  for (const item of seq) {
    if (!prayers.some((p) => p.type === item.type)) prayers.push({ ...item, mystery: undefined, mysteryTr: undefined });
  }
  const opening = seq.filter((i) => i.type === PRAYER_TYPES.HAIL_MARY && i.decade === undefined);
  const clauseList = (la: readonly string[], tr: readonly string[]) => `
        <ol class="clauses">${la.map((c, i) => `
          <li><span class="la">${escape(c)}</span><span class="tr" lang="${locale}">${escape(tr[i]!)}</span></li>`).join("")}
        </ol>`;
  return `
      <p class="intro">${escape(s.rosaryIntro)}</p>
      <p class="intro">${escape(s.rosaryOrder)}</p>
      <h2 class="part">${escape(s.rosaryPrayers)}</h2>${rows(prayers.map((p) => ({ heading: p.label, la: itemText(p, null), tr: itemText(p, locale) })), locale)}
      <h2 class="part" id="mysteria">${escape(s.rosaryMysteries)}</h2>
      <p class="intro">${escape(s.rosaryMysteriesIntro)}</p>
      <section class="prayer">
        <h3>${escape(s.rosaryOpening)}</h3>${clauseList(opening.map((i) => i.mystery!), opening.map((i) => i.mysteryTr![locale]))}
      </section>${Object.entries(MYSTERIES).map(([key, m]) => `
      <section class="prayer">
        <h3>${escape(m.name)} <span class="sub">${escape(m.nameTr[locale])}</span></h3>${clauseList(m.mysteries, m.mysteriesTr[locale])}
        <p><a class="button" href="${base}#pray=${key}">${escape(s.prayInApp)}: ${escape(m.name)}</a></p>
      </section>`).join("")}`;
}

const STYLE = `
:root{color-scheme:light dark;--bg:#F3F5F7;--surface:#fff;--border:#E3E8EC;--text:#37474F;--strong:#263238;--muted:#78909C;--accent:#1565C0;--rubric:#B3261E}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#121418;--surface:#1E232B;--border:#2A313B;--text:#DDE2E7;--strong:#EEF1F4;--muted:#8995A1;--accent:#8AB4F8;--rubric:#EC8E86}}
:root[data-theme="dark"]{--bg:#121418;--surface:#1E232B;--border:#2A313B;--text:#DDE2E7;--strong:#EEF1F4;--muted:#8995A1;--accent:#8AB4F8;--rubric:#EC8E86}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);font:16px/1.5 Arial,sans-serif}
a{color:var(--accent)}
header,main,footer{max-width:960px;margin:0 auto;padding:0 16px}
header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:14px;padding-bottom:14px}
header .brand{font:600 22px "EB Garamond",Georgia,serif;color:var(--strong);text-decoration:none}
header nav{display:flex;gap:16px;font-size:14px}
h1{font:500 clamp(30px,6vw,44px)/1.15 "EB Garamond",Georgia,serif;color:var(--strong);margin-top:8px}
.subtitle{color:var(--muted);font-size:17px;margin:4px 0 16px}
.button{display:inline-block;background:#1565C0;color:#fff;text-decoration:none;font-weight:600;padding:10px 18px;border-radius:999px;margin:4px 0 8px}
.intro{margin:12px 0;max-width:70ch}
.note{margin:12px 0;font-size:14px;color:var(--muted);font-style:italic}
h2.part{font:600 24px "EB Garamond",Georgia,serif;color:var(--strong);margin:28px 0 4px}
.prayer{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px 18px;margin:12px 0}
.prayer h2,.prayer h3{font:600 20px "EB Garamond",Georgia,serif;color:var(--strong);margin-bottom:8px}
.count,.sub{font:400 14px Arial,sans-serif;color:var(--muted)}
.pair{display:grid;gap:12px 28px}
@media (min-width:720px){.pair{grid-template-columns:1fr 1fr}}
.la,.tr{white-space:pre-line;font:19px/1.4 "EB Garamond",Georgia,serif}
.tr{color:var(--muted)}
.rubric{color:var(--rubric)}
.repeat{margin:8px 18px;color:var(--muted);font:italic 18px "EB Garamond",Georgia,serif}
.clauses{padding-left:1.4em}
.clauses li{margin:6px 0}
.clauses .la,.clauses .tr{display:block;white-space:normal}
.groups h2{font:600 22px "EB Garamond",Georgia,serif;color:var(--strong);margin:24px 0 8px}
.groups ul{list-style:none;background:var(--surface);border:1px solid var(--border);border-radius:16px}
.groups li+li{border-top:1px solid var(--border)}
.groups a{display:block;padding:10px 16px;text-decoration:none}
.groups .name{display:block;font:19px "EB Garamond",Georgia,serif;color:var(--strong)}
.groups .sub{display:block}
footer{color:var(--muted);font-size:14px;padding-top:24px;padding-bottom:32px}
footer .groups h2{font-size:18px}
`;

// The app's saved theme (theme.ts) wins over the OS setting, as in index.html.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("ruzenec_theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})();`;

function layout(opts: {
  locale: Locale;
  path: string; // under the base, e.g. "en/salve-regina/"
  altPath: string;
  title: string;
  description: string;
  base: string;
  appUrl: string;
  body: string;
}): string {
  const { locale, base, appUrl } = opts;
  const s = PAGE_STRINGS[locale];
  const other = SUPPORTED_LOCALES.find((l) => l !== locale)!;
  const abs = (p: string) => appUrl + p;
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escape(opts.title)}</title>
<meta name="description" content="${escape(opts.description)}" />
<link rel="canonical" href="${abs(opts.path)}" />
<link rel="alternate" hreflang="${locale}" href="${abs(opts.path)}" />
<link rel="alternate" hreflang="${other}" href="${abs(opts.altPath)}" />
<link rel="alternate" hreflang="x-default" href="${abs(opts.path.replace(/^[a-z]+\//, "en/"))}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Rosarium" />
<meta property="og:title" content="${escape(opts.title)}" />
<meta property="og:description" content="${escape(opts.description)}" />
<meta property="og:url" content="${abs(opts.path)}" />
<meta property="og:image" content="${abs("og-image.png")}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="theme-color" content="#1565C0" />
<link rel="icon" type="image/png" sizes="48x48" href="${base}icon-48.png" />
<script>${THEME_SCRIPT}</script>
<style>${STYLE}</style>
</head>
<body>
<header>
  <a class="brand" href="${base}">Rosarium</a>
  <nav>
    <a href="${base}${locale}/">${escape(s.allPrayers)}</a>
    <a href="${base}${opts.altPath}" hreflang="${other}" lang="${other}">${escape(PAGE_STRINGS[other].languageName)}</a>
  </nav>
</header>
<main>${opts.body}
</main>
<footer>
  <p>${escape(s.appBlurb)} <a href="${base}">${escape(s.openApp)}</a></p>
</footer>
</body>
</html>
`;
}

function setPage(entry: Entry, locale: Locale, base: string, appUrl: string): StaticPage {
  const s = PAGE_STRINGS[locale];
  const nameTr = entry.nameTr[locale];
  const path = `${locale}/${entry.slug}/`;
  const other = SUPPORTED_LOCALES.find((l) => l !== locale)!;
  // The description quotes the set's first prayer, or the first of its decades
  // (the chaplet's Pater ætérne, not its Sign of the Cross).
  const lead = entry.items.find((i) => i.decade !== undefined) ?? entry.items[0]!;
  const first = entry.key ? plainText(itemText(lead, null)) : plainText(itemText({ type: PRAYER_TYPES.HAIL_MARY, label: "" }, null));
  const snippet = first.length > 90 ? first.slice(0, first.lastIndexOf(" ", 90)).replace(/[,;:.]$/, "") : first.replace(/[.]$/, "");
  const note = entry.key ? NOTES[entry.key]?.[locale] : undefined;
  const body = `
      <h1>${escape(entry.name)}</h1>
      <p class="subtitle">${escape(nameTr)} · ${escape(s.latin)} / ${escape(s.languageName)}</p>
      ${entry.key ? `<a class="button" href="${base}#pray=${entry.key}">${escape(s.prayInApp)}</a>` : `<a class="button" href="#mysteria">${escape(s.rosaryMysteries)}</a>`}
      ${entry.key && entry.group === "rosary" ? `<p class="intro">${escape(s.chapletOrder)}</p>` : ""}
      ${note ? `<p class="note">${escape(note)}</p>` : ""}${entry.key ? setBody(entry, locale) : rosaryBody(locale, base)}`;
  return {
    fileName: `${path}index.html`,
    html: layout({
      locale, path, altPath: `${other}/${entry.slug}/`, base, appUrl,
      title: `${entry.name} – ${s.titleSuffix(nameTr)} | Rosarium`,
      description: s.description(nameTr, snippet),
      body,
    }),
  };
}

function indexPage(list: Entry[], locale: Locale, base: string, appUrl: string): StaticPage {
  const s = PAGE_STRINGS[locale];
  const other = SUPPORTED_LOCALES.find((l) => l !== locale)!;
  const groups = (["rosary", ...MENU_GROUPS.map((g) => g.key)] as const).map((g) => {
    const members = list.filter((e) => e.group === g);
    const heading = g === "rosary" ? s.rosaryGroup : MENU_GROUPS.find((m) => m.key === g)!.title;
    return `
      <h2>${escape(heading)}</h2>
      <ul>${members.map((e) => `
        <li><a href="${base}${locale}/${e.slug}/"><span class="name">${escape(e.name)}</span><span class="sub">${escape(e.nameTr[locale])}</span></a></li>`).join("")}
      </ul>`;
  }).join("");
  return {
    fileName: `${locale}/index.html`,
    html: layout({
      locale, path: `${locale}/`, altPath: `${other}/`, base, appUrl,
      title: `${s.indexTitle} | Rosarium`,
      description: s.indexDescription,
      body: `
      <h1>${escape(s.indexTitle)}</h1>
      <p class="intro">${escape(s.indexIntro)}</p>
      <a class="button" href="${base}">${escape(s.openApp)}</a>
      <div class="groups">${groups}
      </div>`,
    }),
  };
}

// Every page, and a sitemap when the site's origin is known (a sitemap needs
// absolute URLs). `base` is the app's base path ("/latin-rosary/"); `siteUrl`
// the origin it is served from, without a trailing slash.
export function buildStaticPages(base: string, siteUrl: string | undefined): { pages: StaticPage[]; sitemap: string | null } {
  const appUrl = (siteUrl ?? "").replace(/\/+$/, "") + base;
  const list = entries();
  const pages: StaticPage[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    pages.push(indexPage(list, locale, base, appUrl));
    for (const entry of list) pages.push(setPage(entry, locale, base, appUrl));
  }
  const sitemap = siteUrl
    ? `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["", ...pages.map((p) => p.fileName.replace(/index\.html$/, ""))].map((p) => `  <url><loc>${escape(appUrl + p)}</loc></url>`).join("\n")}
</urlset>
`
    : null;
  return { pages, sitemap };
}
