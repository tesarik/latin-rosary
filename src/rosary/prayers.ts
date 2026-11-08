// Latin prayer texts and the three traditional mystery sets.
// Source: `Posvátný růženec latinsko – česky.pdf` (not in repo).
// Diacritics (acute accents, æ, œ) are part of the prayer text — preserve exactly.
//
// The Latin is the prayer; everything keyed by `Locale` beside it (the
// mystery clauses, the display names here; the prayer bodies in
// prayers.cs.ts / prayers.en.ts, loaded on demand through translations.ts) is
// the translation the card's LA↔<language> toggle shows. Adding a UI locale in
// i18n.ts therefore means adding a full translation table, a prayers.<xx>.ts
// listed in translations.ts and allTranslations.ts.

import type { Locale } from "./i18n";

// One string per supported UI locale. Used for display names and the
// per-decade mystery clauses; the prayer bodies are in prayers.<locale>.ts.
export type Localized = Record<Locale, string>;

export const PRAYER_TYPES = {
  SIGN_OF_CROSS: "sign_of_cross",
  CREED: "creed",
  OUR_FATHER: "our_father",
  HAIL_MARY: "hail_mary",
  // A user's own prayer in a plan: its text travels on the sequence item
  // (`SequenceItem.custom`), so it has no entry in the prayer tables.
  CUSTOM: "custom",
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
  // Orationes utilissimæ — basic prayers shown as single-prayer links on the
  // start screen (source: orationes.pdf). The ones the app already had
  // (Signum Crucis, Pater Noster, Ave María, Gloria Patri, Apostles' Creed,
  // Salve Regína antiphon, Sancte Míchael) reuse their existing types; these
  // are the additions.
  NICENE_CREED: "nicene_creed",
  SUB_TUUM: "sub_tuum",
  ANGELE_DEI: "angele_dei",
  REQUIEM: "requiem",
  DECALOGUE: "decalogue",
  // For the dead: Psalm 129 with the versicles and collect it is prayed with,
  // and the sequence of the Requiem Mass.
  DE_PROFUNDIS: "de_profundis",
  DIES_IRAE: "dies_irae",
  // Ordo Missæ — the people's parts of the Mass — and the sequences.
  CONFITEOR: "confiteor",
  KYRIE: "kyrie",
  GLORIA_IN_EXCELSIS: "gloria_in_excelsis",
  SANCTUS: "sanctus",
  AGNUS_DEI: "agnus_dei",
  DOMINE_NON_SUM_DIGNUS: "domine_non_sum_dignus",
  PRAEFATIO_DIALOG: "praefatio_dialog",
  ANTE_COMMUNIONEM: "ante_communionem",
  POST_COMMUNIONEM: "post_communionem",
  // Everyday prayers, canticles and devotions.
  BENEDICTIO_MENSAE: "benedictio_mensae",
  GRATIARUM_ACTIO: "gratiarum_actio",
  MEMORARE: "memorare",
  AD_TE_IOSEPH: "ad_te_ioseph",
  MEMORARE_IOSEPH: "memorare_ioseph",
  MEMENTO_IOSEPH: "memento_ioseph",
  O_IOSEPH_VIRGO: "o_ioseph_virgo",
  FAC_NOS_INNOCUAM: "fac_nos_innocuam",
  COMMEMORATIO_IOSEPH: "commemoratio_ioseph",
  MAGNIFICAT: "magnificat",
  NUNC_DIMITTIS: "nunc_dimittis",
  IUDICA_ME: "iudica_me",
  SUSCIPE: "suscipe",
  CREATOR_INEFFABILIS: "creator_ineffabilis",
  // The Chaplet of the Holy Spirit: its opening, the Veni Creator, and the
  // five mysteries (each followed by a Pater, an Ave and seven Glórias).
  CORONA_SS_INITIUM: "corona_ss_initium",
  CORONA_SS_HYMNUS: "corona_ss_hymnus",
  CORONA_SS_1: "corona_ss_1",
  CORONA_SS_2: "corona_ss_2",
  CORONA_SS_3: "corona_ss_3",
  CORONA_SS_4: "corona_ss_4",
  CORONA_SS_5: "corona_ss_5",
  // The chaplets of St. Michael (the Angelic Crown), the Seven Sorrows, the
  // Precious Blood and the Sacred Heart: their headings, prayers and collects.
  CORONA_ANG_INITIUM: "corona_ang_initium",
  CORONA_ANG_1: "corona_ang_1",
  CORONA_ANG_2: "corona_ang_2",
  CORONA_ANG_3: "corona_ang_3",
  CORONA_ANG_4: "corona_ang_4",
  CORONA_ANG_5: "corona_ang_5",
  CORONA_ANG_6: "corona_ang_6",
  CORONA_ANG_7: "corona_ang_7",
  CORONA_ANG_8: "corona_ang_8",
  CORONA_ANG_9: "corona_ang_9",
  CORONA_ANG_ANTIPHONA: "corona_ang_antiphona",
  CORONA_ANG_OREMUS: "corona_ang_oremus",
  CORONA_DOL_INITIUM: "corona_dol_initium",
  CORONA_DOL_1: "corona_dol_1",
  CORONA_DOL_2: "corona_dol_2",
  CORONA_DOL_3: "corona_dol_3",
  CORONA_DOL_4: "corona_dol_4",
  CORONA_DOL_5: "corona_dol_5",
  CORONA_DOL_6: "corona_dol_6",
  CORONA_DOL_7: "corona_dol_7",
  CORONA_DOL_LACRIMAE: "corona_dol_lacrimae",
  CORONA_DOL_OREMUS: "corona_dol_oremus",
  CORONA_SANG_INITIUM: "corona_sang_initium",
  CORONA_SANG_1: "corona_sang_1",
  CORONA_SANG_2: "corona_sang_2",
  CORONA_SANG_3: "corona_sang_3",
  CORONA_SANG_4: "corona_sang_4",
  CORONA_SANG_5: "corona_sang_5",
  CORONA_SANG_6: "corona_sang_6",
  CORONA_SANG_7: "corona_sang_7",
  CORONA_SANG_TE_ERGO: "corona_sang_te_ergo",
  CORONA_SANG_ORATIO: "corona_sang_oratio",
  CORONA_SANG_OREMUS: "corona_sang_oremus",
  CORONA_COR_INITIUM: "corona_cor_initium",
  CORONA_COR_1: "corona_cor_1",
  CORONA_COR_2: "corona_cor_2",
  CORONA_COR_3: "corona_cor_3",
  CORONA_COR_4: "corona_cor_4",
  CORONA_COR_5: "corona_cor_5",
  CORONA_COR_IACULATORIA: "corona_cor_iaculatoria",
  CORONA_COR_MARIA: "corona_cor_maria",
  CORONA_COR_OREMUS: "corona_cor_oremus",
  VICTIMAE_PASCHALI: "victimae_paschali",
  VENI_SANCTE_SPIRITUS: "veni_sancte_spiritus",
  LAUDA_SION: "lauda_sion",
  STABAT_MATER: "stabat_mater",
  TE_DEUM: "te_deum",
  ADORO_TE: "adoro_te",
  AVE_VERUM: "ave_verum",
  O_SALUTARIS: "o_salutaris",
  PANGE_LINGUA: "pange_lingua",
  TANTUM_ERGO: "tantum_ergo",
  ANGELUS: "angelus",
  REGINA_CAELI: "regina_caeli",
  ANIMA_CHRISTI: "anima_christi",
  ATHANASIAN_CREED: "athanasian_creed",
  ALMA_REDEMPTORIS: "alma_redemptoris",
  AVE_REGINA_CAELORUM: "ave_regina_caelorum",
  LITANY_LORETO: "litany_loreto",
  LITANY_SACRED_HEART: "litany_sacred_heart",
  LITANY_HOLY_NAME: "litany_holy_name",
  LITANY_HUMILITY: "litany_humility",
  LITANY_ST_JOSEPH: "litany_st_joseph",
  LITANY_PRECIOUS_BLOOD: "litany_precious_blood",
  // Litany of the Saints — the only litany split across steps, so each section
  // is its own prayer type (see LITANY_SAINTS_SECTIONS in sequence.ts).
  LITANY_SAINTS_SUPPLICATIO: "litany_saints_supplicatio",
  LITANY_SAINTS_MARY: "litany_saints_mary",
  LITANY_SAINTS_PATRIARCHS: "litany_saints_patriarchs",
  LITANY_SAINTS_APOSTLES: "litany_saints_apostles",
  LITANY_SAINTS_MARTYRS: "litany_saints_martyrs",
  LITANY_SAINTS_BISHOPS: "litany_saints_bishops",
  LITANY_SAINTS_RELIGIOUS: "litany_saints_religious",
  LITANY_SAINTS_WOMEN: "litany_saints_women",
  LITANY_SAINTS_LAITY: "litany_saints_laity",
  LITANY_SAINTS_CHRIST: "litany_saints_christ",
  LITANY_SAINTS_NECESSITIES: "litany_saints_necessities",
  LITANY_SAINTS_CONCLUSION: "litany_saints_conclusion",
  LITANY_SAINTS_PSALM: "litany_saints_psalm",
  LITANY_SAINTS_VERSICLES: "litany_saints_versicles",
  LITANY_SAINTS_COLLECTS: "litany_saints_collects",
  // Chaplet of Divine Mercy (Corona Divínæ Misericórdiæ), prayed on the
  // rosary's beads. Its Pater Noster, Ave María and Credo reuse the rosary's.
  CHAPLET_OPENING: "chaplet_opening",
  CHAPLET_BLOOD_WATER: "chaplet_blood_water",
  CHAPLET_ETERNAL_FATHER: "chaplet_eternal_father",
  CHAPLET_PASSION: "chaplet_passion",
  CHAPLET_TRISAGION: "chaplet_trisagion",
  CHAPLET_CLOSING: "chaplet_closing",
  CHAPLET_TRUST: "chaplet_trust",
  // Septem Dolóres et Gáudia Sancti Ioseph, in its short Latin form: seven
  // headings, each with a Pater, Ave and Glória, then Vírginum custos.
  IOSEPH_1: "ioseph_1",
  IOSEPH_2: "ioseph_2",
  IOSEPH_3: "ioseph_3",
  IOSEPH_4: "ioseph_4",
  IOSEPH_5: "ioseph_5",
  IOSEPH_6: "ioseph_6",
  IOSEPH_7: "ioseph_7",
  IOSEPH_VIRGINUM_CUSTOS: "ioseph_virginum_custos",
} as const;

export type PrayerType = (typeof PRAYER_TYPES)[keyof typeof PRAYER_TYPES];

export type MysteryKey = "radostny" | "bolestny" | "slavny";

type FiveClauses = readonly [string, string, string, string, string];

export type MysterySet = {
  // Latin name, shown as the set's title; `nameTr` is the localized subtitle.
  name: string;
  nameTr: Localized;
  color: string;
  mysteries: FiveClauses;
  mysteriesTr: Record<Locale, FiveClauses>;
};

export const MYSTERIES: Record<MysteryKey, MysterySet> = {
  radostny: {
    name: "Mysteria Gaudiosa",
    nameTr: { cs: "Radostná tajemství", en: "The Joyful Mysteries" },
    color: "#2E7D32",
    mysteries: [
      "quem, Virgo, de Spiritu Sancto concepísti",
      "quem, Virgo, visitándo Elisabeth portásti",
      "quem, Virgo, genuísti in Betlehem",
      "quem, Virgo, in templo præsentásti",
      "quem, Virgo, in templo invenísti",
    ],
    mysteriesTr: {
      cs: [
        "kterého jsi, Panno, z Ducha Svatého počala",
        "s kterým jsi, Panno, Alžbětu navštívila",
        "kterého jsi, Panno, v Betlémě porodila",
        "kterého jsi, Panno, v chrámě obětovala",
        "kterého jsi, Panno, v chrámě nalezla",
      ],
      en: [
        "whom thou, O Virgin, didst conceive of the Holy Spirit",
        "whom thou, O Virgin, didst carry when visiting Elizabeth",
        "whom thou, O Virgin, didst bring forth in Bethlehem",
        "whom thou, O Virgin, didst present in the temple",
        "whom thou, O Virgin, didst find in the temple",
      ],
    },
  },
  bolestny: {
    name: "Mysteria Dolorosa",
    nameTr: { cs: "Bolestná tajemství", en: "The Sorrowful Mysteries" },
    color: "#C62828",
    mysteries: [
      "qui pro nobis Sanguinem sudávit",
      "qui pro nobis flagellátus est",
      "qui pro nobis spinis coronátus est",
      "qui pro nobis crucem baiulávit",
      "qui pro nobis crucifíxus est",
    ],
    mysteriesTr: {
      cs: [
        "který se pro nás krví potil",
        "který byl pro nás bičován",
        "který byl pro nás trním korunován",
        "který pro nás nesl kříž",
        "který byl pro nás ukřižován",
      ],
      en: [
        "who sweated blood for us",
        "who was scourged for us",
        "who was crowned with thorns for us",
        "who carried the cross for us",
        "who was crucified for us",
      ],
    },
  },
  slavny: {
    name: "Mysteria Gloriosa",
    nameTr: { cs: "Slavná tajemství", en: "The Glorious Mysteries" },
    color: "#F9A825",
    mysteries: [
      "qui resurréxit a mortuis",
      "qui in cælum ascéndit",
      "qui Spiritum Sanctum misit",
      "qui te, o Virgo, in cælum assúmpsit",
      "qui te, o Virgo, in cælis coronávit",
    ],
    mysteriesTr: {
      cs: [
        "který z mrtvých vstal",
        "který na nebe vstoupil",
        "který Ducha Svatého seslal",
        "který tě, Panno, na nebe vzal",
        "který tě, Panno, v nebi korunoval",
      ],
      en: [
        "who rose from the dead",
        "who ascended into heaven",
        "who sent the Holy Spirit",
        "who assumed thee, O Virgin, into heaven",
        "who crowned thee, O Virgin, in heaven",
      ],
    },
  },
};

// The Hail Mary is intentionally absent — its text is built by `getHailMary`
// so the per-decade mystery clause can be highlighted.
export type StaticPrayerType = Exclude<PrayerType, typeof PRAYER_TYPES.HAIL_MARY | typeof PRAYER_TYPES.CUSTOM>;

// The Salve Regína antiphon + versicle is shared verbatim between the rosary's
// closing prayer and the Leonine post-Mass prayers. The rosary additionally
// appends an Orémus collect (see SALVE_REGINA below); the Leonine version
// (SALVE_REGINA_LEONINE) is the antiphon alone.
const SALVE_REGINA_ANTIPHON = `Salve Regína, Mater misericórdiæ, vita, dulcédo, et spes nostra, salve. Ad te clamámus, éxsules fílii Evæ. Ad te suspirámus geméntes et flentes in hac lacrimárum valle. Eia ergo, Advocáta nostra, illos tuos misericórdes óculos ad nos convérte. Et Iesum, benedíctum fructum ventris tui, nobis, post hoc exílium, osténde. O clemens, o pia, o dulcis Virgo María.

℣ Ora pro nobis, sancta Dei Génitrix.
℟ Ut digni efficiámur promissiónibus Christi.`;

const PATER_NOSTER = `Pater noster, qui es in cælis, sanctificétur nomen tuum. Advéniat regnum tuum. Fiat volúntas tua, sicut in cælo et in terra. Panem nostrum quotidiánum da nobis hódie: et dimítte nobis débita nostra, sicut et nos dimíttimus debitóribus nostris. Et ne nos indúcas in tentatiónem: sed líbera nos a malo. Amen.`;

// One of St. Joseph's seven sorrows and joys: its heading in red, as a missal
// heads a section, then the Pater Noster that opens it (the Ave María and
// Glória Patri after it are steps of their own, see buildIosephPrayers).
export const ioseph = (heading: string, pater: string) => `{r}${heading}{/r}\n\n${pater}`;

