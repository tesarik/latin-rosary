import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MissalArt } from "./MissalArt";
import { MYSTERIES, type MysteryKey } from "./prayers";
import { CHAPLETS, FULL_ROSARY } from "./sequence";
import { FAVORITES_COLOR, FAVORITES_ICON, IN_SEASON_COLOR, IN_SEASON_ART, IN_SEASON_ICON, MENU_GROUPS, inSeason, menuEntry, searchMenu, type GroupIconName, type MenuKey, type MenuSection } from "./menu";
import { chapletToOpen, loadSavedChapletFull, saveChapletFull } from "./chaplet";
import { STRINGS, SUPPORTED_LOCALES, type Locale } from "./i18n";
import type { PrayerSetKey } from "./navigation";
import { accentText, type Theme } from "./theme";
import { mysteriesOfDay, seasonOf } from "./liturgy";
import ResumeLine, { type ResumeInfo } from "./ResumeLine";
import { PLAN_COLOR } from "./plans";
import Flag from "./Flag";
import ThemeIcon from "./ThemeIcon";
import AboutDialog from "./AboutDialog";
import HelpDialog from "./HelpDialog";
import { PlanIcon } from "./PlansScreen";
import { STAR_PATH } from "./StarIcon";
import { CAPTION, CARD, RUBRIC_CAPS, headingSize, nameFont } from "./fonts";
import { currentLook, iconBg, ink, type Look } from "./look";
import LookPicker from "./LookPicker";
import BackupCard from "./BackupCard";
import ReminderCard from "./ReminderCard";

type Props = {
  onStart: (key: PrayerSetKey) => void;
  resume: ResumeInfo;
  // The most recently prayed unfinished set, offered first.
  continueWith: { key: PrayerSetKey; name: string; color: string; step: number; total: number } | null;
  // Forget the unfinished prayer's place (the tile's ×).
  onDiscard: (key: PrayerSetKey) => void;
  onOpenPlans: () => void;
  planCount: number;
  // The starred prayers, in the order they were starred.
  favorites: readonly MenuKey[];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  theme: Theme;
  onToggleTheme: () => void;
  look: Look;
  onLook: (look: Look) => void;
  // The first-run welcome card, and closing it.
  showWelcome: boolean;
  onDismissWelcome: () => void;
};

// Sun/moon toggle in the top-left of every start-screen tab, mirroring the
// language picker top-right. Shows the icon for the theme you'd switch TO.
function ThemeToggle({ theme, onToggle, locale }: { theme: Theme; onToggle: () => void; locale: Locale }) {
  const t = STRINGS[locale];
  const dark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={t.themeToggleAria}
      aria-pressed={dark}
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 10,
        border: "1px solid var(--border-strong)",
        background: "var(--surface)",
        color: "var(--text-soft)",
        cursor: "pointer",
      }}
    >
      <ThemeIcon dark={dark} />
    </button>
  );
}

