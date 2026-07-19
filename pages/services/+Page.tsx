import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const servicesData = {
  heading: "Comprehensive Services",
  capabilities: [
    {
      name: "Web Development",
      desc: "Building high-performance, robust, and custom web applications utilizing modern stacks like React, Next.js, and Node.js. Tailored for scalability and speed.",
    },
    {
      name: "UI/UX Design",
      desc: "Crafting beautiful, user-centered wireframes and visual design layouts in Figma. Mapping optimal user flows to increase conversion and interaction rate.",
    },
    {
      name: "Shopify Development",
      desc: "Creating fully customized Shopify stores with unique Liquid coding, product schema optimizations, and custom theme designs for ecommerce success.",
    },
    {
      name: "No Code (Webflow & Framer)",
      desc: "Developing visual-first web platforms inside Webflow and Framer. Seamless responsive builds combined with powerful CMS capabilities.",
    },
    {
      name: "Interactive Animations",
      desc: "Adding custom, immersive micro-interactions using GSAP, CSS, and keyframe loops to capture user attention and tell stories.",
    },
    {
      name: "3D Experiences",
      desc: "Integrating interactive 3D WebGL scenes, shader distortion effects, and custom environments using Three.js and React Three Fiber.",
    },
    {
      name: "Backend & CMS",
      desc: "Configuring robust headless CMS backends like Sanity, Strapi, or Supabase. Provisioning structured database schemas and REST/GraphQL APIs.",
    },
    {
      name: "SEO Optimization",
      desc: "Auditing and optimizing technical speed scores, search indexing, meta tags, and structured schema markup to rank first on search engines.",
    },
    {
      name: "AI Search Optimization (AISO)",
      desc: "Structuring and indexing site contents so modern AI engines (like ChatGPT, Gemini, and Perplexity) can crawl, identify, and reference your business easily.",
    },
  ],
  faq: [
    {
      q: "What is your project timeline?",
      a: "Typically, a website project takes between 2 to 6 weeks, depending on the complexity of design and features required.",
    },
    {
      q: "Do you design websites in Figma first?",
      a: "Yes. Every project begins with mapping UX workflows, designing layouts, and prototype wireframes in Figma for client review before coding.",
    },
    {
      q: "Which platforms do you build on?",
      a: "I specialize in Next.js, React, Shopify Custom Liquid, and No-Code platforms like Webflow and Framer.",
    },
    {
      q: "Can you integrate custom 3D animations?",
      a: "Absolutely. I implement 3D experiences using Three.js, WebGL, and animate them dynamically using GSAP ScrollTrigger.",
    },
    {
      q: "Do you provide post-launch support?",
      a: "Yes, I offer a support window post-launch, alongside options for monthly maintenance retainers.",
    },
    {
      q: "What is AI Search Optimization (AISO)?",
      a: "It involves structuring and indexing your content so AI engines like Perplexity, ChatGPT, and Gemini find, extract, and reference your business easily.",
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
