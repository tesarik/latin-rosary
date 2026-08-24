# latin-rosary

A single-page web app for praying the Latin rosary. UI chrome and menus are in Czech ("Latinský růženec"); all prayer texts are in ecclesiastical Latin. Source of truth for the prayer texts is `Posvátný růženec latinsko – česky.pdf` (not in repo).

## Stack

- **React 18** + **Vite 6**, **TypeScript** in strict mode (`tsconfig.app.json` for app code, `tsconfig.node.json` for `vite.config.ts`, root `tsconfig.json` references both).
- No CSS framework — all styling is inline `style={{...}}` objects in the React tree. The one stylesheet, `src/index.css`, holds the box-model reset **and the light/dark theme tokens** (CSS custom properties); inline styles reference neutrals as `var(--…)` so the palette flips by toggling `data-theme` on `<html>`. See **Theming** below.
- No router, no state library, no test framework. The whole app is a single component.
- PWA: `public/manifest.webmanifest` + `public/sw.js` (network-first for navigations, cache-first for assets) + `public/icon.svg`. The SW cache name is `ruzenec-__SW_VERSION__` and the `swVersion()` plugin in `vite.config.js` rewrites the placeholder at build time to `ruzenec-<pkg.version>-<base36-timestamp>` so each production build gets its own cache bucket and the `activate` handler drops every other bucket. The SW does **not** `skipWaiting()` on its own — a new build waits until the user accepts the in-app "update available" prompt (`useServiceWorkerUpdate` → `UpdateToast`), which posts `SKIP_WAITING`; a one-time `controllerchange` reload then swaps in the fresh assets.
- Deploys as a static site. Sub-path is configurable via `BASE_PATH` env var (read in `vite.config.js`); the manifest, icon links, and SW registration scope all flow from `import.meta.env.BASE_URL`.

## File map

