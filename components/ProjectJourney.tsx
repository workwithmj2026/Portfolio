import { motion } from "framer-motion";

interface Project {
  title: string;
  category: string;
  subtext: string;
  role: string;
  year: string;
  link?: string;
}

interface ProjectJourneyProps {
  projects: Project[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProjectJourney({ projects }: ProjectJourneyProps) {
  return (
    <section className="py-24 px-8 lg:px-16 border-b border-border-color">
      <div className="max-w-[1400px] w-full m-auto">
        <div className="mb-16">
          <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
            The Journey
          </span>
          <h2 className="font-title text-3xl md:text-5xl font-extrabold uppercase">
            Project Showcase
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                className="min-h-[75vh] flex items-center py-12 md:py-16 border-b border-border-color last:border-b-0 group cursor-pointer"
                onClick={() => {
                  if (project.link) window.location.href = project.link;
                }}
              >
                <div
                  className={`w-full flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
                >
                  {/* Image/Thumbnail Side */}
                  <div className="w-full lg:w-1/2">
                    <div className="aspect-[4/3] w-full bg-gradient-to-br from-card to-card-hover border border-border-color rounded-2xl overflow-hidden relative flex items-center justify-center group-hover:border-accent/30 transition-all duration-500 group-hover:scale-[1.02]">
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <motion.span
                        className="font-title text-3xl md:text-5xl font-extrabold uppercase text-text-secondary/30 group-hover:text-accent/40 transition-colors duration-500 select-none"
                        whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {project.title}
                      </motion.span>
                      <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-text-secondary/30">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-title text-4xl md:text-6xl font-extrabold text-text-secondary/15 select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="h-0.5 flex-1 bg-border-color" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">
                      {project.category}
                    </span>
                    <h3 className="font-title text-3xl md:text-5xl font-extrabold uppercase tracking-tight group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-[500px]">
                      {project.subtext}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-text-secondary/60 font-medium uppercase tracking-wider">
                        {project.role}
                      </span>
                      <span className="text-accent/40">—</span>
                      <span className="text-xs text-text-secondary/40">
                        {project.year}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary group-hover:text-accent transition-colors duration-300 cursor-pointer">
                        View Case Study
                        <i className="fa-solid fa-arrow-right-long text-xs group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="/work"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border-color text-text-secondary hover:border-accent hover:text-accent transition-all duration-300 font-title font-semibold text-sm uppercase tracking-wider"
          >
            Show All Projects
            <i className="fa-solid fa-arrow-right-long text-xs group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
