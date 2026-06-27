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
  // liturgical Latin (the Paschal one from the Regína Cæli source). Agnus Dei rendered
  // as "miserére nobis" ×3 to match the ČBK Czech. Seasonal endings carry red rubrics.
  [PRAYER_TYPES.LITANY_LORETO]: `Kyrie, eléison. 2×
Christe, eléison. 2×
Kyrie, eléison. 2×
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

Agnus Dei, qui tollis peccáta mundi, miserére nobis. 3×

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
  // Czech sourced verbatim from the ČBK Kancionál (065). Agnus Dei = miserére ×3
  // to match the Czech.
  [PRAYER_TYPES.LITANY_SACRED_HEART]: `Kyrie, eléison. 2×
Christe, eléison. 2×
Kyrie, eléison. 2×
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

Agnus Dei, qui tollis peccáta mundi, miserére nobis. 3×

℣ Iesu, mitis et húmilis Corde.
℟ Fac cor nostrum secúndum Cor tuum.
Orémus. Omnípotens sempitérne Deus, réspice in Cor dilectíssimi Fílii tui, et in laudes et satisfactiónes, quas in nómine peccatórum tibi persólvit, iísque misericórdiam tuam peténtibus tu véniam concéde placátus, in nómine eiúsdem Fílii tui Iesu Christi, qui tecum vivit et regnat in sǽcula sæculórum. Amen.`,
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
  // into their official positions per the user.
  [PRAYER_TYPES.LITANY_LORETO]: `Pane, smiluj se. 2×
Kriste, smiluj se. 2×
Pane, smiluj se. 2×
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

Beránku Boží, který snímáš hříchy světa, smiluj se nad námi. 3×

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

  // Czech sourced verbatim from the Kancionál (065, © ČBK).
  [PRAYER_TYPES.LITANY_SACRED_HEART]: `Pane, smiluj se. 2×
Kriste, smiluj se. 2×
Pane, smiluj se. 2×
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

Beránku Boží, který snímáš hříchy světa, smiluj se nad námi. 3×

℣ Ježíši tichý, srdce pokorného,
℟ přetvoř naše srdce podle Srdce svého.
Modleme se: Všemohoucí věčný Bože, pohleď na Srdce svého milovaného Syna, shlédni na chvály a dostiučinění, které ti přináší za nás hříšníky; usmiř se a odpusť nám, když skrze ně prosíme o tvé milosrdenství. Neboť on s tebou žije a kraluje na věky věků. Amen.`,
};
