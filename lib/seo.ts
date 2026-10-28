import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/data/site";

export const absoluteUrl = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: siteConfig.name,
  url: siteUrl,
  image: absoluteUrl(siteConfig.profileImage),
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  email: siteConfig.socials.email,
  sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.about.institution,
  },
  knowsAbout: siteConfig.keywords.filter((k) => k !== siteConfig.name),
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": personId },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  openGraph?: Metadata["openGraph"];
}

// Child segments replace the parent's openGraph/twitter objects wholesale, so rebuild them per page.
export function pageMetadata({ title, description, path, keywords, openGraph }: PageMetadataOptions): Metadata {
  const fullTitle = `${title} — ${siteConfig.name}`;
  return {
    title,
    description,
    keywords: keywords ? [...keywords, ...siteConfig.keywords.slice(0, 3)] : undefined,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: fullTitle,
      description,
      ...openGraph,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
