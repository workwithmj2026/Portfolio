import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

function getThemeColors() {
  if (typeof document === "undefined") {
    return {
      accent: "#00f0ff",
      foreground: "#ffffff",
      background: "#0c0c0e",
      accentRgb: "0,240,255",
    };
  }
  const styles = getComputedStyle(document.documentElement);
  return {
    accent: styles.getPropertyValue("--c-accent").trim() || "#00f0ff",
    foreground: styles.getPropertyValue("--c-foreground").trim() || "#ffffff",
    background: styles.getPropertyValue("--c-background").trim() || "#0c0c0e",
    accentRgb: styles.getPropertyValue("--c-accent-rgb").trim() || "0,240,255",
  };
}

export function CustomCursor() {
  const [hoverState, setHoverState] = useState<"none" | "link" | "view">(
    "none",
  );
  const [cursorText, setCursorText] = useState("");
  const [colors, setColors] = useState(() => getThemeColors());
  const [visible, setVisible] = useState(true);
  const touchRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const updateColors = useCallback(() => setColors(getThemeColors()), []);

  useEffect(() => {
    updateColors();
    const observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [updateColors]);

  useEffect(() => {
    const handleTouch = () => {
      touchRef.current = true;
      setVisible(false);
    };
    window.addEventListener("touchstart", handleTouch, { once: true });

    const moveCursor = (e: MouseEvent) => {
      if (touchRef.current) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (touchRef.current) return;
      const target = e.target as HTMLElement;
      if (!target) return;

      if (target.closest("h1, h2, h3, h4, h5, h6")) {
        setHoverState("link");
        return;
      }

      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "view") {
          setHoverState("view");
          setCursorText("VIEW");
          return;
        }
      }

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
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden items-center justify-center -translate-x-1/2 -translate-y-1/2 font-bold font-title select-none text-[10px] tracking-widest text-center md:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={hoverState}
      variants={{
        none: {
          width: 12,
          height: 12,
          backgroundColor: colors.accent,
          mixBlendMode: "normal" as const,
          boxShadow: `0 0 10px rgba(${colors.accentRgb}, 0.5)`,
        },
        link: {
          width: 48,
          height: 48,
          backgroundColor: colors.foreground,
          mixBlendMode: "difference" as const,
          boxShadow: "none",
        },
        view: {
          width: 80,
          height: 80,
          backgroundColor: `rgba(${colors.accentRgb}, 0.9)`,
          mixBlendMode: "normal" as const,
          boxShadow: `0 0 25px rgba(${colors.accentRgb}, 0.3)`,
          color: colors.background,
        },
      }}
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
