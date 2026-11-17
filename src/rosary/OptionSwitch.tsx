import { ink } from "./look";

// A small labelled on/off switch: the optional prayers of the Chaplet of
// Divine Mercy and of St. Bridget's prayers, offered under the label chip on
// their first step.
export default function OptionSwitch({ label, checked, color, onChange }: {
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
