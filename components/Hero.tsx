import fs from "fs";
import path from "path";
import { siteConfig } from "@/data/site";
import ProfilePhoto from "./ProfilePhoto";
import ContactChip from "./ui/ContactChip";
import { GitHubIcon, GmailIcon, LinkedInIcon } from "./ui/icons";

interface HeroProps {
  profileImage?: string;
}

export default function Hero({ profileImage = siteConfig.profileImage }: HeroProps) {
  // Check whether the profile image exists on disk in the public directory
  let imageExists = false;
  try {
    const cleanPath = profileImage.startsWith("/") ? profileImage.slice(1) : profileImage;
    const fullPath = path.join(process.cwd(), "public", cleanPath);
    imageExists = fs.existsSync(fullPath);
  } catch {
    imageExists = false;
  }

  return (
    <section aria-labelledby="hero-title">
      <div className="flex items-center gap-3.5 mb-8">
        <ProfilePhoto
          src={profileImage}
          alt={`Portrait of ${siteConfig.name}`}
          initials="MA"
          imageExists={imageExists}
        />
        <div className="leading-tight">
          <h1 id="hero-title" className="m-0 text-[1rem] font-medium text-[var(--ink)]">
            {siteConfig.name}
          </h1>
          <p className="m-0 text-[0.9375rem] text-[var(--ink-3)]">AI/ML Engineer</p>
        </div>
      </div>

      <p className="m-0 max-w-[34rem] text-[1.375rem] sm:text-[1.5rem] font-medium leading-[1.3] tracking-[-0.02em] text-[var(--ink)]">
        {siteConfig.heroHeading}
      </p>

      <p className="mt-4 mb-0 max-w-[34rem] text-[1.0625rem] text-[var(--ink-2)]">
        {siteConfig.heroBio}
      </p>

      <ul className="mt-7 mb-0 flex list-none flex-wrap items-center gap-2 p-0" aria-label="Contact">
        <li><ContactChip href={siteConfig.socials.email} label="Email" icon={GmailIcon} /></li>
        <li><ContactChip href={siteConfig.socials.github} label="GitHub" icon={GitHubIcon} /></li>
        <li><ContactChip href={siteConfig.socials.linkedin} label="LinkedIn" icon={LinkedInIcon} /></li>
      </ul>
    </section>
  );
}
