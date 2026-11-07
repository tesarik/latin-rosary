import { useCallback, useEffect, useRef, useState } from "react";

// Registers the service worker (production only) and detects when a newer build
// has installed and is waiting. The new worker no longer calls skipWaiting on
// its own (see public/sw.js) — instead the app shows an "update available"
// prompt and, on accept, posts SKIP_WAITING; when the new worker takes control
// the `controllerchange` handler reloads once so the fresh assets are used.
//
// The browser looks for a new worker only on a navigation, and an installed
// app is mostly resumed rather than reloaded (iOS keeps it in memory for days),
// so we also ask for one whenever the app comes back to the foreground, at
// most every few minutes.
const UPDATE_CHECK_MS = 5 * 60 * 1000;
export function useServiceWorkerUpdate() {
  const [updateReady, setUpdateReady] = useState(false);
  const waiting = useRef<ServiceWorker | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !import.meta.env.PROD) return;

    // Whether a worker already controls this page. On the very first visit there
    // is none, and the initial `clients.claim()` fires `controllerchange` — we
    // must NOT reload in that case (it would be a spurious first-load refresh).
    const hadController = !!navigator.serviceWorker.controller;
    let reloaded = false;
    let registration: ServiceWorkerRegistration | null = null;
    let lastCheck = Date.now();

    const promote = (worker: ServiceWorker | null) => {
      if (!worker) return;
      waiting.current = worker;
      setUpdateReady(true);
    };

    const register = () => {
      const base = import.meta.env.BASE_URL;
      navigator.serviceWorker
        .register(`${base}sw.js?v=${__SW_VERSION__}`, { scope: base, updateViaCache: "none" })
        .then((reg) => {
          registration = reg;
          if (reg.waiting && navigator.serviceWorker.controller) promote(reg.waiting);
          reg.addEventListener("updatefound", () => {
            const nw = reg.installing;
            if (!nw) return;
            nw.addEventListener("statechange", () => {
              // A new worker finished installing while an old one still controls
              // the page → a genuine update is ready to offer.
              if (nw.state === "installed" && navigator.serviceWorker.controller) promote(nw);
            });
          });
        })
        .catch(() => {});
    };

    const checkForUpdate = () => {
      if (document.visibilityState !== "visible" || !registration) return;
      if (Date.now() - lastCheck < UPDATE_CHECK_MS) return;
      lastCheck = Date.now();
      registration.update().catch(() => {});
    };
    document.addEventListener("visibilitychange", checkForUpdate);
    const interval = window.setInterval(checkForUpdate, UPDATE_CHECK_MS);

    const onControllerChange = () => {
      if (reloaded || !hadController) return;
      reloaded = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      window.removeEventListener("load", register);
      document.removeEventListener("visibilitychange", checkForUpdate);
      window.clearInterval(interval);
    };
  }, []);

  const applyUpdate = useCallback(() => {
    waiting.current?.postMessage({ type: "SKIP_WAITING" });
  }, []);

  const dismissUpdate = useCallback(() => setUpdateReady(false), []);

  return { updateReady, applyUpdate, dismissUpdate };
}
