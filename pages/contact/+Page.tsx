import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");

  const handleNext = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) {
      alert("Please select an estimated budget.");
      return;
    }
    if (!details.trim()) {
      alert("Please enter your project details.");
      return;
    }
    setStep(3); // Success step
  };

  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <div className="w-full py-20 px-8 lg:px-16 flex items-center justify-center min-h-[calc(100vh-280px)]">
      <div className="max-w-[650px] w-full m-auto">
        <div className="text-center mb-12">
          <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
            Connect
          </span>
          <h1 className="font-title text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
            Let's build something
          </h1>
        </div>

        <div className="bg-card border border-border-color rounded-2xl p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden relative">
          <form onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait" custom={step}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={1}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  <h3 className="font-title text-xl font-bold uppercase tracking-wide text-foreground border-b border-border-color pb-3 mb-2">
                    Tell me about yourself
                  </h3>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="bg-foreground/[0.03] border border-border-color focus:border-accent focus:shadow-[0_0_10px_var(--c-accent-glow)] focus:bg-foreground/[0.05] rounded-lg p-4 font-sans text-foreground placeholder:text-text-secondary/40 outline-none transition-all duration-300 w-full"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="bg-foreground/[0.03] border border-border-color focus:border-accent focus:shadow-[0_0_10px_var(--c-accent-glow)] focus:bg-foreground/[0.05] rounded-lg p-4 font-sans text-foreground placeholder:text-text-secondary/40 outline-none transition-all duration-300 w-full"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="company"
                      className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Optional"
                      className="bg-foreground/[0.03] border border-border-color focus:border-accent focus:shadow-[0_0_10px_var(--c-accent-glow)] focus:bg-foreground/[0.05] rounded-lg p-4 font-sans text-foreground placeholder:text-text-secondary/40 outline-none transition-all duration-300 w-full"
                    />
                  </div>

                  <div className="mt-6 flex">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full sm:w-auto font-sans font-semibold text-background bg-foreground hover:bg-accent hover:shadow-[0_0_20px_var(--accent-glow)] rounded-full px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Next Step <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={2}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  <h3 className="font-title text-xl font-bold uppercase tracking-wide text-foreground border-b border-border-color pb-3 mb-2">
                    Project Details
                  </h3>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                      Estimated Budget *
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["under $5k", "$5k - $10k", "over $10k"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={`border rounded-lg py-4 px-2 text-center cursor-pointer transition-all duration-300 relative ${
                            budget === opt
                              ? "border-accent bg-accent/5 text-accent"
                              : "border-border-color bg-foreground/[0.03] hover:border-border-hover text-text-secondary"
                          }`}
                        >
                          <input
                            type="radio"
                            name="budget"
                            value={opt}
                            checked={budget === opt}
                            onChange={() => {}}
                            className="absolute opacity-0 pointer-events-none"
                            required
                          />
                          <span className="font-title text-sm font-medium tracking-tight select-none">
                            {opt}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="details"
                      className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      What are you looking to build? *
                    </label>
                    <textarea
                      id="details"
                      rows={5}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Tell me about your project, goals, and timeline..."
                      className="bg-foreground/[0.03] border border-border-color focus:border-accent focus:shadow-[0_0_10px_var(--c-accent-glow)] focus:bg-foreground/[0.05] rounded-lg p-4 font-sans text-foreground placeholder:text-text-secondary/40 outline-none transition-all duration-300 w-full resize-y"
                      required
                    />
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full sm:w-auto font-sans font-semibold border border-border-color hover:border-foreground text-text-secondary hover:text-foreground rounded-full px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto font-sans font-semibold text-background bg-foreground hover:bg-accent hover:shadow-[0_0_20px_var(--accent-glow)] rounded-full px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Send Request{" "}
                      <i className="fa-solid fa-paper-plane text-xs"></i>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="success"
                  custom={3}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center text-center py-8"
                >
                  <i className="fa-solid fa-circle-check text-5xl md:text-6xl text-accent mb-6 animate-pulse" />
                  <h3 className="font-title text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
                    Request Sent!
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base max-w-[400px] leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. I
                    will review your request and get back to you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}
