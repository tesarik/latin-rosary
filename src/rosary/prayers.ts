// Latin prayer texts and the three traditional mystery sets.
// Source: `Posvátný růženec latinsko – česky.pdf` (not in repo).
// Diacritics (acute accents, æ, œ) are part of the prayer text — preserve exactly.
//
// The Latin is the prayer; everything keyed by `Locale` beside it (PRAYERS_CS /
// PRAYERS_EN via PRAYER_TRANSLATIONS, the mystery clauses, the display names) is
// the translation the card's LA↔<language> toggle shows. Adding a UI locale in
// i18n.ts therefore means adding a full translation table here.

import type { Locale } from "./i18n";

// One string per supported UI locale. Used for display names and the
// per-decade mystery clauses; the prayer bodies use PRAYER_TRANSLATIONS.
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
const ioseph = (heading: string, pater: string) => `{r}${heading}{/r}\n\n${pater}`;

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

// Czech counterpart of the shared Salve Regína antiphon (see SALVE_REGINA_ANTIPHON).
const SALVE_REGINA_ANTIPHON_CS = `Zdrávas Královno, Matko milosrdenství. Živote, sladkosti a naděje naše, buď zdráva. K Tobě voláme, vyhnaní synové Evy. K Tobě vzdycháme, lkajíce a plačíce v tomto slzavém údolí. A proto, orodovnice naše, obrať k nám své milosrdné oči. A Ježíše, požehnaný plod života svého, nám po tomto putování ukaž. Ó milostivá, ó přívětivá, ó přesladká Panno Maria.

℣ Oroduj za nás, svatá Boží Rodičko.
℟ Abychom byli učiněni hodnými Kristových zaslíbení.`;

// Czech counterparts of the Latin prayer texts. Mirrors `PRAYERS` 1:1 so the
// prayer card can swap languages without any structural changes.
const PATER_NOSTER_CS = `Otče náš, jenž jsi na nebesích, posvěť se jméno tvé. Přijď království tvé. Buď vůle tvá jako v nebi, tak i na zemi. Chléb náš vezdejší dej nám dnes. A odpusť nám naše viny, jako i my odpouštíme našim viníkům. A neuveď nás v pokušení, ale zbav nás od zlého. Amen.`;

export const PRAYERS_CS: Record<StaticPrayerType, string> = {
  [PRAYER_TYPES.SIGN_OF_CROSS]: `Ve jménu ☩ Otce i Syna i Ducha Svatého. Amen.`,

  [PRAYER_TYPES.CREED]: `Věřím v Boha, Otce všemohoucího, Stvořitele nebe i země. I v Ježíše Krista, Syna jeho jediného, Pána našeho; jenž se počal z Ducha Svatého, narodil se z Marie Panny, trpěl pod Pontským Pilátem, ukřižován umřel i pohřben jest; sestoupil do pekel, třetího dne vstal z mrtvých; vstoupil na nebesa, sedí po pravici Boha, Otce všemohoucího; odtud přijde soudit živé i mrtvé. Věřím v Ducha Svatého, svatou církev obecnou, společenství svatých, odpuštění hříchů, vzkříšení těla a život věčný. Amen.`,

  [PRAYER_TYPES.OUR_FATHER]: PATER_NOSTER_CS,

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

  // Orationes utilissimæ additions. Czech sourced verbatim from orationes.pdf.
  [PRAYER_TYPES.NICENE_CREED]: `Věřím v jednoho Boha, Otce všemohoucího, Stvořitele nebe i země, všeho viditelného i neviditelného. Věřím v jednoho Pána, Ježíše Krista, jednorozeného Syna Božího, který se zrodil z Otce přede všemi věky: Bůh z Boha, Světlo ze Světla, pravý Bůh z pravého Boha, zrozený, nestvořený, jedné podstaty s Otcem: skrze něho všechno je stvořeno. On pro nás lidi a pro naši spásu sestoupil z nebe. Skrze Ducha Svatého přijal tělo z Marie Panny a stal se člověkem. Byl za nás ukřižován, za dnů Poncia Piláta byl umučen a pohřben. Třetího dne vstal z mrtvých podle Písma. Vstoupil do nebe, sedí po pravici Otce. A znovu přijde, ve slávě, soudit živé i mrtvé a jeho království bude bez konce. Věřím v Ducha Svatého, Pána a dárce života, který z Otce i Syna vychází, s Otcem i Synem je zároveň uctíván a oslavován a mluvil ústy proroků. Věřím v jednu, svatou, všeobecnou, apoštolskou církev. Vyznávám jeden křest na odpuštění hříchů. Očekávám vzkříšení mrtvých a život budoucího věku. Amen.`,

  [PRAYER_TYPES.SUB_TUUM]: `Pod ochranu tvou se utíkáme, svatá Boží Rodičko. Neodmítej naše prosby v našich potřebách, ale ode všeho nebezpečí vysvoboď nás vždycky, Panno slavná a požehnaná. Paní naše, prostřednice naše, orodovnice naše, u Syna nám smilování vypros, Synu svému nás doporuč, k Synu svému nás doprovoď.`,

  [PRAYER_TYPES.ANGELE_DEI]: `Anděle Boží, strážce můj,
rač vždycky být ochránce můj:
mě vždycky veď a napravuj,
ke všemu dobrému mě vzbuzuj.
Ctnostem svatým mě vyučuj,
ať jsem tak živ, jak chce Bůh můj.
Tělo, svět, ďábla přemáhám,
na tvá vnuknutí pozor dávám.
A tak s tebou ve spojení,
ať vytrvám do skonání,
po smrti pak v nebi věčně
chválím Boha ustavičně. Amen.`,

  [PRAYER_TYPES.REQUIEM]: `Odpočinutí věčné dej jim, Pane.
A světlo věčné ať jim svítí.
Ať odpočívají v pokoji. Amen.`,

  [PRAYER_TYPES.DECALOGUE]: `1. V jednoho Boha věřiti budeš.
2. Nevezmeš jména Božího nadarmo.
3. Pomni, abys den sváteční světil.
4. Cti otce svého i matku svou, abys dlouho živ byl a dobře ti bylo na zemi.
5. Nezabiješ.
6. Nesesmilníš.
7. Nepokradeš.
8. Nepromluvíš křivého svědectví proti bližnímu svému.
9. Nepožádáš manželky bližního svého.
10. Aniž požádáš statku jeho.`,

  // The psalm follows the Czech burial rite (Manuale rituum in cura animarum,
  // 1955, p. 98–99: "podle nového Psalteria", the 1945 Latin psalter, so a
  // few lines word it differently from the Vulgate), its verses 6–7 joined to
  // keep the Latin's line structure. "A porta ínferi" is from the same rite
  // (p. 120). The other versicles and the collect are Schaller's (Římský
  // misál, 1931: the collect from 2 November, its abbreviated ending
  // completed; the versicles from the Litany of the Saints in its appendix).
  [PRAYER_TYPES.DE_PROFUNDIS]: `Z hlubin volám k tobě, Hospodine, Hospodine, vyslyš hlas můj!
Nakloň sluch svůj milostivě k hlasu úpěnlivé modlitby mé.
Budeš-li, ó Pane, viny vážit, Hospodine, kdož obstojí?
Ale u tebe je hříchů odpuštění, aby sloužilo se tobě s uctivostí.
Proto důvěřuji v Hospodina, duše moje doufá v slovo jeho.
Na Pána má duše více čeká nežli noční stráže na svítání. Více nežli stráže na svítání na Pána ty čekej, lide věrný.
Neboť u Pána je slitování, hojné u něho je vykoupení.
A on vysvobodí lid svůj věrný ze všelikých jeho nepravostí.

℣ Odpočinutí věčné dejž jim, Pane.
℟ A světlo věčné ať jim svítí.
℣ Od moci temnoty
℟ Vysvoboď, Pane, duše jejich.
℣ Ať odpočívají v pokoji.
℟ Amen.
℣ Pane, vyslyš modlitbu mou.
℟ A volání mé k tobě přijď.

Modleme se.
Bože, všech věřících Stvořiteli a Vykupiteli, uděl duším svých služebníků a služebnic odpuštění všech hříchů, aby prominutí, kterého si vždycky žádali, pokornými prosbami dosáhli. Jenž žiješ a kraluješ na věky věkův.
℟ Amen.`,

  // Dies iræ — Czech from Schallerův Římský misál (1931), 2 November, the
  // rhymed rendering printed beside the Latin, split into lines by its rhymes
  // so it keeps the Latin's line structure. Spelling as printed (Jesu, že's).
  [PRAYER_TYPES.DIES_IRAE]: `„Onen den, den hněvu lkavý
zruší čas, dým vzejde tmavý,“
David, Sibylla tak praví.

Strašné chvění, bázeň hrozná,
až se tvorstvo Soudci přizná,
jenž hned řeší vše a pozná.

Zní hlas trouby divně duně,
volá spáče v hrobu lůně,
Pán kde sedí na svém trůně.

Smrt a příroda tu trnou,
když se těla z hrobu hrnou
k Soudci, každý s hříšnou skvrnou.

Přinesena psaná kniha,
je v ní všecka hříchů tíha,
z ní pak Soudce viny stíhá.

Soudce zasedat až bude,
zjeví se, co skryto všude.
Bez pomsty zda něco zbude?

Co mám, běda, promluviti?
Obhájcem kdo má mi býti,
když i dobrý hrůzu cítí?

Hrůzné Velebnosti Králi!
Spasiž, kdož si spásy přáli.
Spas mne, Lásky zdroji stálý!

Vzpomeň si, o Jesu milý,
že's šel pro mě k svému cíli.
Nezatrať mne v oné chvíli!

Klesl's, hledaje mne, znaven.
Pro mne byl kůl Kříže vstaven.
Nebuď čin ten plodů zbaven!

Soudce pomsty spravedlivé,
dej dar odpuštění dříve,
nežli sečteš viny křivé!

Sténám pod vinami svými,
líce hříchy rumění mi.
Slituj se nad vzdechy mými!

Marii's dal rozhřešení,
lotr hříšníkem již není,
já též čekám vykoupení.

Nehodně tě prosím, Pane,
dobrotou však tvou se stane:
kol mne oheň nezaplane.

Rač mne mezi ovce vzíti,
od kozlů mne odděliti,
dej mi po pravici dlíti!

Až se zachvějí kdys klatí,
až je ostrý plamen schvátí,
rač mne k sobě povolati!

Duše prosí, lká, se rmoutí,
v popel mé se srdce hroutí,
rač smrt dobrou poskytnouti!

Slzavým dnem bude, Pane,
o němž vinník k Soudu vstane
z hrobového svého lože!
Tohoto pak šetři, Bože!
Milý Pane Ježíši,
dej jim odpočinutí! Amen.`,

  // Ordo Missæ and the sequences: Schallerův Římský misál (1931), as printed
  // beside the Latin. The rhymed sequences are split into lines by their
  // rhymes, stanza for stanza with the Latin; spelling as printed.
  [PRAYER_TYPES.CONFITEOR]: `Vyznávám se Bohu všemohoucímu, blahoslavené Marii, vždy Panně, svatému Michaeli Archandělu, svatému Janu Křtiteli, svatým Apoštolům Petru a Pavlu, všem Svatým a tobě, otče, že jsem zhřešil převelice myšlením, slovy a skutky: svou vinou, svou vinou, svou převelkou vinou! Proto prosím blahoslavenou Marii, vždy Pannu, svatého Michaela Archanděla, svatého Jana Křtitele, svaté Apoštoly Petra a Pavla, všecky Svaté a tebe, otče, orodujte za mne u Pána, Boha našeho.

℣ Smilujž se nad vámi všemohoucí Bůh a odpustě hříchy vaše, uvediž vás do života věčného.
℟ Amen.
℣ Prominutí, rozhřešení a odpuštění hříchů našich nechť udělí nám všemohoucí a milosrdný Hospodin.
℟ Amen.`,

  [PRAYER_TYPES.KYRIE]: `Pane, smiluj se nad námi. 3×
Kriste, smiluj se nad námi. 3×
Pane, smiluj se nad námi. 3×`,

  [PRAYER_TYPES.GLORIA_IN_EXCELSIS]: `Sláva na výsostech Bohu a na zemi pokoj lidem dobré vůle! Chválíme tě. Dobrořečíme tobě. Klaníme se tobě. Oslavujeme tě. Díky vzdáváme tobě pro velikou slávu tvou. Pane Bože, Králi nebeský, Bože Otče všemohoucí! Pane, Synu jednorozený, Ježíši Kriste! Pane Bože, Beránku Boží, Synu Otce! Jenž snímáš hříchy světa, smiluj se nad námi. Jenž snímáš hříchy světa, přijmi prosbu naši. Jenž sedíš po pravici Otce, smiluj se nad námi. Neboť ty jediný jsi Svatý. Ty jediný jsi Pán. Ty jediný jsi Svrchovaný, Ježíši Kriste, se Svatým Duchem ve slávě Boha Otce. Amen.`,

  [PRAYER_TYPES.SANCTUS]: `Svatý, Svatý, Svatý Pán, Bůh zástupů. Plna jsou nebesa i země slávy tvé. Hosanna na výsostech.
Požehnaný, jenž přichází ve jménu Páně. Hosanna na výsostech.`,

  [PRAYER_TYPES.AGNUS_DEI]: `Beránku Boží, který snímáš hříchy světa, smiluj se nad námi.
Beránku Boží, který snímáš hříchy světa, smiluj se nad námi.
Beránku Boží, který snímáš hříchy světa, uděl nám pokoje.`,

  [PRAYER_TYPES.DOMINE_NON_SUM_DIGNUS]: `Pane, nejsem hoden, abys vešel pod střechu mou, ale toliko rci slovem, a uzdravena bude duše má. 3×`,

  [PRAYER_TYPES.PRAEFATIO_DIALOG]: `℣ Po všecky věky věkův.
℟ Amen.
℣ Pán s vámi.
℟ I s duchem tvým.
℣ Vzhůru srdce.
℟ Máme k Hospodinu.
℣ Díky vzdejme Hospodinu, Bohu svému.
℟ Hodno a spravedlivo jest.`,

  [PRAYER_TYPES.ANTE_COMMUNIONEM]: `Pane Ježíši Kriste, jenž jsi pravil Apoštolům svým: Pokoj zůstavuji vám, pokoj svůj dávám vám, nehleď na hříchy mé, nýbrž na víru Církve své a rač jí podle vůle své uděliti mír a jednotu, jenž žiješ a kraluješ Bůh, po všecky věky věkův. Amen.

Pane Ježíši Kriste, Synu Boha živého, jenž jsi z vůle Otce spolupůsobením Ducha Svatého smrtí svou svět oživil, sprosť mne tímto svatosvatým Tělem a Krví svou všech nepravostí mých a veškerých běd a učiň, abych lnul vždy ke tvým přikázáním, a nedopusť, abych se kdy od tebe odloučil, jenž s týmž Otcem a Duchem Svatým žiješ a kraluješ Bůh, na věky věkův. Amen.

Požití Těla tvého, Pane Ježíši Kriste, jež já nehodný odvažuji se přijmouti, nebudiž mi k odsouzení a zatracení, nýbrž pro dobrotivost tvou prospívejž mi k ochraně duše a těla a k vyléčení, jenž žiješ a kraluješ s Bohem Otcem v jednotě Ducha Svatého Bůh, po všecky věky věkův. Amen.

Chléb nebeský přijmu a jméno Páně vzývati budu.`,

  [PRAYER_TYPES.POST_COMMUNIONEM]: `Čeho jsme ústy požili, Pane, kéž čistou myslí pojmeme a nechť z daru časného stane se nám lék věčný.

Nechť Tělo tvé, Pane, jež jsem požil, a Krev, kterou jsem pil, utkví v útrobách mých, a dej, ať nezůstane poskvrna hříchů ve mně, jejž čisté a svaté občerstvily Svátosti, jenž žiješ a kraluješ na věky věkův. Amen.`,

  // Czech: grace at meals from Katechismus modliteb (Miklík, 1937); Pomni,
  // K tobě, svatý Josefe, Velebí duše má and Nyní propouštíš from Příručka
  // katolických pobožností (Minařík, 1935); Súscipe from Cesta k věčné spáse
  // (Brno, 1915); Iúdica me from Schaller's Římský misál (1931). Spelling as
  // printed.
  [PRAYER_TYPES.BENEDICTIO_MENSAE]: `Žehnej, Hospodine, nás i tyto dary, jichž chceme požívati z tvé štědrosti. Skrze Krista, našeho Pána. Amen.`,

  [PRAYER_TYPES.GRATIARUM_ACTIO]: `Děkujeme ti, všemohoucí Bože, za všecka tvoje dobrodiní. Jenž jsi živ a kraluješ na věky věkův. Amen.`,

  [PRAYER_TYPES.MEMORARE]: `Pomni, nejdobrotivější Panno Maria, že od věků není slýcháno, že bys byla někoho opustila, kdo se pod ochranu tvou utíkal, neb o pomoc tě vzýval, anebo za přímluvu tě žádal. Tou důvěrou jsa posilněn, k tobě, Panno panen a Matko, spěchám, k tobě přicházím a jako kající hříšník stojím před tebou. Ó Matko Slova, mými slovy nepohrdej, nýbrž milostivě slyš a vyslyš mne. Amen.`,

  [PRAYER_TYPES.AD_TE_IOSEPH]: `K tobě, svatý Josefe, v soužení svém se utíkáme a jako jsme vzývali o pomoc nejsvětější tvoji Nevěstu, tak důvěrně žádáme i za tvou ochranu. Pro lásku, která tebe spojovala s neposkvrněnou Pannou, Bohorodičkou, a pro otcovskou lásku, se kterou jsi dítě Ježíše objímal, pokorně prosíme, abys na dědictví, kterého Ježíš Kristus dobyl svou krví, dobrotivě shlédl, a našim potřebám mocí a silou svou na pomoc přispěl. Nejpečlivější Strážce božské rodiny, ochraňuj vyvolené potomstvo Ježíše Krista: Odvrať od nás, nejmilejší Otče, všecku nákazu bludů a nepravostí. Buď nám s nebe milostiv, nejsilnější Spomocníku náš, v boji proti mocnosti temností. A jako jsi druhdy vysvobodil dítě Ježíše z největšího nebezpečí života, tak nyní braň Církev svatou proti nepřátelským úkladům, proti všemu protivenství; a zastři nás všecky stráží ustavičnou, abychom podle tvého příkladu a tvou pomocí opatřeni, mohli svatě žíti, nábožně zemříti a věčné blaženosti dosíci. Amen.`,

  [PRAYER_TYPES.MAGNIFICAT]: `Velebí duše má Hospodina
a duch můj plesá v Bohu, Spasiteli mém,
že shlédnul na ponížení služebnice své; hle, od této chvíle blahoslavit mě budou všecka pokolení!
Neboť veliké věci učinil mi ten, jenž jest mocný a jehož jméno svaté.
Milosrdenství jeho trvá od pokolení do pokolení, pro ty, kdo se ho bojí.
On činí mocné věci ramenem svým; rozptyluje ty, kdož jsou pyšného smýšlení v srdci svém.
Sesazuje mocné s trůnu a povyšuje nízké.
Lačné naplňuje dobrými věcmi a bohaté propouští prázdné.
Ujímá se Izraele, služebníka svého, pamětliv jsa svého milosrdenství,
jakož byl mluvil k otcům našim, k Abrahamovi a jeho potomstvu na věky.
Sláva Bohu Otci, i Synu, i Duchu Svatému:
jakož byla na počátku, nyní vždy i na věky. Amen.`,

  [PRAYER_TYPES.NUNC_DIMITTIS]: `Nyní propouštíš, Pane, služebníka svého podle slova svého v pokoji.
Neboť viděly oči mé spásu tvou,
kterou jsi připravil před očima všech národů.
Světlo k osvícení pohanův a k slávě lidu svého israelského.
Sláva Bohu Otci, i Synu, i Duchu Svatému:
jakož byla na počátku, nyní vždy i na věky. Amen.`,

  [PRAYER_TYPES.IUDICA_ME]: `℣ Vstoupím k oltáři Božímu.
℟ Před Boha, jenž je původcem radosti mé od mladosti mojí.
℣ Zjednej mi právo, Bože, a rozhodni při mou proti bezbožnému lidu; od člověka nespravedlivého a lstivého vysvoboď mne.
℟ Neboť tys, Bože, síla má! Proč mne zapuzuješ, a proč smuten chodím, když mne souží nepřítel?
℣ Sešli světlo své a pravdu svou; ty mne povedou a dovedou ke svaté hoře tvé a do stánků tvých.
℟ I vstoupím k oltáři Božímu; před Boha, jenž je původcem radosti mé od mladosti mojí.
℣ Oslavovati tě budu na citeře, Bože, Bože můj. Proč se rmoutíš, duše má, a proč mne znepokojuješ?
℟ Doufej v Boha, neboť opět budu jej oslavovati — spasitele svého a Boha svého.
℣ Sláva Otci i Synu i Duchu Svatému.
℟ Jakož bylo na počátku, i nyní i vždycky, a na věky věkův. Amen.
℣ Vstoupím k oltáři Božímu.
℟ Před Boha, jenž je původcem radosti mé od mladosti mojí.`,

  [PRAYER_TYPES.SUSCIPE]: `Přijmi, ó Pane, a přivlastni sobě všecku mou svobodu, paměť, rozum a vůli! Cokoli zovu svým, všecko dals mi ty; tobě, ó Pane, opět všecko vracím; vše náleží tobě; nalož s tím, jak se ti zalíbí. Daruj mi toliko lásku a milost svou, a budu s dostatek bohat, aniž sobě čeho více žádati budu.`,

  // ---------------------------------------------------------------------------
  // Creátor ineffábilis (St. Thomas Aquinas, before study): OUR OWN TRANSLATION
  // of the Latin — no Czech version was found in the prayer books searched.
  // Replace it verbatim if a printed one turns up.
  // ---------------------------------------------------------------------------
  [PRAYER_TYPES.CREATOR_INEFFABILIS]: `Nevýslovný Stvořiteli, jenž jsi z pokladů své moudrosti ustanovil tři kůry andělů, podivuhodným řádem jsi je postavil nad nejvyšší nebe a části vesmíru jsi nanejvýš krásně uspořádal: ty, pravím, jenž se nazýváš pravým pramenem světla a moudrosti a svrchovaným počátkem, rač vlít do temnot mého rozumu paprsek své jasnosti a odejmi ode mne dvojí temnotu, v níž jsem se narodil, totiž hřích a nevědomost. Ty, jenž jazyky nemluvňat činíš výmluvnými, vyuč můj jazyk a vlij do mých rtů milost svého požehnání. Dej mi bystrost k chápání, schopnost k zapamatování, způsob a snadnost k učení, důvtip k vykládání a hojnou milost v mluvení. Začátek uspořádej, postup řiď, konec završ. Ty, jenž jsi pravý Bůh a člověk, jenž žiješ a kraluješ na věky věků. Amen.`,

  // Korunka k úctě Ducha Svatého: Příručka katolických pobožností (Minařík,
  // 1935), p. 237 f., a translation of the Latin above; the Veni Creator from
  // p. 236. Spelling as printed, bar the misprint "Nejvyšího" and capitals
  // brought into line with the Latin.
  [PRAYER_TYPES.CORONA_SS_INITIUM]: `Ve jménu Otce i Syna i Ducha Svatého. Amen.

{r}Krátký projev lítosti{/r}
Ó Bože můj! Lituji, že jsem tebe, své nejvyšší Dobro, urazil; s milostí tvou činím pevné předsevzetí, že nikdy již nebudu hřešiti.`,

  [PRAYER_TYPES.CORONA_SS_HYMNUS]: `Přijď, Duchu Stvořiteli, k nám
a navštiv myslí našich chrám,
vlij milost nadehvězdnou v hruď,
již ty jsi stvořil, a v ní buď!

Ty's Utěšitel právem zván,
ty's dar, jenž Bohem věčným dán,
ty's láska, oheň, živý zdroj,
ty's síla v tuhý s hříchem boj!

Ty's sedmi darů studnice,
ty's Otcovy prst pravice,
ty's vyplněný Otcův slib,
jenž skýtáš řeči dar a vtip.

Ty mysli světlo rozžehej,
ty lásku v srdce naše lej,
a všecky těla nemoci
svou nauč trpět pomocí.

Dál nepřítele zapudiž,
svým mírem stále u nás dliž,
veď jistou cestou ctnosti nás,
ať zlému vyhnem v každý čas!

Ať tebou Otce poznáme,
ať Syna v srdci vítáme,
i v tebe, Duchu, věříme,
tě s úctou zbožnou slavíme.

Duch každý Boha Otce chval,
i Syna, který z mrtvých vstal!
Buď s nimi slaven svatý Duch,
touž podstatou jim rovný Bůh! Amen.

℣ Sešli Ducha svého a nově stvořeni budou.
℟ A obnovíš tvářnost země.

Modleme se: Bože, který jsi srdce věřících osvícením Ducha Svatého vyučil: dopřej nám, ať v témž Duchu dobré poznáváme a z jeho útěchy se povždy radujeme. Skrze Krista, Pána našeho. Amen.`,

  [PRAYER_TYPES.CORONA_SS_1]: `{r}První tajemství{/r}
Ježíš počat od Panny Marie zastíněním Ducha Svatého.

{r}Rozjímání.{/r} „Duch Svatý sestoupí v tebe, a moc Nejvyššího zastíní tě; proto také to svaté, co se z tebe narodí, slouti bude Syn Boží.“ (Luk. 1, 35.)

{r}Cvičení.{/r} Pros vroucně za pomoc Ducha Svatého a za přímluvu Panny Marie, abys následoval ctností Ježíše Krista, který jest vzorem ctnosti, a abys byl podoben obrazu Syna Božího.`,

  [PRAYER_TYPES.CORONA_SS_2]: `{r}Druhé tajemství{/r}
Duch Hospodinův spočinul na Ježíši.

{r}Rozjímání.{/r} „A když byl Ježíš pokřtěn, vyšel ihned z vody; a hle, otevřela se mu nebesa, i viděl Ducha Božího sestupovati jako holubici a přicházeti na něj.“ (Mat. 3, 16.)

{r}Cvičení.{/r} Važ si co nejvíce neocenitelné milosti posvěcující, kterou ti Duch Svatý na křtu svatém do srdce vlil. Zachovávej slib, k němuž jsi se tehdy byl zavázal. Neustálým cvičením rozmnožuj v sobě víru, naději a lásku. Žij vždy tak, jak se sluší na dítky Boží a na údy pravé Církve Boží, abys po pouti časného života mohl dosíci nebeského dědictví.`,

  [PRAYER_TYPES.CORONA_SS_3]: `{r}Třetí tajemství{/r}
Ježíš veden jest od Ducha na poušť.

{r}Rozjímání.{/r} „Ježíš pak jsa pln Ducha Svatého vrátil se od Jordánu a byl veden Duchem na poušť po čtyřicet dní, a pokoušen byl od ďábla.“ (Luk. 4, 1.)

{r}Cvičení.{/r} Buď povždy vděčen za sedm darů Ducha Svatého, které ti byly uděleny ve svatém biřmování: za ducha moudrosti a rozumu, rady a síly, umění a pobožnost a bázeň Boží. Poslouchej věrně svého božského Vůdce, abys zmužile jednal ve všelikých nebezpečenstvích života, jakož i v pokušeních, jak se sluší na dokonalého křesťana a statečného bojovníka Ježíše Krista.`,

  [PRAYER_TYPES.CORONA_SS_4]: `{r}Čtvrté tajemství{/r}
Duch Svatý v Církvi.

{r}Rozjímání.{/r} „I stal se rychle zvuk s nebe jako přicházejícího prudkého větru, a naplnil veškeren dům, kde byli sedíce; a naplněni jsou všichni Duchem Svatým a mluvili veliké skutky Boží.“ (Skp. ap. 2, 2. 4. 11.)

{r}Cvičení.{/r} Děkuj Pánu Bohu, že tě učinil dítkem své Církve, kterou Duch Svatý o letnicích na svět seslaný oživuje a spravuje. Poslouchej a následuj sv. Otce, který skrze Ducha Svatého nauce křesťanské neomylně učí, jakož i církve svaté, která jest sloupem a základem pravdy. Zachovávej její učení, zastávej se jí a haj jejích práv.`,

  [PRAYER_TYPES.CORONA_SS_5]: `{r}Páté tajemství{/r}
Duch Svatý v duši spravedlivého.

{r}Rozjímání.{/r} „Zdaliž nevíte, že údové vaši jsou chrámem Ducha Svatého, jenž ve vás jest?“ „Ducha neuhášejte!“ (I. Thes. 5, 19.) „A nezarmucujte Ducha Svatého Božího, jímžto znamenáni jste ke dni vykoupení.“

{r}Cvičení.{/r} Buď vždy pamětliv Ducha Svatého, který v tobě přebývá, a dbej se vší pečlivostí čistoty duševní i tělesné. Poslouchej věrně jeho božských vnuknutí, abys vydával dvanáctero ovoce Ducha Svatého: lásku, radost, klid, trpělivost, mírnost, dobrotivost, velkodušnost, tichost, věrnost, střídmost, zdrželivost, čistotu.`,

  // The four chaplets: St. Michael and the Precious Blood and Sacred Heart from
  // Cesta k věčné spáse (1915, vols. III and I), the Seven Sorrows from Poutní
  // kniha (1893), its Raccolta form. OCR checked against the scans; spelling
  // modernised only where the source itself wavers (bolesť/bolest), and capitals
  // per the Latin. The Czech headings are ours.
  [PRAYER_TYPES.CORONA_ANG_INITIUM]: `℣ Bože, ku pomoci mé vzezři.
℟ Hospodine, ku pomoci mé pospěš.

Sláva Otci i Synu i Duchu Svatému. Jako byla na počátku, i nyní, i vždycky, a na věky věků. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_1]: `{r}Pozdravení prvního kůru andělského{/r}
Na přímluvu svatého Michaele a nebeského kůru serafů učiň nás, Bože, hodnými, abychom ohněm dokonalé lásky rozníceni byli. Tak se staň!`,

  [PRAYER_TYPES.CORONA_ANG_2]: `{r}Pozdravení druhého kůru andělského{/r}
Na přímluvu svatého Michaele a nebeského kůru cherubů uděliž nám, Bože, milosti, bychom cestu hříchů opustili a cestou křesťanské dokonalosti kráčeli. Tak se staň!`,

  [PRAYER_TYPES.CORONA_ANG_3]: `{r}Pozdravení třetího kůru andělského{/r}
Na přímluvu svatého Michaele a nebeského kůru trůnů, vlej, Bože, v srdce naše ducha pravé a upřímné pokory. Tak se staň!`,

  [PRAYER_TYPES.CORONA_ANG_4]: `{r}Pozdravení čtvrtého kůru andělského{/r}
Na přímluvu svatého Michaele a nebeského kůru panstev, propůjč nám, Bože, milosti, abychom smysly své a nezřízené žádosti na uzdě měli. Tak se staň!`,

  [PRAYER_TYPES.CORONA_ANG_5]: `{r}Pozdravení pátého kůru andělského{/r}
Na přímluvu svatého Michaele a nebeského kůru mocností račiž, Bože, duše naše proti úkladům a pokušením ducha zlého ochraňovati. Tak se staň!`,

  [PRAYER_TYPES.CORONA_ANG_6]: `{r}Pozdravení šestého kůru andělského{/r}
Na přímluvu svatého Michaele a podivuhodných sil nebeských nedopouštěj, Bože, nikdy, abychom v pokušeních poklesli, nýbrž račiž nás ode všeho zlého zbaviti. Tak se staň!`,

  [PRAYER_TYPES.CORONA_ANG_7]: `{r}Pozdravení sedmého kůru andělského{/r}
Na přímluvu svatého Michaele a nebeského kůru knížat, naplniž, Bože, duše naše duchem pravé a upřímné poslušnosti. Tak se staň!`,

  [PRAYER_TYPES.CORONA_ANG_8]: `{r}Pozdravení osmého kůru andělského{/r}
Na přímluvu svatého Michaele a nebeského kůru archandělů propůjčiž nám, Bože, daru setrvalosti ve víře a v dobrých skutcích, abychom slávy nebeské dosáhli. Tak se staň!`,

  [PRAYER_TYPES.CORONA_ANG_9]: `{r}Pozdravení devátého kůru andělského{/r}
Na přímluvu svatého Michaele a nebeského kůru všech andělů račiž nám, Bože, propůjčiti milosti, abychom od nich v tomto životě ochraňováni a po smrti k věčné slávě přivedeni byli. Tak se staň!`,

  [PRAYER_TYPES.CORONA_ANG_ANTIPHONA]: `{r}Antifona{/r}
Svatý Michaeli, přeslavné kníže, hlavo a vůdce nebeských zástupů, vůdce duší, vítězi nad odbojnými duchy, dvořeníne v paláci Božím, po Ježíši náš podivuhodný vůdce, nadlidskou mocí a dokonalostí obdařený: račiž nás všecky, ježto k tobě důvěry plni útočiště své béřeme, ode všeho zlého vysvoboditi, a pomoz nám svou přemocnou ochranou, abychom každodenně na duchu prospívali.

℣ Oroduj za nás, přeblahoslavený Michaeli, kníže Církve Ježíše Krista.
℟ Abychom hodni učiněni byli zaslíbení jeho.`,

  [PRAYER_TYPES.CORONA_ANG_OREMUS]: `Modleme se. Všemohoucí, věčný Bože, jenž jsi v přepodivné dobrotě a milosrdnosti své k všeobecnému spasení lidu slavného a svatého archanděla Michala knížetem Církve své vyvoliti ráčil: prosíme tebe, učiň nás hodny, abychom jeho dobrotivou ochranou ode všech nepřátel svých osvobozeni byli, tak, aby žádný z nich v hodinu smrti nás neznepokojoval, nýbrž abychom milosti účastní se stali, od něho samého před tvář tvé vznešené velebnosti Boží přivedenu býti. Pro zásluhy Ježíše Krista, Pána našeho. Tak se staň!`,

  [PRAYER_TYPES.CORONA_DOL_INITIUM]: `{r}Vzbuzení lítosti{/r}
Ó jediný a nejlaskavější Pane můj, viz mne, jenž rozjímaje velké urážky, jimiž jsem tě rozhněval, všecek zahanben před tebou klečím. Prosím tě vroucně, račiž mi je odpustiti, protože jich z pouhé lásky k tobě lituji, a poněvadž jsi neskonalé dobro, je nade všecko zlo v ošklivosti mám a je zavrhuji. A jako bych si přál, abych tisíckrát byl raději zemřel, než tebe urazil, tak jsem též pevně odhodlán raději tisíckrát život svůj ztratiti, než tebe opět urazit. Ó můj ukřižovaný Ježíši, činím opravdové předsevzetí co nejdříve duši svou předrahou krví svou ve svátosti pokání očistit. Tebe však, nejmilostivější Panno, Matko milosrdenství a útočiště hříšníků, prosím, račiž mi pro své přehořké bolesti zjednati přežádoucí odpuštění mých hříchův; a modle se dle úmyslu náměstků Kristových, abych odpustků růženci tvému udělených účastným se stal, doufám zároveň, že jimi dosáhnu odpuštění trestů, za hříchy své zasloužených.`,

  [PRAYER_TYPES.CORONA_DOL_1]: `{r}První bolest{/r}
Touto důvěrou v srdci jsa oživen rozjímám první bolest, kterou blahoslavená Panna a Matka Boží pocítila, když ve chrámě jednorozeného Syna svého, Ježíše, starci Simeonovi na lokty vložila a od něho slova uslyšela: Meč bolesti pronikne duši tvou; čímž bylo naznačeno utrpení a smrt jejího Syna Ježíše.`,

  [PRAYER_TYPES.CORONA_DOL_2]: `{r}Druhá bolest{/r}
Druhou bolest pocítila blahoslavená Panna, když utíkala do Egypta, by unikla pronásledování ukrutného Herodesa, jenž ve své bezbožnosti milého Synáčka jejího zahubiti chtěl.`,

  [PRAYER_TYPES.CORONA_DOL_3]: `{r}Třetí bolest{/r}
Třetí bolest pocítila blahoslavená Panna, když o slavnosti velikonoční se svým ženichem, svatým Josefem, a s milým Synem svým, Ježíšem, do Jerusaléma přišla a vracejíc se do chudičkého domu svého, přemilého jedináčka svého ztratila a po tři dni ztráty Jeho oplakávala.`,

  [PRAYER_TYPES.CORONA_DOL_4]: `{r}Čtvrtá bolest{/r}
Čtvrtou bolest pocítila blahoslavená Panna, když potkala přemilého Syna svého, nesoucího těžký kříž na útlých ramenech svých na horu Kalvaru, by tam pro spásu naši ukřižován byl.`,

  [PRAYER_TYPES.CORONA_DOL_5]: `{r}Pátá bolest{/r}
Pátou bolest pocítila blahoslavená Panna, když viděla, kterak Syn její na tvrdém dřevě kříže povýšen byl, kterak krev ze všech údů jeho svatého těla tekla a On konečně po tříhodinné smrtelné úzkosti ducha vypustil.`,

  [PRAYER_TYPES.CORONA_DOL_6]: `{r}Šestá bolest{/r}
Šestou bolest pocítila blahoslavená Panna, když přemilému Synu jejímu, Ježíši, bok kopím proklán, On pak s kříže sňat a na její nejčistší klín položen byl.`,

  [PRAYER_TYPES.CORONA_DOL_7]: `{r}Sedmá bolest{/r}
Sedmou a poslední bolest pocítila blahoslavená Panna Maria, panovnice naše a obzvláštní orodovnice všech svých sluhův a duší v očistci, když přesvaté tělo Syna svého Ježíše do hrobu klásti viděla.`,

  [PRAYER_TYPES.CORONA_DOL_LACRIMAE]: `{r}Nyní modlí se ještě třikrát „Zdrávas Maria“ k uctění slz, jež Panna Maria ve svých bolestech vyronila, a na úmysl, abychom dosáhli milosti zkroušeně hříchů svých litovati, jakož i abychom odpustkův účastnými se stali.{/r}`,

  [PRAYER_TYPES.CORONA_DOL_OREMUS]: `℣ Oroduj za nás, bolestná Panno Maria.
℟ Abychom hodni učiněni byli zaslíbení Kristových.

Modleme se. Prosíme tě, ó Pane Ježíši Kriste, nechať blahoslavená Panna Maria, Matka tvá, jejíž přesvatou duši v hodině utrpení tvého meč bolesti pronikl, pro milosrdenství tvé nyní i v hodině smrti za nás se přimlouvá; skrze tebe, Ježíši Kriste, Spasitel světa, jenž s Otcem i Duchem Svatým žiješ a kraluješ na věky věkův. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_INITIUM]: `℣ Bože, ku pomoci mé vzezři.
℟ Hospodine, ku pomoci mé pospěš.
℣ Sláva Otci i Synu i Duchu Svatému.
℟ Jako byla na počátku, i nyní, i vždycky, a na věky věků. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_1]: `{r}První tajemství{/r}
Ponejprv prolil náš nejlaskavější Spasitel Krev svou osmého dne po svém narození, když podle zákona Mojžíšova byl obřezán. Rozvažujíce, že Ježíš se tomu podvolil, aby zadost učinil božské spravedlnosti za naše prostopášnosti, vzbuďme upřímnou lítost nad nimi a slibme, že budoucně pomocí jeho mocné milosti zachováme čistotu těla i duše.`,

  [PRAYER_TYPES.CORONA_SANG_2]: `{r}Druhé tajemství{/r}
