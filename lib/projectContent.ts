import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectSegment {
  type: "markdown" | "mermaid";
  content: string;
}

export interface ProjectDetailContent {
  slug: string;
  segments: ProjectSegment[];
}

export function getProjectContent(slug: string): ProjectDetailContent | null {
  try {
    const mdPath = path.join(projectsDirectory, `${slug}.md`);
    const mdxPath = path.join(projectsDirectory, `${slug}.mdx`);
    const fullPath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null;

    if (!fullPath) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const segments: ProjectSegment[] = [];
    const regex = /```mermaid\n([\s\S]*?)\n```/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        segments.push({
          type: "markdown",
          content: content.slice(lastIndex, match.index),
        });
      }
      segments.push({
        type: "mermaid",
        content: match[1].trim(),
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      segments.push({
        type: "markdown",
        content: content.slice(lastIndex),
      });
    }

    // Fallback if no code-block mermaid was found but frontmatter had mermaidChart
    if (segments.length === 0 && data.mermaidChart) {
      segments.push({ type: "mermaid", content: (data.mermaidChart as string).trim() });
      segments.push({ type: "markdown", content });
    } else if (segments.length === 0) {
      segments.push({ type: "markdown", content });
    }

    return {
      slug,
      segments,
    };
  } catch {
    return null;
  }
}
