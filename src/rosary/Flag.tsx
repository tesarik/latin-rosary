import type { Locale } from "./i18n";

// Inline SVG flags at a uniform 24×16 viewBox. The Union Jack and German flag
// have non-3:2 native ratios — they stretch slightly to fit, but at icon size
// the simplification is fine. The Slovak shield is intentionally retained
// (without it the flag is indistinguishable from the Russian tricolor).
type Props = {
  locale: Locale;
  width?: number;
  height?: number;
};

export default function Flag({ locale, width = 24, height = 16 }: Props) {
  const props = {
    width,
    height,
    viewBox: "0 0 24 16",
    "aria-hidden": true as const,
    style: { display: "block", borderRadius: 2, flexShrink: 0 } as const,
  };

  switch (locale) {
    case "cs":
      return (
        <svg {...props}>
          <rect width="24" height="8" fill="#FFFFFF" />
          <rect y="8" width="24" height="8" fill="#D7141A" />
          <polygon points="0,0 0,16 12,8" fill="#11457E" />
        </svg>
      );

    case "en":
      return (
        <svg {...props}>
          <rect width="24" height="16" fill="#012169" />
          <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="3.2" />
          <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.1" />
          <rect x="10" y="0" width="4" height="16" fill="#FFFFFF" />
          <rect x="0" y="6" width="24" height="4" fill="#FFFFFF" />
          <rect x="10.8" y="0" width="2.4" height="16" fill="#C8102E" />
          <rect x="0" y="6.8" width="24" height="2.4" fill="#C8102E" />
        </svg>
      );

    case "sk":
      return (
        <svg {...props}>
          <rect width="24" height="5.33" fill="#FFFFFF" />
          <rect y="5.33" width="24" height="5.34" fill="#0B4EA2" />
          <rect y="10.67" width="24" height="5.33" fill="#EE1C25" />
          <path d="M3,3.5 L9,3.5 L9,9.5 Q9,12 6,13 Q3,12 3,9.5 Z" fill="#EE1C25" stroke="#FFFFFF" strokeWidth="0.6" />
          <path d="M3.3,11.3 Q4.5,10.3 6,11 Q7.5,10.3 8.7,11.3 L8.7,12.4 L3.3,12.4 Z" fill="#0B4EA2" />
          <rect x="5.7" y="4.6" width="0.6" height="6.4" fill="#FFFFFF" />
          <rect x="4.3" y="5.7" width="3.4" height="0.6" fill="#FFFFFF" />
          <rect x="4.7" y="7.4" width="2.6" height="0.6" fill="#FFFFFF" />
        </svg>
      );

    case "de":
      return (
        <svg {...props}>
          <rect width="24" height="5.33" fill="#000000" />
          <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
          <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
        </svg>
      );

    case "pl":
      return (
        <svg {...props}>
          <rect width="24" height="8" fill="#FFFFFF" />
          <rect y="8" width="24" height="8" fill="#DC143C" />
        </svg>
      );
  }
}
