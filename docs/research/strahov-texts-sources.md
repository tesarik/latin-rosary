# Iesu, dulcis memória · Laudáte Dóminum (Ps 116) · Tu, Trinitátis Únitas

Sourcing notes for three new texts. Format follows the app: one string per prayer, a blank line between stanzas, `i` for `j` (`Iesu`, `eius`, `iucúndius`), and inside a stanza a line starts lower case unless it opens a sentence or a name (as in `AVE_MARIS_STELLA`). A psalm has one verse per line, with the asterisk turned into a colon and the Glória Patri on two lines (as in `MISERERE`). Where a printed book leaves out the Amen, I add it to follow the Latin, as the app already does for Ave maris stella.

Kramerius API used: `https://api.kramerius.mzk.cz/search/api/client/v7.0/items/<uuid>/image` and the same through `api.ceskadigitalniknihovna.cz` (ČDK). Every Czech text below was read from the **page image**, not only the OCR.

---

## 0. The lead: sbor-strahov.cz/PHP/Texty.php

The three pages are `Texty.php?id_text=113` (Iesu, dulcis memoria), `id_text=94` (Laudate Dominum II, Ps 116 with the Gloria; `id_text=95`, "Laudate Dominum (I.)", is a different paraphrase: *laudibus efferte … Quia valida facta est*) and `id_text=17` (Tu, Trinitatis unitas).

- **The site names no source for its Latin.** The Latin has no accents and spells the words in the modern way (`praemium`, `eius` on 113 and 17, but `ejus` on 94).
- **Every Czech text there is credited "Překladatel (nebo zdroj překladu): Lenka Jeřábková".** These are modern literal translations and still in copyright. The app already uses her Ave verum, so permission may exist, but they are not PD printed witnesses.
- **Iesu, dulcis memoria (113):** only stanzas 1 and 5. Stanza 5 reads *qui es futurum praemium … in sempiterna saecula*, a variant of the Breviary's *futúrus prǽmium … per cuncta semper sǽcula*.
- **Tu, Trinitatis unitas (17)** is **a different hymn** from the Friday Matins hymn that was asked for. It is the Trinity *Lauds* hymn (stanza 2: *Ortus refulget lucifer, praeitque solem nuntius …*, then the doxology *Deo Patri sit gloria …*), headed "Hymnus k Nejsvětější Trojici". Sušil gives that one as no. 109, "Na sv. Trojici k chválám". The Roman Breviary's Friday Matins hymn (*Nam lectulo consurgimus …*) is the one below.

---

## 1. Iesu, dulcis memória

Roman Breviary, Vespers of the Holy Name of Jesus. Five stanzas. **There is no separate doxology:** the fifth stanza, *Sis, Iesu*, closes the hymn.

### Latin: VERIFIED
- Accents: Divinum Officium, `web/www/horas/Latin/Tempora/Nat2-0.txt`, `[Hymnus Vespera]` (the 1960 Breviary). URL: https://github.com/DivinumOfficium/divinum-officium/blob/master/web/www/horas/Latin/Tempora/Nat2-0.txt
- Printed witness: Britt, *The Hymns of the Breviary and Missal* (1922), no. 43, p. 109 (archive.org `hymnsofbreviarym00britrich`). Stanzas 1–3 checked on the page image, 4–5 in the scan's OCR. The words are identical to DO's.
- DO spells `Jesu`/`Ejus`/`jucúndius`; here they are normalised to `i`.

```
Iesu, dulcis memória,
dans vera cordis gáudia:
sed super mel, et ómnia,
eius dulcis præséntia.

Nil cánitur suávius,
nil audítur iucúndius,
nil cogitátur dúlcius,
quam Iesus Dei Fílius.

Iesu, spes pœniténtibus,
quam pius es peténtibus!
quam bonus te quæréntibus!
sed quid inveniéntibus?

Nec lingua valet dícere,
nec líttera exprímere:
expértus potest crédere,
quid sit Iesum dilígere.

Sis, Iesu, nostrum gáudium,
qui es futúrus prǽmium:
sit nostra in te glória,
per cuncta semper sǽcula.
Amen.
```

### Czech: VERIFIED
- **Source:** *Cesta k věčné spáse: modlitby a duchovní zpěvy pro katolickou mládež … v brněnské diecési* ([1946]), no. 126 "Jesu dulcis memoria. (K nešporám.)", p. 45.
  - Page uuid: `uuid:d05602b6-5773-11e3-ae9f-0050569d679d`
  - Book (root) uuid: `uuid:30beeec6-2556-40cb-b298-c59f4dee263f` (MZK, public)