export const PRAYERS: Record<StaticPrayerType, string> = {
  [PRAYER_TYPES.SIGN_OF_CROSS]: `In nómine ☩ Patris et Fílii et Spíritus Sancti. Amen.`,

  [PRAYER_TYPES.CREED]: `Credo in Deum, Patrem omnipoténtem, Creatórem cæli et terræ. Et in Iesum Christum, Fílium eius únicum, Dóminum nostrum: qui concéptus est de Spíritu Sancto, natus ex María Vírgine, passus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus: descéndit ad ínferos; tértia die resurréxit a mórtuis; ascéndit ad cælos; sedet ad déxteram Dei Patris omnipoténtis: inde ventúrus est iudicáre vivos et mórtuos. Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam, Sanctórum communiónem, remissiónem peccatórum, carnis resurrectiónem, vitam ætérnam. Amen.`,

  [PRAYER_TYPES.OUR_FATHER]: PATER_NOSTER,

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

  // Orationes utilissimæ additions. Source: orationes.pdf.
  [PRAYER_TYPES.NICENE_CREED]: `Credo in unum Deum, Patrem omnipoténtem, factórem cæli et terræ, visibílium ómnium et invisibílium. Et in unum Dóminum Iesum Christum, Fílium Dei unigénitum. Et ex Patre natum ante ómnia sæcula. Deum de Deo, lumen de lúmine, Deum verum de Deo vero. Génitum, non factum, consubstantiálem Patri: per quem ómnia facta sunt. Qui propter nos hómines et propter nostram salútem descéndit de cælis. Et incarnátus est de Spíritu Sancto ex María Vírgine: Et homo factus est. Crucifíxus étiam pro nobis: sub Póntio Piláto passus, et sepúltus est. Et resurréxit tértia die, secúndum Scriptúras. Et ascéndit in cælum: sedet ad déxteram Patris. Et íterum ventúrus est cum glória iudicáre vivos et mórtuos: cuius regni non erit finis. Et in Spíritum Sanctum, Dóminum et vivificántem: qui ex Patre Filióque procédit. Qui cum Patre et Fílio simul adorátur et conglorificátur: qui locútus est per Prophétas. Et unam sanctam cathólicam et apostólicam Ecclésiam. Confíteor unum baptísma in remissiónem peccatórum. Et exspécto resurrectiónem mortuórum. Et vitam ventúri sæculi. Amen.`,

  [PRAYER_TYPES.SUB_TUUM]: `Sub tuum præsídium confúgimus, sancta Dei Génitrix. Nostras deprecatiónes ne despícias in necessitátibus, sed a perículis cunctis líbera nos semper, Virgo benedícta. Dómina nostra, mediátrix nostra, advocáta nostra, tuo Fílio nos reconcília, tuo Fílio nos comménda, tuo Fílio nos repræsénta.`,

  [PRAYER_TYPES.ANGELE_DEI]: `Angele Dei, qui custos es mei, me, tibi commíssum pietáte supérna, illúmina, custódi, rege et gubérna. Amen.`,

  [PRAYER_TYPES.REQUIEM]: `Réquiem ætérnam dona eis, Dómine.
Et lux perpétua lúceat eis.
Requiéscant in pace. Amen.`,

  [PRAYER_TYPES.DECALOGUE]: `1. Non habébis deos aliénos coram me.
2. Non assúmes nomen Dómini Dei tui in vanum.
3. Memento, ut dies festos sanctífices.
4. Honóra patrem tuum et matrem tuam.
5. Non occídes.
6. Non mœcháberis.
7. Non furtum fácies.
8. Non loquéris contra próximum tuum falsum testimónium.
9. Non desiderábis uxórem eius.
10. Non concupísces eius bona.`,

  // De profúndis (Ps 129, Vulgate, checked against drbo.org) with the
  // versicles and the Fidélium, Deus collect it is traditionally said with for
  // the dead (the collect as in the Litany of the Saints above, with its
  // long ending).
  [PRAYER_TYPES.DE_PROFUNDIS]: `De profúndis clamávi ad te, Dómine: Dómine, exáudi vocem meam.
Fiant aures tuæ intendéntes in vocem deprecatiónis meæ.
Si iniquitátes observáveris, Dómine: Dómine, quis sustinébit?
Quia apud te propitiátio est: et propter legem tuam sustínui te, Dómine.
Sustínuit ánima mea in verbo eius: sperávit ánima mea in Dómino.
A custódia matutína usque ad noctem: speret Israël in Dómino.
Quia apud Dóminum misericórdia: et copiósa apud eum redémptio.
Et ipse rédimet Israël ex ómnibus iniquitátibus eius.

℣ Réquiem ætérnam dona eis, Dómine.
℟ Et lux perpétua lúceat eis.
℣ A porta ínferi.
℟ Erue, Dómine, ánimas eórum.
℣ Requiéscant in pace.
℟ Amen.
℣ Dómine, exáudi oratiónem meam.
℟ Et clamor meus ad te véniat.

Orémus.
Fidélium, Deus ómnium Cónditor et Redémptor, animábus famulórum famularúmque tuárum remissiónem cunctórum tríbue peccatórum: ut indulgéntiam, quam semper optavérunt, piis supplicatiónibus consequántur. Qui vivis et regnas in sǽcula sæculórum.
℟ Amen.`,

  // Dies iræ, the sequence of the Requiem Mass (Missale Romanum 1962),
  // checked word for word against the Latin at ikatolici.cz.
  [PRAYER_TYPES.DIES_IRAE]: `Dies iræ, dies illa,
solvet sæclum in favílla:
teste David cum Sibýlla.

Quantus tremor est futúrus,
quando iudex est ventúrus,
cuncta stricte discussúrus!

Tuba, mirum spargens sonum
per sepúlchra regiónum,
coget omnes ante thronum.

Mors stupébit et natúra,
cum resúrget creatúra,
iudicánti responsúra.

Liber scriptus proferétur,
in quo totum continétur,
unde mundus iudicétur.

Iudex ergo cum sedébit,
quidquid latet, apparébit:
nil inúltum remanébit.

Quid sum miser tunc dictúrus?
Quem patrónum rogatúrus,
cum vix iustus sit secúrus?

Rex treméndæ maiestátis,
qui salvándos salvas gratis,
salva me, fons pietátis.

Recordáre, Iesu pie,
quod sum causa tuæ viæ:
ne me perdas illa die.

Quærens me, sedísti lassus:
redemísti Crucem passus:
tantus labor non sit cassus.

Iuste iudex ultiónis,
donum fac remissiónis
ante diem ratiónis.

Ingemísco, tamquam reus:
culpa rubet vultus meus:
supplicánti parce, Deus.

Qui Maríam absolvísti,
et latrónem exaudísti,
mihi quoque spem dedísti.

Preces meæ non sunt dignæ:
sed tu bonus fac benígne,
ne perénni cremer igne.

Inter oves locum præsta,
et ab hædis me sequéstra,
státuens in parte dextra.

Confutátis maledíctis,
flammis ácribus addíctis:
voca me cum benedíctis.

Oro supplex et acclínis,
cor contrítum quasi cinis:
gere curam mei finis.

Lacrimósa dies illa,
qua resúrget ex favílla
iudicándus homo reus.
Huic ergo parce, Deus:
pie Iesu Dómine,
dona eis réquiem. Amen.`,

  // Confíteor with the Misereátur and Indulgéntiam, in the server's (the
  // people's) form, from the Ordo Missæ (Schallerův Římský misál, 1931).
  [PRAYER_TYPES.CONFITEOR]: `Confíteor Deo omnipoténti, beátæ Maríæ semper Vírgini, beáto Michaéli Archángelo, beáto Ioánni Baptístæ, sanctis Apóstolis Petro et Paulo, ómnibus Sanctis, et tibi, pater: quia peccávi nimis cogitatióne, verbo et ópere: mea culpa, mea culpa, mea máxima culpa. Ideo precor beátam Maríam semper Vírginem, beátum Michaélem Archángelum, beátum Ioánnem Baptístam, sanctos Apóstolos Petrum et Paulum, omnes Sanctos, et te, pater, oráre pro me ad Dóminum Deum nostrum.

℣ Misereátur vestri omnípotens Deus, et dimíssis peccátis vestris, perdúcat vos ad vitam ætérnam.
℟ Amen.
℣ Indulgéntiam, absolutiónem et remissiónem peccatórum nostrórum tríbuat nobis omnípotens et miséricors Dóminus.
℟ Amen.`,

  // Ordo Missæ: the Kýrie, Glória, Sanctus, Agnus Dei and Dómine, non sum
  // dignus as in Schallerův Římský misál (1931).
  [PRAYER_TYPES.KYRIE]: `Kýrie, eléison. 3×
Christe, eléison. 3×
Kýrie, eléison. 3×`,

  [PRAYER_TYPES.GLORIA_IN_EXCELSIS]: `Glória in excélsis Deo. Et in terra pax homínibus bonæ voluntátis. Laudámus te. Benedícimus te. Adorámus te. Glorificámus te. Grátias ágimus tibi propter magnam glóriam tuam. Dómine Deus, Rex cæléstis, Deus Pater omnípotens. Dómine Fili unigénite, Iesu Christe. Dómine Deus, Agnus Dei, Fílius Patris. Qui tollis peccáta mundi, miserére nobis. Qui tollis peccáta mundi, súscipe deprecatiónem nostram. Qui sedes ad déxteram Patris, miserére nobis. Quóniam tu solus Sanctus. Tu solus Dóminus. Tu solus Altíssimus, Iesu Christe. Cum Sancto Spíritu, in glória Dei Patris. Amen.`,

  [PRAYER_TYPES.SANCTUS]: `Sanctus, Sanctus, Sanctus Dóminus, Deus Sábaoth. Pleni sunt cæli et terra glória tua. Hosánna in excélsis.
Benedíctus qui venit in nómine Dómini. Hosánna in excélsis.`,

  [PRAYER_TYPES.AGNUS_DEI]: `Agnus Dei, qui tollis peccáta mundi, miserére nobis.
Agnus Dei, qui tollis peccáta mundi, miserére nobis.
Agnus Dei, qui tollis peccáta mundi, dona nobis pacem.`,

  [PRAYER_TYPES.DOMINE_NON_SUM_DIGNUS]: `Dómine, non sum dignus, ut intres sub tectum meum: sed tantum dic verbo, et sanábitur ánima mea. 3×`,

  // The dialogue before the Preface, and the priest's prayers before and
  // after his Communion (Schallerův Římský misál, 1931).
  [PRAYER_TYPES.PRAEFATIO_DIALOG]: `℣ Per ómnia sǽcula sæculórum.
℟ Amen.
℣ Dóminus vobíscum.
℟ Et cum spíritu tuo.
℣ Sursum corda.
℟ Habémus ad Dóminum.
℣ Grátias agámus Dómino, Deo nostro.
℟ Dignum et iustum est.`,

  [PRAYER_TYPES.ANTE_COMMUNIONEM]: `Dómine Iesu Christe, qui dixísti Apóstolis tuis: Pacem relínquo vobis, pacem meam do vobis: ne respícias peccáta mea, sed fidem Ecclésiæ tuæ: eámque secúndum voluntátem tuam pacificáre et coadunáre dignéris: qui vivis et regnas Deus, per ómnia sǽcula sæculórum. Amen.

Dómine Iesu Christe, Fili Dei vivi, qui ex voluntáte Patris, cooperánte Spíritu Sancto, per mortem tuam mundum vivificásti: líbera me per hoc sacrosánctum Corpus et Sánguinem tuum ab ómnibus iniquitátibus meis, et univérsis malis: et fac me tuis semper inhærére mandátis, et a te numquam separári permíttas: qui cum eódem Deo Patre et Spíritu Sancto vivis et regnas Deus, in sǽcula sæculórum. Amen.

Percéptio Córporis tui, Dómine Iesu Christe, quod ego indígnus súmere præsúmo, non mihi provéniat in iudícium et condemnatiónem: sed pro tua pietáte prosit mihi ad tutaméntum mentis et córporis, et ad medélam percipiéndam: qui vivis et regnas cum Deo Patre in unitáte Spíritus Sancti Deus, per ómnia sǽcula sæculórum. Amen.

Panem cæléstem accípiam, et nomen Dómini invocábo.`,

  [PRAYER_TYPES.POST_COMMUNIONEM]: `Quod ore súmpsimus, Dómine, pura mente capiámus: et de múnere temporáli fiat nobis remédium sempitérnum.

Corpus tuum, Dómine, quod sumpsi, et Sanguis, quem potávi, adhǽreat viscéribus meis: et præsta; ut in me non remáneat scélerum mácula, quem pura et sancta refecérunt sacraménta: qui vivis et regnas in sǽcula sæculórum. Amen.`,

  // Everyday prayers, canticles and devotions. Latin as in preces-latinae
  // (checked against it word by word: grace at meals, Memoráre, Ad te beáte
  // Ioseph with Leo XIII's "súbolem" and "omnem"), the canticles from the
  // Vulgate as in the Breviary, Iúdica me from the Ordo Missæ (Schaller).
  [PRAYER_TYPES.BENEDICTIO_MENSAE]: `Bénedic, Dómine, nos et hæc tua dona, quæ de tua largitáte sumus sumptúri. Per Christum Dóminum nostrum. Amen.`,

  [PRAYER_TYPES.GRATIARUM_ACTIO]: `Agimus tibi grátias, omnípotens Deus, pro univérsis benefíciis tuis: qui vivis et regnas in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.MEMORARE]: `Memoráre, o piíssima Virgo María, non esse audítum a sǽculo, quemquam ad tua curréntem præsídia, tua implorántem auxília, tua peténtem suffrágia, esse derelíctum. Ego tali animátus confidéntia, ad te, Virgo Vírginum, Mater, curro, ad te vénio, coram te gemens peccátor assísto. Noli, Mater Verbi, verba mea despícere; sed áudi propítia et exáudi. Amen.`,

  [PRAYER_TYPES.AD_TE_IOSEPH]: `Ad te, beáte Ioseph, in tribulatióne nostra confúgimus, atque, imploráto Sponsæ tuæ sanctíssimæ auxílio, patrocínium quoque tuum fidénter expóscimus. Per eam, quæsumus, quæ te cum immaculáta Vírgine Dei Genetríce coniúnxit, caritátem, perque patérnum, quo Púerum Iesum ampléxus es, amórem, súpplices deprecámur, ut ad hereditátem, quam Iesus Christus acquisívit Sánguine suo, benígnus respícias, ac necessitátibus nostris tua virtúte et ope succúrras. Tuére, o Custos providentíssime divínæ Famíliæ, Iesu Christi súbolem eléctam; próhibe a nobis, amantíssime Pater, omnem errórum ac corruptelárum luem; propítius nobis, sospitátor noster fortíssime, in hoc cum potestáte tenebrárum certámine e cælo adésto; et sicut olim Púerum Iesum e summo eripuísti vitæ discrímine, ita nunc Ecclésiam sanctam Dei ab hostílibus insídiis atque ab omni adversitáte defénde: nosque síngulos perpétuo tege patrocínio, ut ad tui exémplar et ope tua suffúlti, sancte vívere, pie émori, sempiternámque in cælis beatitúdinem ássequi possímus. Amen.`,

  // Prayers to St. Joseph. Meménto nostri (St. Bernardine), Fac nos innócuam
  // and the commemoration (the antiphon, versicle and collect after the hymn
  // Quicúmque sanus) are the Raccolta's Latin (1910, nos. 309, 310, 298); O
  // Ioseph, virgo Pater is Preces et pia opera (1929, no. 216). The accents
  // are ours. OUR OWN TEXT: the Latin of the Memoráre of St. Joseph — an
  // Italian devotion (Pius IX, 1863) that the Raccolta prints in English only
  // and Preces et pia opera not at all; it follows the Latin in circulation
  // (prayinglatin.com), with its misprints corrected.
  [PRAYER_TYPES.MEMORARE_IOSEPH]: `Memoráre, o puríssime Sponse Vírginis Maríæ, o dulcis protéctor mi, sancte Ioseph, non esse audítum a sǽculo, quemquam ad tua implorántem auxília, tua peténtem suffrágia, esse derelíctum. Ego tali animátus confidéntia ad te vénio, tibíque férvide me comméndo. Noli, quæso, o Pater putatíve Redemptóris, verba mea despícere, sed audi propítius. Amen.`,

  [PRAYER_TYPES.MEMENTO_IOSEPH]: `Meménto nostri, beáte Ioseph, et tuæ oratiónis suffrágio apud tuum putatívum Fílium intercéde; sed et beatíssimam Vírginem Sponsam tuam nobis propítiam redde, quæ Mater est eius, qui cum Patre et Spíritu Sancto vivit et regnat per infiníta sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.O_IOSEPH_VIRGO]: `O Ioseph, virgo Pater Iesu, puríssime Sponse Vírginis Maríæ, quotídie deprecáre pro nobis ipsum Iesum, Fílium Dei, ut, armis suæ grátiæ muníti, legítime certántes in vita, ab eódem coronémur in morte.`,

  [PRAYER_TYPES.FAC_NOS_INNOCUAM]: `Fac nos innócuam, Ioseph, decúrrere vitam, sitque tuo semper tuta patrocínio.`,

  [PRAYER_TYPES.COMMEMORATIO_IOSEPH]: `{r}Antíphona{/r}
Ecce fidélis servus et prudens, quem constítuit Dóminus super famíliam suam.

℣ Ora pro nobis, beáte Ioseph.
℟ Ut digni efficiámur promissiónibus Christi.

Orémus. Deus, qui ineffábili providéntia beátum Ioseph sanctíssimæ Genitrícis tuæ sponsum elígere dignátus es: præsta, quǽsumus, ut quem protectórem venerámur in terris, intercessórem habére mereámur in cælis: qui vivis et regnas in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.MAGNIFICAT]: `Magníficat ánima mea Dóminum,
et exsultávit spíritus meus in Deo salutári meo.
Quia respéxit humilitátem ancíllæ suæ: ecce enim ex hoc beátam me dicent omnes generatiónes.
Quia fecit mihi magna qui potens est: et sanctum nomen eius.
Et misericórdia eius a progénie in progénies timéntibus eum.
Fecit poténtiam in bráchio suo: dispérsit supérbos mente cordis sui.
Depósuit poténtes de sede, et exaltávit húmiles.
Esuriéntes implévit bonis: et dívites dimísit inánes.
Suscépit Israël púerum suum, recordátus misericórdiæ suæ.
Sicut locútus est ad patres nostros, Ábraham et sémini eius in sǽcula.
Glória Patri, et Fílio, et Spirítui Sancto.
Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.NUNC_DIMITTIS]: `Nunc dimíttis servum tuum, Dómine, secúndum verbum tuum in pace:
Quia vidérunt óculi mei salutáre tuum,
Quod parásti ante fáciem ómnium populórum,
Lumen ad revelatiónem géntium, et glóriam plebis tuæ Israël.
Glória Patri, et Fílio, et Spirítui Sancto.
Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.IUDICA_ME]: `℣ Introíbo ad altáre Dei.
℟ Ad Deum, qui lætíficat iuventútem meam.
℣ Iúdica me, Deus, et discérne causam meam de gente non sancta: ab hómine iníquo et dolóso érue me.
℟ Quia tu es, Deus, fortitúdo mea: quare me repulísti, et quare tristis incédo, dum afflígit me inimícus?
℣ Emítte lucem tuam, et veritátem tuam: ipsa me deduxérunt, et adduxérunt in montem sanctum tuum, et in tabernácula tua.
℟ Et introíbo ad altáre Dei: ad Deum, qui lætíficat iuventútem meam.
℣ Confitébor tibi in cíthara, Deus, Deus meus: quare tristis es, ánima mea, et quare contúrbas me?
℟ Spera in Deo, quóniam adhuc confitébor illi: salutáre vultus mei, et Deus meus.
℣ Glória Patri, et Fílio, et Spirítui Sancto.
℟ Sicut erat in princípio, et nunc, et semper: et in sǽcula sæculórum. Amen.
℣ Introíbo ad altáre Dei.
℟ Ad Deum, qui lætíficat iuventútem meam.`,

  [PRAYER_TYPES.SUSCIPE]: `Súscipe, Dómine, univérsam meam libertátem. Accipe memóriam, intelléctum atque voluntátem omnem. Quidquid hábeo vel possídeo mihi largítus es; id tibi totum restítuo, ac tuæ prorsus voluntáti trado gubernándum. Amórem tui solum cum grátia tua mihi dones, et dives sum satis, nec áliud quidquam ultra posco. Amen.`,

  // St. Thomas Aquinas's prayer before study: Latin from preces-latinae
  // (checked word by word; the accents are ours).
  [PRAYER_TYPES.CREATOR_INEFFABILIS]: `Creátor ineffábilis, qui de thesáuris sapiéntiæ tuæ tres Angelórum hierarchías designásti et eas super cælum empýreum miro órdine collocásti atque univérsi partes elegantíssime distribuísti: Tu, inquam, qui verus fons lúminis et sapiéntiæ díceris ac superéminens princípium, infúndere dignéris super intelléctus mei ténebras tuæ rádium claritátis, dúplices, in quibus natus sum, a me rémovens ténebras, peccátum scílicet et ignorántiam. Tu, qui linguas infántium facis disértas, linguam meam erúdias atque in lábiis meis grátiam tuæ benedictiónis infúndas. Da mihi intelligéndi ácumen, retinéndi capacitátem, addiscéndi modum et facilitátem, interpretándi subtilitátem, loquéndi grátiam copiósam. Ingréssum instrúas, progréssum dírigas, egréssum cómpleas. Tu, qui es verus Deus et homo, qui vivis et regnas in sǽcula sæculórum. Amen.`,

  // Corona Spíritus Sancti, from Preces et pia opera (Rome, 1929), no. 135
  // (checked word by word against the scan; the accents are ours).
  [PRAYER_TYPES.CORONA_SS_INITIUM]: `In nómine Patris, et Fílii, et Spíritus Sancti. Amen.

