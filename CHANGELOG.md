# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.7.0]

- **Usage analytics (GoatCounter)** — cookieless, no personal data, no consent banner. New `src/rosary/analytics.ts`: loads the beacon **only in production**, **never under Do-Not-Track**, and no-ops until `GOATCOUNTER_CODE` is set (so it's fully inert by default). Tracks a pageview on load plus a `pray/<set>` event when a prayer set is opened (`track()` in `Rosary.startSet`). A localized privacy note appears in the About panel once configured. Provider-agnostic call site, so swapping tools later changes only this file.
- **About panel** — an info button at the foot of the start screen opens a themed modal with the app name, version, a short description, and a creator/contact section (Escape or backdrop click to close); localized in all 5 locales. The version is injected at build time via a Vite `define` (`__APP_VERSION__`); creator name + contact are set in `AboutDialog.tsx` (contact line hidden until filled). New `src/rosary/AboutDialog.tsx`.
- **Litany of the Most Sacred Heart of Jesus** (Litaníæ Sacratíssimi Cordis Iesu) added to the Litaníæ group — full 33 invocations + Agnus Dei + versicle + collect. Czech sourced verbatim from the ČBK Kancionál (065); Latin is the canonical 1899 text (cross-checked against EWTN / Sancta Missa, rule-pointed; fetch tools blocked verbatim reproduction). `LITANY_SACRED_HEART` type + `LITANIES` entry — no UI changes, as designed.
- **Litany of Loreto** (Litaníæ Lauretánæ) in a new collapsible **"Litaníæ"** group on the start screen — same single-prayer model as Orationes utilissimæ, with a new `LITANIES` / `LitanyKey` registry that's extensible for more litanies. Full current (2020) invocation set + Agnus Dei + the default ending and **three seasonal endings** (Advent / Christmas / Easter) as red rubrics. Latin sourced from en.wikipedia (rule-pointed); Czech from the ČBK Kancionál (067) with the three 2020 invocations (*Matko milosrdenství / naděje / Útěcho migrujících*) slotted into their official spots. The menu's accordion was generalized into a reusable `CollapsiblePrayers` (title + entries), now used for both groups.
- **Red liturgical rubrics** in prayer text: `{r}…{/r}` markup in a prayer body renders in a missal-style red (new `--rubric` theme token, light + dark), parsed in `PrayerCard`. Used for the seasonal labels in Alma Redemptóris.
- **Ave Regína Cælórum** (Marian antiphon, Candlemas → Holy Week) added to the Orationes utilissimæ group — Latin + Czech (rhymed) from cs.wikipedia.org/wiki/Ave_Regina_caelorum, plus its versicle + *Orémus* collect (canonical Latin; Czech collect is our translation). Completes the four seasonal Marian antiphons (with Salve Regína, Regína Cæli, Alma Redemptóris). Latin pointing is rule-derived (verified), as no pointed source is online.
- **Alma Redemptóris Mater** (Marian antiphon, Advent → Candlemas) added to the Orationes utilissimæ group — antiphon Latin (accents matched to en.wikipedia's pointed text) + Czech (official liturgical translation), plus **both** seasonal versicle + *Orémus* collects (Advent and Christmas→Candlemas) with the season labels as red rubrics. Collects are canonical Latin; the Advent Czech reuses the sourced Angelus text, the post-Christmas Czech collect is our translation. Source: cs.wikipedia.org/wiki/Alma_Redemptoris_Mater.
- **Symbolum Athanasiánum** (the Athanasian Creed / *Quicumque*) added to the Orationes utilissimæ group — full Latin + Czech, split into the creed's three sections. New `ATHANASIAN_CREED` prayer type. Source: cs.wikipedia.org/wiki/Vyznání_Quicumque (Latin rendered in the app's pointed `æ`/`œ` orthography to match the other creeds; Czech verbatim).
- **Tests + CI.** A Vitest suite (`src/rosary/prayers.test.ts`, `vitest.config.ts`, `npm test`) asserts the data invariants — `PRAYERS`/`PRAYERS_CS` key parity, every prayer in every set resolves to non-empty Latin **and** Czech text, the rosary's 74-step structure + exact `beadId` set, and one step per ordinary prayer. New `.github/workflows/ci.yml` runs typecheck → test → build on push/PR.

### Changed
- Localized the last three hardcoded-Czech aria labels (`PrayerSections` group + jump, `PrayerCard` language picker) via new `i18n` strings, so screen-reader labels follow the chosen UI language in all 5 locales.
- Language-tagged the prayer body — `lang="la"` for Latin, the UI locale for the translation — for correct screen-reader pronunciation and hyphenation. EB Garamond's Latin localized forms (`locl`) render u→v (Roman style), so they're disabled on the prayer body via `font-feature-settings: "locl" 0`; modern ecclesiastical Latin keeps its u, and æ/œ + kerning are unaffected.

### Fixed
- Long prayers (the Creeds, Decalogue, Salve Regína + collect — especially at large font sizes) could be clipped at the top and unscrollable: the prayer area centered content with a flex auto-margin, which hides overflow above the fold. Reworked to a `min-height: 100%` centering wrapper inside the scroll container, so short prayers stay centered while long ones scroll from the top.

## [0.6.0]

### Added
- **"Orationes utilissimæ" group** on the start screen (under the "Other Latin prayers" heading, above Orationes Leonis): a collapsible card that rolls down small links to standalone single prayers (sorted alphabetically by name). Populated from `orationes.pdf`, `angelus-domini-anima-christi.pdf`, and `regina-caeli-anima-christi.pdf` (Latin + Czech): Signum Crucis, Pater Noster, Ave María, Gloria Patri, Symbolum Apostolórum, Symbolum Nicænum, Salve Regína, Sub tuum præsídium, Angelus Dómini, Regína Cæli, Ánima Christi, Angele Dei, Sancte Míchael, Pro defunctis (Réquiem), Decálogus. New `ORDINARY_PRAYERS` registry + `OrdinaryPrayerKey` in `sequence.ts` (existing prayers reuse their type; new ones — Nicene Creed, Sub tuum, Angele Dei, Réquiem, Decalogue — added to `prayers.ts`); each entry builds a one-step sequence. Adds a third prayer-set `kind` (`single`) in `Rosary.tsx` that renders no bead ring / section stepper / progress bar — just the label chip + prayer card. Not persisted.
- **Dark mode.** Neutral colors moved to light/dark CSS custom-property tokens in `index.css`; components reference them as `var(--…)`, so the palette flips by toggling `data-theme` on `<html>`. New `src/rosary/theme.ts` (preference under `ruzenec_theme`, defaults to the OS setting, follows OS changes until the user picks) + an anti-FOUC inline script in `index.html` that sets the theme before first paint. Sun/moon toggle on the start screen (top-left, mirroring the language picker). Mystery accents stay liturgical; dark accents are lightened (`accentText`) only where used as text on the dark card (highlighted clause, label chip) so they stay legible. Localized toggle aria label for all 5 locales.

## [0.5.0] - 2026-06-05

### Added
- **Seven Prayers of St. Bridget** (twelve-year devotion honoring the seven sheddings of the Precious Blood) as a new entry in the "Other Latin prayers" block. Opening prayer + 7 sheddings, each: meditation prayer + Pater Noster + Ave María (22 steps, 8-node section ring). New `brigit` key in `OTHER_PRAYER_SETS` + `buildBrigitPrayers()`, and eight `BRIGIT_*` prayer types in `prayers.ts`. **The meditation texts (Latin and Czech) are our own faithful translation, not a sourced edition** — this devotion has no stable authoritative Latin original; the divergence is flagged in code above the `BRIGIT_*` entries so the text can be replaced verbatim if a trustworthy booklet is obtained.
- **Prayer-text size setting**: a compact "Aa" button in the header opens a popover with smaller-A / bigger-A nudge buttons that step the prayer-body text through a bounded scale (the popover stays open for repeated taps; buttons disable at the min/max). The choice persists under its own `localStorage` key (`ruzenec_font_size`, a numeric step index), survives reloads and applies to every prayer set. New `src/rosary/fontSize.ts` (bounded step model + `fontSizeClamp()` + load/save) and `src/rosary/FontSizeControl.tsx`; only the prayer body rescales, UI chrome stays fixed. Localized aria labels added for all 5 locales.

### Changed
- **Unified all prayer texts to a single Latin orthography (Leonine "I" style: `Iesus` / `María` / `lacrymárum` / `Evæ` / `eius` / `baiulávit`).** The Ave María and the Salve Regína antiphon, which previously had two diverging copies (rosary vs. Leonine), are now each a single shared source: `getHailMary`/`getHailMaryCs` serve both the rosary decades and the Leonine prayers (the Leonine Ave passes no mystery clause), and `SALVE_REGINA_ANTIPHON`(`_CS`) backs both `SALVE_REGINA` (which appends the rosary's Orémus collect) and `SALVE_REGINA_LEONINE`. Removed the now-redundant `HAIL_MARY_LEONINE` prayer type; the Leonine Ave María reuses `HAIL_MARY`. Bead/sequence structure is unchanged, so `STATE_VERSION` stays at 3.
- `PrayerSections` (the stepper for linear prayer sets) is now a **compact horizontal bead strand** styled like the rosary's beaded string instead of large labeled pills: one bead per prayer on a faint thread, **no text labels** (the current prayer's name already shows in the chip above the card). Active bead glows in the accent color, traversed beads + thread tint, future beads stay muted. Section-start beads (each St. Bridget shedding's meditation, every Leonine prayer) are larger and tappable to jump; the sub-step Pater Noster / Ave María beads are small and inert — so a shedding reads as one big bead followed by two small ones, like a rosary decade. Replaces the oversized 360px circular layout.

## [0.4.0] - 2026-05-17

### Added
- "Další latinské modlitby" block on the start screen, separate from the rosary. First entry: **Orationes Leonis XIII** (Modlitby Lva XIII., post-Mass Leonine prayers) with full Latin + Czech texts sourced from `orationes-leonis-xiii.pdf`. Adds `HAIL_MARY_LEONINE`, `SALVE_REGINA_LEONINE`, `LEONINE_OREMUS`, `ST_MICHAEL`, `COR_IESU` to `PRAYER_TYPES`, plus an `OTHER_PRAYER_SETS` registry in `sequence.ts` and `buildLeoninePrayers()`.
- Generalized prayer-set dispatch in `Rosary.tsx`: `PrayerSetKey = MysteryKey | OtherPrayerKey`, `getPrayerSetMeta()` and `buildSequence()` route by kind. The rosary still uses `buildRosarySequence` + bead ring; linear sets use the new sequence builder + `PrayerSections` stepper.
- `PrayerSections` (new component): horizontal segmented stepper above the prayer card showing the prayer's sections. Current section filled in the accent color, completed sections tinted, future sections muted; tap a segment to jump to its first step. Replaces the bead ring for linear (non-rosary) prayer sets.
- `section?: string` on `SequenceItem` — drives the stepper. Leonine Prayers split into 5 sections: "Ave María" (3 Aves), "Salve Regína", "Orémus", "S. Míchael", "Cor Iesu" (×3).
- Localized "Other Latin prayers" heading on the start screen for all 5 supported locales (`otherPrayersHeading` in `i18n.ts`), plus `startPrayerAria` for the new buttons.

### Changed
- The horizontal progress bar at the top is now rosary-only. Linear prayer sets show the section stepper instead.
- `localStorage` persistence is now scoped to rosary sessions only — starting a Leonine prayer doesn't save; reloading mid-prayer drops back to the menu (intentional, since these sets are short).
- Header title is always Latin (`lang="la"`) regardless of UI locale, to match the prayer text on the card.

## [0.3.0] - 2026-05-15

### Added
- Czech counterparts for every Latin prayer text (`PRAYERS_CS`, `getHailMaryCs` in `src/rosary/prayers.ts`, plus `mysteriesCs` on each `MysterySet`). The opening trio's `fidem` / `spem` / `caritátem` clauses get Czech equivalents stamped onto sequence items via `mysteryCs`.
- `LA` / `CZ` select in the top-right of the prayer card to switch the prayer body between Latin and Czech. Clicks on the select don't propagate to the card's advance-on-tap handler.

## [0.2.1] - 2026-05-14

### Fixed
- Removed lang="la" from `PrayerBody`. It causes to replace u with v as if in ancient Latin, but we use ecclestical latin and this is not desired. 

## [0.2.0] - 2026-05-14

### Added
- UI localization (`src/rosary/i18n.ts`): Czech, English, Slovak, German, Polish. Default locale auto-detected from `navigator.language`; user can override via a flag dropdown on the start screen (custom button + listbox, outside-click + Escape to close). Choice persists to `localStorage` (`ruzenec_locale`). Latin prayer texts and mystery clauses are untouched.
- Inline SVG flags for the picker (`src/rosary/Flag.tsx`) — CZ, GB, SK, DE, PL at a uniform 24×16 viewBox. Slovak shield is retained so it doesn't read as the Russian tricolor.
- Tap any Pater Noster bead (tail or ring) to jump straight to that point in the rosary.
- Accessibility: `role="img"` + step count on the rosary SVG, `aria-live="polite"` region around the prayer card, `lang="la"` on prayer text, `aria-label`s on nav / back / mystery-selection buttons, decorative SVGs marked `aria-hidden`, bottom navigation wrapped in `<nav>`.
- Confirmation prompt before the header back button discards mid-rosary progress.
- TypeScript in strict mode across the project (`tsconfig.app.json` + `tsconfig.node.json`); all source files migrated to `.ts` / `.tsx`. Exported types: `MysteryKey`, `MysterySet`, `PrayerType`, `StaticPrayerType`, `HailMary`, `SequenceItem`, `SavedState`. `npm run typecheck` runs `tsc -b --noEmit`; `npm run build` now type-checks first.

### Changed
- Source split into `src/rosary/` modules: `prayers`, `sequence`, `storage`, `RosaryBeads`, `PrayerCard`, `MysteryMenu`. `Ruzenec.jsx` renamed to `src/Rosary.tsx` and shrunk to a ~300-line orchestrator.
- Bead layout is now driven by a `beadId` on each sequence item and a `beadId → seqIdx` map in `RosaryBeads`; the old magic-number index arithmetic (`7 + d*13`, tail `idx 1..5`, etc.) is gone.
- Top progress bar height bumped from 3px to 7px so it's actually visible.
- Header + progress bar are now wrapped in a single `position: sticky` container so the progress indicator stays pinned to the top of the viewport regardless of scroll position.
- Prayer screen is now strictly viewport-bounded: outer container uses `height: 100dvh` + `overflow: hidden`, and the scrolling middle section has `min-height: 0` so accumulated paddings can't push the layout past the viewport.
- Service-worker cache name is stamped at build time as `ruzenec-<pkg.version>-<build-id>` (Vite plugin in `vite.config.ts`), so each production build gets its own cache bucket and stale assets are dropped on activate.

## [0.1.0] - 2026-05-09

### Added
- Latin rosary prayers (Signum Crucis, Credo, Pater Noster, Ave Maria, Gloria Patri, O mi Jesu, Salve Regina with versicle/response and Orémus) sourced from `Posvátný růženec latinsko – česky.pdf`.
- Three traditional mystery insertions in the opening Hail Marys (`qui adaúgeat nobis fidem` / `corróboret nobis spem` / `perfíciat nobis caritátem`).
- Fatima prayer (O mi Jesu) after each decade's Gloria Patri.
- Sign of the Cross at the very start and very end of the rosary; cross icon in the SVG glows when this prayer is active.
- PWA: `manifest.webmanifest`, service worker (`sw.js`), full-rosary SVG icon, install/offline support.
- Keep-screen-on via the Wake Lock API while a rosary is in progress.
- Mobile interactions: tap the prayer card to advance, swipe right/left to go back/forward, haptic tick (`navigator.vibrate`) on every step.
- Keyboard navigation (`←` / `→` / `Space` / `Enter`).
- Configurable deploy sub-path via `BASE_PATH` env var (e.g. `BASE_PATH=/latin-rosary/`); manifest, icons, and SW registration all derive from it.
- `.gitignore`, `.env.example`.

### Changed
- Prayer text font: EB Garamond (Adobe Garamond Pro alike) for prayer body only; UI chrome stays in Arial.
- Prayer texts collapsed to single paragraphs so the browser handles wrapping; Salve Regina keeps its three real sections (main prayer / versicle+response / Orémus).
- SVG rosary visualization: 5 Pater Noster + 50 Ave Maria beads on the ring with a single uniform inter-decade gap; first Pater Noster sits exactly at the tail junction.
- Saved-state versioning (`STATE_VERSION`) so structural changes invalidate stale `localStorage` entries cleanly.
- Mobile spacing tightened across the prayer screen (paddings, margins, prayer card).

### Removed
- Mystery announcement step ("MYSTERIUM 1." card before each Pater Noster) — the mystery is still inserted in each Hail Mary.
- Mid-screen step counter (the SVG rosary's active bead and the top progress bar already indicate position).
- "Rozjímej o tomto tajemství..." meditation prompt.
