import { useState } from "react";
import { STRINGS, type Locale } from "./i18n";
import { CARD } from "./fonts";
import { ink } from "./look";
import { PLAN_COLOR } from "./plans";
import { DEFAULT_TIME, REMINDER_PRAYERS, reminderGoogleUrl, reminderIcs, reminderUrl, type Reminder, type ReminderPrayer } from "./reminder";

// The Mine tab's reminder card: a daily event for the user's own calendar —
// the Angelus, the chaplet or today's rosary at an hour of their choosing —
// as an .ics file (Apple's and most calendars) or a Google Calendar link.
// The app keeps nothing of it; the calendar does the reminding.
export default function ReminderCard({ locale }: { locale: Locale }) {
  const t = STRINGS[locale];
  const [prayer, setPrayer] = useState<ReminderPrayer>("angelus");
  const [time, setTime] = useState(DEFAULT_TIME.angelus);
  const color = ink(PLAN_COLOR);

  const reminder = (): Reminder => ({
    prayer,
    time: /^\d\d:\d\d$/.test(time) ? time : DEFAULT_TIME[prayer],
    title: t.reminderTitle[prayer],
    description: t.reminderDescription,
    url: reminderUrl(new URL(import.meta.env.BASE_URL, location.origin).href, prayer),
  });

  const downloadIcs = () => {
    const blob = new Blob([reminderIcs(reminder())], { type: "text/calendar" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `${t.reminderFileName}-${prayer}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  };

  const field: React.CSSProperties = {
    height: 40, padding: "0 10px", borderRadius: 10, border: "1px solid var(--border-strong)",
    background: "var(--surface)", color: "var(--text)", fontFamily: "Arial, sans-serif", fontSize: 15,
  };
  const button: React.CSSProperties = {
    flex: 1, minHeight: 40, padding: "8px 12px", borderRadius: 10, border: "1px solid var(--border-strong)",
    background: "var(--surface)", color, fontFamily: "Arial, sans-serif", fontSize: 14, fontWeight: 600,
    cursor: "pointer", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center",
  };
  const label: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "var(--text-muted)" };

  return (
    <div style={{ ...CARD, padding: "12px var(--card-px) 14px", fontFamily: "Arial, sans-serif" }}>
      <p style={{ margin: "0 0 10px", color: "var(--text-soft)", fontSize: 13, lineHeight: 1.5 }}>{t.reminderHint}</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <label style={{ ...label, flex: 1, minWidth: 0 }}>
          {t.reminderPrayer}
          <select
            value={prayer}
            onChange={(e) => {
              const p = e.target.value as ReminderPrayer;
              setPrayer(p);
              setTime(DEFAULT_TIME[p]);
            }}
            style={{ ...field, minWidth: 0 }}
          >
            {REMINDER_PRAYERS.map((p) => <option key={p} value={p}>{t.reminderTitle[p]}</option>)}
          </select>
        </label>
        <label style={label}>
          {t.reminderTime}
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ ...field, width: 108 }} />
        </label>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={downloadIcs} style={button}>{t.reminderIcs}</button>
        <a href={reminderGoogleUrl(reminder())} target="_blank" rel="noopener noreferrer" style={button}>{t.reminderGoogle}</a>
      </div>
    </div>
  );
}
