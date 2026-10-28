import { siteConfig } from "@/data/site";
import { ogCard } from "@/lib/ogTemplate";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: siteConfig.eyebrow, title: siteConfig.heroHeading, description: siteConfig.heroBio });
}
