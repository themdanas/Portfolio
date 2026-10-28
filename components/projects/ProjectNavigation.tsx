import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectNavigationProps {
  prevProject?: Project;
  nextProject?: Project;
}

export default function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  if (!prevProject && !nextProject) return null;

  return (
    <nav
      aria-label="More projects"
      className="mt-20 grid grid-cols-2 gap-6 border-t border-[var(--rule)] pt-6"
    >
      {prevProject ? (
        <Link href={`/projects/${prevProject.slug}`} className="group min-w-0 no-underline">
          <span className="meta block mb-1">← Previous</span>
          <span className="block text-[1rem] font-medium text-[var(--ink-2)] transition-colors duration-150 group-hover:text-[var(--ink)]">
            {prevProject.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextProject && (
        <Link href={`/projects/${nextProject.slug}`} className="group min-w-0 text-right no-underline">
          <span className="meta block mb-1">Next →</span>
          <span className="block text-[1rem] font-medium text-[var(--ink-2)] transition-colors duration-150 group-hover:text-[var(--ink)]">
            {nextProject.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
