import CopyButton from "@/components/CopyButton";
import ExternalLink from "@/components/ui/ExternalLink";
import PageIntro from "@/components/ui/PageIntro";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Contact — MD Anas",
  description: "Get in touch with MD Anas.",
};

const email = siteConfig.socials.email.replace(/^mailto:/, "");

const channels = [
  { label: "GitHub", value: "github.com/themdanas", href: siteConfig.socials.github, action: "Profile" },
  { label: "LinkedIn", value: "linkedin.com/in/md-anas-ml", href: siteConfig.socials.linkedin, action: "Connect" },
  { label: "Resume", value: "resume.pdf", href: siteConfig.socials.resume, action: "Open" },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Contact">
        Open to AI systems engineering roles, collaborations, and open-source work. Email is the fastest way to reach me.
      </PageIntro>

      <dl className="spec">
        <div className="items-center">
          <dt>Email</dt>
          <dd className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <a href={siteConfig.socials.email} className="link">
              {email}
            </a>
            <CopyButton value={email} />
          </dd>
        </div>

        {channels.map((channel) => (
          <div key={channel.label} className="items-center">
            <dt>{channel.label}</dt>
            <dd className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="text-[var(--ink)]">{channel.value}</span>
              <ExternalLink href={channel.href} quiet>
                {channel.action}
              </ExternalLink>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
