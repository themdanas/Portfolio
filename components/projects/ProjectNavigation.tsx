import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectNavigationProps {
  currentProject: Project;
  prevProject?: Project;
  nextProject?: Project;
}

export default function ProjectNavigation({
  currentProject,
  prevProject,
  nextProject,
}: ProjectNavigationProps) {
  return (
    <div className="mt-12 pt-6 border-t border-[var(--border-subtle)]">
      {/* Primary actions */}
      <div className="flex items-center justify-between gap-4 flex-wrap text-[13px] mb-8">
        <Link
          href="/projects"
          className="text-[var(--accent)] hover:underline no-underline"
        >
          ← Back to projects
        </Link>

        <div className="flex items-center gap-4">
          <a
            href={currentProject.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--accent)] hover:underline no-underline"
          >
            GitHub Repository ↗
          </a>
          {currentProject.demoUrl && (
            <a
              href={currentProject.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:underline no-underline"
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="grid grid-cols-2 gap-4">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="project-card block p-3 text-left no-underline hover:border-[var(--accent)]"
          >
            <span className="text-[11px] text-[var(--text-muted)] block mb-1">← Previous Project</span>
            <span className="text-[14px] font-semibold text-[var(--text-primary)] block truncate">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="project-card block p-3 text-right no-underline hover:border-[var(--accent)] ml-auto w-full"
          >
            <span className="text-[11px] text-[var(--text-muted)] block mb-1">Next Project →</span>
            <span className="text-[14px] font-semibold text-[var(--text-primary)] block truncate">
              {nextProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
