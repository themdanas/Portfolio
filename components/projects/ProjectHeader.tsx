import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href="/projects"
        className="text-[12px] text-[var(--accent)] hover:underline inline-flex items-center gap-1 mb-4 no-underline"
      >
        ← Back to projects
      </Link>

      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1.5">
        <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.03em] text-[var(--text-primary)] m-0">
          {project.title}
        </h1>
        {project.status && (
          <span className="text-[11px] text-[var(--text-muted)] font-mono border border-[var(--border-subtle)] px-2 py-0.5 rounded-[4px]">
            {project.status}
          </span>
        )}
      </div>

      <p className="text-[15px] italic text-[var(--text-secondary)] mb-3 leading-[1.5]">
        {project.summary}
      </p>

      {/* Links line */}
      <div className="flex items-center gap-3 text-[13px] mb-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] hover:underline no-underline"
        >
          GitHub ↗
        </a>
        {project.demoUrl && (
          <>
            <span className="text-[var(--text-muted)] select-none">·</span>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:underline no-underline"
            >
              Live Demo ↗
            </a>
          </>
        )}
      </div>

      {/* Compact technology line */}
      <div className="text-[12px] text-[var(--text-muted)] flex flex-wrap gap-x-2 gap-y-1">
        {project.technologies.map((tech, idx) => (
          <span key={tech} className="flex items-center">
            {idx > 0 && <span className="mr-2 text-[var(--text-muted)] select-none">·</span>}
            {tech}
          </span>
        ))}
      </div>

      <div className="h-[1px] bg-[var(--border-subtle)] mt-6" aria-hidden="true"></div>
    </div>
  );
}
