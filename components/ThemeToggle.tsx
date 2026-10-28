"use client";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";

    // Suppress color transitions for the swap so every surface changes on the same frame
    root.setAttribute("data-theme-switching", "");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.removeAttribute("data-theme-switching"));
    });
  };

  // Both icons render; CSS shows the right one from data-theme, so there is no hydration flash
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="pressable -mx-1.5 inline-flex size-8 items-center justify-center rounded-md text-[var(--ink-3)] hover:text-[var(--ink)] cursor-pointer"
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <Sun size={15} strokeWidth={1.75} className="hidden [[data-theme=dark]_&]:block" aria-hidden="true" />
      <Moon size={15} strokeWidth={1.75} className="block [[data-theme=dark]_&]:hidden" aria-hidden="true" />
    </button>
  );
}
