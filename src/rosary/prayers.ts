// Latin prayer texts and the three traditional mystery sets.
// Source: `Posvátný růženec latinsko – česky.pdf` (not in repo).
// Diacritics (acute accents, æ, œ) are part of the prayer text — preserve exactly.

export const PRAYER_TYPES = {
  SIGN_OF_CROSS: "sign_of_cross",
  CREED: "creed",
  OUR_FATHER: "our_father",
  HAIL_MARY: "hail_mary",
  GLORY_BE: "glory_be",
  FATIMA: "fatima",
  SALVE_REGINA: "salve_regina",
  // Leonine post-Mass prayer types. The Leonine Ave María reuses the shared
  // HAIL_MARY type (same text, just no mystery clause); only the Salve Regína
  // needs its own type because the rosary's version appends an Orémus collect.
  SALVE_REGINA_LEONINE: "salve_regina_leonine",
  LEONINE_OREMUS: "leonine_oremus",
  ST_MICHAEL: "st_michael",
  COR_IESU: "cor_iesu",
  // Seven Prayers of St. Bridget (the twelve-year devotion honoring the seven
  // sheddings of the Precious Blood). The meditation paragraphs have NO stable
  // authoritative Latin text — see the note above the BRIGIT_* entries in
  // PRAYERS. Each shedding's Pater Noster + Ave María reuse OUR_FATHER /
  // HAIL_MARY; only the meditation paragraphs need their own types.
  BRIGIT_OPENING: "brigit_opening",
  BRIGIT_CIRCUMCISION: "brigit_circumcision",
  BRIGIT_AGONY: "brigit_agony",
  BRIGIT_SCOURGING: "brigit_scourging",
  BRIGIT_THORNS: "brigit_thorns",
  BRIGIT_CROSS: "brigit_cross",
  BRIGIT_CRUCIFIXION: "brigit_crucifixion",
  BRIGIT_PIERCING: "brigit_piercing",
} as const;

export type PrayerType = (typeof PRAYER_TYPES)[keyof typeof PRAYER_TYPES];

export type MysteryKey = "radostny" | "bolestny" | "slavny";

export type MysterySet = {
  name: string;
  color: string;
  mysteries: readonly [string, string, string, string, string];
  mysteriesCs: readonly [string, string, string, string, string];
};

export const MYSTERIES: Record<MysteryKey, MysterySet> = {
  radostny: {
    name: "Mysteria Gaudiosa",
    color: "#2E7D32",
    mysteries: [
      "quem, Virgo, de Spiritu Sancto concepísti",
      "quem, Virgo, visitándo Elisabeth portásti",
      "quem, Virgo, genuísti in Betlehem",
      "quem, Virgo, in templo præsentásti",
      "quem, Virgo, in templo invenísti",
    ],
    mysteriesCs: [
      "kterého jsi, Panno, z Ducha Svatého počala",
      "s kterým jsi, Panno, Alžbětu navštívila",
      "kterého jsi, Panno, v Betlémě porodila",
      "kterého jsi, Panno, v chrámě obětovala",
      "kterého jsi, Panno, v chrámě nalezla",
    ],
  },
  bolestny: {
    name: "Mysteria Dolorosa",
    color: "#C62828",
    mysteries: [
      "qui pro nobis Sanguinem sudávit",
      "qui pro nobis flagellátus est",
      "qui pro nobis spinis coronátus est",
      "qui pro nobis crucem baiulávit",
      "qui pro nobis crucifíxus est",
    ],
    mysteriesCs: [
      "který se pro nás krví potil",
      "který byl pro nás bičován",
      "který byl pro nás trním korunován",
      "který pro nás nesl kříž",
      "který byl pro nás ukřižován",
    ],
  },
  slavny: {
    name: "Mysteria Gloriosa",
    color: "#F9A825",
    mysteries: [
      "qui resurréxit a mortuis",
      "qui in cælum ascéndit",
      "qui Spiritum Sanctum misit",
      "qui te, o Virgo, in cælum assúmpsit",
      "qui te, o Virgo, in cælis coronávit",
    ],
    mysteriesCs: [
      "který z mrtvých vstal",
      "který na nebe vstoupil",
      "který Ducha Svatého seslal",
      "který tě, Panno, na nebe vzal",
      "který tě, Panno, v nebi korunoval",
    ],
  },
};

// The Hail Mary is intentionally absent — its text is built by `getHailMary`
// so the per-decade mystery clause can be highlighted.
export type StaticPrayerType = Exclude<PrayerType, typeof PRAYER_TYPES.HAIL_MARY>;

