import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";

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

  return (
    <article className="wrap pt-6 sm:pt-8 pb-12">
      <div className="mb-6">
        <Link
          href="/notes"
          className="text-[12px] text-[var(--accent)] hover:underline inline-flex items-center gap-1 mb-4 no-underline"
        >
          ← Back to all notes
        </Link>

        <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em] text-[var(--text-primary)] mb-2 leading-[1.3]">
          {note.title}
        </h1>

        <div className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
          {note.category && <span>{note.category}</span>}
          {note.category && note.readTime && <span>·</span>}
          {note.readTime && <span>{note.readTime}</span>}
          {note.date && <span>·</span>}
          {note.date && <span>{note.date}</span>}
        </div>
      </div>

      <div className="h-[1px] bg-[var(--border-subtle)] my-6" aria-hidden="true"></div>

      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
