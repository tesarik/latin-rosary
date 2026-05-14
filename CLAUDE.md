# latin-rosary

A single-page web app for praying the Latin rosary. UI chrome and menus are in Czech ("Latinský růženec"); all prayer texts are in ecclesiastical Latin. Source of truth for the prayer texts is `Posvátný růženec latinsko – česky.pdf` (not in repo).

## Stack

- **React 18** + **Vite 6**, **TypeScript** in strict mode (`tsconfig.app.json` for app code, `tsconfig.node.json` for `vite.config.ts`, root `tsconfig.json` references both).
- No CSS framework — all styling is inline `style={{...}}` objects in the React tree (one minimal `src/index.css` only resets body margin and sets the default font).
- No router, no state library, no test framework. The whole app is a single component.
- PWA: `public/manifest.webmanifest` + `public/sw.js` (network-first for navigations, cache-first for assets) + `public/icon.svg`. The SW cache name is `ruzenec-__SW_VERSION__` and the `swVersion()` plugin in `vite.config.js` rewrites the placeholder at build time to `ruzenec-<pkg.version>-<base36-timestamp>` so each production build gets its own cache bucket and the `activate` handler drops every other bucket.
- Deploys as a static site. Sub-path is configurable via `BASE_PATH` env var (read in `vite.config.js`); the manifest, icon links, and SW registration scope all flow from `import.meta.env.BASE_URL`.

## File map

- `src/main.tsx` — entry; mounts `<Rosary />`, registers the service worker in production only.
- `src/Rosary.tsx` — **orchestrator**: state (`selectedMystery`, `currentStep`, `sequence`, `started`), `next` / `prev` / `jumpTo` / `confirmReset`, persistence wiring, wake-lock effect, keyboard + swipe handlers, header + progress bar + bottom-nav layout. Renders either `<MysteryMenu>` or the prayer screen.
- `src/rosary/prayers.ts` — `PRAYER_TYPES`, `MYSTERIES`, `PRAYERS` (the Latin texts), `getHailMary(mystery)`, and the exported types `MysteryKey`, `MysterySet`, `PrayerType`, `StaticPrayerType`, `HailMary`.
- `src/rosary/sequence.ts` — `buildRosarySequence(mysterySet)` and the `SequenceItem` type; stamps each bead-bearing item with a `beadId`.
- `src/rosary/storage.ts` — `STATE_VERSION`, `loadSavedState`, `saveState`, `SavedState` type.
- `src/rosary/RosaryBeads.tsx` — SVG bead ring + `beadStyle` helper. Props: `currentStep`, `sequence`, `accentColor`, `onJump?`.
- `src/rosary/PrayerCard.tsx` — the tappable white card. `PrayerBody` (internal) renders Hail Mary with the highlighted mystery clause or any other prayer's body text.
- `src/rosary/MysteryMenu.tsx` — start screen with one button per mystery set; calls `onStart(key)`.
- `src/vite-env.d.ts` — Vite client type reference (declares `import.meta.env` and `*.css` modules).
- `src/index.css` — body reset.
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — strict TypeScript config split between app and Node-side (vite.config.ts).
- `public/sw.js` — offline caching.
- `public/manifest.webmanifest` — PWA metadata.
- `public/icon.svg` — full-rosary visualization used as app icon.
- `index.html` — title, theme color, manifest link, EB Garamond webfont preload.
- `vite.config.ts` — reads `BASE_PATH`, configures React plugin, stamps the SW cache version at build time.
- `CHANGELOG.md` — Keep a Changelog format.

## Domain model (in `src/rosary/`)

- `MYSTERIES` — three traditional mystery sets (`radostny` / `bolestny` / `slavny`), each with a display name, accent color, and 5 mystery clauses. (`prayers.js`)
- `PRAYER_TYPES` — enum of prayer kinds (`SIGN_OF_CROSS`, `CREED`, `OUR_FATHER`, `HAIL_MARY`, `GLORY_BE`, `FATIMA`, `SALVE_REGINA`). (`prayers.js`)
- `buildRosarySequence(mysterySet)` — builds the linear 74-step prayer sequence: (`sequence.js`)
  - Opening: Sign of Cross + Credo + Pater Noster + 3 Hail Marys (with the fixed `fidem` / `spem` / `caritátem` mystery clauses) + Gloria Patri (positions 0–6).
  - 5 decades, each: Pater Noster + 10 Ave Maria + Gloria Patri + Fatima (`O mi Jesu`) = 13 steps.
  - Closing: Salve Regina + Sign of Cross.
