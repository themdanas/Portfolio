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
    <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[var(--surface)] select-none">
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="size-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span
          className="font-mono flex size-full items-center justify-center text-[0.8125rem] text-[var(--ink-3)]"
          role="img"
          aria-label={alt}
        >
          {initials}
        </span>
      )}
      {/* Hairline ring drawn above the photo so it reads on both themes */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-[var(--rule)]"
      />
    </div>
  );
}