// Custom flag dropdown. Native <select> can't render SVG inside <option>, so
// this is a button + listbox pattern with outside-click + Escape to close.
// Closed, it shows only the current language's flag (a square button like the
// theme toggle); the list names each language beside its flag.
function LanguagePicker({ locale, onChange }: { locale: Locale; onChange: (l: Locale) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const t = STRINGS[locale];

  useEffect(() => {
    if (!open) return;
    const onDocDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: "absolute", top: 16, right: 16 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.languagePickerAria}: ${t.localeName}`}
        title={t.localeName}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          padding: 0,
          borderRadius: 10,
          border: "1px solid var(--border-strong)",
          background: "var(--surface)",
          cursor: "pointer",
        }}
      >
        <Flag locale={locale} />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t.languagePickerAria}
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            minWidth: 170,
            margin: 0,
            padding: 4,
            listStyle: "none",
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: 10,
            boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
            zIndex: 20,
          }}
        >
          {SUPPORTED_LOCALES.map((code) => {
            const active = code === locale;
            return (
              <li key={code}>
                <button
                  role="option"
                  aria-selected={active}
                  onClick={() => { onChange(code); setOpen(false); }}
                  lang={code}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    border: "none",
                    borderRadius: 6,
                    background: active ? "var(--surface-hover)" : "transparent",
                    color: "var(--text-strong)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    cursor: active ? "default" : "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-hover)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <Flag locale={code} />
                  <span>{STRINGS[code].localeName}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// Small accent pill after a prayer's name: the mysteries prayed today, or the
// Marian antiphon of the season.
function Badge({ label, color: raw, theme }: { label: string; color: string; theme: Theme }) {
  const color = ink(raw);
  // In the missal a pill is just a red word, as a rubric would be.
  const missal = currentLook() === "missal";
  return (
    <span style={{
      display: "inline-block",
      marginLeft: 8,
      padding: missal ? 0 : "2px 8px",
      borderRadius: 10,
      background: missal ? "transparent" : color + "1f",
      color: accentText(color, theme),
      fontFamily: "Arial, sans-serif",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 0.4,
      textTransform: "uppercase",
      verticalAlign: "middle",
    }}>
      {label}
    </span>
  );
}

// The symbol in a group header, drawn in the group's colour on a 20×20 grid
// in the same thin-line style as the tiles' icons.
function GroupIcon({ name, color }: { name: GroupIconName; color: string }) {
  const line = { stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  const shape = (() => {
    switch (name) {
      case "calendar":
        return <>
          <rect x="3" y="4.5" width="14" height="12.5" rx="2" {...line} />
          <line x1="3" y1="8.5" x2="17" y2="8.5" {...line} />
          <line x1="7" y1="2.5" x2="7" y2="6" {...line} />
          <line x1="13" y1="2.5" x2="13" y2="6" {...line} />
          <circle cx="10" cy="12.75" r="1.4" fill={color} />
        </>;
      case "sun":
        // The daily prayers: the sun, for morning and evening.
        return <>
          <circle cx="10" cy="10" r="3.6" {...line} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line key={deg} x1="10" y1="3" x2="10" y2="4.6" {...line} transform={`rotate(${deg} 10 10)`} />
          ))}
        </>;
      case "marian":
        // The Marian M.
        return <text x="10" y="16.5" textAnchor="middle" fontFamily="'EB Garamond', Georgia, serif" fontSize="20" fontWeight="600" fill={color}>M</text>;
      case "ihs":
        // The Holy Name's monogram, for the Mass.
        return <text x="10" y="14.8" textAnchor="middle" fontFamily="'EB Garamond', Georgia, serif" fontSize="13.5" fontWeight="600" letterSpacing="0" fill={color}>IHS</text>;
      case "monstrance":
        // A monstrance: the Host in its rays, on a stem.
        return <>
          <circle cx="10" cy="8" r="2.8" {...line} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line key={deg} x1="10" y1="2" x2="10" y2="3.6" {...line} transform={`rotate(${deg} 10 8)`} />
          ))}
          <line x1="10" y1="14" x2="10" y2="17.5" {...line} />
          <line x1="6.5" y1="17.5" x2="13.5" y2="17.5" {...line} />
        </>;
      case "list":
        return <>
          <circle cx="4" cy="6" r="1" fill={color} />
          <circle cx="4" cy="10" r="1" fill={color} />
          <circle cx="4" cy="14" r="1" fill={color} />
          <line x1="8" y1="6" x2="16" y2="6" {...line} />
          <line x1="8" y1="10" x2="16" y2="10" {...line} />
          <line x1="8" y1="14" x2="16" y2="14" {...line} />
        </>;
      case "cross":
        return <>
          <line x1="10" y1="2.5" x2="10" y2="17.5" {...line} />
          <line x1="5.5" y1="7" x2="14.5" y2="7" {...line} />
        </>;
      case "heart":
        return <path d="M10 16.5 C4 12.2 2.6 9 4.2 6.6 C5.9 4.2 8.6 4.8 10 7 C11.4 4.8 14.1 4.2 15.8 6.6 C17.4 9 16 12.2 10 16.5 Z" {...line} />;
      case "star":
        return <path d={STAR_PATH} {...line} />;
    }
  })();
  return <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">{shape}</svg>;
}

// A mystery set's or the chaplet's picture: one of the paintings in public/icons (rendered from
// art/menu-icons by scripts/render-menu-icons.py), 96 px drawn at 40.
function TileImage({ name, size = 40 }: { name: string; size?: number }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}icons/${name}.webp?v=${__ICON_VERSION__}`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ display: "block", flexShrink: 0, borderRadius: size * 0.3, objectFit: "cover" }}
    />
  );
}

// Groups left open, by title. Opening a prayer unmounts the menu, so a group's
// own state would reset; this keeps it open for the return, for the session.
// A group that starts open (the Favourites) is tracked by closing instead.
const openGroups = new Set<string>();
const closedGroups = new Set<string>();

