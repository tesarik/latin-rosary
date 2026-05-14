# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Tap any Pater Noster bead (tail or ring) to jump straight to that point in the rosary.
- Accessibility: `role="img"` + step count on the rosary SVG, `aria-live="polite"` region around the prayer card, `lang="la"` on prayer text, `aria-label`s on nav / back / mystery-selection buttons, decorative SVGs marked `aria-hidden`, bottom navigation wrapped in `<nav>`.
- Confirmation prompt before the header back button discards mid-rosary progress.
- TypeScript in strict mode across the project (`tsconfig.app.json` + `tsconfig.node.json`); all source files migrated to `.ts` / `.tsx`. Exported types: `MysteryKey`, `MysterySet`, `PrayerType`, `StaticPrayerType`, `HailMary`, `SequenceItem`, `SavedState`. `npm run typecheck` runs `tsc -b --noEmit`; `npm run build` now type-checks first.

### Changed
- Source split into `src/rosary/` modules: `prayers`, `sequence`, `storage`, `RosaryBeads`, `PrayerCard`, `MysteryMenu`. `Ruzenec.jsx` renamed to `src/Rosary.tsx` and shrunk to a ~300-line orchestrator.
- Bead layout is now driven by a `beadId` on each sequence item and a `beadId → seqIdx` map in `RosaryBeads`; the old magic-number index arithmetic (`7 + d*13`, tail `idx 1..5`, etc.) is gone.
- Top progress bar height bumped from 3px to 7px so it's actually visible.
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
