import Image from "next/image";
import type { StackItem } from "@/data/stack";

export default function SkillChip({ name, icon }: StackItem) {
  return (
    <span className="chip">
      {"lucide" in icon ? (
        <icon.lucide size={16} strokeWidth={1.75} className="chip-icon" aria-hidden="true" />
      ) : icon.darkSrc ? (
        // Both variants render; CSS shows the one matching data-theme, so there is no flash
        <>
          <Image src={icon.src} alt="" width={16} height={16} className="size-4 [[data-theme=dark]_&]:hidden" />
          <Image src={icon.darkSrc} alt="" width={16} height={16} className="size-4 hidden [[data-theme=dark]_&]:block" />
        </>
      ) : (
        <Image src={icon.src} alt="" width={16} height={16} className="size-4" />
      )}
      <span>{name}</span>
    </span>
  );
}
