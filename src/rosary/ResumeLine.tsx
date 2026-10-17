import { STRINGS, type Locale } from "./i18n";
import { accentText, type Theme } from "./theme";

// Saved place of each unfinished set, 1-based for display ("Continue · 23/74").
export type ResumeInfo = Record<string, { step: number; total: number }>;

// Extra line under an unfinished set on the start and plan screens, in the
// set's accent: "Continue · 23/74". Renders nothing for a set with no progress.
export default function ResumeLine({ info, color, theme, locale }: {
  info: { step: number; total: number } | undefined;
  color: string;
  theme: Theme;
  locale: Locale;
}) {
  if (!info) return null;
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, fontWeight: 600, color: accentText(color, theme), marginTop: 3 }}>
      {STRINGS[locale].resumeAt(info.step, info.total)}
    </div>
  );
}
