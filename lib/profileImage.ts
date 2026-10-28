import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/data/site";

// Profile photo as a data URI for ImageResponse (icons and social cards).
const photo = await readFile(join(process.cwd(), "public", siteConfig.profileImage), "base64");
export const profileImageSrc = `data:image/jpeg;base64,${photo}`;

// Head-and-shoulders square within the 800×800 photo, so the face stays legible at favicon sizes.
const crop = { x: 183, y: 130, size: 400 };

export function croppedPhotoStyle(size: number) {
  const scale = size / crop.size;
  return {
    position: "absolute" as const,
    left: -crop.x * scale,
    top: -crop.y * scale,
    width: 800 * scale,
    height: 800 * scale,
  };
}
