import type { Localized } from "./prayers";
import type { Locale } from "./i18n";

// Where a less familiar prayer comes from, or that some of its text is ours
// (mirroring the banners in prayers.ts): shown under the text on the static
// pages and, in the app, by the ⓘ beside the prayer's name. Only the prayers
// that have something worth saying are here — the rosary and the everyday
// prayers are not. Keyed by the set's key; a form of a set reads its main key.
export const PRAYER_NOTES: Record<string, Partial<Localized>> = {
  "misericordia-plena": {
    cs: "Latinské znění nepovinných modliteb (Expirásti, O Sanguis et Aqua, Ætérne Deus) je náš vlastní překlad: Deníček je psán polsky a oficiální latinské znění neexistuje.",
    en: "The Latin of the optional prayers (Expirásti, O Sanguis et Aqua, Ætérne Deus) is our own translation: the Diary was written in Polish, and no official Latin exists.",
  },
  brigit: {
    cs: "Latinské znění těchto modliteb je náš vlastní překlad: autoritativní latinský originál není znám.",
    en: "The Latin of these prayers is our own translation: no authoritative Latin original is known.",
  },
  actus: {
    cs: "Latinské znění je z Kompendia Katechismu katolické církve (2005), anglické z jeho anglického vydání; český překlad je náš vlastní.",
    en: "The Latin and the English are those of the Compendium of the Catechism of the Catholic Church (2005).",
  },
  veni_creator: {
    en: "The English is our own line-for-line rendering of the Latin.",
  },
  holy_face: {
    cs: "Soukromá pobožnost Arcibratrstva Svaté Tváře v Tours. Latinské a anglické znění podle jeho Manuálu (Tours, schváleno 1886); český překlad je náš vlastní.",
    en: "A private devotion of the Archconfraternity of the Holy Face at Tours. The Latin and English are those of its Manual (Tours, approved 1886).",
  },
  via_crucis: {
    cs: "Podoba podle Raccolty (1910, č. 117); latinské názvy zastavení podle P. Gaudentia, Orate Fratres (1901), české podle brněnské Cesty k věčné spáse ([1946]). Český překlad závěrečné modlitby je náš vlastní.",
    en: "The form of the Raccolta (1910, no. 117); the Latin titles of the stations from P. Gaudentius, Orate Fratres (1901).",
  },
  brigit_xv: {
    cs: "Latinské znění podle P. J. Merla Horsta, Paradisus animae christianae (1670). Závěrečná modlitba v češtině je náš vlastní překlad. Tradiční „přislíbení“ připojovaná k těmto modlitbám neuvádíme (varování Svatého oficia z roku 1954).",
    en: "The Latin follows Jacob Merlo Horst, Paradisus animae christianae (1670). The English is our own literal translation. The “promises” traditionally attached to these prayers are left out (warning of the Holy Office, 1954).",
  },
  ave_verum: {
    cs: "Současný český překlad Lenky Jeřábkové (Collegium Strahoviense); starší český překlad jsme v prohledaných modlitebních knihách nenašli.",
    en: "The English is our own literal translation.",
  },
  panis_angelicus: {
    en: "The English is our own literal translation.",
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
  memorare_ioseph: {
    cs: "Italská modlitba (Pius IX., 1863), kterou Raccolta tiskne jen anglicky. Tištěný latinský originál jsme nenašli; latinské znění se drží verze, která koluje, s opravenými tiskovými chybami. Český text podle Příručky katolických pobožností (1935), anglický podle Raccolty (1910).",
    en: "An Italian prayer (Pius IX, 1863) that the Raccolta prints in English only. We found no printed Latin; this Latin follows the version in circulation, with its misprints corrected. The English is the Raccolta's (1910).",
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

const NOTE_KEY: Record<string, string> = { "brigit-brevis": "brigit" };

export const noteFor = (key: string, locale: Locale): string | undefined =>
  (Object.hasOwn(PRAYER_NOTES, NOTE_KEY[key] ?? key) ? PRAYER_NOTES[NOTE_KEY[key] ?? key]![locale] : undefined);

// What the "with the optional prayers" switch adds, and where those prayers
// come from: shown by the ⓘ beside the switch on the first step of the
// rosary, the Chaplet of Divine Mercy and St. Bridget's prayers.
export type OptionalForm = "rosary" | "chaplet" | "brigit";

export const OPTIONAL_NOTES: Record<OptionalForm, Localized> = {
  rosary: {
    cs: "Po znamení kříže přidá dvě modlitby, jimiž růženec otevírají staré růžencové příručky: úvodní verše hodinek (Hospodine, rty mé otevři; Bože, ku pomoci mé vzezři) a Maria, Matko milosti s veršem Učiň mne hodna chváliti tebe. Předepsané nejsou. Zdroj: Breviář a Malé hodinky k nejblahoslavenější Panně Marii (1937); Maria, Matko milosti podle Raccolty (1910) a sv. Alfonse, Cesta spásy (1904).",
    en: "Adds two prayers after the Sign of the Cross, as older rosary manuals open the rosary: the opening versicles of the Hours (O Lord, thou shalt open my lips; O God, hasten to mine aid) and Mother of mercy, Mother of grace with the versicle Vouchsafe that I may praise thee. They are not prescribed. Source: the Breviary and the Little Office of the Blessed Virgin Mary (1915); Mother of mercy from the Raccolta (1910).",
  },
  chaplet: {
    cs: "Přidá modlitby, které sv. Faustyna zapsala do Deníčku a které se ke korunce obvykle připojují, ale předepsané nejsou: na začátku Zemřel jsi, Ježíši a třikrát Ó Krvi a Vodo, na konci Věčný Bože, jehož milosrdenství je nevyčerpatelné. Předepsaná korunka (Otče náš, Zdrávas, Věřím, Věčný Otče, Pro jeho bolestné utrpení, Svatý Bože) je ta, kterou Deníček uvádí jako Pánem danou (č. 476). Latinské znění nepovinných modliteb je náš překlad z polštiny.",
    en: "Adds the prayers St. Faustina wrote in her Diary that are usually joined to the chaplet but are not prescribed: at the start You expired, Jesus and O Blood and Water three times, at the end Eternal God, in whom mercy is endless. The prescribed chaplet (Our Father, Hail Mary, Creed, Eternal Father, For the sake of his sorrowful Passion, Holy God) is the one the Diary gives as taught by the Lord (no. 476). The Latin of the optional prayers is our own translation from the Polish.",
  },
  brigit: {
    cs: "Bez nich je to jen jádro pobožnosti: sedm Otčenášů a Zdrávasů. S nimi přidá úvodní modlitbu a před každý Otčenáš rozjímání o jednom z prolití Kristovy krve. Pobožnost je doložena jen v národních jazycích; latinské znění je náš vlastní překlad.",
    en: "Without them, only the core of the devotion: seven Our Fathers and Hail Marys. With them, an opening prayer and, before each Our Father, a meditation on one shedding of Christ's Blood. The devotion is attested only in the vernacular; the Latin is our own translation.",
  },
};
