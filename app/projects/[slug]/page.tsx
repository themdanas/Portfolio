import { notFound } from "next/navigation";
import { marked } from "marked";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
import { projects, getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { getProjectContent } from "@/lib/projectContent";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — MD Anas",
    };
  }

  return {
    title: `${project.title} — MD Anas`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectContent = getProjectContent(project.slug);
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined;

  // Pre-render markdown segments asynchronously
  const renderedSegments = projectContent
    ? await Promise.all(
        projectContent.segments.map(async (seg) => {
          if (seg.type === "mermaid") {
            return { type: "mermaid" as const, content: seg.content };
          }
          const html = await marked.parse(seg.content);
          return { type: "html" as const, html };
        })
      )
    : [];

  return (
    <article className="wrap pt-6 sm:pt-8 pb-12">
      {/* Project Header */}
      <ProjectHeader project={project} />

      {/* Main Technical Case Study Body */}
      {projectContent ? (
        <div className="markdown-body">
          {renderedSegments.map((seg, idx) =>
            seg.type === "mermaid" ? (
              <MermaidDiagram key={idx} chart={seg.content} />
            ) : (
              <div key={idx} dangerouslySetInnerHTML={{ __html: seg.html }} />
            )
          )}
        </div>
      ) : (
        <div className="text-[14px] text-[var(--text-secondary)]">
          <p>{project.description}</p>
        </div>
      )}

      {/* Bottom Navigation */}
      <ProjectNavigation
        currentProject={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </article>
  );
}