// The Salve Regína antiphon + versicle is shared verbatim between the rosary's
// closing prayer and the Leonine post-Mass prayers. The rosary additionally
// appends an Orémus collect (see SALVE_REGINA below); the Leonine version
// (SALVE_REGINA_LEONINE) is the antiphon alone.
const SALVE_REGINA_ANTIPHON = `Salve Regína, Mater misericórdiæ, vita, dulcédo, et spes nostra, salve. Ad te clamámus, éxsules fílii Evæ. Ad te suspirámus geméntes et flentes in hac lacrimárum valle. Eia ergo, Advocáta nostra, illos tuos misericórdes óculos ad nos convérte. Et Iesum, benedíctum fructum ventris tui, nobis, post hoc exílium, osténde. O clemens, o pia, o dulcis Virgo María.

℣ Ora pro nobis, sancta Dei Génitrix.
℟ Ut digni efficiámur promissiónibus Christi.`;

export const PRAYERS: Record<StaticPrayerType, string> = {
  [PRAYER_TYPES.SIGN_OF_CROSS]: `In nómine ☩ Patris et Fílii et Spíritus Sancti. Amen.`,

  [PRAYER_TYPES.CREED]: `Credo in Deum, Patrem omnipoténtem, Creatórem cæli et terræ. Et in Iesum Christum, Fílium eius únicum, Dóminum nostrum: qui concéptus est de Spíritu Sancto, natus ex María Vírgine, passus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus: descéndit ad ínferos; tértia die resurréxit a mórtuis; ascéndit ad cælos; sedet ad déxteram Dei Patris omnipoténtis: inde ventúrus est iudicáre vivos et mórtuos. Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam, Sanctórum communiónem, remissiónem peccatórum, carnis resurrectiónem, vitam ætérnam. Amen.`,

  [PRAYER_TYPES.OUR_FATHER]: `Pater noster, qui es in cælis, sanctificétur nomen tuum. Advéniat regnum tuum. Fiat volúntas tua, sicut in cælo et in terra. Panem nostrum quotidiánum da nobis hódie: et dimítte nobis débita nostra, sicut et nos dimíttimus debitóribus nostris. Et ne nos indúcas in tentatiónem: sed líbera nos a malo. Amen.`,

  [PRAYER_TYPES.GLORY_BE]: `Glória Patri, et Fílio, et Spirítui Sancto. Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.FATIMA]: `O mi Iesu, indúlge peccáta nostra, consérva nos ab ígne inférni, duc ómnes ad cæli glóriam, præcípue misericordia túa máxime indigéntes.`,

  [PRAYER_TYPES.SALVE_REGINA]: `${SALVE_REGINA_ANTIPHON}

Orémus:
Deus, cuius Unigénitus per vitam, mortem et resurrectiónem suam nobis salútis ætérnæ præmia comparávit: concéde, quæsumus; ut hæc mysteria sacratíssimo beátæ Maríæ Virginis Rosário recoléntes, et imitémur quod continent, et quod promíttunt, assequámur. Per eúndem Christum Dóminum nostrum. Amen.`,

  [PRAYER_TYPES.SALVE_REGINA_LEONINE]: SALVE_REGINA_ANTIPHON,

  [PRAYER_TYPES.LEONINE_OREMUS]: `Orémus. Deus, refúgium nostrum et virtus, pópulum ad te clamántem propítius réspice; et intercedénte gloriósa, et immaculáta Vírgine Dei Genitríce María, cum beáto Ioseph, eius Sponso, ac beatis Apóstolis tuis Petro et Paulo, et ómnibus Sanctis, quas pro conversióne peccatórum, pro libertáte et exaltatióne sanctæ Matris Ecclésiæ, preces effúndimus, miséricors et benígnus exáudi. Per eúndem Christum Dóminum nostrum. Amen.`,

  [PRAYER_TYPES.ST_MICHAEL]: `Sancte Míchael Archángele, defénde nos in prælio; contra nequítiam et insídias diáboli esto præsídium. Imperet illi Deus, súpplices deprecámur: tuque, Princeps milítiæ Cæléstis, sátanam aliósque spíritus malígnos, qui ad perditiónem animárum pervagántur in mundo, divína virtúte in inférnum detrúde. Amen.`,

  [PRAYER_TYPES.COR_IESU]: `℣ Cor Iesu sacratíssimum.
℟ Miserére nobis.`,

  // ─────────────────────────────────────────────────────────────────────────
  // Seven Prayers of St. Bridget — TRANSLATION, NOT A SOURCED TEXT.
  // Unlike every other prayer here, these have no authoritative Latin original:
  // the twelve-year devotion is attested only in the vernacular, and the
  // "Latin" copies in circulation are amateur back-translations. The texts
  // below are our own faithful rendering of the well-established content of
  // each shedding of the Precious Blood (and the opening prayer), composed in
  // ecclesiastical Latin to match this app's orthography. Treat as devotional,
  // not as a critical edition. Replace verbatim if a trustworthy Latin source
  // (printed booklet) is later obtained.
  // ─────────────────────────────────────────────────────────────────────────
  [PRAYER_TYPES.BRIGIT_OPENING]: `O Iesu, nunc Oratiónem Domínicam séptiens oráre cúpio in unióne illíus amóris quo hanc oratiónem in Corde tuo sanctificásti. Súscipe eam ex lábiis meis in divínum Cor tuum; eménda et pérfice eam, ut tantum honórem et gáudium Sanctíssimæ Trinitáti áfferat quantum tu ipse in terris ei attribuísti. Hæc redúndent in sacratíssimam Humanitátem tuam, in honórem et glóriam Vúlnerum tuórum et pretiósi Sánguinis quem ex eis effudísti. Amen.`,

  [PRAYER_TYPES.BRIGIT_CIRCUMCISION]: `O Iesu, divíne amátor animárum nostrárum, in honórem illíus primæ effusiónis pretiósi Sánguinis tui quam in Circumcisióne tua pro nobis passus es, líbera me ab omni peccáto, mortáli et veniáli, et prótege me contra perícula et inimícos salútis meæ. Amen.`,

  [PRAYER_TYPES.BRIGIT_AGONY]: `O Iesu, divíne amátor animárum nostrárum, in honórem illíus terríbilis agóniæ quam in horto Olivéti sustinuísti, cum sacratíssimum Corpus tuum sudóre sanguíneo manávit, defénde me contra omnes inimícos salútis meæ, visíbiles et invisíbiles, et concéde mihi grátiam felícis mortis. Amen.`,

  [PRAYER_TYPES.BRIGIT_SCOURGING]: `O Iesu, divíne amátor animárum nostrárum, in honórem illíus pretiósi Sánguinis quem in crudelíssima flagellatióne tua effudísti, líbera me, quæso, a pœnis quas peccáta mea merúerunt, et da mihi patiéntiam in ómnibus tribulatiónibus huius vitæ. Amen.`,

  [PRAYER_TYPES.BRIGIT_THORNS]: `O Iesu, divíne amátor animárum nostrárum, in honórem illíus Sánguinis quem in coronatióne spinárum ex sacro cápite tuo profudísti, líbera me ab ómnibus pravis cogitatiónibus et supérbia, et concéde ut mente et corde tibi semper adhæream. Amen.`,

  [PRAYER_TYPES.BRIGIT_CROSS]: `O Iesu, divíne amátor animárum nostrárum, in honórem illíus Sánguinis quem in baiulatióne Crucis ad Calváriam effudísti, concéde mihi veram pœniténtiam et patiéntiam ad crucem meam cotídie portándam, te fidéliter sequéndo. Amen.`,

  [PRAYER_TYPES.BRIGIT_CRUCIFIXION]: `O Iesu, divíne amátor animárum nostrárum, in honórem illíus pretiósi Sánguinis quem ex Vulnéribus mánuum et pedum tuórum in Cruce profudísti, miserére mei, et per illos rivos Sánguinis tui salva ánimam meam in hora mortis meæ. Amen.`,

  [PRAYER_TYPES.BRIGIT_PIERCING]: `O Iesu, divíne amátor animárum nostrárum, in honórem illíus Sánguinis et aquæ quæ ex apérto látere et Corde tuo manavérunt, súscipe me in Cor tuum sacratíssimum, et per hanc últimam effusiónem perdúc me et omnes ánimas in glóriam ætérnam. Amen.`,
};

// The Hail Mary is split so the per-decade mystery clause can be visually
// highlighted in the accent color between the two halves.
export type HailMary = { before: string; mystery: string; after: string };

// Single source for the Ave María, shared by the rosary decades and the
// Leonine post-Mass prayers. The rosary inserts a mystery clause after `Iesus`
// (so `before` ends with a comma); the Leonine version passes no clause, so
// `before` closes the sentence with a period and the mystery line is omitted.
const AVE_MARIA_BEFORE = `Ave María, grátia plena, Dóminus tecum, benedícta tu in muliéribus et benedíctus fructus ventris tui, Iesus`;
const AVE_MARIA_AFTER = `Sancta María, Mater Dei, ora pro nobis peccatóribus, nunc et in hora mortis nostræ. Amen.`;

export function getHailMary(mystery: string | undefined): HailMary {
  const m = mystery ?? "";
  return {
    before: m ? `${AVE_MARIA_BEFORE},` : `${AVE_MARIA_BEFORE}.`,
    mystery: m,
    after: AVE_MARIA_AFTER,
  };
}

const AVE_MARIA_BEFORE_CS = `Zdrávas, Maria, milosti plná, Pán s tebou, požehnaná ty mezi ženami a požehnaný plod života tvého, Ježíš`;
const AVE_MARIA_AFTER_CS = `Svatá Maria, Matko Boží, pros za nás hříšné nyní i v hodinu smrti naší. Amen.`;

export function getHailMaryCs(mystery: string | undefined): HailMary {
  const m = mystery ?? "";
  return {
    before: m ? `${AVE_MARIA_BEFORE_CS},` : `${AVE_MARIA_BEFORE_CS}.`,
    mystery: m,
    after: AVE_MARIA_AFTER_CS,
  };
}

// Czech counterpart of the shared Salve Regína antiphon (see SALVE_REGINA_ANTIPHON).
const SALVE_REGINA_ANTIPHON_CS = `Zdrávas Královno, Matko milosrdenství. Živote, sladkosti a naděje naše, buď zdráva. K Tobě voláme, vyhnaní synové Evy. K Tobě vzdycháme, lkajíce a plačíce v tomto slzavém údolí. A proto, orodovnice naše, obrať k nám své milosrdné oči. A Ježíše, požehnaný plod života svého, nám po tomto putování ukaž. Ó milostivá, ó přívětivá, ó přesladká Panno Maria.

℣ Oroduj za nás, svatá Boží Rodičko.
℟ Abychom byli učiněni hodnými Kristových zaslíbení.`;

// Czech counterparts of the Latin prayer texts. Mirrors `PRAYERS` 1:1 so the
// prayer card can swap languages without any structural changes.
export const PRAYERS_CS: Record<StaticPrayerType, string> = {
  [PRAYER_TYPES.SIGN_OF_CROSS]: `Ve jménu ☩ Otce i Syna i Ducha Svatého. Amen.`,

  [PRAYER_TYPES.CREED]: `Věřím v Boha, Otce všemohoucího, Stvořitele nebe i země. I v Ježíše Krista, Syna jeho jediného, Pána našeho; jenž se počal z Ducha Svatého, narodil se z Marie Panny, trpěl pod Pontským Pilátem, ukřižován umřel i pohřben jest; sestoupil do pekel, třetího dne vstal z mrtvých; vstoupil na nebesa, sedí po pravici Boha, Otce všemohoucího; odtud přijde soudit živé i mrtvé. Věřím v Ducha Svatého, svatou církev obecnou, společenství svatých, odpuštění hříchů, vzkříšení těla a život věčný. Amen.`,

  [PRAYER_TYPES.OUR_FATHER]: `Otče náš, jenž jsi na nebesích, posvěť se jméno tvé. Přijď království tvé. Buď vůle tvá jako v nebi, tak i na zemi. Chléb náš vezdejší dej nám dnes. A odpusť nám naše viny, jako i my odpouštíme našim viníkům. A neuveď nás v pokušení, ale zbav nás od zlého. Amen.`,

  [PRAYER_TYPES.GLORY_BE]: `Sláva Otci i Synu i Duchu Svatému, jako byla na počátku, i nyní, i vždycky, a na věky věků. Amen.`,

  [PRAYER_TYPES.FATIMA]: `Ó můj Ježíši, odpusť nám naše hříchy, uchraň nás pekelného ohně a přiveď do nebe všechny duše, zvláště ty, které tvého milosrdenství nejvíce potřebují.`,

  [PRAYER_TYPES.SALVE_REGINA]: `${SALVE_REGINA_ANTIPHON_CS}

Modleme se:
Bože, jehož jednorozený Syn nám svým životem, smrtí a vzkříšením získal odměny věčné spásy: uděl nám, prosíme, abychom rozjímáním těchto tajemství posvátného růžence blahoslavené Panny Marie, jak následovali to, co obsahují, tak dosáhli toho, co slibují. Skrze téhož Krista, Pána našeho. Amen.`,

  [PRAYER_TYPES.SALVE_REGINA_LEONINE]: SALVE_REGINA_ANTIPHON_CS,

  [PRAYER_TYPES.LEONINE_OREMUS]: `Modleme se. Bože, útočiště naše a sílo, shlédni milostivě na lid, který k tobě volá, a na přímluvu slavné a neposkvrněné Panny, Bohorodičky Marie, se svatým Josefem, jejím snoubencem, i tvými svatými apoštoly Petrem a Pavlem a všemi svatými, vyslyš milosrdně a dobrotivě naše prosby, které předkládáme za obrácení hříšníků, za svobodu a povznesení svaté matky Církve. Skrze téhož Krista, našeho Pána. Amen.`,

  [PRAYER_TYPES.ST_MICHAEL]: `Svatý Michaeli Archanděli, braň nás v boji; proti zlobě a úkladům ďáblovým budiž nám záštitou. Nech ať Bůh přikáže jemu, pokorně prosíme. Ty pak, kníže vojska nebeského, Satana a jiné duchy zlé, kteří ke zkáze duší světem obcházejí, božskou mocí do pekla svrhni. Amen.`,

  [PRAYER_TYPES.COR_IESU]: `℣ Nejsvětější Srdce Ježíšovo.
℟ Smiluj se nad námi.`,

  // Seven Prayers of St. Bridget — TRANSLATION, not a sourced text. See the
  // note in PRAYERS above the Latin BRIGIT_* entries; the Czech is likewise our
  // own faithful rendering, not transcribed from an authoritative booklet.
  [PRAYER_TYPES.BRIGIT_OPENING]: `Ó Ježíši, nyní si přeji sedmkrát se pomodlit modlitbu Páně ve spojení s láskou, kterou jsi tuto modlitbu posvětil ve svém Srdci. Přijmi ji z mých rtů do svého božského Srdce; oprav a doplň ji tak, aby přinesla Nejsvětější Trojici tolik cti a radosti, kolik jsi jí ty sám na zemi touto modlitbou vzdal. Kéž se vylévají na tvé nejsvětější lidství ke cti a slávě tvých Ran a předrahé Krve, kterou jsi z nich vylil. Amen.`,

  [PRAYER_TYPES.BRIGIT_CIRCUMCISION]: `Ó Ježíši, božský milovníku našich duší, ke cti onoho prvního vylití tvé předrahé Krve, které jsi za nás podstoupil při svém obřezání, zbav mě všeho hříchu, smrtelného i všedního, a ochraňuj mě před nebezpečími a nepřáteli mé spásy. Amen.`,

  [PRAYER_TYPES.BRIGIT_AGONY]: `Ó Ježíši, božský milovníku našich duší, ke cti oné hrozné úzkosti, kterou jsi vytrpěl v Getsemanské zahradě, když tvé nejsvětější Tělo zalil krvavý pot, braň mě proti všem nepřátelům mé spásy, viditelným i neviditelným, a dej mi milost šťastné smrti. Amen.`,

  [PRAYER_TYPES.BRIGIT_SCOURGING]: `Ó Ježíši, božský milovníku našich duší, ke cti oné předrahé Krve, kterou jsi vylil při nejukrutnějším bičování, zbav mě, prosím, trestů, které si zasloužily mé hříchy, a dej mi trpělivost ve všech souženích tohoto života. Amen.`,

  [PRAYER_TYPES.BRIGIT_THORNS]: `Ó Ježíši, božský milovníku našich duší, ke cti oné Krve, kterou jsi při korunování trním vylil ze své svaté hlavy, zbav mě všech zlých myšlenek a pýchy a dej, ať k tobě vždy přilnu myslí i srdcem. Amen.`,

  [PRAYER_TYPES.BRIGIT_CROSS]: `Ó Ježíši, božský milovníku našich duší, ke cti oné Krve, kterou jsi vylil při nesení kříže na Kalvárii, dej mi pravou kajícnost a trpělivost, abych denně nesl svůj kříž a věrně tě následoval. Amen.`,

  [PRAYER_TYPES.BRIGIT_CRUCIFIXION]: `Ó Ježíši, božský milovníku našich duší, ke cti oné předrahé Krve, kterou jsi vylil z ran svých rukou a nohou na kříži, smiluj se nade mnou a skrze ony praménky své Krve zachraň mou duši v hodině mé smrti. Amen.`,

  [PRAYER_TYPES.BRIGIT_PIERCING]: `Ó Ježíši, božský milovníku našich duší, ke cti oné Krve a vody, které vytryskly z tvého otevřeného boku a Srdce, přijmi mě do svého nejsvětějšího Srdce a skrze toto poslední vylití doveď mě i všechny duše do věčné slávy. Amen.`,
};
