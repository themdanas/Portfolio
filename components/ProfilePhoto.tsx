"use client";

import { useState } from "react";

interface ProfilePhotoProps {
  src?: string;
  alt?: string;
  initials?: string;
  imageExists?: boolean;
}

export default function ProfilePhoto({
  src = "/images/profile.jpg",
  alt = "Portrait of MD Anas",
  initials = "MA",
  imageExists = false,
}: ProfilePhotoProps) {
  // If the server detected no file, start in placeholder state to prevent 404 image flash.
  // If a file is present or added, onError catches any runtime failures.
  const [hasError, setHasError] = useState<boolean>(!imageExists);

  return (
    <div className="shrink-0 flex items-center justify-center">
      <div
        className="w-[128px] h-[128px] sm:w-[185px] sm:h-[185px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center select-none shadow-sm"
        aria-label={alt}
      >
        {!hasError && src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-full"
            onError={() => setHasError(true)}
          />
        ) : (
          <span
            style={{ fontFamily: "var(--font-name)" }}
            className="font-name text-[34px] sm:text-[44px] md:text-[48px] font-semibold text-[var(--text-muted)] tracking-[-0.03em]"
            aria-hidden="true"
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
