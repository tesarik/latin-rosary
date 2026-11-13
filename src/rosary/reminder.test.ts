import { describe, it, expect } from "vitest";
import { DEFAULT_TIME, REMINDER_PRAYERS, reminderGoogleUrl, reminderIcs, reminderUrl, type Reminder } from "./reminder";

const day = new Date(2026, 10, 14, 9, 30);
const r: Reminder = {
  prayer: "angelus",
  time: "12:00",
  title: "Anděl Páně",
  description: "Otevřít v aplikaci Rosarium, tedy; čárka, a středník:",
  url: reminderUrl("https://rosarium.lat/", "angelus"),
};

describe("the calendar reminder", () => {
  it("links to the prayer", () => {
    expect(r.url).toBe("https://rosarium.lat/#pray=angelus");
  });

  it("is a daily event at the local hour, with an alarm", () => {
    const ics = reminderIcs(r, day);
    const unfolded = ics.replace(/\r\n /g, "");
    expect(unfolded).toContain("DTSTART:20261114T120000\r\n");
    expect(unfolded).toContain("RRULE:FREQ=DAILY\r\n");
    expect(unfolded).toContain("DURATION:PT5M\r\n");
    expect(unfolded).toContain("SUMMARY:Anděl Páně\r\n");
    expect(unfolded).toContain("URL:https://rosarium.lat/#pray=angelus\r\n");
    expect(unfolded).toContain("TRIGGER:PT0M");
    // Text escaped as iCalendar wants it.
    expect(unfolded).toContain("Rosarium\\, tedy\\; čárka\\, a středník:");
    // Every line ends in CRLF and none is longer than 75 bytes.
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
    for (const line of ics.split("\r\n")) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
  });

  it("makes the same event as a Google Calendar link", () => {
    const url = new URL(reminderGoogleUrl({ ...r, prayer: "rosarium", time: "20:15" }, day));
    expect(url.origin).toBe("https://calendar.google.com");
    expect(url.searchParams.get("dates")).toBe("20261114T201500/20261114T203500");
    expect(url.searchParams.get("recur")).toBe("RRULE:FREQ=DAILY");
    expect(url.searchParams.get("details")).toContain("#pray=angelus");
  });

  it("has a usual hour for every prayer", () => {
    for (const p of REMINDER_PRAYERS) expect(DEFAULT_TIME[p]).toMatch(/^\d\d:\d\d$/);
  });
});
