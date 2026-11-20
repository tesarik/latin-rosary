// @vitest-environment jsdom
// Component tests: the start screen and the prayer screen rendered in jsdom,
// driven as a user would — what a first launch shows and how the one-time
// hints come and go. The pure logic behind them has its own tests.
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import Rosary from "./Rosary";
import { STRINGS } from "./rosary/i18n";
import { HINT_JUMP_FROM, HINT_KEEP_FROM } from "./rosary/prefs";

const t = STRINGS.en;

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("ruzenec_locale", "en");
  // jsdom lays nothing out and lacks scrolling. Keys go to document.body, as
  // a browser sends them with nothing focused.
  Element.prototype.scrollTo = () => {};
  window.scrollTo = () => {};
});
afterEach(cleanup);

const step = () => fireEvent.keyDown(document.body, { key: "ArrowRight" });
const stepTo = (n: number) => { for (let i = 0; i < n; i++) step(); };
const hint = () => screen.queryByRole("note");
const openTodaysRosary = () =>
  fireEvent.click(screen.getAllByRole("button", { name: new RegExp(`, ${t.todayBadge}$`) })[0]!);

describe("the welcome card", () => {
  it("greets a newcomer and goes once closed, for good", () => {
    render(<Rosary />);
    const card = screen.getByRole("heading", { name: t.welcomeTitle }).closest("section")!;
    expect(within(card).getAllByRole("listitem")).toHaveLength(t.welcomePoints.length);
    fireEvent.click(within(card).getByRole("button", { name: t.welcomeDismiss }));
    expect(screen.queryByRole("heading", { name: t.welcomeTitle })).toBeNull();
    cleanup();
    render(<Rosary />);
    expect(screen.queryByRole("heading", { name: t.welcomeTitle })).toBeNull();
  });

  it("goes once a prayer is opened", () => {
    render(<Rosary />);
    openTodaysRosary();
    fireEvent.click(screen.getByRole("button", { name: t.exitToMenuAria }));
    expect(screen.queryByRole("heading", { name: t.welcomeTitle })).toBeNull();
  });

  it("is never shown to someone who has prayed before", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    render(<Rosary />);
    expect(screen.queryByRole("heading", { name: t.welcomeTitle })).toBeNull();
  });
});

describe("the prayer screen's hints", () => {
  it("come one at a time: stepping, then jumping, then keeping the place", () => {
    render(<Rosary />);
    openTodaysRosary();
    expect(hint()).toHaveProperty("textContent", expect.stringContaining(t.hintText));

    step();
    expect(hint()).toBeNull();

    stepTo(HINT_JUMP_FROM - 1);
    expect(hint()!.textContent).toContain(t.hintJumpRosary);
    fireEvent.click(within(hint()!).getByRole("button", { name: t.hintDismiss }));
    expect(hint()).toBeNull();

    stepTo(HINT_KEEP_FROM - HINT_JUMP_FROM);
    expect(hint()!.textContent).toContain(t.hintKeep);

    // Leaving keeps the place, which is what the hint said: it is done.
    fireEvent.click(screen.getByRole("button", { name: t.exitToMenuAria }));
    expect(JSON.parse(localStorage.getItem("ruzenec_state")!).progress).not.toEqual({});
    expect(localStorage.getItem("ruzenec_hint_keep_seen")).toBe("1");
  });

  it("are not shown again once seen", () => {
    for (const k of ["hint_seen", "hint_jump_seen", "hint_keep_seen"]) localStorage.setItem(`ruzenec_${k}`, "1");
    render(<Rosary />);
    openTodaysRosary();
    for (let i = 0; i < 12; i++) { expect(hint()).toBeNull(); step(); }
  });

  it("explain the jump in the words of a set without a ring", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=loreto";
    render(<Rosary />);
    stepTo(HINT_JUMP_FROM);
    expect(hint()!.textContent).toContain(t.hintJumpSections);
  });
});

describe("the Mine tab", () => {
  it("explains the star while there are no favourites", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    render(<Rosary />);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(t.tabMine) }));
    expect(screen.getByText(t.favoritesEmpty)).toBeTruthy();
  });
});

describe("the Settings tab", () => {
  it("holds the prayer screen's settings, the same as the ⋯ in a prayer", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    render(<Rosary />);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(t.settingsHeading) }));
    const sw = screen.getByRole("switch", { name: t.settingsDim });
    expect(sw.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(sw);
    expect(screen.getByRole("switch", { name: t.settingsDim }).getAttribute("aria-checked")).toBe("true");
    expect(localStorage.getItem("ruzenec_dim")).toBe("1");
    // The text size and the rosary's fruit and verse stay in a prayer's ⋯.
    expect(screen.queryByRole("group", { name: t.textSizeAria })).toBeNull();
    expect(screen.queryByRole("switch", { name: t.settingsMeditation })).toBeNull();
    expect(screen.getByText(t.backupHeading)).toBeTruthy();
  });

  it("sets the app's text size in three steps, remembered", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    render(<Rosary />);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(t.settingsHeading) }));
    fireEvent.click(screen.getByRole("radio", { name: t.uiScaleNames[2] }));
    expect(document.documentElement.style.getPropertyValue("--ui-k")).toBe("1.25");
    expect(localStorage.getItem("ruzenec_ui_scale")).toBe("2");
    fireEvent.click(screen.getByRole("radio", { name: t.uiScaleNames[0] }));
    expect(document.documentElement.style.getPropertyValue("--ui-k")).toBe("1");
    expect(localStorage.getItem("ruzenec_ui_scale")).toBeNull();
  });
});