- `PRAYERS` — full Latin prayer texts as single-paragraph strings (Salve Regina is the only one with real line breaks for its three sections). (`prayers.js`)
- `getHailMary(mystery)` — splits an Ave Maria into `before` / `mystery` / `after` so the per-decade mystery clause can be visually highlighted in the accent color. (`prayers.js`)

## Sequence-bead mapping (beadId-driven)

`buildRosarySequence` stamps every prayer that has a bead with a stable `beadId`:

- Tail: `tail-creed`, `tail-of`, `tail-hm-0`, `tail-hm-1`, `tail-hm-2`.
- Ring: `ring-of-${d}` (Pater Noster for decade `d` ∈ 0..4) and `ring-hm-${d}-${h}` (Hail Mary `h` ∈ 0..9).
- Sign of Cross, Gloria Patri, Fatima, and Salve Regina deliberately have **no `beadId`** — the cross glyph at the tail tip, and the junction where the tail meets the ring, stand in for them.

`RosaryBeads` builds a `beadId → seqIdx` map from the live sequence on every render and uses that for every lookup. There are no magic indices anywhere — adding or removing prayers from the sequence won't desync the beads as long as new bead-bearing items carry a `beadId` matching the layout. Ring layout still assumes 5 decades of 1 Pater Noster + 10 Hail Marys; the first ring Pater Noster sits exactly at the junction (`angle = π/2`) and decades are separated by a single uniform gap.

If you change sequence structure, bump `STATE_VERSION` so saved progress doesn't desync.

### Decade jump

Pater Noster beads (tail + 5 ring beads) carry a transparent 11–12px hit circle that calls `onJump(seqIdx)` → `jumpTo(idx)` on the parent component. Hail Mary beads are deliberately not jumpable to avoid stray taps during swipes.

## Persistence

- `localStorage` key `ruzenec_state`, schema `{ version, selectedMystery, currentStep }`.
- `STATE_VERSION` (currently 3) — increment on any structural change to the sequence; `loadSavedState` discards mismatched versions silently.
- State is saved on every `currentStep` / `selectedMystery` / `started` change and cleared on reset.

## Interactions

- **Tap** prayer card → next.
- **Swipe** right → previous; left → next (≥50px, <600ms, mostly horizontal).
- **Keyboard** `→` / `Space` / `Enter` → next; `←` → previous (ignored when focus is in an input).
- **Tap a Pater Noster bead** on the SVG → `jumpTo(seqIdx)`. Implemented as a transparent hit-circle behind each PN; HM beads are not jumpable.
- **Haptic** `navigator.vibrate(25)` on every step (including jumps).
- **Wake Lock API** keeps the screen on while a rosary is in progress (re-acquired on `visibilitychange`).
- Active bead glows in the mystery's accent color; the cross icon glows when a Sign of Cross step is active.
- The header back button (`← Zpět`) routes through `confirmReset()` and prompts before discarding progress (skipped silently when `currentStep === 0`).

## Typography

- Prayer body uses **EB Garamond** (Adobe Garamond Pro lookalike), loaded from Google Fonts in `index.html`.
- All UI chrome (buttons, headings, counters) stays in Arial.
- Prayer texts are deliberately collapsed to single paragraphs — the browser handles wrapping. Salve Regina is the exception: it preserves its three sections (main / versicle+response / Orémus).

## Scripts

- `npm run dev` — Vite dev server.
- `npm run typecheck` — `tsc -b --noEmit` against the project references.
- `npm run build` — runs `tsc -b` first (typecheck-only emit), then `vite build` (use `BASE_PATH=/latin-rosary/ npm run build` when deploying under a sub-path).
- `npm run preview` — serve the built bundle locally.

No lint, no tests, no CI configured yet.

## Conventions

- Don't introduce a CSS framework or a state library — the app's simplicity is intentional. (TypeScript is fine — it lives in `src/rosary/*.ts` for data/types and `*.tsx` for components, with strict mode on.)
- New prayer types or sequence changes: update `PRAYER_TYPES` and `PRAYERS` in `src/rosary/prayers.ts` (extend `StaticPrayerType` if the new prayer has static text), the builder in `src/rosary/sequence.ts` (stamp new bead-bearing items with a `beadId` matching the layout), the bead layout in `src/rosary/RosaryBeads.tsx` if structure changes, and bump `STATE_VERSION` in `src/rosary/storage.ts`.
- Keep accessibility attributes when editing UI: `aria-label` on interactive buttons, `aria-live="polite"` on the prayer card, `lang="la"` on prayer-text containers, `aria-hidden="true"` on decorative SVGs.
- Latin diacritics (acute accents, æ, œ) are part of the prayer text — preserve them exactly when editing.
- The icon (`public/icon.svg`) is hand-tuned to mirror the rosary visualization in the app; if you change the in-app SVG, consider keeping the icon in sync.
