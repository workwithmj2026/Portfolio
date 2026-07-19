import { motion } from "framer-motion";
import { useState } from "react";

const lamps = [
  { top: "30%", left: "12%", scale: 1, opacity: 0.6 },
  { top: "65%", left: "88%", scale: 0.8, opacity: 0.5 },
  { top: "20%", left: "78%", scale: 0.5, opacity: 0.35 },
  { top: "78%", left: "22%", scale: 1.2, opacity: 0.55 },
  { top: "45%", left: "92%", scale: 0.6, opacity: 0.3 },
  { top: "12%", left: "45%", scale: 0.4, opacity: 0.25 },
  { top: "85%", left: "55%", scale: 0.7, opacity: 0.4 },
  { top: "55%", left: "8%", scale: 0.9, opacity: 0.45 },
];

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
        body: JSON.stringify({ email: email.trim(), project: "breathespace" }),
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
    <div className="relative w-full min-h-[calc(100vh-180px)] flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
      {/* Flickering darkness overlay */}
      <div
        className="fixed inset-0 bg-black z-[999] pointer-events-none"
        style={{
          animation: "flicker-darkness 6s infinite",
          // Inline keyframes get handled via the <style> tag below
        }}
      />

      {/* Distant lamps */}
      <div className="absolute inset-0 z-[1]">
        {lamps.map((l) => (
          <div
            key={`lamp-${l.top}-${l.left}`}
            className="absolute rounded-full"
            style={{
              top: l.top,
              left: l.left,
              width: "3px",
              height: "3px",
              background: "#C8A2C8",
              boxShadow: "0 0 15px 5px rgba(200, 162, 200, 0.25)",
              opacity: l.opacity,
              transform: `scale(${l.scale})`,
            }}
          />
        ))}
      </div>

      {/* Spotlight */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 162, 200, 0.04) 0%, rgba(0,0,0,0.95) 45%, #050505 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[3] text-center px-6 max-w-[450px] w-full py-16">
        <h1 className="font-title text-2xl md:text-3xl font-bold mb-3 tracking-[3px] uppercase text-white">
          Are you ready?
        </h1>
        <p className="text-[#888] mb-10 text-xs tracking-[1px] font-sans">
          Drop your email to get the key when the doors open.
        </p>

        {success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#C8A2C8]/10 border border-[#C8A2C8]/30 flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-key text-2xl text-[#C8A2C8]" />
            </div>
            <p className="text-white font-bold text-lg">You're on the list.</p>
            <p className="text-[#888] text-xs mt-2">
              We'll be in touch when the doors open.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-[#EDE0D4] text-[#080808] py-4 px-5 text-sm font-sans text-center outline-none placeholder:text-[#555]"
              required
            />
            {error && <p className="text-red-400 text-xs -mt-2">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#C8A2C8] text-[#080808] py-4 font-bold text-sm uppercase tracking-[2px] hover:bg-[#b492b4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Let Me In"}
            </button>

            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#C8A2C8]/50" />
                <div className="w-2 h-2 rounded-full bg-[#A5D6FF]/40" />
                <div className="w-2 h-2 rounded-full bg-[#EDE0D4]/40" />
              </div>
              <p className="text-[10px] tracking-[2px] uppercase text-white/15">
                BreatheSpace
              </p>
            </div>
          </form>
        )}
      </div>

      {/* Inline flicker keyframes */}
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
