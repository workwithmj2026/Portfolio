import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const workData = {
  categories: [
    "All Works",
    "Shopify",
    "React / Next.JS",
    "Webflow / Framer",
    "Product Apps",
    "Playground",
  ],
  projects: [
    {
      title: "BreatheSpace",
      category: "Product Apps",
      subtext: "Burnout recovery app — AI stress detection, breathing resets, task re-prioritiser",
      role: "Full Product Design & Dev",
    },
    {
      title: "SafeNest",
      category: "Product Apps",
      subtext: "Investment guidance app — risk profiling, scenario simulation, portfolio tracker",
      role: "Full Product Design & Dev",
    },
    {
      title: "Modevelle",
      category: "Shopify",
      subtext: "Shopify Custom, Ecommerce",
      role: "Web Design & Development",
    },
    {
      title: "Mad World",
      category: "Shopify",
      subtext: "Shopify Custom, Ecommerce",
      role: "Web Development",
    },
    {
      title: "Portfolio '25",
      category: "React / Next.JS",
      subtext: "NextJs, Sanity CMS, GSAP",
      role: "Web Development",
    },
    {
      title: "The Shear Room",
      category: "React / Next.JS",
      subtext: "Next.js, Supabase, GSAP",
      role: "Web Development",
    },
    {
      title: "Jayesh portfolio",
      category: "Webflow / Framer",
      subtext: "Webflow, GSAP, scroll-effect",
      role: "Web Design & Development",
    },
    {
      title: "Depth Scroll",
      category: "Playground",
      subtext: "Scroll animation",
      role: "Demo Work",
    },
    {
      title: "3D Scroll",
      category: "Playground",
      subtext: "Scroll animation",
      role: "Demo Work",
    },
    {
      title: "Hover Effect",
      category: "Playground",
      subtext: "Hover effect",
      role: "Demo Work",
    },
    {
      title: "Immersive Sphere",
      category: "Playground",
      subtext: "Hover effect",
      role: "Demo Work",
    },
    {
      title: "SVG Path",
      category: "Playground",
      subtext: "Scroll animation",
      role: "Demo Work",
    },
    {
      title: "Scroll Video",
      category: "Playground",
      subtext: "Scroll animation",
      role: "Demo Work",
    },
    {
      title: "Section Morph",
      category: "Playground",
      subtext: "Scroll animation",
      role: "Demo Work",
    },
    {
      title: "Image Distortion",
      category: "Playground",
      subtext: "Scroll animation",
      role: "Demo Work",
    },
  ],
};

export default function Page() {
  const [activeFilter, setActiveFilter] = useState("All Works");

  const filteredProjects =
    activeFilter === "All Works"
      ? workData.projects
      : workData.projects.filter((proj) => {
          const normFilter = activeFilter
            .toLowerCase()
            .replace(/ \/ /g, "/")
            .split("/")[0]
            .trim();
          const normCategory = proj.category
            .toLowerCase()
            .replace(/ \/ /g, "/")
            .split("/")[0]
            .trim();
          return normCategory.includes(normFilter);
        });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full py-16 px-8 lg:px-16">
      <div className="max-w-[1400px] w-full m-auto">
        {/* Page Header */}
        <div className="mb-16">
          <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
            Portfolio
          </span>
          <h1 className="font-title text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-none">
            Selected Case Studies
          </h1>
        </div>

        {/* Filters pills row */}
        <div
          role="tablist"
          className="flex gap-3 overflow-x-auto pb-6 mb-12 scrollbar-none border-b border-border-color"
        >
          {workData.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeFilter === cat
                  ? "bg-foreground text-background font-semibold shadow-[0_0_15px_var(--c-accent-glow)]"
                  : "bg-foreground/[0.04] border border-border-color text-text-secondary hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.title}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                data-cursor="view"
                className="flex flex-col gap-6 group cursor-pointer"
              >
                {/* Image / Thumbnail wrapper */}
                <div className="aspect-[1.5] w-full bg-gradient-to-br from-card to-background border border-border-color rounded-xl overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%) opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="font-title text-2xl font-extrabold uppercase text-text-secondary opacity-40 group-hover:scale-105 group-hover:text-accent transition-all duration-400 select-none">
                    {proj.title}
                  </span>
                </div>

                {/* Details layout */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-text-secondary opacity-50">
                      {proj.category}
                    </span>
                    <h3 className="font-title text-xl font-bold">
                      {proj.title}
                    </h3>
                    <span className="text-xs text-text-secondary">
                      {proj.subtext}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary font-medium whitespace-nowrap opacity-60 group-hover:text-accent group-hover:opacity-100 transition-colors duration-300">
                    [ {proj.role} ]
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
