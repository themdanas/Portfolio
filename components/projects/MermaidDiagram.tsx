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

        const rootStyle = getComputedStyle(document.documentElement);
        const fontFamily = rootStyle.getPropertyValue("--font-mono").trim() || "ui-monospace, monospace";
        // Hex mirrors of the OKLCH tokens in globals.css; Mermaid's color parser doesn't read oklch()
        const palette = isDark
          ? { bg: "#171717", node: "#0d0d0d", ink: "#ebebeb", line: "#929292", rule: "#3d3d3d" }
          : { bg: "#f3f3f3", node: "#fcfcfc", ink: "#161616", line: "#696969", rule: "#c4c4c4" };

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            darkMode: isDark,
            background: palette.bg,
            mainBkg: palette.node,
            primaryColor: palette.node,
            primaryTextColor: palette.ink,
            primaryBorderColor: palette.rule,
            secondaryColor: palette.bg,
            tertiaryColor: palette.bg,
            clusterBkg: palette.bg,
            clusterBorder: palette.rule,
            lineColor: palette.line,
            textColor: palette.ink,
            edgeLabelBackground: palette.bg,
            fontSize: "14px",
            fontFamily,
          },
          themeCSS: ".node rect, .node polygon, .cluster rect { filter: none !important; }",
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
    <figure className="my-8 overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--surface)]" style={{ maxWidth: "none" }}>
      <div className="flex min-h-[12rem] items-center justify-center overflow-x-auto p-5">
        {isRendered ? (
          <div
            ref={containerRef}
            className="mermaid-wrapper w-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="meta">Rendering diagram…</div>
        )}
      </div>
    </figure>
  );
}
