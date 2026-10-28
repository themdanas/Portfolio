import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ogCard } from "@/lib/ogTemplate";

export const alt = `Project by ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return ogCard({
    eyebrow: project?.metadata.slice(0, 3).join("  ·  ") ?? "Project",
    title: project?.title ?? siteConfig.name,
    description: project?.description,
  });
}
