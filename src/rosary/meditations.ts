import type { Localized, MysteryKey } from "./prayers";

// ─── The fruit of each mystery and a verse of Scripture ─────────────────────
// Shown above each rosary decade's Pater Noster when the ⋯ settings' switch
// is on (`ruzenec_meditation`, off by default).
//
// Verses — Latin: the Clementine Vulgate (drbo.org), accented and spelt as
// the app's Latin is (i for j, æ/œ, acute accents: OUR normalisation, the
// words unchanged). Czech: Sýkora's New Testament as revised by Jan Hejčl
// (*Nový Zákon Pána našeho Ježíše Krista*, Praha: Vyšehrad 1946; MZK
// Kramerius uuid:bc2d16c0-b266-11e8-a2d0-005056827e52) and, for the Song of
// Songs, Hejčl's *Bible česká* I/2 (1921; MZK uuid:1f47c8e0-67d5-11e3-8fee-
// 005056827e51), read in the page scans; capitals follow the Latin (*Duchem
// Svatým*). English: Douay-Rheims (Challoner, drbo.org). Long verses are cut
// to their core; "…" marks an omitted opening, in every language alike.
//
// Fruits — after St. Louis de Montfort, *The Secret of the Rosary* §§156–158
// (the offering of each decade), in short form. ⚠ OUR OWN: every Latin fruit
// (no Latin list was found), and the Czech where no witness was found; the
// Czech pokora, láska k bližnímu, svatá chudoba, lítost nad hříchy,
// trpělivost and víra follow *Rozjímání o tajemstvích svatého růžence*
// (1894; NKP uuid:f8887d20-db3f-11dd-85d1-000d606f5dc6). Replace with a
// printed source if one turns up. The sourcing notes, with every witness's
// page and the variants not taken: docs/research/fruits-verses-sources.md.
// ────────────────────────────────────────────────────────────────────────────

export type Meditation = {
  fruit: { la: string } & Localized;
  ref: { la: string } & Localized;
  verse: { la: string } & Localized;
};

export const FRUCTUS_LABEL = "Fructus mystérii";