{r}Actus contritiónis{/r}
Dóleo, mi Deus, me contra te peccásse, quia tam bonus es; grátia tua adiuvánte non ámplius peccábo.`,

  [PRAYER_TYPES.CORONA_SS_HYMNUS]: `Veni, Creátor Spíritus,
mentes tuórum vísita,
imple supérna grátia,
quæ tu creásti péctora.

Qui díceris Paráclitus,
Altíssimi donum Dei,
fons vivus, ignis, cáritas,
et spiritális únctio.

Tu septifórmis múnere,
dígitus patérnæ déxteræ,
tu rite promíssum Patris,
sermóne ditans gúttura.

Accénde lumen sénsibus,
infúnde amórem córdibus,
infírma nostri córporis
virtúte firmans pérpeti.

Hostem repéllas lóngius,
pacémque dones prótinus:
ductóre sic te prǽvio
vitémus omne nóxium.

Per te sciámus da Patrem,
noscámus atque Fílium,
teque utriúsque Spíritum
credámus omni témpore.

Deo Patri sit glória,
et Fílio, qui a mórtuis
surréxit, ac Paráclito,
in sæculórum sǽcula. Amen.

℣ Emítte Spíritum tuum et creabúntur.
℟ Et renovábis fáciem terræ.

Orémus. Deus, qui corda fidélium Sancti Spíritus illustratióne docuísti: da nobis in eódem Spíritu recta sápere; et de eius semper consolatióne gaudére. Per Christum Dóminum nostrum. Amen.`,

  [PRAYER_TYPES.CORONA_SS_1]: `{r}Mystérium primum{/r}
De Spíritu Sancto ex María Vírgine Iesus concéptus est.

{r}Meditátio.{/r} Spíritus Sanctus supervéniet in te, et virtus Altíssimi obumbrábit tibi. Ideóque et quod nascétur ex te Sanctum, vocábitur Fílius Dei (Luc. 1, 35).

{r}Exercitátio.{/r} Precáre veheménter divíni Spíritus auxílium et Maríæ intercessiónem ad imitándas virtútes Iesu Christi, qui est exemplar virtútum, ut confórmis fias imágini Fílii Dei.`,

  [PRAYER_TYPES.CORONA_SS_2]: `{r}Mystérium secúndum{/r}
Spíritus Dómini requiévit super Iesum.

{r}Meditátio.{/r} Baptizátus autem Iesus, conféstim ascéndit de aqua, et ecce apérti sunt ei cæli: et vidit Spíritum Dei descendéntem sicut colúmbam, et veniéntem super se (Matth. 3, 16).

{r}Exercitátio.{/r} In summo prétio habe inæstimábilem grátiam sanctificántem per Spíritum Sanctum in Baptísmo cordi tuo infúsam. Tene promíssa, ad quæ servánda tunc te obstrinxísti. Contínua exercitatióne auge fidem, spem, caritátem. Semper vive ut decet fílios Dei et veræ Dei Ecclésiæ membra, ut post hanc vitam accípias cæli hereditátem.`,

  [PRAYER_TYPES.CORONA_SS_3]: `{r}Mystérium tértium{/r}
A Spíritu ductus est Iesus in desértum.

{r}Meditátio.{/r} Iesus autem plenus Spíritu Sancto regréssus est a Iordáne: et agebátur a Spíritu in desértum diébus quadragínta, et tentabátur a diábolo (Luc. 4, 1-2).

{r}Exercitátio.{/r} Semper esto gratus pro septifórmi múnere Spíritus Sancti in Confirmatióne tibi dato, pro Spíritu sapiéntiæ et intelléctus, consílii et fortitúdinis, sciéntiæ et pietátis, timóris Dómini. Fidéliter obséquere divíno Duci ut in ómnibus perículis huius vitæ et tentatiónibus viríliter agas, sicut decet perféctum christiánum et fortem Iesu Christi athlétam.`,

  [PRAYER_TYPES.CORONA_SS_4]: `{r}Mystérium quartum{/r}
Spíritus Sanctus in Ecclésia.

{r}Meditátio.{/r} Factus est repénte de cælo sonus tamquam adveniéntis spíritus veheméntis, ubi erant sedéntes; et repléti sunt omnes Spíritu Sancto loquéntes magnália Dei (Act. 2, 2. 4. 11).

{r}Exercitátio.{/r} Grátias age Deo quod te fecit Ecclésiæ suæ fílium, quam divínus Spíritus, Pentecóstes die in mundum missus, semper vivíficat et regit. Audi et séquere Summum Pontíficem, qui per Spíritum Sanctum infallibíliter docet, atque Ecclésiam quæ est colúmna et firmaméntum veritátis. Dógmata eius tuére, eius partes tene, eius iura defénde.`,

  [PRAYER_TYPES.CORONA_SS_5]: `{r}Mystérium quintum{/r}
Spíritus Sanctus in ánima iusti.

{r}Meditátio.{/r} An nescítis quóniam membra vestra templum sunt Spíritus Sancti, qui in vobis est? (1 Cor. 6, 19). Spíritum nolíte exstínguere (1 Thess. 5, 19). Et nolíte contristáre Spíritum Sanctum Dei, in quo signáti estis in diem redemptiónis (Eph. 4, 30).

{r}Exercitátio.{/r} Semper recordáre de Spíritu Sancto qui est in te, et puritáti ánimæ et córporis omnem da óperam. Fidéliter obédi divínis eius inspiratiónibus, ut fácias fructus Spíritus: caritátem, gáudium, pacem, patiéntiam, benignitátem, bonitátem, longanimitátem, mansuetúdinem, fidem, modéstiam, continéntiam, castitátem.`,

  // The four chaplets below are Raccolta devotions with no Latin text in any
  // collection we could find (Preces et pia opera, Coeleste palmetum): THEIR
  // LATIN IS OUR OWN TRANSLATION, made from the Raccolta (1910; 1878 for the
  // Sacred Heart) beside the Czech of Cesta k věčné spáse (1915) and Poutní
  // kniha (1893). Sourced exceptions: the versicles Deus in adiutórium (Ps. 69)
  // and Te ergo quǽsumus (Te Deum), and the collects and versicles printed in
  // Latin in the Raccolta or taken from the Missal — Intervéniat (Seven
  // Sorrows), Omnípotens sempitérne Deus, qui unigénitum (Precious Blood) and
  // Illo nos igne (Sacred Heart). Replace the rest verbatim if a sourced Latin
  // text is ever found.
  [PRAYER_TYPES.CORONA_ANG_INITIUM]: `℣ Deus, in adiutórium meum inténde.
℟ Dómine, ad adiuvándum me festína.

Glória Patri, et Fílio, et Spirítui Sancto. Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_1]: `{r}Salutátio prima{/r}
Intercedénte sancto Michaéle et cælésti choro Séraphim, dignos nos effíciat Dóminus, qui igne perféctæ caritátis inflammémur. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_2]: `{r}Salutátio secúnda{/r}
Intercedénte sancto Michaéle et cælésti choro Chérubim, det nobis Dóminus grátiam, ut viam peccáti relinquámus et sémitam christiánæ perfectiónis sequámur. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_3]: `{r}Salutátio tértia{/r}
Intercedénte sancto Michaéle et sacro choro Thronórum, infúndat Dóminus in corda nostra spíritum veræ et sincéræ humilitátis. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_4]: `{r}Salutátio quarta{/r}
Intercedénte sancto Michaéle et cælésti choro Dominatiónum, det nobis Dóminus grátiam, ut sénsibus nostris dominémur et pravas passiónes nostras corrigámus. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_5]: `{r}Salutátio quinta{/r}
Intercedénte sancto Michaéle et cælésti choro Potestátum, dignétur Dóminus ánimas nostras ab insídiis et tentatiónibus diáboli custodíre. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_6]: `{r}Salutátio sexta{/r}
Intercedénte sancto Michaéle et choro admirabílium cæléstium Virtútum, non sinat nos Dóminus in tentatiónem incídere, sed líberet nos a malo. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_7]: `{r}Salutátio séptima{/r}
Intercedénte sancto Michaéle et cælésti choro Principátuum, répleat Dóminus ánimas nostras spíritu veræ et sincéræ obœdiéntiæ. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_8]: `{r}Salutátio octáva{/r}
Intercedénte sancto Michaéle et cælésti choro Archangelórum, det nobis Dóminus donum perseverántiæ in fide et in opéribus bonis, ut ad glóriam paradísi perveníre valeámus. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_9]: `{r}Salutátio nona{/r}
Intercedénte sancto Michaéle et cælésti choro ómnium Angelórum, concédat nobis Dóminus, ut ab ipsis in hac vita custodiámur et post mortem ad ætérnam cæli glóriam perducámur. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_ANTIPHONA]: `{r}Antíphona{/r}
Princeps gloriosíssime, sancte Míchael, caput et dux cæléstis milítiæ, custos animárum, debellátor spirítuum rebéllium, domus Dei præpósite, admirábilis post Christum ductor noster, superhumána excelléntia et virtúte prǽdite: líbera nos ab omni malo, qui ad te cum fidúcia confúgimus, et incomparábili tua protectióne fac, ut in servítio Dei cotídie proficiámus.

℣ Ora pro nobis, beatíssime Míchael, princeps Ecclésiæ Iesu Christi.
℟ Ut digni efficiámur promissiónibus eius.`,

  [PRAYER_TYPES.CORONA_ANG_OREMUS]: `Orémus. Omnípotens sempitérne Deus, qui mirábili bonitáte et misericórdia tua, ad commúnem hóminum salútem, gloriosíssimum Archángelum Michaélem Ecclésiæ tuæ príncipem elegísti: fac nos, quǽsumus, eius salutári protectióne ab ómnibus inimícis nostris liberári, ut in hora mortis nostræ nullus eórum nobis nocére possit, sed ab eódem Archángelo Michaéle in conspéctum excélsæ et divínæ maiestátis tuæ introducámur. Per mérita Iesu Christi, Dómini nostri. Amen.`,

  [PRAYER_TYPES.CORONA_DOL_INITIUM]: `{r}Actus contritiónis{/r}
Dómine mi, qui solus amóre meo dignus es, ecce coram divína tua præséntia consísto, totus confúsus recordatióne tot grávium iniuriárum, quibus te offéndi. Véniam eárum toto corde a te peto, eásque dóleo pure ob amórem tui, et propter summam bonitátem tuam super omne huius vitæ malum detéstor et abhórreo. Et sicut mallem mílies mórtuus esse quam te offendísse, ita nunc firmíssime propóno mílies pótius mori quam te íterum offéndere. Iesu mi crucifíxe, firmum propósitum fácio ánimam meam quam primum pretiosíssimo Sánguine tuo in sacraménto Pæniténtiæ mundándi. Tu vero, Virgo piíssima, Mater misericórdiæ et refúgium peccatórum, per amaríssimos dolóres tuos obtíne mihi peccatórum véniam, quam desídero; dum enim secúndum mentem tot sanctórum Pontíficum oro, ut indulgéntias huic sancto Rosário tuo concéssas lucrer, spero me per eas remissiónem pœnárum peccátis meis debitárum consecutúrum.`,

  [PRAYER_TYPES.CORONA_DOL_1]: `{r}Dolor primus{/r}
Hac fidúcia in corde prímum dolórem méditor, cum María, Virgo Mater Dei mei, Iesum, unigénitum Fílium suum, in templo præsentávit, in ulnas sancti senis Simeónis pósuit, et prophéticum eius verbum audívit: Tuam ipsíus ánimam pertransíbit gládius; quo Fílii sui Iesu pássio et mors prænuntiabátur.`,

  [PRAYER_TYPES.CORONA_DOL_2]: `{r}Dolor secúndus{/r}
