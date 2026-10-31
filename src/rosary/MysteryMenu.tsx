import { useEffect, useRef, useState } from "react";
import { MYSTERIES, type MysteryKey } from "./prayers";
import { CHAPLETS } from "./sequence";
import { IN_SEASON_COLOR, IN_SEASON_ICON, MENU_GROUPS, inSeason, menuEntry, type GroupIconName, type MenuSection } from "./menu";
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
import { PlanIcon } from "./PlansScreen";

type Props = {
  onStart: (key: PrayerSetKey) => void;
  resume: ResumeInfo;
  // The most recently prayed unfinished set, offered first.
  continueWith: { key: PrayerSetKey; name: string; color: string; step: number; total: number } | null;
  onOpenPlans: () => void;
  planCount: number;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  theme: Theme;
  onToggleTheme: () => void;
};

// Sun/moon toggle in the top-left of the start screen, mirroring the language
// picker top-right. Shows the icon for the theme you'd switch TO.
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
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <ThemeIcon dark={dark} />
    </button>
  );
}

// Custom flag dropdown. Native <select> can't render SVG inside <option>, so
// this is a button + listbox pattern with outside-click + Escape to close.
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
        aria-label={t.languagePickerAria}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          borderRadius: 10,
          border: "1px solid var(--border-strong)",
          background: "var(--surface)",
          cursor: "pointer",
          fontFamily: "Arial, sans-serif",
          fontSize: 13,
          color: "var(--text)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <Flag locale={locale} />
        <span lang={locale} style={{ fontWeight: 600 }}>{STRINGS[locale].localeName}</span>
        <span aria-hidden="true" style={{ fontSize: 10, marginLeft: 2, color: "var(--text-muted)" }}>{open ? "▴" : "▾"}</span>
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
function Badge({ label, color, theme }: { label: string; color: string; theme: Theme }) {
  return (
    <span style={{
      display: "inline-block",
      marginLeft: 8,
      padding: "2px 8px",
      borderRadius: 10,
      background: color + "1f",
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
    }
  })();
  return <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">{shape}</svg>;
}

// Groups left open, by title. Opening a prayer unmounts the menu, so a group's
// own state would reset; this keeps it open for the return, for the session.
const openGroups = new Set<string>();

