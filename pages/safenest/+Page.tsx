import { motion } from "framer-motion";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), project: "safenest" }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-180px)] flex flex-col items-center justify-center overflow-hidden bg-[#0F1C3A]">
      {/* Flickering darkness overlay */}
      <div
        className="fixed inset-0 bg-black z-[999] pointer-events-none"
        style={{
          animation: "flicker-darkness 8s infinite",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Spotlight */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(46,125,50,0.06) 0%, rgba(15,28,58,0.97) 50%, #0F1C3A 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[3] text-center px-6 max-w-[450px] w-full py-16">
        {/* Logo area */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#2E7D32]/20 border border-[#2E7D32]/30 flex items-center justify-center">
            <i className="fa-solid fa-piggy-bank text-[#2E7D32] text-lg" />
          </div>
          <div>
            <h2 className="font-title text-base font-bold tracking-[2px] uppercase text-white">
              SafeNest
            </h2>
            <p className="text-[10px] tracking-[1px] uppercase text-[#2E7D32]/60">
              Invest with clarity
            </p>
          </div>
        </div>

        <h1 className="font-title text-xl md:text-2xl font-bold mb-3 tracking-[3px] uppercase text-white">
          Stop guessing. Start growing.
        </h1>
        <p className="text-white/40 mb-10 text-xs tracking-[1px] font-sans">
          Drop your email for early access to AI-powered investment guidance.
        </p>

        {success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/30 flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-check text-2xl text-[#2E7D32]" />
            </div>
            <p className="text-white font-bold text-lg">You're on the list.</p>
            <p className="text-white/40 text-xs mt-2">
              We'll notify you when SafeNest launches.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-white text-[#0F1C3A] py-4 px-5 text-sm font-sans text-center outline-none placeholder:text-[#888]"
              required
            />
            {error && <p className="text-red-400 text-xs -mt-2">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#D4AF77] text-[#0F1C3A] py-4 font-bold text-sm uppercase tracking-[2px] hover:bg-[#c9a267] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Get Early Access"}
            </button>

            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#2E7D32]/60" />
                <div className="w-2 h-2 rounded-full bg-[#D4AF77]/50" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
              <p className="text-[10px] tracking-[2px] uppercase text-white/10">
                SafeNest
              </p>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes flicker-darkness {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 0; }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 1; }
          75%, 75.999% { opacity: 0.85; }
          80%, 82% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
