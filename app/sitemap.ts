import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/data/projects";
import { getAllNotes } from "@/lib/notes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/notes"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: absoluteUrl(`/projects/${slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const noteRoutes: MetadataRoute.Sitemap = getAllNotes().map((note) => ({
    url: absoluteUrl(`/notes/${note.slug}`),
    lastModified: note.date ? new Date(note.date) : undefined,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}
