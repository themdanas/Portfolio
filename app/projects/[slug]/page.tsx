import { notFound } from "next/navigation";
import { marked } from "marked";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
import { projects, getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import JsonLd from "@/components/JsonLd";
import { getProjectContent } from "@/lib/projectContent";
import { absoluteUrl, breadcrumbSchema, pageMetadata, personId } from "@/lib/seo";

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
      title: "Project Not Found",
      robots: { index: false },
    };
  }

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: [...project.metadata, ...project.technologies],
    openGraph: { type: "article", authors: [absoluteUrl("/about")], tags: project.metadata },
  });
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

  const url = absoluteUrl(`/projects/${project.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${url}#project`,
        name: project.title,
        description: project.summary,
        url,
        image: `${url}/opengraph-image`,
        codeRepository: project.githubUrl,
        programmingLanguage: project.technologies,
        keywords: project.metadata.join(", "),
        author: { "@id": personId },
        creativeWorkStatus: project.status,
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Work", path: "/projects" },
        { name: project.title, path: `/projects/${project.slug}` },
      ]),
    ],
  };

  return (
    <article>
      <JsonLd data={jsonLd} />

      {/* Project Header */}
      <ProjectHeader project={project} />

      {/* Main Technical Case Study Body */}
      {projectContent ? (
        <div className="prose">
          {renderedSegments.map((seg, idx) =>
            seg.type === "mermaid" ? (
              <MermaidDiagram key={idx} chart={seg.content} />
            ) : (
              <div key={idx} dangerouslySetInnerHTML={{ __html: seg.html }} />
            )
          )}
        </div>
      ) : (
        <div className="prose">
          <p>{project.description}</p>
        </div>
      )}

      {/* Bottom Navigation */}
      <ProjectNavigation
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </article>
  );
}