// Collapsible group: a card whose header rolls down small links to prayers,
// section by section in menu.ts's order (a section's heading, if it has one,
// as a small caption). Tapping a link starts that set. Every row shows the
// Latin name with its name in the UI language as a muted subtitle — the same
// two-line shape the prayer-plan tile uses. The "in season" card is one too,
// closed like the rest until tapped.
function CollapsiblePrayers({ title, subtitle, icon, color: rawAccent, sections, onStart, resume, badges = {}, notes = {}, startOpen = false, art, theme, locale }: {
  title: string;
  subtitle: string;
  icon: GroupIconName;
  color: string;
  sections: readonly MenuSection[];
  onStart: (key: PrayerSetKey) => void;
  resume: ResumeInfo;
  // Per-row pill after the name, and an extra muted line under it.
  badges?: Record<string, string>;
  notes?: Record<string, string>;
  // Open unless closed this session, rather than closed unless opened.
  startOpen?: boolean;
  // The engraving heading the open group in the Misál look (MissalArt.tsx).
  art?: string;
  theme: Theme;
  locale: Locale;
}) {
  const accent = ink(rawAccent);
  const missal = currentLook() === "missal";
  const keys = sections.flatMap((s) => s.keys);
  // A group holding an unfinished set starts open, so its place is visible; so
  // does one left open before a prayer was opened from it (openGroups).
  const [open, setOpen] = useState(() =>
    startOpen ? !closedGroups.has(title) : openGroups.has(title) || keys.some((k) => Object.hasOwn(resume, k)));
  const toggle = () => setOpen((o) => {
    if (o) { openGroups.delete(title); closedGroups.add(title); } else { openGroups.add(title); closedGroups.delete(title); }
    return !o;
  });

  return (
    <div style={{
      ...CARD,
      overflow: "hidden",
    }}>
      <button
        onClick={toggle}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px var(--card-px)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{
          width: "var(--icon-box)", height: 40, borderRadius: 12, background: iconBg(accent),
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <GroupIcon name={icon} color={accent} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...nameFont(23), fontWeight: 600, lineHeight: 1.15, color: "var(--text-strong)" }}>
            {title}
          </div>
          <div style={{ ...CAPTION, marginTop: 2 }}>
            {subtitle}
          </div>
        </div>
        <span aria-hidden="true" style={{
          fontSize: 14,
          color: "var(--text-muted)",
          transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.2s ease",
        }}>▾</span>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "4px 0", animation: "rolldown 0.22s ease" }}>
          {missal && art && <MissalArt name={art} style={{ padding: "10px var(--card-px) 6px" }} />}
          <PrayerRows sections={sections} onStart={onStart} resume={resume} badges={badges} notes={notes} theme={theme} locale={locale} />
        </div>
      )}
    </div>
  );
}

// The rows of prayers, section by section (a section's heading, if it has one,
// as a small caption), a rule between two rows: the body of an open group, and
// the search's results.
function PrayerRows({ sections, onStart, resume, badges = {}, notes = {}, indent, theme, locale }: {
  sections: readonly MenuSection[];
  // The rows' left padding: under a group's symbol, or flush in the search.
  indent?: string;
  onStart: (key: PrayerSetKey) => void;
  resume: ResumeInfo;
  badges?: Record<string, string>;
  notes?: Record<string, string>;
  theme: Theme;
  locale: Locale;
}) {
  // Under a group's header the rows line up with its title: past the
  // symbol's box (16 + box + 12), narrower in the missal (index.css).
  const pad = indent ?? "calc(var(--card-px) + 12px + var(--icon-box))";
  const t = STRINGS[locale];
  return (
    <>
      {sections.map((section, i) => (
        <div key={section.heading ?? i}>
          {/* A rule across the card between two sections, and room above a
              section's heading, so it reads as a new section rather than as
              the last row's caption. */}
          {i > 0 && <div aria-hidden="true" style={{ height: 1, background: "var(--divider)" }} />}
          {section.art && currentLook() === "missal" && (
            <MissalArt name={section.art} style={{ padding: "16px var(--card-px) 0" }} />
          )}
          {section.heading && (
            <div style={{
              ...RUBRIC_CAPS,
              padding: `${i > 0 ? 18 : 8}px var(--card-px) 4px ${pad}`,
              fontSize: headingSize(15),
            }}>{section.heading}</div>
          )}
          {section.keys.map((key, j) => { const val = menuEntry(key); return (
          <div key={key}>
          {/* A rule between two prayers, across the whole card. */}
          {j > 0 && <div aria-hidden="true" style={{ height: 1, background: "var(--divider)" }} />}
          <button
            onClick={() => onStart(key)}
            aria-label={t.startPrayerAria(val.nameTr[locale])}
            style={{
              width: "100%",
              display: "block",
              textAlign: "left",
              padding: `8px var(--card-px) 8px ${pad}`,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "Arial, sans-serif",
              fontSize: 16,
              color: "var(--text)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ ...nameFont(19), fontWeight: 500, color: "var(--text-strong)", lineHeight: 1.2 }}>{val.name}{badges[key] && <Badge label={badges[key]} color={val.color} theme={theme} />}</div>
            <div style={{ ...CAPTION, marginTop: 1 }}>
              {val.nameTr[locale]}
            </div>
            {notes[key] && (
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, fontStyle: "italic" }}>{notes[key]}</div>
            )}
            <ResumeLine info={resume[key]} color={val.color} theme={theme} locale={locale} />
          </button>
          </div>
          ); })}
        </div>
      ))}
    </>
  );
}

// The start screen's three tabs (the bar at the bottom): the rosary and the
// chaplet; the other prayers with the search; the user's own, favourites and
// plans. Which one is open, and how far each was scrolled, are kept across
// the menu's unmounting (opening a prayer or the plans replaces it), so coming
// back lands where you left. The scroll is recorded on every scroll while the
// menu is mounted: when it unmounts, the listener is gone before the shorter
// page clamps the scroll to the top.
type MenuTab = "rosary" | "prayers" | "mine";
let menuTab: MenuTab = "rosary";
const menuScroll: Record<MenuTab, number> = { rosary: 0, prayers: 0, mine: 0 };
// The search typed on the start screen, kept the same way: back from a prayer
// found by searching, the results are still there.
let menuQuery = "";

