// The English prayer texts, split out of prayers.ts so the app loads only the
// table of the language it is shown in (translations.ts), the other in the
// background. Mirrors `PRAYERS` 1:1; the tests and the static pages read it
// through PRAYER_TRANSLATIONS in translations.ts.
import { PRAYER_TYPES, ioseph, type StaticPrayerType } from "./prayers";

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

  // Prayers to St. Joseph: the Raccolta (1910, nos. 303, 309, 314, 310, 298),
  // its "etc." written out.
  [PRAYER_TYPES.MEMORARE_IOSEPH]: `Remember, most pure spouse of Mary ever Virgin, my loving protector, St. Joseph, that never has it been heard that anyone ever invoked thy protection, or besought aid of thee, without being consoled. In this confidence I come before thee, I fervently recommend myself to thee. Despise not my prayer, foster-father of our Redeemer, but do thou in thy pity receive it. Amen.`,

  [PRAYER_TYPES.MEMENTO_IOSEPH]: `Be mindful of us, O blessed Joseph, and intercede on our behalf with thy reputed Son; and secure for us the favour of thy most holy Virgin Spouse, the Mother of him who liveth and reigneth with the Father and the Holy Ghost, world without end. Amen.`,

  [PRAYER_TYPES.O_IOSEPH_VIRGO]: `O Joseph, virgin father of Jesus, most pure spouse of the Virgin Mary, pray for us daily to the Son of God, that, armed with the weapons of his grace, we may fight as we ought in life, and be crowned by him in death.`,

  [PRAYER_TYPES.FAC_NOS_INNOCUAM]: `Grant, O holy Joseph, that, ever secure under thy protection, we may pass our lives without guilt.`,

  [PRAYER_TYPES.COMMEMORATIO_IOSEPH]: `{r}Antiphon{/r}
Behold the faithful and prudent servant whom the Lord set over his house.

℣ Pray for us, holy Joseph.
℟ That we may be made worthy of the promises of Christ.

Let us pray. O God, who in thine ineffable providence didst vouchsafe to choose blessed Joseph to be the spouse of thy most holy Mother, grant, we beseech thee, that we may have him for our intercessor in heaven, whom on earth we venerate as our most holy protector: who livest and reignest, world without end. Amen.`,

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

  // Edward Caswall's translation (Lyra Catholica, 1849).
  // NOT yet checked against a printed witness.
  [PRAYER_TYPES.AVE_MARIS_STELLA]: `Hail, thou star of ocean,
portal of the sky!
Ever Virgin Mother
of the Lord most high!

Oh! by Gabriel's Ave,
uttered long ago,
Eva's name reversing,
'stablish peace below.

Break the captive's fetters;
light on blindness pour;
all our ills expelling,
every bliss implore.

Show thyself a Mother;
offer him our sighs,
who for us incarnate
did not thee despise.

Virgin of all virgins!
To thy shelter take us:
gentlest of the gentle!
Chaste and gentle make us.

Still, as on we journey,
help our weak endeavour;
till with thee and Jesus
we rejoice for ever.

Through the highest heaven,
to the Almighty Three,
Father, Son and Spirit,
one same glory be. Amen.`,

  // The received English of St. Thomas's antiphon.
  [PRAYER_TYPES.O_SACRUM_CONVIVIUM]: `O sacred banquet, in which Christ is received: the memory of his Passion is renewed: the mind is filled with grace: and a pledge of future glory is given to us.`,

  // OUR OWN literal translation, line for line with the Latin.
  [PRAYER_TYPES.PANIS_ANGELICUS]: `The bread of angels
becomes the bread of men;
the bread of heaven
puts an end to figures:
O wondrous thing!
The poor, the slave and the lowly
eat their Lord.

Thee, Godhead three
and one, we beseech:
so do thou visit us,
as we worship thee;
by thy paths
lead us whither we tend,
to the light wherein thou dwellest. Amen.`,

  // Psalm 50, Douay-Rheims (Challoner), one verse a line.
  [PRAYER_TYPES.MISERERE]: `Have mercy on me, O God, according to thy great mercy.
And according to the multitude of thy tender mercies blot out my iniquity.
Wash me yet more from my iniquity: and cleanse me from my sin.
For I know my iniquity: and my sin is always before me.
To thee only have I sinned, and have done evil before thee: that thou mayst be justified in thy words, and mayst overcome when thou art judged.
For behold I was conceived in iniquities: and in sins did my mother conceive me.
For behold thou hast loved truth: the uncertain and hidden things of thy wisdom thou hast made manifest to me.
Thou shalt sprinkle me with hyssop, and I shall be cleansed: thou shalt wash me, and I shall be made whiter than snow.
To my hearing thou shalt give joy and gladness: and the bones that have been humbled shall rejoice.
Turn away thy face from my sins: and blot out all my iniquities.
Create a clean heart in me, O God: and renew a right spirit within my bowels.
Cast me not away from thy face: and take not thy Holy Spirit from me.
Restore unto me the joy of thy salvation: and strengthen me with a perfect spirit.
I will teach the unjust thy ways: and the wicked shall be converted to thee.
Deliver me from blood, O God, thou God of my salvation: and my tongue shall extol thy justice.
O Lord, thou wilt open my lips: and my mouth shall declare thy praise.
For if thou hadst desired sacrifice, I would indeed have given it: with burnt offerings thou wilt not be delighted.
A sacrifice to God is an afflicted spirit: a contrite and humbled heart, O God, thou wilt not despise.
Deal favourably, O Lord, in thy good will with Sion: that the walls of Jerusalem may be built up.
Then shalt thou accept the sacrifice of justice, oblations and whole burnt offerings: then shall they lay calves upon thy altar.
Glory be to the Father, and to the Son, and to the Holy Ghost.
As it was in the beginning, is now, and ever shall be, world without end. Amen.`,

  // The Book of Common Prayer (1662), with "Holy Spirit" for "Holy Ghost".
  // NOT yet checked against a printed witness (the online copies were out of reach).
  [PRAYER_TYPES.TE_DEUM]: `We praise thee, O God: we acknowledge thee to be the Lord.
All the earth doth worship thee, the Father everlasting.
To thee all Angels cry aloud, the Heavens, and all the Powers therein;
to thee Cherubin and Seraphin continually do cry,
Holy, Holy, Holy, Lord God of Sabaoth;
Heaven and earth are full of the majesty of thy glory.
The glorious company of the Apostles praise thee.
The goodly fellowship of the Prophets praise thee.
The noble army of Martyrs praise thee.
The holy Church throughout all the world doth acknowledge thee:
the Father of an infinite majesty;
thine honourable, true and only Son;
also the Holy Spirit, the Comforter.
Thou art the King of glory, O Christ.
Thou art the everlasting Son of the Father.
When thou tookest upon thee to deliver man, thou didst not abhor the Virgin's womb.
When thou hadst overcome the sharpness of death, thou didst open the kingdom of heaven to all believers.
Thou sittest at the right hand of God, in the glory of the Father.
We believe that thou shalt come to be our Judge.
We therefore pray thee, help thy servants, whom thou hast redeemed with thy precious blood.
Make them to be numbered with thy Saints in glory everlasting.
O Lord, save thy people, and bless thine heritage.
Govern them, and lift them up for ever.
Day by day we magnify thee;
and we worship thy name, ever world without end.
Vouchsafe, O Lord, to keep us this day without sin.
O Lord, have mercy upon us, have mercy upon us.
O Lord, let thy mercy lighten upon us, as our trust is in thee.
O Lord, in thee have I trusted: let me never be confounded.`,

  // Gerard Manley Hopkins' translation ("Godhead here in hiding").
  // NOT yet checked against a printed witness (the online copies were out of reach).
  [PRAYER_TYPES.ADORO_TE]: `Godhead here in hiding, whom I do adore,
masked by these bare shadows, shape and nothing more,
see, Lord, at thy service low lies here a heart
lost, all lost in wonder at the God thou art.

Seeing, touching, tasting are in thee deceived;
how says trusty hearing? that shall be believed;
what God's Son has told me, take for truth I do;
truth himself speaks truly or there's nothing true.

On the cross thy godhead made no sign to men;
here thy very manhood steals from human ken:
both are my confession, both are my belief,
and I pray the prayer of the dying thief.

I am not like Thomas, wounds I cannot see,
but can plainly call thee Lord and God as he:
this faith each day deeper be my holding of,
daily make me harder hope and dearer love.

O thou our reminder of Christ crucified,
living Bread, the life of us for whom he died,
lend this life to me then: feed and feast my mind,
there be thou the sweetness man was meant to find.

Bring the tender tale true of the Pelican;
bathe me, Jesu Lord, in what thy bosom ran,
blood whereof a single drop has power to win
all the world forgiveness of its world of sin.

Jesu, whom I look at shrouded here below,
I beseech thee send me what I thirst for so,
some day to gaze on thee face to face in light
and be blest for ever with thy glory's sight. Amen.`,

  // OUR OWN literal translation: no traditional English prose version is in the
  // sources used.
  [PRAYER_TYPES.AVE_VERUM]: `Hail, true Body, born of the Virgin Mary,
who truly suffered and was sacrificed on the cross for man;
whose pierced side flowed with water and blood:
be for us a foretaste in the trial of death.
O sweet, O loving Jesus, Son of Mary, have mercy on me. Amen.`,

  // Edward Caswall's translation (Lyra Catholica, 1849).
  // NOT yet checked against a printed witness (the online copies were out of reach).
  [PRAYER_TYPES.O_SALUTARIS]: `O saving Victim, opening wide
the gate of heaven to man below,
our foes press on from every side:
thine aid supply, thy strength bestow.

All praise and thanks to thee ascend
for evermore, blest One in Three;
O grant us life that shall not end
in our true native land with thee. Amen.`,

  // Edward Caswall's translation (Lyra Catholica, 1849); "Holy Ghost" kept, as the
  // metre needs it.
  // NOT yet checked against a printed witness (the online copies were out of reach).
  [PRAYER_TYPES.PANGE_LINGUA]: `Sing, my tongue, the Saviour's glory,
of his flesh the mystery sing;
of the Blood, all price exceeding,
shed by our immortal King,
destined, for the world's redemption,
from a noble womb to spring.

Of a pure and spotless Virgin
born for us on earth below,
he, as Man, with man conversing,
stayed, the seeds of truth to sow;
then he closed in solemn order
wondrously his life of woe.

On the night of that Last Supper,
seated with his chosen band,
he the Paschal victim eating,
first fulfils the Law's command;
then as Food to all his brethren
gives himself with his own hand.

Word-made-Flesh, the bread of nature
by his word to Flesh he turns;
wine into his Blood he changes:
what though sense no change discerns?
Only be the heart in earnest,
faith her lesson quickly learns.

Down in adoration falling,
lo! the sacred Host we hail;
lo! o'er ancient forms departing,
newer rites of grace prevail;
faith for all defects supplying,
where the feeble senses fail.

To the everlasting Father,
and the Son who reigns on high,
with the Holy Ghost proceeding
forth from each eternally,
be salvation, honour, blessing,
might and endless majesty. Amen.`,

  // Caswall's last two stanzas of Pange lingua; the versicle and collect are the
  // Missal's for Corpus Christi.
  [PRAYER_TYPES.TANTUM_ERGO]: `Down in adoration falling,
lo! the sacred Host we hail;
lo! o'er ancient forms departing,
newer rites of grace prevail;
faith for all defects supplying,
where the feeble senses fail.

To the everlasting Father,
and the Son who reigns on high,
with the Holy Ghost proceeding
forth from each eternally,
be salvation, honour, blessing,
might and endless majesty. Amen.

℣ Thou didst give them bread from heaven.
℟ Containing in itself all sweetness.
Let us pray. O God, who under a wonderful Sacrament hast left us a memorial of thy Passion: grant us, we beseech thee, so to venerate the sacred mysteries of thy Body and Blood, that we may ever feel within us the fruit of thy redemption. Who livest and reignest world without end. Amen.`,

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
