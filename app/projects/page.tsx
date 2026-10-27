import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects — MD Anas",
  description: "AI systems, LLM serving engines, and autonomous agents built by MD Anas.",
};

export default function ProjectsPage() {
  return (
    <div className="wrap pt-6 sm:pt-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-[12px] text-[var(--accent)] hover:underline inline-flex items-center gap-1 mb-4 no-underline"
        >
          ← Back to home
        </Link>
        <h1 className="text-[26px] sm:text-[28px] font-semibold tracking-[-0.03em] text-[var(--text-primary)] mb-2">
          Projects
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)] m-0">
          Open source AI systems, LLM infrastructure engines, and applied machine learning implementations.
        </p>
      </div>

      <div className="grid gap-[9px]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