// Collapsible group: a card whose header rolls down small links to prayers,
// section by section in menu.ts's order (a section's heading, if it has one,
// as a small caption). Tapping a link starts that set. Every row shows the
// Latin name with its name in the UI language as a muted subtitle — the same
// two-line shape the prayer-plan tile uses. The "in season" card is one too,
// held open (collapsible={false}).
function CollapsiblePrayers({ title, subtitle, icon, color: accent, sections, collapsible = true, onStart, resume, badges = {}, notes = {}, theme, locale }: {
  title: string;
  subtitle: string;
  icon: GroupIconName;
  color: string;
  sections: readonly MenuSection[];
  collapsible?: boolean;
  onStart: (key: PrayerSetKey) => void;
  resume: ResumeInfo;
  // Per-row pill after the name, and an extra muted line under it.
  badges?: Record<string, string>;
  notes?: Record<string, string>;
  theme: Theme;
  locale: Locale;
}) {
  const t = STRINGS[locale];
  const keys = sections.flatMap((s) => s.keys);
  // A group holding an unfinished set starts open, so its place is visible; so
  // does one left open before a prayer was opened from it (openGroups).
  const [isOpen, setOpen] = useState(() => openGroups.has(title) || keys.some((k) => Object.hasOwn(resume, k)));
  const open = isOpen || !collapsible;
  const toggle = () => setOpen((o) => {
    if (o) openGroups.delete(title); else openGroups.add(title);
    return !o;
  });

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      overflow: "hidden",
    }}>
      <button
        onClick={collapsible ? toggle : undefined}
        aria-expanded={collapsible ? open : undefined}
        tabIndex={collapsible ? undefined : -1}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "18px 24px",
          background: "transparent",
          border: "none",
          cursor: collapsible ? "pointer" : "default",
          textAlign: "left",
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 12, background: accent + "18",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
<GroupIcon name={icon} color={accent} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-strong)" }}>
            {title}
          </div>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
            {subtitle}
          </div>
        </div>
        {collapsible && <span aria-hidden="true" style={{
          fontSize: 14,
          color: "var(--text-muted)",
          transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.2s ease",
        }}>▾</span>}
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "4px 0", animation: "rolldown 0.22s ease" }}>
          {sections.map((section, i) => (
            <div key={section.heading ?? i}>
              {section.heading && (
                <div style={{
                  padding: "10px 24px 2px 80px",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}>{section.heading}</div>
              )}
              {section.keys.map((key) => { const val = menuEntry(key); return (
              <button
                key={key}
                onClick={() => onStart(key)}
                aria-label={t.startPrayerAria(val.nameTr[locale])}
                style={{
                  width: "100%",
                  display: "block",
                  textAlign: "left",
                  padding: "11px 24px 11px 80px",
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
                <div>{val.name}{badges[key] && <Badge label={badges[key]} color={val.color} theme={theme} />}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 1 }}>
                  {val.nameTr[locale]}
                </div>
                {notes[key] && (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, fontStyle: "italic" }}>{notes[key]}</div>
                )}
                <ResumeLine info={resume[key]} color={val.color} theme={theme} locale={locale} />
              </button>
              ); })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Start screen: title + one button per mystery set. Also hosts the language
// picker — language is locked in once a rosary starts.
// onStart(key) hands the chosen mystery key back to the parent.
export default function MysteryMenu({ onStart, resume, continueWith, onOpenPlans, planCount, locale, onLocaleChange, theme, onToggleTheme }: Props) {
  const t = STRINGS[locale];
  const [aboutOpen, setAboutOpen] = useState(false);
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

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      padding: 24,
      position: "relative",
    }}>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} locale={locale} />
      <LanguagePicker locale={locale} onChange={onLocaleChange} />

      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" style={{ marginBottom: 16 }}>
        <line x1="24" y1="6" x2="24" y2="42" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
        <line x1="12" y1="18" x2="36" y2="18" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <h1 style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 36,
        fontWeight: 700,
        color: "var(--text-strong)",
        marginBottom: 6,
        letterSpacing: -0.5,
      }}>
        {t.appTitle}
      </h1>

      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* The last unfinished prayer, one tap away — otherwise it may sit
            inside a collapsed group (a litany) or in the plans screen. Its own
            row further down still shows its place too. */}
        {continueWith && (
          <>
            <h2 style={{ ...sectionHeading, margin: "4px 4px 0" }}>{t.continueHeading}</h2>
            <PrayerSetButton
              name={continueWith.name}
              resume={<ResumeLine info={continueWith} color={continueWith.color} theme={theme} locale={locale} />}
              color={continueWith.color}
              ariaLabel={`${continueWith.name}, ${t.resumeAt(continueWith.step, continueWith.total)}`}
              icon="continue"
              onClick={() => onStart(continueWith.key)}
            />
            <div aria-hidden="true" style={{ height: 4 }} />
          </>
        )}
        {(Object.entries(MYSTERIES) as [MysteryKey, typeof MYSTERIES[MysteryKey]][]).map(([key, val]) => (
          <PrayerSetButton
            key={key}
            name={val.name}
            subtitle={val.nameTr[locale]}
            badge={key === todaysMysteries ? <Badge label={t.todayBadge} color={val.color} theme={theme} /> : undefined}
            color={val.color}
            ariaLabel={key === todaysMysteries ? `${t.startRosaryAria(val.nameTr[locale])}, ${t.todayBadge}` : t.startRosaryAria(val.nameTr[locale])}
            icon="rosary"
            resume={<ResumeLine info={resume[key]} color={val.color} theme={theme} locale={locale} />}
            onClick={() => onStart(key)}
          />
        ))}

        <PrayerSetButton
          name={chapletEntry.name}
          subtitle={chapletEntry.nameTr[locale]}
          color={chapletEntry.color}
          ariaLabel={t.startPrayerAria(chapletEntry.nameTr[locale])}
          icon="rosary"
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

        <h2 style={sectionHeading}>
          {t.otherPrayersHeading}
        </h2>

        {/* What the day calls for, held open above the groups; each prayer is
            also in its own group further down, with the same pill. */}
        <CollapsiblePrayers
          title={t.inSeasonHeading}
          subtitle={t.inSeasonSubtitle}
          icon={IN_SEASON_ICON}
          color={IN_SEASON_COLOR}
          sections={[{ keys: seasonal }]}
          collapsible={false}
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
            onStart={onStart}
            badges={seasonBadges}
            notes={angelusNote}
            resume={resume}
            theme={theme}
            locale={locale}
          />
        ))}

        <PrayerSetButton
          name={t.plansTitle}
          subtitle={planCount > 0 ? t.plansCount(planCount) : t.plansTileHint}
          color={PLAN_COLOR}
          ariaLabel={t.plansOpenAria}
          icon="plan"
          onClick={onOpenPlans}
        />

        <button
          onClick={() => setAboutOpen(true)}
          style={{
            marginTop: 12,
            alignSelf: "center",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            fontFamily: "Arial, sans-serif",
            fontSize: 13,
            cursor: "pointer",
            padding: 8,
          }}
        >
          {t.aboutTitle}
        </button>
      </div>

      {aboutOpen && <AboutDialog locale={locale} onClose={() => setAboutOpen(false)} />}
    </div>
  );
}

// Shared button used for both rosary mystery sets and the linear prayer block.
// The icon variant tells the rosary buttons apart from the linear ones at a
// glance — circle-with-cross for rosary, plain cross for linear prayers.
// A `footer` (the chaplet's switch) goes inside the same box, under a rule:
// the box becomes a plain container holding two controls side by side in the
// tree, since a button can't contain another one.
function PrayerSetButton({ name, subtitle, badge, resume, color, ariaLabel, icon, onClick, footer }: {
  name: string;
  subtitle?: string;
  badge?: React.ReactNode;
  resume?: React.ReactNode;
  color: string;
  ariaLabel: string;
  icon: "rosary" | "cross" | "plan" | "continue";
  onClick: () => void;
  footer?: React.ReactNode;
}) {
  const box: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  };
  const hover = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
      e.currentTarget.style.borderColor = color;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
      e.currentTarget.style.borderColor = "var(--border)";
    },
  };
  const button = (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: footer ? "18px 24px 14px" : "18px 24px",
        cursor: "pointer",
        ...(footer
          ? { width: "100%", background: "transparent", border: "none", borderRadius: "16px 16px 0 0" }
          : box),
      }}
      {...(footer ? {} : hover)}
    >
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: color + "18",
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
      <div style={{ textAlign: "left", minWidth: 0 }}>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-strong)" }}>
          {name}{badge}
        </div>
        {subtitle && (
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
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
      <div style={{ borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", padding: "0 12px" }}>
        {footer}
      </div>
    </div>
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
        background: checked ? color : "var(--border-strong)",
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

// Small uppercase heading over a group of start-screen rows.
const sectionHeading: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--text-muted)",
  letterSpacing: 0.5,
  textTransform: "uppercase",
  margin: "16px 4px 0",
};
