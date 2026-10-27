"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function subscribe() {
  return () => {};
}

export default function ThemeToggle() {
  const isMounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const toggleTheme = () => {
    const currentTheme = (document.documentElement.getAttribute("data-theme") as "dark" | "light") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  if (!isMounted) {
    return (
      <button
        type="button"
        className="text-[var(--text-muted)] p-1"
        aria-label="Toggle theme"
      >
        <Sun size={15} />
      </button>
    );
  }

  const activeTheme = (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme")) || theme;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 flex items-center justify-center cursor-pointer"
      aria-label={activeTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={activeTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {activeTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