Předrahou Krev svou prolil Ježíš na hoře Olivetské v takové hojnosti, že země vůkol něho svlažena byla, a to předvídaje nevděčnost, s kterou lidé lásku jeho odměňovati budou. Proto tedy srdečně litujme, že jsme i my za nesčíslná dobrodiní Páně tak špatně se odvděčili, a učiňme předsevzetí, že budeme lépe užívati jeho milosti a svatých vnuknutí.`,

  [PRAYER_TYPES.CORONA_SANG_3]: `{r}Třetí tajemství{/r}
Svou předrahou Krev prolil Ježíš při ukrutném bičování svém, když z rozedrané kůže a z otevřených ran z celého těla potokem se řinula ona drahocenná Krev, kterou on obětoval věčnému Otci za naši netrpělivost a choulostivost. A my bychom neměli krotiti hněvu a chtíčů svých? Ano, vynasnažme se, abychom budoucně byli trpělivější v protivenstvích, sebou opovrhovali a křivdy nám učiněné tiše snášeli.`,

  [PRAYER_TYPES.CORONA_SANG_4]: `{r}Čtvrté tajemství{/r}
Předrahá Krev Ježíšova tekla z jeho nejsvětější hlavy, když byl trním korunován, aby trpěl za naši pýchu a za naše zlé myšlenky. A my bychom mohli i na dále libovati si ve své pýše a kochati se v nečistých obrazech a hříšných myšlenkách? Nikoliv! Mějme budoucně na mysli svou nicotu, svou bídu, svou křehkost a statečně odporujme všemu vnuknutí zlého ducha.`,

  [PRAYER_TYPES.CORONA_SANG_5]: `{r}Páté tajemství{/r}
Ó jak mnoho předrahé Krve prolil náš nejlaskavější Ježíš na oné bolestné cestě, kterou konal na horu Kalvarii obtížen jsa těžkým dřevem kříže, skrápěje touto svou drahou Krví ulice jerusalemské a všecka místa, kudy se ubíral. A to stalo se na zadostučinění za pohoršení a zlé příklady, jimiž jeho tvorové jiné na cesty záhuby svádějí. Ach, kdo ví, zdali i my nenáležíme do počtu těchto nešťastníků; kdo ví, jak mnohé náš zlý příklad do pekla přivedl? A my bychom tomu zlu nezabránili? Učiňme tedy předsevzetí, že ke spáse duší budoucně budeme přispívati, jich napomínajíce, povzbuzujíce a jim příklad dobrých skutků dávajíce.`,

  [PRAYER_TYPES.CORONA_SANG_6]: `{r}Šesté tajemství{/r}
Svou předrahou Krev prolil Spasitel hojněji při svém ukrutném ukřižování, když z rozedraných žil a ze zraněných údů rukou a nohou jeho jako proud vyprýštil onen spasitelný balsám života věčného, kterým by za hříchy a nepravosti celého světa zadost učiněno bylo. A nalezl by se člověk, jenž by ještě stále hřešil a tak obnovoval ukrutné ukřižování Syna Božího? Ach, oplakávejme hořce svých spáchaných poklesků, vzbuďme ošklivost nad nimi a u nohou zpovědníkových napravme své mravy, začněme od této chvíle pravý křesťanský život a mějme bez přestání před očima, jak mnoho Krve Spasitel za naši věčnou spásu prolít ráčil.`,

  [PRAYER_TYPES.CORONA_SANG_7]: `{r}Sedmé tajemství{/r}
Konečně prolil Ježíš Krev při své smrti, když mu kopím otevřen byl bok jeho a milování nejhodnější Srdce probodeno bylo. Ano, spolu s Krví vyšla tenkrát i voda na důkaz, že všechna Krev byla vycezena, bývši prolita až do poslední krůpěje za naše spasení. Ó nekonečné dobroty Spasitele našeho! Kdož by tě nemiloval? Kdož by se nerozplýval láskou k tobě, jenž jsi tolik učinil, abys nás vykoupil? Poněvadž se nám nedostává slov, chceme vyzvati všecky tvory na zemi, chceme vyzvati všecky anděly a svaté na nebi, a zvláště svou drahou Matku Marii, aby tvou předrahou Krev chválili, velebili a blahoslavili. Ano, zdráva budiž Krev Ježíšova nyní i vždycky a po všecky věky. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_TE_ERGO]: `℣ Tebe tedy prosíme, přispěj ku pomoci svým služebníkům, které jsi drahou Krví vykoupil.`,

  [PRAYER_TYPES.CORONA_SANG_ORATIO]: `{r}Modlitba{/r}
Ó předrahá Krvi života věčného, ceno spásy celého světa, nápoji a lázni duší našich, jež ustavičně se zastáváš potřeb lidí před trůnem Nejvyššího! Klaním se tobě s nejhlubší pokorou a rád bych, pokud mi možno, nahradil urážky a křivdy, které se ti bez přestání od tvorů tvých dějí, zvláště od těch, kteří se opovažují zlořečením tě zneuctívati. A kdož by nevelebil této Krve ceny nekonečné? Kdož by nebyl roznícen láskou k Ježíši, jenž ji prolil? Co by ze mne bylo, kdybych nebyl vykoupen touto božskou Krví? Kdo ji vycedil ze žil Pána mého až do poslední krůpěje? Ach, byla to zajisté láska Ó nesmírná lásko, která jsi nám dala tento balsám spásy! Ó neocenitelný balsáme, který jsi vyprýštil z pramene nesmírné lásky, učiň, aby všechna srdce a všecky jazyky tě mohly chváliti, velebiti a díky tobě vzdávati nyní i vždycky a po všecky věky. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_OREMUS]: `℣ Vykoupil jsi nás, ó Pane, v Krvi své.
℟ A učinil jsi nás Bohu našemu královstvím.

Modleme se. Všemohoucí věčný Bože, kterýž jsi jednorozeného Syna svého Vykupitelem světa ustanovil, a jeho Krví smířen býti chtěl: propůjč, prosíme; abychom cenu naší spásy slavnou službou tak ctili, a od zla přítomného života její silou tak byli chráněni na zemi, abychom z užitku věčného se radovali na nebi. Jenž s tebou živ jest a kraluje v jednotě Ducha Svatého, Bůh po všechny věky věků. Amen.`,

  [PRAYER_TYPES.CORONA_COR_INITIUM]: `℣ Bože, ku pomoci mé vzezři.
℟ Hospodine, ku pomoci mé pospěš.`,

  [PRAYER_TYPES.CORONA_COR_1]: `{r}I. Dobrotivé Srdce{/r}
Ó můj nejlaskavější Ježíši! Když rozjímám o tvém dobrotivém Srdci a vidím je plné lásky a sladkosti ke hříšníkům, naplňuje se srdce mé radostí a nezvratnou důvěrou, že mne milostivě přijmeš. Ach, jak mnoho hříchů jsem spáchal! Avšak nyní je oplakávám a v ošklivosti mám jako Petr a kající Magdalena, poněvadž jsem jimi urazil tebe, nejvyšší dobré. Ó popřej i mně odpuštění všech hříchů mých! Ó kéž, o to tě prosím pro tvé nejsvětější Srdce, raději umru, než abych tě zase urazil; žil bych však rád jediné proto, abych mohl tvou lásku opětovati.`,

  [PRAYER_TYPES.CORONA_COR_2]: `{r}II. Pokorné Srdce{/r}
Velebím, ó Ježíši, tvé nejpokornější Srdce a děkuji ti, že dávaje mi je za příklad nejen mocně mne vybízíš, abych ho následoval, nýbrž i svým tolikerým pokořením mně cestu k tomu ukazuješ a urovnáváš. Ó jak jsem byl nemoudrým a nevděčným! Ó jak daleko jsem zabloudil! Odpusť mi! Pryč se vší pýchou! Chci tebe od této chvíle s pokorným srdcem a pokořován následovati, abych nalezl pokoj a spásu. Posilni mne a budu tvé nejsvětější Srdce věčně chváliti a velebiti.`,

  [PRAYER_TYPES.CORONA_COR_3]: `{r}III. Trpělivé Srdce{/r}
Podivuji se, ó můj Ježíši, tvému nejtrpělivějšímu Srdci a děkuji ti za tak mnohé podivuhodné příklady nepřemožitelné trpělivosti, jež jsi nám zanechal. Lituji, že mně tyto příklady až dosud marně vytýkaly mou neobyčejnou choulostivost, kteráž i nejmenší utrpení snášeti se zpěčuje. Ach, můj laskavý Ježíši, vlij do srdce mého horlivou a stálou lásku k protivenství, ke kříži, k sebemrtvení a k pokání, abych následuje tě na horu Kalvarskou došel s tebou radosti nebeské.`,

  [PRAYER_TYPES.CORONA_COR_4]: `{r}IV. Mírné Srdce{/r}
Před tvým nejmírnějším Srdcem, ó můj laskavý Ježíši, hrozím se svého tvému tak nepodobného srdce. Jediným slovem, jediným posuňkem, jediným stínem nějakého odporu jsem rozčilen a běduji. Ach, odpusť mi výbuchy náruživosti a propůjč mi milosti, abych budoucně v každém protivenství tvé stálé tichosti následoval a tak ustavičného svatého pokoje požíval.`,

  [PRAYER_TYPES.CORONA_COR_5]: `{r}V. Velkomyslné Srdce{/r}
Buďtež pěny chvály, ó Ježíši, tvému velkomyslnému Srdci, jež nad smrtí a peklem zvítězilo a všech chval zasluhuje. Já však jsem více než kdy zahanben, vida srdce své tak malomyslné, že se bojí každé zpozdilé řeči a zastrašeno bývá bázní lidskou. Avšak od nynějška tak nebude. Prosím tě vroucně, dej mi zmužilosti a síly, abych s tebou bojoval a zvítězil na zemi a pak radostné vítězství s tebou slavil na nebi.`,

  [PRAYER_TYPES.CORONA_COR_IACULATORIA]: `Ó přesladké Srdce mého Ježíše, dej, abych tě miloval víc a více!`,

  [PRAYER_TYPES.CORONA_COR_MARIA]: `{r}Obraťme se k Marii, víc a více se jí zasvěcujíce, a důvěřujíce v její mateřské Srdce, rceme jí:{/r}
Prosím tebe, ó vznešená Matko Boží a Matko má, Maria, pro veliké přednosti svého nejsladšího Srdce vyžádej mi pravé a stálé pobožnosti k nejsvětějšímu Srdci Ježíše, Syna svého, abych se všemi myšlenkami a city svými do tohoto Srdce ukryt všecky povinnosti své plnil a povždy, zvláště však tohoto dne, Ježíši ochotně a pilně sloužil.`,

  [PRAYER_TYPES.CORONA_COR_OREMUS]: `℣ Srdce Ježíšovo, planoucí láskou k nám.
℟ Rozžehni srdce naše láskou k tobě.

Modleme se. Oním ohněm, prosíme, Pane, Duch Svatý nás rozněť, jejž Pán náš, Ježíš Kristus, z hlubokosti Srdce svého poslal na svět a chtěl, aby mocně se zapálil. Jenž s tebou žije a kraluje v jednotě téhož Ducha Svatého Bůh po všecky věky věkův. Amen.`,

  [PRAYER_TYPES.VICTIMAE_PASCHALI]: `Oběti velikonoční chvály ať křesťané obětují.
Beránek ovce vykoupil; Kristus nevinný Otce se hříšníky smířil.
Smrt a život soubojem utkaly se podivným; kníže života zemřev, vládne živý.
Marie, o řekni nám, co jsi uviděla tam?
Hrob Krista živého a slávu viděla jsem zmrtvýchvstalého.
Svědky jeho, Anděly, rouška, šat tam ležely.
Vstalť Kristus, moje naděje; svoje předejde do Galileje.
Víme nyní o pravdivém zmrtvýchvstání; Vítězný ty Králi ukaž nám své smilování. Amen. Aleluja!`,

  [PRAYER_TYPES.VENI_SANCTE_SPIRITUS]: `Duše Svatý, sestup v nás,
