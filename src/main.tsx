import React from "react";
import ReactDOM from "react-dom/client";
import Rosary from "./Rosary";
import ErrorBoundary from "./rosary/ErrorBoundary";
import { initAnalytics } from "./rosary/analytics";
import "./index.css";

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