- **Translators:** "Přel. Fr. S. a J. P.": František Sušil (d. 1868) and J. P. J. P. is the same initials as the translator of the app's Ave maris stella. The translation was already in print by 1909 (see below), so it is PD.
- Same hymn number in the [1932] edition the app already cites: p. 47, `uuid:ec66048a-8df9-4efa-a09f-d50666a053f1` (root `uuid:7a3635b0-5801-11f0-b49f-5ef3fc9bb22f`, private in MZK, not read).
- **Printed form:** the book runs the lines on, separated by " - "; here each stanza is broken back into its four lines.
- **The Amen** is not in the book; it is added to follow the Latin.
- **Capitals:** the book already prints the pronouns lower case (*tvá*, *tebe*), so the convention changes nothing.
- The book continues with *Jesu, Rex admirabilis* as stanza 6 ("Pokračování k jitřní"); it is left out here.

```
Tvá, Jezu, sladká památka
mé duši pravou radost dá,
než nad med a vše, co svět má,
slast větší přítomnost je tvá.

Nic nepěje se liběji,
nic neposlouchá mileji,
nic nevzpomíná raději,
než tvá-li jména zaznějí.

Ó Jezu, čáko kajícím,
jak dobrotiv jsi prosícím,
jak milý tebe ždajícím,
což teprv tebe majícím!

Rtům nelze toho vyslovit,
a písmem nelze naznačit,
kdo zkusil, může uvěřit,
co Ježíše je v srdci mít.

Buď, Ježíši, nám radostí,
mzdou, jíž nás nebe uhostí,
čest naše plyň z tvé milosti,
teď — u věčné jak věčnosti!
Amen.
```

