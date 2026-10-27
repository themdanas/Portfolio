import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import NoteCard from "@/components/NoteCard";
import { projects } from "@/data/projects";
import { getAllNotes } from "@/lib/notes";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured !== false).slice(0, 3);
  const notes = getAllNotes().slice(0, 2);

  return (
    <div className="wrap">
      {/* Hero Section */}
      <Hero />

      {/* Selected Projects */}
      <section className="mt-[30px]" id="projects" aria-labelledby="projects-title">
        <div className="flex items-center gap-3 mb-2.5">
          <h2 id="projects-title" className="text-[19px] font-semibold tracking-[-0.025em] m-0 text-[var(--text-primary)]">
            Selected Projects
          </h2>
          <div className="flex-1 h-[1px] bg-[var(--border-subtle)]" aria-hidden="true"></div>
          <Link
            href="/projects"
            className="text-[12px] text-[var(--accent)] hover:underline whitespace-nowrap no-underline"
          >
            View all projects ↗
          </Link>
        </div>

        <div className="grid gap-[9px]">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Notes Section */}
      <section className="mt-[30px]" id="notes" aria-labelledby="notes-title">
        <div className="flex items-center gap-3 mb-2.5">
          <h2 id="notes-title" className="text-[19px] font-semibold tracking-[-0.025em] m-0 text-[var(--text-primary)]">
            Notes
          </h2>
          <div className="flex-1 h-[1px] bg-[var(--border-subtle)]" aria-hidden="true"></div>
          <Link
            href="/notes"
            className="text-[12px] text-[var(--accent)] hover:underline whitespace-nowrap no-underline"
          >
            All notes ↗
          </Link>
        </div>

        <div className="grid gap-[9px]">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mt-[30px]" id="skills" aria-labelledby="skills-title">
        <div className="flex items-center gap-3 mb-2.5">
          <h2 id="skills-title" className="text-[19px] font-semibold tracking-[-0.025em] m-0 text-[var(--text-primary)]">
            Technical Skills
          </h2>
          <div className="flex-1 h-[1px] bg-[var(--border-subtle)]" aria-hidden="true"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3.5">
          <div className="border-l border-[var(--border-subtle)] pl-3.5">
            <h3 className="text-[12px] font-semibold text-[var(--text-primary)] mb-1">
              AI / ML & LLMs
            </h3>
            <p className="text-[12px] text-[var(--text-secondary)] leading-[1.65] m-0">
              {siteConfig.skills.aiMl.join(", ")}
            </p>
          </div>

          <div className="border-l border-[var(--border-subtle)] pl-3.5">
            <h3 className="text-[12px] font-semibold text-[var(--text-primary)] mb-1">
              Agents & Retrieval
            </h3>
            <p className="text-[12px] text-[var(--text-secondary)] leading-[1.65] m-0">
              {siteConfig.skills.llmEngineering.join(", ")}
            </p>
          </div>

          <div className="border-l border-[var(--border-subtle)] pl-3.5">
            <h3 className="text-[12px] font-semibold text-[var(--text-primary)] mb-1">
              Languages
            </h3>
            <p className="text-[12px] text-[var(--text-secondary)] leading-[1.65] m-0">
              {siteConfig.skills.languages.join(", ")}
            </p>
          </div>

          <div className="border-l border-[var(--border-subtle)] pl-3.5">
            <h3 className="text-[12px] font-semibold text-[var(--text-primary)] mb-1">
              Backend & Infra
            </h3>
            <p className="text-[12px] text-[var(--text-secondary)] leading-[1.65] m-0">
              {siteConfig.skills.backendInfra.join(", ")}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-[30px] grid grid-cols-1 sm:grid-cols-[115px_1fr] gap-2 sm:gap-4" id="about" aria-labelledby="about-title">
        <h2 id="about-title" className="text-[19px] font-semibold tracking-[-0.025em] m-0 text-[var(--text-primary)]">
          About
        </h2>
        <p className="text-[13px] leading-[1.6] text-[var(--text-secondary)] m-0">
          {siteConfig.about.bio}
        </p>
      </section>
    </div>
  );
}
