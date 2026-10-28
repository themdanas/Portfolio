import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectPlateProps {
  project: Project;
}

export default function ProjectPlate({ project }: ProjectPlateProps) {
  const tags = project.metadata.slice(0, 3).join(" · ");

  return (
    <Link href={`/projects/${project.slug}`} className="plate">
      <h3 className="m-0 text-[1.0625rem] font-medium tracking-[-0.01em] text-[var(--ink)]">
        {project.title}
      </h3>

      <p className="mt-1.5 mb-0 line-clamp-2 text-[0.9375rem] leading-[1.55] text-[var(--ink-2)]">
        {project.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="meta min-w-0 truncate">{tags}</span>
        <ArrowUpRight size={15} strokeWidth={1.75} className="plate-arrow shrink-0" aria-hidden="true" />
      </div>
    </Link>
  );
}
