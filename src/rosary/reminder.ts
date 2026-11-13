// A daily reminder to pray, as an event in the user's own calendar: the app
// has no server, so it can't send a notification at a given time (Web Push
// needs one, and scheduled notifications never shipped in browsers). The
// event repeats every day and carries a link that opens the prayer
// (`#pray=<key>`, read by Rosary). Pure: builds the file and the link.

// What a reminder can open: the Angelus, the chaplet (in the form the start
// screen's switch picks) and the rosary (today's mysteries, whatever the
// day). `corona` and `rosarium` are link keys Rosary resolves on opening.
export type ReminderPrayer = "angelus" | "corona" | "rosarium";
export const REMINDER_PRAYERS: readonly ReminderPrayer[] = ["angelus", "corona", "rosarium"];

// The usual hour of each: the Angelus at noon, the Hour of Mercy at three,
// the rosary in the evening.
export const DEFAULT_TIME: Record<ReminderPrayer, string> = {
  angelus: "12:00",
  corona: "15:00",
  rosarium: "20:00",
};

// How long the event lasts, in minutes (a calendar shows it as a block).
const DURATION: Record<ReminderPrayer, number> = { angelus: 5, corona: 15, rosarium: 20 };

export type Reminder = {
  prayer: ReminderPrayer;
  time: string; // "HH:MM", local
  title: string;
  description: string; // the link is appended
  url: string; // absolute: the app's address + #pray=<key>
};

export const reminderUrl = (appUrl: string, prayer: ReminderPrayer): string => `${appUrl}#pray=${prayer}`;

const pad = (n: number) => String(n).padStart(2, "0");
// A local date and time with no zone ("floating"): the event keeps its hour
// wherever the phone is, which is what a daily prayer wants.
const floating = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
const utcStamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

function startOn(day: Date, time: string): Date {
  const [h, m] = time.split(":").map(Number);
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), h || 0, m || 0);
}

// iCalendar text: backslash, semicolon, comma and newline escaped.
const icsText = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

// Lines over 75 octets are folded (RFC 5545), counting UTF-8 bytes so a
// Czech letter is never split.
function fold(line: string): string {
  const enc = new TextEncoder();
  const out: string[] = [];
  let cur = "";
  for (const ch of line) {
    if (enc.encode(cur + ch).length > (out.length ? 74 : 75)) { out.push(cur); cur = ""; }
    cur += ch;
  }
  out.push(cur);
  return out.join("\r\n ");
}

// An .ics file with one daily event from `today`, with an alarm at its start.
export function reminderIcs(r: Reminder, today: Date = new Date()): string {
  const start = startOn(today, r.time);
  const uid = `${r.prayer}-${utcStamp(today)}-${Math.random().toString(36).slice(2, 10)}@rosarium`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Rosarium//Rosarium Latinum//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${utcStamp(today)}`,
    `DTSTART:${floating(start)}`,
    `DURATION:PT${DURATION[r.prayer]}M`,
    "RRULE:FREQ=DAILY",
    `SUMMARY:${icsText(r.title)}`,
    `DESCRIPTION:${icsText(`${r.description} ${r.url}`)}`,
    `URL:${r.url}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsText(r.title)}`,
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

// The same event as a Google Calendar link (its "add event" template), for
// phones whose calendar won't open an .ics file. Nothing about the user goes
// into it: only the prayer's name, the hour and the app's link.
export function reminderGoogleUrl(r: Reminder, today: Date = new Date()): string {
  const start = startOn(today, r.time);
  const end = new Date(start.getTime() + DURATION[r.prayer] * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: r.title,
    dates: `${floating(start)}/${floating(end)}`,
    details: `${r.description} ${r.url}`,
    recur: "RRULE:FREQ=DAILY",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
