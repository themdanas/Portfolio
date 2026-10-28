import { ImageResponse } from "next/og";
import { siteConfig, siteUrl } from "@/data/site";
import { profileImageSrc } from "@/lib/profileImage";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

interface OgCardOptions {
  eyebrow: string;
  title: string;
  description?: string;
}

// Shared 1200×630 social card in the site's dark palette.
export function ogCard({ eyebrow, title, description }: OgCardOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0d0d0d",
          color: "#ededed",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, color: "#8f8f8f" }}>
          {eyebrow.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: title.length > 48 ? 60 : 76, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2 }}>
            {title}
          </div>
          {description && (
            <div style={{ display: "flex", fontSize: 30, lineHeight: 1.4, color: "#b5b5b5", maxWidth: 960 }}>
              {description.length > 140 ? `${description.slice(0, 137).trimEnd()}…` : description}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profileImageSrc} alt="" width={64} height={64} style={{ borderRadius: "50%", objectFit: "cover" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>{siteConfig.name}</div>
            <div style={{ display: "flex", fontSize: 22, color: "#8f8f8f" }}>{siteUrl.replace(/^https?:\/\//, "")}</div>
          </div>
        </div>
      </div>
    ),
    ogSize
  );
}