Secúndus dolor beátæ Vírginis fuit, cum propter persecutiónem crudélis Heródis, qui dilectíssimum eius Fílium ímpie occídere quærébat, in Ægýptum fúgere coácta est.`,

  [PRAYER_TYPES.CORONA_DOL_3]: `{r}Dolor tértius{/r}
Tértius dolor beátæ Vírginis fuit, cum, postquam in festo Paschæ cum Ioseph sponso suo et Iesu dilécto Fílio suo Ierosólymam ascénderat, in réditu ad páuperem domum suam eum amísit et per tres dies únicum amórem suum flevit.`,

  [PRAYER_TYPES.CORONA_DOL_4]: `{r}Dolor quartus{/r}
Quartus dolor beátæ Vírginis fuit, cum dilécto Fílio suo Iesu óbviam facta est, gravem crucem, in qua pro salúte nostra crucifigéndus erat, téneris suis húmeris ad montem Calváriæ portánti.`,

  [PRAYER_TYPES.CORONA_DOL_5]: `{r}Dolor quintus{/r}
Quintus dolor beátæ Vírginis fuit, cum Fílium suum Iesum in duro ligno crucis elevátum et sánguinem ex ómnibus sacri córporis eius pártibus fluéntem vidit, eúmque post trium horárum agóniam exspirántem aspéxit.`,

  [PRAYER_TYPES.CORONA_DOL_6]: `{r}Dolor sextus{/r}
Sextus dolor beátæ Vírginis fuit, cum sacrum latus Iesu, dilécti Fílii sui, láncea aperíri, clavos evélli, et sanctum eius corpus in puríssimo suo gremio repóni vidit.`,

  [PRAYER_TYPES.CORONA_DOL_7]: `{r}Dolor séptimus{/r}
Séptimus et últimus dolor beátæ Vírginis, Regínæ et Advocátæ nostræ, servórum suórum miserórum peccatórum, fuit, cum sanctum corpus Fílii sui in sepúlcro cóndi vidit.`,

  [PRAYER_TYPES.CORONA_DOL_LACRIMAE]: `{r}Ter Ave María in honórem lacrimárum, quas María in dolóribus suis effúdit, ut verum peccatórum dolórem et sanctas indulgéntias huic pio exercítio adnéxas consequámur.{/r}`,

  [PRAYER_TYPES.CORONA_DOL_OREMUS]: `℣ Ora pro nobis, Virgo dolorosíssima.
℟ Ut digni efficiámur promissiónibus Christi.

Orémus. Intervéniat pro nobis, quǽsumus, Dómine Iesu Christe, nunc et in hora mortis nostræ, apud tuam cleméntiam beáta Virgo María, Mater tua, cuius sacratíssimam ánimam in hora tuæ passiónis dolóris gládius pertransívit. Per te, Iesu Christe, Salvátor mundi, qui cum Patre et Spíritu Sancto vivis et regnas in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_INITIUM]: `℣ Deus, in adiutórium meum inténde.
℟ Dómine, ad adiuvándum me festína.
℣ Glória Patri, et Fílio, et Spirítui Sancto.
℟ Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_1]: `{r}Mystérium primum{/r}
Prima vice amantíssimus Salvátor noster pretiósum Sánguinem suum pro nobis effúdit octávo die post nativitátem suam, cum circumcísus est, ut legem Móysi impléret. Dum ígitur considerámus Iesum hoc fecísse, ut divínæ iustítiæ pro lascívia nostra satisfáceret, dolórem de ea in nobis excitémus, et promittámus nos, omnipoténtis eius grátiæ auxílio, deínceps córpore et ánima vere castos futúros esse.`,

  [PRAYER_TYPES.CORONA_SANG_2]: `{r}Mystérium secúndum{/r}
Deínde in horto Olivárum tanta cópia Iesus Sánguinem suum pro nobis effúdit, ut terram circa se perfúnderet; idque fecit, cum ingratitúdinem prævidéret, qua hómines amóri eius responsúri erant. Ex ánimo ígitur doleámus, quod innúmeris Dei benefíciis tam male hucúsque respóndimus, et propónamus grátiis et inspiratiónibus eius bene uti.`,

  [PRAYER_TYPES.CORONA_SANG_3]: `{r}Mystérium tértium{/r}
Deínde in crudéli flagellatióne Iesus Sánguinem fudit, cum caro eius ita lacerarétur, ut ex omni córporis parte rivi Sánguinis flúerent; quem totum Patri ætérno óbtulit in satisfactiónem pro impatiéntia et mollítie nostra. Quómodo ígitur iram nostram et amórem nostri non coërcémus? Deínceps adversitátes patiénter ferre, nosmetípsos contémnere et iniúrias nobis illátas plácide sustinére studeámus.`,

  [PRAYER_TYPES.CORONA_SANG_4]: `{r}Mystérium quartum{/r}
Deínde ex sacro cápite Iesu, cum spinis coronarétur, Sanguis prófluxit in pœnam supérbiæ et pravárum cogitatiónum nostrárum. Num ígitur supérbiam álere, turpes imaginatiónes fovére et pravam voluntátem nostram páscere pergémus? Deínceps níhilum, misériam et infirmitátem nostram semper ante óculos habeámus, et ómnibus diáboli tentatiónibus generóso corde resistámus.`,

  [PRAYER_TYPES.CORONA_SANG_5]: `{r}Mystérium quintum{/r}
Quantum pretiósi Sánguinis amantíssimus Dóminus noster e venis suis effúdit, cum gravi cruce onústus dolorosíssimum iter ad Calváriam confíceret! Ipsæ viæ et platéæ Ierúsalem, per quas transíbat, eo irrigátæ sunt. Hoc autem fecit in satisfactiónem pro scándalis et pravis exémplis, quibus creatúræ eius álios in perditiónem induxérunt. Quis scit, quot ex nobis in hoc infelíci número sint? Quis scit, quot ipse solus pravo exémplo suo ad inférnum perdúxerit? Et quid ad hoc malum reparándum fécimus? Deínceps saltem verbo et exémplo ánimas salváre, quantum póssumus, studeámus, ómnibus nos bonitátis et sanctæ vitæ exémplar præbéntes.`,

  [PRAYER_TYPES.CORONA_SANG_6]: `{r}Mystérium sextum{/r}
Plus adhuc pretiósi Sánguinis humáni géneris Redémptor in crudéli crucifixióne sua effúdit, cum venis disrúptis ex mánibus et pédibus eius torréntis instar prorúpit salutáre illud vitæ ætérnæ bálsamum, ut pro ómnibus críminibus et sceléribus mundi pérditi satisfáceret. Quis post hæc in peccáto perseveráre velit, et sic crudélem Fílii Dei crucifixiónem renováre? Fleámus amáre peccáta nostra, eáque ad pedes sacri Dei minístri detestémur; emendémus vias nostras pravas, et deínceps vere christiánam vitam incipiámus, semper in corde memóres, quanti Sánguinis salus nostra Salvatóri hóminum constíterit.`,

  [PRAYER_TYPES.CORONA_SANG_7]: `{r}Mystérium séptimum{/r}
Postrémo, post mortem eius, cum sacrum latus láncea apértum et amantíssimum Cor eius vulnerátum est, Iesus Sánguinem fudit, et cum eo aqua exívit, ut nobis ostenderétur Sánguinem eius pro salúte nostra usque ad últimam guttam effúsum esse. O magna bónitas Redemptóris nostri! Quis te non amábit, Salvátor ánimæ meæ? Quod cor non tabéscet amóre tui, qui tanta pro redemptióne nostra fecísti? Déficit lingua ad te laudándum; ídeo invitémus omnes creatúras in terra, omnes Angelos et Sanctos in paradíso, et præsértim caríssimam Matrem nostram Maríam, ut pretiosíssimum Sánguinem tuum benedícant, laudent et célebrent. Glória Sánguini Iesu, nunc et semper et per ómnia sǽcula. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_TE_ERGO]: `℣ Te ergo, quǽsumus, tuis fámulis súbveni, quos pretióso Sánguine redemísti.`,

  [PRAYER_TYPES.CORONA_SANG_ORATIO]: `{r}Orátio{/r}
O pretiosíssime Sanguis vitæ ætérnæ, prétium et redémptio mundi, potus et lavácrum ánimæ, qui causam hóminum apud thronum misericórdiæ semper tuéris: te profundíssime adóro, et vellem, si possem, tibi áliquam compensatiónem præstáre pro contuméliis et iniúriis, quas ab homínibus contínuo páteris, ac præsértim ab iis, qui te témere blasphemáre audent. Quis non benedícet huic Sánguini infiníti prétii? Quis non amóre Iesu inflammábitur, qui illum totum pro nobis effúdit? Quid essem sine hoc Sánguine, qui me redémit? Et quid te, pretióse Sanguis, e venis Dómini mei usque ad últimam guttam extráxit? Amor útique. O imménse amor, qui hoc salutáre bálsamum nobis donásti! O bálsamum inæstimábile, ex fonte imménsi amóris prófluens! Da ómnibus córdibus, ómnibus linguis, ut te laudáre, celebráre et tibi grátias ágere possint, nunc et semper et in omnem æternitátem. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_OREMUS]: `℣ Redemísti nos, Dómine, in Sánguine tuo.
℟ Et fecísti nos Deo nostro regnum.

