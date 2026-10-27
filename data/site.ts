export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  description: string;
  eyebrow: string;
  heroHeading: string;
  heroBio: string;
  profileImage: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    resume: string;
  };
  skills: {
    languages: string[];
    aiMl: string[];
    llmEngineering: string[];
    backendInfra: string[];
  };
  about: {
    education: string;
    institution: string;
    focus: string;
    interests: string;
    bio: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "MD Anas",
  shortName: "MD",
  title: "MD — AI Engineer",
  description: "MD — AI Engineer and Computer Science student building LLM infrastructure, agentic systems, and applied machine learning projects.",
  eyebrow: "AI ENGINEER / COMPUTER SCIENCE STUDENT",
  heroHeading: "AI Engineer building LLM systems from the model to production.",
  heroBio: "Computer Science student focused on LLM inference, agentic systems, and applied machine learning. I learn by building real systems and understanding how they work.",
  profileImage: "/images/profile.jpg",
  socials: {
    github: "https://github.com/themdanas",
    linkedin: "https://www.linkedin.com/in/md-anas-ml/",
    email: "mailto:anasthemd@gmail.com",
    resume: "/resume.pdf"
  },
  skills: {
    languages: ["Python", "C++", "SQL"],
    aiMl: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face Transformers"],
    llmEngineering: ["LangChain", "LangGraph", "RAG", "Embeddings", "Vector Databases"],
    backendInfra: ["FastAPI", "PostgreSQL", "Docker", "AWS", "Git"]
  },
  about: {
    education: "B.Tech in Computer Science Engineering",
    institution: "Government Engineering College, Ajmer",
    focus: "LLM infrastructure, AI agents, and applied machine learning",
    interests: "model training, inference optimization, and production AI systems",
    bio: "Pre-final-year Computer Science student at Government Engineering College, Ajmer. Interested in LLM systems, agentic AI, and building reliable machine learning applications. I prefer learning by implementing, measuring, and documenting what I build."
  }
};
