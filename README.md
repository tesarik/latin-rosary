# Latin rosary

A small, offline-friendly web app for praying the rosary and other prayers in Latin. The interface is in Czech or English; every prayer is in ecclesiastical Latin, with a Czech or English translation one tap away.

## Features

**Prayers**

- The rosary in all three traditional mystery sets: **Mysteria Gaudiosa**, **Mysteria Dolorosa**, **Mysteria Gloriosa**. The opening Hail Marys carry the `qui adaúgeat nobis fidem` / `corróboret nobis spem` / `perfíciat nobis caritátem` clauses, each decade's mystery clause is set into its Hail Marys, and the Fatima prayer (`O mi Iesu`) follows each Gloria Patri.
- **Orationes utilissimæ**: the everyday prayers, both Creeds and the Athanasian Creed, the four seasonal Marian antiphons, the Angelus, Ánima Christi, Sub tuum præsídium, and more. For the dead: Réquiem, *De profúndis* (Psalm 129 with its versicles and collect) and the sequence *Dies iræ*.
- **Seven litanies**: Loreto, the Sacred Heart, the Holy Name, St. Joseph, the Precious Blood, All Saints (traditional form) and the Litany of Humility.
- The **Chaplet of Divine Mercy** (*Corona Divínæ Misericórdiæ*), prayed on the same ring of beads as the rosary. A switch on its tile adds the optional prayers from St. Faustina's Diary.
- The **Leonine prayers** (after Low Mass), the **prayers of St. Bridget**, the **Seven Sorrows and Joys of St. Joseph** in its short Latin form, and the **prayers for the dead** (*Preces pro defunctis*: Pater Noster, Ave María, *De profúndis*, its versicles and collect, step by step).
- **Prayer plans**: build your own named sequence of prayers, litanies, the Leonine prayers, the prayers for the dead and **prayers of your own** (Latin text plus an optional translation), with repeats. Share a plan as a link, or **back up** all plans to a file and load them back, on another device too. Plans are stored only in the browser.
- The start screen marks **today's mysteries**, by weekday and on Sunday by liturgical season, and the **Marian antiphon of the season**; in November, the month of the holy souls, it marks the prayers for the dead.

**Praying**

- An SVG rosary: 5 Pater Noster + 50 Ave Maria beads on the ring, and a tail with the Creed, Pater Noster, 3 Hail Marys and the cross. The active bead glows in the mystery's accent colour. Tap a Pater Noster bead to jump to that decade. The Chaplet of Divine Mercy uses the same ring.
- Litanies and the other multi-step prayers step through their **sections** on a bead strand. In a litany, a response shared by several invocations is shown **once**, in a band that stays at the top of the card (*℟ ora pro nobis*), instead of on every line.
- **Unfinished prayers keep their place**: leave the rosary to pray something else, and come back to *Pokračovat · 23/74*. The last unfinished prayer is offered at the top of the start screen. Every multi-step prayer remembers its own step across reloads.
- Tap or swipe to move on or back. On a keyboard, `→` / `Space` / `Enter` move on and `←` goes back. Every step gives a haptic tick.
- The header holds the controls: back and restart, light/dark theme, text size, and a one-tap switch for the prayer language (Latin ↔ Czech/English).
- In the rosary, the label names the current decade and quotes its mystery in full, in the language the prayer is shown in (*II. quem, Virgo, visitándo Elisabeth portásti* / *2. desátek: s kterým jsi, Panno, Alžbětu navštívila*), and a double vibration marks the end of each decade (in the chaplet too).
- Turn a phone sideways, or use a tablet, and the beads and the prayer sit side by side.
- **Wake Lock** keeps the screen on while praying.

**App**

- Czech and English interface, picked from the browser and switchable on the start screen.
- Light and dark themes; follows the system until you choose.
- **PWA**: installable, works offline, and offers an in-app update when a new version is deployed.
- Prayer text set in **EB Garamond**, bundled with the app so it works offline and nothing is loaded from Google; UI in Arial.
- Screen-reader friendly: ARIA labels on controls and a live region around the prayer text.

**On the web**

