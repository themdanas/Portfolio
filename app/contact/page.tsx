import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Contact — MD Anas",
  description: "Get in touch with MD Anas.",
};

export default function ContactPage() {
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
          Contact
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)] m-0">
          Feel free to reach out regarding AI systems engineering opportunities, collaborations, or open-source research.
        </p>
      </div>

      <div className="h-[1px] bg-[var(--border-subtle)] my-6" aria-hidden="true"></div>

      <div className="grid gap-3 max-w-[480px]">
        <div className="project-card flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">Email</span>
            <span className="text-[14px] text-[var(--text-primary)]">anasthemd@gmail.com</span>
          </div>
          <a
            href={siteConfig.socials.email}
            className="text-[13px] text-[var(--accent)] hover:underline no-underline"
          >
            Send email ↗
          </a>
        </div>

        <div className="project-card flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">GitHub</span>
            <span className="text-[14px] text-[var(--text-primary)]">github.com/themdanas</span>
          </div>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-[var(--accent)] hover:underline no-underline"
          >
            Visit profile ↗
          </a>
        </div>

        <div className="project-card flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">LinkedIn</span>
            <span className="text-[14px] text-[var(--text-primary)]">linkedin.com/in/md-anas-ml</span>
          </div>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-[var(--accent)] hover:underline no-underline"
          >
            Connect ↗
          </a>
        </div>

        <div className="project-card flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">Resume</span>
            <span className="text-[14px] text-[var(--text-primary)]">resume.pdf</span>
          </div>
          <a
            href={siteConfig.socials.resume}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-[var(--accent)] hover:underline no-underline"
          >
            View PDF ↗
          </a>
        </div>
      </div>
    </div>
  );
}
