import Link from "next/link";
import { NoteMeta } from "@/lib/notes";
import { formatDate } from "@/lib/format";

interface NoteRowProps {
  note: NoteMeta;
}

export default function NoteRow({ note }: NoteRowProps) {
  const byline = [note.category, note.readTime].filter(Boolean).join(" · ");

  return (
    <Link href={`/notes/${note.slug}`} className="ledger-row">
      {note.date ? (
        <time dateTime={note.date} className="ledger-date meta sm:pt-[0.2rem]">
          {formatDate(note.date)}
        </time>
      ) : (
        <span aria-hidden="true" />
      )}

      <div className="min-w-0">
        <h3 className="m-0 text-[1.0625rem] font-medium tracking-[-0.01em] text-[var(--ink)]">
          <span className="ledger-title">{note.title}</span>
        </h3>
        {note.description && (
          <p className="mt-1 mb-0 line-clamp-2 text-[0.9375rem] leading-[1.55] text-[var(--ink-2)]">
            {note.description}
          </p>
        )}
        {byline && <div className="meta mt-2">{byline}</div>}
      </div>
    </Link>
  );
}
