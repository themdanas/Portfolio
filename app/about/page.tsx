import StackList from "@/components/StackList";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, pageMetadata, personId } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About MD Anas, an AI Engineer and Computer Science student at Government Engineering College, Ajmer, working on LLM infrastructure, AI agents, and applied machine learning.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "AboutPage", url: absoluteUrl("/about"), name: `About ${siteConfig.name}`, mainEntity: { "@id": personId } },
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
          ],
        }}
      />
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
