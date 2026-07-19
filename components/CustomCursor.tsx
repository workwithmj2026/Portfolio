import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hoverState, setHoverState] = useState<"none" | "link" | "view">(
    "none",
  );
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target or parent has a data-cursor attribute
      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "view") {
          setHoverState("view");
          setCursorText("VIEW");
          return;
        }
      }

      // Check if hovering over standard clickable elements
      const clickableTarget = target.closest(
        "a, button, .filter-pill, .faq-item, .budget-card",
      );
      if (clickableTarget) {
        setHoverState("link");
        return;
      }

      setHoverState("none");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Determine size and styling based on hover state
  const variants = {
    none: {
      width: 12,
      height: 12,
      backgroundColor: "#00f0ff",
      mixBlendMode: "normal" as const,
      boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
    },
    link: {
      width: 48,
      height: 48,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as const,
      boxShadow: "none",
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(0, 240, 255, 0.9)",
      mixBlendMode: "normal" as const,
      boxShadow: "0 0 25px rgba(0, 240, 255, 0.3)",
      color: "#0c0c0e",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 font-bold font-title select-none text-[10px] tracking-widest text-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={hoverState}
      variants={variants}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      {hoverState === "view" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
