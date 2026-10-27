import Link from "next/link";
import { NoteMeta } from "@/lib/notes";

interface NoteCardProps {
  note: NoteMeta;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="note-card">
      <h3 className="text-[14px] font-semibold text-[var(--text-primary)] mb-[3px]">
        <Link href={`/notes/${note.slug}`} className="hover:text-[var(--accent)] transition-colors no-underline">
          {note.title}
        </Link>
      </h3>

      <p className="text-[13px] leading-[1.55] text-[var(--text-secondary)] mb-[5px]">
        {note.description}
      </p>

      {(note.category || note.readTime) && (
        <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
          {note.category && <span>{note.category}</span>}
          {note.category && note.readTime && <span>·</span>}
          {note.readTime && <span>{note.readTime}</span>}
          <span>·</span>
          <span>Article</span>
        </div>
      )}
    </article>
  );
}
