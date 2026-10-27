"use client";

import { useEffect, useRef, useState, useId } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const uniqueId = useId().replace(/:/g, "mermaid-");

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = document.documentElement.getAttribute("data-theme") !== "light";

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          themeVariables: isDark
            ? {
                darkMode: true,
                background: "#2B2B2E",
                mainBkg: "#252528",
                primaryColor: "#2B2B2E",
                primaryTextColor: "#E5E5E7",
                primaryBorderColor: "#79D9AD",
                lineColor: "#85858B",
                secondaryColor: "#1E1E20",
                tertiaryColor: "#1E1E20",
                fontSize: "12px",
                fontFamily: "Inter, sans-serif"
              }
            : {
                darkMode: false,
                background: "#ffffff",
                mainBkg: "#f7f8f7",
                primaryColor: "#ffffff",
                primaryTextColor: "#1b1d1e",
                primaryBorderColor: "#087b5a",
                lineColor: "#727977",
                secondaryColor: "#f1f5f9",
                tertiaryColor: "#ffffff",
                fontSize: "12px",
                fontFamily: "Inter, sans-serif"
              },
          securityLevel: "loose",
        });

        const id = `svg-${uniqueId}`;
        const { svg } = await mermaid.render(id, chart);
        if (isMounted) {
          setSvgContent(svg);
          setIsRendered(true);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
      }
    }

    renderChart();

    // Listen for theme changes to re-render diagrams with correct contrast
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "data-theme") {
          renderChart();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [chart, uniqueId]);

  return (
    <div className="w-full my-5 overflow-hidden rounded-[7px] border border-[var(--border-subtle)] bg-[var(--bg-card)]">
      <div className="overflow-x-auto p-4 flex justify-center">
        {isRendered ? (
          <div
            ref={containerRef}
            className="mermaid-wrapper max-w-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="text-[12px] text-[var(--text-muted)] py-8 font-mono">
            Rendering architecture diagram...
          </div>
        )}
      </div>
    </div>
  );
}
