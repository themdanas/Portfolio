import React from "react";

interface ProjectSectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

export default function ProjectSection({ title, children, id }: ProjectSectionProps) {
  return (
    <section className="mb-10" id={id}>
      <h2 className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.025em] text-[var(--text-primary)] mb-3">
        {title}
      </h2>
      <div className="text-[14.5px] leading-[1.65] text-[var(--text-secondary)]">
        {children}
      </div>
    </section>
  );
}
