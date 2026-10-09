import { useSyncExternalStore } from "react";

// Shared light/dark theme. The hero's sun cloud and the nav button both use it,
// and it keeps setting <html data-theme> so the rest of the site's CSS vars still work.
const listeners = new Set();
let theme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", theme);

export function setTheme(next) {
  theme = next;
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  listeners.forEach((l) => l());
}

export function toggleTheme() {
  setTheme(theme === "dark" ? "light" : "dark");
}

export function useTheme() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => theme
  );
}
