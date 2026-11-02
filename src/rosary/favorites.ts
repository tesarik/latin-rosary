import { isMenuKey, type MenuKey } from "./menu";

// The prayers starred from the prayer header, shown in the start screen's
// Favourites card in the order they were starred. User data like the plans:
// its own key, not versioned and never cleared by a reset. Only what the
// menu's groups list can be starred — the mystery sets and the chaplet head
// the start screen already, and a plan has its own tile.
const FAVORITES_STORAGE_KEY = "ruzenec_favorites";
// More than the menu lists, so the cap never bites; it only bounds bad data.
export const MAX_FAVORITES = 200;

// Keeps the known menu keys of anything claiming to be a list, once each.
export function sanitizeFavorites(raw: unknown): MenuKey[] {
  if (!Array.isArray(raw)) return [];
  const out: MenuKey[] = [];
  for (const k of raw) {
    if (typeof k === "string" && isMenuKey(k) && !out.includes(k)) out.push(k);
    if (out.length >= MAX_FAVORITES) break;
  }
  return out;
}

export function loadFavorites(): MenuKey[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? sanitizeFavorites(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(keys: readonly MenuKey[]): void {
  try {
    if (keys.length === 0) localStorage.removeItem(FAVORITES_STORAGE_KEY);
    else localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(keys));
  } catch {}
}

// Stars an unstarred key (at the end) or unstars a starred one.
export const toggleFavorite = (keys: readonly MenuKey[], key: MenuKey): MenuKey[] =>
  keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key];
