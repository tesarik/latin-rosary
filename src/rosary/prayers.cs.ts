// The Czech prayer texts, split out of prayers.ts so the app loads only the
// table of the language it is shown in (translations.ts), the other in the
// background. Mirrors `PRAYERS` 1:1; the tests and the static pages read it
// through PRAYER_TRANSLATIONS in translations.ts.
import { PRAYER_TYPES, ioseph, type StaticPrayerType } from "./prayers";

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

  // Prayers to St. Joseph: the Memoráre (Vzpomeň) and O Ioseph, virgo Pater
  // from Příručka katolických pobožností (Minařík, 1935); Meménto nostri, Fac
  // nos innócuam and the commemoration from Cesta k věčné spáse (Brno, 1915,
  // vol. III). Capitals follow the Latin.
  [PRAYER_TYPES.MEMORARE_IOSEPH]: `Vzpomeň, svatý Josefe, nejčistší Choti Panny Marie a laskavý náš ochránce, že nebylo slýcháno, že by zůstal bez útěchy, kdo tebe vzýval o pomoc a u tebe hledal ochrany. S touto důvěrou též já k tobě přicházím a tobě se poroučím se vší vroucností. Ach, nepohrdej mou prosbou, Pěstoune Spasitelův, ale přijmi ji milostivě. Amen.`,

  [PRAYER_TYPES.MEMENTO_IOSEPH]: `Pamatuj na nás, blahoslavený Josefe, a přimlouvej se prosbou své modlitby u Syna Božího, svého schovance; učiň též, aby nejblahoslavenější Panna, Snoubenka tvá, nám byla milostivou, kteráž Matkou jest toho, jenž s Otcem a Duchem Svatým žije a kraluje po nekonečné věky věkův. Amen.`,

  [PRAYER_TYPES.O_IOSEPH_VIRGO]: `Josefe, panický Pěstoune Ježíšův, nejčistší Snoubenče Panny Marie, pros za nás každodenně téhož Ježíše, Syna Božího, abychom podporováni jsouce jeho milostí, řádně bojovali v životě a od něho korunováni byli ve smrti.`,

  [PRAYER_TYPES.FAC_NOS_INNOCUAM]: `Dej, Josefe blažený, bychom životem šli nevinně; kéž tvá stráž učiní pouť naši bezpečnou!`,

  [PRAYER_TYPES.COMMEMORATIO_IOSEPH]: `{r}Antifona{/r}
Aj hle, služebník věrný a opatrný, kteréhož ustanovil Pán jeho nad čeledí svou.

℣ Oroduj za nás, svatý Josefe.
℟ Abychom hodni učiněni byli zaslíbení Kristových.

Modleme se: Bože, jenž jsi v nevýslovné prozřetelnosti blahoslaveného Josefa za snoubence nejsvětější Rodičky své vyvoliti ráčil: propůjč, prosíme, abychom, jehož jako ochránce ctíme na zemi, přímluvcem míti zasloužili na nebi: jenž žiješ a kraluješ na věky věkův. Amen.`,

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

  // Dr. Hejčl's prose translation, Příručka katolických pobožností (1935), p. 47–48.
  // It joins the last two verses ("Sestup milosrdenství… doufám na věky").
  [PRAYER_TYPES.TE_DEUM]: `Bože, tebe chválíme, Pane, tebe slavíme.
Tebe, Otče věčný, celá země velebí.
Tobě všichni andělé, tobě nebesa a všecky moci,
tobě cherubové i serafové neutuchajícím hlasem provolávají:
Svatý, svatý, svatý jest Hospodin, Bůh zástupů.
Plná jsou nebesa i země tvé slavné velebnosti.
Tebe slavný sbor apoštolů,
tebe ctihodných řada proroků,
tebe chválí bělostné šiky mučedníků,
tebe po širém světě slaví svatá církev,
tebe, Otče nesmírné velebnosti,
tvého vší cti hodného, pravého a jediného Syna,
jakož i Ducha Svatého Utěšitele.
Tys Král slávy, Kriste.
Tys Otcův věčný Syn.
Ty, hodlaje se státi člověkem, bys ho spasil, nehrozil ses lůna Panny.
Ty, zlomiv osten smrti, otevřel jsi věřícím říše nebeské.
Ty sedíš na pravici Boží ve slávě Otcově.
Věříme, že přijdeš k soudu.
Proto tě prosíme, bys přišel na pomoc svým služebníkům, které jsi předrahou krví vykoupil.
Dej, bychom k tvým svatým ve slávě věčné byli připočteni.
Dej dojíti spásy svému lidu a žehnej svému majetku.
Spravuj jej a vyvyš ho na věky.
Každý den ti dobrořečíme
a chválíme tvé jméno na věky, až na věky věkův.
Rač nás, Pane, tohoto dne hříchu chrániti.
Smiluj se nad námi, Hospodine, smiluj se nad námi.
Sestup milosrdenství tvé na nás.
V tebe, Hospodine, doufám na věky.`,

  // J. Pavelka's metrical translation (1906), stanza for stanza, as in Katechismus
  // modliteb (1937), p. 116–118 (also Cesta k věčné spáse, 1915).
  [PRAYER_TYPES.ADORO_TE]: `Klaním se ti vroucně, božství ukryté,
jež se v pravdě tajíš ve způsobě mdlé:
tobě se mé srdce všecko poddává,
hledíc na tvou lásku zcela roztává.

Oči, hmat i jazyk jsou tu šáleny,
víra však a sluch jsou lépe zpraveny:
věřím vše, co řekl kdysi Boží Syn;
nic tak není pravda, jako tento čin!

Na kříži se skrylo božství jediné,
zde se však i lidství ztrácí nevinné:
já vyznávám obé s duší věřící,
žádaje, zač žádal lotr kající.

Jizev jako Tomáš ovšem nevidím,
že jsi však můj Pán a Bůh, to dobře vím:
učiň, ať v tě věřím stále pevněji
a ať mám vždy v tobě lásku s nadějí!

Památko ty slavná smrti Kristovy,
živý chlebe věčné v duchu obnovy:
kéž má mysl žije ze tvé podstaty,
pokrme ty sladký, rajsky bohatý!

Dobrý Pelikáne, Pane Ježíši,
očisť nečistého lázní nejvyšší:
jednou kapkou krve můžeš obmýti
vesmír od zločinů a jej spasiti!

Ježíši, jejž nyní zřím jen v závoji,
dej, ať se má žízeň jednou ukojí:
ať tě spatřím zjevně, přímo tváří v tvář,
a smím blažen zírat ve tvou slávozář!`,

  // A modern translation by Lenka Jeřábková, from Collegium Strahoviense
  // (sbor-strahov.cz, Latinské texty): no older Czech version was found in the
  // prayer books searched.
  [PRAYER_TYPES.AVE_VERUM]: `Buď pozdraveno, pravé Tělo narozené z Marie Panny:
vskutku trpící a umučené na kříži pro člověka.
Z jehož probodeného boku vytryskla krev a voda.
Kéž je okusíme v okamžiku smrti.
Ó sladký, dobrý Ježíši, synu Mariin, smiluj se nade mnou.
Amen.`,

  // Fr. Sušil's metrical translation, Cesta k věčné spáse (1915), I, p. 475.
  [PRAYER_TYPES.O_SALUTARIS]: `Ó spasitelná oběti,
jež bránu nebes otvírá,
rač na pomoc nám přispěti,
boj těžký na nás dotírá.

Ó Pane, ve třech jediný,
čest ustavičná se ti pěj;
kdys v sídlech blahé otčiny
nám život přeblažený dej. Amen.`,

  // The metrical translation in Příručka katolických pobožností (1935), p. 4,
  // "Hymnus před svátostným požehnáním", stanza for stanza with the Latin.
  [PRAYER_TYPES.PANGE_LINGUA]: `Chvalte, ústa, písní vroucí
Tělo Páně v průvodu,
chvalte kalich Krve skvoucí,
kterou k lidstva obrodu,
výkvět Matky nehynoucí,
prolil Král všech národů.

Nám byl dán i zrozen z Panny,
tělo čisté na se vzal,
bydle mezi pozemšťany
símě slova rozsíval,
než se vrátil v rajské stany,
divuhodný zákon dal.

Za večeře sedá k stolu
vposled s bratří družinou,
po zákonu jedí spolu
krmi svatou, povinnou,
dvanácteru apoštolů
sebe dává hostinou.

Slovo z chleba Tělo chystá,
jež má lidstvo k nebi vznést,
víno mění ve krev Krista,
a kde smysl zmaten jest,
přesvědčiti srdce čistá
stačí pouhá víry zvěst.

Před Svátostí touto slavnou
ve prach skloňme kolena,
bohoslužbu starodávnou
nahraď nová, vznešená;
tam, kde lidské smysly slábnou,
všechno víra znamená.

Otci Tvůrci, Zrozenému
zazní chvála, dík a ples,
čest a spása, síla jemu,
žehnáním se vznášej dnes,
Duchu z obou vyslanému
hlahol zpěv až do nebes! Staň se!`,

  // Its last two stanzas and the versicle and collect, Příručka katolických
  // pobožností (1935), p. 4–5.
  [PRAYER_TYPES.TANTUM_ERGO]: `Před Svátostí touto slavnou
ve prach skloňme kolena,
bohoslužbu starodávnou
nahraď nová, vznešená;
tam, kde lidské smysly slábnou,
všechno víra znamená.

Otci Tvůrci, Zrozenému
zazní chvála, dík a ples,
čest a spása, síla jemu,
žehnáním se vznášej dnes,
Duchu z obou vyslanému
hlahol zpěv až do nebes! Staň se!

℣ Chléb s nebe udělil jsi jim.
℟ Všelikou líbeznost v sobě mající.
Modleme se: Bože, jenž jsi nám pozůstavil v zázračné Svátosti památku na své umučení, dejž nám, prosíme, ať tak uctíváme svatá tajemství tvého Těla a tvé Krve, abychom stále v sobě zakoušeli ovoce tvého vykoupení. Jenž žiješ a kraluješ na věky věkův. Amen.`,

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