Orémus. Omnípotens sempitérne Deus, qui unigénitum Fílium tuum mundi Redemptórem constituísti, ac eius Sánguine placári voluísti: concéde, quǽsumus, salútis nostræ prétium ita venerári, atque a præséntis vitæ malis eius virtúte deféndi in terris; ut fructu perpétuo lætémur in cælis. Qui tecum vivit et regnat in unitáte Spíritus Sancti Deus, per ómnia sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.CORONA_COR_INITIUM]: `℣ Deus, in adiutórium meum inténde.
℟ Dómine, ad adiuvándum me festína.`,

  [PRAYER_TYPES.CORONA_COR_1]: `{r}I. Cor benígnum{/r}
Amantíssime Iesu, cum benígnum Cor tuum méditor, amóris et dulcédinis erga peccatóres plenum, cor meum gáudio exsúltat et firma fidúcia, quod me benígne suscípies. Heu, quot et quanta peccáta commísi! Sed nunc ea cum Petro et Magdaléna défleo et detéstor, quia te, summum bonum meum, offendérunt. O da mihi ómnium véniam! Per sacratíssimum Cor tuum te óbsecro: móriar pótius quam te íterum offéndam, et vivam tantum, ut amóri tuo respóndeam.`,

  [PRAYER_TYPES.CORONA_COR_2]: `{r}II. Cor húmile{/r}
Benedíco, Iesu mi, humíllimum Cor tuum, et grátias tibi ago, quod illud mihi exemplar dans non solum me ad imitatiónem eius veheménter hortáris, sed tot humiliatiónibus tuis viam mihi osténdis et sternis, ut te sequar. Stultus et ingrátus, quam longe a te errávi! Misericórdiam, Iesu mi, misericórdiam! Procul supérbia et mundánæ glóriæ amor! Húmili corde te, Iesu mi, per humiliatiónes et crucem sequi volo, ut pacem et salútem invéniam. Tu tantum adésto mihi et róbora me, et sacratíssimum Cor tuum semper benedícam.`,

  [PRAYER_TYPES.CORONA_COR_3]: `{r}III. Cor pátiens{/r}
Admíror, Iesu mi, patientíssimum Cor tuum, et grátias tibi ago pro tot mirabílibus exémplis invíctæ patiéntiæ, quæ mihi reliquísti. Dóleo, quod nímiam mollítiem meam, quæ vel mínimum dolórem refúgit, mihi adhuc exprobráre débeo. Infúnde ígitur in cor meum, dulcis Iesu, ardéntem et constántem amórem passiónum et crucis, mortificatiónis et pæniténtiæ, ut te ad Calváriam sequens tecum ad glóriam et gáudia paradísi pervéniam.`,

  [PRAYER_TYPES.CORONA_COR_4]: `{r}IV. Cor mite{/r}
Ad conspéctum mitíssimi Cordis tui, dulcis Iesu, contrémisco, cum vídeam, quam dissímile sit cor meum tuo, quod ad umbram, ad nutum, ad verbum contradictiónis turbátur et quéritur. Ignósce ígitur excéssibus meis, et da mihi grátiam, ut in omni contradictióne immutábilis mansuetúdinis tuæ exémplum sequar, et sic perpétua sancta pace fruar.`,

  [PRAYER_TYPES.CORONA_COR_5]: `{r}V. Cor generósum{/r}
Laudes sint, Iesu, generosíssimo Cordi tuo, quod mortem et inférnum vicit et omni laude dignum est. Plus quam umquam confúndor, cum cor meum tam pusillánimum aspício, quod ob respéctum humánum vel levem sermónem refórmidat. Sed deínceps non ita erit. Óbsecro te, Iesu mi, da mihi talem fortitúdinem, ut in terra pugnans et vincens, olim tecum in cælo triúmphans gáudeam.`,

  [PRAYER_TYPES.CORONA_COR_IACULATORIA]: `O dulcíssimum Cor Iesu mei, fac, ut te magis magísque amem!`,

  [PRAYER_TYPES.CORONA_COR_MARIA]: `{r}Convertámur ad Maríam, ei nos magis magísque consecrántes, et matérno eius Cordi fidéntes dicámus:{/r}
Per pretiósas dotes dulcíssimi Cordis tui, magna Mater Dei mei et Mater mea María, obtíne mihi veram et constántem devotiónem erga sacratíssimum Cor Iesu, dilectíssimi Fílii tui, ut omni cogitatióne et afféctu illi Cordi coniúnctus ómnia status mei offícia prompto corde ádimpleam, Iesu meo semper magis sérviens, hódie autem præsértim.`,

  [PRAYER_TYPES.CORONA_COR_OREMUS]: `℣ Cor Iesu, flagrans amóre nostri,
℟ Inflámma cor nostrum amóre tui.

Orémus. Illo nos igne, quǽsumus, Dómine, Spíritus Sanctus inflámmet, quem Dóminus noster Iesus Christus e penetrálibus Cordis sui misit in terram, et vóluit veheménter accéndi. Qui tecum vivit et regnat in unitáte eiúsdem Spíritus Sancti Deus, per ómnia sǽcula sæculórum. Amen.`,

  // The sequences, as in Schallerův Římský misál (1931): Easter, Pentecost,
  // Corpus Christi, and the Friday of Passion Week / 15 September.
  [PRAYER_TYPES.VICTIMAE_PASCHALI]: `Víctimæ pascháli laudes ímmolent Christiáni.
Agnus redémit oves: Christus ínnocens Patri reconciliávit peccatóres.
Mors et vita duéllo conflixére mirándo: dux vitæ mórtuus, regnat vivus.
Dic nobis, María, quid vidísti in via?
Sepúlchrum Christi vivéntis: et glóriam vidi resurgéntis.
Angélicos testes, sudárium, et vestes.
Surréxit Christus spes mea: præcédet vos in Galilǽam.
Scimus Christum surrexísse a mórtuis vere: tu nobis, victor Rex, miserére. Amen. Allelúia.`,

  [PRAYER_TYPES.VENI_SANCTE_SPIRITUS]: `Veni, Sancte Spíritus,
et emítte cǽlitus
lucis tuæ rádium.

Veni, pater páuperum,
veni, dator múnerum,
veni, lumen córdium.

Consolátor óptime,
dulcis hospes ánimæ,
dulce refrigérium.

In labóre réquies,
in æstu tempéries,
in fletu solátium.

O lux beatíssima,
reple cordis íntima
tuórum fidélium.

Sine tuo númine,
nihil est in hómine,
nihil est innóxium.

Lava quod est sórdidum,
riga quod est áridum,
sana quod est sáucium.

Flecte quod est rígidum,
fove quod est frígidum,
rege quod est dévium.

Da tuis fidélibus,
in te confidéntibus,
sacrum septenárium.

Da virtútis méritum,
da salútis éxitum,
da perénne gáudium. Amen. Allelúia.`,

  [PRAYER_TYPES.LAUDA_SION]: `Lauda, Sion, Salvatórem,
lauda ducem et pastórem
in hymnis et cánticis.

Quantum potes, tantum aude:
quia maior omni laude,
nec laudáre súfficis.

Laudis thema speciális,
panis vivus et vitális
hódie propónitur.

Quem in sacræ mensa cenæ,
turbæ fratrum duodénæ
datum non ambígitur.

Sit laus plena, sit sonóra,
sit iucúnda, sit decóra
mentis iubilátio.

Dies enim solémnis ágitur,
in qua mensæ prima recólitur
huius institútio.

In hac mensa novi Regis,
novum Pascha novæ legis,
Phase vetus términat.

Vetustátem nóvitas,
umbram fugat véritas,
noctem lux elíminat.

Quod in cena Christus gessit,
faciéndum hoc expréssit
in sui memóriam.

Docti sacris institútis,
panem, vinum in salútis
consecrámus hóstiam.

Dogma datur Christiánis,
quod in carnem transit panis,
et vinum in sánguinem.

Quod non capis, quod non vides,
animósa firmat fides,
præter rerum órdinem.

Sub divérsis speciébus,
signis tantum, et non rebus,
latent res exímiæ.

Caro cibus, sanguis potus:
manet tamen Christus totus
sub utráque spécie.

A suménte non concísus,
non confráctus, non divísus:
ínteger accípitur.

Sumit unus, sumunt mille:
quantum isti, tantum ille:
nec sumptus consúmitur.

Sumunt boni, sumunt mali:
sorte tamen inæquáli,
vitæ vel intéritus.

Mors est malis, vita bonis:
vide paris sumptiónis
quam sit dispar éxitus.

Fracto demum Sacraménto,
ne vacílles, sed meménto,
tantum esse sub fragménto,
quantum toto tégitur.

Nulla rei fit scissúra:
signi tantum fit fractúra:
qua nec status nec statúra
signáti minúitur.

Ecce panis Angelórum,
factus cibus viatórum:
vere panis filiórum,
non mittendus cánibus.

In figúris præsignátur,
cum Isaac immolátur:
agnus Paschæ deputátur:
datur manna pátribus.

Bone pastor, panis vere,
Iesu, nostri miserére:
tu nos pasce, nos tuére:
tu nos bona fac vidére
in terra vivéntium.

Tu, qui cuncta scis et vales:
qui nos pascis hic mortáles:
tuos ibi commensáles,
coherédes et sodáles
fac sanctórum cívium. Amen. Allelúia.`,

  [PRAYER_TYPES.STABAT_MATER]: `Stabat Mater dolorósa
iuxta crucem lacrimósa,
dum pendébat Fílius.

Cuius ánimam geméntem,
contristátam et doléntem
pertransívit gládius.

O quam tristis et afflícta
fuit illa benedícta
Mater Unigéniti!

Quæ mærébat, et dolébat,
pia Mater, dum vidébat
nati pœnas ínclyti.

Quis est homo, qui non fleret,
Matrem Christi si vidéret
in tanto supplício?

Quis non posset contristári,
Christi Matrem contemplári
doléntem cum Fílio?

Pro peccátis suæ gentis
vidit Iesum in torméntis,
et flagéllis súbditum.

Vidit suum dulcem natum
moriéndo desolátum,
dum emísit spíritum.

Eia, Mater, fons amóris,
me sentíre vim dolóris
fac, ut tecum lúgeam.

Fac, ut árdeat cor meum
in amándo Christum Deum,
ut sibi compláceam.

Sancta Mater, istud agas,
crucifíxi fige plagas
cordi meo válide.

Tui nati vulneráti,
tam dignáti pro me pati,
pœnas mecum dívide.

Fac me tecum pie flere,
crucifíxo condolére,
donec ego víxero.

Iuxta crucem tecum stare,
et me tibi sociáre
in planctu desídero.

Virgo vírginum præclára,
mihi iam non sis amára:
fac me tecum plángere.

Fac, ut portem Christi mortem,
passiónis fac consórtem,
et plagas recólere.

Fac me plagis vulnerári,
fac me cruce inebriári,
et cruóre Fílii.

Flammis ne urar succénsus,
per te, Virgo, sim defénsus
in die iudícii.

Christe, cum sit hinc exíre,
da per Matrem me veníre
ad palmam victóriæ.

Quando corpus moriétur,
fac, ut ánimæ donétur
paradísi glória. Amen.`,

  // Te Deum: the Roman Breviary's text (as in Příručka katolických pobožností,
  // 1935, p. 47), with the app's accent pointing.
  [PRAYER_TYPES.TE_DEUM]: `Te Deum laudámus: te Dóminum confitémur.
Te ætérnum Patrem omnis terra venerátur.
Tibi omnes Ángeli, tibi cæli et univérsæ potestátes,
tibi Chérubim et Séraphim incessábili voce proclámant:
Sanctus, Sanctus, Sanctus Dóminus Deus Sábaoth.
Pleni sunt cæli et terra maiestátis glóriæ tuæ.
Te gloriósus Apostolórum chorus,
te Prophetárum laudábilis númerus,
te Mártyrum candidátus laudat exércitus.
Te per orbem terrárum sancta confitétur Ecclésia:
Patrem imménsæ maiestátis;
venerándum tuum verum et únicum Fílium;
Sanctum quoque Paráclitum Spíritum.
Tu Rex glóriæ, Christe.
Tu Patris sempitérnus es Fílius.
Tu ad liberándum susceptúrus hóminem, non horruísti Vírginis úterum.
Tu, devícto mortis acúleo, aperuísti credéntibus regna cælórum.
Tu ad déxteram Dei sedes, in glória Patris.
Iudex créderis esse ventúrus.
Te ergo quǽsumus, tuis fámulis súbveni, quos pretióso sánguine redemísti.
Ætérna fac cum Sanctis tuis in glória numerári.
Salvum fac pópulum tuum, Dómine, et bénedic hereditáti tuæ.
Et rege eos, et extólle illos usque in ætérnum.
Per síngulos dies benedícimus te.
Et laudámus nomen tuum in sǽculum, et in sǽculum sǽculi.
Dignáre, Dómine, die isto sine peccáto nos custodíre.
Miserére nostri, Dómine, miserére nostri.
Fiat misericórdia tua, Dómine, super nos, quemádmodum sperávimus in te.
In te, Dómine, sperávi: non confúndar in ætérnum.`,

  // Adoro te devote, St Thomas Aquinas: the Roman Missal's text (Gratiarum actio post Missam).
  [PRAYER_TYPES.ADORO_TE]: `Adóro te devóte, latens Déitas,
quæ sub his figúris vere látitas:
tibi se cor meum totum súbicit,
quia te contémplans totum déficit.

Visus, tactus, gustus in te fállitur,
sed audítu solo tuto créditur:
credo quidquid dixit Dei Fílius;
nil hoc verbo veritátis vérius.

In cruce latébat sola Déitas,
at hic latet simul et humánitas:
ambo tamen credens atque cónfitens,
peto quod petívit latro pǽnitens.

Plagas, sicut Thomas, non intúeor,
Deum tamen meum te confíteor:
fac me tibi semper magis crédere,
in te spem habére, te dilígere.

O memoriále mortis Dómini,
panis vivus, vitam præstans hómini:
præsta meæ menti de te vívere,
et te illi semper dulce sápere.

Pie pellicáne, Iesu Dómine,
me immúndum munda tuo sánguine:
cuius una stilla salvum fácere
totum mundum quit ab omni scélere.

Iesu, quem velátum nunc aspício,
oro fiat illud quod tam sítio:
ut te reveláta cernens fácie,
visu sim beátus tuæ glóriæ. Amen.`,

  // Ave verum Corpus: the received text, with the "miserére mei" ending.
  [PRAYER_TYPES.AVE_VERUM]: `Ave, verum Corpus, natum de María Vírgine:
vere passum, immolátum in cruce pro hómine;
cuius latus perforátum fluxit aqua et sánguine:
esto nobis prægustátum mortis in exámine.
O dulcis, o pie, o Iesu, fili Maríæ, miserére mei. Amen.`,

  // O salutaris Hostia: the last two stanzas of Verbum supernum (Lauds of Corpus Christi).
  [PRAYER_TYPES.O_SALUTARIS]: `O salutáris Hóstia,
quæ cæli pandis óstium:
bella premunt hostília,
da robur, fer auxílium.

Uni trinóque Dómino
sit sempitérna glória,
qui vitam sine término
nobis donet in pátria. Amen.`,

  // Pange lingua, St Thomas Aquinas (Vespers of Corpus Christi), as in Příručka
  // katolických pobožností (1935), p. 3–4.
  [PRAYER_TYPES.PANGE_LINGUA]: `Pange, lingua, gloriósi
Córporis mystérium,
Sanguinísque pretiósi,
quem in mundi prétium
fructus ventris generósi
Rex effúdit géntium.

Nobis datus, nobis natus
ex intácta Vírgine,
et in mundo conversátus,
sparso verbi sémine,
sui moras incolátus
miro clausit órdine.

In suprémæ nocte cenæ
recúmbens cum frátribus,
observáta lege plene
cibis in legálibus,
cibum turbæ duodénæ
se dat suis mánibus.

Verbum caro, panem verum
verbo carnem éfficit:
fitque sanguis Christi merum,
et si sensus déficit,
ad firmándum cor sincérum
sola fides súfficit.

Tantum ergo Sacraméntum
venerémur cérnui:
et antíquum documéntum
novo cedat rítui:
præstet fides suppleméntum
sénsuum deféctui.

Genitóri, Genitóque
laus et iubilátio,
salus, honor, virtus quoque
sit et benedíctio:
procedénti ab utróque
compar sit laudátio. Amen.`,

  // Tantum ergo: Pange lingua's last two stanzas, with the versicle and collect
  // before Benediction (Příručka katolických pobožností, 1935, p. 5).
  [PRAYER_TYPES.TANTUM_ERGO]: `Tantum ergo Sacraméntum
venerémur cérnui:
et antíquum documéntum
novo cedat rítui:
præstet fides suppleméntum
sénsuum deféctui.

Genitóri, Genitóque
laus et iubilátio,
salus, honor, virtus quoque
sit et benedíctio:
procedénti ab utróque
compar sit laudátio. Amen.

℣ Panem de cælo præstitísti eis.
℟ Omne delectaméntum in se habéntem.
Orémus. Deus, qui nobis sub Sacraménto mirábili passiónis tuæ memóriam reliquísti: tríbue, quǽsumus, ita nos Córporis et Sánguinis tui sacra mystéria venerári, ut redemptiónis tuæ fructum in nobis iúgiter sentiámus. Qui vivis et regnas in sǽcula sæculórum. Amen.`,

  // Source: angelus-domini-anima-christi.pdf.
  [PRAYER_TYPES.ANGELUS]: `℣ Angelus Dómini nuntiávit Maríæ.
℟ Et concépit de Spíritu Sancto.

Ave, María, grátia plena, Dóminus tecum. Benedícta tu in muliéribus, et benedíctus fructus ventris tui, Iesus. Sancta María, Mater Dei, ora pro nobis peccatóribus, nunc, et in hora mortis nostræ. Amen.

℣ Ecce ancílla Dómini.
℟ Fiat mihi secúndum verbum tuum.

Ave, María…

℣ Et Verbum caro factum est.
℟ Et habitávit in nobis.

Ave, María…

℣ Ora pro nobis, sancta Dei Génitrix.
℟ Ut digni efficiámur promissiónibus Christi.

Orémus. Grátiam tuam, quǽsumus, Dómine, méntibus nostris infúnde: ut qui Angelo nuntiánte Christi Fílii tui Incarnatiónem cognóvimus, per Passiónem eius et Crucem ad resurrectiónis glóriam perducámur. Per Christum Dóminum nostrum.
℟ Amen.`,

  // Source: regina-caeli-anima-christi.pdf. The PDF's collect had obvious
  // typos (dignetus / gaudíam / Jesu / ejus / ae spellings); rendered here in
  // the canonical wording and the app's Iesu / æ orthography.
  [PRAYER_TYPES.REGINA_CAELI]: `Regína cæli, lætáre, allelúia,
quia quem meruísti portáre, allelúia,
resurréxit, sicut dixit, allelúia.
Ora pro nobis Deum, allelúia.

℣ Gaude et lætáre Virgo María, allelúia.
℟ Quia surréxit Dóminus vére, allelúia.

Orémus. Deus, qui per resurrectiónem Fílii tui, Dómini nostri Iesu Christi, mundum lætificáre dignátus es: præsta, quǽsumus; ut per eius Genetrícem Vírginem Maríam perpétuæ capiámus gáudia vitæ. Per eúndem Christum Dóminum nostrum.
℟ Amen.`,

  [PRAYER_TYPES.ANIMA_CHRISTI]: `Ánima Christi, sanctífica me.
Corpus Christi, salva me.
Sanguis Christi, inébria me.
Aqua láteris Christi, lava me.
Pássio Christi, confórta me.
O bone Iesu, exáudi me.
Intra tua vúlnera abscónde me.
Ne permíttas me separári a te.
Ab hoste malígno defénde me.
In hora mortis meæ voca me.
Et iube me veníre ad te,
ut cum Sanctis tuis laudem te
in sǽcula sæculórum.
Amen.`,

  // Athanasian Creed. Source: cs.wikipedia.org/wiki/Vyznání_Quicumque. The Latin
  // there is unaccented; rendered here in the app's pointed orthography (accents
  // + æ/œ ligatures) to match the other two creeds — review the pointing.
  [PRAYER_TYPES.ATHANASIAN_CREED]: `Quicúmque vult salvus esse, ante ómnia opus est, ut téneat cathólicam fidem: quam nisi quísque íntegram inviolatámque serváverit, absque dúbio in ætérnum períbit. Fides autem cathólica hæc est: ut unum Deum in Trinitáte, et Trinitátem in unitáte venerémur; neque confundéntes persónas, neque substántiam separántes. Ália est enim persóna Patris, ália Fílii, ália Spíritus Sancti; sed Patris, et Fílii, et Spíritus Sancti una est divínitas, æquális glória, coætérna maiéstas. Qualis Pater, talis Fílius, talis Spíritus Sanctus. Increátus Pater, increátus Fílius, increátus Spíritus Sanctus. Imménsus Pater, imménsus Fílius, imménsus Spíritus Sanctus. Ætérnus Pater, ætérnus Fílius, ætérnus Spíritus Sanctus. Et tamen non tres ætérni, sed unus ætérnus. Sicut non tres increáti, nec tres imménsi, sed unus increátus et unus imménsus. Simíliter omnípotens Pater, omnípotens Fílius, omnípotens Spíritus Sanctus. Et tamen non tres omnipoténtes, sed unus omnípotens. Ita Deus Pater, Deus Fílius, Deus Spíritus Sanctus. Et tamen non tres dii, sed unus est Deus. Ita Dóminus Pater, Dóminus Fílius, Dóminus Spíritus Sanctus. Et tamen non tres Dómini, sed unus est Dóminus. Quia, sicut singillátim unamquámque persónam Deum ac Dóminum confitéri christiána veritáte compéllimur, ita tres Deos aut Dóminos dícere cathólica religióne prohibémur.

Pater a nullo est factus, nec creátus, nec génitus. Fílius a Patre solo est, non factus, nec creátus, sed génitus. Spíritus Sanctus a Patre et Fílio, non factus, nec creátus, nec génitus, sed procédens. Unus ergo Pater, non tres Patres; unus Fílius, non tres Fílii; unus Spíritus Sanctus, non tres Spíritus Sancti. Et in hac Trinitáte nihil prius aut postérius, nihil maius aut minus, sed totæ tres persónæ coætérnæ sibi sunt et coæquáles. Ita ut per ómnia, sicut iam supra dictum est, et únitas in Trinitáte, et Trínitas in unitáte veneránda sit. Qui vult ergo salvus esse, ita de Trinitáte séntiat.

Sed necessárium est ad ætérnam salútem, ut incarnatiónem quoque Dómini nostri Iesu Christi fidéliter credat. Est ergo fides recta, ut credámus et confiteámur, quia Dóminus noster Iesus Christus, Dei Fílius, Deus et homo est. Deus est ex substántia Patris ante sǽcula génitus, et homo est ex substántia matris in sǽculo natus. Perféctus Deus, perféctus homo, ex ánima rationáli et humána carne subsístens. Æquális Patri secúndum divinitátem, minor Patre secúndum humanitátem. Qui licet Deus sit et homo, non duo tamen, sed unus est Christus. Unus autem non conversióne divinitátis in carnem, sed assumptióne humanitátis in Deum. Unus omníno, non confusióne substántiæ, sed unitáte persónæ. Nam sicut ánima rationális et caro unus est homo, ita Deus et homo unus est Christus. Qui passus est pro salúte nostra, descéndit ad ínferos, tértia die resurréxit a mórtuis. Ascéndit ad cælos, sedet ad déxteram Dei Patris omnipoténtis, inde ventúrus est iudicáre vivos et mórtuos. Ad cuius advéntum omnes hómines resúrgere habent cum corpóribus suis, et redditúri sunt de factis própriis ratiónem. Et qui bona egérunt, ibunt in vitam ætérnam; qui vero mala, in ignem ætérnum. Hæc est fides cathólica, quam nisi quísque fidéliter firmitérque credíderit, salvus esse non póterit. Amen.`,

  // Marian antiphon for Advent → Candlemas. Antiphon Czech from cs.wikipedia;
  // accented Latin matches en.wikipedia's pointed text. Versicles + collects are
  // canonical liturgical Latin (seasonal — both given, with red {r}…{/r} rubrics).
  [PRAYER_TYPES.ALMA_REDEMPTORIS]: `Alma Redemptóris Mater, quæ pérvia cæli porta manes, et stella maris, succúrre cadénti, súrgere qui curat pópulo: tu quæ genuísti, natúra miránte, tuum sanctum Genitórem, Virgo prius ac postérius, Gabriélis ab ore sumens illud Ave, peccatórum miserére.

{r}Témpore Advéntus:{/r}
℣ Ángelus Dómini nuntiávit Maríæ.
℟ Et concépit de Spíritu Sancto.
Orémus. Grátiam tuam, quǽsumus, Dómine, méntibus nostris infúnde: ut qui, Ángelo nuntiánte, Christi Fílii tui incarnatiónem cognóvimus, per passiónem eius et crucem ad resurrectiónis glóriam perducámur. Per eúndem Christum Dóminum nostrum. Amen.

{r}A Nativitáte Dómini usque ad Purificatiónem:{/r}
℣ Post partum, Virgo, invioláta permansísti.
℟ Dei Génitrix, intercéde pro nobis.
Orémus. Deus, qui salútis ætérnæ, beátæ Maríæ virginitáte fecúnda, humáno géneri prǽmia præstitísti: tríbue, quǽsumus, ut ipsam pro nobis intercédere sentiámus, per quam merúimus auctórem vitæ suscípere, Dóminum nostrum Iesum Christum Fílium tuum. Amen.`,

  // Marian antiphon for Candlemas → Holy Week. Source: cs.wikipedia.org/wiki/Ave_Regina_caelorum
  // (unaccented there; the pointing here is rule-derived like the Quicumque, no pointed source online).
  [PRAYER_TYPES.AVE_REGINA_CAELORUM]: `{r}A Purificatióne usque ad Hebdómadam Sanctam:{/r}
Ave, Regína cælórum,
Ave, Dómina Angelórum:
Salve, radix, salve, porta
Ex qua mundo lux est orta:

Gaude, Virgo gloriósa,
Super omnes speciósa,
Vale, o valde decóra,
Et pro nobis Christum exóra.

℣ Dignáre me laudáre te, Virgo sacráta.
℟ Da mihi virtútem contra hostes tuos.
Orémus. Concéde, miséricors Deus, fragilitáti nostræ præsídium: ut, qui sanctæ Dei Genitrícis memóriam ágimus, intercessiónis eius auxílio, a nostris iniquitátibus resurgámus. Per eúndem Christum Dóminum nostrum. Amen.`,

  // Litany of Loreto. Latin invocations sourced from en.wikipedia.org/wiki/Litany_of_Loreto
  // (current 2020 set), pointed by rule (verified). Concluding collects are canonical
  // liturgical Latin (the Paschal one from the Regína Cæli source). Seasonal endings
  // carry red rubrics.
  [PRAYER_TYPES.LITANY_LORETO]: `Kyrie, eléison. 2×
Christe, eléison. 2×
Kyrie, eléison. 2×
Christe, audi nos.
Christe, exáudi nos.
Pater de cælis, Deus, miserére nobis.
Fili, Redémptor mundi, Deus, miserére nobis.
Spíritus Sancte, Deus, miserére nobis.
Sancta Trínitas, unus Deus, miserére nobis.

Sancta María, ora pro nobis.
Sancta Dei Génitrix, ora pro nobis.
Sancta Virgo vírginum, ora pro nobis.
Mater Christi, ora pro nobis.
Mater Ecclésiæ, ora pro nobis.
Mater misericórdiæ, ora pro nobis.
Mater divínæ grátiæ, ora pro nobis.
Mater spei, ora pro nobis.
Mater puríssima, ora pro nobis.
Mater castíssima, ora pro nobis.
Mater invioláta, ora pro nobis.
Mater intemeráta, ora pro nobis.
Mater amábilis, ora pro nobis.
Mater admirábilis, ora pro nobis.
Mater boni consílii, ora pro nobis.
Mater Creatóris, ora pro nobis.
Mater Salvatóris, ora pro nobis.
Virgo prudentíssima, ora pro nobis.
Virgo veneránda, ora pro nobis.
Virgo prædicánda, ora pro nobis.
Virgo potens, ora pro nobis.
Virgo clemens, ora pro nobis.
Virgo fidélis, ora pro nobis.
Spéculum iustítiæ, ora pro nobis.
Sedes sapiéntiæ, ora pro nobis.
Causa nostræ lætítiæ, ora pro nobis.
Vas spirituále, ora pro nobis.
Vas honorábile, ora pro nobis.
Vas insígne devotiónis, ora pro nobis.
Rosa mýstica, ora pro nobis.
Turris Davídica, ora pro nobis.
Turris ebúrnea, ora pro nobis.
Domus áurea, ora pro nobis.
Fœderis arca, ora pro nobis.
Iánua cæli, ora pro nobis.
Stella matutína, ora pro nobis.
Salus infirmórum, ora pro nobis.
Refúgium peccatórum, ora pro nobis.
Solácium migrántium, ora pro nobis.
Consolátrix afflictórum, ora pro nobis.
Auxílium christianórum, ora pro nobis.
Regína angelórum, ora pro nobis.
Regína patriarchárum, ora pro nobis.
Regína prophetárum, ora pro nobis.
Regína apostolórum, ora pro nobis.
Regína mártyrum, ora pro nobis.
Regína confessórum, ora pro nobis.
Regína vírginum, ora pro nobis.
Regína sanctórum ómnium, ora pro nobis.
Regína sine labe origináli concépta, ora pro nobis.
Regína in cælum assúmpta, ora pro nobis.
Regína sacratíssimi Rosárii, ora pro nobis.
Regína famíliæ, ora pro nobis.
Regína pacis, ora pro nobis.

Agnus Dei, qui tollis peccáta mundi, parce nobis, Dómine.
Agnus Dei, qui tollis peccáta mundi, exáudi nos, Dómine.
Agnus Dei, qui tollis peccáta mundi, miserére nobis.

℣ Ora pro nobis, sancta Dei Génitrix.
℟ Ut digni efficiámur promissiónibus Christi.
Orémus. Concéde nos fámulos tuos, quǽsumus, Dómine Deus, perpétua mentis et córporis sanitáte gaudére: et gloriósa beátæ Maríæ semper Vírginis intercessióne, a præsénti liberári tristítia, et ætérna pérfrui lætítia. Per Christum Dóminum nostrum. Amen.

{r}Tempore Advéntus:{/r}
℣ Angelus Dómini nuntiávit Maríæ.
℟ Et concépit de Spíritu Sancto.
Orémus. Deus, qui de beátæ Maríæ Vírginis útero Verbum tuum, Angelo nuntiánte, carnem suscípere voluísti: præsta supplícibus tuis; ut, qui vere eam Genitrícem Dei crédimus, eius apud te intercessiónibus adiuvémur. Per Christum Dóminum nostrum. Amen.

{r}Tempore Nativitátis:{/r}
℣ Post partum, Virgo, invioláta permansísti.
℟ Dei Génitrix, intercéde pro nobis.
Orémus. Deus, qui salútis ætérnæ, beátæ Maríæ virginitáte fecúnda, humáno géneri prǽmia præstitísti: tríbue, quǽsumus, ut ipsam pro nobis intercédere sentiámus, per quam merúimus auctórem vitæ suscípere, Dóminum nostrum Iesum Christum Fílium tuum. Amen.

{r}Tempore Pascháli:{/r}
℣ Gaude et lætáre, Virgo María, allelúia.
℟ Quia surréxit Dóminus vere, allelúia.
Orémus. Deus, qui per resurrectiónem Fílii tui, Dómini nostri Iesu Christi, mundum lætificáre dignátus es: præsta, quǽsumus, ut per eius Genetrícem Vírginem Maríam perpétuæ capiámus gáudia vitæ. Per eúndem Christum Dóminum nostrum. Amen.`,

  // Litany of the Most Sacred Heart of Jesus (approved by Leo XIII, 1899).
  // Latin is the canonical, fixed text (cross-checked against EWTN / Sancta Missa
  // via search, since fetch tools blocked verbatim reproduction); rule-pointed.
  [PRAYER_TYPES.LITANY_SACRED_HEART]: `Kyrie, eléison. 2×
Christe, eléison. 2×
Kyrie, eléison. 2×
Christe, audi nos.
Christe, exáudi nos.
Pater de cælis, Deus, miserére nobis.
Fili, Redémptor mundi, Deus, miserére nobis.
Spíritus Sancte, Deus, miserére nobis.
Sancta Trínitas, unus Deus, miserére nobis.

Cor Iesu, Fílii Patris ætérni, miserére nobis.
Cor Iesu, in sinu Vírginis Matris a Spíritu Sancto formátum, miserére nobis.
Cor Iesu, Verbo Dei substantiáliter unítum, miserére nobis.
Cor Iesu, maiestátis infinítæ, miserére nobis.
Cor Iesu, templum Dei sanctum, miserére nobis.
Cor Iesu, tabernáculum Altíssimi, miserére nobis.
Cor Iesu, domus Dei et porta cæli, miserére nobis.
Cor Iesu, fornax ardens caritátis, miserére nobis.
Cor Iesu, iustítiæ et amóris receptáculum, miserére nobis.
Cor Iesu, bonitáte et amóre plenum, miserére nobis.
Cor Iesu, virtútum ómnium abýssus, miserére nobis.
Cor Iesu, omni laude digníssimum, miserére nobis.
Cor Iesu, rex et centrum ómnium córdium, miserére nobis.
Cor Iesu, in quo sunt omnes thesáuri sapiéntiæ et sciéntiæ, miserére nobis.
Cor Iesu, in quo hábitat omnis plenitúdo divinitátis, miserére nobis.
Cor Iesu, in quo Pater sibi bene complácuit, miserére nobis.
Cor Iesu, de cuius plenitúdine omnes nos accépimus, miserére nobis.
Cor Iesu, desidérium cóllium æternórum, miserére nobis.
Cor Iesu, pátiens et multæ misericórdiæ, miserére nobis.
Cor Iesu, dives in omnes qui ínvocant te, miserére nobis.
Cor Iesu, fons vitæ et sanctitátis, miserére nobis.
Cor Iesu, propitiátio pro peccátis nostris, miserére nobis.
Cor Iesu, saturátum oppróbriis, miserére nobis.
Cor Iesu, attrítum propter scélera nostra, miserére nobis.
Cor Iesu, usque ad mortem obédiens factum, miserére nobis.
Cor Iesu, láncea perforátum, miserére nobis.
Cor Iesu, fons totíus consolatiónis, miserére nobis.
Cor Iesu, vita et resurréctio nostra, miserére nobis.
Cor Iesu, pax et reconciliátio nostra, miserére nobis.
Cor Iesu, víctima peccatórum, miserére nobis.
Cor Iesu, salus in te sperántium, miserére nobis.
Cor Iesu, spes in te moriéntium, miserére nobis.
Cor Iesu, delíciæ Sanctórum ómnium, miserére nobis.

Agnus Dei, qui tollis peccáta mundi, parce nobis, Dómine.
Agnus Dei, qui tollis peccáta mundi, exáudi nos, Dómine.
Agnus Dei, qui tollis peccáta mundi, miserére nobis.

℣ Iesu, mitis et húmilis Corde.
℟ Fac cor nostrum secúndum Cor tuum.
Orémus. Omnípotens sempitérne Deus, réspice in Cor dilectíssimi Fílii tui, et in laudes et satisfactiónes, quas in nómine peccatórum tibi persólvit, iísque misericórdiam tuam peténtibus tu véniam concéde placátus, in nómine eiúsdem Fílii tui Iesu Christi, qui tecum vivit et regnat in sǽcula sæculórum. Amen.`,

  // Litany of the Most Holy Name of Jesus. One of the six litanies approved for
  // public recitation; the Latin is the fixed traditional text. Structure and
  // invocation list cross-checked against sanctamissa.pl and
  // commandercrossrosary.com (both fetches summarized rather than reproducing
  // verbatim, as with the Sacred Heart above), so the pointing is ours.
  // Unlike the other two litanies this one has deprecations ("líbera nos, Iesu")
  // and per-mystery petitions, and its acclamation is "Iesu, audi nos" rather
  // than "Christe, audi nos". Agnus Dei responses end in "Iesu" (sanctamissa.pl);
  // some editions read "Dómine" there.
  [PRAYER_TYPES.LITANY_HOLY_NAME]: `Kyrie, eléison. 2×
Christe, eléison. 2×
Kyrie, eléison. 2×
Iesu, audi nos.
Iesu, exáudi nos.
Pater de cælis, Deus, miserére nobis.
Fili, Redémptor mundi, Deus, miserére nobis.
Spíritus Sancte, Deus, miserére nobis.
Sancta Trínitas, unus Deus, miserére nobis.

Iesu, Fili Dei vivi, miserére nobis.
Iesu, splendor Patris, miserére nobis.
Iesu, candor lucis ætérnæ, miserére nobis.
Iesu, rex glóriæ, miserére nobis.
Iesu, sol iustítiæ, miserére nobis.
Iesu, Fili Maríæ Vírginis, miserére nobis.
Iesu, amábilis, miserére nobis.
Iesu, admirábilis, miserére nobis.
Iesu, Deus fortis, miserére nobis.
Iesu, pater futúri sǽculi, miserére nobis.
Iesu, magni consílii ángele, miserére nobis.
Iesu potentíssime, miserére nobis.
Iesu patientíssime, miserére nobis.
Iesu obedientíssime, miserére nobis.
Iesu, mitis et húmilis corde, miserére nobis.
Iesu, amátor castitátis, miserére nobis.
Iesu, amátor noster, miserére nobis.
Iesu, Deus pacis, miserére nobis.
Iesu, auctor vitæ, miserére nobis.
Iesu, exémplar virtútum, miserére nobis.
Iesu, zelátor animárum, miserére nobis.
Iesu, Deus noster, miserére nobis.
Iesu, refúgium nostrum, miserére nobis.
Iesu, pater páuperum, miserére nobis.
Iesu, thesáure fidélium, miserére nobis.
Iesu, bone pastor, miserére nobis.
Iesu, lux vera, miserére nobis.
Iesu, sapiéntia ætérna, miserére nobis.
Iesu, bónitas infiníta, miserére nobis.
Iesu, via et vita nostra, miserére nobis.
Iesu, gáudium Angelórum, miserére nobis.
Iesu, rex Patriarchárum, miserére nobis.
Iesu, magíster Apostolórum, miserére nobis.
Iesu, doctor Evangelistárum, miserére nobis.
Iesu, fortitúdo Mártyrum, miserére nobis.
Iesu, lumen Confessórum, miserére nobis.
Iesu, púritas Vírginum, miserére nobis.
Iesu, coróna Sanctórum ómnium, miserére nobis.

Propítius esto, parce nobis, Iesu.
Propítius esto, exáudi nos, Iesu.

Ab omni malo, líbera nos, Iesu.
Ab omni peccáto, líbera nos, Iesu.
Ab ira tua, líbera nos, Iesu.
Ab insídiis diáboli, líbera nos, Iesu.
A spíritu fornicatiónis, líbera nos, Iesu.
A morte perpétua, líbera nos, Iesu.
A negléctu inspiratiónum tuárum, líbera nos, Iesu.

Per mystérium sanctæ Incarnatiónis tuæ, líbera nos, Iesu.
Per nativitátem tuam, líbera nos, Iesu.
Per infántiam tuam, líbera nos, Iesu.
Per diviníssimam vitam tuam, líbera nos, Iesu.
Per labóres tuos, líbera nos, Iesu.
Per agóniam et passiónem tuam, líbera nos, Iesu.
Per crucem et derelictiónem tuam, líbera nos, Iesu.
Per langúores tuos, líbera nos, Iesu.
Per mortem et sepultúram tuam, líbera nos, Iesu.
Per resurrectiónem tuam, líbera nos, Iesu.
Per ascensiónem tuam, líbera nos, Iesu.
Per sanctíssimæ Eucharístiæ institutiónem tuam, líbera nos, Iesu.
Per gáudia tua, líbera nos, Iesu.
Per glóriam tuam, líbera nos, Iesu.

Agnus Dei, qui tollis peccáta mundi, parce nobis, Iesu.
Agnus Dei, qui tollis peccáta mundi, exáudi nos, Iesu.
Agnus Dei, qui tollis peccáta mundi, miserére nobis, Iesu.

℣ Iesu, audi nos.
℟ Iesu, exáudi nos.
Orémus. Dómine Iesu Christe, qui dixísti: Pétite et accipiétis; quǽrite et inveniétis; pulsáte et aperiétur vobis: quǽsumus, da nobis peténtibus diviníssimi tui amóris afféctum, ut te toto corde, ore et ópere diligámus, et a tua numquam laude cessémus. Sancti Nóminis tui, Dómine, timórem páriter et amórem fac nos habére perpétuum, quia numquam tua gubernatióne destítuis, quos in soliditáte tuæ dilectiónis instítuis. Qui vivis et regnas in sǽcula sæculórum. Amen.`,

  // ---------------------------------------------------------------------------
  // Litany of Humility. UNLIKE THE OTHER THREE LITANIES, THE LATIN IS NOT A
  // SOURCED ORIGINAL — it is our own pointing, assembled from the structure and
  // response forms at catholicmall.net/litanies-la-en/litany-of-humility (8 + 8 + 7,
  // "líbera me, Iesu" / "Iesu, da mihi grátiam ita desiderándi") and the petition
  // wording at prayrosary.info. There is no authoritative Latin to transcribe:
  // the devotion is modern, its author is unknown (the Merry del Val attribution
  // is traditional but unconfirmed; an earlier version was published in 1880 as a
  // translation from the French), and it is a private devotion — not among the
  // litanies approved for public liturgical use, unlike the other three here.
  // The Latin witnesses differ on individual verbs (prayrosary.info reads
  // "ne contémnar" and "ut consolar" where the sense is rebuked / consulted, and
  // responds "líbera me, Dómine"), and some circulating versions carry only 6
  // petitions in the third section. Treat like the BRIGIT_* entries: if a sourced
  // Latin edition is ever obtained, replace this verbatim.
  // ---------------------------------------------------------------------------
  [PRAYER_TYPES.LITANY_HUMILITY]: `O Iesu, mitis et húmilis corde, exáudi me.

A desidério, ut æstimer, líbera me, Iesu.
A desidério, ut amer, líbera me, Iesu.
A desidério, ut extóllar, líbera me, Iesu.
A desidério, ut honórer, líbera me, Iesu.
A desidério, ut lauder, líbera me, Iesu.
A desidério, ut áliis præférar, líbera me, Iesu.
A desidério, ut cónsular, líbera me, Iesu.
A desidério, ut appróber, líbera me, Iesu.

A timóre, ne humílier, líbera me, Iesu.
A timóre, ne spernar, líbera me, Iesu.
A timóre, ne reprehéndar, líbera me, Iesu.
A timóre, ne calúmniam feram, líbera me, Iesu.
A timóre, ne oblivióni tradar, líbera me, Iesu.
A timóre, ne irrídear, líbera me, Iesu.
A timóre, ne iniúriam accípiam, líbera me, Iesu.
A timóre, ne suspícier, líbera me, Iesu.

Ut álii magis amentur quam ego, Iesu, da mihi grátiam ita desiderándi.
Ut álii magis æstiméntur quam ego, Iesu, da mihi grátiam ita desiderándi.
Ut álii in mundi existimatióne crescant, ego autem minuar, Iesu, da mihi grátiam ita desiderándi.
Ut álii eligántur, ego autem omíttar, Iesu, da mihi grátiam ita desiderándi.
Ut álii laudéntur, ego autem negligar, Iesu, da mihi grátiam ita desiderándi.
Ut álii mihi in ómnibus rebus præferántur, Iesu, da mihi grátiam ita desiderándi.
Ut álii sanctióres me sint, dúmmodo ego tam sanctus fiam quam tu vis, Iesu, da mihi grátiam ita desiderándi.

Illum opórtet créscere, me autem mínui. Amen.`,

  // Litany of St. Joseph (approved 1909 by Pius X), with the seven invocations
  // added by Francis on 1 May 2021 — Custos Redemptóris, Serve Christi, Miníster
  // salútis, Fúlcimen in difficultátibus, and Patróne éxsulum / afflictórum /
  // páuperum. Their positions (interleaved, not appended) follow the Latin list at
  // wdtprs.com; the traditional invocations are the received Roman Ritual text.
  // Note the Vatican announcement counts 31 invocations while this list has 32
  // from Sancte Ioseph onward — the count evidently excludes the opening address.
  [PRAYER_TYPES.LITANY_ST_JOSEPH]: `Kyrie, eléison. 2×
Christe, eléison. 2×
Kyrie, eléison. 2×
Christe, audi nos.
Christe, exáudi nos.
Pater de cælis, Deus, miserére nobis.
Fili, Redémptor mundi, Deus, miserére nobis.
Spíritus Sancte, Deus, miserére nobis.
Sancta Trínitas, unus Deus, miserére nobis.

Sancta María, ora pro nobis.
Sancte Ioseph, ora pro nobis.
Proles David ínclita, ora pro nobis.
Lumen Patriarchárum, ora pro nobis.
Dei Genitrícis sponse, ora pro nobis.
Custos Redemptóris, ora pro nobis.
Custos pudíce Vírginis, ora pro nobis.
Fílii Dei nutrície, ora pro nobis.
Christi defénsor sédule, ora pro nobis.
Serve Christi, ora pro nobis.
Miníster salútis, ora pro nobis.
Almæ Famíliæ præses, ora pro nobis.
Ioseph iustíssime, ora pro nobis.
Ioseph castíssime, ora pro nobis.
Ioseph prudentíssime, ora pro nobis.
Ioseph fortíssime, ora pro nobis.
Ioseph obedientíssime, ora pro nobis.
Ioseph fidelíssime, ora pro nobis.
Spéculum patiéntiæ, ora pro nobis.
Amátor paupertátis, ora pro nobis.
Exémplar opíficum, ora pro nobis.
Domésticæ vitæ decus, ora pro nobis.
Custos vírginum, ora pro nobis.
Familiárum cólumen, ora pro nobis.
Fúlcimen in difficultátibus, ora pro nobis.
Solátium miserórum, ora pro nobis.
Spes ægrotántium, ora pro nobis.
Patróne éxsulum, ora pro nobis.
Patróne afflictórum, ora pro nobis.
Patróne páuperum, ora pro nobis.
Patróne moriéntium, ora pro nobis.
Terror dæmónum, ora pro nobis.
Protéctor sanctæ Ecclésiæ, ora pro nobis.

Agnus Dei, qui tollis peccáta mundi, parce nobis, Dómine.
Agnus Dei, qui tollis peccáta mundi, exáudi nos, Dómine.
Agnus Dei, qui tollis peccáta mundi, miserére nobis.

℣ Constítuit eum dóminum domus suæ.
℟ Et príncipem omnis possessiónis suæ.
Orémus. Deus, qui ineffábili providéntia beátum Ioseph sanctíssimæ Genitrícis tuæ sponsum elígere dignátus es: præsta, quǽsumus, ut quem protectórem venerámur in terris, intercessórem habére mereámur in cælis. Per Christum Dóminum nostrum. Amen.`,

  // Litany of the Most Precious Blood — drawn up by the Sacred Congregation of
  // Rites and promulgated by John XXIII, 24 February 1960. The last of the six
  // litanies approved for public recitation. Latin (24 invocations, response
  // "salva nos") transcribed from sanctamissa.pl.
  [PRAYER_TYPES.LITANY_PRECIOUS_BLOOD]: `Kyrie, eléison. 2×
Christe, eléison. 2×
Kyrie, eléison. 2×
Christe, audi nos.
Christe, exáudi nos.
Pater de cælis, Deus, miserére nobis.
Fili, Redémptor mundi, Deus, miserére nobis.
Spíritus Sancte, Deus, miserére nobis.
Sancta Trínitas, unus Deus, miserére nobis.

Sanguis Christi, Unigéniti Patris ætérni, salva nos.
Sanguis Christi, Verbi Dei incarnáti, salva nos.
Sanguis Christi, novi et ætérni Testaménti, salva nos.
Sanguis Christi, in agónia decúrrens in terram, salva nos.
Sanguis Christi, in flagellatióne prófluens, salva nos.
Sanguis Christi, in coronatióne spinárum emánans, salva nos.
Sanguis Christi, in cruce effúsus, salva nos.
Sanguis Christi, prétium nostræ salútis, salva nos.
Sanguis Christi, sine quo non fit remíssio, salva nos.
Sanguis Christi, in Eucharístia potus et lavácrum animárum, salva nos.
Sanguis Christi, flumen misericórdiæ, salva nos.
Sanguis Christi, victor dæmonum, salva nos.
Sanguis Christi, fortitúdo mártyrum, salva nos.
Sanguis Christi, virtus confessórum, salva nos.
Sanguis Christi, gérminans vírgines, salva nos.
Sanguis Christi, robur periclitántium, salva nos.
Sanguis Christi, levámen laborántium, salva nos.
Sanguis Christi, in fletu solácium, salva nos.
Sanguis Christi, spes pæniténtium, salva nos.
Sanguis Christi, solámen moriéntium, salva nos.
Sanguis Christi, pax et dulcédo córdium, salva nos.
Sanguis Christi, pignus vitæ ætérnæ, salva nos.
Sanguis Christi, ánimas líberans de lacu purgatórii, salva nos.
Sanguis Christi, omni glória et honóre digníssimus, salva nos.

Agnus Dei, qui tollis peccáta mundi, parce nobis, Dómine.
Agnus Dei, qui tollis peccáta mundi, exáudi nos, Dómine.
Agnus Dei, qui tollis peccáta mundi, miserére nobis.

℣ Redemísti nos, Dómine, in sánguine tuo.
℟ Et fecísti nos Deo nostro regnum.
Orémus. Omnípotens sempitérne Deus, qui unigénitum Fílium tuum mundi Redemptórem constituísti, ac eius sánguine placári voluísti: concéde, quǽsumus, salútis nostræ prétium ita venerári, atque a præséntis vitæ malis eius virtúte deféndi in terris, ut fructu perpétuo lætémur in cælis. Per eúndem Christum Dóminum nostrum. Amen.`,

  // ---------------------------------------------------------------------------
  // Litany of the Saints — the traditional form, Latin transcribed verbatim from
  // preces-latinae.org/thesaurus/Sancti/LitSanctorum.html, whose text comes from
  // *Varia Pietatis Exercitia* (1754) with later saints folded in to match the
  // current calendar. Complete: 102 invocations of the saints in eight groups,
  // 23 deprecations, 18 intercessions, and the whole conclusion — Pater noster,
  // Psalm 69, the versicles, and all eleven collects.
  //
  // Split across fifteen steps, following the source's own five divisions
  // (Supplicatio ad Deum / Invocatio Sanctorum / Invocatio ad Christum /
  // Supplicatio pro variis necessitatibus / Conclusio), with the saints broken
  // into their labelled groups and the long conclusion into three parts so no
  // one card runs unreadably long.
  //
  // Two corrections to the source's Latin, both evident typos: "Sancte Lodovice"
  // → "Ludovíce", and "Ut domum Apostolicum" → "domnum Apostólicum" (the Lord
  // Pope, not the house). Accents are ours — the source prints unaccented Latin.
  // Bracketed optional saints are all included, and the source's parenthesised
  // surnames are inlined ("Sancte Thoma Becket", not "Sancte Thoma (Becket)").
  //
  // THIS REPLACED the shorter modern form (Kancionál 068A) that stood here
  // earlier; if the Kancionál version is ever wanted back, it is in git history.
  // ---------------------------------------------------------------------------

  [PRAYER_TYPES.LITANY_SAINTS_SUPPLICATIO]: `Kyrie, eléison. 2×
Christe, eléison. 2×
Kyrie, eléison. 2×
Christe, audi nos.
Christe, exáudi nos.
Pater de cælis Deus, miserére nobis.
Fili Redémptor mundi Deus, miserére nobis.
Spíritus Sancte Deus, miserére nobis.
Sancta Trínitas, unus Deus, miserére nobis.`,

  [PRAYER_TYPES.LITANY_SAINTS_MARY]: `Sancta María, ora pro nobis.
Sancta Dei Génetrix, ora pro nobis.
Sancta Virgo vírginum, ora pro nobis.
Sancte Míchael, ora pro nobis.
Sancte Gábriel, ora pro nobis.
Sancte Ráphael, ora pro nobis.
Omnes sancti Angeli et Archángeli, oráte pro nobis.
Omnes sancti beatórum Spirítuum órdines, oráte pro nobis.`,

  [PRAYER_TYPES.LITANY_SAINTS_PATRIARCHS]: `Sancte Abraham, ora pro nobis.
Sancte Móyses, ora pro nobis.
Sancte Elía, ora pro nobis.
Sancte Ioánnes Baptísta, ora pro nobis.
Sancte Ioseph, ora pro nobis.
Omnes sancti Patriárchæ et Prophétæ, oráte pro nobis.`,

  [PRAYER_TYPES.LITANY_SAINTS_APOSTLES]: `Sancte Petre, ora pro nobis.
Sancte Paule, ora pro nobis.
Sancte Andréa, ora pro nobis.
Sancte Iacóbe maior, ora pro nobis.
Sancte Ioánnes, ora pro nobis.
Sancte Thoma, ora pro nobis.
Sancte Iacóbe minor, ora pro nobis.
Sancte Philíppe, ora pro nobis.
Sancte Bartolomǽe, ora pro nobis.
Sancte Matthǽe, ora pro nobis.
Sancte Simon, ora pro nobis.
Sancte Thaddǽe, ora pro nobis.
Sancte Matthía, ora pro nobis.
Sancte Bárnaba, ora pro nobis.
Sancte Luca, ora pro nobis.
Sancte Marce, ora pro nobis.
Omnes sancti Apóstoli et Evangelístæ, oráte pro nobis.
Omnes sancti discípuli Dómini, oráte pro nobis.`,

  [PRAYER_TYPES.LITANY_SAINTS_MARTYRS]: `Omnes sancti Innocéntes, oráte pro nobis.
Sancte Stéphane, ora pro nobis.
Sancte Ignáti Antiochéne, ora pro nobis.
Sancte Polycárpe, ora pro nobis.
Sancte Iustíne, ora pro nobis.
Sancte Laurénti, ora pro nobis.
Sancte Vincénti, ora pro nobis.
Sancti Fabiáne et Sebastiáne, oráte pro nobis.
Sancti Ioánnes et Paule, oráte pro nobis.
Sancti Cosma et Damiáne, oráte pro nobis.
Sancti Gervási et Protási, oráte pro nobis.
Sancte Cypriáne, ora pro nobis.
Sancte Bonifáti, ora pro nobis.
Sancte Stanislae, ora pro nobis.
Sancte Thoma Becket, ora pro nobis.
Sancti Ioánnes Fisher et Thoma More, oráte pro nobis.
Sancte Paule Miki, ora pro nobis.
Sancti Ioánnes de Brébeuf et Isaac Jogues, oráte pro nobis.
Sancte Petre Chanel, ora pro nobis.
Sancte Cárole Lwanga, ora pro nobis.
Sanctæ Perpétua et Felícitas, oráte pro nobis.
Sancta María Goretti, ora pro nobis.
Omnes sancti mártyres, oráte pro nobis.`,

  [PRAYER_TYPES.LITANY_SAINTS_BISHOPS]: `Sancte Sylvéster, ora pro nobis.
Sancte Leo, ora pro nobis.
Sancte Gregóri, ora pro nobis.
Sancte Ambrósi, ora pro nobis.
Sancte Augustíne, ora pro nobis.
Sancte Hierónyme, ora pro nobis.
Sancte Athanási, ora pro nobis.
Sancti Basíli et Gregóri Nazianzéne, oráte pro nobis.
Sancte Ioánnes Chrysóstome, ora pro nobis.
Sancte Martíne, ora pro nobis.
Sancte Nicoláe, ora pro nobis.
Sancte Patríci, ora pro nobis.
Sancti Cyrílle et Methódi, oráte pro nobis.
Sancte Cárole Borromǽe, ora pro nobis.
Sancte Francísce de Sales, ora pro nobis.
Sancte Pie Décime, ora pro nobis.
Omnes sancti Pontífices et Confessóres, oráte pro nobis.
Omnes sancti Doctóres, oráte pro nobis.`,

  [PRAYER_TYPES.LITANY_SAINTS_RELIGIOUS]: `Sancte Antóni, ora pro nobis.
Sancte Benedícte, ora pro nobis.
Sancte Bernárde, ora pro nobis.
Sancte Domínice, ora pro nobis.
Sancte Francísce, ora pro nobis.
Sancte Thoma de Aquíno, ora pro nobis.
Sancte Ignáti de Loyola, ora pro nobis.
Sancte Francísce Xavier, ora pro nobis.
Sancte Vincénti de Paul, ora pro nobis.
Sancte Ioánnes María Vianney, ora pro nobis.
Sancte Ioánnes Bosco, ora pro nobis.
Omnes sancti Sacerdótes et Levítæ, oráte pro nobis.
Omnes sancti Mónachi et Eremítæ, oráte pro nobis.`,

  [PRAYER_TYPES.LITANY_SAINTS_WOMEN]: `Sancta Anna, ora pro nobis.
Sancta María Magdaléna, ora pro nobis.
Sancta Agatha, ora pro nobis.
Sancta Lúcia, ora pro nobis.
Sancta Agnes, ora pro nobis.
Sancta Cæcília, ora pro nobis.
Sancta Catharína, ora pro nobis.
Sancta Anastásia, ora pro nobis.
Sancta Catharína Senénsis, ora pro nobis.
Sancta Terésia de Avila, ora pro nobis.
Sancta Rosa de Lima, ora pro nobis.
Omnes sanctæ Vírgines et Víduæ, oráte pro nobis.`,

  [PRAYER_TYPES.LITANY_SAINTS_LAITY]: `Sancte Ludovíce, ora pro nobis.
Sancta Mónica, ora pro nobis.
Sancta Elísabeth Hungáriæ, ora pro nobis.
Omnes Sancti et Sanctæ Dei, intercédite pro nobis.`,

  [PRAYER_TYPES.LITANY_SAINTS_CHRIST]: `Propítius esto, parce nobis, Dómine.
Propítius esto, exáudi nos, Dómine.
Ab omni malo, líbera nos, Dómine.
Ab omni peccáto, líbera nos, Dómine.
Ab ira tua, líbera nos, Dómine.
A subitánea et improvísa morte, líbera nos, Dómine.
Ab insídiis diáboli, líbera nos, Dómine.
Ab ira et ódio et omni mala voluntáte, líbera nos, Dómine.
A spíritu fornicatiónis, líbera nos, Dómine.
A fúlgure et tempestáte, líbera nos, Dómine.
A flagéllo terræmótus, líbera nos, Dómine.
A peste, fame et bello, líbera nos, Dómine.
A morte perpétua, líbera nos, Dómine.
Per mystérium sanctæ Incarnatiónis tuæ, líbera nos, Dómine.
Per advéntum tuum, líbera nos, Dómine.
Per nativitátem tuam, líbera nos, Dómine.
Per baptísmum et sanctum ieiúnium tuum, líbera nos, Dómine.
Per crucem et passiónem tuam, líbera nos, Dómine.
Per mortem et sepultúram tuam, líbera nos, Dómine.
Per sanctam resurrectiónem tuam, líbera nos, Dómine.
Per admirábilem ascensiónem tuam, líbera nos, Dómine.
Per advéntum Spíritus Sancti Parácliti, líbera nos, Dómine.
In die iudícii, líbera nos, Dómine.`,

  [PRAYER_TYPES.LITANY_SAINTS_NECESSITIES]: `Peccatóres, te rogámus, audi nos.
Ut nobis parcas, te rogámus, audi nos.
Ut nobis indúlgeas, te rogámus, audi nos.
Ut ad veram pæniténtiam nos perdúcere dignéris, te rogámus, audi nos.
Ut Ecclésiam tuam sanctam régere et conserváre dignéris, te rogámus, audi nos.
Ut domnum Apostólicum et omnes ecclesiásticos órdines in sancta religióne conserváre dignéris, te rogámus, audi nos.
Ut inimícos sanctæ Ecclésiæ humiliáre dignéris, te rogámus, audi nos.
Ut régibus et princípibus christiánis pacem et veram concórdiam donáre dignéris, te rogámus, audi nos.
Ut cuncto pópulo christiáno pacem et unitátem largíri dignéris, te rogámus, audi nos.
Ut omnes errántes ad unitátem Ecclésiæ revocáre, et infidéles univérsos ad Evangélii lumen perdúcere dignéris, te rogámus, audi nos.
Ut nosmetípsos in tuo sancto servítio confortáre et conserváre dignéris, te rogámus, audi nos.
Ut mentes nostras ad cæléstia desidéria érigas, te rogámus, audi nos.
Ut ómnibus benefactóribus nostris sempitérna bona retríbuas, te rogámus, audi nos.
Ut ánimas nostras, fratrum, propinquórum et benefactórum nostrórum ab ætérna damnatióne erípias, te rogámus, audi nos.
Ut fructus terræ dare et conserváre dignéris, te rogámus, audi nos.
Ut ómnibus fidélibus defúnctis réquiem ætérnam donáre dignéris, te rogámus, audi nos.
Ut nos exaudíre dignéris, te rogámus, audi nos.`,

  [PRAYER_TYPES.LITANY_SAINTS_CONCLUSION]: `Fili Dei, te rogámus, audi nos.
Agnus Dei, qui tollis peccáta mundi, parce nobis, Dómine.
Agnus Dei, qui tollis peccáta mundi, exáudi nos, Dómine.
Agnus Dei, qui tollis peccáta mundi, miserére nobis.
Christe, audi nos.
Christe, exáudi nos.
Kyrie, eléison. 2×
Christe, eléison. 2×
Kyrie, eléison. 2×`,

  [PRAYER_TYPES.LITANY_SAINTS_PSALM]: `{r}Pater noster (in siléntio){/r}
℣ Et ne nos indúcas in tentatiónem.
℟ Sed líbera nos a malo.

{r}Psalmus LXIX{/r}
℣ Deus, in adiutórium meum inténde:
℟ Dómine, ad adiuvándum me festína.
℣ Confundántur et revereántur,
℟ qui quærunt ánimam meam.
℣ Avertántur retrórsum et erubéscant,
℟ qui volunt mihi mala.
℣ Avertántur statim erubescéntes,
℟ qui dicunt mihi: Euge, euge.
℣ Exsúltent et lætántur in te,
℟ omnes qui quærunt te.
℣ Et dicant semper: Magnificétur Dóminus,
℟ qui díligunt salutáre tuum.
℣ Ego vero egénus et pauper sum:
℟ Deus, ádiuva me.
℣ Adiútor meus et liberátor meus es tu:
℟ Dómine, ne moréris.
℣ Glória Patri, et Fílio, et Spirítui Sancto.
℟ Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.LITANY_SAINTS_VERSICLES]: `℣ Salvos fac servos tuos.
℟ Deus meus, sperántes in te.
℣ Esto nobis, Dómine, turris fortitúdinis.
℟ A fácie inimíci.
℣ Nihil profíciat inimícus in nobis.
℟ Et fílius iniquitátis non appónat nocére nobis.
℣ Dómine, non secúndum peccáta nostra fácias nobis.
℟ Neque secúndum iniquitátes nostras retríbuas nobis.
℣ Orémus pro Pontífice nostro N.
℟ Dóminus consérvet eum, et vivíficet eum, et beátum fáciat eum in terra, et non tradat eum in ánimam inimicórum eius.
℣ Orémus pro benefactóribus nostris.
℟ Retribúere dignáre, Dómine, ómnibus nobis bona faciéntibus propter nomen tuum, vitam ætérnam. Amen.
℣ Orémus pro fidélibus defúnctis.
℟ Réquiem ætérnam dona eis, Dómine, et lux perpétua lúceat eis.
℣ Requiéscant in pace.
℟ Amen.
℣ Pro frátribus nostris abséntibus.
℟ Salvos fac servos tuos, Deus meus, sperántes in te.
℣ Mitte eis, Dómine, auxílium de sancto.
℟ Et de Sion tuére eos.
℣ Dómine, exáudi oratiónem meam.
℟ Et clamor meus ad te véniat.
℣ Dóminus vobíscum.
℟ Et cum spíritu tuo.`,

  [PRAYER_TYPES.LITANY_SAINTS_COLLECTS]: `Orémus.
