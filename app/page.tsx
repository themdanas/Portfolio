import Hero from "@/components/Hero";
import ProjectPlate from "@/components/ProjectPlate";
import NoteRow from "@/components/NoteRow";
import StackList from "@/components/StackList";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { getAllNotes } from "@/lib/notes";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured !== false).slice(0, 3);
  const notes = getAllNotes().slice(0, 2);

  return (
    <>
      <Hero />

      <section className="mt-[var(--section-gap)]" aria-labelledby="work-title">
        <SectionHeading id="work-title" href="/projects" linkLabel="All projects">
          Selected work
        </SectionHeading>
        <div className="mt-4 grid gap-2.5">
          {featuredProjects.map((project) => (
            <ProjectPlate key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-[var(--section-gap)]" aria-labelledby="notes-title">
        <SectionHeading id="notes-title" href="/notes" linkLabel="All notes">
          Notes
        </SectionHeading>
        <div>
          {notes.map((note) => (
            <NoteRow key={note.slug} note={note} />
          ))}
        </div>
      </section>

      <section className="mt-[var(--section-gap)]" aria-labelledby="stack-title">
        <SectionHeading id="stack-title">Stack</SectionHeading>
        <StackList />
      </section>
    </>
  );
}