describe("the prayer language switch", () => {
  it("picks the Latin or the translation, and the ⋯ settings put the translation under the Latin", async () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=salve_regina";
    render(<Rosary />);
    const latin = () => screen.getByRole("radio", { name: t.prayerLanguageLatin });
    const translation = () => screen.getByRole("radio", { name: t.prayerLanguageTranslation });
    expect(latin().getAttribute("aria-checked")).toBe("true");
    expect(screen.queryByText(/Hail, holy Queen/i)).toBeNull();
    fireEvent.click(translation());
    // The translation table arrives as its own chunk.
    expect(await screen.findByText(/Hail, holy Queen/i)).toBeTruthy();
    expect(screen.queryByText(/Salve Regína, Mater/)).toBeNull();
    expect(localStorage.getItem("ruzenec_prayer_language")).toBe("translation");
    fireEvent.click(latin());
    expect(screen.queryByText(/Hail, holy Queen/i)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: t.settingsAria }));
    fireEvent.click(screen.getByRole("switch", { name: t.settingsInterlinear }));
    expect(screen.getByText(/Hail, holy Queen/i)).toBeTruthy();
    expect(screen.getByText(/Salve Regína, Mater/)).toBeTruthy();
    expect(localStorage.getItem("ruzenec_interlinear")).toBe("1");
  });

  it("pairs the Pater Noster phrase by phrase under the Latin, and hides the break points otherwise", async () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=pater_noster";
    render(<Rosary />);
    const card = () => document.querySelector('[aria-live="polite"]')!;
    expect(card().textContent).toContain("Pater noster, qui es in cælis, sanctificétur");
    expect(card().textContent).not.toContain("{/}");
    fireEvent.click(screen.getByRole("button", { name: t.settingsAria }));
    fireEvent.click(screen.getByRole("switch", { name: t.settingsInterlinear }));
    expect(await screen.findByText("hallowed be thy name.")).toBeTruthy();
    expect(screen.getByText("sanctificétur nomen tuum.")).toBeTruthy();
    fireEvent.click(screen.getByRole("radio", { name: t.prayerLanguageTranslation }));
    expect(card().textContent).toContain("Our Father, who art in heaven, hallowed");
    expect(card().textContent).not.toContain("{/}");
  });

  it("reads the old three-way switch's middle position as the translation under the Latin", async () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    localStorage.setItem("ruzenec_prayer_language", "both");
    location.hash = "#pray=salve_regina";
    render(<Rosary />);
    expect(screen.getByRole("radio", { name: t.prayerLanguageLatin }).getAttribute("aria-checked")).toBe("true");
    expect(await screen.findByText(/Hail, holy Queen/i)).toBeTruthy();
    expect(screen.getByText(/Salve Regína, Mater/)).toBeTruthy();
  });
});

describe("the fruit and verse at each decade", () => {
  it("are off by default and shown at a decade's Pater Noster once switched on", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=radostny";
    render(<Rosary />);
    stepTo(7); // the first decade's Pater Noster
    expect(screen.queryByText(/Fructus mystérii/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: t.settingsAria }));
    fireEvent.click(screen.getByRole("switch", { name: t.settingsMeditation }));
    expect(screen.getByText(/Fructus mystérii/)).toBeTruthy();
    expect(screen.getByText(/Ecce ancílla Dómini/)).toBeTruthy();
    step();
    expect(screen.queryByText(/Fructus mystérii/)).toBeNull();
  });
});

describe("after a rosary", () => {
  it("offers what is prayed after it, until a prayer is opened", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=radostny";
    render(<Rosary />);
    stepTo(73);
    fireEvent.click(screen.getByRole("button", { name: t.finishAria }));
    // The open tab outlives the menu (another test left Mine open).
    fireEvent.click(screen.getByRole("button", { name: new RegExp(t.tabRosary) }));
    const card = screen.getByRole("heading", { name: "Deo grátias" }).closest("section")!;
    expect(within(card).getByRole("button", { name: /Loreto/ })).toBeTruthy();
    fireEvent.click(within(card).getByRole("button", { name: /Loreto/ }));
    fireEvent.click(screen.getByRole("button", { name: t.exitToMenuAria }));
    expect(screen.queryByRole("heading", { name: "Deo grátias" })).toBeNull();
  });

  it("opens the last unfinished prayer from the icon's shortcut", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    localStorage.setItem("ruzenec_state", JSON.stringify({ version: 6, active: null, progress: { loreto: 2, bolestny: 30 } }));
    location.hash = "#pray=continue";
    render(<Rosary />);
    expect(screen.getByRole("button", { name: t.exitToMenuAria })).toBeTruthy();
    expect(screen.getByText("Mystéria Dolorósa")).toBeTruthy();
  });
});

