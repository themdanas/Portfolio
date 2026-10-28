import ProjectRow from "@/components/ProjectRow";
import PageIntro from "@/components/ui/PageIntro";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Work — MD Anas",
  description: "AI systems, LLM serving engines, and autonomous agents built by MD Anas.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro title="Work">
        LLM infrastructure, agents, and models built from scratch. Each one has a write-up on how it works.
      </PageIntro>

      <div>
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
