// The cache version is replaced at build time (see vite.config.js). In dev mode
// the SW is not registered, so the literal placeholder never reaches a browser.
const PREFIX = "ruzenec-";
const CACHE = PREFIX + "__SW_VERSION__";

// Deliberately no skipWaiting() here: a new build stays in the "waiting" state
// until the user accepts the in-app "update available" prompt, which posts the
// SKIP_WAITING message below. (On a first-ever install there is no active
// worker, so activation happens immediately anyway.)
self.addEventListener("install", () => {});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // Other apps on the same domain share this cache storage: drop only our own old builds.
      caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k)))
      ),
      self.clients.claim(),
    ])
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  if (req.mode === "navigate") {
    event.respondWith(navigate(req));
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res.ok && (res.type === "basic" || res.type === "cors")) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      });
    })
  );
});

// Opening the app: the network first, so a new build's index.html (which
// registers the new sw.js?v=…, see CLAUDE.md) is seen at once — but for at
// most NAV_TIMEOUT_MS. On a weak signal (a church, a cellar) the request can
// hang for tens of seconds, and the app is kept here anyway: past the timeout
// the kept page is shown. A late answer is dropped, not cached, so the kept
// index.html always belongs to the assets kept with it (it would name another
// build's, not yet fetched, and fail offline). With no kept page, it waits on.
const NAV_TIMEOUT_MS = 3000;

async function keptPage(req) {
  const base = new URL(self.registration.scope).pathname;
  return (await caches.match(req)) || (await caches.match(base + "index.html")) || (await caches.match(base));
}

async function navigate(req) {
  const network = fetch(req);
  network.catch(() => {});
  let timer;
  const timeout = new Promise((resolve) => { timer = setTimeout(() => resolve(null), NAV_TIMEOUT_MS); });
  try {
    const res = await Promise.race([network, timeout]);
    if (res) {
      clearTimeout(timer);
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    }
    const kept = await keptPage(req);
    if (kept) return kept;
    const late = await network;
    if (late.ok) {
      const copy = late.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
    }
    return late;
  } catch {
    clearTimeout(timer);
    return (await keptPage(req)) || Response.error();
  }
}
