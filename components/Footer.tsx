import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="mt-9 pt-3.5 pb-6 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
      <div className="wrap">
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <span>© {currentYear} {siteConfig.shortName}. All rights reserved.</span>

          <span className="text-[var(--text-muted)] hidden md:inline">
            Python · PyTorch · Transformers · LangGraph · PostgreSQL · Docker
          </span>

          <div className="flex items-center gap-3">
            <Link href="/about" className="text-[var(--accent)] hover:underline no-underline">
              About
            </Link>
            <span className="text-[var(--border-subtle)]" aria-hidden="true">/</span>
            <Link href="/contact" className="text-[var(--accent)] hover:underline no-underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
