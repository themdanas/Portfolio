import { ImageResponse } from "next/og";
import { croppedPhotoStyle, profileImageSrc } from "@/lib/profileImage";

const sizes = [32, 192, 512];

export function generateImageMetadata() {
  return sizes.map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const size = Number(await id);
  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: size, height: size, borderRadius: "50%", overflow: "hidden" }}>
        <img src={profileImageSrc} alt="" style={croppedPhotoStyle(size)} />
      </div>
    ),
    { width: size, height: size }
  );
}
