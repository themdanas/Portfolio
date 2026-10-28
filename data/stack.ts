import { Database, DatabaseZap, ScanSearch, Waypoints, type LucideIcon } from "lucide-react";

// Brand marks are vendored in public/icons/stack (devicon@2.18.0, MIT; simple-icons@16.36.0, CC0).
// Concepts without a brand use a neutral lucide glyph.
export type StackIcon = { src: string; darkSrc?: string } | { lucide: LucideIcon };

export interface StackItem {
  name: string;
  icon: StackIcon;
}

export interface StackGroup {
  label: string;
  items: StackItem[];
}

const mark = (file: string, darkFile?: string): StackIcon => ({
  src: `/icons/stack/${file}.svg`,
  darkSrc: darkFile ? `/icons/stack/${darkFile}.svg` : undefined,
});

export const stack: StackGroup[] = [
  {
    label: "AI / ML",
    items: [
      { name: "PyTorch", icon: mark("pytorch") },
      { name: "TensorFlow", icon: mark("tensorflow") },
      { name: "Scikit-learn", icon: mark("scikitlearn") },
      { name: "Hugging Face", icon: mark("huggingface") },
    ],
  },
  {
    label: "LLM systems",
    items: [
      { name: "LangChain", icon: mark("langchain") },
      { name: "LangGraph", icon: mark("langgraph") },
      { name: "RAG", icon: { lucide: ScanSearch } },
      { name: "Embeddings", icon: { lucide: Waypoints } },
      { name: "Vector DBs", icon: { lucide: DatabaseZap } },
    ],
  },
  {
    label: "Languages",
    items: [
      { name: "Python", icon: mark("python") },
      { name: "C++", icon: mark("cplusplus") },
      { name: "SQL", icon: { lucide: Database } },
    ],
  },
  {
    label: "Infra",
    items: [
      { name: "FastAPI", icon: mark("fastapi") },
      { name: "PostgreSQL", icon: mark("postgresql") },
      { name: "Docker", icon: mark("docker") },
      { name: "AWS", icon: mark("aws", "aws-dark") },
      { name: "Git", icon: mark("git") },
    ],
  },
];
