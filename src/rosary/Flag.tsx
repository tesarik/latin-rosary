import type { Locale } from "./i18n";

// Inline SVG flags at a uniform 24×16 viewBox, one per supported UI locale.
// The Union Jack's native ratio isn't 3:2 — it stretches slightly to fit, but at
// icon size the simplification is fine.
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
  }
}
