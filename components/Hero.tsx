import fs from "fs";
import path from "path";
import { siteConfig } from "@/data/site";
import ProfilePhoto from "./ProfilePhoto";

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
    <section className="pt-8 sm:pt-10 mb-2" aria-labelledby="hero-title">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 md:gap-10">
        {/* Left Column: Name, Professional Headline, Short Introduction, Contact Links */}
        <div className="flex-1 min-w-0 order-2 sm:order-1">
          <h1
            id="hero-title"
            style={{ fontFamily: "var(--font-name)" }}
            className="font-name text-[36px] sm:text-[42px] md:text-[46px] font-semibold tracking-[-0.02em] leading-[1.15] text-[var(--text-primary)] mb-2"
          >
            {siteConfig.name}
          </h1>

          <p className="text-[15.5px] sm:text-[17px] font-medium text-[var(--text-primary)] tracking-[-0.015em] leading-[1.4] mb-3">
            {siteConfig.heroHeading}
          </p>

          <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[var(--text-secondary)] mb-4 max-w-[540px]">
            {siteConfig.heroBio}
          </p>

          {/* Contact & Social Links */}
          <div className="flex items-center gap-3 sm:gap-3.5 text-[13px] sm:text-[13.5px] flex-wrap">
            <a
              href={siteConfig.socials.email}
              className="text-[var(--accent)] hover:underline no-underline inline-flex items-center gap-1.5 font-medium"
            >
              <span aria-hidden="true">✉</span>
              <span>Email me ↗</span>
            </a>
            <span className="text-[var(--text-muted)] select-none" aria-hidden="true">
              ·
            </span>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:underline no-underline"
            >
              GitHub ↗
            </a>
            <span className="text-[var(--text-muted)] select-none" aria-hidden="true">
              ·
            </span>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:underline no-underline"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Right Column: Circular Profile Photo */}
        <div className="shrink-0 order-1 sm:order-2">
          <ProfilePhoto
            src={profileImage}
            alt={`Portrait of ${siteConfig.name}`}
            initials="MA"
            imageExists={imageExists}
          />
        </div>
      </div>
    </section>
  );
}
