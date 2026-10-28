import StackList from "@/components/StackList";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "About — MD Anas",
  description: "About MD Anas, an AI Systems & LLM Infrastructure Engineer.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro title="About" />

      <div className="prose">
        <p>
          I&apos;m {siteConfig.name}, a Computer Science Engineering student at{" "}
          {siteConfig.about.institution}.
        </p>
        <p>
          My focus is <strong>{siteConfig.about.focus}</strong>. I learn by implementing things directly:
          profiling attention mechanisms, writing Transformer architectures from scratch, and building
          stateful agent graphs that hold up under failure.
        </p>
        <p>The work I care most about is {siteConfig.about.interests}.</p>
      </div>

      <section className="mt-[var(--section-gap)]" aria-labelledby="background-title">
        <SectionHeading id="background-title">Background</SectionHeading>
        <dl className="spec">
          <div>
            <dt>Education</dt>
            <dd>
              {siteConfig.about.education}
              <br />
              <span className="text-[var(--ink-3)]">{siteConfig.about.institution}</span>
            </dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{siteConfig.about.focus}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-[var(--section-gap)]" aria-labelledby="stack-title">
        <SectionHeading id="stack-title">Stack</SectionHeading>
        <StackList />
      </section>
    </>
  );
}
