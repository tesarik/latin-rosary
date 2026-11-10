// The Misál look's engravings: woodcuts from Roman missals of the 1880s
// (public domain), rendered to public/missal/ by scripts/render-missal-art.py
// from art/missal/. A headpiece heads an open group on the Modlitby tab (and
// the St. Joseph section) — which one is the group's or section's `art` in
// menu.ts; the tailpiece, `finis`, closes a prayer on its last step, and the
// star, `stella`, stands above the start screen's footer.
// Which tailpiece closes which prayer is `finisFor` in missalArt.ts. The Moje
// tab is headed by Our Lady among angels (`maria`), the plans by the
// Immaculata with St. Michael (`immaculata`), Help by the apostles sent out
// (`euntes`, "Euntes in mundum universum") and About by *Pax vobis* (`pax`).
// Shown only in the Misál look — the other looks keep their colour and
// symbols. Grey on white, blended into the page (`.missal-art`, index.css):
// multiplied on the light page, inverted and screened on the dark one.
// The ornaments in the rubric red, as their width (CSS px) and the
// picture's aspect ratio: drawn as a mask over --rubric, so the red follows
// the theme (the script saves them with an alpha channel).
const RED_ORNAMENTS: Record<string, { width: number; ratio: number }> = {
  finis: { width: 130, ratio: 320 / 132 },
  stella: { width: 150, ratio: 517 / 241 },
  crux: { width: 70, ratio: 388 / 384 },
};

// A vignette, not a band across the card: shown at its own size.
const VIGNETTE_WIDTH: Record<string, number> = { tempus: 260, pax: 200 };

export function MissalArt({ name, width = VIGNETTE_WIDTH[name], style }: { name: string; width?: number; style?: React.CSSProperties }) {
  const src = `${import.meta.env.BASE_URL}missal/${name}.webp?v=${__ICON_VERSION__}`;
  const red = RED_ORNAMENTS[name];
  if (red) {
    const mask = `url("${src}") center / contain no-repeat`;
    return (
      <div aria-hidden="true" style={{
        width: width ?? red.width, maxWidth: "100%", aspectRatio: String(red.ratio), margin: "0 auto",
        background: "var(--rubric)", mask, WebkitMask: mask, ...style,
      }} />
    );
  }
  return (
    <img
      className="missal-art"
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      style={{ display: "block", width: width ?? "100%", maxWidth: "100%", height: "auto", margin: "0 auto", ...style }}
    />
  );
}
