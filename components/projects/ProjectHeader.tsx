import { Project } from "@/data/projects";
import BackLink from "@/components/ui/BackLink";
import ExternalLink from "@/components/ui/ExternalLink";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
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
