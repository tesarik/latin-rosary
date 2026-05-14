import { MYSTERIES, type MysteryKey } from "./prayers";
import { STRINGS, SUPPORTED_LOCALES, type Locale } from "./i18n";

type Props = {
  onStart: (key: MysteryKey) => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

// Start screen: title + one button per mystery set. Also hosts the language
// picker — language is locked in once a rosary starts.
// onStart(key) hands the chosen mystery key back to the parent.
export default function MysteryMenu({ onStart, locale, onLocaleChange }: Props) {
  const t = STRINGS[locale];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #ECEFF1 0%, #FAFAFA 50%, #E8EAF6 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      padding: 24,
      position: "relative",
    }}>
      <div
        role="group"
        aria-label={t.languagePickerAria}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          gap: 4,
        }}
      >
        {SUPPORTED_LOCALES.map((code) => {
          const active = code === locale;
          return (
            <button
              key={code}
              onClick={() => onLocaleChange(code)}
              aria-pressed={active}
              aria-label={STRINGS[code].localeName}
              lang={code}
              style={{
                padding: "5px 9px",
                borderRadius: 8,
                border: "1px solid",
                borderColor: active ? "#1565C0" : "#CFD8DC",
                background: active ? "#1565C0" : "white",
                color: active ? "white" : "#546E7A",
                cursor: active ? "default" : "pointer",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "Arial, sans-serif",
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {code}
            </button>
          );
        })}
      </div>

      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" style={{ marginBottom: 16 }}>
        <line x1="24" y1="6" x2="24" y2="42" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
        <line x1="12" y1="18" x2="36" y2="18" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <h1 style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 36,
        fontWeight: 700,
        color: "#263238",
        marginBottom: 6,
        letterSpacing: -0.5,
      }}>
        {t.appTitle}
      </h1>

      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        {(Object.entries(MYSTERIES) as [MysteryKey, typeof MYSTERIES[MysteryKey]][]).map(([key, val]) => (
          <button
            key={key}
            onClick={() => onStart(key)}
            aria-label={t.startRosaryAria(val.name)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "18px 24px",
              background: "white",
              border: "1px solid #E0E0E0",
              borderRadius: 16,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
              e.currentTarget.style.borderColor = val.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
              e.currentTarget.style.borderColor = "#E0E0E0";
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: val.color + "18",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="8" fill="none" stroke={val.color} strokeWidth="1.5" />
                <line x1="10" y1="5" x2="10" y2="15" stroke={val.color} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="6" y1="9" x2="14" y2="9" stroke={val.color} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ textAlign: "left" }}>
              <div lang="la" style={{ fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 600, color: "#263238" }}>
                {val.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
