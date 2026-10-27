import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/data/site";

export default function Header() {
  return (
    <header className="py-4">
      <div className="wrap">
        <div className="flex items-center justify-between gap-5">
          {/* Left: Brand + Theme Toggle immediately beside it */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              style={{ fontFamily: "var(--font-name)" }}
              className="font-name font-semibold text-[20px] tracking-tight text-[var(--text-primary)] hover:opacity-90 no-underline"
              aria-label="MD Anas Home"
            >
              {siteConfig.shortName}
            </Link>
            <ThemeToggle />
          </div>

          {/* Right: Navigation links + Resume */}
          <nav className="flex items-center gap-4 sm:gap-5 text-[13px]" aria-label="Main navigation">
            <Link
              href="/#projects"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
            >
              Projects
            </Link>
            <Link
              href="/#notes"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
            >
              Notes
            </Link>
            <Link
              href="/about"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline"
            >
              Contact
            </Link>
            <span className="text-[var(--border-subtle)] select-none" aria-hidden="true">|</span>
            <a
              href={siteConfig.socials.resume}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:underline no-underline"
            >
              Resume ↗
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
