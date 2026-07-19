import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const servicesData = {
  heading: "Comprehensive Services",
  capabilities: [
    {
      name: "Full-Stack Web Development",
      desc: "Production React/Next.js (App Router) applications with TypeScript, Zustand, React Query, Tailwind CSS, ShadCN UI. Backend APIs in Node.js, FastAPI, or Hono with PostgreSQL, MongoDB, Supabase.",
    },
    {
      name: "AI Agent Systems",
      desc: "Autonomous agents and multi-agent orchestration using LangGraph (ReAct Agents, Stateful Workflows, Hierarchical Sub-Agents), CrewAI, and MCP-based tool integrations. Event-driven architectures with human-in-the-loop.",
    },
    {
      name: "LLM Fine-Tuning & RAG",
      desc: "QLoRA fine-tuning on Llama-3 and other open models. Production RAG pipelines with pgvector, Weaviate, Chroma, FAISS, and Neo4j knowledge graphs. Embedding strategies, re-ranking, and summarization.",
    },
    {
      name: "Multi-LLM Integration",
      desc: "Experience across OpenAI, Anthropic (Claude), AWS Bedrock, Google Vertex AI, Groq, and Ollama. Provider-agnostic architecture design with fallback and cost optimization.",
    },
    {
      name: "AI Observability & Audits",
      desc: "Decision-forensics platforms explaining non-deterministic pipeline behavior. AI system audits covering performance, safety, bias detection, and compliance. Custom evaluation pipelines.",
    },
    {
      name: "Desktop & Plugin Development",
      desc: "Windows desktop applications with C#/.NET Framework 4.8 / .NET 8.0, WPF/XAML, Revit API, Autodesk APS (Design Automation, OSS). Professional installers with WiX/Inno Setup and code signing.",
    },
    {
      name: "Backend & Infrastructure",
      desc: "REST APIs, GraphQL APIs, WebSockets, SSE. PostgreSQL schema design, query optimization, indexing, RLS, triggers. Docker containerization, CI/CD pipelines, GCP deployment.",
    },
    {
      name: "Security & Multi-Tenant",
      desc: "JWT authentication, OAuth2, Row-Level Security, Multi-Tenant data isolation, Role-Based Access Control, API security, and secure token management.",
    },
    {
      name: "Knowledge Graphs & Voice",
      desc: "Neo4j knowledge graph design, voice agent systems, semantic search with embeddings, and hybrid RAG architectures blending vector + graph databases for relationship-aware generation.",
    },
  ],
  faq: [
    {
      q: "What AI technologies do you work with?",
      a: "LangChain/LangGraph for agent orchestration, OpenAI SDK, Anthropic Claude, AWS Bedrock, Google Vertex AI, Groq, Ollama. QLoRA fine-tuning, RAG pipelines with pgvector/Weaviate/Chroma/FAISS, and Neo4j knowledge graphs.",
    },
    {
      q: "What's your development process?",
      a: "Problem discovery → architecture design → iterative build with check-ins → deploy with monitoring. Agile, structured, and transparent about timelines from the start.",
    },
    {
      q: "Do you work with startups or enterprises?",
      a: "Both. I've built MVPs for startups and production AI systems for established businesses. The scale adapts — the engineering rigour is constant.",
    },
    {
      q: "What desktop/plugin experience do you have?",
      a: "C#/.NET WPF apps, Revit API, Autodesk APS (Design Automation + OSS). Professional installers with WiX/Inno Setup and code signing. Production Windows desktop tooling.",
    },
    {
      q: "How do you handle agentic workflows?",
      a: "Event-driven architectures with LangGraph ReAct agents, hierarchical sub-agents, and MCP tool connections. Agents communicate through a central orchestrator with human-in-the-loop fallbacks and full observability.",
    },
    {
      q: "What's your typical turnaround?",
      a: "Small features: 1-2 weeks. Full web apps: 4-8 weeks. AI agent systems: 6-12 weeks. Desktop plugin projects: 4-10 weeks depending on API complexity.",
    },
  ],
};

export default function Page() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      {/* Capabilities List */}
      <section className="py-24 px-8 lg:px-16 border-b border-border-color">
        <div className="max-w-[1400px] w-full m-auto">
          <div className="mb-16">
            <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
              Services
            </span>
            <h1 className="font-title text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-none">
              Full Capability List
            </h1>
          </div>

          <div className="flex flex-col border-t border-border-color">
            {servicesData.capabilities.map((item, idx) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-[100px_2fr_3fr] gap-6 py-12 border-b border-border-color group hover:bg-foreground/[0.01] hover:px-6 transition-all duration-300 items-start"
              >
                <span className="font-title text-lg text-text-secondary opacity-40 group-hover:text-accent transition-colors duration-300">
                  0{idx + 1}
                </span>
                <span className="font-title text-2xl font-bold tracking-tight">
                  {item.name}
                </span>
                <p className="text-text-secondary leading-relaxed text-sm lg:text-base">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section
        id="faq"
        className="py-24 px-8 lg:px-16 border-b border-border-color"
      >
        <div className="max-w-[900px] w-full m-auto">
          <div className="mb-16 text-center">
            <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
              FAQ
            </span>
            <h2 className="font-title text-3xl md:text-5xl font-extrabold uppercase">
              Common Inquiries
            </h2>
          </div>

          <div className="flex flex-col border-t border-border-color">
            {servicesData.faq.map((faq, idx) => (
              <motion.div
                key={faq.q}
                variants={itemVariants}
                onClick={() => toggleFaq(idx)}
                className="border-b border-border-color py-8 cursor-pointer group"
              >
                <div className="flex justify-between items-center gap-6">
                  <span className="font-title text-lg md:text-xl font-bold group-hover:text-accent transition-colors duration-300">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaqIndex === idx ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-lg transition-colors duration-300 ${openFaqIndex === idx ? "text-accent" : "text-text-secondary opacity-40"}`}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, marginTop: 0, opacity: 0 }}
                      animate={{ height: "auto", marginTop: 16, opacity: 1 }}
                      exit={{ height: 0, marginTop: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
