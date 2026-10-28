import { ImageResponse } from "next/og";
import { croppedPhotoStyle, profileImageSrc } from "@/lib/profileImage";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Square on purpose: iOS applies its own rounded mask.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: 180, height: 180, overflow: "hidden" }}>
        <img src={profileImageSrc} alt="" style={croppedPhotoStyle(180)} />
      </div>
    ),
    size
  );
}
