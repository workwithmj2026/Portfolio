import { motion } from "framer-motion";
import { useRef, useState } from "react";

const body = encodeURIComponent(
  `Hi Manjula, I'd like to schedule a call to discuss:`,
);

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      for (const [k, v] of Object.entries(form)) fd.append(k, v);
      if (file) fd.append("attachment", file);
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setSuccessMessage(data.message || "Booking received!");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero */}
      <section className="py-24 px-8 lg:px-16 border-b border-border-color">
        <div className="max-w-[800px] w-full m-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-title text-xs uppercase tracking-widest text-accent mb-4 inline-block"
          >
            Let's Build Something
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-title text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95] tracking-tighter mb-6 text-foreground"
          >
            Book a Call
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary leading-relaxed mb-8"
          >
            Pick a time that works for you. I'll review your project details
            beforehand so we can dive straight into what matters.
          </motion.p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 px-4 lg:px-16 border-b border-border-color bg-card">
        <div className="max-w-[700px] w-full m-auto">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background border border-border-color rounded-2xl p-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-calendar-check text-2xl text-accent" />
              </div>
              <h3 className="font-title text-2xl font-bold mb-2">
                Booking Received!
              </h3>
              <p className="text-text-secondary">{successMessage}</p>
            </motion.div>
          ) : (
            <div className="bg-background border border-border-color rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-border-color">
                <h2 className="font-title text-lg font-bold">
                  Schedule Your Call
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  30-minute video call to discuss your project
                </p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="bg-foreground/[0.03] border border-border-color focus:border-accent rounded-lg p-3.5 text-sm text-foreground placeholder:text-text-secondary/40 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      className="bg-foreground/[0.03] border border-border-color focus:border-accent rounded-lg p-3.5 text-sm text-foreground placeholder:text-text-secondary/40 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="date"
                      className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="bg-foreground/[0.03] border border-border-color focus:border-accent rounded-lg p-3.5 text-sm text-foreground placeholder:text-text-secondary/40 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="time"
                      className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Time *
                    </label>
                    <input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={(e) =>
                        setForm({ ...form, time: e.target.value })
                      }
                      className="bg-foreground/[0.03] border border-border-color focus:border-accent rounded-lg p-3.5 text-sm text-foreground placeholder:text-text-secondary/40 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="notes"
                    className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                  >
                    Project Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    className="bg-foreground/[0.03] border border-border-color focus:border-accent rounded-lg p-3.5 text-sm text-foreground placeholder:text-text-secondary/40 outline-none transition-all resize-y"
                  />
                </div>
                {/* File attachment */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Attach Files{" "}
                    <span className="normal-case opacity-50">
                      (optional — briefs, designs, specs)
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      const dropped = e.dataTransfer.files[0];
                      if (dropped) setFile(dropped);
                    }}
                    className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
                      dragging
                        ? "border-accent bg-accent/5"
                        : file
                          ? "border-accent/40 bg-accent/[0.03]"
                          : "border-border-color hover:border-border-hover bg-foreground/[0.02] hover:bg-foreground/[0.04]"
                    }`}
                  >
                    <i
                      className={`fa-solid text-xl transition-colors duration-300 ${file ? "fa-file-check text-accent" : "fa-cloud-arrow-up text-text-secondary"}`}
                    />
                    {file ? (
                      <span className="text-sm text-foreground font-medium">
                        {file.name}
                      </span>
                    ) : (
                      <span className="text-sm text-text-secondary">
                        Drop a file or{" "}
                        <span className="text-accent">browse</span>
                      </span>
                    )}
                    {file && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        className="text-xs text-text-secondary hover:text-red-400 transition-colors mt-1"
                      >
                        Remove
                      </button>
                    )}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip,.fig,.xd"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-semibold text-background bg-foreground hover:bg-accent hover:shadow-[0_0_20px_var(--accent-glow)] rounded-full py-4 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Book Your Call
                      <i className="fa-solid fa-arrow-right text-sm" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 px-8 lg:px-16 border-b border-border-color">
        <div className="max-w-[800px] w-full m-auto">
          <div className="mb-12 text-center">
            <span className="font-title text-xs uppercase tracking-widest text-accent mb-2 inline-block">
              The Process
            </span>
            <h2 className="font-title text-3xl md:text-5xl font-extrabold uppercase">
              What to Expect
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Discovery Call",
                desc: "30-minute video call. We discuss your project, goals, technical requirements, and timeline. No pressure, no pitch.",
              },
              {
                num: "02",
                title: "Proposal",
                desc: "Within 48 hours, you'll get a detailed proposal with architecture, scope, milestones, and transparent pricing.",
              },
              {
                num: "03",
                title: "Build & Ship",
                desc: "Once we align, I build and ship iteratively with regular check-ins. You see progress from day one.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background border border-border-color rounded-2xl p-6"
              >
                <span className="font-title text-3xl font-extrabold text-accent/20">
                  {item.num}
                </span>
                <h3 className="font-title text-lg font-bold mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick reach CTA */}
      <section className="py-24 px-8 lg:px-16">
        <div className="max-w-[600px] w-full m-auto text-center">
          <h2 className="font-title text-3xl md:text-4xl font-extrabold uppercase mb-4">
            Prefer to email first?
          </h2>
          <p className="text-text-secondary mb-8">
            Send your project details and I'll get back to you within 24 hours.
          </p>
          <a
            href={`mailto:workwithmj2026@gmail.com?subject=Project Inquiry&body=${body}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-background bg-foreground hover:bg-accent hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300"
          >
            <i className="fa-solid fa-envelope" />
            Email workwithmj2026@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}