**Variants in older printings of the same translation** (stanzas 1–4 only were read):
- *Svatostánek a očistec* (1909), no. 126, p. 354, `uuid:e149ce35-d754-11e0-94b2-0050569d679d` (root `uuid:49b136cf-d754-11e0-94b2-0050569d679d`): *nepěje se **sladčeji***, *jména **zavznějí***, *Tvá*/*Tebe* with capitals.
- *Pravdou k životu* (1911), p. 130, `uuid:2d768b30-cd9d-11e3-93a3-005056825209`: *liběji*, *zavznějí*, *Ó Jezu, **naděj** kajícím*, capitals for the pronouns.

The 1946 text is used above as printed: *zaznějí*, *čáko*.

### English: VERIFIED
- **Translation:** Edward Caswall (d. 1878), "Jesu, the very thought of thee", the five stanzas that answer the Breviary cento.
- **Witness:** Britt (1922), no. 43, p. 109, which names "Translation by Father Caswall". The text is identical to DO's English `Nat2-0.txt`.
- **Capitals:** Britt capitalises the pronouns (*Thee*, *Thy*, *His*). Here they are lower case, like the app's other English texts (Te Deum *thee*, DO likewise).
- **The Amen** follows the Latin (DO has it, Britt doesn't).

```
Jesu, the very thought of thee
with sweetness fills my breast;
but sweeter far thy face to see,
and in thy presence rest.

Nor voice can sing, nor heart can frame,
nor can the memory find,
a sweeter sound than thy blest Name,
O Saviour of mankind!

O Hope of every contrite heart,
O Joy of all the meek,
to those who fall, how kind thou art!
How good to those who seek!

But what to those who find? Ah! this
nor tongue nor pen can show:
the love of Jesus, what it is
none but his loved ones know.

Jesu, our only joy be thou,
as thou our prize wilt be;
Jesu, be thou our glory now,
and through eternity.
Amen.
```

---

## 2. Laudáte Dóminum (Psalm 116, Vulgate), with Glória Patri

### Latin: VERIFIED
- Divinum Officium, `Latin/Psalterium/Psalmorum/Psalm116.txt` (accented).
- Same words in the *Liber Usualis* (1961, archive.org `TheLiberUsualis1961`, djvu text, "Psalm 116."). Its OCR loses the accents.

```
Laudáte Dóminum, omnes gentes: laudáte eum, omnes pópuli.
Quóniam confirmáta est super nos misericórdia eius: et véritas Dómini manet in ætérnum.
Glória Patri, et Fílio, et Spirítui Sancto.
Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.
```

### Czech: VERIFIED
- **Source:** *Nešporní žalmy, antifony, hymny a jiné zpěvy z církevních hodinek pro odpolední pobožnost o nedělích a svátcích dle doby církevní* (1909), "Žalm 116.", p. 31. It is a Vulgate-based version, close to the Latin (*confirmáta* = *utvrzeno*).
  - Page uuid: `uuid:c493edc0-449e-11e7-b3c8-005056825209`
  - Root uuid: `uuid:b37335f0-184d-11e7-96ce-005056827e51` (MZK, public)
  - The 1891 edition (root `uuid:a65f3680-e267-11ed-b3f4-005056827e51`, p. 31: `uuid:3df659e1-905f-48dc-ba09-7a0c8925fea5`) points to the same page 31 (not read).
- **Translator:** none named. It is anonymous and published in 1909, so it is PD.
- **Printed form and changes made:**
  - The book's asterisks are dropped. Verses 1–2 already have a colon before the asterisk; in the Glória the asterisks simply go.
  - *Duchu svatému* → **Duchu Svatému** (the project's convention, as in the Miserere's Czech). Nothing else is changed.
  - The archaic *všickni* is kept as printed.

```
Chvalte Hospodina všickni národové: chvalte ho všickni lidé.
Nebo utvrzeno jest nad námi milosrdenství jeho: a pravda Hospodinova zůstává na vše věky.
Sláva Otci, i Synu, i Duchu Svatému.
Jakož byla na počátku, i nyní, i vždycky, i na věky věkův. Amen.
```

**Alternative: Hejčl** (VERIFIED, not recommended).
- *Bible česká* I/2 (1921), p. 372, page uuid `uuid:43092350-7ef0-11e3-b50e-5ef3fc9ae867` (root `uuid:1f47c8e0-67d5-11e3-8fee-005056827e51`). Jan Hejčl died in 1935, so it is PD.
- It is translated from the Hebrew, with a parenthesis in the second verse, and has no Glória:
  > Chvalte Hospodina všichni pohané,
  > vychvalujte ho všichni národové,
  > neb mocně nad námi vznáší se jeho milost,
  > a věrnost Hospodinova (trvá) na věky.
- Its *pohané … milost* departs from the Vulgate's *gentes … misericórdia*, so the 1909 version suits Benediction better.

### English: VERIFIED
- **Source:** Douay-Rheims (Challoner).
  - Project Gutenberg #8300 (transcription of the 1899 DRB), Psalms 116.
  - Identical in DO's English `Psalm116.txt`.
- **Glória:** worded as in the app's Miserere (*Holy Ghost*).

```
O praise the Lord, all ye nations: praise him, all ye people.
For his mercy is confirmed upon us: and the truth of the Lord remaineth for ever.
Glory be to the Father, and to the Son, and to the Holy Ghost.
As it was in the beginning, is now, and ever shall be, world without end. Amen.
```

---

## 3. Tu, Trinitátis Únitas

Roman Breviary, Friday at Matins. Five stanzas and the doxology *Præsta, Pater piíssime*.

### Latin: VERIFIED
- Accents: Divinum Officium, `Latin/Psalterium/Special/Matutinum Special.txt`, `[Day5 Hymnus]`.
- Printed witness: Britt (1922), no. 19, pp. 66–67, read on the page images. Britt agrees word for word, bar *adstet* (DO prints *astet*).

```
Tu, Trinitátis Únitas,
orbem poténter quæ regis,
atténde laudis cánticum,
quod excubántes psállimus.

Nam léctulo consúrgimus
noctis quiéto témpore,
ut flagitémus ómnium
a te medélam vúlnerum.

Quo fraude quidquid dǽmonum
in nóctibus delíquimus,
abstérgat illud cǽlitus
tuæ potéstas glóriæ.

Ne corpus astet sórdidum,
nec torpor instet córdium,
ne críminis contágio
tepéscat ardor spíritus.

Ob hoc, Redémptor, quǽsumus,
reple tuo nos lúmine,
per quod diérum círculis
nullis ruámus áctibus.

Præsta, Pater piíssime,
Patríque compar Únice,
cum Spíritu Paráclito
regnans per omne sǽculum.
Amen.
```

**Variants:**
- ***qui regis*** is the pre-1632 (Urban VIII) reading. The 1632 and 1960 Breviaries, Britt and DO all have ***quæ regis***.
- The pre-1632 / monastic text also has *ut flagitémus **vúlnerum** / a te medélam **ómnium*** and *Ne corpus **adsit***. DO's `[Day5 HymnusM]` gives these as substitutions.
- ***astet*** (DO) / ***adstet*** (Britt): either may be used. DO's *astet* is kept above.

### Czech: VERIFIED for the five stanzas; the DOXOLOGY IS AN ASSEMBLY (flag it)

**Source:** František Sušil (d. 1868), *Hymny církevní* (1859), no. 9 "Tu Trinitatis unitas. Ambr. Jitřní v pátek.", pp. 21–22. It is an iambic version marked "II.", stanza for stanza in the Latin's metre.
- p. 21: `uuid:3aaacd73-3534-7dca-863d-23073d51e613`
- p. 22: `uuid:3494a94e-2ccc-c95c-8df8-02781bbf6b66`
- Root: `uuid:f8f86940-2d71-11e2-a8e5-005056827e52` (ČDK, public)

**No printed doxology for this hymn.** Sušil prints no doxology for no. 9, in either version. Neither does the earlier edition in old orthography (*Hymny církewní*, root `uuid:d71aba70-ad34-11dc-8b73-000d606f5dc6`, p. 24 `uuid:2f1a4212-be7d-4edd-a81b-c1b5a15d9fed`, version I only).

**The doxology used here is borrowed.** It is Sušil's own translation of the identical doxology *Præsta, Pater piíssime …* in hymn no. 18, *Nunc sancte nobis Spíritus*, version II, p. 29 (`uuid:072a9a90-8453-593f-8a04-b9b96ff2a162`). Sušil himself reuses that doxology by reference for no. 108 ("Dej atd. jak při č. 18"). Flag it as assembled, or leave the Czech without a doxology.

**Capitals, following the Latin:**
- The book's ***Tvůj*** (twice) and ***Tvojí*** for God → **tvůj**, **tvojí**.
- ***Tvá*** at the start of line 2 is lower-cased by the app's line-start rule.
- *Spáso* (Redémptor) and *Trojice* keep their capitals.

**Spelling (left as printed; say if you want it modernised):** the 1859 *-ť* forms *ukojiť*, *zahojiť*, *mocnosť* would be *ukojit*, *zahojit*, *mocnost* today. The book has no comma after *Slyš Spáso* or *Synu*.

**The Amen** is added to follow the Latin.

```
Ó jednobytná Trojice,
tvá vesmír řídí pravice;
zpěv chvály míle pozoruj,
jejž procitnuv lid pěje tvůj.

Neb povstáváme ode sna,
an noci klidná vládne tma,
rač tužby naše ukojiť
a všecky rány zahojiť.

I jestli pro ďábelskou lest
jsme vyvinuli z přímých cest,
nechť mocnosť tvojí oslavy
vše úhony ty napraví.

Buď tělo naše prosto vad,
duch ospalostí nebuď jat,
ať mysli nejme škodný puch
a neostydne v ohni duch.

Slyš Spáso, jak tvůj prosí lid,
slej světlo v duší našich byt,
ať lid tvůj v skutky závadné
tou změnou denní nepadne.

Dej laskavý to Otče náš,
dej Synu jenž byt stejný máš,
dej Duchu obou společný,
O Bože vládce pověčný!
Amen.
```

(*O Bože* is printed with a plain *O*. Version I on the same page is trochaic: *Trojjediný jehož vláda / Vesmír mocně upořádá …*. It is freer and does not match the Latin's metre.)

### English: VERIFIED
- **Translators:** G. H. Palmer (d. 1926) and J. W. Chadwick (d. 1904), as credited in Britt (1922), no. 19, pp. 66–67, read on the page images. PD.
- **Capitals:** Britt capitalises *Thy*/*Thine*; here it is lower case, like the app's other English texts.
- **The Amen** follows the Latin.

