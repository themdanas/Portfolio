import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/data/site";

export default function Header() {
  return (
    <header className="wrap pt-6 sm:pt-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap font-medium tracking-[-0.01em] text-[var(--ink)] no-underline"
        >
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-3 min-[360px]:gap-3.5 sm:gap-6 text-[0.9375rem]" aria-label="Main">
          <NavLink href="/projects">Work</NavLink>
          <NavLink href="/notes">Notes</NavLink>
          <NavLink href="/about" className="max-sm:hidden">
            About
          </NavLink>
          <NavLink href="/contact" className="max-sm:hidden">
            Contact
          </NavLink>
          <ThemeToggle />
          <span aria-hidden="true" className="h-4 w-px bg-[var(--rule-strong)]" />
          <a
            href={siteConfig.socials.resume}
            target="_blank"
            className="link-quiet inline-flex items-center gap-0.5 py-1"
          >
            Resume
            <ArrowUpRight size={13} strokeWidth={1.75} className="link-arrow opacity-60 max-[359px]:hidden" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
