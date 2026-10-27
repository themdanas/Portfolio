import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "About — MD Anas",
  description: "About MD Anas, an AI Systems & LLM Infrastructure Engineer.",
};

export default function AboutPage() {
  return (
    <div className="wrap pt-6 sm:pt-8 pb-12">
      <div className="mb-6">
        <Link
          href="/"
          className="text-[12px] text-[var(--accent)] hover:underline inline-flex items-center gap-1 mb-4 no-underline"
        >
          ← Back to home
        </Link>
        <h1 className="text-[26px] sm:text-[28px] font-semibold tracking-[-0.03em] text-[var(--text-primary)] mb-2">
          About
        </h1>
      </div>

      <div className="space-y-4 text-[14.5px] leading-[1.65] text-[var(--text-secondary)] mb-8">
        <p>
          I am <strong>{siteConfig.name}</strong>, a Computer Science Engineering student at{" "}
          <span className="text-[var(--text-primary)]">{siteConfig.about.institution}</span>.
        </p>
        <p>
          My technical focus centers on <strong>{siteConfig.about.focus}</strong>. I learn through direct implementation—profiling attention mechanisms, implementing Transformer architectures from scratch, and architecting resilient stateful agent graphs.
        </p>
        <p>
          My core engineering interests include {siteConfig.about.interests}.
        </p>
      </div>

      <div className="h-[1px] bg-[var(--border-subtle)] my-6" aria-hidden="true"></div>

      <h2 className="text-[18px] font-semibold text-[var(--text-primary)] mb-4">
        Technical Skills
      </h2>

      <div className="space-y-3 text-[13.5px]">
        <div>
          <span className="font-semibold text-[var(--text-primary)]">Languages: </span>
          <span className="text-[var(--text-secondary)]">{siteConfig.skills.languages.join(", ")}</span>
        </div>
        <div>
          <span className="font-semibold text-[var(--text-primary)]">AI/ML: </span>
          <span className="text-[var(--text-secondary)]">{siteConfig.skills.aiMl.join(", ")}</span>
        </div>
        <div>
          <span className="font-semibold text-[var(--text-primary)]">LLM Engineering: </span>
          <span className="text-[var(--text-secondary)]">{siteConfig.skills.llmEngineering.join(", ")}</span>
        </div>
        <div>
          <span className="font-semibold text-[var(--text-primary)]">Backend & Infrastructure: </span>
          <span className="text-[var(--text-secondary)]">{siteConfig.skills.backendInfra.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}
