import NoteRow from "@/components/NoteRow";
import PageIntro from "@/components/ui/PageIntro";
import { getAllNotes } from "@/lib/notes";

export const metadata = {
  title: "Notes — MD Anas",
  description: "Technical writing and research notes on LLM inference and distributed systems.",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <>
      <PageIntro title="Notes">
        Technical breakdowns, serving benchmarks, and architecture notes.
      </PageIntro>

      <div>
        {notes.map((note) => (
          <NoteRow key={note.slug} note={note} />
        ))}
      </div>
    </>
  );
}
