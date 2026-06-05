import { FONT_SIZES, type FontSize } from "./fontSize";
import { STRINGS, type Locale } from "./i18n";

// The "A" glyph is rendered at three sizes so the buttons read as small /
// medium / large at a glance (the icon *is* the label).
const GLYPH_PX: Record<FontSize, number> = { small: 11, medium: 14, large: 18 };

type Props = {
  value: FontSize;
  onChange: (size: FontSize) => void;
  accentColor: string;
  locale: Locale;
};

// Segmented A / A / A control that lives in the accent-colored header. White on
// a translucent track; the active level fills solid white with accent-colored
// text. Sits where the back-button spacer used to be.
export default function FontSizeControl({ value, onChange, accentColor, locale }: Props) {
  const t = STRINGS[locale];
  const ariaLabel: Record<FontSize, string> = {
    small: t.textSizeSmallAria,
    medium: t.textSizeMediumAria,
    large: t.textSizeLargeAria,
  };
  return (
    <div
      role="group"
      aria-label={t.textSizeAria}
      style={{ display: "flex", alignItems: "center", gap: 2 }}
    >
      {FONT_SIZES.map((size) => {
        const active = size === value;
        return (
          <button
            key={size}
            onClick={() => onChange(size)}
            aria-label={ariaLabel[size]}
            aria-pressed={active}
            style={{
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              border: "none",
              borderRadius: 7,
              cursor: "pointer",
              background: active ? "white" : "rgba(255,255,255,0.2)",
              color: active ? accentColor : "white",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              fontSize: GLYPH_PX[size],
              lineHeight: 1,
            }}
          >
            A
          </button>
        );
      })}
    </div>
  );
}
