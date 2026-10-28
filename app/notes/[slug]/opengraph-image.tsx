import { siteConfig } from "@/data/site";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { ogCard } from "@/lib/ogTemplate";

export const alt = `Note by ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  return ogCard({
    eyebrow: note?.category ? `Notes  ·  ${note.category}` : "Notes",
    title: note?.title ?? siteConfig.name,
    description: note?.description,
  });
}
