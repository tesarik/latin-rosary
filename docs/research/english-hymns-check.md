# English hymn texts checked against printed witnesses

App file: `src/rosary/prayers.en.ts`. No repo files were edited.

The archive.org scans were downloaded as djvu OCR text and compared line by line with the app's text. Spelling quirks in the OCR (e.g. "poor" for "pour") were checked against the context and are not reported as differences.

Witnesses used:

| Short name | Edition | URL |
|---|---|---|
| **LC1849** | Caswall, *Lyra Catholica*, London: J. Burns, 1849. The archive.org metadata gives the year as 1849; the date on the title page can't be read in the OCR. | https://archive.org/details/LyraCatholica1849 |
| **CHB1850** | *A Catholic Hymn-Book*, Burns, 1850, "selected from Lyra Catholica … 1849" | https://archive.org/details/ACatholicHymnBookEdwardCaswall |
| **HP1873** | Caswall, *Hymns and Poems, Original and Translated*, 1873 | https://archive.org/details/hymnsandpoemsor01caswgoog |
| **LC1884** | *Lyra Catholica*, Burns & Oates / Catholic Publication Society, 1884. It follows the revised text of HP1873. | https://archive.org/details/lyracatholicaco01caswgoog |
| **WH1912** | *The Westminster Hymnal*, 1912 | https://archive.org/details/westminsterhymna00londuoft |
| **AM1875** | *Hymns Ancient and Modern*, London: Clowes, 1875 | https://archive.org/details/hymnsanci00chur |
| **BCP-H** | 1662 BCP, Morning Prayer, transcribed by Lynda Howell (standard modern 1662 text) | https://www.eskimo.com/~lhowell/bcp1662/daily/morning.html |
| **BCP-B** | 1662 BCP as printed by Baskerville, 1762 (justus.anglican.org transcription) | http://justus.anglican.org/resources/bcp/1662/mp.pdf |

Capital letters on divine pronouns (Him, Thee) and elided spellings (Stay'd, Destin'd) are left out of the lists below, because the house style modernizes them on purpose (see the banner).

---

## 1. Te Deum: VERIFIED (BCP-H; also BCP-B)

All 29 lines match BCP-H word for word. The only differences:

| App | BCP-H | Recommendation |
|---|---|---|
| "also the Holy Spirit, the Comforter" | "Also the Holy Ghost : the Comforter" | Keep. The comment already gives this as house style. |
| "majesty of thy glory", "King of glory", "kingdom of heaven", "thy name" | "Majesty", "King of Glory", "Kingdom of Heaven", "thy Name" | Capitals only. Keep, or restore the BCP capitals if you want strict fidelity. |
| Commas | the colon pointing (" : ") | Keep. The pointing exists for chanting. |

The Baskerville 1762 printing (BCP-B) has two readings that BCP-H does not: "Cherubim and Seraphim" and "Thine **adorable**, true and only Son". The app's "Cherubin and Seraphin" and "honourable" agree with BCP-H, the received 1662 text. UNVERIFIED: I did not see a facsimile of the 1662 Annexed Book itself to settle which reading is original.

**Recommendation:** Change the comment from "NOT yet checked" to "checked against the 1662 text (Howell transcription; Baskerville 1762)".

---

## 2. Adoro te devote (Hopkins): UNVERIFIED against print

I found no printed witness I could read:

