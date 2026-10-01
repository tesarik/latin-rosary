# English texts still to be sourced

Work in progress from the cs/en rework (see `CHANGELOG.md` → *Unreleased*).

`PRAYERS_EN` in `src/rosary/prayers.ts` is complete and shipping, but it is **our
own rendering** of the received traditional English, not a transcription — the
banner above the table records exactly what has and hasn't been checked against
a witness. This file is the shopping list for closing that gap.

When a text below is obtained, replace the entry verbatim, move its row out of
this file, and update the banner in `prayers.ts`.

## Format needed

Plain text. **Keep the structure**: `℣`/`℟` at the start of versicle lines, blank
lines between sections. `renderLitany` in `PrayerCard.tsx` splits each line into
invocation + italic response, and both the tail cap and the ℣/℟ prefixes are
load-bearing. Latin and Czech are done — only the English counterpart is needed.

## Priority 1 — largest unverified block, and the web had nothing

| Entry | Size | Where to look |
| --- | --- | --- |
| `LITANY_SAINTS_COLLECTS` | 11 collects | *Raccolta*; an English hand missal; Rituale Romanum |
| `LITANY_SAINTS_VERSICLES` | 12 ℣/℟ pairs | same |

## Priority 2 — printed sources

| Entry | Size | Where to look |
| --- | --- | --- |
| `LEONINE_OREMUS` | 1 paragraph | "Prayers after Low Mass" in pre-conciliar missals |

## Priority 3 — a decision, not a lookup

No single received English text exists for either Marian antiphon (breviary,
rhymed and literal versions all circulate). Ours is our own wording. Either
adopt the Liturgy of the Hours version or keep ours deliberately.

| Entry |
| --- |
| `ALMA_REDEMPTORIS` |
| `AVE_REGINA_CAELORUM` |

## Priority 4 — low risk, can be checked online

`ANGELE_DEI`, `REQUIEM`, `DECALOGUE` — short and well standardized; nobody has
diffed them against a witness yet.

## Deliberately not on this list

`BRIGIT_*` — no authoritative Latin or Czech exists either, so the English is a
translation of our own text. There is nothing to verify it against.
