"use client";

import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card relative cursor-pointer">
      <div className="flex justify-between items-baseline gap-3 mb-[3px]">
        <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] m-0">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-[var(--accent)] transition-colors no-underline after:absolute after:inset-0 after:z-0"
          >
            {project.title}
          </Link>
        </h3>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-[12px] text-[var(--accent)] hover:underline no-underline relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub ↗
        </a>
      </div>

      <p className="text-[13px] leading-[1.55] text-[var(--text-secondary)] mb-[9px] relative z-0">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] text-[var(--text-muted)] relative z-0">
        {project.metadata.map((item, idx) => (
          <span key={item} className="flex items-center">
            {idx > 0 && <span className="mr-2 text-[var(--text-muted)] select-none">·</span>}
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