- The 1918 *Poems* (Gutenberg #22403, checked) does not contain the poem. It first appeared in the 2nd edition (1930), which is still in copyright and restricted on archive.org.
- It was printed earlier in *The Irish Monthly* in 1903 (per the Canterbury Dictionary of Hymnology, https://hymnology.hymnsam.co.uk/g/godhead-here-in-hiding,-whom-i-do-adore). Volume 31 (1903) is not on archive.org; only volumes 30 and 32 are.
- The Canterbury Dictionary also notes that Hopkins left "three and a half versions" and translated the *Adoro te supplex* variant of the hymn.

Online comparison (not a printed witness) with The Catholic Thing (https://www.thecatholicthing.org/2010/11/11/adoro-te-devote/): stanzas 1–3 and 5–7 are identical. The one difference is in stanza 4, line 3:

- App: "this faith each day deeper be my holding of"
- That page: "Let me to a deeper faith … daily nearer move"

Both readings appear to be Hopkins drafts. A web search also points to the app's line in the *JourneySongs* hymnal (hymnary.org), but I could not see that page myself, so this is UNVERIFIED. The page puts "Amen" on a separate line; the app appends it to the last line.

**Recommendation:** Keep the text. It is the widely printed form, and as far as I know the app's stanza 4 is the standard reading of the editions from 1930 on (UNVERIFIED). Leave the comment as unchecked against print, and mention that the stanza 4 variant exists. Note that "Amen." is not Hopkins' own (UNVERIFIED) and could be dropped.

---

## 3. Ave maris stella (Caswall): VERIFIED (HP1873, LC1884; and LC1849 for every line but the first)

| App | Witness | Recommendation |
|---|---|---|
| "Hail, thou star of ocean," | LC1849 and CHB1850: "**Gentle** Star of ocean!". HP1873, LC1884 and WH1912: "Hail thou Star of ocean!" | Keep "Hail" (it is closer to *Ave*), but fix the source note. This is Caswall's **revised** text (*Hymns and Poems*, 1873), not *Lyra Catholica* 1849. |
| "Show thyself a Mother" | "Shew thyself a Mother" (every witness) | Keep. This is a spelling modernization only. |
| "'stablish peace below" | LC1849 and HP1873: "Stablish"; LC1884: "'Stablish" | Keep. |
| "of the Lord most high!" | "of the Lord most High!" | Capitals only. Keep. |
| "Still, as on we journey," | "Still as on we journey," | Punctuation only. Keep. |

There are no other differences of wording. All seven stanzas are present in the witnesses' order.

**Recommendation:** Change the comment to "Caswall, as revised in *Hymns and Poems* (1873); *Lyra Catholica* (1849) opens 'Gentle Star of ocean'", and mark it checked.

---

## 4. O salutaris Hostia: VERIFIED, but it is **not Caswall's text** in its second stanza

The app's text matches **AM1875** (*Hymns Ancient and Modern*, the 2nd part of "The Heavenly Word proceeding forth") word for word, except for capitals and punctuation:

- AM1875: "O Saving Victim, opening wide / The gate of heaven to man below; / Our foes press on from every side, / Thine aid supply, Thy strength bestow. / All praise and thanks to Thee ascend / For evermore, Blest One in Three; / O grant us life that shall not end / In our true native land with Thee."

Caswall's own text, compared line by line:

| Line | App | LC1849 / CHB1850 | HP1873, LC1884, WH1912 |
|---|---|---|---|
| 3 | "our foes press on from every side" | **same** ("Our foes press on from every side;—") | "Sore press our foes from every side" |
| 5 | "All praise and thanks to thee ascend" | "To thy great Name be endless praise," | same as LC1849 |
| 6 | "for evermore, blest One in Three;" | "Immortal Godhead, One in Three!" | same as LC1849 |
| 7 | "O grant us life that shall not end" | "Oh, grant us endless length of days," | same as LC1849 |
| 8 | "in our true native land with thee." | "In our true native land, with Thee!" | same as LC1849 |

**Recommendation:** Do one of the following:

- **(a) Keep the text and correct the attribution** to "Caswall (*Lyra Catholica*, 1849), as altered in *Hymns Ancient and Modern* (1861; seen in the 1875 printing)". This is the form most hymnals sing, and its "life that shall not end" follows *vitam sine termino* closely.
- **(b) Replace stanza 2 with Caswall's 1849 lines**, to keep the comment true.

As it stands, the comment ("Caswall, Lyra Catholica 1849") is wrong for stanza 2.

---

## 5. Pange lingua (Caswall): VERIFIED (LC1849; also CHB1850)

The app matches the **1849** text, including stanza 3's "to all his brethren". The 1873 revision (HP1873, LC1884) and WH1912 read "Then, as Food **to his Apostles** / Gives Himself with his own hand". The app's reading is therefore Caswall's original, and is closer to the Latin *turbae duodenae*… / *cum fratribus*.

Other differences, none of them in wording:

| App | LC1849 | Recommendation |
|---|---|---|
| "he, as Man, with man conversing" | "He, as Man with man conversing" (no comma after Man, in every witness) | Optional: drop the extra comma to match. Harmless either way. |
| "he the Paschal victim eating" | "paschal" (HP1873: "Paschal") | Keep. |
| "Word-made-Flesh, the bread of nature" | "Word made Flesh, the bread of nature" (no hyphens, in every witness) | Optional: drop the hyphens to match the witnesses. |
| "faith for all defects supplying" | "Faith, for all defects supplying" | Punctuation only. |
| "To the everlasting Father", "forth from each eternally", "might and endless majesty" | "Everlasting", "Each", "Might, and endless majesty" | Capitals and commas only. Keep. |

All six stanzas are present.

**Recommendation:** Keep the text and mark it checked against *Lyra Catholica* (1849). Note in the comment that the 1873 revision reads "to his Apostles".

---

## 6. Tantum ergo (Caswall, the last two stanzas of Pange lingua): VERIFIED (LC1849, HP1873, CHB1850, WH1912)

The text is identical in all four witnesses. The only differences from the app are those already listed in §5:

- the comma after "Faith"
- the capitals in "Everlasting" and "Each"
- the comma in "Might, and endless majesty"

The versicle and collect ("Thou didst give them bread from heaven …") are outside Caswall's text and were not checked.

**Recommendation:** Keep the text and mark it checked.

---

## 7. O sacrum convivium: not Caswall, not checked

The app has a prose version, commented as "the received English of St. Thomas's antiphon". It is not Caswall's and the banner does not mark it as unchecked, so it was outside this pass. UNVERIFIED.

## 8. Other texts

No other English hymn carries a "Caswall" or "NOT yet checked" note in `prayers.en.ts`. The sequences (Caswall's Stabat Mater, Veni Sancte Spiritus and Lauda Sion) are attributed to the Saint Andrew Daily Missal and were not checked here.
