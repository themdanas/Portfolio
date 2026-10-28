import NoteRow from "@/components/NoteRow";
import PageIntro from "@/components/ui/PageIntro";
import { getAllNotes } from "@/lib/notes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Notes",
  description:
    "Technical notes by MD Anas on LLM inference, KV caching, continuous batching, and the systems behind serving language models.",
  path: "/notes",
});

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
