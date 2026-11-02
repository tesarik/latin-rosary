// The favourites star on a 20×20 grid: outlined when the prayer isn't starred,
// filled when it is. Shared by the prayer header's toggle and the start
// screen's Favourites card.
export const STAR_PATH = "M10 2.6 L12.2 7.3 L17.3 7.9 L13.5 11.4 L14.5 16.5 L10 14 L5.5 16.5 L6.5 11.4 L2.7 7.9 L7.8 7.3 Z";

export default function StarIcon({ filled, size = 20, color = "currentColor" }: { filled: boolean; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path d={STAR_PATH} fill={filled ? color : "none"} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
