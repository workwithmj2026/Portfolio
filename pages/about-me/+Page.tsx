import { motion } from "framer-motion";

const aboutData = {
  narrative: {
    title: "Creative Developer",
    paragraph:
      "I bridge the gap between design and technology. Having grown up in a design-driven environment, I understand aesthetics, typography, and structure. I combine this eye for design with clean, performance-optimized, and interactive code to build high-end websites.",
  },
  timeline: [
    {
      stage: "Journey",
      text: "Started coding at a young age, developed projects for local clients, transitioned into a software engineering role, and later moved into full-time freelance creative development.",
    },
    {
      stage: "Background",
      text: "Deeply influenced by creative arts, I studied interface ergonomics, user-centric research, and visual theory. I believe collaboration is the key to creating unique digital products.",
    },
    {
      stage: "Formula",
      text: "Understand client goals -> Design custom wireframes -> Develop interactive prototypes -> Deliver high-performance, polished production sites on schedule.",
    },
  ],
  hobbies: [
    "Music Production 🎵",
    "Long Motorcycle Rides 🏍️",
    "Japan & Bali Exploration ✈️",
    "Cricket & Football Enthusiast ⚽",
    "Spotify Playlist Curator 🎧",
  ],
};

export default function Page() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
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
      {/* Narrative Section */}
      <section className="py-24 px-8 lg:px-16 border-b border-border-color">
        <div className="max-w-[1400px] w-full m-auto">
          <div className="mb-16">
            <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
              About Me
            </span>
            <h1 className="font-title text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-none">
              Creative Dev & UX Architect
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-center">
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[800px]"
            >
              {aboutData.narrative.paragraph}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="aspect-square max-w-[280px] w-full m-auto bg-gradient-to-br from-accent to-accent-secondary rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,240,255,0.2)]"
            >
              <span className="font-title text-4xl font-extrabold text-background select-none">
                RS
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24 px-8 lg:px-16 border-b border-border-color">
        <div className="max-w-[900px] w-full m-auto">
          <div className="mb-16 text-center">
            <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
              Milestones
            </span>
            <h2 className="font-title text-3xl md:text-5xl font-extrabold uppercase">
              My Journey
            </h2>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative pl-8 md:pl-16 before:content-[''] before:absolute before:left-[15px] before:md:left-[31px] before:top-0 before:w-[2px] before:height-full before:bg-border-color">
            {aboutData.timeline.map((item) => (
              <motion.div
                key={item.stage}
                variants={itemVariants}
                className="relative pb-12 last:pb-0 group"
              >
                {/* Glowing Dot */}
                <div className="absolute left-[-24px] md:left-[-54px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent shadow-[0_0_10px_var(--accent-glow)] transition-colors duration-300 z-10" />
                <h3 className="font-title text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight group-hover:text-accent transition-colors duration-300">
                  {item.stage}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite loop Hobbies Marquee */}
      <div className="overflow-hidden bg-white/[0.02] border-t border-b border-border-color py-12 w-full relative">
        <div className="flex gap-16 w-max animate-marquee">
          {/* Double list to loop seamlessly */}
          {[
            ...aboutData.hobbies,
            ...aboutData.hobbies,
            ...aboutData.hobbies,
          ].map((hobby, idx) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: intentional duplicate for infinite marquee
              key={`${hobby}-${idx}`}
              className="font-title text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white/30 hover:text-accent hover:shadow-glow transition-all duration-300 flex items-center gap-6 cursor-default select-none"
            >
              <span>{hobby}</span>
              <i className="fa-solid fa-asterisk text-sm opacity-40"></i>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
