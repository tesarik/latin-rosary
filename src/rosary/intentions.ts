// A private intention for each prayer: one line the user writes before
// praying ("za rodinu"), shown under the label while that prayer is open and
// kept for the next time, until the user changes or clears it. User data, like
// the favourites: its own key, not versioned, never cleared by a reset, and
// carried by the backup (backup.ts). It never leaves the device.
const INTENTIONS_STORAGE_KEY = "ruzenec_intentions";
export const MAX_INTENTION = 200;
// More than there are prayers and plans; it only bounds bad data.
export const MAX_INTENTIONS = 300;

export type Intentions = Record<string, string>;

// Keeps string entries of anything claiming to be a map: trimmed, capped,
// never an empty text or a prototype name.
export function sanitizeIntentions(raw: unknown): Intentions {
  const out: Intentions = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (Object.keys(out).length >= MAX_INTENTIONS) break;
    if (!key || key.length > 80 || key in Object.prototype || typeof value !== "string") continue;
    const text = value.trim().slice(0, MAX_INTENTION);
    if (text) out[key] = text;
  }
  return out;
}

export function loadIntentions(): Intentions {
  try {
    const raw = localStorage.getItem(INTENTIONS_STORAGE_KEY);
    return raw ? sanitizeIntentions(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

export function saveIntentions(intentions: Intentions): void {
  try {
    if (Object.keys(intentions).length === 0) localStorage.removeItem(INTENTIONS_STORAGE_KEY);
    else localStorage.setItem(INTENTIONS_STORAGE_KEY, JSON.stringify(intentions));
  } catch {}
}

// Sets a prayer's intention, or clears it when the text is empty.
export function withIntention(intentions: Intentions, key: string, text: string): Intentions {
  const next = { ...intentions };
  const clean = text.trim().slice(0, MAX_INTENTION);
  if (clean) next[key] = clean;
  else delete next[key];
  return next;
}
