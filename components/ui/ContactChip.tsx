import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight } from "lucide-react";

interface ContactChipProps {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export default function ContactChip({ href, label, icon: Icon }: ContactChipProps) {
  const isMail = href.startsWith("mailto:");
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="chip group"
    >
      <Icon className="chip-icon size-4" />
      <span>{label}</span>
      {!isMail && (
        <ArrowUpRight size={12} strokeWidth={2} className="chip-arrow" aria-hidden="true" />
      )}
    </a>
  );
}