vyšli k nám svůj nebes jas,
paprskem rač ozářit!

Otče chudých, sestup k nám,
dárce darů, přijď ty sám,
ty, kterýž jsi srdce svit!

Těšiteli ve strastech,
sladký hosti duší všech,
sladký's okřívání klid!

Odpočinek je tvůj dar,
chládkem jsi, když pálí žár,
v pláči umíš potěšit.

Světla zář tvá přeblahá
ve hloub srdce zasahá —
naplň jí svůj věrný lid!

Božstvím svým nám vyjdi vstříc,
jinak v lidech není nic,
všecko může uškodit.

Kalné očisť od kalu,
zavlaž, co schne v úpalu,
raněné rač vyléčit!

Ztuhlé račiž ohýbat,
zahřej tam, kde studí chlad,
na scestí rač vůdcem být!

Račiž v tebe věřícím,
Duše Svatý, věrným svým
Sedmero své udělit!

Ctnosti zásluhu rač dát,
spasně dej nám umírat,
ve věčné dej slasti žít! Amen. Aleluja.`,

  [PRAYER_TYPES.LAUDA_SION]: `Chval, Sione, Spasitele,
chval Pastýře, vůdce vřele,
zpěvy, písně, hymny pěj!

Odvažuj se, jak jen možné,
větší je, než chvály zbožné,
nepostačíš chválit jej!

Zcela zvláštní látka chvály —
živý chléb, zdroj žití stálý —
pro den dnešní nastala.

Chléb, jejž v hodech za večera
bratří četa dvanáctera
zcela jistě dostala.

Buď zpěv plný, buď zpěv jasný,
budiž libý, budiž hlasný
jásot mysli, ples a vděk.

Dnes je slavnost, o níž se vzpomíná,
kterak povstala prvně ta hostina,
hodu toho počátek.

Oběť nové smlouvy vzniká.
Stůl nového Panovníka
odděluje starý čas.

Staré ničí novota,
prchla Pravdou Temnota,
noc, již zahnal denní jas.

Kristus při hostině svaté
děl: Co činím, činit máte,
na Mne vzpomínajíce.

Svatá stanovení ctíme.
Chléb a víno přinášíme,
oběť spásy světíce.

Dogma křesťanům se dává,
že se z chleba Tělo stává,
z vína že se stává Krev.

Nechápe duch, nedozírá,
horlivá však sílí víra,
ač je jiný věci zjev.

Pod různými vzezřeními
věcmi ne, leč znameními
výborný je Předmět skryt.

Nápoj Krve, pokrm Těla,
v obou Kristus je však zcela,
nepřestává celý být.

Přijímáš-li, zůstal celý,
nezláme se, nerozdělí,
nikdy pranic neschází.

Bere jeden, tisíc bere.
Jako jeden, davy steré,
aniž množství dochází.

Dobří, špatní přijímají,
nestejný však osud mají:
Život — smrti objetí.

Smrt je zlým a dobrým žití.
Zříš, jak různý může býti
účin téhož přijetí.

Když se potom Svátost láme,
nechť se věrou nevikláme,
pod úlomkem tolik máme,
kolik celek uhostí.

Netrpí věc těmi ději,
způsobu jen rozbíjejí,
ale věc a stavy její
potrvají v Svátosti.

Chléb, jenž blaží Nebešťany,
poutníkům, hle, v pokrm daný,
v pravdě synům uchystaný,
není pokrm štěňátek.

Oběť v předobrazech známá:
Isak, žertva Abrahama,
velkonoční oběť sama,
manna Otcům v onen věk.

Dobrý's Pastýř, Chléb jsi pravý!
Smiluj se, slyš hlas náš lkavý:
Pasiž, hlídej naše davy,
dobro dej nám, Přelaskavý,
v zemi živých dej nám zřít!

Vševědoucí, Převeliký,
jenž nás paseš, smrtelníky,
Svými spolustolovníky,
dědici a účastníky
svatých rač nás učinit! Amen. Aleluja.`,

  [PRAYER_TYPES.STABAT_MATER]: `Stojí Matka zarmoucená,
slzy prolévá a sténá
u Kříže, kde Syn jí pněl.

Její duši bědující,
plnou smutku, bolestící,
pronik' meč a v hrudi tkvěl.

Kterak sklácena je Panna,
jak je smutná požehnaná,
která Boží Matkou jest!

Jak jen lkala, naříkala,
Rodička když nazírala
na slavného Syna trest!

Kdož by mohl neplakati,
kdyby viděl Krista Máti
v tomto ponížení zlém!

Komu srdce nerozdírá,
na Matku když Boží zírá,
kterak truchlí se Synem!

Pro hřích z rodu svého lidí
Syna na mučidlech vidí,
vidí metly, příval ran.

Zří jej zmírat oko Matky,
zří, jak opuštěn Syn sladký,
zří, jak pustil duši Pán.

Eja, Matko, Lásky zdroji,
dej mi cítit bolest tvoji,
dej, bych s tebou zaplakal!

Dej, by srdce moje plálo,
dej, by Boha milovalo,
bych si Krista oblíbil!

Prosím o to, Matko milá,
bys mi rány v srdce vryla,
dej by můj byl Kristův Kříž,

každá rána, jež mu dána!
Muka Pána požehnaná
se mnou Matko rozděliž!

Dej mi s tebou slzy líti,
se Synem dej soustrast míti,
dokud budu žíti jen!

Dej mi místo vedle Kříže,
společenství svojí tíže,
dej, ať sdílím bol a sten!

Panno Panen, v celém žití
nemáš mi již trpkou býti,
se mnou Matko sdílej pláč!

Dej, bych snesl, Pán že klesl,
k účastenství muk se vznesl,
sčítat rány — dáti rač,

bych byl ranou Syna zraněn,
Křížem opojen a chráněn,
krví Syna očištěn,

zbaven věčných žárů trudu.
Skrze tebe chráněn budu
Matko Páně v soudný den!

Až mi bude odtud jíti,
Kriste, rač mi uděliti
Matkou palmu vítěznou!

Tělo bude umírati,
duši mé pak račiž dáti
slávu Ráje blaženou! Amen.`,

  // Czech sourced verbatim from angelus-domini-anima-christi.pdf.
  [PRAYER_TYPES.ANGELUS]: `℣ Anděl Páně zvěstoval Panně Marii.
℟ A ona počala z Ducha Svatého.

Zdrávas, Maria, milosti plná, Pán s tebou; požehnaná ty mezi ženami a požehnaný plod života tvého Ježíš. Svatá Maria, Matko Boží, pros za nás hříšné nyní i v hodinu smrti naší. Amen.

℣ Maria řekla: Jsem služebnice Páně.
℟ Ať se mi stane podle tvého slova.

Zdrávas, Maria…

℣ A Slovo se stalo tělem.
℟ A přebývalo mezi námi.

Zdrávas, Maria…

℣ Oroduj za nás, svatá Boží Rodičko.
℟ Aby nám Kristus dal účast na svých zaslíbeních.

Modleme se: Pane, poznali jsme andělské poselství o vtělení Krista, tvého Syna; vlej nám, prosíme, do duše svou milost, ať nás jeho umučení a kříž přivede ke slávě vzkříšení. Skrze Krista, našeho Pána.
℟ Amen.`,

  // Czech sourced verbatim from regina-caeli-anima-christi.pdf.
  [PRAYER_TYPES.REGINA_CAELI]: `Raduj se, Královno nebeská, aleluja,
protože splnil Pán slova svá, aleluja,
z mrtvých vstal, Matko, Ježíš tvůj, aleluja:
u něho za nás oroduj, aleluja.

℣ Raduj se a vesel, Panno Maria, aleluja,
℟ neboť Pán vpravdě z mrtvých vstal, aleluja.

Modleme se: Bože, vzkříšením svého Syna, našeho Pána Ježíše Krista, jsi naplnil svět radostí; na přímluvu jeho Rodičky, Panny Marie, dej ať dosáhneme radosti života věčného. Skrze Krista, našeho Pána.
℟ Amen.`,

  [PRAYER_TYPES.ANIMA_CHRISTI]: `Duše Kristova, posvěť mě.
Tělo Kristovo, zachraň mě.
Krvi Kristova, opoj mě.
Vodo z boku Kristova, obmyj mě.
Utrpení Kristovo, posilni mě.
Dobrý Ježíši, vyslyš mě.
Ve svých ranách ukryj mě.
Nedopusť, abych se odloučil od tebe.
Před zlým nepřítelem ochraň mě.
V hodině mé smrti zavolej mě.
A dej, ať přijdu k tobě,
abych tě s tvými svatými
chválil navěky.
Amen.`,

  // Czech sourced verbatim from cs.wikipedia.org/wiki/Vyznání_Quicumque.
  [PRAYER_TYPES.ATHANASIAN_CREED]: `Kdokoli chce být spasen, je v prvé řadě třeba, aby se držel všeobecné víry. Jestliže ji někdo nezachová neporušenou a ucelenou, bezpochyby zahyne navěky. Všeobecná víra je pak tato: Abychom uctívali jednoho Boha v Trojici, a Trojici v jednotě, abychom ani nezaměňovali osoby, ani neoddělovali podstatu. Jiná je totiž osoba Otce, jiná osoba Syna, jiná osoba Ducha Svatého. Avšak božství Otce, Syna a Ducha Svatého je jedno, stejná je jejich sláva a souvěčná je jejich vznešenost. Jaký je Otec, takový je Syn, takový je Duch Svatý. Nestvořený je Otec, nestvořený je Syn, nestvořený je Duch Svatý. Věčný je Otec, věčný je Syn, věčný je Duch Svatý. A přece nejsou tři věční, ale jen jeden věčný. Jako nejsou tři nestvoření, ani tři nezměrní, ale jeden nestvořený a jeden nezměrný. Podobně je všemohoucí Otec, všemohoucí Syn a všemohoucí Duch Svatý. A přece nejsou tři všemohoucí, nýbrž jeden všemohoucí. Tak je Bůh Otec, Bůh Syn a Bůh Duch Svatý, a přece nejsou tři bohové, ale je jen jediný Bůh. Stejně tak je Pánem Otec, Pánem je Syn a Pánem je Duch Svatý, ale nejsou tři Páni, ale je jen jeden Pán. Protože jako jsme nuceni v křesťanské víře vyznávat jednotlivě každou osobu jako Boha a Pána, stejně tak je nám zakázáno ve všeobecném náboženství říkat, že existují tři bohové nebo páni.

Otec nebyl učiněn z ničeho: nebyl ani stvořen, ani zrozen. Syn je jen z Otce, neučiněný, nestvořený, ale zrozený. Duch Svatý je z Otce a Syna: neučiněný, nestvořený, nezrozený, nýbrž vycházející. Jeden je tedy Otec, nikoli tři otcové; jeden je Syn, nikoli tři synové; jeden je Duch Svatý, nikoli tři duchové svatí. A v této Trojici není nic dřív nebo později, nic není větší ani menší, ale všechny tři osoby jsou navzájem souvěčné a rovné, takže je třeba vždy uctívat, jak již bylo výše řečeno, jednotu v Trojici a Trojici v jednotě. Kdo chce být spasen, musí takto smýšlet o Trojici.

K věčné spáse je však pro člověka potřebné, aby pevně věřil i ve vtělení našeho Pána Ježíše Krista. Je totiž správná víra, abychom věřili a vyznávali, že náš Pán Ježíš Kristus, Boží Syn, je Bohem i člověkem. Je Bůh, zrozený před věky z podstaty Otce, je člověk, narozený v čase z podstaty matky. Je dokonalým Bohem a dokonalým člověkem, složeným z rozumové duše a lidského těla. Je roven Otci podle božství, ale menší než Otec podle lidství. I když je Bohem a člověkem, nejsou dva Kristové, nýbrž je jen jeden Kristus. Je jeden nikoli proto, že by se božství stalo tělem, nýbrž proto, že lidství bylo přijato do Boha. Zcela a pouze jeden, nikoli ve spojených podstatách, nýbrž v jednotě osoby. Neboť jako rozumová duše a tělo jsou jeden člověk, tak Bůh a člověk jsou jeden Kristus. Ten trpěl pro naši spásu, sestoupil do pekel a třetího dne vstal z mrtvých; vystoupil na nebesa, sedí po pravici všemohoucího Otce a odtud přijde soudit živé i mrtvé. Při jeho příchodu všichni lidé musejí vstát se svými těly, dostanou odplatu za své činy. Kdo konali dobro, půjdou do věčného života, kdo však zlo, půjdou do věčného ohně. Taková je všeobecná víra. Kdo ji pevně a věrně nezastává, nemůže být spasen. Amen.`,

  // Antiphon: official liturgical translation from cs.wikipedia. The Advent
  // versicle+collect reuse the (sourced) Angelus Czech; the post-Christmas
  // collect is our translation of the canonical Latin.
  [PRAYER_TYPES.ALMA_REDEMPTORIS]: `Slavná Matko Spasitele, bráno nebes, hvězdo mořská, na pomoc přijď svému lidu, který touží povstat z hříchu. Přijalas zvěst Gabriela, porodilas svého Tvůrce, pannou jsi být nepřestala – celý vesmír nad tím žasne. Smiluj se nad hříšným světem.

{r}V době adventní:{/r}
℣ Anděl Páně zvěstoval Panně Marii.
℟ A ona počala z Ducha Svatého.
Modleme se: Pane, poznali jsme andělské poselství o vtělení Krista, tvého Syna; vlej nám, prosíme, do duše svou milost, ať nás jeho umučení a kříž přivede ke slávě vzkříšení. Skrze Krista, našeho Pána. Amen.

{r}Od Narození Páně do Hromnic:{/r}
℣ Po porodu jsi, Panno, zůstala neporušená.
℟ Bohorodičko, přimlouvej se za nás.
Modleme se: Bože, panenstvím blahoslavené Marie jsi daroval lidstvu odměnu věčné spásy; dej, prosíme, ať poznáváme přímluvu té, skrze niž jsme přijali původce života, našeho Pána Ježíše Krista, tvého Syna. Amen.`,

  // Czech (rhymed) from cs.wikipedia.org/wiki/Ave_Regina_caelorum.
  [PRAYER_TYPES.AVE_REGINA_CAELORUM]: `{r}Od Hromnic do Svatého týdne:{/r}
Zdráva buď, Královno nebe,
zdrávas, andělé slaví tebe,
zdrávas, Máti, zdrávas, bráno,
z níž je světu světlo dáno.

Plesej, Panno oslavená,
nade všechny vyvolená,
zdráva buď, lilie čistá,
přimlouvej se za nás u Krista.

℣ Učiň mě hodným chválit tě, svatá Panno.
℟ Dej mi sílu proti tvým nepřátelům.
Modleme se: Milosrdný Bože, posilni naši slabost, abychom my, kdo slavíme památku svaté Boží Rodičky, na její přímluvu povstali ze svých nepravostí. Skrze Krista, našeho Pána. Amen.`,

  // Czech sourced verbatim from the Kancionál (067, © ČBK), with the three 2020
  // invocations (Matko milosrdenství / Matko naděje / Útěcho migrujících) slotted
  // into their official positions per the user. Two further departures from that
  // base, for structural parity with the Roman Latin (which the Kancionál shortens):
  // the "Kriste, uslyš nás / vyslyš nás" acclamations after the Kyrie, and the
  // three distinct Agnus Dei responses in place of "smiluj se nad námi" ×3.
  [PRAYER_TYPES.LITANY_LORETO]: `Pane, smiluj se. 2×
Kriste, smiluj se. 2×
Pane, smiluj se. 2×
Kriste, uslyš nás.
Kriste, vyslyš nás.
Bože, náš nebeský Otče, smiluj se nad námi.
Bože Synu, Vykupiteli světa, smiluj se nad námi.
Bože Duchu Svatý, smiluj se nad námi.
Bože v Trojici jediný, smiluj se nad námi.

Svatá Maria, oroduj za nás.
Svatá Boží Rodičko, oroduj za nás.
Svatá Panno panen, oroduj za nás.
Matko Kristova, oroduj za nás.
Matko církve, oroduj za nás.
Matko milosrdenství, oroduj za nás.
Matko božské milosti, oroduj za nás.
Matko naděje, oroduj za nás.
Matko nejčistší, oroduj za nás.
Matko nejcudnější, oroduj za nás.
Matko neporušená, oroduj za nás.
Matko neposkvrněná, oroduj za nás.
Matko láskyhodná, oroduj za nás.
Matko obdivuhodná, oroduj za nás.
Matko dobré rady, oroduj za nás.
Matko Stvořitelova, oroduj za nás.
Matko Spasitelova, oroduj za nás.
Panno nejmoudřejší, oroduj za nás.
Panno úctyhodná, oroduj za nás.
Panno chvályhodná, oroduj za nás.
Panno mocná, oroduj za nás.
Panno dobrotivá, oroduj za nás.
Panno věrná, oroduj za nás.
Zrcadlo spravedlnosti, oroduj za nás.
Trůne moudrosti, oroduj za nás.
Příčino naší radosti, oroduj za nás.
Stánku Ducha Svatého, oroduj za nás.
Stánku vyvolený, oroduj za nás.
Stánku zbožnosti, oroduj za nás.
Růže tajemná, oroduj za nás.
Věži Davidova, oroduj za nás.
Věži z kosti slonové, oroduj za nás.
Dome zlatý, oroduj za nás.
Archo úmluvy, oroduj za nás.
Bráno nebeská, oroduj za nás.
Hvězdo jitřní, oroduj za nás.
Uzdravení nemocných, oroduj za nás.
Útočiště hříšníků, oroduj za nás.
Útěcho migrujících, oroduj za nás.
Těšitelko zarmoucených, oroduj za nás.
Pomocnice křesťanů, oroduj za nás.
Královno andělů, oroduj za nás.
Královno patriarchů, oroduj za nás.
Královno proroků, oroduj za nás.
Královno apoštolů, oroduj za nás.
Královno mučedníků, oroduj za nás.
Královno vyznavačů, oroduj za nás.
Královno panen, oroduj za nás.
Královno všech svatých, oroduj za nás.
Královno počatá bez poskvrny hříchu dědičného, oroduj za nás.
Královno nanebevzatá, oroduj za nás.
Královno posvátného růžence, oroduj za nás.
Královno rodin, oroduj za nás.
Královno míru, oroduj za nás.

Beránku Boží, který snímáš hříchy světa, odpusť nám, Pane.
Beránku Boží, který snímáš hříchy světa, vyslyš nás, Pane.
Beránku Boží, který snímáš hříchy světa, smiluj se nad námi.

℣ Oroduj za nás, svatá Boží Rodičko,
℟ aby nám Kristus dal účast na svých zaslíbeních.
Modleme se: Všemohoucí, věčný Bože, dej nám, svým služebníkům, stálé zdraví duše i těla a na přímluvu Panny Marie obrať naše trápení v trvalou radost. Skrze Krista, našeho Pána. Amen.

{r}V době adventní:{/r}
℣ Anděl Páně zvěstoval Panně Marii
℟ a ona počala z Ducha Svatého.
Modleme se: Bože, tvé věčné Slovo se při andělově zvěstování stalo v lůně Panny Marie člověkem; vyslyš naše pokorné prosby a dej všem, kdo ji s vírou uctívají jako Bohorodičku, aby jim její přímluva u tebe stále pomáhala. Skrze Krista, našeho Pána. Amen.

{r}V době vánoční:{/r}
℣ Po porodu, Panno, jsi zůstala neporušená.
℟ Svatá Boží Rodičko, přimlouvej se za nás.
Modleme se: Bože, tys vyvolil blahoslavenou Pannu Marii za Matku Spasitele lidského pokolení; dej, ať poznáváme, že ta, která nám zrodila původce života, stále se za nás u něho přimlouvá. Neboť on s tebou žije a kraluje na věky věků. Amen.

{r}V době velikonoční:{/r}
℣ Raduj se a plesej, Panno Maria, aleluja!
℟ Neboť Pán v pravdě z mrtvých vstal, aleluja!
Modleme se: Bože, tvůj Syn, náš Pán Ježíš Kristus, vstal z mrtvých a naplnil svět radostnou nadějí na vzkříšení; prosíme tě, dej, ať v nás tato velikonoční radost stále roste, abychom tak jako jeho Matka Panna Maria, a s její pomocí šťastně dosáhli plné radosti v nebi. Neboť on s tebou žije a kraluje na věky věků. Amen.`,

  // Czech sourced verbatim from the Kancionál (065, © ČBK), except for the two
  // departures noted on the Loreto Czech above (Kyrie acclamations, three-fold
  // Agnus Dei), applied here too so both litanies open and close alike.
  [PRAYER_TYPES.LITANY_SACRED_HEART]: `Pane, smiluj se. 2×
Kriste, smiluj se. 2×
Pane, smiluj se. 2×
Kriste, uslyš nás.
Kriste, vyslyš nás.
Bože náš nebeský Otče, smiluj se nad námi.
Bože Synu, Vykupiteli světa, smiluj se nad námi.
Bože Duchu Svatý, smiluj se nad námi.
Bože v Trojici jediný, smiluj se nad námi.

Srdce Ježíšovo, Srdce Syna věčného Otce, smiluj se nad námi.
Srdce Ježíšovo, utvořené Duchem Svatým v lůně panenské Matky, smiluj se nad námi.
Srdce Ježíšovo, podstatně spojené se Slovem Božím, smiluj se nad námi.
Srdce Ježíšovo, nekonečně vznešené, smiluj se nad námi.
Srdce Ježíšovo, svatý chráme Boží, smiluj se nad námi.
Srdce Ježíšovo, stánku Nejvyššího, smiluj se nad námi.
Srdce Ježíšovo, dome Boží a bráno nebe, smiluj se nad námi.
Srdce Ježíšovo, planoucí výhni lásky, smiluj se nad námi.
Srdce Ježíšovo, v němž přebývá Boží spravedlnost a slitování, smiluj se nad námi.
Srdce Ježíšovo, plné dobroty a lásky, smiluj se nad námi.
Srdce Ježíšovo, hlubino všech ctností, smiluj se nad námi.
Srdce Ježíšovo, hodné veškeré chvály, smiluj se nad námi.
Srdce Ježíšovo, králi a střede všech srdcí, smiluj se nad námi.
Srdce Ježíšovo, pokladnice veškeré moudrosti a umění, smiluj se nad námi.
Srdce Ježíšovo, ve kterém přebývá všechna plnost božství, smiluj se nad námi.
Srdce Ježíšovo, Otci ze všech nejmilejší, smiluj se nad námi.
Srdce Ježíšovo, z jehož plnosti jsme všichni přijali, smiluj se nad námi.
Srdce Ježíšovo, odvěká touho všeho tvorstva, smiluj se nad námi.
Srdce Ježíšovo, trpělivé a nejvýš milosrdné, smiluj se nad námi.
Srdce Ježíšovo, bohaté a štědré ke všem, kdo tě vzývají, smiluj se nad námi.
Srdce Ježíšovo, prameni života a svatosti, smiluj se nad námi.
Srdce Ježíšovo, smírná oběti za naše hříchy, smiluj se nad námi.
Srdce Ježíšovo, potupami nasycené, smiluj se nad námi.
Srdce Ježíšovo, pro nepravosti naše ztrýzněné, smiluj se nad námi.
Srdce Ježíšovo, až k smrti poslušné, smiluj se nad námi.
Srdce Ježíšovo, kopím probodené, smiluj se nad námi.
Srdce Ježíšovo, prameni dokonalé útěchy, smiluj se nad námi.
Srdce Ježíšovo, živote náš a naše vzkříšení, smiluj se nad námi.
Srdce Ježíšovo, pokoji náš a naše smíření, smiluj se nad námi.
Srdce Ježíšovo, za hříšníky obětované, smiluj se nad námi.
Srdce Ježíšovo, spáso všech, kdo v tebe doufají, smiluj se nad námi.
Srdce Ježíšovo, naděje všech, kdo v tobě umírají, smiluj se nad námi.
Srdce Ježíšovo, radosti všech svatých, smiluj se nad námi.

Beránku Boží, který snímáš hříchy světa, odpusť nám, Pane.
Beránku Boží, který snímáš hříchy světa, vyslyš nás, Pane.
Beránku Boží, který snímáš hříchy světa, smiluj se nad námi.

℣ Ježíši tichý, srdce pokorného,
℟ přetvoř naše srdce podle Srdce svého.
Modleme se: Všemohoucí věčný Bože, pohleď na Srdce svého milovaného Syna, shlédni na chvály a dostiučinění, které ti přináší za nás hříšníky; usmiř se a odpusť nám, když skrze ně prosíme o tvé milosrdenství. Neboť on s tebou žije a kraluje na věky věků. Amen.`,

  // Czech: line list sourced from prayerbook.weebly.com (Litanie k nejsvětějšímu
  // jménu Ježíš), which maps 1:1 onto the Latin above; the closing collect is
  // Schaller's (Římský misál, 1931, appendix). NOT Kancionál-verified — unlike the other
  // two litanies. The source gives the Agnus Dei as "smiluj se nad námi" ×3; it is
  // rendered here with the three distinct responses to match the Latin, as in the
  // other two litanies. Worth checking against the Kancionál.
  [PRAYER_TYPES.LITANY_HOLY_NAME]: `Pane, smiluj se. 2×
Kriste, smiluj se. 2×
Pane, smiluj se. 2×
Ježíši, uslyš nás.
Ježíši, vyslyš nás.
Bože, náš nebeský Otče, smiluj se nad námi.
Bože Synu, Vykupiteli světa, smiluj se nad námi.
Bože Duchu Svatý, smiluj se nad námi.
Bože v Trojici jediný, smiluj se nad námi.

