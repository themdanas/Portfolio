import { Project } from "@/data/projects";
import BackLink from "@/components/ui/BackLink";
import ExternalLink from "@/components/ui/ExternalLink";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const isActive = project.status?.toLowerCase() === "building";

  return (
    <header className="mb-12 sm:mb-14">
      <BackLink href="/projects">Work</BackLink>

      <h1 className="m-0 text-[clamp(2rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--ink)]">
        {project.title}
      </h1>

      <p className="mt-4 mb-0 max-w-[36rem] text-[1.1875rem] leading-[1.5] text-[var(--ink-2)]">
        {project.summary}
      </p>

      <dl className="spec mt-10">
        {project.status && (
          <div>
            <dt>Status</dt>
            <dd className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${isActive ? "bg-[var(--accent)]" : "bg-[var(--rule-strong)]"}`}
              />
              {project.status}
            </dd>
          </div>
        )}
        <div>
          <dt>Stack</dt>
          <dd>{project.technologies.join(", ")}</dd>
        </div>
        <div>
          <dt>Links</dt>
          <dd className="flex flex-wrap gap-x-5 gap-y-1">
            <ExternalLink href={project.githubUrl}>Source on GitHub</ExternalLink>
            {project.demoUrl && <ExternalLink href={project.demoUrl}>Live demo</ExternalLink>}
          </dd>
        </div>
      </dl>
    </header>
  );
}
