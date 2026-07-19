import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectJourney } from "../../components/ProjectJourney";

const homeData = {
  hero: {
    pretitle: "AI SaaS Builder & Freelance Engineer, 8+ Years in Industry",
    heading: "Full-Stack Engineer & AI Systems Architect",
    description:
      "Independent AI SaaS builder and freelance engineer. I design and ship intelligent products end-to-end, from React frontends to multi-agent orchestration, QLoRA fine-tuned models, and production RAG pipelines. Open to collaborating with early-stage startups and founding teams.",
    counters: [],
  },
  showreel: [
    {
      title: "BreatheSpace",
      desc: "AI burnout recovery app | Full product design & dev",
      href: "/breathespace",
    },
    {
      title: "SafeNest",
      desc: "AI investment guidance | Risk profiling & portfolio tracking",
      href: "/safenest",
    },
    {
      title: "Agent OS Dashboard",
      desc: "Multi-agent orchestration | Real-time monitoring",
      href: "/work",
    },
  ],
  skills: [
    {
      name: "Frontend",
      items: [
        "React 18/19",
        "Next.js (App Router)",
        "TypeScript",
        "Tailwind CSS",
        "ShadCN UI",
        "Framer Motion",
        "Zustand",
        "React Query",
        "Chart.js",
        "CSS/SCSS",
      ],
    },
    {
      name: "Backend & Data",
      items: [
        "Node.js",
        "Python",
        "FastAPI",
        "Express.js",
        "PostgreSQL",
        "MongoDB",
        "Supabase",
        "Redis",
        "Docker",
        "GCP",
      ],
    },
    {
      name: "AI, LLMs & Agents",
      items: [
        "LangChain",
        "LangGraph",
        "CrewAI",
        "OpenAI SDK",
        "Claude/Anthropic",
        "RAG Pipelines",
        "Vector DBs",
        "QLoRA Fine-Tuning",
        "MCP",
        "Ollama",
      ],
    },
    {
      name: "Desktop & Plugins",
      items: [
        "C#",
        ".NET 8.0",
        "WPF/XAML",
        "Revit API",
        "Autodesk APS",
        "WiX Installer",
        "Code Signing",
      ],
    },
    {
      name: "Infra & Security",
      items: [
        "Docker",
        "CI/CD",
        "JWT/OAuth2",
        "RBAC",
        "RLS Policies",
        "Multi-Tenant",
        "WebSockets/SSE",
        "Structlog",
      ],
    },
    {
      name: "Knowledge & Voice",
      items: [
        "Neo4j",
        "Knowledge Graphs",
        "PyTorch",
        "Hugging Face",
        "Llama-3",
        "Voice Agents",
        "Embeddings",
        "Search Console API",
      ],
    },
  ],
  services: [
    {
      name: "Full-Stack Web Development",
      desc: "Production React/Next.js apps with TypeScript, Tailwind, ShadCN UI, and robust backend APIs in Node.js, Python/FastAPI, or Hono. Pixel-perfect, performant, and scalable.",
    },
    {
      name: "AI Agent Systems",
      desc: "Autonomous agents, multi-agent orchestration (LangGraph, CrewAI), stateful workflows, hierarchical sub-agents, and custom MCP tool integrations.",
    },
    {
      name: "LLM Fine-Tuning & RAG",
      desc: "QLoRA fine-tuning on Llama-3 and other open models. Production RAG pipelines with pgvector, Weaviate, Chroma, and Neo4j knowledge graphs for factual, grounded generation.",
    },
    {
      name: "Desktop & Plugin Development",
      desc: "Windows desktop applications with C#/.NET, WPF/XAML, Revit API, Autodesk APS integration, and professional installer packaging with code signing.",
    },
  ],
  journey: [
    {
      title: "Agent OS",
      category: "AI Agent Platform",
      subtext:
        "Multi-agent orchestration OS with real-time agent monitoring, task delegation, and autonomous workflow execution. LangChain, CrewAI, and custom event-driven architecture.",
      role: "Full Stack Architecture & Dev",
      year: "2026",
    },
    {
      title: "X-Ray SDK",
      category: "AI Observability",
      subtext:
        "Decision-forensics platform explaining why non-deterministic pipelines make specific decisions. FastAPI, PostgreSQL, Pydantic, production-safe SDK instrumentation.",
      role: "Architecture & Development",
      year: "2025",
    },
    {
      title: "ClipForge AI",
      category: "AI Video",
      subtext:
        "Production platform converting long-form videos into high-impact clips using AI scoring. Next.js, Python, FFmpeg, Ollama, PostgreSQL, WebSocket real-time updates.",
      role: "Full Stack & Video Pipeline",
      year: "2025",
    },
    {
      title: "SEO Knowledge Graph",
      category: "RAG & Knowledge Graphs",
      subtext:
        "Hybrid RAG system blending pgvector with Neo4j knowledge graphs for factual content. QLoRA fine-tuned Llama-3 for human-like SEO generation.",
      role: "AI Architecture & Development",
      year: "2025",
    },
    {
      title: "AI Audit Engine",
      category: "AI Audits",
      subtext:
        "Automated AI system audit platform scanning for performance regressions, safety violations, bias patterns, and cost inefficiencies. Custom evaluation pipelines.",
      role: "Architecture & Development",
      year: "2024",
    },
  ],
};