// Start screen: title + one button per mystery set. Also hosts the language
// picker — language is locked in once a rosary starts.
// onStart(key) hands the chosen mystery key back to the parent.
// A card's hover, in the look's manner: Základ lifts it, Papír rules it in
// the set's colour, Misál shades the page behind it. Leaving puts the look's
// own box back (the tokens, not a remembered value).
function cardHover(raw: string) {
  const color = ink(raw);
  const look = currentLook();
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      const st = e.currentTarget.style;
      if (look === "missal") { st.background = "var(--surface-hover)"; return; }
      st.borderColor = color;
      if (look === "base") { st.transform = "translateY(-2px)"; st.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      const st = e.currentTarget.style;
      st.background = CARD.background;
      st.border = CARD.border;
      st.borderBottom = CARD.borderBottom;
      st.boxShadow = CARD.boxShadow;
      st.transform = "";
    },
  };
}

export default function MysteryMenu({ onStart, resume, continueWith, onDiscard, onOpenPlans, planCount, favorites, locale, onLocaleChange, theme, onToggleTheme, look, onLook, showWelcome, onDismissWelcome }: Props) {
  // The Misál look's red star above the footer.
  const missal = look === "missal";
  const t = STRINGS[locale];
  const [aboutOpen, setAboutOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  // Today's place in the calendar: which mysteries to pray, what else is in
  // season (the Marian antiphon, a feast's sequence, November's prayers for
  // the dead), and whether Eastertide replaces the Angelus.
  const now = new Date();
  const todaysMysteries = mysteriesOfDay(now);
  const seasonal = inSeason(now);
  const eastertide = seasonOf(now) === "easter";
  const seasonBadges: Record<string, string> = Object.fromEntries(seasonal.map((k) => [k, t.seasonBadge]));
  const angelusNote: Record<string, string> = eastertide ? { angelus: t.angelusEastertide } : {};
  const [chapletFull, setChapletFull] = useState(loadSavedChapletFull);
  const chaplet = chapletToOpen(chapletFull, Object.keys(resume));
  const chapletEntry = CHAPLETS[chaplet];
  const [query, setQueryState] = useState(menuQuery);
  const setQuery = (q: string) => { menuQuery = q; setQueryState(q); };
  const searching = query.trim() !== "";
  const found = searching ? searchMenu(query) : [];
  // Today's mysteries lead, larger; the other two sit side by side under them.
  const mysteryKeys = Object.keys(MYSTERIES) as MysteryKey[];
  const otherMysteries = mysteryKeys.filter((k) => k !== todaysMysteries);

  const [tab, setTab] = useState<MenuTab>(menuTab);
  const selectTab = (next: MenuTab) => {
    if (next === tab) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    menuTab = next;
    setTab(next);
  };

  // On a tab's first paint — back from a prayer, or switched to — scroll to
  // where it was left (the groups left open are open again, so the page is as
  // tall), then keep recording.
  useLayoutEffect(() => {
    window.scrollTo({ top: menuScroll[tab], behavior: "instant" });
    const record = () => { menuScroll[tab] = window.scrollY; };
    window.addEventListener("scroll", record, { passive: true });
    return () => window.removeEventListener("scroll", record);
  }, [tab]);

  // The gap between cards: none in the missal, where each entry runs from its
  // rule to the next one (so a hovered entry is shaded rule to rule).
  const column: React.CSSProperties = { width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: "var(--card-gap)" };
  const tabTitle = (title: string) => (
    <h1 style={{ ...nameFont(32), fontWeight: 600, lineHeight: 1.1, color: "var(--text-strong)", margin: "4px 0 16px", alignSelf: "center" }}>
      {title}
    </h1>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      padding: "24px 24px calc(96px + env(safe-area-inset-bottom, 0px))",
      position: "relative",
    }}>
      {/* Light/dark and the language, in the top corners of every tab. */}
      <ThemeToggle theme={theme} onToggle={onToggleTheme} locale={locale} />
      <LanguagePicker locale={locale} onChange={onLocaleChange} />

      {tab === "rosary" && (<>

        {/* The Immaculate Heart, cut out of the app icon's blue field (192 px, sharp at 2× density). */}
        <img
          src={`${import.meta.env.BASE_URL}heart-192.webp?v=${__ICON_VERSION__}`}
          alt=""
          aria-hidden="true"
          width={88}
          height={88}
          style={{ marginBottom: 16 }}
        />

        <h1 style={{
          ...nameFont(40),
          fontWeight: 600,
          lineHeight: 1.1,
          color: "var(--text-strong)",
          marginBottom: 2,
        }}>
          {t.appTitle}
        </h1>
        <div style={{ ...CAPTION, fontSize: "calc(var(--caption-size) * 1.3)", marginBottom: 16 }}>
          {t.appSubtitle}
        </div>

        <div style={column}>
          {/* The last unfinished prayer, one tap away — otherwise it may sit
              inside a collapsed group (a litany) or in the plans screen. Its own
              row further down still shows its place too. */}
          {/* First launch: what the app offers and where, in three lines,
              until closed or a prayer is opened. */}
          {showWelcome && !continueWith && (
            <section aria-labelledby="welcome-title" style={{ ...CARD, padding: "16px var(--card-px) 10px" }}>
              <h2 id="welcome-title" style={{ ...nameFont(24), fontWeight: 600, margin: 0, lineHeight: 1.15, color: "var(--text-strong)" }}>{t.welcomeTitle}</h2>
              <div style={{ ...CAPTION, marginTop: 2 }}>{t.welcomeSubtitle}</div>
              {/* Three numbered points: a short lead, the detail under it. */}
              <ol style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {t.welcomePoints.map(([lead, text], i) => (
                  <li key={lead} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span aria-hidden="true" style={{
                      flexShrink: 0, width: 26, height: 26, marginTop: 1, borderRadius: "50%",
                      border: "1.5px solid var(--rubric)", color: "var(--rubric)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      ...nameFont(15), fontWeight: 600,
                    }}>{i + 1}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 15, fontWeight: 700, lineHeight: 1.3, color: "var(--text-strong)" }}>{lead}</div>
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: 1.45, color: "var(--text-soft)", marginTop: 2 }}>{withKeys(text)}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginTop: 14, paddingTop: 10, borderTop: "1px solid var(--divider)" }}>
                <button onClick={() => setHelpOpen(true)} style={{ ...footerLink, paddingLeft: 0 }}>{t.welcomeMore}</button>
                <button
                  onClick={onDismissWelcome}
                  style={{
                    minHeight: 40, padding: "0 20px", borderRadius: 10, cursor: "pointer",
                    border: "none", background: "var(--rubric)",
                    color: "var(--surface)", fontWeight: 700, fontSize: 14, fontFamily: "Arial, sans-serif",
                  }}
                >{t.welcomeDismiss}</button>
              </div>
            </section>
          )}
          {continueWith && (
            <>
              <h2 style={{ ...sectionHeading, margin: "4px var(--heading-indent) 0" }}>{t.continueHeading}</h2>
              {/* The × sits beside the tile's button, not in it (a button
                  can't hold another); the button keeps room for it. */}
              <div style={{ position: "relative" }}>
                <PrayerSetButton
                  name={continueWith.name}
                  resume={<ResumeLine info={continueWith} color={continueWith.color} theme={theme} locale={locale} />}
                  color={continueWith.color}
                  ariaLabel={`${continueWith.name}, ${t.resumeAt(continueWith.step, continueWith.total)}`}
                  icon="continue"
                  padRight={52}
                  onClick={() => onStart(continueWith.key)}
                />
                <button
                  onClick={() => onDiscard(continueWith.key)}
                  aria-label={t.discardAria(continueWith.name)}
                  title={t.discardAria(continueWith.name)}
                  style={{
                    position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)",
                    width: 40, height: 40, border: "none", borderRadius: 10, padding: 0,
                    background: "transparent", color: "var(--text-muted)",
                    fontSize: 24, lineHeight: 1, cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            </>
          )}
          {/* The rosary under its own heading, so the unfinished prayer or the
              welcome above it doesn't run into it (in the missal, whose entries
              run rule to rule, they would read as one list). */}
          {(continueWith || showWelcome) && (
            <h2 style={{ ...sectionHeading, margin: "12px var(--heading-indent) 0" }}>{t.rosaryHeading}</h2>
          )}
          {(() => {
            const val = MYSTERIES[todaysMysteries];
            return (
              <PrayerSetButton
                name={val.name}
                subtitle={val.nameTr[locale]}
                badge={<Badge label={t.todayBadge} color={val.color} theme={theme} />}
                color={val.color}
                ariaLabel={`${t.startRosaryAria(val.nameTr[locale])}, ${t.todayBadge}`}
                icon="rosary"
                image={todaysMysteries}
                hero
                resume={<ResumeLine info={resume[todaysMysteries]} color={val.color} theme={theme} locale={locale} />}
                onClick={() => onStart(todaysMysteries)}
              />
            );
          })()}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {otherMysteries.map((key) => {
              const val = MYSTERIES[key];
              return (
                <CompactSetButton
                  key={key}
                  name={val.name}
                  subtitle={val.nameTr[locale]}
                  image={key}
                  color={val.color}
                  ariaLabel={t.startRosaryAria(val.nameTr[locale])}
                  resume={<ResumeLine info={resume[key]} color={val.color} theme={theme} locale={locale} />}
                  onClick={() => onStart(key)}
                />
              );
            })}
          </div>

          {/* All fifteen decades in one prayer, the Marian psalter. */}
          <PrayerSetButton
            name={FULL_ROSARY.psalterium.name}
            subtitle={FULL_ROSARY.psalterium.nameTr[locale]}
            color={FULL_ROSARY.psalterium.color}
            ariaLabel={t.startPrayerAria(FULL_ROSARY.psalterium.nameTr[locale])}
            icon="rosary"
            resume={<ResumeLine info={resume.psalterium} color={FULL_ROSARY.psalterium.color} theme={theme} locale={locale} />}
            onClick={() => onStart("psalterium")}
          />

          <PrayerSetButton
            name={chapletEntry.name}
            subtitle={chapletEntry.nameTr[locale]}
            color={chapletEntry.color}
            ariaLabel={t.startPrayerAria(chapletEntry.nameTr[locale])}
            icon="rosary"
            image="misericordia"
            resume={<ResumeLine info={resume[chaplet]} color={chapletEntry.color} theme={theme} locale={locale} />}
            onClick={() => onStart(chaplet)}
            footer={
              <OptionSwitch
                label={t.chapletOptional}
                checked={chapletFull}
                color={chapletEntry.color}
                onChange={(full) => { setChapletFull(full); saveChapletFull(full); }}
              />
            }
          />
        </div>
      </>)}

      {tab === "prayers" && (<>
        {tabTitle(t.tabPrayersTitle)}
        <div style={column}>

            {/* Search every listed prayer by its Latin or translated name; while
              there is a query, its results stand in for the cards below. */}
          <div role="search" style={{ position: "relative", marginBottom: "calc(8px - var(--card-gap))" /* keep it off the missal's first rule */ }}>
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" style={{ stroke: "var(--text-muted)" }} strokeWidth="2" />
              <line x1="12.6" y1="12.6" x2="17" y2="17" style={{ stroke: "var(--text-muted)" }} strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Escape") setQuery(""); }}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
              style={{
                width: "100%",
                height: 48,
                padding: "0 44px 0 42px",
                border: "1px solid var(--border-strong)",
                borderRadius: 14,
                background: "var(--surface)",
                color: "var(--text-strong)",
                fontFamily: "Arial, sans-serif",
                fontSize: 16,
                outlineColor: "var(--text-muted)",
                WebkitAppearance: "none",
                appearance: "none",
              }}
            />
            {searching && (
              <button
                onClick={() => setQuery("")}
                aria-label={t.searchClear}
                title={t.searchClear}
                style={{
                  position: "absolute", right: 4, top: 4, width: 40, height: 40,
                  border: "none", background: "transparent", borderRadius: 10,
                  color: "var(--text-muted)", fontSize: 20, lineHeight: 1, cursor: "pointer",
                }}
              >
                ×
              </button>
            )}
          </div>

          {searching && (
            <div aria-live="polite" style={{
              ...CARD,
              overflow: "hidden",
              padding: "4px 0",
            }}>
              {found.length > 0 ? (
                <PrayerRows sections={[{ keys: found }]} onStart={onStart} resume={resume} badges={seasonBadges} notes={angelusNote} indent="var(--card-px)" theme={theme} locale={locale} />
              ) : (
                <div style={{ padding: "12px var(--card-px)", fontSize: 14, color: "var(--text-muted)" }}>{t.searchNoResults}</div>
              )}
            </div>
          )}

          {!searching && (<>

          {/* What the day calls for, above the groups and closed like them; each
              prayer is also in its own group further down, with the same pill. */}
          <CollapsiblePrayers
            title={t.inSeasonHeading}
            subtitle={t.inSeasonSubtitle}
            art={IN_SEASON_ART}
            icon={IN_SEASON_ICON}
            color={IN_SEASON_COLOR}
            sections={[{ keys: seasonal }]}
            onStart={onStart}
            resume={resume}
            theme={theme}
            locale={locale}
          />

          {MENU_GROUPS.map((g) => (
            <CollapsiblePrayers
              key={g.key}
              title={g.title}
              subtitle={g.subtitle[locale]}
              icon={g.icon}
              color={g.color}
              sections={g.sections}
              art={g.art}
              onStart={onStart}
              badges={seasonBadges}
              notes={angelusNote}
              resume={resume}
              theme={theme}
              locale={locale}
            />
          ))}
          </>)}

        </div>
      </>)}

      {tab === "mine" && (<>
        {tabTitle(t.myPrayersHeading)}
        <div style={column}>
          {missal && <MissalArt name="maria" style={{ padding: "0 var(--card-px)", marginBottom: 6 }} />}

            {/* The prayers starred in the prayer header, open from the start;
              each is also in its own group below. */}
          {/* With none starred, the same card's header, saying how to star one,
              so the hint sits in the list like every other entry. */}
          {favorites.length === 0 && (
            <div style={{ ...CARD, display: "flex", alignItems: "center", gap: 12, padding: "12px var(--card-px)" }}>
              <div style={{
                width: "var(--icon-box)", height: 40, borderRadius: 12, background: iconBg(ink(FAVORITES_COLOR)),
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <GroupIcon name={FAVORITES_ICON} color={ink(FAVORITES_COLOR)} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...nameFont(23), fontWeight: 600, lineHeight: 1.15, color: "var(--text-strong)" }}>
                  {t.favoritesHeading}
                </div>
                <div style={{ ...CAPTION, marginTop: 2 }}>{t.favoritesEmpty}</div>
              </div>
            </div>
          )}
          {favorites.length > 0 && (
            <CollapsiblePrayers
              title={t.favoritesHeading}
              subtitle={t.favoritesSubtitle}
              icon={FAVORITES_ICON}
              color={FAVORITES_COLOR}
              sections={[{ keys: favorites }]}
              onStart={onStart}
              resume={resume}
              badges={seasonBadges}
              notes={angelusNote}
              startOpen
              theme={theme}
              locale={locale}
            />
          )}

          <PrayerSetButton
            name={t.plansTitle}
            subtitle={planCount > 0 ? t.plansCount(planCount) : t.plansTileHint}
            color={PLAN_COLOR}
            ariaLabel={t.plansOpenAria}
            icon="plan"
            onClick={onOpenPlans}
          />

          {/* The look, chosen here as well as in a prayer's ⋯ settings. */}
          <h2 style={{ ...sectionHeading, margin: "12px var(--heading-indent) 0" }}>{t.settingsHeading}</h2>
          <div style={{ ...CARD, padding: "12px var(--card-px) 14px" }}>
            <LookPicker look={look} onChange={onLook} locale={locale} />
          </div>

          {/* A daily reminder, as an event in the user's own calendar. */}
          <h2 style={{ ...sectionHeading, margin: "12px var(--heading-indent) 0" }}>{t.reminderHeading}</h2>
          <ReminderCard locale={locale} />

          {/* Everything kept in this browser, to a file and back. */}
          <h2 style={{ ...sectionHeading, margin: "12px var(--heading-indent) 0" }}>{t.backupHeading}</h2>
          <BackupCard locale={locale} />

        </div>
      </>)}

      {missal && <MissalArt name="stella" width={110} style={{ marginTop: 28 }} />}
      {/* Help and About under every tab, not only the rosary's. */}
      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontSize: 13 }}>
        <button onClick={() => setHelpOpen(true)} style={footerLink}>{t.helpTitle}</button>
        <span aria-hidden="true">·</span>
        <button onClick={() => setAboutOpen(true)} style={footerLink}>{t.aboutTitle}</button>
      </div>

      <TabBar tab={tab} onChange={selectTab} locale={locale} />

      {aboutOpen && <AboutDialog locale={locale} onClose={() => setAboutOpen(false)} />}
      {helpOpen && <HelpDialog locale={locale} onClose={() => setHelpOpen(false)} />}
    </div>
  );
}

