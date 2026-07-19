import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

// Default config (can be overridden by pages)
// https://vike.dev/config

const config: Config = {
  // https://vike.dev/head-tags
  title:
    "Manjula — Full-Stack Engineer & AI Systems Architect | 8+ Years in Industry | LangGraph, RAG",
  description:
    "8+ years in the industry, based in Bangalore. Full-stack engineer and AI systems architect specializing in agentic AI, LangGraph, RAG pipelines, QLoRA fine-tuning, React/Next.js, FastAPI, and C#/.NET.",

  passToClient: ["user"],
  extends: [vikeReact],
};

export default config;
