"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  value: string;
  label?: string;
}

export default function CopyButton({ value, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), 1500);
  };

  const iconBase = "absolute inset-0 transition-[opacity,filter,scale] duration-200 ease-out";

  return (
    <button
      type="button"
      onClick={copy}
      className="pressable inline-flex items-center gap-1.5 rounded-md px-2 py-1 -mx-2 text-[0.9375rem] text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--surface)] cursor-pointer"
    >
      <span className="relative size-3.5" aria-hidden="true">
        <Copy
          size={14}
          strokeWidth={1.75}
          className={`${iconBase} ${copied ? "opacity-0 blur-[2px] scale-75" : "opacity-100"}`}
        />
        <Check
          size={14}
          strokeWidth={2}
          className={`${iconBase} text-[var(--accent)] ${copied ? "opacity-100" : "opacity-0 blur-[2px] scale-75"}`}
        />
      </span>
      <span>{copied ? "Copied" : label}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