// Shared button used for both rosary mystery sets and the linear prayer block.
// The icon variant tells the rosary buttons apart from the linear ones at a
// glance — circle-with-cross for rosary, plain cross for linear prayers.
// A `footer` (the chaplet's switch) goes inside the same box, under a rule:
// the box becomes a plain container holding two controls side by side in the
// tree, since a button can't contain another one.
function PrayerSetButton({ name, subtitle, badge, resume, color: rawColor, ariaLabel, icon, image, hero = false, padRight, onClick, footer }: {
  name: string;
  subtitle?: string;
  badge?: React.ReactNode;
  resume?: React.ReactNode;
  color: string;
  ariaLabel: string;
  icon: "rosary" | "cross" | "plan" | "continue";
  // A painting from public/icons, drawn instead of the line icon.
  image?: string;
  // Today's mysteries: a larger painting and name, the first thing to tap.
  hero?: boolean;
  // Room kept on the right for a control laid over the tile (the ×).
  padRight?: number;
  onClick: () => void;
  footer?: React.ReactNode;
}) {
  const color = ink(rawColor);
  const box: React.CSSProperties = { ...CARD, transition: "all 0.2s ease" };
  const hover = cardHover(color);
  const button = (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        display: "flex",
        alignItems: "center",
        gap: hero ? 14 : 12,
        padding: footer ? "12px var(--card-px) 8px" : hero ? "16px var(--card-px)" : "12px var(--card-px)",
        ...(padRight ? { paddingRight: padRight } : {}),
        cursor: "pointer",
        ...(footer
          ? { width: "100%", background: "transparent", border: "none", borderRadius: "16px 16px 0 0" }
          // The full width even when it sits in a wrapper (the unfinished
          // prayer's, beside its ×), so a short name doesn't narrow the card.
          : { ...box, width: "100%" }),
      }}
      {...(footer ? {} : hover)}
    >
      {image ? <TileImage name={image} size={hero ? 64 : 40} /> : (
        <div style={{
          width: "var(--icon-box)",
          height: 40,
          borderRadius: 12,
          background: iconBg(color),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          {icon === "plan" ? (
            <PlanIcon color={color} />
          ) : icon === "continue" ? (
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M7 4.5 L15.5 10 L7 15.5 Z" fill={color} />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {icon === "rosary" && (
                <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth="1.5" />
              )}
              <line x1="10" y1={icon === "rosary" ? 5 : 3} x2="10" y2={icon === "rosary" ? 15 : 17} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
              <line x1={icon === "rosary" ? 6 : 5} y1={icon === "rosary" ? 9 : 8} x2={icon === "rosary" ? 14 : 15} y2={icon === "rosary" ? 9 : 8} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      )}
      <div style={{ textAlign: "left", minWidth: 0 }}>
        {/* The hero's pill stands over its name, which needs the whole width. */}
        {hero && badge && <div style={{ marginLeft: -8, marginBottom: 4 }}>{badge}</div>}
        <div style={{ ...nameFont(hero ? 27 : 23), fontWeight: 600, lineHeight: 1.15, color: "var(--text-strong)" }}>
          {name}{!hero && badge}
        </div>
        {subtitle && (
          <div style={{ ...CAPTION, marginTop: 2 }}>
            {subtitle}
          </div>
        )}
        {resume}
      </div>
    </button>
  );
  if (!footer) return button;
  return (
    <div style={{ ...box, display: "flex", flexDirection: "column" }} {...hover}>
      {button}
      <div style={{ borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", padding: "0 var(--card-px)" }}>
        {footer}
      </div>
    </div>
  );
}

// One of the two other mystery sets, half the width under today's: the
// painting above the name, so the Latin name gets the tile's whole width.
function CompactSetButton({ name, subtitle, image, color, ariaLabel, resume, onClick }: {
  name: string;
  subtitle: string;
  image: string;
  color: string;
  ariaLabel: string;
  resume?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
        minWidth: 0,
        padding: "12px var(--card-px)",
        textAlign: "left",
        cursor: "pointer",
        ...CARD,
        transition: "all 0.2s ease",
      }}
      {...cardHover(color)}
    >
      <TileImage name={image} />
      <div style={{ minWidth: 0, width: "100%" }}>
        <div style={{ ...nameFont(20), fontWeight: 600, color: "var(--text-strong)", lineHeight: 1.15 }}>{name}</div>
        <div style={{ ...CAPTION, marginTop: 2 }}>{subtitle}</div>
        {resume}
      </div>
    </button>
  );
}