Ježíši, Synu Boha živého, smiluj se nad námi.
Ježíši, odlesku Otce, smiluj se nad námi.
Ježíši, jase světla věčného, smiluj se nad námi.
Ježíši, králi slávy, smiluj se nad námi.
Ježíši, slunce spravedlnosti, smiluj se nad námi.
Ježíši, Synu Marie Panny, smiluj se nad námi.
Ježíši láskyhodný, smiluj se nad námi.
Ježíši obdivuhodný, smiluj se nad námi.
Ježíši, Bože silný, smiluj se nad námi.
Ježíši, otče budoucího věku, smiluj se nad námi.
Ježíši, anděli velké rady, smiluj se nad námi.
Ježíši nejmocnější, smiluj se nad námi.
Ježíši nejtrpělivější, smiluj se nad námi.
Ježíši nejposlušnější, smiluj se nad námi.
Ježíši tichý a pokorný srdcem, smiluj se nad námi.
Ježíši, milovníku čistoty, smiluj se nad námi.
Ježíši, milovníku náš, smiluj se nad námi.
Ježíši, Bože pokoje, smiluj se nad námi.
Ježíši, původce života, smiluj se nad námi.
Ježíši, příklade ctností, smiluj se nad námi.
Ježíši, horliteli o spásu duší, smiluj se nad námi.
Ježíši, Bože náš, smiluj se nad námi.
Ježíši, útočiště naše, smiluj se nad námi.
Ježíši, otče chudých, smiluj se nad námi.
Ježíši, poklade věřících, smiluj se nad námi.
Ježíši, pastýři dobrý, smiluj se nad námi.
Ježíši, světlo pravé, smiluj se nad námi.
Ježíši, moudrosti věčná, smiluj se nad námi.
Ježíši, dobroto neskonalá, smiluj se nad námi.
Ježíši, cesto naše a živote náš, smiluj se nad námi.
Ježíši, radosti andělů, smiluj se nad námi.
Ježíši, králi patriarchů, smiluj se nad námi.
Ježíši, mistře apoštolů, smiluj se nad námi.
Ježíši, učiteli evangelistů, smiluj se nad námi.
Ježíši, sílo mučedníků, smiluj se nad námi.
Ježíši, světlo vyznavačů, smiluj se nad námi.
Ježíši, čistoto panen, smiluj se nad námi.
Ježíši, koruno všech svatých, smiluj se nad námi.

Milostiv nám buď, odpusť nám, Ježíši.
Milostiv nám buď, vyslyš nás, Ježíši.

Ode všeho zlého, vysvoboď nás, Ježíši.
Od každého hříchu, vysvoboď nás, Ježíši.
Od svého hněvu, vysvoboď nás, Ježíši.
Od úkladů ďáblových, vysvoboď nás, Ježíši.
Od ducha smilného, vysvoboď nás, Ježíši.
Od smrti věčné, vysvoboď nás, Ježíši.
Od zanedbávání tvých vnuknutí, vysvoboď nás, Ježíši.

Pro tajemství svého svatého vtělení, vysvoboď nás, Ježíši.
Pro své narození, vysvoboď nás, Ježíši.
Pro své dětství, vysvoboď nás, Ježíši.
Pro svůj božský život, vysvoboď nás, Ježíši.
Pro své práce, vysvoboď nás, Ježíši.
Pro svou smrtelnou úzkost a utrpení, vysvoboď nás, Ježíši.
Pro svůj kříž a opuštěnost, vysvoboď nás, Ježíši.
Pro své smrtelné mdloby, vysvoboď nás, Ježíši.
Pro svou smrt a pohřeb, vysvoboď nás, Ježíši.
Pro své zmrtvýchvstání, vysvoboď nás, Ježíši.
Pro své nanebevstoupení, vysvoboď nás, Ježíši.
Pro své ustanovení nejsvětější Svátosti oltářní, vysvoboď nás, Ježíši.
Pro své radosti, vysvoboď nás, Ježíši.
Pro svou slávu, vysvoboď nás, Ježíši.

Beránku Boží, který snímáš hříchy světa, odpusť nám, Ježíši.
Beránku Boží, který snímáš hříchy světa, vyslyš nás, Ježíši.
Beránku Boží, který snímáš hříchy světa, smiluj se nad námi, Ježíši.

℣ Ježíši, uslyš nás.
℟ Ježíši, vyslyš nás.
Modleme se: Pane Ježíši Kriste, jenž jsi řekl: Proste a obdržíte, hledejte a naleznete, tlucte a bude vám otevřeno, prosíme, uděl nám žádajícím vroucnost božské lásky tvé, abychom tebe celým srdcem, ústy i skutkem milovali a tebe chváliti nikdy nepřestávali. Uděl nám, Pane, abychom svaté jméno tvé ustavičně ctili a je zároveň i milovali, poněvadž nikdy vedení svého neodnímáš těm, které v pevnosti milování svého vzděláváš. Jenž žiješ a kraluješ na věky věkův. Amen.`,

  // Czech: the standard Merry del Val translation, sourced from
  // ikatolici.cz/kardinal-merry-del-val-litanie-za-pokoru (which matches the
  // Latin 8 + 8 + 7 above line for line). Two departures from that page, to keep
  // the two languages aligned line for line: its ninth desire ("aby se souhlasilo
  // s mými názory") is omitted, since the canonical structure the Latin follows has
  // eight; and the closing "Dej, abych se stále umenšoval" is kept, with Illum
  // opórtet créscere (Jn 3,30) standing in for it on the Latin side. Note also
  // bosekarmelitky.cz carries a longer, differently structured Carmelite variant
  // (20 + 7 + 10) — not this text.
  [PRAYER_TYPES.LITANY_HUMILITY]: `Ježíši tichý, Srdce pokorného, vyslyš mě a učiň srdce moje podle srdce svého.

Od touhy, abych byl vážen, osvoboď mě, Ježíši.
Od touhy, abych byl milován, osvoboď mě, Ježíši.
Od touhy, abych byl oslavován, osvoboď mě, Ježíši.
Od touhy, aby mi byla prokazována čest, osvoboď mě, Ježíši.
Od touhy, abych byl chválen, osvoboď mě, Ježíši.
Od touhy, abych měl přednost před jinými, osvoboď mě, Ježíši.
Od touhy, abych byl žádán o radu, osvoboď mě, Ježíši.
Od touhy, aby lidé chápali a uznávali mou dobrou vůli, osvoboď mě, Ježíši.

Od obav z ponížení, osvoboď mě, Ježíši.
Od obav z opovržení, osvoboď mě, Ježíši.
Od obav z napomenutí a pokárání, osvoboď mě, Ježíši.
Od obav z pomluv, osvoboď mě, Ježíši.
Od obav, abych nebyl opomíjen, osvoboď mě, Ježíši.
Od obav ze zesměšnění, osvoboď mě, Ježíši.
Od obav, aby se mnou nezacházeli nespravedlivě, osvoboď mě, Ježíši.
Od obav, abych nebyl podezírán, osvoboď mě, Ježíši.

Aby jiní byli více milováni než já, Ježíši, dej mi milost po tom toužit.
Aby jiní byli váženi víc než já, Ježíši, dej mi milost po tom toužit.
Aby jiní v očích světa rostli a já se menšil, Ježíši, dej mi milost po tom toužit.
Aby jiní byli vyvoleni a já odsunut stranou, Ježíši, dej mi milost po tom toužit.
Aby jiní byli chváleni a já nepovšimnut, Ježíši, dej mi milost po tom toužit.
Aby se jiným dávala ve všem přednost přede mnou, Ježíši, dej mi milost po tom toužit.
Aby se jiní stali více svatými než já, jen když se já stanu natolik svatým, jak si přeješ ty, Ježíši, dej mi milost po tom toužit.

Dej, abych se stále umenšoval a ty, Ježíši, rostl. Amen.`,

  // Czech: the traditional 24 invocations transcribed from the farni-musle.cz
  // "Rok svatého Josefa 2021" leaflet, cross-checked against prayerbook.weebly.com
  // (both agree line for line). Three additions are ours, since no Czech witness
  // found carries them: "Opora rodin" (Familiárum cólumen — both Czech texts omit
  // that line, though it stands in the Latin), and the wording for two of the 2021
  // invocations. The other 2021 renderings follow oessh.cz ("Ochránce Vykupitele",
  // "Služebníku Kristův", "Služebníku spásy", "Patrone zarmoucených", "Patrone
  // chudých"); that page reads "Průvodce těžkými časy" for Fúlcimen where we use
  // the closer "Podporo v obtížích", and has no Patróne éxsulum at all. The 2021
  // block is therefore NOT verified against an official ČBK translation.
  // The concluding collect is our rendering of the traditional Latin one above;
  // the Czech leaflets instead print the current Missal oration for St Joseph
  // ("Všemohoucí Bože, tys povolal svatého Josefa, aby už od počátku chránil dílo
  // našeho vykoupení…"), which is a different prayer.
  [PRAYER_TYPES.LITANY_ST_JOSEPH]: `Pane, smiluj se. 2×
Kriste, smiluj se. 2×
Pane, smiluj se. 2×
Kriste, uslyš nás.
Kriste, vyslyš nás.
Bože, náš nebeský Otče, smiluj se nad námi.
Bože Synu, Vykupiteli světa, smiluj se nad námi.
Bože Duchu Svatý, smiluj se nad námi.
Bože v Trojici jediný, smiluj se nad námi.

Svatá Maria, oroduj za nás.
Svatý Josefe, oroduj za nás.
Slavný potomku Davidův, oroduj za nás.
Světlo patriarchů, oroduj za nás.
Snoubenče Boží rodičky, oroduj za nás.
Ochránce Vykupitele, oroduj za nás.
Přečistý strážce svaté Panny, oroduj za nás.
Pěstoune Syna Božího, oroduj za nás.
Starostlivý ochránce Kristův, oroduj za nás.
Služebníku Kristův, oroduj za nás.
Služebníku spásy, oroduj za nás.
Hlavo svaté Rodiny, oroduj za nás.
Josefe, vzore spravedlnosti, oroduj za nás.
Josefe, vzore čistoty, oroduj za nás.
Josefe, vzore rozvážnosti, oroduj za nás.
Josefe, vzore statečnosti, oroduj za nás.
Josefe, vzore poslušnosti, oroduj za nás.
Josefe, vzore věrnosti, oroduj za nás.
Zrcadlo trpělivosti, oroduj za nás.
Milovníku chudoby, oroduj za nás.
Vzore pracujících, oroduj za nás.
Ozdobo rodinného života, oroduj za nás.
Ochránce panen, oroduj za nás.
Opora rodin, oroduj za nás.
Podporo v obtížích, oroduj za nás.
Útěcho nešťastných, oroduj za nás.
Naděje nemocných, oroduj za nás.
Patrone vyhnanců, oroduj za nás.
Patrone zarmoucených, oroduj za nás.
Patrone chudých, oroduj za nás.
Patrone umírajících, oroduj za nás.
Odpůrce zlých duchů, oroduj za nás.
Ochránce církve, oroduj za nás.

Beránku Boží, který snímáš hříchy světa, odpusť nám, Pane.
Beránku Boží, který snímáš hříchy světa, vyslyš nás, Pane.
Beránku Boží, který snímáš hříchy světa, smiluj se nad námi.

℣ Ustanovil ho pánem domu svého.
℟ A správcem všeho statku svého.
Modleme se: Bože, tys ve své nevýslovné prozřetelnosti vyvolil svatého Josefa za snoubence své nejsvětější Rodičky; dej, prosíme, ať si ho smíme mít za přímluvce v nebi, když ho na zemi uctíváme jako svého ochránce. Skrze Krista, našeho Pána. Amen.`,

  // Czech: transcribed from modlitba.cz (Litanie k Nejdražší Krvi Páně), the
  // standard translation. That page carries 23 of the 24 invocations — it omits
  // the crowning with thorns — so that one line ("prýštící při trním korunování")
  // comes from the pravover.cz leaflet, which also supplies the three distinct
  // Agnus Dei responses used here (modlitba.cz prints "smiluj se nad námi" ×3).
  // Note pravover.cz otherwise carries a markedly expanded variant (33
  // invocations, and a closing petition for a patriarch) — not this text.
  [PRAYER_TYPES.LITANY_PRECIOUS_BLOOD]: `Pane, smiluj se. 2×
Kriste, smiluj se. 2×
Pane, smiluj se. 2×
Kriste, uslyš nás.
Kriste, vyslyš nás.
Bože, náš nebeský Otče, smiluj se nad námi.
Bože Synu, Vykupiteli světa, smiluj se nad námi.
Bože Duchu Svatý, smiluj se nad námi.
Bože v Trojici jediný, smiluj se nad námi.

Krvi Kristova, Krvi jednorozeného Syna věčného Otce, buď naší spásou.
Krvi Kristova, Krvi vtěleného Slova Božího, buď naší spásou.
Krvi Kristova, Nové a věčné úmluvy, buď naší spásou.
Krvi Kristova, ve smrtelné úzkosti na zem kanoucí, buď naší spásou.
Krvi Kristova, vytrysklá při bičování, buď naší spásou.
Krvi Kristova, prýštící při trním korunování, buď naší spásou.
Krvi Kristova, prolitá na kříži, buď naší spásou.
Krvi Kristova, ceno naší spásy, buď naší spásou.
Krvi Kristova, bez níž není odpuštění, buď naší spásou.
Krvi Kristova, svátostný nápoji a očisto duší, buď naší spásou.
Krvi Kristova, řeko milosrdenství, buď naší spásou.
Krvi Kristova, vítězi nad zlými duchy, buď naší spásou.
Krvi Kristova, statečnosti mučedníků, buď naší spásou.
Krvi Kristova, sílo vyznavačů, buď naší spásou.
Krvi Kristova, z níž klíčí čistota duší, buď naší spásou.
Krvi Kristova, oporo těžce zkoušených, buď naší spásou.
Krvi Kristova, úlevo namáhavě pracujících, buď naší spásou.
Krvi Kristova, potěšení v pláči, buď naší spásou.
Krvi Kristova, naději kajícníků, buď naší spásou.
Krvi Kristova, útěcho umírajících, buď naší spásou.
Krvi Kristova, pokoji a smíre srdcí, buď naší spásou.
Krvi Kristova, záruko věčného života, buď naší spásou.
Krvi Kristova, jež vysvobozuješ duše z očistce, buď naší spásou.
Krvi Kristova, hodná veškeré cti a slávy, buď naší spásou.

Beránku Boží, tys na sebe vzal hříchy světa, odpusť nám, Pane.
Beránku Boží, tys na sebe vzal hříchy světa, vyslyš nás, Pane.
Beránku Boží, tys na sebe vzal hříchy světa, smiluj se nad námi.

℣ Krví svou jsi nás, Pane, vykoupil.
℟ A učinil jsi z nás království Boží.
Modleme se: Všemohoucí věčný Bože, ustanovil jsi svého jednorozeného Syna Vykupitelem světa a chtěl jsi být usmířen jeho krví; prosíme tě proto: dej, ať tak uctíváme tuto cenu své spásy a její mocí jsme uchráněni všeho zla v životě časném, abychom se mohli radovat z jejích plodů v nebi. Neboť on s tebou žije a kraluje na věky věků. Amen.`,

  // ---------------------------------------------------------------------------
  // Czech for the Litany of the Saints: Schallerův Římský misál (1931),
  // appendix, wherever its traditional form has the line — the Kyrie, the
  // deprecations, intercessions, Agnus Dei, Psalm 69, the versicles and all the
  // collects, and every saint it names (asterisks, marking what Holy Saturday
  // omits, dropped; its response, printed once per group, written on each line;
  // the Glória Patri, which it abbreviates, written out). One evident misprint
  // corrected: "Abys myslí našich" → "mysli naše". Its Jakub (one name for both
  // Jacobs) keeps our "Starší" / "Mladší". The saints our fuller Latin adds
  // (Abraham, Moses, Elijah, the later martyrs, doctors, founders and women,
  // Leo, Anne, Louis, …) are OUR OWN rendering, in standard Czech name forms.
  // ---------------------------------------------------------------------------

  [PRAYER_TYPES.LITANY_SAINTS_SUPPLICATIO]: `Pane, smiluj se nad námi. 2×
Kriste, smiluj se nad námi. 2×
Pane, smiluj se nad námi. 2×
Kriste, uslyš nás.
Kriste, vyslyš nás.
Otče s nebes, Bože, smiluj se nad námi.
Synu, Vykupiteli světa, Bože, smiluj se nad námi.
Duše Svatý, Bože, smiluj se nad námi.
Svatá Trojice, jeden Bože, smiluj se nad námi.`,

  [PRAYER_TYPES.LITANY_SAINTS_MARY]: `Svatá Maria, oroduj za nás.
Svatá Boží Rodičko, oroduj za nás.
Svatá Panno Panen, oroduj za nás.
Svatý Michaeli, oroduj za nás.
Svatý Gabrieli, oroduj za nás.
Svatý Rafaeli, oroduj za nás.
Všichni svatí Andělé i Archandělé, orodujte za nás.
Všichni svatí blahoslavených Duchů řádové, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_PATRIARCHS]: `Svatý Abraháme, oroduj za nás.
Svatý Mojžíši, oroduj za nás.
Svatý Eliáši, oroduj za nás.
Svatý Jene Křtiteli, oroduj za nás.
Svatý Josefe, oroduj za nás.
Všichni svatí Patriarchové a Proroci, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_APOSTLES]: `Svatý Petře, oroduj za nás.
Svatý Pavle, oroduj za nás.
Svatý Ondřeji, oroduj za nás.
Svatý Jakube Starší, oroduj za nás.
Svatý Jene, oroduj za nás.
Svatý Tomáši, oroduj za nás.
Svatý Jakube Mladší, oroduj za nás.
Svatý Filipe, oroduj za nás.
Svatý Bartoloměji, oroduj za nás.
Svatý Matouši, oroduj za nás.
Svatý Šimone, oroduj za nás.
Svatý Tadeáši, oroduj za nás.
Svatý Matěji, oroduj za nás.
Svatý Barnabáši, oroduj za nás.
Svatý Lukáši, oroduj za nás.
Svatý Marku, oroduj za nás.
Všichni svatí Apoštolové a Evangelisté, orodujte za nás.
Všichni svatí Učedníci Páně, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_MARTYRS]: `Všecka svatá Neviňátka, orodujte za nás.
Svatý Štěpáne, oroduj za nás.
Svatý Ignáci z Antiochie, oroduj za nás.
Svatý Polykarpe, oroduj za nás.
Svatý Justine, oroduj za nás.
Svatý Vavřinče, oroduj za nás.
Svatý Vincenci, oroduj za nás.
Svatí Fabiáne a Šebastiáne, orodujte za nás.
Svatí Jene a Pavle, orodujte za nás.
Svatí Kosmo a Damiáne, orodujte za nás.
Svatí Gervási a Protási, orodujte za nás.
Svatý Cypriáne, oroduj za nás.
Svatý Bonifáci, oroduj za nás.
Svatý Stanislave, oroduj za nás.
Svatý Tomáši Beckete, oroduj za nás.
Svatí Jane Fishere a Tomáši More, orodujte za nás.
Svatý Pavle Miki, oroduj za nás.
Svatí Jane de Brébeufe a Izáku Joguesi, orodujte za nás.
Svatý Petře Chanele, oroduj za nás.
Svatý Karle Lwango, oroduj za nás.
Svaté Perpetuo a Felicito, orodujte za nás.
Svatá Marie Goretti, oroduj za nás.
Všichni svatí Mučedníci, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_BISHOPS]: `Svatý Silvestře, oroduj za nás.
Svatý Lve, oroduj za nás.
Svatý Řehoři, oroduj za nás.
Svatý Ambroži, oroduj za nás.
Svatý Augustine, oroduj za nás.
Svatý Jeronyme, oroduj za nás.
Svatý Athanasie, oroduj za nás.
Svatí Bazile a Řehoři Naziánský, orodujte za nás.
Svatý Jane Zlatoústý, oroduj za nás.
Svatý Martine, oroduj za nás.
Svatý Mikuláši, oroduj za nás.
Svatý Patriku, oroduj za nás.
Svatí Cyrile a Metoději, orodujte za nás.
Svatý Karle Boromejský, oroduj za nás.
Svatý Františku Saleský, oroduj za nás.
Svatý Pie Desátý, oroduj za nás.
Všichni svatí Biskupové a Vyznavači, orodujte za nás.
Všichni svatí Učitelové, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_RELIGIOUS]: `Svatý Antoníne, oroduj za nás.
Svatý Benedikte, oroduj za nás.
Svatý Bernarde, oroduj za nás.
Svatý Dominiku, oroduj za nás.
Svatý Františku, oroduj za nás.
Svatý Tomáši Akvinský, oroduj za nás.
Svatý Ignáci z Loyoly, oroduj za nás.
Svatý Františku Xaverský, oroduj za nás.
Svatý Vincenci de Paul, oroduj za nás.
Svatý Jene Maria Vianneyi, oroduj za nás.
Svatý Jane Bosco, oroduj za nás.
Všichni svatí Kněží a Levité, orodujte za nás.
Všichni svatí Mnichové a Poustevníci, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_WOMEN]: `Svatá Anno, oroduj za nás.
Svatá Maří Magdaleno, oroduj za nás.
Svatá Háto, oroduj za nás.
Svatá Lucie, oroduj za nás.
Svatá Anežko, oroduj za nás.
Svatá Cecilie, oroduj za nás.
Svatá Kateřino, oroduj za nás.
Svatá Anastasie, oroduj za nás.
Svatá Kateřino Sienská, oroduj za nás.
Svatá Terezie z Avily, oroduj za nás.
Svatá Růženo z Limy, oroduj za nás.
Všechny svaté Panny a Vdovy, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_LAITY]: `Svatý Ludvíku, oroduj za nás.
Svatá Moniko, oroduj za nás.
Svatá Alžběto Uherská, oroduj za nás.
Všichni Svatí a Světice Boží, přimlouvejte se za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_CHRIST]: `Milostiv buď, odpusť nám, Pane.
Milostiv buď, uslyš nás, Pane.
Ode všeho zlého, vysvoboď nás, Pane.
Od všelikého hříchu, vysvoboď nás, Pane.
Od hněvu svého, vysvoboď nás, Pane.
Od náhlé a nenadálé smrti, vysvoboď nás, Pane.
Od úkladů ďáblových, vysvoboď nás, Pane.
Od hněvu, nenávisti i ode vší zlé vůle, vysvoboď nás, Pane.
Od ducha smilného, vysvoboď nás, Pane.
Od blesku a bouře, vysvoboď nás, Pane.
Od metly zemětřesení, vysvoboď nás, Pane.
Od moru, hladu a války, vysvoboď nás, Pane.
Od věčné smrti, vysvoboď nás, Pane.
Pro tajemství svatého vtělení svého, vysvoboď nás, Pane.
Pro příchod svůj, vysvoboď nás, Pane.
Pro narození své, vysvoboď nás, Pane.
Pro křest a svatý půst svůj, vysvoboď nás, Pane.
Pro kříž a umučení své, vysvoboď nás, Pane.
Pro smrt a pohřeb svůj, vysvoboď nás, Pane.
Pro svaté vzkříšení své, vysvoboď nás, Pane.
Pro podivuhodné nanebevstoupení své, vysvoboď nás, Pane.
Pro příchod Utěšitele Ducha Svatého, vysvoboď nás, Pane.
V den soudný, vysvoboď nás, Pane.`,

  [PRAYER_TYPES.LITANY_SAINTS_NECESSITIES]: `My hříšníci, tě prosíme, uslyš nás.