describe("the chaplet's optional prayers", () => {
  it("are switched on the chaplet's first step, remembered, and the switch goes once begun", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=corona";
    render(<Rosary />);
    const sw = screen.getByRole("switch", { name: t.optionalPrayers });
    expect(sw.getAttribute("aria-checked")).toBe("false");
    expect(screen.queryByText("Expirásti, Iesu")).toBeNull();

    fireEvent.click(sw);
    expect(screen.getByRole("switch", { name: t.optionalPrayers }).getAttribute("aria-checked")).toBe("true");
    // Next leads to the optional opening prayer.
    expect(screen.getByText("Expirásti, Iesu")).toBeTruthy();
    expect(localStorage.getItem("ruzenec_chaplet_full")).toBe("1");

    step();
    expect(screen.queryByRole("switch", { name: t.optionalPrayers })).toBeNull();
  });
});

describe("the rosary's optional opening prayers", () => {
  it("are switched on the rosary's first step, and every kept rosary place moves with them", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    localStorage.setItem("ruzenec_state", JSON.stringify({ version: 6, active: null, progress: { bolestny: 30, loreto: 2 } }));
    location.hash = "#pray=radostny";
    render(<Rosary />);
    const sw = screen.getByRole("switch", { name: t.optionalPrayers });
    expect(sw.getAttribute("aria-checked")).toBe("false");
    expect(screen.getByText("Credo")).toBeTruthy();

    fireEvent.click(sw);
    expect(screen.getByText("Dómine, lábia mea")).toBeTruthy();
    expect(localStorage.getItem("ruzenec_rosary_full")).toBe("1");
    expect(JSON.parse(localStorage.getItem("ruzenec_state")!).progress).toEqual({ bolestny: 32, loreto: 2 });

    fireEvent.click(screen.getByRole("switch", { name: t.optionalPrayers }));
    expect(JSON.parse(localStorage.getItem("ruzenec_state")!).progress).toEqual({ bolestny: 30, loreto: 2 });
  });
});

describe("St. Bridget's optional prayers", () => {
  it("are off by default, leaving the Paters and Aves; switched on, the prayers are whole and still starrable", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=brigit";
    render(<Rosary />);
    expect(screen.getByText(t.stepCount(1, 14))).toBeTruthy();
    expect(screen.getByRole("button", { name: t.favoriteAdd })).toBeTruthy();

    fireEvent.click(screen.getByRole("switch", { name: t.optionalPrayers }));
    expect(screen.getByText(t.stepCount(1, 22))).toBeTruthy();
    expect(localStorage.getItem("ruzenec_brigit_full")).toBe("1");
  });
});

describe("the ⓘ beside the optional prayers' switch", () => {
  it("tells what the optional prayers are and where they come from", async () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=corona";
    render(<Rosary />);
    fireEvent.click(screen.getByRole("button", { name: t.optionalPrayersInfo }));
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog.textContent).toContain("Diary");
    fireEvent.click(within(dialog).getByRole("button", { name: t.aboutClose }));
  });
});

describe("the ⓘ beside a prayer's name", () => {
  it("tells where a less familiar prayer comes from, and is not there for the rosary", async () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=via_crucis";
    render(<Rosary />);
    fireEvent.click(screen.getByRole("button", { name: t.prayerNoteAria }));
    expect((await screen.findByRole("alertdialog")).textContent).toContain("Raccolta");
    cleanup();
    location.hash = "#pray=radostny";
    render(<Rosary />);
    expect(screen.queryByRole("button", { name: t.prayerNoteAria })).toBeNull();
  });
});

describe("the Marian Psalter's rings", () => {
  it("shows the set being prayed, the others as small rings that jump to their start", () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=psalterium";
    render(<Rosary />);
    // The joyful set's ring, and the other two sets' small rings.
    expect(screen.getByRole("button", { name: t.jumpToDecade(1) })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: t.jumpToDecade(6) }));
    expect(screen.getByText(/Mystéria Dolorósa · I\./)).toBeTruthy();
    // Now the sorrowful ring is the big one: its Paters jump, and the glorious set is small.
    expect(screen.getByRole("button", { name: t.jumpToDecade(7) })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: t.jumpToDecade(11) }));
    expect(screen.getByText(/Mystéria Gloriósa · I\./)).toBeTruthy();
  });
});
