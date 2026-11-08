// The two faces of the app. EB Garamond (bundled, see main.tsx) for the
// prayers and for every Latin name, as a missal sets them; Arial for the
// translations under them and for the controls, so Latin and the UI language
// read apart at a glance. Like the prayer body, a Latin name is never tagged
// lang="la" (EB Garamond would turn its u into v; see CLAUDE.md, Typography).
export const SERIF = "'EB Garamond', Georgia, serif";
export const SANS = "Arial, sans-serif";

// The rest follows the look (look.ts): these styles read the tokens that
// index.css sets under each `data-look`, so a look change needs no re-render.

// A Latin name — of a set, a group, a prayer — at `px` in the Papír look
// (Garamond); Základ sets it in Arial a size smaller (`--name-k`).
export const nameFont = (px: number) => ({
  fontFamily: "var(--name-font)",
  fontSize: `calc(${px}px * var(--name-k))`,
});

// A section heading — red small capitals, as a missal sets its rubrics, in
// Papír and Misál; grey Arial capitals in Základ. The caller gives the size
// for the Papír look (`headingSize`) and the margins.
export const RUBRIC_CAPS = {
  fontFamily: "var(--heading-font)",
  fontWeight: 600,
  fontVariant: "var(--heading-variant)",
  textTransform: "var(--heading-transform)",
  letterSpacing: "var(--heading-spacing)",
  color: "var(--heading-color)",
} as const;
export const headingSize = (px: number) => `calc(${px}px * var(--heading-k))`;

// The line under a Latin name — its translation, or a card's subtitle:
// Garamond italic in Papír, upright in Misál, Arial in Základ.
export const CAPTION = {
  fontFamily: "var(--caption-font)",
  fontStyle: "var(--caption-style)",
  fontSize: "var(--caption-size)",
  lineHeight: 1.2,
  color: "var(--text-muted)",
} as const;

// A start-screen card's box: a thin rule (Papír), a soft shadow (Základ), or
// only a rule under it (Misál). `border` then `borderBottom`, in that order.
export const CARD = {
  background: "var(--card-bg)",
  border: "var(--card-border)",
  borderBottom: "var(--card-border-bottom)",
  borderRadius: "var(--card-radius)",
  boxShadow: "var(--card-shadow)",
} as const;
