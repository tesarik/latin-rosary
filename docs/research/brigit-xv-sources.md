# The Fifteen Prayers of St. Bridget — sources

`brigit_xv`, *Quindecim Orationes Sanctæ Brigittæ* (`BRIGIT_XV_1` … `BRIGIT_XV_15`, `BRIGIT_XV_CONCLUSIO` in `prayers.ts`). November 2026.

## The devotion

The fifteen prayers (the "Fifteen Oes") were not written by St. Bridget. They were composed after her death, most likely in 15th-century England among the Bridgettines, and are attributed to her by tradition. The Vadstena manuscripts never ascribe them to her, and Ghotan's 1492 edition of her works leaves them out ([Legacy of Birgitta, UiO](https://birgitta.hf.uio.no/works/709/)). The critical edition of the Latin is C. Gejrot, "The Fifteen Oes: Latin and Vernacular Versions. With an Edition of the Latin Text", in B. Morris and V. O'Mara (eds.), *The Translation of the Works of St Birgitta of Sweden into the Medieval European Vernaculars* (Brepols, 2000), pp. 213–238. We have not seen it.

The "promises" printed with them (15, 16 or 21 of them) are left out. The Holy Office warned against them on 28 January 1954 (AAS 46, 1954, p. 64; [EWTN](https://www.ewtn.com/catholicism/library/warning-of-the-holy-office-concerning-the-promises-of-st-bridget-2051)): their supernatural origin is not established, and Ordinaries are not to permit their publication. The prayers themselves were not censured.

## Latin

The user's typeset copy (`brigita-latin.pdf`, January 2026) matches word for word the Latin on [preces-latinae.org](https://www.preces-latinae.org/thesaurus/Filius/StBrigid.html). That site follows Jacob Merlo Horst, *Paradisus animae christianae* (1670), checked against four other Latin texts. It was checked by a word-level diff, ignoring case and punctuation: 1,199 of 1,202 words identical; the rest are the site's headings and a quotation mark.

What is ours, as everywhere in the app:

- the accents, and æ / œ for ae / oe (a stressed one as ǽ: *Iudǽi*);
- capitals for words the source sets in capitals (*O IESU* → *O Iesu*);
- the quotations without quotation marks, after a colon (*dicens: Hódie mecum eris in paradíso*). In the 7th prayer, *dixísti: Sítio, scílicet*; in the 13th, *inclináto cápite: Consummátum est, dixísti*;
- *ut* for the source's editorial *[ut]* in the 5th prayer.

The source's capitals are kept (*Passiónis*, *Corpus et Sánguinem*, *Contritiónem*), and so is its reading *Sánguinem sudórem* in the 1st prayer. Paragraphs are the source's. A page break inside the 3rd prayer is not a paragraph.

## Czech

The user's typeset copy (`brigita-final.pdf`) is the booklet *Tajemství spásy* as published by the Minorites ([immaculata.minorite.cz](https://immaculata.minorite.cz/wp-content/uploads/2024/01/Tajemstvi-Spasy-15-modliteb-sv.-brigity.pdf)). Its translator and date are not given. The booklet's opening prayer, which names Padre Pio, is modern; so is its closing prayer. The fifteen prayers are taken from it, with these changes:

- **Order:** the booklet has the Latin's 2nd, 3rd and 4th prayers as its 3rd, 4th and 2nd. They are put in the Latin's order.
- **Paragraphs** as the Latin's, so each Czech paragraph stands under its Latin one. Break points (`{/}`) in the one-paragraph prayers (2, 5, 7, 8, 9, 11 and the closing prayer) at matching places.
- **Spelling:** capitals follow the Latin (see Conventions in `CLAUDE.md`). Pronouns for God are lower case (*tě*, *tvůj*). Titles the Latin writes in lower case are lower case too: *věčná slasti*, *stvořiteli světa*, *nebeský lékaři*, *zrcadlo*, *lve nejsilnější*, *vinný kmeni*. *Tělo*, *Krev* and *Srdce* keep their capitals where the Latin capitalizes *Corpus*, *Sanguis* and *Cor*, and lose them where it does not.
- *v ráji!, prosíme* → *v ráji, prosíme*; *Hle, Matka Tvá!* → *Hle, matka tvá!*.
- Left out: the headings (*1. Kristovo utrpení na Olivetské hoře*), the clauses the booklet adds to each Hail Mary (*…Ježíš, který byl zbičován a odsouzen*), and the promises.
- **Kept although it differs from the Latin:** the booklet prays in the plural (*nás*) where the Latin says *me*. In the 6th prayer it quotes *Hle, matka tvá!* (Jn 19:27), where the Latin quotes *Mulier, ecce fílius tuus*.

The **closing prayer** (*O Dómine Iesu Christe, Fili Dei vivi…*) is **our own translation**: the booklet replaces it with a modern prayer of its own.

An older Czech translation is in *Duchovní Budíček* (1860), p. [75], "Patnácte modliteb o umučení Pána Ježíše", public in the Czech Digital Library: page `uuid:b02cd350-93b9-11e7-a9a4-005056827e51`, book `uuid:d0f36800-97d3-11de-a012-000d606f5dc6`. It is not used. If the modern text ever has to go, that one can replace it, read from the page images.

## English

**Our own literal translation** of the Latin, in the app's traditional English (*thee*, *thy*, lower-case pronouns). Its paragraphs and break points match the Latin's. No public-domain English of this Latin was found. Caxton's *Fifteen Oes* (1491) is Middle English and follows another text. The booklets in use (*Pietà*, *The Secret of Happiness*) are in copyright. The English on preces-latinae.org is its author's own revision.

## Built by

Accents and the Czech changes were applied by a script (a word → accented-form table and a list of replacements), so the Latin and Czech wording is the sources' own, not retyped.
