import React from "react";
import ReactDOM from "react-dom/client";
import Rosary from "./Rosary";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Rosary />
  </React.StrictMode>
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    const base = import.meta.env.BASE_URL;
    navigator.serviceWorker.register(base + "sw.js", { scope: base }).catch(() => {});
  });
}