- **Every prayer has its own page**, in English and Czech: the Latin beside the translation, generated from the app's own texts, so search engines can find them. A button on each page opens the prayer straight in the app (`#pray=<key>`). *About* links to the index.
- **Link previews**: a shared link shows a picture of the rosary with *Rosarium Latinum* and a short description.

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

Set `SITE_URL` (the origin, e.g. `SITE_URL=https://example.com`) as well, so link previews and the prayer pages get absolute URLs and the build writes `sitemap.xml`; the build warns when it is missing. The manifest, icons and service-worker scope all derive from `BASE_PATH`. Copy `.env.example` to `.env` (or `.env.production`) to keep it set locally. Every build gets its own service-worker cache, so installed copies are offered the update.

### Prayer pages for search engines

The build also writes a static page for every prayer, in English and Czech (`en/…`, `cs/…`, with an index at `en/` and `cs/`): the Latin beside the translation, with a link that opens the prayer in the app. With `SITE_URL` set it writes `sitemap.xml` too. Under a sub-path, `robots.txt` has no effect, so submit the sitemap (e.g. `https://example.com/latin-rosary/sitemap.xml`) in Google Search Console.

### After deploying

1. Open the app and a prayer page or two (`…/en/`, `…/cs/`), also on a phone: the pages switch to one column below 720 px.
2. If prayer pages were added or renamed, submit or resubmit the sitemap in Google Search Console.
3. To see or refresh a link preview, paste the URL into the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

### Releasing

On the PR branch, commit `chore: release X.Y.Z`: `npm version X.Y.Z --no-git-tag-version`, rename `[Unreleased]` to `[X.Y.Z]` in `CHANGELOG.md`, and update the example version in `CLAUDE.md`. Merge the PR, then `gh release create X.Y.Z --target main` with the changelog section as the notes.

## Project layout

- `src/Rosary.tsx`: the orchestrator. It holds the state and the saved progress, and lays out the prayer screen.
- `src/rosary/`:
  - Prayer data (`prayers.ts`) and sequences (`sequence.ts`), litany parsing (`litany.ts`), navigation and persistence logic (`navigation.ts`, `storage.ts`), the chaplet's optional-prayers switch (`chaplet.ts`), plans (`plans.ts`), and the static prayer pages and sitemap (`staticPages.ts`).
  - The components: `MysteryMenu`, `PrayerCard`, `RosaryBeads`, `PrayerSections`, `PlansScreen`, and the header controls.
  - Unit tests: `*.test.ts`.
- `src/main.tsx`: the entry point, with an error boundary around the app.
- `public/manifest.webmanifest`, `public/sw.js`, `public/icon.svg`: PWA assets, with PNG renders `icon-180/192/512.png` for iOS and Android (`inkscape icon.svg --export-type=png --export-filename=icon-512.png -w 512 -h 512`).
- `public/og-image.svg`: the link-preview image, rendered to `og-image.png` (1200×630) the same way; EB Garamond must be installed.
- `index.html`: title, description, link-preview tags, theme colour, and the pre-paint theme script.
- `vite.config.ts`: reads `BASE_PATH` and `SITE_URL`, stamps the version, build date and SW cache version, fills in the link-preview URLs, and writes the prayer pages and sitemap.
- `CHANGELOG.md`: release notes (Keep a Changelog format).
- `CLAUDE.md`: detailed orientation notes for AI-assisted development.

## Stack

React 18, Vite 6, TypeScript (strict mode), Vitest. No CSS framework, no router, no state library. Styling is inline, with light/dark colour tokens in `src/index.css`.

## Sources

The Latin and most of the Czech prayer texts are transcribed from `Posvátný růženec latinsko – česky.pdf` (not included in the repo) and other printed and liturgical sources; the Czech *Dies iræ* and the Czech prayers for the dead come from Schaller's *Římský misál* (1931) and the Czech burial rite (*Manuale rituum*, 1955). The English texts follow the received traditional English forms and were checked against published witnesses. A few texts have no authoritative original and are our own, such as the St. Bridget prayers, the Latin of the chaplet's optional prayers, the English of the *Dies iræ*, and the Czech and English headings of St. Joseph's sorrows and joys. `src/rosary/prayers.ts` records where each text comes from.

## License

See [LICENSE](LICENSE).
