import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="link-quiet group inline-flex items-center gap-1.5 text-[0.9375rem] mb-8 sm:mb-10"
    >
      <ArrowLeft
        size={14}
        strokeWidth={1.75}
        className="transition-transform duration-150 ease-out group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
      {children}
    </Link>
  );
}