// The bar at the foot of the start screen: one button per tab, the open one
// in the rubric red. Fixed to the bottom edge, clear of the phone's home bar.
function TabBar({ tab, onChange, locale }: { tab: MenuTab; onChange: (tab: MenuTab) => void; locale: Locale }) {
  const t = STRINGS[locale];
  const tabs: { key: MenuTab; label: string; icon: React.ReactNode }[] = [
    { key: "rosary", label: t.tabRosary, icon: (
      <>
        <circle cx="12" cy="9" r="6" />
        <line x1="12" y1="15" x2="12" y2="22" />
        <line x1="9" y1="18.5" x2="15" y2="18.5" />
      </>
    ) },
    { key: "prayers", label: t.tabPrayers, icon: <path d="M4 6h16M4 12h16M4 18h16" /> },
    { key: "mine", label: t.tabMine, icon: <path d={STAR_PATH} transform="scale(1.2)" vectorEffect="non-scaling-stroke" strokeLinejoin="round" /> },
  ];
  return (
    <nav aria-label={t.tabsAria} style={{
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 20,
      display: "flex",
      justifyContent: "center",
      background: "var(--surface)",
      borderTop: "1px solid var(--border-strong)",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      <div style={{ width: "100%", maxWidth: 420, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {tabs.map(({ key, label, icon }) => {
          const on = key === tab;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              aria-current={on ? "page" : undefined}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                minHeight: 56,
                padding: "8px 4px 6px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "Arial, sans-serif",
                fontSize: 12,
                fontWeight: on ? 700 : 400,
                color: on ? "var(--rubric)" : "var(--text-muted)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={on ? 2 : 1.6} strokeLinecap="round">
                {icon}
              </svg>
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// A small labelled on/off switch in a start-screen row's footer — the
// chaplet's optional prayers. Its own control rather than part of the row's
// button, so the two taps can't be confused.
function OptionSwitch({ label, checked, color, onChange }: {
  label: string;
  checked: boolean;
  color: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 4px",
        minHeight: 40,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        fontSize: 13,
        color: "var(--text-muted)",
      }}
    >
      {label}
      <span aria-hidden="true" style={{
        position: "relative",
        width: 34,
        height: 20,
        borderRadius: 10,
        background: checked ? ink(color) : "var(--border-strong)",
        transition: "background 0.2s ease",
        flexShrink: 0,
      }}>
        <span style={{
          position: "absolute",
          top: 2,
          left: checked ? 16 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          transition: "left 0.2s ease",
        }} />
      </span>
    </button>
  );
}

// The muted text links at the foot of the start screen (Help · About).
const footerLink: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "var(--text-muted)",
  fontFamily: "Arial, sans-serif",
  fontSize: 13,
  cursor: "pointer",
  padding: 8,
  minHeight: 40,
};

// The welcome card's text with the header's language switch ("La | Cz",
// "La | En") drawn as a small chip, as it looks in the header.
function withKeys(text: string): React.ReactNode {
  const m = /La \| (Cz|En)/.exec(text);
  if (!m) return text;
  return (<>
    {text.slice(0, m.index)}
    <span style={{
      display: "inline-block", padding: "0 6px", borderRadius: 6, border: "1px solid var(--border-strong)",
      fontSize: 12, fontWeight: 700, lineHeight: "18px", color: "var(--text-strong)", whiteSpace: "nowrap",
    }}>{m[0]}</span>
    {text.slice(m.index + m[0].length)}
  </>);
}

// Small uppercase heading over a group of start-screen rows.
const sectionHeading: React.CSSProperties = {
  ...RUBRIC_CAPS,
  fontSize: headingSize(18),
  // A little air above the first entry where the cards have no gap (the
  // missal, index.css).
  paddingBottom: "calc(8px - var(--card-gap))",
  margin: "16px var(--heading-indent) 0",
};