export const MEDITATIONS: Record<MysteryKey, readonly Meditation[]> = {
  radostny: [
    {
      fruit: { la: "humílitas", cs: "pokora", en: "Humility" },
      ref: { la: "Lc 1, 38", cs: "Lk 1,38", en: "Luke 1:38" },
      verse: {
        la: "Ecce ancílla Dómini: fiat mihi secúndum verbum tuum.",
        cs: "Aj, já dívka Páně, staniž mi se podle slova tvého.",
        en: "Behold the handmaid of the Lord; be it done to me according to thy word.",
      },
    },
    {
      fruit: { la: "cáritas erga próximum", cs: "láska k bližnímu", en: "Love of neighbour" },
      ref: { la: "Lc 1, 42", cs: "Lk 1,42", en: "Luke 1:42" },
      verse: {
        la: "Benedícta tu inter mulíeres, et benedíctus fructus ventris tui.",
        cs: "Požehnanás ty mezi ženami a požehnaný plod života tvého.",
        en: "Blessed art thou among women, and blessed is the fruit of thy womb.",
      },
    },
    {
      fruit: { la: "paupértas spíritus", cs: "svatá chudoba", en: "Poverty of spirit" },
      ref: { la: "Lc 2, 7", cs: "Lk 2,7", en: "Luke 2:7" },
      verse: {
        la: "Et péperit fílium suum primogénitum, et pannis eum invólvit, et reclinávit eum in præsépio.",
        cs: "I porodila syna svého prvorozeného, obvinula ho plínkami a uložila v jeslích.",
        en: "And she brought forth her firstborn son, and wrapped him up in swaddling clothes, and laid him in a manger.",
      },
    },
    {
      fruit: { la: "sapiéntia et púritas", cs: "moudrost a čistota", en: "Wisdom and purity" },
      ref: { la: "Lc 2, 30", cs: "Lk 2,30", en: "Luke 2:30" },
      verse: {
        la: "… vidérunt óculi mei salutáre tuum.",
        cs: "… viděly oči mé spásu tvou.",
        en: "… my eyes have seen thy salvation.",
      },
    },
    {
      fruit: { la: "vera convérsio", cs: "pravé obrácení", en: "True conversion" },
      ref: { la: "Lc 2, 49", cs: "Lk 2,49", en: "Luke 2:49" },
      verse: {
        la: "Quid est quod me quærebátis? nesciebátis quia in his quæ Patris mei sunt, opórtet me esse?",
        cs: "Co jest, že jste mě hledali? Nevěděli jste, že já musím býti v tom, co jest Otce mého?",
        en: "How is it that you sought me? did you not know, that I must be about my father's business?",
      },
    },
  ],
  bolestny: [
    {
      fruit: { la: "contrítio peccatórum", cs: "lítost nad hříchy", en: "Sorrow for sin" },
      ref: { la: "Lc 22, 42", cs: "Lk 22,42", en: "Luke 22:42" },
      verse: {
        la: "Pater, si vis, transfer cálicem istum a me: verúmtamen non mea volúntas, sed tua fiat.",
        cs: "Otče, chceš-li, odejmi tento kalich ode mne, avšak ne má, nýbrž tvá vůle se staň.",
        en: "Father, if thou wilt, remove this chalice from me: but yet not my will, but thine be done.",
      },
    },
    {
      fruit: { la: "mortificátio sénsuum", cs: "umrtvování smyslů", en: "Mortification of the senses" },
      ref: { la: "Io 19, 1", cs: "Jan 19,1", en: "John 19:1" },
      verse: {
        la: "Tunc ergo apprehéndit Pilátus Iesum, et flagellávit.",
        cs: "Tu Pilát vzal Ježíše a dal ho zbičovati.",
        en: "Then therefore, Pilate took Jesus, and scourged him.",
      },
    },
    {
      fruit: { la: "contémptus mundi", cs: "pohrdání světem", en: "Contempt of the world" },
      ref: { la: "Io 19, 2", cs: "Jan 19,2", en: "John 19:2" },
      verse: {
        la: "Et mílites plecténtes corónam de spinis, imposuérunt cápiti eius: et veste purpúrea circumdedérunt eum.",
        cs: "A vojáci, spletše korunu z trní, vložili mu ji na hlavu a přioděli ho rouchem šarlatovým.",
        en: "And the soldiers platting a crown of thorns, put it upon his head; and they put on him a purple garment.",
      },
    },
    {
      fruit: { la: "patiéntia", cs: "trpělivost", en: "Patience" },
      ref: { la: "Io 19, 17", cs: "Jan 19,17", en: "John 19:17" },
      verse: {
        la: "Et báiulans sibi crucem exívit in eum, qui dícitur Calváriæ, locum.",
        cs: "A nesa sobě kříž, vyšel na místo, které slove Lebčí.",
        en: "And bearing his own cross, he went forth to that place which is called Calvary.",
      },
    },
    {
      fruit: { la: "amor crucis", cs: "láska ke kříži", en: "Love of the Cross" },
      ref: { la: "Lc 23, 46", cs: "Lk 23,46", en: "Luke 23:46" },
      verse: {
        la: "Pater, in manus tuas comméndo spíritum meum.",
        cs: "Otče, v ruce tvé poroučím ducha svého.",
        en: "Father, into thy hands I commend my spirit.",
      },
    },
  ],
  slavny: [
    {
      fruit: { la: "fides", cs: "víra", en: "Faith" },
      ref: { la: "Lc 24, 6", cs: "Lk 24,6", en: "Luke 24:6" },
      verse: {
        la: "Non est hic, sed surréxit.",
        cs: "Není ho tuto, ale vstal.",
        en: "He is not here, but is risen.",
      },
    },
    {
      fruit: { la: "spes", cs: "naděje", en: "Hope" },
      ref: { la: "Mc 16, 19", cs: "Mk 16,19", en: "Mark 16:19" },
      verse: {
        la: "… assúmptus est in cælum, et sedet a dextris Dei.",
        cs: "… vzat jest do nebe a usedl po pravici Boží.",
        en: "… was taken up into heaven, and sitteth on the right hand of God.",
      },
    },
    {
      fruit: { la: "sapiéntia", cs: "moudrost", en: "Wisdom" },
      ref: { la: "Act 2, 4", cs: "Sk 2,4", en: "Acts 2:4" },
      verse: {
        la: "Et repléti sunt omnes Spíritu Sancto.",
        cs: "I byli všichni naplněni Duchem Svatým.",
        en: "And they were all filled with the Holy Ghost.",
      },
    },
    {
      fruit: { la: "vera devótio erga Beátam Maríam", cs: "pravá úcta k Panně Marii", en: "True devotion to Our Lady" },
      ref: { la: "Cant 6, 9", cs: "Pís 6,9", en: "Cant. 6:9" },
      verse: {
        la: "Quæ est ista quæ progréditur quasi auróra consúrgens, pulchra ut luna, elécta ut sol, terríbilis ut castrórum ácies ordináta?",
        cs: "Kdo je ta, která se bere jak zora, krásná jako měsíc, jasná jako slunce, hrozná jak sešikované vojsko?!",
        en: "Who is she that cometh forth as the morning rising, fair as the moon, bright as the sun, terrible as an army set in array?",
      },
    },
    {
      fruit: { la: "perseverántia", cs: "vytrvalost", en: "Perseverance" },
      ref: { la: "Apoc 12, 1", cs: "Zj 12,1", en: "Apoc. 12:1" },
      verse: {
        la: "Et signum magnum appáruit in cælo: múlier amícta sole, et luna sub pédibus eius, et in cápite eius coróna stellárum duódecim.",
        cs: "I ukázalo se veliké znamení v nebi: Žena oděná sluncem a měsíc pod nohama jejíma, a na hlavě její koruna z dvanácti hvězd.",
        en: "And a great sign appeared in heaven: A woman clothed with the sun, and the moon under her feet, and on her head a crown of twelve stars.",
      },
    },
  ],
};
