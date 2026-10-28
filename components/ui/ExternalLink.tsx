import { ArrowUpRight } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  quiet?: boolean;
  className?: string;
}

export default function ExternalLink({ href, children, quiet = false, className = "" }: ExternalLinkProps) {
  const isMail = href.startsWith("mailto:");
  const isLocal = href.startsWith("/");
  const opensNewTab = !isMail;

  return (
    <a
      href={href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab && !isLocal ? "noreferrer" : undefined}
      className={`${quiet ? "link-quiet" : "link"} inline-flex items-center gap-0.5 ${className}`}
    >
      {children}
      <ArrowUpRight size={13} strokeWidth={1.75} className="link-arrow shrink-0 opacity-60" aria-hidden="true" />
    </a>
  );
}
