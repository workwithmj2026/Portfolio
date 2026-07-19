import { motion } from "framer-motion";
import { useState } from "react";

const homeData = {
  hero: {
    pretitle: "Lorem Ipsum Dolor",
    heading: "Creative Developer & UX Architect",
    description:
      "Building custom digital experiences with design-first approach. Combining interactive details, robust performance, and visual polish.",
    counters: [
      { count: "20+", label: "Projects Completed" },
      { count: "15+", label: "Happy Clients" },
    ],
  },
  showreel: [
    { title: "Modevelle Custom", desc: "Shopify Ecommerce | UI/UX Design" },
    {
      title: "Interactive Portfolio '25",
      desc: "Next.js, Sanity, GSAP animations",
    },
    { title: "Immersive Sphere", desc: "WebGL and Three.js 3D demonstration" },
  ],
  skills: [
    {
      name: "Creative Dev",
      items: [
        "Next.js",
        "React",
        "Three.js",
        "GSAP",
        "WebGL",
        "Webflow",
        "Framer",
        "Shopify",
        "Tailwind",
        "Git",
      ],
    },
    {
      name: "Design",
      items: [
        "Figma",
        "UI/UX Design",
        "Wireframing",
        "Prototyping",
        "Brand Design",
      ],
    },
    {
      name: "Backend & Cloud",
      items: ["Node.js", "Express", "MongoDB", "SQL", "Supabase", "Firebase"],
    },
  ],
  services: [
    {
      name: "Web Development",
      desc: "Building high-performance, robust, and custom web applications.",
    },
    {
      name: "UI/UX Design",
      desc: "Crafting beautiful, user-centered wireframes and visual design layouts.",
    },
    {
      name: "Interactive Animations",
      desc: "Adding custom, immersive micro-interactions using GSAP and CSS.",
    },
  ],
};

export default function Page() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [heroInverted, setHeroInverted] = useState(false);

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
      <section
        className={`min-h-[calc(100vh-80px)] flex items-center relative py-12 lg:py-24 px-8 lg:px-16 border-b transition-colors duration-700 ${heroInverted ? "hero-inverted" : ""}`}
        style={{
          backgroundColor: heroInverted ? "var(--hero-bg)" : undefined,
          color: heroInverted ? "var(--hero-text)" : undefined,
          borderBottomColor: heroInverted ? "var(--hero-border)" : undefined,
          backgroundImage: !heroInverted
            ? "radial-gradient(circle at 70% 30%, rgba(0,240,255,0.05) 0%, transparent 60%)"
            : undefined,
        }}
      >
        <button
          type="button"
          onClick={() => setHeroInverted((v) => !v)}
          className="absolute top-6 right-8 z-10 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium uppercase tracking-wider transition-all duration-300"
          style={{
            borderColor: heroInverted
              ? "var(--hero-border)"
              : "var(--color-border-color)",
            color: heroInverted
              ? "var(--hero-text-secondary)"
              : "var(--color-text-secondary)",
          }}
          title={heroInverted ? "Switch to dark" : "Switch to light"}
        >
          <span
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${heroInverted ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" : "bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.5)]"}`}
          />
          {heroInverted ? "Dark" : "Light"}
        </button>
        <div className="max-w-[1400px] w-full m-auto flex flex-col justify-center gap-12">
          <div className="max-w-[1000px]">
            <motion.span
              variants={itemVariants}
              className="font-title text-sm uppercase tracking-widest mb-4 inline-block font-semibold"
              style={{ color: heroInverted ? "var(--hero-accent)" : undefined }}
            >
              {homeData.hero.pretitle}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="font-title text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.95] tracking-tighter mb-8"
              style={{ color: heroInverted ? "var(--hero-text)" : undefined }}
            >
              {homeData.hero.heading}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl max-w-[650px] leading-relaxed"
              style={{
                color: heroInverted ? "var(--hero-text-secondary)" : undefined,
              }}
            >
              {homeData.hero.description}
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mt-8 pt-8"
            style={{
              borderTopColor: heroInverted ? "var(--hero-border)" : undefined,
            }}
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("showreel")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group"
              style={{
                borderColor: heroInverted
                  ? "var(--hero-border)"
                  : "var(--color-border-color)",
                borderWidth: "1px",
                borderStyle: "solid",
                color: heroInverted ? "var(--hero-text)" : undefined,
              }}
            >
              <span>Scroll</span>
              <i
                className="fa-solid fa-arrow-down group-hover:translate-y-1 transition-transform duration-300"
                style={{
                  color: heroInverted ? "var(--hero-accent)" : undefined,
                }}
              />
            </button>
            <div className="flex gap-12 lg:gap-16">
              {homeData.hero.counters.map((c) => (
                <div key={c.label} className="flex flex-col">
                  <span
                    className="font-title text-4xl md:text-5xl font-extrabold"
                    style={{
                      color: heroInverted ? "var(--hero-accent)" : undefined,
                    }}
                  >
                    {c.count}
                  </span>
                  <span
                    className="text-[10px] md:text-xs uppercase tracking-widest mt-1"
                    style={{
                      color: heroInverted
                        ? "var(--hero-text-secondary)"
                        : undefined,
                    }}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Selected Works Showreel */}
      <section
        id="showreel"
        className="py-24 px-8 lg:px-16 border-b border-border-color overflow-hidden"
      >
        <div className="max-w-[1400px] w-full m-auto">
          <div className="mb-16">
            <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
              Showcase
            </span>
            <h2 className="font-title text-3xl md:text-5xl font-extrabold uppercase">
              Selected Works
            </h2>
          </div>

          {/* Draggable/Scrollable Showreel container */}
          <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
            {homeData.showreel.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                data-cursor="view"
                onClick={() => (window.location.href = "/work")}
                className="flex-shrink-0 w-[300px] sm:w-[400px] lg:w-[450px] h-[320px] bg-card border border-border-color hover:border-accent hover:-translate-y-2 rounded-xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-pointer snap-start group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-title text-lg font-bold text-text-secondary opacity-40">
                  0{idx + 1}
                </span>
                <div className="z-10 mt-auto">
                  <h3 className="font-title text-2xl font-extrabold mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
                <h3 className="font-title text-lg font-bold mb-6 uppercase tracking-wider text-white border-b border-border-color pb-3">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-white/[0.03] border border-border-color hover:border-accent hover:text-accent hover:bg-accent/5 rounded-full px-3 py-1.5 transition-all duration-300 text-text-secondary cursor-default"
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
                className="grid grid-cols-1 lg:grid-cols-[100px_1fr_auto] gap-4 py-8 border-b border-border-color items-center cursor-pointer transition-all duration-300 hover:px-6 hover:bg-white/[0.01]"
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
