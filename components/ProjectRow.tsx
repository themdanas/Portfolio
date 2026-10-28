import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectRowProps {
  project: Project;
}

export default function ProjectRow({ project }: ProjectRowProps) {
  const category = project.metadata[0];
  const isActive = project.status?.toLowerCase() === "building";

  return (
    <Link href={`/projects/${project.slug}`} className="row sm:grid-cols-[1fr_auto]">
      <div className="min-w-0">
        <h3 className="m-0 text-[1rem] font-medium text-[var(--ink)]">
          {project.title}
          <ArrowRight size={14} strokeWidth={1.75} className="row-arrow ml-1.5 inline-block align-[-2px]" aria-hidden="true" />
        </h3>
        <p className="mt-1 mb-0 line-clamp-2 text-[0.9375rem] leading-[1.55] text-[var(--ink-2)]">
          {project.description}
        </p>
      </div>

      <div className="meta flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1 sm:pt-0.5 whitespace-nowrap">
        {category && <span>{category}</span>}
        {/* Only in-progress work gets a status; finished status lives on the detail page */}
        {isActive && (
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[var(--accent)]" />
            {project.status}
          </span>
        )}
      </div>
    </Link>
  );
}
