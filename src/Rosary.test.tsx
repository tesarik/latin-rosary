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

describe("the prayer language switch", () => {
  it("shows the Latin with the translation under it, and remembers it", async () => {
    localStorage.setItem("ruzenec_hint_seen", "1");
    location.hash = "#pray=salve_regina";
    render(<Rosary />);
    expect(screen.getByRole("radio", { name: t.prayerLanguageLatin }).getAttribute("aria-checked")).toBe("true");
    expect(screen.queryByText(/Hail, holy Queen/i)).toBeNull();
    fireEvent.click(screen.getByRole("radio", { name: t.prayerLanguageBoth }));
    // The translation table arrives as its own chunk.
    expect(await screen.findByText(/Hail, holy Queen/i)).toBeTruthy();
    expect(screen.getByText(/Salve Regína, Mater/)).toBeTruthy();
    expect(localStorage.getItem("ruzenec_prayer_language")).toBe("both");
    fireEvent.click(screen.getByRole("radio", { name: t.prayerLanguageTranslation }));
    expect(screen.queryByText(/Salve Regína, Mater/)).toBeNull();
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
    expect(screen.getByText("Mysteria Dolorosa")).toBeTruthy();
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
    expect(screen.getByText(/Mysteria Dolorosa · I\./)).toBeTruthy();
    // Now the sorrowful ring is the big one: its Paters jump, and the glorious set is small.
    expect(screen.getByRole("button", { name: t.jumpToDecade(7) })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: t.jumpToDecade(11) }));
    expect(screen.getByText(/Mysteria Gloriosa · I\./)).toBeTruthy();
  });
});
