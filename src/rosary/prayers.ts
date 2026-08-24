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

  // Orationes utilissimæ additions. Czech sourced verbatim from orationes.pdf.
  [PRAYER_TYPES.NICENE_CREED]: `Věřím v jednoho Boha, Otce všemohoucího, Stvořitele nebe i země, všeho viditelného i neviditelného. Věřím v jednoho Pána, Ježíše Krista, jednorozeného Syna Božího, který se zrodil z Otce přede všemi věky: Bůh z Boha, Světlo ze Světla, pravý Bůh z pravého Boha, zrozený, nestvořený, jedné podstaty s Otcem: skrze něho všechno je stvořeno. On pro nás lidi a pro naši spásu sestoupil z nebe. Skrze Ducha svatého přijal tělo z Marie Panny a stal se člověkem. Byl za nás ukřižován, za dnů Poncia Piláta byl umučen a pohřben. Třetího dne vstal z mrtvých podle Písma. Vstoupil do nebe, sedí po pravici Otce. A znovu přijde, ve slávě, soudit živé i mrtvé a jeho království bude bez konce. Věřím v Ducha svatého, Pána a dárce života, který z Otce i Syna vychází, s Otcem i Synem je zároveň uctíván a oslavován a mluvil ústy proroků. Věřím v jednu, svatou, všeobecnou, apoštolskou církev. Vyznávám jeden křest na odpuštění hříchů. Očekávám vzkříšení mrtvých a život budoucího věku. Amen.`,

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

  // Czech sourced verbatim from angelus-domini-anima-christi.pdf.
  [PRAYER_TYPES.ANGELUS]: `℣ Anděl Páně zvěstoval Panně Marii.
℟ A ona počala z Ducha svatého.

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
℟ A ona počala z Ducha svatého.
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
Bože Duchu svatý, smiluj se nad námi.
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
Stánku Ducha svatého, oroduj za nás.
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
℟ a ona počala z Ducha svatého.
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
  // jménu Ježíš), which maps 1:1 onto the Latin above; the wording of the closing
  // collect is ours, guided by that source and vojtechkodet.cz (both fetches
  // refused a verbatim closing prayer). NOT Kancionál-verified — unlike the other
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
Modleme se: Pane Ježíši Kriste, tys řekl: Proste, a bude vám dáno; hledejte, a naleznete; tlucte, a bude vám otevřeno. Prosíme tě, dej nám vroucnost své božské lásky, abychom tě milovali celým srdcem, slovy i skutky a nikdy tě nepřestali chválit. Dej nám, Pane, ať máme tvé svaté jméno stále v úctě i v lásce, neboť ty nikdy nepřestáváš chránit ty, které utvrzuješ ve své lásce. Neboť ty žiješ a kraluješ na věky věků. Amen.`,

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
  // Czech for the Litany of the Saints: OUR OWN TRANSLATION, not a sourced text.
  // The Czech liturgical books carry only the modern short form (Kancionál 068A/B),
  // so there is nothing to transcribe for the traditional one. Treat exactly like
  // the BRIGIT_* entries: if a Czech edition of the traditional litany is ever
  // obtained, replace this verbatim. Saint names use their standard Czech forms;
  // the deprecations, intercessions, psalm and collects follow the Latin closely
  // in the usual Czech liturgical register.
  // ---------------------------------------------------------------------------

  [PRAYER_TYPES.LITANY_SAINTS_SUPPLICATIO]: `Pane, smiluj se. 2×
Kriste, smiluj se. 2×
Pane, smiluj se. 2×
Kriste, uslyš nás.
Kriste, vyslyš nás.
Bože, náš nebeský Otče, smiluj se nad námi.
Bože Synu, Vykupiteli světa, smiluj se nad námi.
Bože Duchu Svatý, smiluj se nad námi.
Bože v Trojici jediný, smiluj se nad námi.`,

  [PRAYER_TYPES.LITANY_SAINTS_MARY]: `Svatá Maria, oroduj za nás.
Svatá Boží Rodičko, oroduj za nás.
Svatá Panno panen, oroduj za nás.
Svatý Michaeli, oroduj za nás.
Svatý Gabrieli, oroduj za nás.
Svatý Rafaeli, oroduj za nás.
Všichni svatí andělé a archandělé, orodujte za nás.
Všechny svaté řády blažených duchů, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_PATRIARCHS]: `Svatý Abraháme, oroduj za nás.
Svatý Mojžíši, oroduj za nás.
Svatý Eliáši, oroduj za nás.
Svatý Jene Křtiteli, oroduj za nás.
Svatý Josefe, oroduj za nás.
Všichni svatí patriarchové a proroci, orodujte za nás.`,

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
Všichni svatí apoštolové a evangelisté, orodujte za nás.
Všichni svatí učedníci Páně, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_MARTYRS]: `Všechna svatá Neviňátka, orodujte za nás.
Svatý Štěpáne, oroduj za nás.
Svatý Ignáci z Antiochie, oroduj za nás.
Svatý Polykarpe, oroduj za nás.
Svatý Justine, oroduj za nás.
Svatý Vavřinče, oroduj za nás.
Svatý Vincenci, oroduj za nás.
Svatí Fabiáne a Šebestiáne, orodujte za nás.
Svatí Jane a Pavle, orodujte za nás.
Svatí Kosmo a Damiáne, orodujte za nás.
Svatí Gervasi a Protasi, orodujte za nás.
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
Všichni svatí mučedníci, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_BISHOPS]: `Svatý Silvestře, oroduj za nás.
Svatý Lve, oroduj za nás.
Svatý Řehoři, oroduj za nás.
Svatý Ambroži, oroduj za nás.
Svatý Augustine, oroduj za nás.
Svatý Jeronýme, oroduj za nás.
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
Všichni svatí papežové a vyznavači, orodujte za nás.
Všichni svatí učitelé církve, orodujte za nás.`,

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
Všichni svatí kněží a levité, orodujte za nás.
Všichni svatí mniši a poustevníci, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_WOMEN]: `Svatá Anno, oroduj za nás.
Svatá Maří Magdaléno, oroduj za nás.
Svatá Agáto, oroduj za nás.
Svatá Lucie, oroduj za nás.
Svatá Anežko, oroduj za nás.
Svatá Cecílie, oroduj za nás.
Svatá Kateřino, oroduj za nás.
Svatá Anastázie, oroduj za nás.
Svatá Kateřino Sienská, oroduj za nás.
Svatá Terezie z Avily, oroduj za nás.
Svatá Růženo z Limy, oroduj za nás.
Všechny svaté panny a vdovy, orodujte za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_LAITY]: `Svatý Ludvíku, oroduj za nás.
Svatá Moniko, oroduj za nás.
Svatá Alžběto Uherská, oroduj za nás.
Všichni svatí a světice Boží, přimlouvejte se za nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_CHRIST]: `Měj s námi slitování, odpusť nám, Pane.
Měj s námi slitování, vyslyš nás, Pane.
Ode všeho zlého, vysvoboď nás, Pane.
Ode všeho hříchu, vysvoboď nás, Pane.
Od svého hněvu, vysvoboď nás, Pane.
Od náhlé a nenadálé smrti, vysvoboď nás, Pane.
Od ďáblových úkladů, vysvoboď nás, Pane.
Od hněvu, nenávisti a vší zlé vůle, vysvoboď nás, Pane.
Od ducha smilstva, vysvoboď nás, Pane.
Od blesku a bouře, vysvoboď nás, Pane.
Od pohromy zemětřesení, vysvoboď nás, Pane.
Od moru, hladu a války, vysvoboď nás, Pane.
Od smrti věčné, vysvoboď nás, Pane.
Pro tajemství svého svatého vtělení, vysvoboď nás, Pane.
Pro svůj příchod, vysvoboď nás, Pane.
Pro své narození, vysvoboď nás, Pane.
Pro svůj křest a svatý post, vysvoboď nás, Pane.
Pro svůj kříž a umučení, vysvoboď nás, Pane.
Pro svou smrt a pohřeb, vysvoboď nás, Pane.
Pro své svaté vzkříšení, vysvoboď nás, Pane.
Pro své podivuhodné nanebevstoupení, vysvoboď nás, Pane.
Pro příchod Ducha Svatého Utěšitele, vysvoboď nás, Pane.
V den soudu, vysvoboď nás, Pane.`,

  [PRAYER_TYPES.LITANY_SAINTS_NECESSITIES]: `I když jsme hříšníci, prosíme tě, vyslyš nás.
Abys nás ušetřil, prosíme tě, vyslyš nás.
Abys nám prominul, prosíme tě, vyslyš nás.
Abys nás přivedl k pravému pokání, prosíme tě, vyslyš nás.
Abys svou svatou církev vedl a chránil, prosíme tě, vyslyš nás.
Abys Svatého otce a všechny stavy církve zachoval ve svaté službě, prosíme tě, vyslyš nás.
Abys pokořil nepřátele své svaté církve, prosíme tě, vyslyš nás.
Abys křesťanským vládcům a knížatům daroval mír a pravou svornost, prosíme tě, vyslyš nás.
Abys všemu křesťanskému lidu udělil mír a jednotu, prosíme tě, vyslyš nás.
Abys všechny bloudící přivedl zpět k jednotě církve a všechny nevěřící ke světlu evangelia, prosíme tě, vyslyš nás.
Abys nás samé posílil a zachoval ve své svaté službě, prosíme tě, vyslyš nás.
Abys naše mysli povznesl k touze po nebeském, prosíme tě, vyslyš nás.
Abys všem našim dobrodincům odplatil věčnými dary, prosíme tě, vyslyš nás.
Abys naše duše i duše našich bratří, příbuzných a dobrodinců vytrhl z věčného zavržení, prosíme tě, vyslyš nás.
Abys dal a zachoval plody země, prosíme tě, vyslyš nás.
Abys všem věrným zemřelým daroval věčné odpočinutí, prosíme tě, vyslyš nás.
Abys nás vyslyšel, prosíme tě, vyslyš nás.`,

  [PRAYER_TYPES.LITANY_SAINTS_CONCLUSION]: `Synu Boží, prosíme tě, vyslyš nás.
Beránku Boží, který snímáš hříchy světa, odpusť nám, Pane.
Beránku Boží, který snímáš hříchy světa, vyslyš nás, Pane.
Beránku Boží, který snímáš hříchy světa, smiluj se nad námi.
Kriste, uslyš nás.
Kriste, vyslyš nás.
Pane, smiluj se. 2×
Kriste, smiluj se. 2×
Pane, smiluj se. 2×`,

  [PRAYER_TYPES.LITANY_SAINTS_PSALM]: `{r}Otče náš (potichu){/r}
℣ A neuveď nás v pokušení.
℟ Ale zbav nás od zlého.

{r}Žalm 69{/r}
℣ Bože, shlédni a pomoz mi:
℟ Pane, pospěš mi na pomoc.
℣ Ať jsou zahanbeni a zmateni,
℟ kdo mi ukládají o život.
℣ Ať musí s hanbou odejít,
℟ kdo mi chtějí zlé.
℣ Ať se ihned zahanbeni odvrátí,
℟ kdo mi říkají: Cha, cha!
℣ Ať se veselí a radují v tobě,
℟ všichni, kdo tě hledají.
℣ Ať stále říkají: Veliký je Pán,
℟ všichni, kdo milují tvou spásu.
℣ Já jsem však ubohý a nuzný:
℟ Bože, pomoz mi.
℣ Tys má pomoc a můj osvoboditel:
℟ Pane, neprodlévej.
℣ Sláva Otci i Synu i Duchu Svatému.
℟ Jako byla na počátku, i nyní i vždycky a na věky věků. Amen.`,

  [PRAYER_TYPES.LITANY_SAINTS_VERSICLES]: `℣ Zachraň své služebníky.
℟ Bože můj, kteří v tebe doufají.
℣ Buď nám, Pane, pevnou tvrzí.
℟ Před tváří nepřítele.
℣ Ať proti nám nepřítel nic nezmůže.
℟ A syn nepravosti ať nám neuškodí.
℣ Pane, nenakládej s námi podle našich hříchů.
℟ Ani nám neodplácej podle našich nepravostí.
℣ Modleme se za našeho papeže N.
℟ Ať ho Pán zachová a dá mu život, ať ho učiní blaženým na zemi a nevydá ho zvůli jeho nepřátel.
℣ Modleme se za naše dobrodince.
℟ Odplať, Pane, pro své jméno životem věčným všem, kdo nám prokazují dobro. Amen.
℣ Modleme se za věrné zemřelé.
℟ Odpočinutí věčné dej jim, Pane, a světlo věčné ať jim svítí.
℣ Ať odpočívají v pokoji.
℟ Amen.
℣ Za naše vzdálené bratry.
℟ Zachraň své služebníky, Bože můj, kteří v tebe doufají.
℣ Sešli jim, Pane, pomoc ze svatyně.
℟ A ze Siónu je ochraňuj.
℣ Pane, vyslyš mou modlitbu.
℟ A mé volání ať k tobě dojde.
℣ Pán s vámi.
℟ I s tebou.`,

  [PRAYER_TYPES.LITANY_SAINTS_COLLECTS]: `Modleme se.
Bože, tobě je vlastní stále se smilovávat a odpouštět: přijmi naši pokornou prosbu, a nás i všechny své služebníky, které svazuje řetěz hříchů, ať milosrdně rozváže soucit tvé dobroty.
Vyslyš, prosíme, Pane, modlitby těch, kdo tě pokorně vzývají, a odpusť hříchy těm, kdo se ti vyznávají: abys nám ve své dobrotě daroval zároveň prominutí i pokoj.
Prokaž nám, Pane, milostivě své nevýslovné milosrdenství: abys nás zároveň zbavil všech hříchů a vytrhl z trestů, které jsme si za ně zasloužili.
Bože, tebe vina zarmucuje a pokání usmiřuje: shlédni milostivě na prosby svého lidu a odvrať rány svého hněvu, které jsme si svými hříchy zasloužili.
Všemohoucí věčný Bože, smiluj se nad svým služebníkem, naším papežem N., a veď ho ve své dobrotě po cestě věčné spásy: ať z tvé milosti touží po tom, co se ti líbí, a plní to ze všech svých sil.
Bože, od tebe pocházejí svatá přání, správná rozhodnutí a spravedlivé činy: dej svým služebníkům onen pokoj, který svět dát nemůže; ať jsou naše srdce oddána tvým příkazům a ať jsou naše časy pod tvou ochranou pokojné, zbavené strachu z nepřátel.
Rozněť, Pane, ohněm Ducha Svatého naše nitro i naše srdce: ať ti sloužíme s čistým tělem a líbíme se ti čistým srdcem.
Bože, Stvořiteli a Vykupiteli všech věřících, dej duším svých služebníků a služebnic odpuštění všech hříchů: ať skrze zbožné prosby dosáhnou prominutí, po němž vždy toužily.
Předcházej, prosíme, Pane, naše konání svým vnuknutím a provázej je svou pomocí: ať každá naše modlitba i každý náš čin od tebe vždy začíná a skrze tebe je dokončen.
Všemohoucí věčný Bože, ty vládneš živým i mrtvým a smilováváš se nad všemi, o nichž předvídáš, že budou tvoji vírou a činy: pokorně tě vzýváme, ať ti, za které jsme se rozhodli vylévat prosby, ať je tento svět ještě zadržuje v těle nebo je onen budoucí už přijal zbavené těla, dosáhnou na přímluvu všech tvých svatých z milosti tvé dobrotivosti odpuštění všech svých vin. Skrze našeho Pána Ježíše Krista. Amen.

℣ Pán s vámi.
℟ I s tebou.
℣ Ať nás vyslyší všemohoucí a milosrdný Pán.
℟ Amen.
℣ A duše věřících ať pro Boží milosrdenství odpočívají v pokoji.
℟ Amen.`,
};
