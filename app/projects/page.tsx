import ProjectPlate from "@/components/ProjectPlate";
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

      <div className="grid gap-2.5">
        {projects.map((project) => (
          <ProjectPlate key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
