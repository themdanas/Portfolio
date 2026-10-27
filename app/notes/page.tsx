import Link from "next/link";
import NoteCard from "@/components/NoteCard";
import { getAllNotes } from "@/lib/notes";

export const metadata = {
  title: "Notes — MD Anas",
  description: "Technical writing and research notes on LLM inference and distributed systems.",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="wrap pt-6 sm:pt-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-[12px] text-[var(--accent)] hover:underline inline-flex items-center gap-1 mb-4 no-underline"
        >
          ← Back to home
        </Link>
        <h1 className="text-[26px] sm:text-[28px] font-semibold tracking-[-0.03em] text-[var(--text-primary)] mb-2">
          Notes
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)] m-0">
          Technical breakdowns, serving benchmarks, and architecture notes.
        </p>
      </div>

      <div className="grid gap-[9px]">
        {notes.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>
    </div>
  );
}
