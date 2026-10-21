import React from "react";
import ReactDOM from "react-dom/client";
import Rosary from "./Rosary";
import ErrorBoundary from "./rosary/ErrorBoundary";
import { initAnalytics } from "./rosary/analytics";
// EB Garamond for the prayer body, bundled with the app (@fontsource) rather
// than fetched from Google Fonts: same-origin files are cached by the service
// worker, so the font works offline, and no visitor's IP goes to a third party.
// Each CSS file declares every subset with its unicode-range, so the browser
// downloads only the ones the page uses (Latin and Latin Extended for Czech).
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/400-italic.css";
import "@fontsource/eb-garamond/500.css";
import "@fontsource/eb-garamond/600.css";
import "./index.css";

// Latin prayers use ǽ (U+01FD), often the only Latin Extended glyph on a
// screen, so that subset would otherwise be fetched only when it first shows
// up (and fall back to a system serif if that fetch fails, e.g. offline).
// Load it up front for every imported face so the service worker caches it.
for (const face of ["400", "italic 400", "500", "600"]) {
  document.fonts.load(`${face} 1em 'EB Garamond'`, "ǽ").catch(() => {});
}

const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Rosary />
    </ErrorBoundary>
  </React.StrictMode>
);

initAnalytics();

// Service worker registration + update detection lives in useServiceWorkerUpdate
// (used by Rosary), so the "update available" prompt can be shown in-app.