Deus, cui próprium est miseréri semper et párcere: súscipe deprecatiónem nostram; ut nos, et omnes fámulos tuos, quos delictórum caténa constríngit, miserátio tuæ pietátis cleménter absólvat.
Exáudi, quǽsumus, Dómine, súpplicum preces, et confiténtium tibi parce peccátis: ut páriter nobis indulgéntiam tríbuas benígnus et pacem.
Ineffábilem nobis, Dómine, misericórdiam tuam cleménter osténde: ut simul nos et a peccátis ómnibus éxuas, et a pœnis quas pro his merémur, erípias.
Deus, qui culpa offénderis, pæniténtia placáris: preces pópuli tui supplicántis propítius réspice; et flagélla tuæ iracúndiæ, quæ pro peccátis nostris merémur, avérte.
Omnípotens sempitérne Deus, miserére fámulo tuo Pontifici nostro N., et dírige eum secúndum tuam cleméntiam in viam salútis ætérnæ: ut, te donánte, tibi plácita cúpiat, et tota virtúte perfíciat.
Deus, a quo sancta desidéria, recta consília, et iusta sunt ópera: da servis tuis illam, quam mundus dare non potest, pacem; ut et corda nostra mandátis tuis dédita, et, hóstium subláta formídine, témpora sint tua protectióne tranquílla.
Ure igne Sancti Spíritus renes nostros et cor nostrum, Dómine: ut tibi casto córpore serviámus, et mundo corde placeámus.
Fidélium, Deus ómnium Cónditor et Redémptor, animábus famulórum famularúmque tuárum remissiónem cunctórum tríbue peccatórum: ut indulgéntiam, quam semper optavérunt, piis supplicatiónibus consequántur.
Actiónes nostras, quǽsumus, Dómine, aspirándo prǽveni et adiuvándo proséquere: ut cuncta orátio et operátio a te semper incípiat et per te cœpta finiátur.
Omnípotens sempitérne Deus, qui vivórum domináris simul et mortuórum, omniúmque miseréris, quos tuos fide et ópere futúros esse prænóscis: te súpplices exorámus; ut pro quibus effúndere preces decrévimus, quosque vel præsens sǽculum adhuc in carne rétinet vel futúrum iam exútos córpore suscépit, intercedéntibus ómnibus Sanctis tuis, pietátis tuæ cleméntia, ómnium delictórum suórum véniam consequántur. Per Dóminum nostrum Iesum Christum. Amen.

