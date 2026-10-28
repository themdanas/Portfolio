import ProjectPlate from "@/components/ProjectPlate";
import PageIntro from "@/components/ui/PageIntro";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Projects by MD Anas: an LLM inference server, a LangGraph support agent, GPT and diffusion language models from scratch, RAG pipelines, and LoRA fine-tuning.",
  path: "/projects",
});

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