- `src/main.tsx` — entry; mounts `<Rosary />` inside `<ErrorBoundary>`. Service-worker registration now lives in `useServiceWorkerUpdate` (used by `Rosary`), not here.
- `src/Rosary.tsx` — **orchestrator**: state (`selectedMystery`, `currentStep`, `sequence`, `started`), `next` / `prev` / `jumpTo` / `confirmReset`, persistence wiring, wake-lock effect, keyboard + swipe handlers, header + progress bar + bottom-nav layout. Set-key classification, sequence building, persistability, initial-state resolution, and the step-bounds check are delegated to `rosary/navigation.ts` (pure, unit-tested). Renders either `<MysteryMenu>` or the prayer screen, plus the `<UpdateToast>` when a SW update is ready. A prayer set has one of three `kind`s: `rosary` (bead ring + progress bar), `linear` (section bead-strand stepper), or `single` (one standalone prayer — no bead ring/section stepper and no progress bar, just the label chip + prayer card).
- `src/rosary/navigation.ts` — **pure session/navigation logic** extracted from the orchestrator (no React/DOM): `PrayerSetKey`/`PrayerSetKind` types, the `isRosaryKey`/`isOrdinaryKey`/`isLitanyKey` guards, `getPrayerSetMeta`, `buildSequence`, `isPersistableKey`, `resolveInitialState(saved)`, and `canGoToStep(idx, current, length)`. Registry membership uses an **own-property** check (`hasOwnProperty`), not `in`, so a corrupt saved key like `"toString"` can't resolve to a prototype member. Covered by `navigation.test.ts`.
- `src/rosary/ErrorBoundary.tsx` — top-level error boundary (class component). Catches an uncaught render error and shows a themed, localized recovery card: **Reload**, or **clear saved progress and reload** (`saveState(null, 0)`) for the likely corrupt-`localStorage` case. Reads the persisted locale directly (no React context).
- `src/rosary/useServiceWorkerUpdate.ts` — PWA update hook (production only): registers the SW, detects a waiting new build, and returns `{ updateReady, applyUpdate, dismissUpdate }`. `applyUpdate` posts `SKIP_WAITING`; a `controllerchange` reload swaps in the new assets (guarded so the first-ever install doesn't spuriously reload).
- `src/rosary/UpdateToast.tsx` — bottom "a new version is available" prompt (themed, localized) rendered by `Rosary` while `updateReady`; Update applies the waiting SW, × dismisses.
- `src/rosary/prayers.ts` — `PRAYER_TYPES`, `MYSTERIES`, `PRAYERS` (the Latin texts), `getHailMary(mystery)`, and the exported types `MysteryKey`, `MysterySet`, `PrayerType`, `StaticPrayerType`, `HailMary`.
- `src/rosary/sequence.ts` — `buildRosarySequence(mysterySet)` and the `SequenceItem` type (stamps each bead-bearing item with a `beadId`); the `OTHER_PRAYER_SETS` registry of multi-step linear sets (Leonine, St. Bridget) with their builders; the `ORDINARY_PRAYERS` registry (`OrdinaryPrayerKey`) of standalone single prayers — the *Orationes utilissimæ* prayers (Signum Crucis, Pater Noster, Ave María, Gloria Patri, both Creeds + Symbolum Athanasiánum, the four seasonal Marian antiphons, Sub tuum præsídium, Angelus Dómini, Ánima Christi, Angele Dei, Sancte Míchael, Réquiem, Decálogus); and the `LITANIES` registry (`LitanyKey`) — *Litaníæ Lauretánæ* (Loreto), *Litaníæ Sacratíssimi Cordis Iesu* (Sacred Heart), *Litaníæ Sanctíssimi Nóminis Iesu* (Holy Name), and *Litaníæ Humilitátis* (Humility — a private devotion, and the one litany whose Latin is ours rather than sourced), *Litaníæ Sancti Ioseph* (St. Joseph, incl. the seven invocations added in 2021), *Litaníæ Pretiosíssimi Sánguinis D.N.I.C.* (Precious Blood), and *Litaníæ Omnium Sanctórum* (All Saints, traditional form) — all six litanies approved for public recitation, plus Humility. Litany entries carry an optional `kind`: they build one-step (`single`) sequences by default, but the Litany of the Saints declares `kind: "linear"` and builds **fifteen steps, one per section** (Supplicátio → eight saint groups → Ad Christum → Necessitátes → Conclúsio → Psalmus LXIX → Versículi → Collectæ, via `LITANY_SAINTS_SECTIONS` / `buildSaintsLitany`), so it gets the bead-strand stepper and *is* persisted. Each of its sections is its own `LITANY_SAINTS_*` prayer type. At 225 lines per language it is by far the longest text in the app, and its **Czech is our own translation** (see below).
- `src/rosary/storage.ts` — `STATE_VERSION`, `loadSavedState`, `saveState`, `SavedState` type (stores `selectedSet` as a plain string; no dependency on the prayer data — the caller validates the key and rebuilds the sequence).
- `src/rosary/fontSize.ts` — prayer-body text-size preference as a bounded numeric step index: `FONT_SCALE_MIN` / `FONT_SCALE_MAX` / `DEFAULT_FONT_SCALE`, `clampFontScale(i)`, `fontSizeClamp(i)` (the responsive `clamp()` for a step, scaling a base 17/5vw/22 band), and `loadSavedFontScale` / `saveFontScale` (own `localStorage` key `ruzenec_font_size`, with back-compat for the old `small`/`medium`/`large` values). Like the locale preference.
- `src/rosary/theme.ts` — light/dark preference: `Theme` type, `systemTheme` / `loadSavedTheme` / `saveTheme` / `applyTheme` (sets `data-theme` on `<html>`), `resolveTheme` (saved ?? OS), and `accentText(accent, theme)` (lightens a dark accent for text use in dark mode). Own `localStorage` key `ruzenec_theme`. The palette values live in `src/index.css`.
- `src/rosary/FontSizeControl.tsx` — header text-size control: a compact "Aa" button that opens a popover with smaller-A / bigger-A nudge buttons (stays open for repeated taps; outside-click / Escape closes; buttons disable at the bounds). Props: `value` (index), `onChange`, `accentColor`, `locale`.
- `src/rosary/RosaryBeads.tsx` — SVG bead ring + `beadStyle` helper. Props: `currentStep`, `sequence`, `accentColor`, `onJump?`.
- `src/rosary/PrayerCard.tsx` — the tappable white card. `PrayerBody` (internal) renders Hail Mary with the highlighted mystery clause or any other prayer's body text. Litanies (any `LITANY_*` type, via `isLitanyType`/`renderLitany`) get a distinct layout: left-aligned (not centered), one invocation per line, with the repeated response in *italic*. The response is found by matching a known phrase (`LITANY_RESPONSES` — *miserére nobis*, *líbera nos*, *oroduj za nás*, …), **not** by splitting at the last comma: responses like *líbera nos, Iesu* carry a comma of their own. `℣`/`℟` versicles, the `Orémus`/`Modleme se` collect, `{r}…{/r}` rubric labels, and the opening acclamations (the Kyrie and the *audi nos* pair, matched by `LITANY_ACCLAMATION` — repeated whole, so never split) keep their normal styling.
- `src/rosary/analytics.ts` — privacy-first usage analytics (GoatCounter): cookieless, no PII, no consent banner. `initAnalytics()` (called from `main.tsx`) loads the beacon only in production, only when `GOATCOUNTER_CODE` is set, and never under Do-Not-Track; `track(path)` records events (`pray/<set>` from `Rosary.startSet`). Fully inert until the code is filled in. `analyticsConfigured` gates the About privacy note.
- `src/rosary/AboutDialog.tsx` — modal "About" panel (app name, build-time `__APP_VERSION__` + `__BUILD_DATE__` rendered as `v0.11.0 · sestaveno 24. srpna 2026` via `toLocaleDateString(locale)`, description, creator/contact), opened from the start screen; themed, localized, Escape/backdrop to close. Creator name + contact live in the `CREATOR` constant at the top of the file (contact line hidden when empty).
- `src/rosary/MysteryMenu.tsx` — start screen: one button per mystery set, then under the "Other Latin prayers" heading two collapsible groups via the reusable `CollapsiblePrayers` component — **"Orationes utilissimæ"** (`ORDINARY_PRAYERS`) and **"Litaníæ"** (`LITANIES`) — followed by the linear-set buttons (Leonine, St. Bridget); also hosts the language picker and theme toggle. Calls `onStart(key)`.
- `src/vite-env.d.ts` — Vite client type reference (declares `import.meta.env` and `*.css` modules).
- `src/index.css` — body reset.
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — strict TypeScript config split between app and Node-side (vite.config.ts).
- `public/sw.js` — offline caching.
- `public/manifest.webmanifest` — PWA metadata.
- `public/icon.svg` — full-rosary visualization used as app icon.
- `index.html` — title, theme color, manifest link, EB Garamond webfont preload.
- `vite.config.ts` — reads `BASE_PATH`, configures React plugin, defines `__APP_VERSION__` (from `package.json`) and `__BUILD_DATE__` (ISO timestamp of the build; in `npm run dev` it's the dev-server start time), stamps the SW cache version at build time.
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

- `localStorage` key `ruzenec_state`, schema `{ version, selectedSet, currentStep }`. `selectedSet` is any prayer-set key stored as a plain string; `storage.ts` does only version/shape checks, and `navigation.resolveInitialState(loadSavedState())` validates the key against the registries (own-property check) and rebuilds the sequence (rejecting negative or out-of-range steps).
- **Only multi-step sets persist** across a reload: the rosary, the linear devotions (Leonine, St. Bridget), and any litany declaring `kind: "linear"` (the Litany of the Saints) — gated by `isPersistableKey`. Single-prayer sets (the one-card litanies, ordinary prayers) have no progress to resume and stay session-only.
- `STATE_VERSION` (currently 4) — increment on any structural change to the sequence **or this schema**; `loadSavedState` discards mismatched versions silently.
- State is saved on every `currentStep` / `selectedSet` / `started` change and cleared on reset.
- Four standalone UI preferences persist under their own keys, independent of the session and not versioned: `ruzenec_locale` (see `i18n.ts`), `ruzenec_prayer_language` (see `i18n.ts`; `latin`/`translation` — the LA/CZ toggle on the prayer card, defaults to Latin), `ruzenec_font_size` (see `fontSize.ts`; a numeric step index), and `ruzenec_theme` (see `theme.ts`; `light`/`dark`, defaults to the OS setting until chosen). All survive reset and reload.

## Interactions

- **Tap** prayer card → next.
- **Swipe** right → previous; left → next (≥50px, <600ms, mostly horizontal).
- **Keyboard** `→` / `Space` / `Enter` → next; `←` → previous (ignored when focus is in an input).
- **Tap a Pater Noster bead** on the SVG → `jumpTo(seqIdx)`. Implemented as a transparent hit-circle behind each PN; HM beads are not jumpable.
- **Haptic** `navigator.vibrate(25)` on every step (including jumps).
- **Wake Lock API** keeps the screen on while a rosary is in progress (re-acquired on `visibilitychange`).
- Active bead glows in the mystery's accent color; the cross icon glows when a Sign of Cross step is active.
- The header back button (`← Zpět`) routes through `confirmReset()` and prompts before discarding progress (skipped silently when `currentStep === 0`).
- The header's right side holds the **text-size control** (`FontSizeControl`): a compact "Aa" button opening a smaller-A / bigger-A nudge popover that steps the prayer body through a bounded scale (`fontSizeClamp`) and persists the choice. Only the prayer-body text scales — UI chrome stays fixed.

## Theming (light / dark)

- Neutral colors are **CSS custom properties** defined in `src/index.css`: a light set on `:root` and a dark override on `:root[data-theme="dark"]` (`--bg`, `--surface`, `--surface-hover`, `--border`, `--border-strong`, `--text`, `--text-strong`, `--text-soft`, `--text-muted`, `--bead-past`, `--bead-future`, `--thread`, `--track`, `--nav-fade`, `--rubric`). Inline styles reference them as `var(--…)`.
- **Red rubrics:** wrap text in a prayer body with `{r}…{/r}` to render it in the missal-style red `--rubric` color (e.g. the seasonal labels in Alma Redemptóris). `PrayerCard`'s `withRubrics` parses the markup; the markers never reach the screen.
- **Don't hardcode neutral colors** in components — add/extend a token. Mystery **accent** colors stay raw (passed via JS), used for solid fills (header, active bead, buttons, progress); for accent-as-*text* on the dark card (highlighted clause, label chip) run it through `accentText(accent, theme)` so dark accents stay legible.
- **SVG caveat:** `var(--…)` does **not** resolve in SVG presentation *attributes* (`fill="…"`, `stroke="…"`). Set them via the `style` object instead (see `RosaryBeads.tsx` / `PrayerSections.tsx`).
- `theme.ts` toggles `data-theme` on `<html>`; an inline script in `index.html` sets it before first paint (anti-FOUC) from `ruzenec_theme` or the OS. `Rosary` holds the state and follows OS changes until the user picks explicitly. The sun/moon toggle lives top-left on the start screen (`MysteryMenu`), mirroring the language picker.

## Typography

- Prayer body uses **EB Garamond** (Adobe Garamond Pro lookalike), loaded from Google Fonts in `index.html`.
- The prayer body is **deliberately NOT tagged `lang="la"`**. EB Garamond's Latin `locl` forms render **u→v** (Roman style) under `lang="la"`, and `font-feature-settings: "locl" 0` does **not** reliably suppress a language-triggered feature on mobile (Safari ignores it). So Latin is left untagged (`Iesus`, not `Iesvs`); only the *translation* gets a `lang` tag (the UI locale) — see `bodyLang` in `PrayerCard.tsx`. **Do not add `lang="la"` to prayer-text containers.**
- All UI chrome (buttons, headings, counters) stays in Arial.
- Prayer texts are deliberately collapsed to single paragraphs — the browser handles wrapping. Salve Regina is the exception: it preserves its three sections (main / versicle+response / Orémus).

## Scripts

- `npm run dev` — Vite dev server.
- `npm run typecheck` — `tsc -b --noEmit` against the project references.
- `npm run lint` — ESLint (flat config `eslint.config.js`): `@eslint/js` + typescript-eslint recommended (non-type-checked) + `react-hooks` + `react-refresh`; lints `src/`, `public/sw.js` (serviceworker globals), and the config files. Empty `catch {}` is allowed (deliberate best-effort pattern).
- `npm run build` — runs `tsc -b` first (typecheck-only emit), then `vite build` (use `BASE_PATH=/latin-rosary/ npm run build` when deploying under a sub-path).
- `npm run preview` — serve the built bundle locally.
- `npm test` — Vitest (`vitest run`, config in `vitest.config.ts`; node env, pure logic — no DOM). `src/rosary/prayers.test.ts` asserts the data invariants: `PRAYERS`/`PRAYERS_CS` key parity, every prayer in every set (rosary + linear + ordinary) resolves to non-empty Latin **and** Czech text, the rosary is 74 steps with the exact unique `beadId` set, and each ordinary prayer builds one step. `src/rosary/navigation.test.ts` covers the navigation/persistence logic: `isPersistableKey` (incl. prototype-key rejection), `resolveInitialState` (resume, non-persistable/out-of-range/negative rejection), `canGoToStep` bounds, and `getPrayerSetMeta` kinds. Run these after touching prayer data or the session logic.

CI: `.github/workflows/ci.yml` runs `typecheck` → `lint` → `test` → `build` on push to `main` and on PRs.

## Conventions

- Don't introduce a CSS framework or a state library — the app's simplicity is intentional. (TypeScript is fine — it lives in `src/rosary/*.ts` for data/types and `*.tsx` for components, with strict mode on.)
- New prayer types or sequence changes: update `PRAYER_TYPES` and `PRAYERS` in `src/rosary/prayers.ts` (extend `StaticPrayerType` if the new prayer has static text), the builder in `src/rosary/sequence.ts` (stamp new bead-bearing items with a `beadId` matching the layout), the bead layout in `src/rosary/RosaryBeads.tsx` if structure changes, and bump `STATE_VERSION` in `src/rosary/storage.ts`.
- To add an **ordinary (single) prayer** or a **litany**: add its text to `PRAYERS` / `PRAYERS_CS` (as a new `StaticPrayerType`), then add an entry to `ORDINARY_PRAYERS` (or `LITANIES`, extending `LitanyKey`) whose `build()` returns the one-step sequence. It appears automatically as a link in the matching start-screen group ("Orationes utilissimæ" / "Litaníæ") — no `MysteryMenu`/`Rosary` changes needed. Seasonal/labelled sections use `{r}…{/r}` red rubrics (see Theming).
- Keep accessibility attributes when editing UI: `aria-label` on interactive buttons, `aria-live="polite"` on the prayer card, `aria-hidden="true"` on decorative SVGs. (Do **not** add `lang="la"` to prayer text — it triggers EB Garamond's u→v; see Typography.)
- Latin diacritics (acute accents, æ, œ) are part of the prayer text — preserve them exactly when editing.
- Every prayer text is transcribed from a trustworthy source **except** the St. Bridget `BRIGIT_*` entries, which are our own translation (no authoritative Latin original exists for that devotion), the **Czech** Holy Name litany, whose invocations are sourced but whose closing collect is our own wording, the **Latin** Litany of Humility, which has no authoritative original to transcribe (modern devotion, author unknown, published in 1880 as a translation from the French) — its pointing is ours, assembled from two Latin witnesses; and the **Czech** Litany of the Saints, which is our translation of the traditional Latin, because the Czech liturgical books carry only the modern short form (Kancionál 068A/B). All are flagged with banner comments in `prayers.ts`. They're flagged with a banner comment in `prayers.ts`; if a sourced Latin booklet is ever obtained, replace those texts verbatim. Don't add further unsourced prayers without flagging them the same way.
- The icon (`public/icon.svg`) is hand-tuned to mirror the rosary visualization in the app; if you change the in-app SVG, consider keeping the icon in sync.
