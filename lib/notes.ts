import fs from "fs";
import path from "path";
import matter from "gray-matter";

const notesDirectory = path.join(process.cwd(), "content/notes");

export interface NoteMeta {
  slug: string;
  title: string;
  description: string;
  date?: string;
  readTime?: string;
  category?: string;
}

export interface NoteItem extends NoteMeta {
  content: string;
}

export function getAllNotes(): NoteMeta[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory);
  const notes = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: (data.title as string) || slug,
        description: (data.description as string) || "",
        date: data.date as string | undefined,
        readTime: data.readTime as string | undefined,
        category: data.category as string | undefined,
      };
    });

  return notes;
}

export function getNoteBySlug(slug: string): NoteItem | null {
  try {
    const mdPath = path.join(notesDirectory, `${slug}.md`);
    const mdxPath = path.join(notesDirectory, `${slug}.mdx`);
    const fullPath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null;

    if (!fullPath) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: (data.title as string) || slug,
      description: (data.description as string) || "",
      date: data.date as string | undefined,
      readTime: data.readTime as string | undefined,
      category: data.category as string | undefined,
      content,
    };
  } catch {
    return null;
  }
}
