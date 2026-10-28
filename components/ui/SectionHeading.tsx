import Link from "next/link";

interface SectionHeadingProps {
  id: string;
  children: React.ReactNode;
  href?: string;
  linkLabel?: string;
}

export default function SectionHeading({ id, children, href, linkLabel }: SectionHeadingProps) {
  return (
    <div className="section-head flex items-center gap-4 mb-2">
      <h2 id={id} className="m-0 text-[0.9375rem] font-medium text-[var(--ink)]">
        {children}
      </h2>
      <div className="flex-1 h-px bg-[var(--rule)]" aria-hidden="true" />
      {href && linkLabel && (
        <Link href={href} className="link-quiet text-[0.9375rem] whitespace-nowrap">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
