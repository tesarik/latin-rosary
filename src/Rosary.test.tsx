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