export default function Page() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col"
    >
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center relative py-12 lg:py-24 px-8 lg:px-16 border-b border-border-color">
        <div className="max-w-[1400px] w-full m-auto flex flex-col justify-center gap-12">
          <div className="max-w-[1000px]">
            <motion.span
              variants={itemVariants}
              className="font-title text-sm uppercase tracking-widest mb-4 inline-block font-semibold text-accent"
            >
              {homeData.hero.pretitle}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="font-title text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.95] tracking-tighter mb-8 text-foreground"
            >
              {homeData.hero.heading}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl max-w-[650px] leading-relaxed text-text-secondary"
            >
              {homeData.hero.description}
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mt-8 pt-8 border-t border-border-color"
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("showreel")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group border border-border-color text-foreground hover:border-accent"
            >
              <span>Scroll</span>
              <i className="fa-solid fa-arrow-down group-hover:translate-y-1 transition-transform duration-300 text-accent" />
            </button>
            <div className="flex gap-12 lg:gap-16">
              {homeData.hero.counters.map((c) => (
                <div key={c.label} className="flex flex-col">
                  <span className="font-title text-4xl md:text-5xl font-extrabold text-accent">
                    {c.count}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest mt-1 text-text-secondary">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="py-24 px-8 lg:px-16 border-b border-border-color">
        <div className="max-w-[1400px] w-full m-auto">
          <div className="mb-16">
            <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
              Capabilities
            </span>
            <h2 className="font-title text-3xl md:text-5xl font-extrabold uppercase">
              Skills & Toolkit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeData.skills.map((cat) => (
              <motion.div
                key={cat.name}
                variants={itemVariants}
                className="bg-card border border-border-color hover:border-border-hover rounded-xl p-8 transition-colors duration-300"
              >
                <h3 className="font-title text-lg font-bold mb-6 uppercase tracking-wider text-foreground border-b border-border-color pb-3">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-foreground/[0.03] border border-border-color hover:border-accent hover:text-accent hover:bg-accent/5 rounded-full px-3 py-1.5 transition-all duration-300 text-text-secondary cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Project Journey */}
      <ProjectJourney projects={homeData.journey} />

      {/* Services List Preview */}
      <section className="py-24 px-8 lg:px-16 border-b border-border-color">
        <div className="max-w-[1400px] w-full m-auto">
          <div className="mb-16">
            <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
              Expertise
            </span>
            <h2 className="font-title text-3xl md:text-5xl font-extrabold uppercase">
              What I Do
            </h2>
          </div>

          <div className="flex flex-col border-t border-border-color">
            {homeData.services.map((item, idx) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => (window.location.href = "/services")}
                className="grid grid-cols-1 lg:grid-cols-[100px_1fr_auto] gap-4 py-8 border-b border-border-color items-center cursor-pointer transition-all duration-300 hover:px-6 hover:bg-foreground/[0.01]"
              >
                <span
                  className={`font-title text-lg transition-colors duration-300 ${hoveredService === idx ? "text-accent" : "text-text-secondary opacity-40"}`}
                >
                  0{idx + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="font-title text-xl md:text-2xl font-bold">
                    {item.name}
                  </span>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      hoveredService === idx
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="text-sm text-text-secondary leading-relaxed max-w-[700px] overflow-hidden"
                  >
                    {item.desc}
                  </motion.p>
                </div>
                <i
                  className={`fa-solid fa-arrow-right-long text-lg transition-all duration-300 ${hoveredService === idx ? "translate-x-3 text-accent" : "opacity-40 text-text-secondary"}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
