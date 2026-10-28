export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  metadata: string[];
  githubUrl: string;
  demoUrl?: string;
  status?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "nanoinfer",
    slug: "nanoinfer",
    title: "NanoInfer",
    summary: "A minimal LLM inference server exploring the systems behind efficient language model serving.",
    description: "Minimal LLM inference server with KV caching, continuous batching, and a streaming API. Inspired by vLLM, built using Python and PyTorch.",
    technologies: ["Python", "PyTorch", "FastAPI", "KV Cache", "Continuous Batching"],
    metadata: ["LLM Inference", "PyTorch", "KV Cache", "Continuous Batching", "Serving"],
    githubUrl: "https://github.com/themdanas/mini-llm-inference-server",
    status: "Implemented & Benchmarked",
    featured: true
  },
  {
    id: "support-agent",
    slug: "support-agent",
    title: "AI Customer Support Agent",
    summary: "A tool-using autonomous customer support agent with deterministic graph routing, long-term PostgreSQL memory, and policy-driven guardrails.",
    description: "Tool-using customer support agent with LangGraph, PostgreSQL, and policy-based decision making. Handles order lookup, refunds, and escalations.",
    technologies: ["LangGraph", "LangChain", "PostgreSQL", "FastAPI", "Docker"],
    metadata: ["Agents", "LangGraph", "PostgreSQL", "Tools", "Docker"],
    githubUrl: "https://github.com/themdanas/Customer-Support-Agent",
    status: "Building",
    featured: true
  },
  {
    id: "tiny-diffusion-language-model",
    slug: "tiny-diffusion-language-model",
    title: "Tiny Diffusion Language Model",
    summary: "A discrete diffusion language model built from scratch using PyTorch and Transformer Encoders, trained on TinyStories. Generates text through iterative denoising instead of conventional left-to-right autoregressive decoding.",
    description: "Discrete diffusion language model (~13.84M params) built from scratch in PyTorch on TinyStories. Features bidirectional Transformer Encoders, learned timestep embeddings, and 64-step iterative confidence-based remasking.",
    technologies: ["Python", "PyTorch", "Hugging Face Tokenizers", "Transformers", "Accelerate", "ImageIO"],
    metadata: ["Discrete Diffusion", "PyTorch", "Transformer Encoder", "Iterative Denoising", "TinyStories"],
    githubUrl: "https://github.com/themdanas/diffusion_language_model",
    status: "Implemented & Evaluated",
    featured: false
  },
  {
    id: "gpt-from-scratch",
    slug: "gpt-from-scratch",
    title: "GPT from Scratch",
    summary: "A from-scratch implementation of an autoregressive Transformer decoder language model, trained and evaluated on TinyStories.",
    description: "Small GPT-style language model implemented from scratch using NumPy and PyTorch. Includes tokenizer, transformer architecture, and training pipeline.",
    technologies: ["Python", "PyTorch", "NumPy", "BPE Tokenizer", "Transformers"],
    metadata: ["LLM Training", "Transformers", "Tokenizer", "PyTorch"],
    githubUrl: "https://github.com/themdanas/gpt-from-scratch",
    status: "Implemented & Evaluated",
    featured: true
  },
  {
    id: "insurellm",
    slug: "insurellm",
    title: "InsureLLM — Domain-Specific RAG Pipeline",
    summary: "A retrieval-augmented generation engine engineered for complex insurance policy analysis, combining hybrid search with cross-encoder re-ranking.",
    description: "Retrieval-augmented generation pipeline using embeddings, vector search, and grounded responses over domain-specific insurance documents.",
    technologies: ["Python", "LangChain", "Qdrant", "Cross-Encoder", "FastAPI"],
    metadata: ["RAG", "LangChain", "Embeddings", "Vector Search"],
    githubUrl: "https://github.com/themdanas/Insurellm_rag",
    status: "Implemented",
    featured: false
  },
  {
    id: "qwen-finetuning-lora-qlora",
    slug: "qwen-finetuning-lora-qlora",
    title: "Qwen2.5 Fine-Tuning",
    summary: "This project implements a modular parameter-efficient fine-tuning pipeline for Qwen2.5-1.5B-Instruct using Hugging Face Transformers, PEFT, and TRL. It explores LoRA-based supervised fine-tuning, adapter inference, model comparison, and weight merging, with a separate QLoRA training script template.",
    description: "A modular fine-tuning pipeline for Qwen2.5-1.5B-Instruct using LoRA and QLoRA. Covers supervised fine-tuning, adapter inference, base-versus-adapter comparisons, and adapter merging.",
    technologies: ["Python", "PyTorch", "Transformers", "PEFT", "TRL", "LoRA", "QLoRA"],
    metadata: ["Fine-Tuning", "LoRA", "QLoRA", "PEFT", "Transformers", "TRL"],
    githubUrl: "https://github.com/themdanas/Fine-tuning-Qwen2.5-1.5B-Instruct-with-LoRA-and-QLoRA",
    status: "Documented Pipeline",
    featured: false
  },
  {
    id: "product-recommendor",
    slug: "product-recommendor",
    title: "Product Recommender",
    summary: "A content-based recommendation engine and semantic product search system for e-commerce appliances, combining TF-IDF vectorization and Nearest Neighbors cosine similarity with a FastAPI backend and Streamlit interface.",
    description: "Content-based recommendation system and semantic search for e-commerce appliances using TF-IDF vectorization, Nearest Neighbors, FastAPI, and Streamlit on Amazon metadata.",
    technologies: ["Python", "Scikit-learn", "TF-IDF", "FastAPI", "Streamlit", "Docker"],
    metadata: ["Recommender Systems", "Scikit-learn", "TF-IDF", "Cosine Similarity", "FastAPI", "Docker"],
    githubUrl: "https://github.com/themdanas/product-recommendor",
    status: "Implemented & Evaluated",
    featured: false
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  if (slug === "ai-support-agent") {
    return projects.find((p) => p.slug === "support-agent");
  }
  if (
    slug === "diffusion_language_model" ||
    slug === "diffusion-language-model" ||
    slug === "tiny-diffusion-lm"
  ) {
    return projects.find((p) => p.slug === "tiny-diffusion-language-model");
  }
  if (
    slug === "product-recommender" ||
    slug === "product_recommender" ||
    slug === "product_recommendor"
  ) {
    return projects.find((p) => p.slug === "product-recommendor");
  }
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
