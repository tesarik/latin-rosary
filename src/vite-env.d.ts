/// <reference types="vite/client" />

// Injected at build time from package.json (see vite.config.ts `define`).
declare const __APP_VERSION__: string;

// Injected at build time: the build's timestamp as an ISO 8601 string.
declare const __BUILD_DATE__: string;

// Injected at build time: a fingerprint of the icons and pictures in public/,
// appended to their URLs as ?v=… so a changed picture is never served stale.
declare const __ICON_VERSION__: string;
