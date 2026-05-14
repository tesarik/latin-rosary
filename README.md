# Latin rosary

A small, offline-friendly web app for praying the rosary in Latin. UI is in Czech; all prayer texts (Signum Crucis, Credo, Pater Noster, Ave Maria, Gloria Patri, O mi Jesu, Salve Regina) are in ecclesiastical Latin, with the per-decade mystery clause inserted into each Hail Mary in the traditional way.

## Features

- All three traditional mystery sets: **Mysteria Gaudiosa**, **Mysteria Dolorosa**, **Mysteria Gloriosa**.
- Opening Hail Marys carry the `qui adaúgeat nobis fidem` / `corróboret nobis spem` / `perfíciat nobis caritátem` clauses.
- Fatima prayer (`O mi Jesu`) after each decade's Gloria Patri.
- Sign of the Cross at the very start and very end.
- SVG rosary visualization: 5 Pater Noster + 50 Ave Maria beads on the ring, tail with Creed + Pater Noster + 3 Hail Marys + cross. The active bead glows in the mystery's accent color; the cross glows during the Sign of the Cross.
- Prayer body set in **EB Garamond**; UI chrome in Arial.
- Tap to advance, swipe left/right to move forward/back, haptic tick on every step.
- Keyboard navigation: `→` / `Space` / `Enter` advance; `←` goes back.
- Tap any **Pater Noster bead** on the SVG to jump straight to that decade.
- **Wake Lock** keeps the screen on while praying.
- **PWA** with installable manifest, full-rosary SVG icon, and an offline service worker that re-caches per build.
- Screen-reader friendly: ARIA labels on controls, live region around the prayer text, `lang="la"` on Latin bodies.
- Progress is saved to `localStorage` and survives reloads (until a structural release bumps `STATE_VERSION`).

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

## Build

```bash
npm run build       # outputs to ./dist
npm run preview     # serves ./dist locally
```

### Deploying under a sub-path

If the app lives at `https://example.com/latin-rosary/`, set `BASE_PATH` at build time:

```bash
BASE_PATH=/latin-rosary/ npm run build
```

The manifest, icons, and service-worker scope all derive from this. Copy `.env.example` to `.env` (or `.env.production`) if you want it persisted locally.

## Project layout

- `src/Rosary.tsx` — orchestrator: state, effects, prayer-screen layout.
- `src/rosary/` — `prayers.ts`, `sequence.ts`, `storage.ts`, `RosaryBeads.tsx`, `PrayerCard.tsx`, `MysteryMenu.tsx`.
- `src/main.tsx` — entry point; registers the service worker in production.
- `public/manifest.webmanifest`, `public/sw.js`, `public/icon.svg` — PWA assets.
- `index.html` — title, theme color, EB Garamond webfont.
- `vite.config.ts` — reads `BASE_PATH`, stamps the SW cache version at build time.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — strict TypeScript config.
- `CHANGELOG.md` — release notes (Keep a Changelog format).
- `CLAUDE.md` — orientation notes for AI-assisted development.

## Stack

React 18, Vite 6, TypeScript (strict mode). No CSS framework, no router, no state library, no test suite — styling is inline and the app is split across a handful of small modules in `src/rosary/`.

## Source

Latin prayer texts are taken from `Posvátný růženec latinsko – česky.pdf` (not included in the repo).

## License

See [LICENSE](LICENSE).
