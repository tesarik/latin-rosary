# latin-rosary

A single-page web app for praying the Latin rosary. UI chrome and menus are in Czech ("Latinský růženec"); all prayer texts are in ecclesiastical Latin. Source of truth for the prayer texts is `Posvátný růženec latinsko – česky.pdf` (not in repo).

## Stack

- **React 18** + **Vite 6**, plain JSX, no TypeScript.
- No CSS framework — all styling is inline `style={{...}}` objects in the React tree (one minimal `src/index.css` only resets body margin and sets the default font).
- No router, no state library, no test framework. The whole app is a single component.
- PWA: `public/manifest.webmanifest` + `public/sw.js` (network-first for navigations, cache-first for assets) + `public/icon.svg`.
- Deploys as a static site. Sub-path is configurable via `BASE_PATH` env var (read in `vite.config.js`); the manifest, icon links, and SW registration scope all flow from `import.meta.env.BASE_URL`.

## File map

- `src/main.jsx` — entry; mounts `<Ruzenec />`, registers the service worker in production only.
- `src/Ruzenec.jsx` — **the entire app**: rosary state, prayer text, SVG bead visualization, menu screen, prayer screen, gestures, keyboard nav, persistence.
- `src/index.css` — body reset.
- `public/sw.js` — offline caching.
- `public/manifest.webmanifest` — PWA metadata.
- `public/icon.svg` — full-rosary visualization used as app icon.
- `index.html` — title, theme color, manifest link, EB Garamond webfont preload.
- `vite.config.js` — reads `BASE_PATH`, configures React plugin.
- `CHANGELOG.md` — Keep a Changelog format. Currently at 0.1.0.

## Domain model (in `Ruzenec.jsx`)

- `MYSTERIES` — three traditional mystery sets (`radostny` / `bolestny` / `slavny`), each with a display name, accent color, and 5 mystery clauses.
- `PRAYER_TYPES` — enum of prayer kinds (`SIGN_OF_CROSS`, `CREED`, `OUR_FATHER`, `HAIL_MARY`, `GLORY_BE`, `FATIMA`, `SALVE_REGINA`).
- `buildRosarySequence(mysterySet)` — builds the linear 74-step prayer sequence:
  - Opening: Sign of Cross + Credo + Pater Noster + 3 Hail Marys (with the fixed `fidem` / `spem` / `caritátem` mystery clauses) + Gloria Patri (positions 0–6).
  - 5 decades, each: Pater Noster + 10 Ave Maria + Gloria Patri + Fatima (`O mi Jesu`) = 13 steps.
  - Closing: Salve Regina + Sign of Cross.
- `PRAYERS` — full Latin prayer texts as single-paragraph strings (Salve Regina is the only one with real line breaks for its three sections).
- `getHailMary(mystery)` — splits an Ave Maria into `before` / `mystery` / `after` so the per-decade mystery clause can be visually highlighted in the accent color.

## Sequence-bead mapping (subtle, easy to break)

The SVG `RosaryBeads` component manually maps sequence indices onto bead positions. Notable assumptions:

- The Sign of Cross at position 0 has **no bead** — it's represented by the cross shape at the bottom of the tail.
- The tail beads are `Creed` (idx 1), `Pater Noster` (idx 2), then HMs 3 / 4 / 5.
- The Glory Be at idx 6 has **no bead** — it's "said at the junction" where the tail meets the ring.
- Ring beads start with the first decade's Pater Noster sitting **exactly at the junction** (`angle = π/2`); decades are separated by a single uniform gap; the closing gap also bridges the last HM back to the junction.
- Per-decade indices into the sequence: Our Father at `7 + d*13`, Hail Marys at `7 + d*13 + 1 + h` for `h ∈ [0..9]`.

If you change sequence structure, audit both `buildRosarySequence` and the index arithmetic inside `RosaryBeads`, and bump `STATE_VERSION` so saved progress doesn't desync.

## Persistence

- `localStorage` key `ruzenec_state`, schema `{ version, selectedMystery, currentStep }`.
- `STATE_VERSION` (currently 3) — increment on any structural change to the sequence; `loadSavedState` discards mismatched versions silently.
- State is saved on every `currentStep` / `selectedMystery` / `started` change and cleared on reset.

## Interactions

- **Tap** prayer card → next.
- **Swipe** right → previous; left → next (≥50px, <600ms, mostly horizontal).
- **Keyboard** `→` / `Space` / `Enter` → next; `←` → previous (ignored when focus is in an input).
- **Haptic** `navigator.vibrate(25)` on every step.
- **Wake Lock API** keeps the screen on while a rosary is in progress (re-acquired on `visibilitychange`).
- Active bead glows in the mystery's accent color; the cross icon glows when a Sign of Cross step is active.

## Typography

- Prayer body uses **EB Garamond** (Adobe Garamond Pro lookalike), loaded from Google Fonts in `index.html`.
- All UI chrome (buttons, headings, counters) stays in Arial.
- Prayer texts are deliberately collapsed to single paragraphs — the browser handles wrapping. Salve Regina is the exception: it preserves its three sections (main / versicle+response / Orémus).

## Scripts

- `npm run dev` — Vite dev server.
- `npm run build` — production build (use `BASE_PATH=/latin-rosary/ npm run build` when deploying under a sub-path).
- `npm run preview` — serve the built bundle locally.

No lint, no tests, no CI configured yet.

## Conventions

- Don't introduce TypeScript, a CSS framework, or a state library — the app's simplicity is intentional.
- New prayer types or sequence changes: update `PRAYER_TYPES`, `PRAYERS`, `buildRosarySequence`, the bead layout in `RosaryBeads`, and bump `STATE_VERSION`.
- Latin diacritics (acute accents, æ, œ) are part of the prayer text — preserve them exactly when editing.
- The icon (`public/icon.svg`) is hand-tuned to mirror the rosary visualization in the app; if you change the in-app SVG, consider keeping the icon in sync.
