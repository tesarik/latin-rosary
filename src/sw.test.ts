import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// public/sw.js run against a stand-in for the service-worker globals: its
// fetch handler, for the opening of the app (a navigation).
const SOURCE = Object.values(import.meta.glob<string>("../public/sw.js", { query: "?raw", import: "default", eager: true }))[0]!;
const SCOPE = "https://rosarium.lat/";

type Store = Map<string, Response>;
const keyOf = (r: string | { url: string }) => new URL(typeof r === "string" ? r : r.url, SCOPE).pathname;

function load(net: () => Promise<Response>, kept: Record<string, string> = {}) {
  const store: Store = new Map(Object.entries(kept).map(([k, v]) => [k, new Response(v)]));
  const listeners: Record<string, (e: unknown) => void> = {};
  const self = {
    addEventListener: (type: string, fn: (e: unknown) => void) => { listeners[type] = fn; },
    registration: { scope: SCOPE },
  };
  const caches = {
    match: async (r: string | { url: string }) => store.get(keyOf(r))?.clone(),
    open: async () => ({ put: async (r: { url: string }, res: Response) => { store.set(keyOf(r), res); } }),
    keys: async () => [],
  };
  new Function("self", "caches", "fetch", SOURCE)(self, caches, net);
  const open = (): Promise<Response> => {
    let answer: Promise<Response> | undefined;
    listeners.fetch!({ request: { method: "GET", mode: "navigate", url: SCOPE }, respondWith: (p: Promise<Response>) => { answer = p; } });
    return answer!;
  };
  return { open, store };
}

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

describe("opening the app (the service worker)", () => {
  it("takes the network's page when it answers in time, and keeps it", async () => {
    const { open, store } = load(async () => new Response("new"), { "/": "old" });
    const res = await open();
    expect(await res.text()).toBe("new");
    await vi.runAllTimersAsync();
    expect(await store.get("/")!.text()).toBe("new");
  });

  it("shows the kept page when the network hangs, and drops the late answer", async () => {
    let answer!: (r: Response) => void;
    const { open, store } = load(() => new Promise((r) => { answer = r; }), { "/": "old" });
    const res = open();
    await vi.advanceTimersByTimeAsync(3000);
    expect(await (await res).text()).toBe("old");
    answer(new Response("late"));
    await vi.runAllTimersAsync();
    expect(await store.get("/")!.text()).toBe("old");
  });

  it("falls back to the kept index.html offline", async () => {
    const { open } = load(() => Promise.reject(new TypeError("offline")), { "/index.html": "shell" });
    expect(await (await open()).text()).toBe("shell");
  });

  it("answers with a network error, not a crash, offline with nothing kept", async () => {
    const { open } = load(() => Promise.reject(new TypeError("offline")));
    expect((await open()).type).toBe("error");
  });

  it("waits on for the network past the timeout when nothing is kept", async () => {
    let answer!: (r: Response) => void;
    const { open } = load(() => new Promise((r) => { answer = r; }));
    const res = open();
    await vi.advanceTimersByTimeAsync(3000);
    answer(new Response("first"));
    expect(await (await res).text()).toBe("first");
  });
});
