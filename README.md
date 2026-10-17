# Latin rosary

A small, offline-friendly web app for praying the rosary and other prayers in Latin. The interface is in Czech or English; every prayer is in ecclesiastical Latin, with a Czech or English translation one tap away.

## Features

**Prayers**

- The rosary in all three traditional mystery sets: **Mysteria Gaudiosa**, **Mysteria Dolorosa**, **Mysteria Gloriosa**. The opening Hail Marys carry the `qui adaúgeat nobis fidem` / `corróboret nobis spem` / `perfíciat nobis caritátem` clauses, each decade's mystery clause is set into its Hail Marys, and the Fatima prayer (`O mi Iesu`) follows each Gloria Patri.
- **Orationes utilissimæ**: the everyday prayers, both Creeds and the Athanasian Creed, the four seasonal Marian antiphons, the Angelus, Ánima Christi, Sub tuum præsídium, and more.
- **Seven litanies**: Loreto, the Sacred Heart, the Holy Name, St. Joseph, the Precious Blood, All Saints (traditional form) and the Litany of Humility.
- The **Leonine prayers** (after Low Mass) and the **prayers of St. Bridget**.
- **Prayer plans**: build your own named sequence of prayers and litanies, with repeats, and share it as a link.

**Praying**

- An SVG rosary: 5 Pater Noster + 50 Ave Maria beads on the ring, and a tail with the Creed, Pater Noster, 3 Hail Marys and the cross. The active bead glows in the mystery's accent colour. Tap a Pater Noster bead to jump to that decade.
- Litanies and the other multi-step prayers step through their **sections** on a bead strand. In a litany, a response shared by several invocations is shown **once**, in a band that stays at the top of the card (*℟ ora pro nobis*), instead of on every line.
- **Unfinished prayers keep their place**: leave the rosary to pray something else, and come back to *Pokračovat · 23/74*. Every multi-step prayer remembers its own step across reloads.
- Tap or swipe to move on or back. On a keyboard, `→` / `Space` / `Enter` move on and `←` goes back. Every step gives a haptic tick.
- The header holds the controls: back and restart, light/dark theme, text size, and the prayer language (Latin ↔ Czech/English).
- **Wake Lock** keeps the screen on while praying.

**App**

- Czech and English interface, picked from the browser and switchable on the start screen.
- Light and dark themes; follows the system until you choose.
- **PWA**: installable, works offline, and offers an in-app update when a new version is deployed.
- Prayer text set in **EB Garamond**; UI in Arial.
- Screen-reader friendly: ARIA labels on controls and a live region around the prayer text.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

## Build

```bash
npm run build       # typecheck, then build into ./dist
npm run preview     # serves ./dist locally
```

Other scripts: `npm run typecheck`, `npm run lint`, `npm test` (Vitest).

### Deploying under a sub-path

If the app lives at `https://example.com/latin-rosary/`, set `BASE_PATH` at build time:

```bash
BASE_PATH=/latin-rosary/ npm run build
```

The manifest, icons and service-worker scope all derive from it. Copy `.env.example` to `.env` (or `.env.production`) to keep it set locally. Every build gets its own service-worker cache, so installed copies are offered the update.

## Project layout

- `src/Rosary.tsx`: the orchestrator. It holds the state and the saved progress, and lays out the prayer screen.
- `src/rosary/`:
  - Prayer data (`prayers.ts`) and sequences (`sequence.ts`), litany parsing (`litany.ts`), navigation and persistence logic (`navigation.ts`, `storage.ts`), and plans (`plans.ts`).
  - The components: `MysteryMenu`, `PrayerCard`, `RosaryBeads`, `PrayerSections`, `PlansScreen`, and the header controls.
  - Unit tests: `*.test.ts`.
- `src/main.tsx`: the entry point, with an error boundary around the app.
- `public/manifest.webmanifest`, `public/sw.js`, `public/icon.svg`: PWA assets, with PNG renders `icon-180/192/512.png` for iOS and Android.
- `index.html`: title, theme colour, the EB Garamond webfont, and the pre-paint theme script.
- `vite.config.ts`: reads `BASE_PATH`, stamps the version and build date, and stamps the SW cache version.
- `CHANGELOG.md`: release notes (Keep a Changelog format).
- `CLAUDE.md`: detailed orientation notes for AI-assisted development.

## Stack

React 18, Vite 6, TypeScript (strict mode), Vitest. No CSS framework, no router, no state library. Styling is inline, with light/dark colour tokens in `src/index.css`.

## Sources

The Latin and most of the Czech prayer texts are transcribed from `Posvátný růženec latinsko – česky.pdf` (not included in the repo) and other printed and liturgical sources. The English texts follow the received traditional English forms and were checked against published witnesses. A few texts have no authoritative original and are our own, such as the St. Bridget prayers. `src/rosary/prayers.ts` records where each text comes from.

## License

See [LICENSE](LICENSE).