Abys nás ušetřil, tě prosíme, uslyš nás.
Abys nám odpustil, tě prosíme, uslyš nás.
Abys nás k pravému pokání přivésti ráčil, tě prosíme, uslyš nás.
Abys svatou Církev svou říditi a zachovati ráčil, tě prosíme, uslyš nás.
Abys náměstka Apoštolského a veškeren církevní stav ve svatém náboženství zachovati ráčil, tě prosíme, uslyš nás.
Abys nepřátele Církve svaté pokořiti ráčil, tě prosíme, uslyš nás.
Abys králům a knížatům křesťanským pokoje a svornosti dáti ráčil, tě prosíme, uslyš nás.
Abys všemu lidu křesťanskému pokoje a jednoty uděliti ráčil, tě prosíme, uslyš nás.
Abys všecky bloudící k jednotě Církve nazpět povolati a veškeré pohany k světlu Evangelia přivésti ráčil, tě prosíme, uslyš nás.
Abys nás ve svaté službě své posilniti a zachovati ráčil, tě prosíme, uslyš nás.
Abys mysli naše k nebeským žádostem pozdvihnul, tě prosíme, uslyš nás.
Abys všem dobrodincům našim věčnými statky odplatil, tě prosíme, uslyš nás.
Abys duše naše, bratří, příbuzných a dobrodinců našich od věčného zatracení vytrhl, tě prosíme, uslyš nás.
Abys úrodu zemskou dáti a zachovati ráčil, tě prosíme, uslyš nás.
Abys všem věřícím zemřelým odpočinutí věčné dáti ráčil, tě prosíme, uslyš nás.
Abys nás vyslyšeti ráčil, tě prosíme, uslyš nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_CONCLUSION]: `Synu Boží, tě prosíme, uslyš nás.
Beránku Boží, který snímáš hříchy světa, odpusť nám, Pane.
Beránku Boží, který snímáš hříchy světa, uslyš nás, Pane.
Beránku Boží, který snímáš hříchy světa, smiluj se nad námi.
Kriste, uslyš nás.
Kriste, vyslyš nás.
Pane, smiluj se nad námi. 2×
Kriste, smiluj se nad námi. 2×
Pane, smiluj se nad námi. 2×`,

  [PRAYER_TYPES.LITANY_SAINTS_PSALM]: `{r}Otče náš (potichu){/r}
℣ A neuveď nás v pokušení.
℟ Ale zbav nás od zlého.

{r}Žalm 69{/r}
℣ Bože, k pomoci mé shlédni;
℟ Hospodine, přispěj mi na pomoc.
℣ Zahanbeni ať jsou a zastydí se,
℟ kteří hledají bezživotí mého.
℣ Ustupte nazpět a zarděte se,
℟ kteří si žádají neštěstí mého.
℣ Ať se ihned odvrátí, zardívajíce se,
℟ kteří se mi posmívají.
℣ Nechať plesají a radují se nad tebou,
℟ kteří hledají tebe.
℣ Nechať říkají vždy: „Veleslaven budiž Pán!“
℟ ti, kteří touží po pomoci tvé.
℣ Já pak chudý a nuzný jsem,
℟ Bože, spomoziž mi.
℣ Pomocník můj a vysvoboditel můj jsi ty.
℟ Pane, neprodlévej.
℣ Sláva Otci i Synu i Duchu Svatému.
℟ Jako byla na počátku, i nyní i vždycky a na věky věků. Amen.`,

  [PRAYER_TYPES.LITANY_SAINTS_VERSICLES]: `℣ Spasiž služebníky své.
℟ Bože můj, doufající v tebe.
℣ Budiž nám, Pane, věží mocnou.
℟ Proti tváři nepřítele.
℣ Nic neprospívej nepřítel nad námi.
℟ A syn nepravosti nepřičiniž nám škody.
℣ Pane, nečiň nám podle hříchů našich.
℟ Aniž podle nepravostí našich odplácej nám.
℣ Modleme se za nejvyššího biskupa svého N.
℟ Hospodin zachovejž a oživuj ho, a blaženým učiň ho na zemi a nevydávej ho v ruce nepřátel jeho.
℣ Modleme se za dobrodince své.
℟ Odplatiti rač, Pane, všem dobře nám činícím pro jméno tvé životem věčným. Amen.
℣ Modleme se za zemřelé věřící.
℟ Odpočinutí věčné dejž jim, Pane, a světlo věčné ať jim svítí.
℣ Ať odpočívají v pokoji.
℟ Amen.
℣ Modleme se za své bratry nepřítomné.
℟ Spasiž služebníky své, Bože můj, doufající v tebe.
℣ Sešli jim, Pane, pomoc se svatyně.
℟ A se Sionu ochraňuj je.
℣ Pane, vyslyš modlitbu mou.
℟ A volání mé k tobě přijď.
℣ Pán s vámi.
℟ I s duchem tvým.`,

  [PRAYER_TYPES.LITANY_SAINTS_COLLECTS]: `Modleme se.
Bože, jehož vlastností je smilovávati se vždycky a odpouštěti, přijmi úpěnlivou modlitbu naši, aby nás a všecky služebníky tvé, které pouto hříchů svírá, slitování tvé dobrotivosti milostivě vyprostilo.
Vyslyš, prosíme, Pane, prosby pokorně tě žádajících a vyznávajícím se tobě hříchy promiň, abys zároveň nám odpuštění daroval i pokoj.
Nevýslovné milosrdenství své nám, Pane, laskavě prokaž, abys nás spolu i z hříchů všech vyprostil i od trestů za ně zasloužených vytrhl.
Bože, jenž vinou urážen, pokáním však usmířen býváš, na prosby snažně prosícího lidu svého milostivě shlédni a metly hněvu svého, jichž za hříchy své zasluhujeme, odvrať.
Všemohoucí věčný Bože, smiluj se nad služebníkem svým, Papežem naším N., a řiď jej podle laskavosti své na cestu věčné spásy, aby s tvou milostí, co se ti líbí, žádal a s veškerou silou dokonal.
Bože, od něhož svaté touhy, pravé rady a spravedliví skutkové pocházejí, dej služebníkům svým ten pokoj, jehož svět dáti nemůže, aby i srdce naše přikázáním tvým oddána, i časy naše pod ochranou tvou po odvrácení strachu nepřátelského klidny byly.
Spaluj ohněm Ducha Svatého ledví naše a srdce naše, Pane, abychom ti cudným tělem sloužili a čistým srdcem se líbili.
Bože, všech věřících Stvořiteli a Vykupiteli, uděl duším svých služebníků a služebnic odpuštění všech hříchů, aby prominutí, kterého si vždycky žádali, pokornými prosbami dosáhli.
Činy naše, prosíme, Pane, vnukáním svým předcházej a pomocí provázej, aby všecka naše modlitba a práce od tebe vždy se začínala a začata, tebou skončena byla.
Všemohoucí věčný Bože, jenž nad živými vládneš zároveň i nad mrtvými a smilováváš se nade všemi, jež věrou a skutky jednou svými býti předvídáš: pokorně tebe vzýváme, aby ti, za něž vysílati modlitby jsme si umínili, a které buď časný věk v těle dosud zdržuje, nebo budoucí zbavené těla již přijal, na přímluvu všech Svatých tvých z milostivé dobrotivosti tvé dosáhli odpuštění všech hříchů. Skrze Pána našeho Ježíše Krista. Amen.

℣ Pán s vámi.
℟ I s duchem tvým.
℣ Vyslyš nás všemohoucí a milosrdný Hospodin.
℟ Amen.
℣ A duše věrných zemřelých nechť pro milosrdenství Boží odpočívají v pokoji.
℟ Amen.`,

  // Chaplet of Divine Mercy. The core prayers follow kmbm.cz and
  // abcsvatych.com (the Kongregace Milosrdných bratří and a widely copied
  // text; they differ only in capitals and "Duši i/a Božství"). The opening
  // prayer and Ó Krvi a Vodo follow the Hour of Mercy service of the
  // Augustinian abbey in Brno (Dn 1319, 84); the closing prayer the Minorites
  // in Opava (Dn 950), without its added "Neboť ty žiješ…" ending.
  [PRAYER_TYPES.CHAPLET_OPENING]: `Zemřel jsi, Ježíši, ale pro duše vytryskl pramen života a pro celý svět se otevřelo moře milosrdenství. Zřídlo života, nevyčerpatelné Boží milosrdenství, obejmi celý svět a vylej se na nás.`,

  [PRAYER_TYPES.CHAPLET_BLOOD_WATER]: `Ó Krvi a Vodo, která jsi vytryskla ze Srdce Ježíšova jako zdroj milosrdenství pro nás, důvěřuji ti.`,

  [PRAYER_TYPES.CHAPLET_ETERNAL_FATHER]: `Věčný Otče, obětuji ti Tělo a Krev, Duši i Božství tvého nejmilejšího Syna a našeho Pána Ježíše Krista na smír za hříchy naše i celého světa.`,

  [PRAYER_TYPES.CHAPLET_PASSION]: `Pro jeho bolestné utrpení buď milosrdný k nám i k celému světu.`,

  [PRAYER_TYPES.CHAPLET_TRISAGION]: `Svatý Bože, Svatý Silný, Svatý Nesmrtelný, smiluj se nad námi a nad celým světem.`,

  [PRAYER_TYPES.CHAPLET_CLOSING]: `Věčný Bože, jehož milosrdenství je nevyčerpatelné a poklad slitování nepřeberný, shlédni na nás s laskavostí a rozhojni v nás své milosrdenství, abychom v těžkých chvílích nezoufali a neklesali na duchu, ale poddali se s velkou důvěrou tvé svaté vůli, která je láska a milosrdenství samo.`,

  [PRAYER_TYPES.CHAPLET_TRUST]: `Ježíši, důvěřuji ti.`,

  // Sedm bolestí a radostí svatého Josefa. The seven headings are OUR OWN
  // TRANSLATION of the Latin: the one Czech text in circulation (FATYM,
  // farnost Čáslav) is a modern paraphrase with its own petitions, not the
  // Latin. Vírginum custos follows spolcs.cz (2016), with lower-case pronouns
  // as elsewhere here.
  [PRAYER_TYPES.IOSEPH_1]: ioseph("I. Pochybnost o Marii a andělovo poselství.", PATER_NOSTER_CS),
  [PRAYER_TYPES.IOSEPH_2]: ioseph("II. Chudoba Kristova narození a narození samo.", PATER_NOSTER_CS),
  [PRAYER_TYPES.IOSEPH_3]: ioseph("III. Kristova obřízka a dání jména Ježíš.", PATER_NOSTER_CS),
  [PRAYER_TYPES.IOSEPH_4]: ioseph("IV. Simeonovo proroctví o pádu a povstání mnohých v Izraeli.", PATER_NOSTER_CS),
  [PRAYER_TYPES.IOSEPH_5]: ioseph("V. Útěk do Egypta a pád model.", PATER_NOSTER_CS),
  [PRAYER_TYPES.IOSEPH_6]: ioseph("VI. Návrat z Egypta a život s Ježíšem a Marií.", PATER_NOSTER_CS),
  [PRAYER_TYPES.IOSEPH_7]: ioseph("VII. Ztráta Ježíše a jeho nalezení v chrámě.", PATER_NOSTER_CS),

  [PRAYER_TYPES.IOSEPH_VIRGINUM_CUSTOS]: `Ó strážce a otče panen, svatý Josefe, jehož věrné stráži samotná nevinnost Ježíš Kristus a Panna všech panen Maria svěřeni byli! Tebe skrze tento dvojí nejdražší tobě svěřený poklad, skrze Ježíše a Marii, snažně prosím, abys mne od vší nečistoty uchránil a učinil, abych neposkvrněnou myslí, nevinným srdcem a čistým tělem Ježíši a Marii vždy v co největší čistotě sloužil(a). Amen.`,
};

// English counterpart of the shared Salve Regína antiphon (see SALVE_REGINA_ANTIPHON).
const SALVE_REGINA_ANTIPHON_EN = `Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us. And after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.

℣ Pray for us, O holy Mother of God.
℟ That we may be made worthy of the promises of Christ.`;

// ---------------------------------------------------------------------------
// English counterparts of the Latin prayer texts — OUR OWN RENDERING, not a
// transcription. Unlike the Czech (much of which is sourced verbatim from the
// Kancionál and the app's source PDFs), no English booklet was available: these
// follow the received traditional English forms of each prayer, kept line for
// line with the Latin so the card's LA↔EN toggle never changes the structure.
// Treat them like the BRIGIT_* and Czech Litany-of-the-Saints entries: if a
// trustworthy English edition is ever obtained, replace these verbatim.
//
// SPOT-CHECKED against online witnesses after the fact (not transcribed from
// them). Verified line for line, no differences of substance: the Litany of
// Loreto against vatican.va (incl. the three 2020 invocations and their
// positions); the Litany of the Saints against preces-latinae.org, the same
// page the Latin came from; the Precious Blood and the Holy Name against EWTN;
// the Litany of Humility against the Merry del Val text at EWTN, which the
// Czech here also follows. St. Joseph matches the traditional 1909 English —
// the USCCB's 2021 translation modernizes nine invocations (Pure Guardian,
// Provider for the Son of God, Cornerstone of families, …); the traditional
// wording is kept deliberately, since the Latin and Czech here are traditional
// too. Remaining differences from those witnesses are synonym-level renderings
// of the same Latin and are kept where ours tracks the Latin more closely
// (e.g. "immeasurable" for immensus, "freeing souls from the depths of
// purgatory" for de lacu purgatórii).
//
// Second pass, also spot-checked: the Nicene Creed (replaced outright with the
// current Roman Missal / ICEL 2011 text, to match the Czech here, which is
// likewise the current missal), the Angelus, Regina Cæli, Sub tuum præsídium,
// Ánima Christi, and Psalm 69 in the Litany of the Saints — whose ℣/℟ split was
// corrected to follow the Latin's, as the Czech already did.
//
// Third pass. The Litany of the Saints' closing versicles and ten collects
// were our own translation; they now follow the traditional thee/thou text at
// salvemariaregina.info (Prayers/Rogation.html — the page names no printed
// source). Kept from the Latin rather than that page: "N." alone (it adds
// "(Bishop)"), the short "Through our Lord Jesus Christ. Amen." our Latin
// carries, "The Lord be with you" (it has "thee"), and the final versicle
// without its "and the intercession of Mary", which the Latin does not have.
// The Leonine collect now follows catholic.org (prayer 3238). Angele Dei
// matches the received "God's love" form; Réquiem follows our Latin
// (Requiéscant in pace) rather than the longer catechism ending; the Decálogus
// is the traditional catechetical formula.
//
// The two Marian antiphons, Alma Redemptóris and Ave Regína Cælórum, take
// their English from the Liturgy of the Hours (ICEL 1973–75, Night Prayer;
// checked against a "Night Prayer from the Liturgy of the Hours" booklet).
// That edition gives the Alma in prose and in "you", and the Ave Regína as the
// rhymed "Hail, O Queen of heaven enthroned", so neither tracks the Latin line
// for line. Only the antiphon bodies changed; the seasonal versicles and
// collects that follow them are unchanged.
//
// STILL NOT checked against any witness: the BRIGIT_* prayers, which are a
// translation of our own text (no authoritative original exists).
//
// House style throughout: "Holy Spirit" (not "Holy Ghost") and lower-case
// thee/thy/thou, where the printed witnesses capitalize divine pronouns.
// ---------------------------------------------------------------------------
const PATER_NOSTER_EN = `Our Father, who art in heaven, hallowed be thy name. Thy kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.`;

