import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="wrap pb-10">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[var(--rule)] pt-6 text-[0.875rem] text-[var(--ink-3)]">
        <span>
          © {currentYear} {siteConfig.name}
        </span>

        <nav className="flex items-center gap-5" aria-label="Footer">
          <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors duration-150 no-underline">
            GitHub
          </a>
          <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors duration-150 no-underline">
            LinkedIn
          </a>
          <Link href="/about" className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors duration-150 no-underline">
            About
          </Link>
          <Link href="/contact" className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors duration-150 no-underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