```
O Three in One, and One in Three,
who rulest all things mightily:
bow down to hear the songs of praise
which, freed from bonds of sleep, we raise.

While lingers yet the peace of night,
we rouse us from our slumbers light:
that might of instant prayer may win
the healing balm for wounds of sin.

If, by the wiles of Satan caught,
this night-time we have sinned in aught,
that sin thy glorious power to-day,
from heaven descending, cleanse away.

Let naught impure our bodies stain,
no laggard sloth our souls detain,
no taint of sin our spirits know,
to chill the fervor of their glow.

Wherefore, Redeemer, grant that we
fulfilled with thine own light may be:
that, in our course, from day to day,
by no misdeed we fall away.

Grant this, O Father ever One
with Christ, thy sole-begotten Son,
and Holy Ghost, whom all adore,
reigning and blest forevermore.
Amen.
```

---

## Status summary

| Text | Latin | Czech | English |
|---|---|---|---|
| Iesu, dulcis memória | VERIFIED (DO + Britt 1922) | VERIFIED (Cesta k věčné spáse [1946], no. 126, p. 45; Sušil & J. P.) | VERIFIED (Caswall, Britt 1922) |
| Laudáte Dóminum | VERIFIED (DO + Liber Usualis 1961) | VERIFIED (Nešporní žalmy 1909, p. 31; anonymous) | VERIFIED (Douay-Rheims, Gutenberg #8300) |
| Tu, Trinitátis Únitas | VERIFIED (DO + Britt 1922) | Stanzas VERIFIED (Sušil 1859, pp. 21–22); doxology BORROWED from Sušil's no. 18, p. 29 (flag) | VERIFIED (Palmer & Chadwick, Britt 1922) |

None of these is an own translation. The one point to flag is the assembled Czech doxology of *Tu, Trinitátis*.