export const PRAYERS_EN: Record<StaticPrayerType, string> = {
  [PRAYER_TYPES.SIGN_OF_CROSS]: `In the name ☩ of the Father, and of the Son, and of the Holy Spirit. Amen.`,

  [PRAYER_TYPES.CREED]: `I believe in God, the Father almighty, Creator of heaven and earth. And in Jesus Christ, his only Son, our Lord; who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from thence he shall come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.`,

  [PRAYER_TYPES.OUR_FATHER]: PATER_NOSTER_EN,

  [PRAYER_TYPES.GLORY_BE]: `Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.`,

  [PRAYER_TYPES.FATIMA]: `O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to heaven, especially those most in need of thy mercy.`,

  [PRAYER_TYPES.SALVE_REGINA]: `${SALVE_REGINA_ANTIPHON_EN}

Let us pray:
O God, whose only-begotten Son, by his life, death and resurrection, has purchased for us the rewards of eternal salvation: grant, we beseech thee, that meditating upon these mysteries of the most holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise. Through the same Christ our Lord. Amen.`,

  [PRAYER_TYPES.SALVE_REGINA_LEONINE]: SALVE_REGINA_ANTIPHON_EN,

  [PRAYER_TYPES.LEONINE_OREMUS]: `Let us pray. O God, our refuge and our strength, look down with favour on thy people who cry to thee; and through the intercession of the glorious and immaculate Virgin Mary, Mother of God, of Saint Joseph her spouse, of thy blessed Apostles Peter and Paul, and of all the saints, in mercy and goodness hear our prayers for the conversion of sinners, and for the liberty and exaltation of our holy Mother the Church. Through the same Christ our Lord. Amen.`,

  [PRAYER_TYPES.ST_MICHAEL]: `Saint Michael the Archangel, defend us in battle; be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the heavenly host, by the power of God, thrust into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen.`,

  [PRAYER_TYPES.COR_IESU]: `℣ Most Sacred Heart of Jesus.
℟ Have mercy on us.`,

  // Seven Prayers of St. Bridget — TRANSLATION, not a sourced text. See the note
  // in PRAYERS above the Latin BRIGIT_* entries; the English, like the Czech, is
  // our own rendering of the same content.
  [PRAYER_TYPES.BRIGIT_OPENING]: `O Jesus, I now wish to pray the Lord's Prayer seven times in union with that love with which thou didst sanctify this prayer in thy Heart. Take it from my lips into thy divine Heart; amend and perfect it, that it may bring the Most Holy Trinity as much honour and joy as thou thyself didst render to it on earth by this prayer. May it overflow upon thy most sacred Humanity, to the honour and glory of thy Wounds and of the precious Blood that thou didst pour forth from them. Amen.`,

  [PRAYER_TYPES.BRIGIT_CIRCUMCISION]: `O Jesus, divine lover of our souls, in honour of that first shedding of thy precious Blood which thou didst suffer for us at thy Circumcision, deliver me from every sin, mortal and venial, and protect me against the dangers and the enemies of my salvation. Amen.`,

  [PRAYER_TYPES.BRIGIT_AGONY]: `O Jesus, divine lover of our souls, in honour of that fearful agony which thou didst endure in the garden of Olives, when thy most sacred Body streamed with a sweat of blood, defend me against all the enemies of my salvation, visible and invisible, and grant me the grace of a happy death. Amen.`,

  [PRAYER_TYPES.BRIGIT_SCOURGING]: `O Jesus, divine lover of our souls, in honour of that precious Blood which thou didst shed in thy most cruel scourging, deliver me, I beseech thee, from the punishments my sins have deserved, and give me patience in all the trials of this life. Amen.`,

  [PRAYER_TYPES.BRIGIT_THORNS]: `O Jesus, divine lover of our souls, in honour of that Blood which thou didst pour forth from thy sacred head at the crowning with thorns, deliver me from all evil thoughts and from pride, and grant that I may cleave to thee always in mind and heart. Amen.`,

  [PRAYER_TYPES.BRIGIT_CROSS]: `O Jesus, divine lover of our souls, in honour of that Blood which thou didst shed while carrying the Cross to Calvary, grant me true repentance and the patience to bear my cross daily, following thee faithfully. Amen.`,

  [PRAYER_TYPES.BRIGIT_CRUCIFIXION]: `O Jesus, divine lover of our souls, in honour of that precious Blood which thou didst pour forth from the Wounds of thy hands and feet upon the Cross, have mercy on me, and by those streams of thy Blood save my soul in the hour of my death. Amen.`,

  [PRAYER_TYPES.BRIGIT_PIERCING]: `O Jesus, divine lover of our souls, in honour of that Blood and water which flowed from thy opened side and Heart, receive me into thy most sacred Heart, and by this last outpouring lead me and all souls into eternal glory. Amen.`,

  // Current English Roman Missal (ICEL 2011) — the counterpart of the Czech
  // here, which is likewise the current missal text.
  [PRAYER_TYPES.NICENE_CREED]: `I believe in one God, the Father almighty, maker of heaven and earth, of all things visible and invisible. I believe in one Lord Jesus Christ, the Only Begotten Son of God, born of the Father before all ages. God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through him all things were made. For us men and for our salvation he came down from heaven, and by the Holy Spirit was incarnate of the Virgin Mary, and became man. For our sake he was crucified under Pontius Pilate, he suffered death and was buried, and rose again on the third day in accordance with the Scriptures. He ascended into heaven and is seated at the right hand of the Father. He will come again in glory to judge the living and the dead and his kingdom will have no end. I believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is adored and glorified, who has spoken through the prophets. I believe in one, holy, catholic and apostolic Church. I confess one Baptism for the forgiveness of sins and I look forward to the resurrection of the dead and the life of the world to come. Amen.`,

  [PRAYER_TYPES.SUB_TUUM]: `We fly to thy protection, O holy Mother of God. Despise not our petitions in our necessities, but deliver us always from all dangers, O glorious and blessed Virgin. Our Lady, our mediatrix, our advocate, reconcile us to thy Son, commend us to thy Son, present us to thy Son.`,

  [PRAYER_TYPES.ANGELE_DEI]: `Angel of God, my guardian dear, to whom God's love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen.`,

  [PRAYER_TYPES.REQUIEM]: `Eternal rest grant unto them, O Lord.
And let perpetual light shine upon them.
May they rest in peace. Amen.`,

  [PRAYER_TYPES.DECALOGUE]: `1. Thou shalt not have strange gods before me.
2. Thou shalt not take the name of the Lord thy God in vain.
3. Remember that thou keep holy the Lord's day.
4. Honour thy father and thy mother.
5. Thou shalt not kill.
6. Thou shalt not commit adultery.
7. Thou shalt not steal.
8. Thou shalt not bear false witness against thy neighbour.
9. Thou shalt not covet thy neighbour's wife.
10. Thou shalt not covet thy neighbour's goods.`,

  // De profúndis: the Douay-Rheims psalm (drbo.org); the versicles and
  // collect as in the Litany of the Saints.
  [PRAYER_TYPES.DE_PROFUNDIS]: `Out of the depths I have cried to thee, O Lord: Lord, hear my voice.
Let thy ears be attentive to the voice of my supplication.
If thou, O Lord, wilt mark iniquities: Lord, who shall stand it?
For with thee there is merciful forgiveness: and by reason of thy law, I have waited for thee, O Lord.
My soul hath relied on his word: my soul hath hoped in the Lord.
From the morning watch even until night, let Israel hope in the Lord.
Because with the Lord there is mercy: and with him plentiful redemption.
And he shall redeem Israel from all his iniquities.

℣ Eternal rest grant unto them, O Lord.
℟ And let perpetual light shine upon them.
℣ From the gate of hell.
℟ Deliver their souls, O Lord.
℣ May they rest in peace.
℟ Amen.
℣ O Lord, hear my prayer.
℟ And let my cry come unto thee.

Let us pray.
O God, the Creator and Redeemer of all the faithful, give to the souls of thy servants departed the remission of all their sins: that, through pious supplication, they may obtain the pardon which they have always desired. Who livest and reignest world without end.
℟ Amen.`,

  // Dies iræ — W. J. Irons' verse translation as printed in the Saint Andrew
  // Daily Missal (Lefebvre), Mass for the Dead, beside the Latin line by line.
  [PRAYER_TYPES.DIES_IRAE]: `Day of wrath! O day of mourning,
See fulfilled the prophets' warning;
Heaven and earth in ashes burning.

Oh, what fear man's bosom rendeth
When from heaven the Judge descendeth,
On whose sentence all dependeth!

Wondrous sound the trumpet flingeth,
Through earth's sepulchres it ringeth,
All before the throne it bringeth.

Death is struck, and nature quaking,
All creation is awaking,
To its Judge an answer making.

Lo! the book exactly worded,
Wherein all hath been recorded;
Thence shall judgment be awarded.

When the Judge His seat attaineth,
And each hidden deed arraigneth,
Nothing unavenged remaineth.

What shall I, frail man, be pleading?
Who for me be interceding,
When the just are mercy needing?

King of majesty tremendous,
Who dost free salvation send us,
Fount of pity, then befriend us!

Think, good Jesus, my salvation
Caused Thy wondrous Incarnation;
Leave me not to reprobation.

Faint and weary Thou hast sought me,
On the cross of suffering bought me;
Shall such grace be vainly brought me?

Righteous Judge! for sin's pollution
Grant Thy gift of absolution,
Ere that day of retribution.

Guilty, now I pour my moaning,
All my shame with anguish owning;
Spare, O God, Thy suppliant groaning.

Thou the sinful woman savedst;
Thou the dying thief forgavest;
And to me a hope vouchsafest.

Worthless are my prayers and sighing;
Yet, good Lord, in grace complying,
Rescue me from fires undying.

With Thy favored sheep O place me,
Nor among the goats abase me,
But to Thy right hand upraise me.

While the wicked are confounded,
Doomed to flames of woe unbounded,
Call me with Thy saints surrounded.

Low I kneel, with heart-submission,
See, like ashes, my contrition;
Help me in my last condition.

Ah! that day of tears and mourning!
From the dust of earth returning
Man for judgment must prepare him.
Spare, O God, in mercy spare him!
Lord, all pitying, Jesu blest,
Grant them Thine eternal rest. Amen.`,

  // Ordo Missæ and the sequences: the Saint Andrew Daily Missal (Lefebvre),
  // as printed beside the Latin. Its sequences are the received verse
  // translations (Caswall's Stabat Mater, Veni Sancte Spíritus and Lauda Sion),
  // kept stanza for stanza with the Latin; the Easter sequence's lines are
  // joined to match the Latin's eight. The Kyrie drops the missal's
  // explanatory "(God the Father)" glosses.
  [PRAYER_TYPES.CONFITEOR]: `I confess to almighty God, to blessed Mary ever Virgin, to blessed Michael the archangel, to blessed John the Baptist, to the holy apostles Peter and Paul, to all the saints, and to you, Father, that I have sinned exceedingly in thought, word and deed, through my fault, through my fault, through my most grievous fault. Therefore I beseech blessed Mary ever Virgin, blessed Michael the archangel, blessed John the Baptist, the holy apostles Peter and Paul, all the saints, and you, Father, to pray to the Lord our God for me.

℣ May almighty God have mercy upon you, forgive you your sins, and bring you to life everlasting.
℟ Amen.
℣ May the almighty and merciful Lord grant us pardon, absolution, and remission of our sins.
℟ Amen.`,

  [PRAYER_TYPES.KYRIE]: `Lord, have mercy on us. 3×
Christ, have mercy on us. 3×
Lord, have mercy on us. 3×`,

  [PRAYER_TYPES.GLORIA_IN_EXCELSIS]: `Glory to God in the highest. And on earth peace to men of good will. We praise Thee. We bless Thee. We adore Thee. We glorify Thee. We give thanks to Thee for Thy great glory. O Lord God, heavenly King, God the Father almighty. O Lord, the only-begotten Son, Jesus Christ. O Lord God, Lamb of God, Son of the Father. Thou who takest away the sins of the world, have mercy upon us. Thou who takest away the sins of the world, receive our prayer. Thou who sittest at the right hand of the Father, have mercy upon us. For Thou only art holy. Thou only art the Lord. Thou only, O Jesus Christ, art most high. With the Holy Ghost, in the glory of God the Father. Amen.`,

  [PRAYER_TYPES.SANCTUS]: `Holy, holy, holy, Lord God of hosts. Heaven and earth are full of Thy glory. Hosanna in the highest.
Blessed is He that cometh in the name of the Lord. Hosanna in the highest.`,

  [PRAYER_TYPES.AGNUS_DEI]: `Lamb of God, who takest away the sins of the world, have mercy on us.
Lamb of God, who takest away the sins of the world, have mercy on us.
Lamb of God, who takest away the sins of the world, grant us peace.`,

  [PRAYER_TYPES.DOMINE_NON_SUM_DIGNUS]: `Lord, I am not worthy that Thou shouldst enter under my roof: say but the word and my soul shall be healed. 3×`,

  // The priest's Communion prayers: OCR of the Saint Andrew missal, joined.
  [PRAYER_TYPES.PRAEFATIO_DIALOG]: `℣ World without end.
℟ Amen.
℣ The Lord be with you.
℟ And with thy spirit.
℣ Lift up your hearts.
℟ We lift them up unto the Lord.
℣ Let us give thanks to the Lord our God.
℟ It is meet and right.`,

  [PRAYER_TYPES.ANTE_COMMUNIONEM]: `O Lord Jesus Christ, who saidst to Thy Apostles, Peace I leave with you, My peace I give unto you; look not upon my sins, but upon the faith of Thy Church; and vouchsafe to grant her peace and unity according to Thy will: O God, who livest and reignest world without end. Amen.

O Lord Jesus Christ, Son of the living God, who according to the will of the Father, through the co-operation of the Holy Ghost, hast by Thy death given life to the world: deliver me by this Thy most holy Body and Blood from all my transgressions and from all evils; make me always adhere to Thy commandments and suffer me never to be separated from Thee; Who with the same God the Father and the Holy Ghost livest and reignest, God, for ever and ever. Amen.

Let not the partaking of Thy Body, O Lord Jesus Christ, which I, though unworthy, presume to receive, turn to my judgment and condemnation; but through Thy goodness may it be unto me for a safeguard and a healing remedy both of soul and body; who livest and reignest with God the Father in the unity of the Holy Ghost, God, world without end. Amen.

I will take the bread of heaven, and call upon the name of the Lord.`,

  [PRAYER_TYPES.POST_COMMUNIONEM]: `Grant, O Lord, that what we have taken with our mouth, we may receive with a pure mind: and that from a temporal gift it may become for us an eternal remedy.

May Thy Body, O Lord, which I have received, and Thy Blood which I have drunk, cleave to my inmost parts, and grant that no stain of sin may remain in me, whom these pure and holy sacraments have refreshed. Who livest and reignest world without end. Amen.`,

  // English: the Memoráre, the canticles and Iúdica me from the Saint Andrew
  // Daily Missal (thee/thou in lower case, as elsewhere in this table); Ad te
  // beáte Ioseph from preces-latinae; grace at meals and the Súscipe in their
  // received forms.
  [PRAYER_TYPES.BENEDICTIO_MENSAE]: `Bless us, O Lord, and these thy gifts, which we are about to receive from thy bounty. Through Christ our Lord. Amen.`,

  [PRAYER_TYPES.GRATIARUM_ACTIO]: `We give thee thanks, almighty God, for all thy benefits, who livest and reignest world without end. Amen.`,

  [PRAYER_TYPES.MEMORARE]: `Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, and sought thy intercession, was left unaided. Inspired with this confidence, I fly unto thee, O Virgin of virgins, my Mother. To thee I come; before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but graciously hear and answer me. Amen.`,

  [PRAYER_TYPES.AD_TE_IOSEPH]: `To thee, O blessed Joseph, do we come in our tribulation, and having implored the help of thy most holy Spouse, we confidently invoke thy patronage also. Through that charity which bound thee to the immaculate Virgin Mother of God and through the paternal love with which thou embraced the Child Jesus, we humbly beg thee to graciously regard the inheritance which Jesus Christ has purchased by his Blood, and with thy power and strength to aid us in our necessities. O most watchful Guardian of the Holy Family, defend the chosen children of Jesus Christ; O most loving father, ward off from us every contagion of error and corrupting influence; O our most mighty protector, be propitious to us and from heaven assist us in our struggle with the power of darkness; and, as once thou rescued the Child Jesus from deadly peril, so now protect God's Holy Church from the snares of the enemy and from all adversity; shield, too, each one of us by thy constant protection, so that, supported by thy example and thy aid, we may be able to live piously, to die holy, and to obtain eternal happiness in heaven. Amen.`,

  [PRAYER_TYPES.MAGNIFICAT]: `My soul doth magnify the Lord,
and my spirit hath rejoiced in God my Saviour.
For he hath regarded the lowliness of his handmaid: for behold from henceforth all generations shall call me blessed.
For he that is mighty hath done great things to me: and holy is his name.
And his mercy is from generation unto generations, unto them that fear him.
He hath showed strength with his arm: he hath scattered the proud in the imagination of their heart.
He hath put down the mighty from their seat, and hath exalted the humble.
He hath filled the hungry with good things: and the rich he hath sent empty away.
He hath received Israel his servant, being mindful of his mercy.
As he spoke to our fathers, to Abraham and to his seed for ever.
Glory be to the Father, and to the Son, and to the Holy Ghost.
As it was in the beginning, is now, and ever shall be, world without end. Amen.`,

  [PRAYER_TYPES.NUNC_DIMITTIS]: `Now thou dost dismiss thy servant, O Lord, according to thy word in peace:
Because my eyes have seen thy salvation,
Which thou hast prepared before the face of all peoples:
A light to the revelation of the Gentiles, and the glory of thy people Israel.
Glory be to the Father, and to the Son, and to the Holy Ghost.
As it was in the beginning, is now, and ever shall be, world without end. Amen.`,

  [PRAYER_TYPES.IUDICA_ME]: `℣ I will go in unto the altar of God.
℟ Unto God, who giveth joy to my youth.
℣ Judge me, O God, and distinguish my cause against an ungodly nation: O deliver me from the unjust and deceitful man.
℟ For thou, O God, art my strength: why hast thou cast me from thee, and why go I sorrowful while the enemy afflicteth me?
℣ Send out thy light and thy truth: they have led me and brought me unto thy holy hill, even unto thy tabernacles.
℟ Then will I go unto the altar of God, unto God, who giveth joy to my youth.
℣ I will praise thee upon the harp, O God, my God: why art thou cast down, O my soul? and why art thou disquieted within me?
℟ Hope thou in God: for yet will I praise him, who is the health of my countenance, and my God.
℣ Glory be to the Father, and to the Son, and to the Holy Ghost.
℟ As it was in the beginning, is now, and ever shall be, world without end. Amen.
℣ I will go in unto the altar of God.
℟ Unto God, who giveth joy to my youth.`,

  [PRAYER_TYPES.SUSCIPE]: `Take, O Lord, and receive all my liberty, my memory, my understanding and my whole will. Whatever I have or hold, thou hast given me; I give it all back to thee and surrender it wholly to be governed by thy will. Give me only thy love and thy grace, and I am rich enough and ask for nothing more. Amen.`,

  // Creátor ineffábilis: the English of preces-latinae.
  [PRAYER_TYPES.CREATOR_INEFFABILIS]: `O infinite Creator, who in the riches of Thy wisdom didst appoint three hierarchies of Angels and didst set them in wondrous order over the highest heavens, and who didst apportion the elements of the world most wisely: do Thou, who art in truth the fountain of light and wisdom, deign to shed upon the darkness of my understanding the rays of Thine infinite brightness, and remove far from me the twofold darkness in which I was born, namely, sin and ignorance. Do Thou, who givest speech to the tongues of little children, instruct my tongue and pour into my lips the grace of Thy benediction. Give me keenness of apprehension, capacity for remembering, method and ease in learning, insight-in interpretation, and copious eloquence in speech. Instruct my beginning, direct my progress, and set Thy seal upon the finished work, Thou, who art true God and true Man, who livest and reignest world without end. Amen.`,

  // ---------------------------------------------------------------------------
  // Chaplet of the Holy Spirit: the English of the Raccolta (1910), no. 52,
  // checked against the scan. Two parts are ours: the sign of the cross, which
  // the Raccolta lacks, and the Veni Creator, rendered line for line — the
  // Raccolta prints Caswall's metrical version, which doesn't follow the Latin.
  // ---------------------------------------------------------------------------
  [PRAYER_TYPES.CORONA_SS_INITIUM]: `In the name of the Father, and of the Son, and of the Holy Ghost. Amen.

{r}Short Act of Contrition{/r}
I grieve, O my God, for having sinned against Thee, because Thou art so good; and with the assistance of thy grace I will never sin again.`,

  [PRAYER_TYPES.CORONA_SS_HYMNUS]: `Come, Creator Spirit,
visit the minds of thy faithful,
fill with grace from on high
the hearts which thou hast made.

Thou who art called the Paraclete,
the gift of God most high,
the living fountain, fire, charity,
and the anointing of the soul.

Thou sevenfold in thy gifts,
finger of the Father's right hand,
thou the Father's true promise,
enriching our tongues with speech.

Kindle a light in our senses,
pour love into our hearts,
the weakness of our bodies
strengthen with thy lasting power.

Drive the enemy far from us,
and grant us peace without delay:
so, with thee leading before us,
may we shun all that is harmful.

Through thee may we know the Father,
and come to know the Son,
and in thee, the Spirit of them both,
may we believe for all time.

To God the Father be glory,
and to the Son, who rose
from the dead, and to the Paraclete,
for ever and ever. Amen.

℣ Send forth thy Spirit, and they shall be created.
℟ And Thou shalt renew the face of the earth.

Let us pray. O God, who didst instruct the hearts of the faithful by the light of the Holy Spirit, grant us in the same Spirit to be truly wise and ever to rejoice in His consolation, through Jesus Christ our Lord. Amen.`,

  [PRAYER_TYPES.CORONA_SS_1]: `{r}First Mystery{/r}
Jesus was conceived of the Virgin Mary by the power of the Holy Ghost.

{r}Meditation.{/r} “The Holy Spirit shall descend upon thee, and the power of the most high shall overshadow thee, and therefore the Holy one that shall be born of thee shall be called the Son of God” (St Luke i, 35).

{r}Application.{/r} Pray earnestly for the help of the divine Spirit and, through the intercession of Mary, for grace to imitate the virtues of Jesus Christ, who is the example of all virtue, and so to be conformed to the image of the Son of God.`,

  [PRAYER_TYPES.CORONA_SS_2]: `{r}Second Mystery{/r}
The Spirit of God rests upon Jesus.

{r}Meditation.{/r} “Jesus being baptized came forth immediately from the water, and behold the Heavens were opened, and He saw the Spirit of God descend like a dove, and coming, stand over Him” (St Matt. iii, 16).

{r}Application.{/r} Hold in the highest esteem the priceless gift of sanctifying grace, which the Holy Spirit infused into your heart in Baptism. Keep the promises to the observance of which you have bound yourself. By continual exercise, increase Faith, Hope and Charity. Live always as becomes children of God, and members of his true Church, in order that after this life has run its course, you may be worthy to receive your heavenly inheritance.`,

  [PRAYER_TYPES.CORONA_SS_3]: `{r}Third Mystery{/r}
Jesus was conducted by the Spirit into the desert.

{r}Meditation.{/r} “But Jesus, full of the Holy Spirit, retired from the Jordan, and was conducted by the Spirit into the desert for forty days; and was tempted by the Devil” (St Luke iv, 1, 2).

{r}Application.{/r} Be always grateful for the seven gifts given to you by the Holy Spirit in Confirmation; for the spirit of wisdom and understanding, of counsel and fortitude, of knowledge and piety, and of the fear of the Lord. Faithfully adhere to your divine Guide, acting manfully in all the dangers of this life and in temptation, as becomes a perfect Christian and a brave athlete of Jesus Christ.`,

  [PRAYER_TYPES.CORONA_SS_4]: `{r}Fourth Mystery{/r}
The Holy Spirit in the Church.

{r}Meditation.{/r} “And suddenly there was a sound from Heaven as of a mighty wind coming where they were assembled; and they were all filled with the Holy Spirit, and began to discourse of the wonderful works of God” (Acts ii, 2, 4, 11).

{r}Application.{/r} Thank God for making you a child of his Church which the divine Spirit, sent into the world on the day of Pentecost, ever vivifies and rules. Hear and obey the Supreme Pontiff, who by the assistance of the Holy Spirit is the infallible teacher, and the Church, which is the pillar and foundation of truth. Hold fast her doctrines, maintain her cause, defend her rights.`,

  [PRAYER_TYPES.CORONA_SS_5]: `{r}Fifth Mystery{/r}
The Holy Spirit in the soul of the just man.

{r}Meditation.{/r} “Do you not know that your members are the temple of the Holy Spirit, who is in you” (1 Cor. vi, 19). “Do not extinguish the Spirit” (1 Thess. v, 19). “And grieve not the Holy Spirit of God, whereby you are sealed unto the day of redemption” (Ephes. iv, 30).

{r}Application.{/r} Be ever mindful of the Holy Spirit who is in you, and watch with all possible care over purity of soul and body. Faithfully obey his divine inspirations, so as to gather therefrom the fruits of the Spirit: Charity, joy, peace, benignity, goodness, longanimity, mildness, faith, modesty, continency, chastity.`,

  // The four chaplets, from the Raccolta (1910; the Sacred Heart from the 1878
  // edition, with its capitals for the Heart). The headings are ours.
  [PRAYER_TYPES.CORONA_ANG_INITIUM]: `℣ O God, come to my assistance.
℟ O Lord, make haste to help me.

Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_1]: `{r}First Salutation{/r}
At the intercession of St Michael and the heavenly choir of the Seraphim, may it please God to make us worthy to receive into our hearts the fire of his perfect charity. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_2]: `{r}Second Salutation{/r}
At the intercession of St Michael and the heavenly choir of the Cherubim, may God grant us grace to abandon the ways of sin, and follow the path of Christian perfection. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_3]: `{r}Third Salutation{/r}
At the intercession of St Michael and the sacred choir of the Thrones, may it please God to infuse into our hearts a true and earnest spirit of humility. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_4]: `{r}Fourth Salutation{/r}
At the intercession of St Michael and the heavenly choir of the Dominations, may it please God to grant us grace to have dominion over our senses, and to correct our depraved passions. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_5]: `{r}Fifth Salutation{/r}
At the intercession of St Michael and the heavenly choir of the Powers, may God vouchsafe to keep our souls from the wiles and temptations of the devil. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_6]: `{r}Sixth Salutation{/r}
At the intercession of St Michael and the choir of the admirable celestial Virtues, may our Lord keep us from falling into temptations and deliver us from evil. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_7]: `{r}Seventh Salutation{/r}
At the intercession of St Michael and the heavenly choir of the Principalities, may it please God to fill our souls with the spirit of true and hearty obedience. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_8]: `{r}Eighth Salutation{/r}
At the intercession of St Michael and the heavenly choir of Archangels, may it please God to grant us the gift of perseverance in the faith and in all good works, that we may thereby be enabled to attain unto the glory of Paradise. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_9]: `{r}Ninth Salutation{/r}
At the intercession of St Michael and the heavenly choir of Angels, may God vouchsafe to grant that the Holy Angels may protect us during life, and after death may lead us into the everlasting glory of heaven. Amen.`,

  [PRAYER_TYPES.CORONA_ANG_ANTIPHONA]: `{r}Antiphon{/r}
Michael, glorious Prince, chief and champion of the heavenly host, guardian of the souls of men, conqueror of the rebel angels, who art set over the palace of God, our worthy captain under Jesus Christ, endowed with superhuman excellence and virtue; vouchsafe to free us from every evil, who with full confidence have recourse to thee; and by thy powerful protection enable us to make progress every day in the faithful service of our God.

℣ Pray for us, most blessed Michael, Prince of the Church of Jesus Christ.
℟ That we may be made worthy of his promises.`,

  [PRAYER_TYPES.CORONA_ANG_OREMUS]: `Let us pray. Almighty and eternal God, who in thy own marvellous goodness and pity didst, for the common salvation of man, choose the glorious Archangel Michael to be the Prince of thy Church; make us worthy, we pray Thee, to be delivered by his beneficent protection from all our enemies, that at the hour of our death no one of them may approach to harm us, and that by the same Archangel Michael we may be introduced into the presence of thy high and heavenly Majesty. Through the merits of Jesus Christ our Lord, Amen.`,

  [PRAYER_TYPES.CORONA_DOL_INITIUM]: `{r}Act of Contrition{/r}
My Lord, Thou who alone art most worthy of my love, behold me standing before thy Divine Presence utterly overwhelmed by the thought of the many grievous injuries I have done Thee. I ask thy pardon for them with my whole heart, repenting of them purely for love of Thee, and at the thought of thy great goodness hating and loathing them above every evil of this life. As I would rather have died a thousand times than have offended Thee, so now I am most firmly resolved to die a thousand deaths rather than offend Thee again. My crucified Jesus, I firmly purpose to cleanse my soul as soon as possible by thy most Precious Blood in the Sacrament of Penance. And thou, most tender Virgin, Mother of mercy and Refuge of sinners, do thou obtain for me by virtue of thy bitter pains, the pardon of sin which I desire; whilst, praying according to the mind of so many holy Pontiffs in order to obtain the Indulgences granted to this thy holy Rosary, I hope thereby to obtain remission of all pains due to my sins.`,

  [PRAYER_TYPES.CORONA_DOL_1]: `{r}The First Sorrow{/r}
With this confidence in my heart, I meditate on the First Sorrow, when Mary, Virgin Mother of my God, presented Jesus her only Son in the Temple, laid Him in the arms of holy and aged Simeon, and heard his prophetic word, ‘The sword of grief shall pierce thy soul,’ foretelling thereby the Passion and Death of her Son Jesus.`,

  [PRAYER_TYPES.CORONA_DOL_2]: `{r}The Second Sorrow{/r}
The Second Sorrow of the Blessed Virgin was when she was obliged to fly into Egypt by reason of the persecution of cruel Herod, who impiously sought to slay her well beloved Son.`,

  [PRAYER_TYPES.CORONA_DOL_3]: `{r}The Third Sorrow{/r}
The Third Sorrow of the Blessed Virgin was when, after having gone up to Jerusalem at the Paschal Feast with Joseph her spouse and Jesus her beloved Son, she lost Him on the way back to her poor house, and for three days bewailed the loss of her only Love.`,

  [PRAYER_TYPES.CORONA_DOL_4]: `{r}The Fourth Sorrow{/r}
The Fourth Sorrow of the Blessed Virgin was when she met her dear Son Jesus carrying to Mount Calvary on his tender shoulders the heavy Cross whereon He was to be crucified for our salvation.`,

  [PRAYER_TYPES.CORONA_DOL_5]: `{r}The Fifth Sorrow{/r}
The Fifth Sorrow of the Blessed Virgin was when she saw her Son Jesus raised upon the hard tree of the Cross, and blood flowing from every part of his sacred Body, and then beheld Him die after three hours’ agony.`,

  [PRAYER_TYPES.CORONA_DOL_6]: `{r}The Sixth Sorrow{/r}
The Sixth Sorrow of the Blessed Virgin was when she saw the lance pierce the sacred Side of Jesus, her beloved Son, the nails withdrawn, and his holy Body laid in her purest bosom.`,

  [PRAYER_TYPES.CORONA_DOL_7]: `{r}The Seventh Sorrow{/r}
The Seventh and last Sorrow of the Blessed Virgin, Queen and Advocate of us, her servants, miserable sinners, was when she saw the holy Body of her Son buried in the grave.`,

  [PRAYER_TYPES.CORONA_DOL_LACRIMAE]: `{r}Then say Ave thrice in veneration of the tears which Mary shed in her sorrows, to obtain thereby true sorrow for sins and the holy Indulgences attached to this pious exercise.{/r}`,

  [PRAYER_TYPES.CORONA_DOL_OREMUS]: `℣ Pray for us, Virgin most sorrowful.
℟ That we may be made worthy of the promises of Christ.

Let us pray. Grant, we beseech Thee, O Lord Jesus Christ, that the most blessed Virgin Mary, thy Mother, may intercede for us before the throne of thy mercy, now and at the hour of our death, whose most holy soul was transfixed with the sword of sorrow in the hour of thine own Passion. Through Thee, Jesus Christ, Saviour of the world, who livest and reignest for ever and ever. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_INITIUM]: `℣ O God, come to my assistance.
℟ O Lord, make haste to help me.
℣ Glory be to the Father, and to the Son, and to the Holy Spirit.
℟ As it was in the beginning, is now, and ever shall be, world without end. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_1]: `{r}First Mystery{/r}
The first time our loving Saviour shed his Precious Blood for us was on the eighth day after his birth, when he was circumcised in order to fulfil the law of Moses. While, then, we reflect that Jesus did this to satisfy the justice of God for our lax ways, let us rouse ourselves to sorrow for them, and promise, with the help of his all-powerful grace, to be henceforth truly chaste in body and in soul.`,

  [PRAYER_TYPES.CORONA_SANG_2]: `{r}Second Mystery{/r}
Next, in the Garden of Olives, Jesus shed his Blood for us in such quantity that it bathed the earth around. He did this at the sight of the ingratitude with which men would meet his love. Let us, then, repent sincerely that we have hitherto corresponded so ill with the countless blessings of God, and resolve to make good use of his graces and inspirations.`,

  [PRAYER_TYPES.CORONA_SANG_3]: `{r}Third Mystery{/r}
Next, in his cruel scourging, Jesus shed his Blood when his flesh was so torn that streams of Blood flowed from every part of his body, all of which he offered all the time to his Eternal Father in payment of our impatience and our softness. How comes it, then, that we do not curb our anger and love of self? Henceforth we will try our best to bear our troubles well, and, despising self, take peacefully the injuries which men may do us.`,

  [PRAYER_TYPES.CORONA_SANG_4]: `{r}Fourth Mystery{/r}
Again, from the sacred Head of Jesus, Blood poured down when it was crowned with thorns, in punishment of our pride and evil thoughts. Shall we, then, continue to nurture haughtiness, foster foul imaginations, and feed the wayward will within us? Henceforth let there be ever before our eyes our utter nothingness, our misery, and our weakness; and with generous hearts let us resist all the temptations of the devil.`,

  [PRAYER_TYPES.CORONA_SANG_5]: `{r}Fifth Mystery{/r}
What streams of Precious Blood did not our loving Lord pour forth from his veins when laden with the heavy Cross on that most grievous journey to Calvary! The very streets and ways of Jerusalem, through which He passed, were watered with it! This He did in satisfaction for the scandals and bad example by which his own creatures had led others astray. Who can tell how many of us are of this unhappy number? Who knows how many he himself alone has, by his own bad example, brought down to hell? And what have we done to remedy this evil? Henceforth let us at least do all we can to save souls by word and by example, making ourselves a pattern to all of goodness and a holy life.`,

  [PRAYER_TYPES.CORONA_SANG_6]: `{r}Sixth Mystery{/r}
More, and still more Precious Blood did the Redeemer of mankind shed in his barbarous Crucifixion; when, his veins being rent and arteries burst, there rushed forth in a torrent, from his hands and his feet, that saving balm of life eternal, to pay for all the crimes and enormities of a lost world. Who, after this, would continue in sin, and so renew the cruel crucifixion of the Son of God? Let us weep bitterly for our bad deeds done, and detest them before the feet of the sacred minister of God; let us amend our evil ways, and henceforth begin a truly Christian life, with the remembrance ever in our hearts of all the Blood which our salvation cost the Saviour of men.`,

  [PRAYER_TYPES.CORONA_SANG_7]: `{r}Seventh Mystery{/r}
