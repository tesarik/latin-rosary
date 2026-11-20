import { ink } from "./look";
import { ui } from "./fonts";

// A small labelled on/off switch: the optional prayers of the rosary, the
// Chaplet of Divine Mercy and St. Bridget's prayers, offered under the label
// chip on their first step. With `onInfo`, an ⓘ after it tells what the
// optional prayers are and where they come from (notes.ts OPTIONAL_NOTES).
export default function OptionSwitch({ label, checked, color, onChange, onInfo, infoLabel }: {
  label: string;
  checked: boolean;
  color: string;
  onChange: (checked: boolean) => void;
  onInfo?: () => void;
  infoLabel?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
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
          fontSize: ui(13),
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
      {onInfo && (
        <button
          onClick={onInfo}
          aria-label={infoLabel}
          title={infoLabel}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 40, height: 40, padding: 0, border: "none", background: "transparent", cursor: "pointer",
          }}
        >
          {/* The header's ⓘ: a disc with a Garamond i cut out of it. */}
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <mask id="option-note-i">
              <rect width="20" height="20" fill="white" />
              <text x="10" y="15.2" textAnchor="middle" fontFamily="'EB Garamond', serif" fontWeight="600" fontSize="16" fill="black">i</text>
            </mask>
            <circle cx="10" cy="10" r="9.5" mask="url(#option-note-i)" style={{ fill: ink(color) }} />
          </svg>
        </button>
      )}
    </div>
  );
}