℣ Dóminus vobíscum.
℟ Et cum spíritu tuo.
℣ Exáudiat nos omnípotens et miséricors Dóminus.
℟ Amen.
℣ Et fidélium ánimæ per misericórdiam Dei requiéscant in pace.
℟ Amen.`,

  // ─────────────────────────────────────────────────────────────────────────
  // Chaplet of Divine Mercy (Diary of St. Faustina 476, 84, 1319, 950). The
  // Diary is Polish, and no official Latin exists. The core prayers — Pater
  // ætérne, Pro dolorósa, Sanctus Deus — are the Latin in common use, checked
  // against prayinglatin.com, preces-latinae.org and the Latin Wikisource
  // (identical bar capitals and a comma); the title follows the last two. The OPTIONAL prayers
  // (CHAPLET_OPENING, CHAPLET_BLOOD_WATER, CHAPLET_CLOSING) are OUR OWN
  // TRANSLATION: the Latin versions in circulation disagree with each other
  // and are in places ungrammatical. Like the BRIGIT_* entries, replace them
  // verbatim if a trustworthy Latin source is obtained. Iesu, in te confído is
  // the received Latin of the image's inscription.
  // ─────────────────────────────────────────────────────────────────────────
  [PRAYER_TYPES.CHAPLET_OPENING]: `Expirásti, Iesu, sed fons vitæ pro animábus scaturívit, et océanus misericórdiæ toti mundo apértus est. O fons vitæ, inscrutábilis Misericórdia Divína, invólve totum mundum et effúnde te super nos.`,

  [PRAYER_TYPES.CHAPLET_BLOOD_WATER]: `O Sanguis et Aqua, quæ ex Corde Iesu ut fons misericórdiæ pro nobis scaturísti, in te confído.`,

  [PRAYER_TYPES.CHAPLET_ETERNAL_FATHER]: `Pater ætérne, óffero tibi Corpus et Sánguinem, Ánimam et Divinitátem dilectíssimi Fílii tui, Dómini nostri Iesu Christi, in propitiatióne pro peccátis nostris et totíus mundi.`,

  [PRAYER_TYPES.CHAPLET_PASSION]: `Pro dolorósa eius passióne, miserére nobis et totíus mundi.`,

  [PRAYER_TYPES.CHAPLET_TRISAGION]: `Sanctus Deus, Sanctus fortis, Sanctus immortális, miserére nobis et totíus mundi.`,

  [PRAYER_TYPES.CHAPLET_CLOSING]: `Ætérne Deus, in quo misericórdia est infiníta et thesáurus miseratiónis inexháustus, benígne réspice in nos et adáuge in nobis misericórdiam tuam, ut in diffícilibus moméntis non desperémus neque animo deficiámus, sed magna cum fidúcia voluntáti tuæ sanctæ nos subiciámus, quæ est ipse Amor et ipsa Misericórdia.`,

  [PRAYER_TYPES.CHAPLET_TRUST]: `Iesu, in te confído.`,

  // Septem Dolóres et Gáudia Sancti Ioseph — the short Latin form of the
  // Veterum Sapientia Institute (its page is gone; the text survives in the
  // description of its recording, rumble.com/v1om8q6): the seven headings,
  // each with a Glória Patri, and Vírginum custos. We say a Pater Noster and
  // an Ave María before each Glória too, as St. Joseph bade the two
  // shipwrecked Franciscans in the devotion's founding story (also at preces-latinae.org,
  // same words). The long Raccolta prayers, one per sorrow, are Italian in
  // origin with no Latin, so they are not here. Spelled with I for J, as
  // everywhere in this file; "Ægýtum" and "Resurréctione" corrected.
  [PRAYER_TYPES.IOSEPH_1]: ioseph("I. Dúbium de María et Núntium Angeli.", PATER_NOSTER),
  [PRAYER_TYPES.IOSEPH_2]: ioseph("II. Paupértas Nativitátis Christi et Natívitas Ipsa.", PATER_NOSTER),
  [PRAYER_TYPES.IOSEPH_3]: ioseph("III. Circumcísio Christi et Nominátio Iesu.", PATER_NOSTER),
  [PRAYER_TYPES.IOSEPH_4]: ioseph("IV. Prophétia Simeónis de Ruína et Resurrectióne Multórum in Israel.", PATER_NOSTER),
  [PRAYER_TYPES.IOSEPH_5]: ioseph("V. Fuga in Ægýptum et Cládes Idolórum.", PATER_NOSTER),
  [PRAYER_TYPES.IOSEPH_6]: ioseph("VI. Réditus de Ægýpto et Vita cum Iesu et María.", PATER_NOSTER),
  [PRAYER_TYPES.IOSEPH_7]: ioseph("VII. Amíssio Iesu et Invéntio Eiúsdem in Templo.", PATER_NOSTER),

  [PRAYER_TYPES.IOSEPH_VIRGINUM_CUSTOS]: `Vírginum custos et pater, sancte Ioseph, cuius fidéli custódiæ ipsa Innocéntia Christus Iesus et Virgo vírginum María commíssa fuit: te per hoc utrúmque caríssimum pignus Iesum et Maríam óbsecro et obtéstor, ut me, ab omni immundítia præservátum, mente incontamináta, puro corde et casto córpore Iesu et Maríæ semper fácias castíssime famulári. Amen.`,
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

// Translated Ave María, one halves-pair per UI locale — same split as the Latin
// above, so the mystery clause lands in the same place in every language.
const AVE_MARIA_TR: Record<Locale, { before: string; after: string }> = {
  cs: {
    before: `Zdrávas, Maria, milosti plná, Pán s tebou, požehnaná ty mezi ženami a požehnaný plod života tvého, Ježíš`,
    after: `Svatá Maria, Matko Boží, pros za nás hříšné nyní i v hodinu smrti naší. Amen.`,
  },
  en: {
    before: `Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus`,
    after: `Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.`,
  },
};

export function getHailMaryTr(locale: Locale, mystery: string | undefined): HailMary {
  const m = mystery ?? "";
  const { before, after } = AVE_MARIA_TR[locale];
  return {
    before: m ? `${before},` : `${before}.`,
    mystery: m,
    after,
  };
}