Last of all, after his death, when his sacred Side was opened by the lance, and his loving Heart was wounded, Jesus shed Blood, and with it there came forth water, to show us how his Blood was all poured out to the last drop for our salvation. Oh, the great goodness of our redeeming Lord! Who will not love Thee, Saviour of my soul? What heart will not consume itself away for love of Thee, who hast done all this for our redemption? The tongue wants words to praise Thee; so let us invite all creatures upon earth, all angels and all saints in Paradise, and most of all our dear Mother Mary, to bless, praise, and celebrate thy most Precious Blood. Glory to the Blood of Jesus! Now and ever throughout all ages. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_TE_ERGO]: `℣ We beseech Thee, therefore, help thy servants, whom Thou hast redeemed with thy Precious Blood.`,

  [PRAYER_TYPES.CORONA_SANG_ORATIO]: `{r}Prayer{/r}
Most Precious Blood of life eternal! price and ransom of the world! drink and bath of the soul! ever pleading the cause of man before the throne of Mercy; I adore Thee most profoundly; I would, if I were able, make Thee some compensation for the outrages and wrongs Thou dost ever suffer from men, and especially from those who dare in their rashness to blaspheme Thee. Who will not bless this Blood of value infinite? who does not feel himself on fire with the love of Jesus, who shed it all for us? What should I be but for this Blood, which hath redeemed me? And what drew Thee, Thou Precious Blood, from the veins of my Lord, even to the last drop? It was love. O boundless love, which gave to us this saving balsam! O balsam beyond all price, streaming forth from the fount of immeasurable love! Give to all hearts, all tongues, power to praise, celebrate, and thank Thee, now and ever, and throughout all eternity. Amen.`,

  [PRAYER_TYPES.CORONA_SANG_OREMUS]: `℣ Thou hast redeemed us, O Lord, with thy Blood.
℟ And hast made us a kingdom to our God.

Let us pray. Almighty and everlasting God, who hast appointed thine only-begotten Son the Saviour of the world, and hast willed to be appeased by his Blood; grant us, we beseech Thee, so to venerate this Blood, the price of our salvation, and so to be defended on earth by its power from the evils of this present life, that in heaven we may be made glad by its everlasting fruit. Who liveth and reigneth for ever and ever. Amen.`,

  [PRAYER_TYPES.CORONA_COR_INITIUM]: `℣ Incline unto mine aid, O God.
℟ O Lord, make haste to help me.`,

  [PRAYER_TYPES.CORONA_COR_1]: `{r}I. The Loving Heart{/r}
Most loving Jesus! my heart leaps for joy in thinking on thy loving Sacred Heart, all tenderness and sweetness for sinful man; and, with trust unbounded, it never doubts thy ready welcome. Ah me! my sins! how many and how great! With Peter and Magdalen, in tears, I bewail and abhor them, because they are an offence to thee, my sole and chief good. Grant me, O grant me pardon for them all! O may I die, I beseech thee, by thy loving heart, may I die rather than offend thee, and may I live only to correspond to thy love!`,

  [PRAYER_TYPES.CORONA_COR_2]: `{r}II. The Humble Heart{/r}
My Jesus! I bless thy most humble heart; and I give thanks to thee, who, in making it my model, not only dost urge me, with much pressing, to imitate it, but, at the cost of so many humiliations, dost thyself stoop to point me out the path, and smooth for me the way to follow thee. Foolish and ungrateful that I am, how have I wandered far away from thee! Mercy, my Jesus, mercy! Away, hateful pride and love of worldly honor! With lowly heart I wish to follow thee, my Jesus, through humiliations and the cross, and thus to gain peace and salvation. Only be thou at hand to strengthen me, and I will ever bless thy Sacred Heart.`,

  [PRAYER_TYPES.CORONA_COR_3]: `{r}III. The Patient Heart{/r}
My Jesus! I marvel at thy most patient heart, and I thank thee for all those wondrous examples of unwearied patience which thou didst leave me to guide me on my way. It grieves me that I have still to reproach myself with my extravagant delicacy, shrinking from the slightest pain. O pour, then, into my heart, dear Jesus, eager and enduring love of suffering and of the cross, of mortification and of penance, that, following thee to Calvary, I may with thee attain to glory, and to the joys of paradise!`,

  [PRAYER_TYPES.CORONA_COR_4]: `{r}IV. The Gentle Heart{/r}
Dear Jesus! at the sight of thy most gentle heart, I shudder to see how unlike mine is to thine, since at a shadow, at a look, at a word of opposition, I fret and grieve. O, then, pardon my excesses, and give me grace that, in every contradiction, I may follow the example of thy unchangeable meekness, and so enjoy an everlasting holy peace.`,

  [PRAYER_TYPES.CORONA_COR_5]: `{r}V. The Generous Heart{/r}
Sing praise to Jesus for his most generous heart, the conqueror of death and hell; yet never wilt thou reach its due with all thy praise. More than ever am I confounded, looking upon my coward heart, which, through human respect, dreads even a passing word. Courage, my soul! it shall be so with thee no more. My Jesus, I pray thee for such strength that, fighting and conquering on earth, I may one day rejoice triumphantly with thee in heaven.`,

  [PRAYER_TYPES.CORONA_COR_IACULATORIA]: `O sweetest Heart of Jesus! I implore
That I may ever love thee more and more.`,

  [PRAYER_TYPES.CORONA_COR_MARIA]: `{r}Let us turn to Mary, consecrating ourselves to her more and more, and, trusting in her maternal heart, let us say to her:{/r}
By the precious gifts of thy sweetest heart, obtain for me, great mother of my God, and my mother Mary, a true and lasting devotion to the Sacred Heart of Jesus, thy well-beloved Son, that, united in every thought and affection with that heart, I may fulfil all the duties of my state of life with ready heart, serving my Jesus ever more, but especially on this day.`,

  [PRAYER_TYPES.CORONA_COR_OREMUS]: `℣ Heart of Jesus burning with love for us.
℟ Inflame our hearts with love of thee.

Let us pray. Lord, we beseech thee, let thy Holy Spirit kindle in our hearts that fire of charity which our Lord Jesus Christ, thy Son, sent forth from his inmost heart upon this earth, and willed that it should burn with vehemence. Who liveth and reigneth with thee, in the unity of the same Holy Spirit, God, forever and ever. Amen.`,

  [PRAYER_TYPES.VICTIMAE_PASCHALI]: `Forth to the paschal Victim, Christians, bring Your sacrifice of praise:
The Lamb redeems the sheep; And Christ the sinless one, Hath to the Father sinners reconciled.
Together, death and life In a strange conflict strove. The Prince of life, who died, Now lives and reigns.
What thou sawest, Mary, say, As thou wentest on the way.
I saw the tomb wherein the living one had lain, I saw His glory as He rose again;
Napkin and linen clothes, and angels twain:
Yea, Christ is risen, my hope, and He Will go before you into Galilee.
We know that Christ indeed has risen from the grave: Hail, thou King of Victory, Have mercy, Lord, and save. Amen. Alleluia.`,

  [PRAYER_TYPES.VENI_SANCTE_SPIRITUS]: `Come, Holy Ghost, send down those beams,
Which sweetly flow in silent streams
From Thy bright throne above.

O, come, Thou Father of the poor,
O, come, Thou source of all our store,
Come fill our hearts with love.

O Thou of comforters the best,
O Thou the soul’s delightful guest,
The pilgrim’s sweet relief,

Rest art Thou in our toil, most sweet
Refreshment in the noon-day heat,
And solace in our grief.

O blessed Light of Life Thou art,
Fill with Thy Light the inmost hearts
Of those that hope in Thee.

Without Thy Godhead nothing can
Have any price or worth in man,
Nothing can harmless be.

Lord, wash our sinful stains away,
Water from heaven our barren clay,
Our wounds and bruises heal.

To Thy sweet yoke our stiff necks bow,
Warm with Thy love our hearts of snow,
Our wandering feet recall.

Grant to Thy faithful, dearest Lord,
Whose only hope is in Thy Word,
Thy sevenfold gift of grace.

Grant us in life Thy grace that we
In peace may die and ever be
In joy before Thy face. Amen. Alleluia.`,

  [PRAYER_TYPES.LAUDA_SION]: `Sion, lift thy voice and sing;
Praise thy Saviour and thy King;
Praise with hymns thy Shepherd true.

Strive thy best to praise Him well,
Yet doth He all praise excel;
None can ever reach His due.

See to-day before us laid
The living and life-giving Bread,
Theme for praise and joy profound.

The same which at the sacred board
Was by our incarnate Lord,
Giv’n to His apostles round.

Let the praise be loud and high;
Sweet and tranquil be the joy
Felt to-day in every breast

On this festival divine,
Which records the origin
Of the glorious Eucharist.

On this table of the King,
Our new paschal offering
Brings to end the olden rite.

Here for empty shadows fled,
Is reality instead;
Here, instead of darkness, light.

His own act, at supper seated,
Christ ordained to be repeated,
In His memory divine;

Wherefore now, with adoration,
We the Host of our salvation
Consecrate from bread and wine.

Hear what holy Church maintaineth,
That the bread its substance changeth
Into flesh, the wine to blood.

Doth it pass thy comprehending?
Faith, the law of sight transcending,
Leaps to things not understood.

Here, beneath these signs are hidden
Priceless things, to sense forbidden;
Signs, not things, are all we see

Flesh from bread, and blood from wine,
Yet is Christ in either sign
All entire, confessed to be.

They too who of Him partake,
Sever not, nor rend, nor break,
But entire their Lord receive.

Whether one or thousands eat,
All receive the selfsame meat,
Nor the less for others leave.

Both the wicked and the good
Eat of this celestial food;
But with ends how opposite!

Here 'tis life, and there 'tis death;
The same, yet issuing to each,
In a difference infinite.

Nor a single doubt retain,
When they break the host in twain,
But that in each part remain,
What was in the whole before.

Since the simple sign alone
Suffers change in state or form,
The signified remaining one
And the same for evermore.

Lo! upon the altar lies,
Hidden deep from human eyes,
Bread of angels from the skies,
Made the food of mortal man:
Children’s meat, to dogs denied:

In old types foresignified:
In the manna heav’n-supplied,
Isaac, and the paschal Lamb.

Jesu! Shepherd of the sheep!
Thou Thy flock in safety keep.
Living Bread! thy life supply;
Strengthen us, or else we die;
Fill us with celestial grace:

Thou, who feedest us below!
Source of all we have or know!
Grant that with Thy saints above,
Sitting at the feast of love,
We may see Thee face to face. Amen. Alleluia.`,

  [PRAYER_TYPES.STABAT_MATER]: `At the cross her station keeping,
Stood the mournful Mother weeping
Close to Jesus to the last.

Through her heart, His sorrow sharing,
All His bitter anguish bearing,
Now at length the sword has passed.

Oh, how sad and sore distress’d
Was that Mother, highly blest
Of the sole-begotten One!

Christ above in torment hangs;
She beneath beholds the pangs
Of her dying glorious Son.

Is there one who would not weep
Whelm’d in miseries so deep
Christ’s dear Mother to behold?

Can the human heart refrain
From partaking in her pain,
In that Mother’s pain untold?

Bruis’d, derided, curs’d, defil’d,
She beheld her tender child:
All with bloody scourges rent.

For the sins of His own nation,
Saw Him hang in desolation,
Till His spirit forth He sent.

O Thou Mother! fount of love!
Touch my spirit from above;
Make my heart with thine accord.

Make me feel as thou hast felt;
Make my soul to glow and melt
With the love of Christ our Lord.

Holy Mother! pierce me through;
In my heart each wound renew
Of my Saviour crucified.

Let me share with thee His pain,
Who for all my sins was slain,
Who for me in torments died.

Let me mingle tears with thee,
Mourning Him who mourn’d for me,
All the days that I may live.

By the cross with thee so stay,
There with thee to weep and pray,
Is all I ask of thee to give.

Virgin of all virgins best,
Listen to my fond request:
Let me share thy grief divine.

Let me, to my latest breath,
In my body bear the death
Of that dying Son of thine.

Wounded with His every wound,
Steep my soul till it hath swoon’d
In His very blood away.

Be to me, O Virgin, nigh,
Lest in flames I burn and die,
In His awful Judgment day.

Christ, when Thou shalt call me hence,
Be Thy Mother my defense,
Be Thy cross my victory.

While my body here decays,
May my soul Thy goodness praise,
Safe in Paradise with Thee. Amen.`,

  [PRAYER_TYPES.ANGELUS]: `℣ The Angel of the Lord declared unto Mary.
℟ And she conceived of the Holy Spirit.

Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.

℣ Behold the handmaid of the Lord.
℟ Be it done unto me according to thy word.

Hail Mary…

℣ And the Word was made flesh.
℟ And dwelt among us.

Hail Mary…

℣ Pray for us, O holy Mother of God.
℟ That we may be made worthy of the promises of Christ.

Let us pray. Pour forth, we beseech thee, O Lord, thy grace into our hearts, that we to whom the Incarnation of Christ thy Son was made known by the message of an angel, may by his Passion and Cross be brought to the glory of his Resurrection. Through Christ our Lord.
℟ Amen.`,

  [PRAYER_TYPES.REGINA_CAELI]: `Queen of heaven, rejoice, alleluia,
for he whom thou didst merit to bear, alleluia,
has risen as he said, alleluia.
Pray for us to God, alleluia.

℣ Rejoice and be glad, O Virgin Mary, alleluia.
℟ For the Lord is truly risen, alleluia.

Let us pray. O God, who by the resurrection of thy Son, our Lord Jesus Christ, hast been pleased to give joy to the world: grant, we beseech thee, that through his Mother, the Virgin Mary, we may lay hold of the joys of everlasting life. Through the same Christ our Lord.
℟ Amen.`,

  [PRAYER_TYPES.ANIMA_CHRISTI]: `Soul of Christ, sanctify me.
Body of Christ, save me.
Blood of Christ, inebriate me.
Water from the side of Christ, wash me.
Passion of Christ, strengthen me.
O good Jesus, hear me.
Within thy wounds hide me.
Suffer me not to be separated from thee.
From the malignant enemy defend me.
In the hour of my death call me.
And bid me come unto thee,
that with thy saints I may praise thee
for ever and ever.
Amen.`,

  [PRAYER_TYPES.ATHANASIAN_CREED]: `Whosoever wishes to be saved must, above all, hold the catholic faith: which, unless a man keeps whole and undefiled, without doubt he shall perish everlastingly. And the catholic faith is this: that we worship one God in Trinity, and Trinity in unity; neither confounding the persons, nor dividing the substance. For the person of the Father is one, that of the Son another, that of the Holy Spirit another; but the divinity of the Father, of the Son and of the Holy Spirit is one, their glory equal, their majesty coeternal. Such as the Father is, such is the Son, and such is the Holy Spirit. The Father uncreated, the Son uncreated, the Holy Spirit uncreated. The Father immeasurable, the Son immeasurable, the Holy Spirit immeasurable. The Father eternal, the Son eternal, the Holy Spirit eternal. And yet there are not three eternals, but one eternal. As also there are not three uncreated, nor three immeasurable, but one uncreated and one immeasurable. So likewise the Father is almighty, the Son almighty, the Holy Spirit almighty. And yet there are not three almighties, but one almighty. So the Father is God, the Son is God, the Holy Spirit is God. And yet there are not three Gods, but one God. So the Father is Lord, the Son is Lord, the Holy Spirit is Lord. And yet there are not three Lords, but one Lord. For as we are compelled by the Christian truth to confess each person singly to be God and Lord, so are we forbidden by the catholic religion to say that there are three Gods or Lords.

The Father was made by none, neither created nor begotten. The Son is from the Father alone, not made nor created, but begotten. The Holy Spirit is from the Father and the Son, not made, nor created, nor begotten, but proceeding. So there is one Father, not three Fathers; one Son, not three Sons; one Holy Spirit, not three Holy Spirits. And in this Trinity there is nothing before or after, nothing greater or less, but all three persons are coeternal together and coequal. So that in all things, as has already been said, both the unity in Trinity and the Trinity in unity is to be worshipped. He therefore who wishes to be saved, let him think thus of the Trinity.

But it is necessary for eternal salvation that he also believe faithfully in the Incarnation of our Lord Jesus Christ. It is therefore the right faith that we believe and confess that our Lord Jesus Christ, the Son of God, is God and man. He is God, begotten of the substance of the Father before the ages; and he is man, born in the world of the substance of his mother. Perfect God, perfect man, subsisting of a rational soul and human flesh. Equal to the Father according to his divinity, less than the Father according to his humanity. Who, although he is God and man, is nevertheless not two, but one Christ. One, however, not by the conversion of the divinity into flesh, but by the assumption of the humanity into God. Wholly one, not by a confusion of substance, but by unity of person. For as a rational soul and flesh are one man, so God and man are one Christ. Who suffered for our salvation, descended into hell, on the third day rose again from the dead. He ascended into heaven, is seated at the right hand of God the Father almighty, from thence he shall come to judge the living and the dead. At whose coming all men shall rise again with their bodies, and shall give an account of their own deeds. And those who have done good shall go into life everlasting; but those who have done evil, into everlasting fire. This is the catholic faith, which, unless a man believes faithfully and firmly, he cannot be saved. Amen.`,

  [PRAYER_TYPES.ALMA_REDEMPTORIS]: `Loving mother of the Redeemer, gate of heaven, star of the sea, assist your people who have fallen yet strive to rise again. To the wonderment of nature you bore your Creator, yet remained a virgin after as before. You who received Gabriel's joyful greeting, have pity on us poor sinners.

{r}In Advent:{/r}
℣ The Angel of the Lord declared unto Mary.
℟ And she conceived of the Holy Spirit.
Let us pray. Pour forth, we beseech thee, O Lord, thy grace into our hearts, that we to whom the Incarnation of Christ thy Son was made known by the message of an angel, may by his Passion and Cross be brought to the glory of his Resurrection. Through the same Christ our Lord. Amen.

{r}From Christmas to the Purification:{/r}
℣ After childbirth thou didst remain a Virgin inviolate.
℟ O Mother of God, intercede for us.
Let us pray. O God, who by the fruitful virginity of blessed Mary hast bestowed upon mankind the rewards of eternal salvation: grant, we beseech thee, that we may know the intercession of her through whom we were made worthy to receive the author of life, our Lord Jesus Christ, thy Son. Amen.`,

  [PRAYER_TYPES.AVE_REGINA_CAELORUM]: `{r}From the Purification to Holy Week:{/r}
Hail, O Queen of heaven enthroned!
Hail, by angels Mistress owned!
Root of Jesse, Gate of morn,
whence the world's true light was born:

Glorious Virgin, joy to thee,
loveliest whom in heaven they see:
fairest thou where all are fair,
plead with Christ our sins to spare.

℣ Vouchsafe that I may praise thee, O sacred Virgin.
℟ Give me strength against thine enemies.
Let us pray. Grant, O merciful God, a defence to our weakness: that we, who keep the memory of the holy Mother of God, may by the help of her intercession rise again from our iniquities. Through the same Christ our Lord. Amen.`,

  [PRAYER_TYPES.LITANY_LORETO]: `Lord, have mercy. 2×
Christ, have mercy. 2×
Lord, have mercy. 2×
Christ, hear us.
Christ, graciously hear us.
God the Father of heaven, have mercy on us.
God the Son, Redeemer of the world, have mercy on us.
God the Holy Spirit, have mercy on us.
Holy Trinity, one God, have mercy on us.

Holy Mary, pray for us.
Holy Mother of God, pray for us.
Holy Virgin of virgins, pray for us.
Mother of Christ, pray for us.
Mother of the Church, pray for us.
Mother of mercy, pray for us.
Mother of divine grace, pray for us.
Mother of hope, pray for us.
Mother most pure, pray for us.
Mother most chaste, pray for us.
Mother inviolate, pray for us.
Mother undefiled, pray for us.
Mother most amiable, pray for us.
Mother most admirable, pray for us.
Mother of good counsel, pray for us.
Mother of our Creator, pray for us.
Mother of our Saviour, pray for us.
Virgin most prudent, pray for us.
Virgin most venerable, pray for us.
Virgin most renowned, pray for us.
Virgin most powerful, pray for us.
Virgin most merciful, pray for us.
Virgin most faithful, pray for us.
Mirror of justice, pray for us.
Seat of wisdom, pray for us.
Cause of our joy, pray for us.
Spiritual vessel, pray for us.
Vessel of honour, pray for us.
Singular vessel of devotion, pray for us.
Mystical rose, pray for us.
Tower of David, pray for us.
Tower of ivory, pray for us.
House of gold, pray for us.
Ark of the covenant, pray for us.
Gate of heaven, pray for us.
Morning star, pray for us.
Health of the sick, pray for us.
Refuge of sinners, pray for us.
Solace of migrants, pray for us.
Comfort of the afflicted, pray for us.
Help of Christians, pray for us.
Queen of angels, pray for us.
Queen of patriarchs, pray for us.
Queen of prophets, pray for us.
Queen of apostles, pray for us.
Queen of martyrs, pray for us.
Queen of confessors, pray for us.
Queen of virgins, pray for us.
Queen of all saints, pray for us.
Queen conceived without original sin, pray for us.
Queen assumed into heaven, pray for us.
Queen of the most holy Rosary, pray for us.
Queen of families, pray for us.
Queen of peace, pray for us.

Lamb of God, who takest away the sins of the world, spare us, O Lord.
Lamb of God, who takest away the sins of the world, graciously hear us, O Lord.
Lamb of God, who takest away the sins of the world, have mercy on us.

℣ Pray for us, O holy Mother of God.
℟ That we may be made worthy of the promises of Christ.
Let us pray. Grant, we beseech thee, O Lord God, that we thy servants may enjoy perpetual health of mind and body; and by the glorious intercession of blessed Mary, ever Virgin, be delivered from present sorrow and come to enjoy eternal gladness. Through Christ our Lord. Amen.

{r}In Advent:{/r}
℣ The Angel of the Lord declared unto Mary.
℟ And she conceived of the Holy Spirit.
Let us pray. O God, who didst will that thy Word should take flesh in the womb of the blessed Virgin Mary at the message of an angel: grant to us thy suppliants, that we who believe her truly to be the Mother of God may be helped by her intercession with thee. Through Christ our Lord. Amen.

{r}In Christmastide:{/r}
℣ After childbirth thou didst remain a Virgin inviolate.
℟ O Mother of God, intercede for us.
Let us pray. O God, who by the fruitful virginity of blessed Mary hast bestowed upon mankind the rewards of eternal salvation: grant, we beseech thee, that we may know the intercession of her through whom we were made worthy to receive the author of life, our Lord Jesus Christ, thy Son. Amen.

{r}In Eastertide:{/r}
℣ Rejoice and be glad, O Virgin Mary, alleluia.
℟ For the Lord is truly risen, alleluia.
Let us pray. O God, who by the resurrection of thy Son, our Lord Jesus Christ, hast been pleased to give joy to the world: grant, we beseech thee, that through his Mother, the Virgin Mary, we may lay hold of the joys of everlasting life. Through the same Christ our Lord. Amen.`,

  [PRAYER_TYPES.LITANY_SACRED_HEART]: `Lord, have mercy. 2×
Christ, have mercy. 2×
Lord, have mercy. 2×
Christ, hear us.
Christ, graciously hear us.
God the Father of heaven, have mercy on us.
God the Son, Redeemer of the world, have mercy on us.
God the Holy Spirit, have mercy on us.
Holy Trinity, one God, have mercy on us.

Heart of Jesus, Son of the eternal Father, have mercy on us.
Heart of Jesus, formed by the Holy Spirit in the womb of the Virgin Mother, have mercy on us.
Heart of Jesus, substantially united to the Word of God, have mercy on us.
Heart of Jesus, of infinite majesty, have mercy on us.
Heart of Jesus, holy temple of God, have mercy on us.
Heart of Jesus, tabernacle of the Most High, have mercy on us.
Heart of Jesus, house of God and gate of heaven, have mercy on us.
Heart of Jesus, burning furnace of charity, have mercy on us.
Heart of Jesus, vessel of justice and love, have mercy on us.
Heart of Jesus, full of goodness and love, have mercy on us.
Heart of Jesus, abyss of all virtues, have mercy on us.
Heart of Jesus, most worthy of all praise, have mercy on us.
Heart of Jesus, king and centre of all hearts, have mercy on us.
Heart of Jesus, in whom are all the treasures of wisdom and knowledge, have mercy on us.
Heart of Jesus, in whom dwells all the fullness of the Godhead, have mercy on us.
Heart of Jesus, in whom the Father was well pleased, have mercy on us.
Heart of Jesus, of whose fullness we have all received, have mercy on us.
Heart of Jesus, desire of the everlasting hills, have mercy on us.
Heart of Jesus, patient and rich in mercy, have mercy on us.
Heart of Jesus, rich to all who call upon thee, have mercy on us.
Heart of Jesus, fount of life and holiness, have mercy on us.
Heart of Jesus, propitiation for our sins, have mercy on us.
Heart of Jesus, filled with reproaches, have mercy on us.
Heart of Jesus, bruised for our offences, have mercy on us.
Heart of Jesus, obedient unto death, have mercy on us.
Heart of Jesus, pierced with a lance, have mercy on us.
Heart of Jesus, source of all consolation, have mercy on us.
Heart of Jesus, our life and resurrection, have mercy on us.
Heart of Jesus, our peace and reconciliation, have mercy on us.
Heart of Jesus, victim for our sins, have mercy on us.
Heart of Jesus, salvation of those who hope in thee, have mercy on us.
Heart of Jesus, hope of those who die in thee, have mercy on us.
Heart of Jesus, delight of all the saints, have mercy on us.

Lamb of God, who takest away the sins of the world, spare us, O Lord.
Lamb of God, who takest away the sins of the world, graciously hear us, O Lord.
Lamb of God, who takest away the sins of the world, have mercy on us.

℣ Jesus, meek and humble of heart.
℟ Make our hearts like unto thy Heart.
Let us pray. Almighty and eternal God, look upon the Heart of thy most beloved Son, and upon the praises and satisfaction he offers thee in the name of sinners; and to those who implore thy mercy grant pardon in the name of the same Jesus Christ thy Son, who lives and reigns with thee for ever and ever. Amen.`,

  [PRAYER_TYPES.LITANY_HOLY_NAME]: `Lord, have mercy. 2×
Christ, have mercy. 2×
Lord, have mercy. 2×
Jesus, hear us.
Jesus, graciously hear us.
God the Father of heaven, have mercy on us.
God the Son, Redeemer of the world, have mercy on us.
God the Holy Spirit, have mercy on us.
Holy Trinity, one God, have mercy on us.

Jesus, Son of the living God, have mercy on us.
Jesus, splendour of the Father, have mercy on us.
Jesus, brightness of eternal light, have mercy on us.
Jesus, king of glory, have mercy on us.
Jesus, sun of justice, have mercy on us.
Jesus, Son of the Virgin Mary, have mercy on us.
Jesus, most amiable, have mercy on us.
Jesus, most admirable, have mercy on us.
Jesus, mighty God, have mercy on us.
Jesus, father of the world to come, have mercy on us.
Jesus, angel of great counsel, have mercy on us.
Jesus most powerful, have mercy on us.
Jesus most patient, have mercy on us.
Jesus most obedient, have mercy on us.
Jesus, meek and humble of heart, have mercy on us.
Jesus, lover of chastity, have mercy on us.
Jesus, lover of us, have mercy on us.
Jesus, God of peace, have mercy on us.
Jesus, author of life, have mercy on us.
Jesus, model of virtues, have mercy on us.
Jesus, zealous lover of souls, have mercy on us.
Jesus, our God, have mercy on us.
Jesus, our refuge, have mercy on us.
Jesus, father of the poor, have mercy on us.
Jesus, treasure of the faithful, have mercy on us.
Jesus, good shepherd, have mercy on us.
Jesus, true light, have mercy on us.
Jesus, eternal wisdom, have mercy on us.
Jesus, infinite goodness, have mercy on us.
Jesus, our way and our life, have mercy on us.
Jesus, joy of the angels, have mercy on us.
Jesus, king of the patriarchs, have mercy on us.
Jesus, master of the apostles, have mercy on us.
Jesus, teacher of the evangelists, have mercy on us.
Jesus, strength of the martyrs, have mercy on us.
Jesus, light of the confessors, have mercy on us.
Jesus, purity of virgins, have mercy on us.
Jesus, crown of all saints, have mercy on us.

Be merciful, spare us, O Jesus.
Be merciful, graciously hear us, O Jesus.

From all evil, deliver us, O Jesus.
From all sin, deliver us, O Jesus.
From thy wrath, deliver us, O Jesus.
From the snares of the devil, deliver us, O Jesus.
From the spirit of fornication, deliver us, O Jesus.
From everlasting death, deliver us, O Jesus.
From the neglect of thy inspirations, deliver us, O Jesus.

Through the mystery of thy holy Incarnation, deliver us, O Jesus.
Through thy nativity, deliver us, O Jesus.
Through thy infancy, deliver us, O Jesus.
Through thy most divine life, deliver us, O Jesus.
Through thy labours, deliver us, O Jesus.
Through thy agony and passion, deliver us, O Jesus.
Through thy cross and dereliction, deliver us, O Jesus.
Through thy sufferings, deliver us, O Jesus.
Through thy death and burial, deliver us, O Jesus.
Through thy resurrection, deliver us, O Jesus.
Through thy ascension, deliver us, O Jesus.
Through thy institution of the most holy Eucharist, deliver us, O Jesus.
Through thy joys, deliver us, O Jesus.
Through thy glory, deliver us, O Jesus.

Lamb of God, who takest away the sins of the world, spare us, O Jesus.
Lamb of God, who takest away the sins of the world, graciously hear us, O Jesus.
Lamb of God, who takest away the sins of the world, have mercy on us, O Jesus.

℣ Jesus, hear us.
℟ Jesus, graciously hear us.
Let us pray. O Lord Jesus Christ, who hast said: Ask and you shall receive; seek and you shall find; knock and it shall be opened to you: we beseech thee, grant to us who ask the gift of thy most divine love, that we may love thee with our whole heart, in word and in deed, and never cease to praise thee. Make us, O Lord, to have both a perpetual fear and love of thy holy name, for thou never failest to govern those whom thou dost establish in the solidity of thy love. Who livest and reignest for ever and ever. Amen.`,

  // Litany of Humility — like the Latin above, not a sourced original; the
  // English follows the widely circulated form, kept to the Latin's 8 + 8 + 7.
  [PRAYER_TYPES.LITANY_HUMILITY]: `O Jesus, meek and humble of heart, hear me.

From the desire of being esteemed, deliver me, O Jesus.
From the desire of being loved, deliver me, O Jesus.
From the desire of being extolled, deliver me, O Jesus.
From the desire of being honoured, deliver me, O Jesus.
From the desire of being praised, deliver me, O Jesus.
From the desire of being preferred to others, deliver me, O Jesus.
From the desire of being consulted, deliver me, O Jesus.
From the desire of being approved, deliver me, O Jesus.

From the fear of being humiliated, deliver me, O Jesus.
From the fear of being despised, deliver me, O Jesus.
From the fear of suffering rebukes, deliver me, O Jesus.
From the fear of being calumniated, deliver me, O Jesus.
From the fear of being forgotten, deliver me, O Jesus.
From the fear of being ridiculed, deliver me, O Jesus.
From the fear of being wronged, deliver me, O Jesus.
From the fear of being suspected, deliver me, O Jesus.

That others may be loved more than I, Jesus, grant me the grace to desire it.
That others may be esteemed more than I, Jesus, grant me the grace to desire it.
That others may increase in the opinion of the world and I decrease, Jesus, grant me the grace to desire it.
That others may be chosen and I set aside, Jesus, grant me the grace to desire it.
That others may be praised and I go unnoticed, Jesus, grant me the grace to desire it.
That others may be preferred to me in everything, Jesus, grant me the grace to desire it.
That others may become holier than I, provided that I become as holy as thou wouldst have me, Jesus, grant me the grace to desire it.

He must increase, but I must decrease. Amen.`,

  // Litany of St. Joseph, with the seven invocations added in 2021 — same
  // interleaved positions as the Latin above.
  [PRAYER_TYPES.LITANY_ST_JOSEPH]: `Lord, have mercy. 2×
Christ, have mercy. 2×
Lord, have mercy. 2×
Christ, hear us.
Christ, graciously hear us.
God the Father of heaven, have mercy on us.
God the Son, Redeemer of the world, have mercy on us.
God the Holy Spirit, have mercy on us.
Holy Trinity, one God, have mercy on us.

Holy Mary, pray for us.
Saint Joseph, pray for us.
Illustrious son of David, pray for us.
Light of the patriarchs, pray for us.
Spouse of the Mother of God, pray for us.
Guardian of the Redeemer, pray for us.
Chaste guardian of the Virgin, pray for us.
Foster-father of the Son of God, pray for us.
Diligent defender of Christ, pray for us.
Servant of Christ, pray for us.
Minister of salvation, pray for us.
Head of the Holy Family, pray for us.
Joseph most just, pray for us.
Joseph most chaste, pray for us.
Joseph most prudent, pray for us.
Joseph most valiant, pray for us.
Joseph most obedient, pray for us.
Joseph most faithful, pray for us.
Mirror of patience, pray for us.
Lover of poverty, pray for us.
Model of workmen, pray for us.
Glory of domestic life, pray for us.
Guardian of virgins, pray for us.
Pillar of families, pray for us.
Support in difficulties, pray for us.
Solace of the wretched, pray for us.
Hope of the sick, pray for us.
Patron of exiles, pray for us.
Patron of the afflicted, pray for us.
Patron of the poor, pray for us.
Patron of the dying, pray for us.
Terror of demons, pray for us.
Protector of holy Church, pray for us.

Lamb of God, who takest away the sins of the world, spare us, O Lord.
Lamb of God, who takest away the sins of the world, graciously hear us, O Lord.
Lamb of God, who takest away the sins of the world, have mercy on us.

℣ He made him the lord of his house.
℟ And the ruler of all his possessions.
Let us pray. O God, who in thine ineffable providence didst vouchsafe to choose blessed Joseph to be the spouse of thy most holy Mother: grant, we beseech thee, that we may deserve to have him for our intercessor in heaven, whom we venerate as our protector on earth. Through Christ our Lord. Amen.`,

  // Litany of the Most Precious Blood — the 24 invocations of the 1960 text.
  [PRAYER_TYPES.LITANY_PRECIOUS_BLOOD]: `Lord, have mercy. 2×
Christ, have mercy. 2×
Lord, have mercy. 2×
Christ, hear us.
Christ, graciously hear us.
God the Father of heaven, have mercy on us.
God the Son, Redeemer of the world, have mercy on us.
God the Holy Spirit, have mercy on us.
Holy Trinity, one God, have mercy on us.

Blood of Christ, only-begotten Son of the eternal Father, save us.
Blood of Christ, incarnate Word of God, save us.
Blood of Christ, of the new and eternal Testament, save us.
Blood of Christ, falling upon the earth in the agony, save us.
Blood of Christ, shed profusely in the scourging, save us.
Blood of Christ, flowing forth in the crowning with thorns, save us.
Blood of Christ, poured out on the Cross, save us.
Blood of Christ, price of our salvation, save us.
Blood of Christ, without which there is no forgiveness, save us.
Blood of Christ, Eucharistic drink and refreshment of souls, save us.
Blood of Christ, stream of mercy, save us.
Blood of Christ, victor over demons, save us.
Blood of Christ, courage of martyrs, save us.
Blood of Christ, strength of confessors, save us.
Blood of Christ, bringing forth virgins, save us.
Blood of Christ, help of those in peril, save us.
Blood of Christ, relief of the burdened, save us.
Blood of Christ, solace in sorrow, save us.
Blood of Christ, hope of the penitent, save us.
Blood of Christ, consolation of the dying, save us.
Blood of Christ, peace and tenderness of hearts, save us.
Blood of Christ, pledge of eternal life, save us.
Blood of Christ, freeing souls from the depths of purgatory, save us.
Blood of Christ, most worthy of all glory and honour, save us.

Lamb of God, who takest away the sins of the world, spare us, O Lord.
Lamb of God, who takest away the sins of the world, graciously hear us, O Lord.
Lamb of God, who takest away the sins of the world, have mercy on us.

℣ Thou hast redeemed us, O Lord, in thy Blood.
℟ And made us for our God a kingdom.
Let us pray. Almighty and eternal God, who hast appointed thine only-begotten Son to be the Redeemer of the world, and hast willed to be appeased by his Blood: grant, we beseech thee, that we may so venerate the price of our salvation, and by its power be so defended on earth against the evils of this present life, that we may rejoice in its everlasting fruit in heaven. Through the same Christ our Lord. Amen.`,

  // ---------------------------------------------------------------------------
  // English for the Litany of the Saints: like the Czech beside it, OUR OWN
  // rendering of the traditional Latin, section for section and line for line.
  // ---------------------------------------------------------------------------

  [PRAYER_TYPES.LITANY_SAINTS_SUPPLICATIO]: `Lord, have mercy. 2×
Christ, have mercy. 2×
Lord, have mercy. 2×
Christ, hear us.
Christ, graciously hear us.
God the Father of heaven, have mercy on us.
God the Son, Redeemer of the world, have mercy on us.
God the Holy Spirit, have mercy on us.
Holy Trinity, one God, have mercy on us.`,

  [PRAYER_TYPES.LITANY_SAINTS_MARY]: `Holy Mary, pray for us.
Holy Mother of God, pray for us.
Holy Virgin of virgins, pray for us.
Saint Michael, pray for us.
Saint Gabriel, pray for us.
Saint Raphael, pray for us.
All ye holy angels and archangels, pray for us.
All ye holy orders of blessed spirits, pray for us.`,

  [PRAYER_TYPES.LITANY_SAINTS_PATRIARCHS]: `Saint Abraham, pray for us.
Saint Moses, pray for us.
Saint Elijah, pray for us.
Saint John the Baptist, pray for us.
Saint Joseph, pray for us.
All ye holy patriarchs and prophets, pray for us.`,

  [PRAYER_TYPES.LITANY_SAINTS_APOSTLES]: `Saint Peter, pray for us.
Saint Paul, pray for us.
Saint Andrew, pray for us.
Saint James the Greater, pray for us.
Saint John, pray for us.
Saint Thomas, pray for us.
Saint James the Less, pray for us.
Saint Philip, pray for us.
Saint Bartholomew, pray for us.
Saint Matthew, pray for us.
Saint Simon, pray for us.
Saint Thaddeus, pray for us.
Saint Matthias, pray for us.
Saint Barnabas, pray for us.
Saint Luke, pray for us.
Saint Mark, pray for us.
All ye holy apostles and evangelists, pray for us.
All ye holy disciples of the Lord, pray for us.`,

  [PRAYER_TYPES.LITANY_SAINTS_MARTYRS]: `All ye holy Innocents, pray for us.
Saint Stephen, pray for us.
Saint Ignatius of Antioch, pray for us.
Saint Polycarp, pray for us.
Saint Justin, pray for us.
Saint Lawrence, pray for us.
Saint Vincent, pray for us.
Saints Fabian and Sebastian, pray for us.
Saints John and Paul, pray for us.
Saints Cosmas and Damian, pray for us.
Saints Gervase and Protase, pray for us.
Saint Cyprian, pray for us.
Saint Boniface, pray for us.
Saint Stanislaus, pray for us.
Saint Thomas Becket, pray for us.
Saints John Fisher and Thomas More, pray for us.
Saint Paul Miki, pray for us.
Saints John de Brébeuf and Isaac Jogues, pray for us.
Saint Peter Chanel, pray for us.
Saint Charles Lwanga, pray for us.
Saints Perpetua and Felicity, pray for us.
Saint Maria Goretti, pray for us.
All ye holy martyrs, pray for us.`,

  [PRAYER_TYPES.LITANY_SAINTS_BISHOPS]: `Saint Sylvester, pray for us.
Saint Leo, pray for us.
Saint Gregory, pray for us.
Saint Ambrose, pray for us.
Saint Augustine, pray for us.
Saint Jerome, pray for us.
Saint Athanasius, pray for us.
Saints Basil and Gregory Nazianzen, pray for us.
Saint John Chrysostom, pray for us.
Saint Martin, pray for us.
Saint Nicholas, pray for us.
Saint Patrick, pray for us.
Saints Cyril and Methodius, pray for us.
Saint Charles Borromeo, pray for us.
Saint Francis de Sales, pray for us.
Saint Pius the Tenth, pray for us.
All ye holy popes and confessors, pray for us.
All ye holy doctors, pray for us.`,

  [PRAYER_TYPES.LITANY_SAINTS_RELIGIOUS]: `Saint Anthony, pray for us.
Saint Benedict, pray for us.
Saint Bernard, pray for us.
Saint Dominic, pray for us.
Saint Francis, pray for us.
Saint Thomas Aquinas, pray for us.
Saint Ignatius of Loyola, pray for us.
Saint Francis Xavier, pray for us.
Saint Vincent de Paul, pray for us.
Saint John Mary Vianney, pray for us.
Saint John Bosco, pray for us.
All ye holy priests and levites, pray for us.
All ye holy monks and hermits, pray for us.`,

  [PRAYER_TYPES.LITANY_SAINTS_WOMEN]: `Saint Anne, pray for us.
Saint Mary Magdalene, pray for us.
Saint Agatha, pray for us.
Saint Lucy, pray for us.
Saint Agnes, pray for us.
Saint Cecilia, pray for us.
Saint Catherine, pray for us.
Saint Anastasia, pray for us.
Saint Catherine of Siena, pray for us.
Saint Teresa of Avila, pray for us.
Saint Rose of Lima, pray for us.
All ye holy virgins and widows, pray for us.`,

  [PRAYER_TYPES.LITANY_SAINTS_LAITY]: `Saint Louis, pray for us.
Saint Monica, pray for us.
Saint Elizabeth of Hungary, pray for us.
All ye holy men and women, saints of God, intercede for us.`,

  [PRAYER_TYPES.LITANY_SAINTS_CHRIST]: `Be merciful, spare us, O Lord.
Be merciful, graciously hear us, O Lord.
From all evil, deliver us, O Lord.
From all sin, deliver us, O Lord.
From thy wrath, deliver us, O Lord.
From sudden and unlooked-for death, deliver us, O Lord.
From the snares of the devil, deliver us, O Lord.
From anger, hatred and all ill will, deliver us, O Lord.
From the spirit of fornication, deliver us, O Lord.
From lightning and tempest, deliver us, O Lord.
From the scourge of earthquake, deliver us, O Lord.
From plague, famine and war, deliver us, O Lord.
From everlasting death, deliver us, O Lord.
Through the mystery of thy holy Incarnation, deliver us, O Lord.
Through thy coming, deliver us, O Lord.
Through thy nativity, deliver us, O Lord.
Through thy baptism and holy fasting, deliver us, O Lord.
Through thy cross and passion, deliver us, O Lord.
Through thy death and burial, deliver us, O Lord.
Through thy holy resurrection, deliver us, O Lord.
Through thine admirable ascension, deliver us, O Lord.
Through the coming of the Holy Spirit, the Paraclete, deliver us, O Lord.
On the day of judgement, deliver us, O Lord.`,

  [PRAYER_TYPES.LITANY_SAINTS_NECESSITIES]: `We sinners, we beseech thee, hear us.
That thou wouldst spare us, we beseech thee, hear us.
That thou wouldst pardon us, we beseech thee, hear us.
That thou wouldst vouchsafe to bring us to true penance, we beseech thee, hear us.
That thou wouldst vouchsafe to govern and preserve thy holy Church, we beseech thee, hear us.
That thou wouldst vouchsafe to preserve the Apostolic Lord and all the orders of the Church in holy religion, we beseech thee, hear us.
That thou wouldst vouchsafe to humble the enemies of holy Church, we beseech thee, hear us.
That thou wouldst vouchsafe to grant peace and true concord to Christian rulers and princes, we beseech thee, hear us.
That thou wouldst vouchsafe to bestow peace and unity on all Christian people, we beseech thee, hear us.
That thou wouldst vouchsafe to call back to the unity of the Church all who have gone astray, and to lead all unbelievers to the light of the Gospel, we beseech thee, hear us.
That thou wouldst vouchsafe to strengthen and preserve us in thy holy service, we beseech thee, hear us.
That thou wouldst lift up our minds to heavenly desires, we beseech thee, hear us.
That thou wouldst render eternal good to all our benefactors, we beseech thee, hear us.
That thou wouldst deliver from eternal damnation our souls and those of our brethren, kindred and benefactors, we beseech thee, hear us.
That thou wouldst vouchsafe to give and preserve the fruits of the earth, we beseech thee, hear us.
That thou wouldst vouchsafe to grant eternal rest to all the faithful departed, we beseech thee, hear us.
That thou wouldst vouchsafe to hear us, we beseech thee, hear us.`,

  [PRAYER_TYPES.LITANY_SAINTS_CONCLUSION]: `Son of God, we beseech thee, hear us.
Lamb of God, who takest away the sins of the world, spare us, O Lord.
Lamb of God, who takest away the sins of the world, graciously hear us, O Lord.
Lamb of God, who takest away the sins of the world, have mercy on us.
Christ, hear us.
Christ, graciously hear us.
Lord, have mercy. 2×
Christ, have mercy. 2×
Lord, have mercy. 2×`,

  [PRAYER_TYPES.LITANY_SAINTS_PSALM]: `{r}Our Father (in silence){/r}
℣ And lead us not into temptation.
℟ But deliver us from evil.

{r}Psalm 69{/r}
℣ O God, come to my assistance:
℟ O Lord, make haste to help me.
℣ Let them be confounded and ashamed,
℟ that seek after my soul.
℣ Let them be turned backward and blush for shame,
℟ that desire evils to me.
℣ Let them be presently turned away blushing for shame,
℟ that say to me: Aha, aha.
℣ Let them rejoice and be glad in thee,
℟ all they that seek thee.
℣ And let them say always: The Lord be magnified,
℟ who love thy salvation.
℣ But I am needy and poor:
℟ O God, help me.
℣ Thou art my helper and my deliverer:
℟ O Lord, make no delay.
℣ Glory be to the Father, and to the Son, and to the Holy Spirit.
℟ As it was in the beginning, is now, and ever shall be, world without end. Amen.`,

  [PRAYER_TYPES.LITANY_SAINTS_VERSICLES]: `℣ Save thy servants.
℟ Who hope in thee, O my God.
℣ Be unto us, O Lord, a tower of strength.
℟ Against the face of the enemy.
℣ Let not the enemy prevail against us.
℟ Nor the son of iniquity have power to harm us.
℣ O Lord, deal not with us according to our sins.
℟ Neither requite us according to our iniquities.
℣ Let us pray for our Sovereign Pontiff N.
℟ The Lord preserve him and give him life, and make him blessed upon the earth, and deliver him not up to the will of his enemies.
℣ Let us pray for our benefactors.
℟ Vouchsafe, O Lord, for thy name's sake, to reward with eternal life all those who do us good. Amen.
℣ Let us pray for the faithful departed.
℟ Eternal rest grant unto them, O Lord, and let perpetual light shine upon them.
℣ May they rest in peace.
℟ Amen.
℣ For our absent brethren.
℟ Save thy servants, who hope in thee, O my God.
℣ Send them help, O Lord, from thy holy place.
℟ And from Sion protect them.
℣ O Lord, hear my prayer.
℟ And let my cry come unto thee.
℣ The Lord be with you.
℟ And with thy spirit.`,

  [PRAYER_TYPES.LITANY_SAINTS_COLLECTS]: `Let us pray.
O God, whose property is always to have mercy and to spare: receive our petition; that we, and all thy servants who are bound by the chains of sin, may by the compassion of thy goodness be mercifully absolved.
Graciously hear, we beseech thee, O Lord, the prayers of thy suppliants, and pardon the sins of those who confess to thee: that in thy bounty thou mayest grant us both pardon and peace.
In thy clemency, O Lord, show unto us thine unspeakable mercy: that thou mayest both loose us from all our sins, and deliver us from the punishments which we deserve for them.
O God, who by sin art offended and by penance pacified: mercifully regard the prayers of thy suppliant people, and turn away the scourges of thine anger, which we deserve for our sins.
Almighty, everlasting God, have mercy upon thy servant N., our Sovereign Pontiff, and direct him according to thy clemency into the way of everlasting salvation: that by thy grace he may desire those things that are pleasing to thee, and perform them with all his strength.
O God, from whom are holy desires, good counsels and just works: give to thy servants that peace which the world cannot give; that our hearts be set to keep thy commandments, and that being removed from the fear of our enemies, we may pass our time in peace under thy protection.
Inflame, O Lord, our desire and heart with the fire of the Holy Spirit: that we may serve thee with a chaste body, and please thee with a clean heart.
O God, the Creator and Redeemer of all the faithful, give to the souls of thy servants departed the remission of all their sins: that, through pious supplication, they may obtain the pardon which they have always desired.
Direct, we beseech thee, O Lord, our actions by thy holy inspirations, and carry them on by thy gracious assistance: that every prayer and work of ours may begin always from thee, and through thee be happily ended.
Almighty and everlasting God, who hast dominion over the living and the dead, and art merciful to all whom thou foreknowest will be thine by faith and good works: we humbly beseech thee that those for whom we intend to pour forth our prayers, whether this present world still detain them in the flesh or the world to come has already received them out of their bodies, may, through the intercession of all thy saints, by the clemency of thy goodness obtain the remission of all their sins. Through our Lord Jesus Christ. Amen.

℣ The Lord be with you.
℟ And with thy spirit.
℣ May the almighty and merciful Lord graciously hear us.
℟ Amen.
℣ May the souls of the faithful departed, through the mercy of God, rest in peace.
℟ Amen.`,

  // Chaplet of Divine Mercy: the Marians of the Immaculate Conception's text,
  // checked against EWTN and a catholic.com leaflet (the closing prayer and
  // "fount of mercy" from the latter). A modern devotion, so "you" rather than
  // "thee", as with the Liturgy of the Hours antiphons above.
  [PRAYER_TYPES.CHAPLET_OPENING]: `You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world. O Fount of Life, unfathomable Divine Mercy, envelop the whole world and empty yourself out upon us.`,

  [PRAYER_TYPES.CHAPLET_BLOOD_WATER]: `O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in you!`,

  [PRAYER_TYPES.CHAPLET_ETERNAL_FATHER]: `Eternal Father, I offer you the Body and Blood, Soul and Divinity of your dearly beloved Son, our Lord Jesus Christ, in atonement for our sins and those of the whole world.`,

  [PRAYER_TYPES.CHAPLET_PASSION]: `For the sake of his sorrowful Passion, have mercy on us and on the whole world.`,

  [PRAYER_TYPES.CHAPLET_TRISAGION]: `Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.`,

  [PRAYER_TYPES.CHAPLET_CLOSING]: `Eternal God, in whom mercy is endless and the treasury of compassion inexhaustible, look kindly upon us and increase your mercy in us, that in difficult moments we might not despair nor become despondent, but with great confidence submit ourselves to your holy will, which is Love and Mercy itself.`,

  [PRAYER_TYPES.CHAPLET_TRUST]: `Jesus, I trust in you.`,

  // The Seven Sorrows and Joys of St. Joseph. The headings are our own
  // rendering of the Latin. Vírginum custos follows preces-latinae.org, less
  // its "all the days of my life", which the Latin does not have.
  [PRAYER_TYPES.IOSEPH_1]: ioseph("I. The doubt about Mary, and the message of the Angel.", PATER_NOSTER_EN),
  [PRAYER_TYPES.IOSEPH_2]: ioseph("II. The poverty of Christ's birth, and the Nativity itself.", PATER_NOSTER_EN),
  [PRAYER_TYPES.IOSEPH_3]: ioseph("III. The Circumcision of Christ, and the naming of Jesus.", PATER_NOSTER_EN),
  [PRAYER_TYPES.IOSEPH_4]: ioseph("IV. Simeon's prophecy of the fall and the rising of many in Israel.", PATER_NOSTER_EN),
  [PRAYER_TYPES.IOSEPH_5]: ioseph("V. The flight into Egypt, and the overthrow of the idols.", PATER_NOSTER_EN),
  [PRAYER_TYPES.IOSEPH_6]: ioseph("VI. The return from Egypt, and the life with Jesus and Mary.", PATER_NOSTER_EN),
  [PRAYER_TYPES.IOSEPH_7]: ioseph("VII. The loss of Jesus, and his finding in the Temple.", PATER_NOSTER_EN),

  [PRAYER_TYPES.IOSEPH_VIRGINUM_CUSTOS]: `Guardian of virgins and father, Saint Joseph, to whose faithful custody Innocence itself, Christ Jesus, and Mary, Virgin of virgins, were committed: I pray and beseech thee by each of these dear pledges, Jesus and Mary, that, being preserved from all uncleanness, I may with spotless mind, pure heart and chaste body ever serve Jesus and Mary most chastely. Amen.`,
};

// The prayer body the card shows when the LA↔<language> toggle is on the
// translation side. Keyed by UI locale, so a new locale in i18n.ts fails to
// compile here until its table exists.
export const PRAYER_TRANSLATIONS: Record<Locale, Record<StaticPrayerType, string>> = {
  cs: PRAYERS_CS,
  en: PRAYERS_EN,
};
