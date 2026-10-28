import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NoteMeta } from "@/lib/notes";
import { formatDate } from "@/lib/format";

interface NoteRowProps {
  note: NoteMeta;
}

export default function NoteRow({ note }: NoteRowProps) {
  return (
    <Link href={`/notes/${note.slug}`} className="row sm:grid-cols-[1fr_auto] sm:items-baseline">
      <div className="min-w-0">
        <h3 className="m-0 text-[1rem] font-medium text-[var(--ink)]">
          {note.title}
          <ArrowRight size={14} strokeWidth={1.75} className="row-arrow ml-1.5 inline-block align-[-2px]" aria-hidden="true" />
        </h3>
        {note.description && (
          <p className="mt-1 mb-0 line-clamp-2 text-[0.9375rem] leading-[1.55] text-[var(--ink-2)]">
            {note.description}
          </p>
        )}
      </div>

      <div className="meta flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1 whitespace-nowrap">
        {note.date && <time dateTime={note.date}>{formatDate(note.date)}</time>}
        {note.readTime && <span>{note.readTime}</span>}
      </div>
    </Link>
  );
}
