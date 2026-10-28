import { notFound } from "next/navigation";
import { marked } from "marked";
import BackLink from "@/components/ui/BackLink";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { formatDate } from "@/lib/format";

interface NotePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return { title: "Note Not Found" };

  return {
    title: `${note.title} — MD Anas`,
    description: note.description,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const htmlContent = await marked.parse(note.content);
  const meta = [note.category, note.date && formatDate(note.date), note.readTime].filter(Boolean);

  return (
    <article>
      <header className="mb-12 sm:mb-14">
        <BackLink href="/notes">Notes</BackLink>

        <h1 className="m-0 text-[clamp(2rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--ink)]">
          {note.title}
        </h1>

        {note.description && (
          <p className="mt-4 mb-0 max-w-[36rem] text-[1.1875rem] leading-[1.5] text-[var(--ink-2)]">
            {note.description}
          </p>
        )}

        {meta.length > 0 && <p className="meta mt-5 mb-0">{meta.join("  ·  ")}</p>}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </article>
  );
}
