"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className = "" }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`relative py-1 no-underline transition-colors duration-150 ${
        isActive ? "text-[var(--ink)]" : "text-[var(--ink-2)] hover:text-[var(--ink)]"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
