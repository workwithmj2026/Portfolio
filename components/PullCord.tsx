import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef } from "react";

const N = 12; // rope nodes
const SEG = 15; // rest length per segment (px)
const GRAVITY = 0.38;
const DAMPING = 0.987;
const ITERS = 16; // constraint solving iterations (higher = stiffer rope)
const ANCHOR_Y = 80; // bottom of fixed navbar
const TRIGGER = 250; // pull distance from anchor to toggle theme
const MAX_PULL = 340; // max stretch distance
const BOB_RADIUS = 9;
const HIT_RADIUS = 30; // click detection radius around bob

type Node = { x: number; y: number; px: number; py: number };

export function PullCord() {
  const { resolvedTheme, setTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // All mutable sim state in refs — no re-renders during RAF
  const ropeRef = useRef({
    nodes: [] as Node[],
    anchor: { x: 0, y: ANCHOR_Y },
    isDragging: false,
    mouse: { x: 0, y: 0 },
    justToggled: false,
  });
  const themeRef = useRef(resolvedTheme);
  const setThemeRef = useRef(setTheme);
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);
  useEffect(() => {
    setThemeRef.current = setTheme;
  }, [setTheme]);

  const initRope = useCallback((ax: number) => {
    const r = ropeRef.current;
    r.anchor = { x: ax, y: ANCHOR_Y };
    r.nodes = Array.from({ length: N }, (_, i) => ({
      x: ax,
      y: ANCHOR_Y + i * SEG,
      px: ax + 0.01, // slight offset so gravity starts swinging immediately
      py: ANCHOR_Y + i * SEG - 0.01,
    }));
  }, []);

  // Physics + draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cx = window.innerWidth * 0.83;
      if (ropeRef.current.nodes.length === 0) {
        initRope(cx);
      } else {
        ropeRef.current.anchor.x = cx;
        const n0 = ropeRef.current.nodes[0];
        n0.x = cx;
        n0.px = cx;
        n0.y = ANCHOR_Y;
        n0.py = ANCHOR_Y;
      }
    };

    const simulate = () => {
      const r = ropeRef.current;
      const nodes = r.nodes;
      if (!nodes.length) return;

      // 1. Verlet integration + gravity (skip pinned node 0)
      for (let i = 1; i < N; i++) {
        const n = nodes[i];
        const vx = (n.x - n.px) * DAMPING;
        const vy = (n.y - n.py) * DAMPING;
        n.px = n.x;
        n.py = n.y;
        n.x += vx;
        n.y += vy + GRAVITY;
      }

      // 2. Override bob position when dragging
      if (r.isDragging) {
        const bob = nodes[N - 1];
        const dx = r.mouse.x - r.anchor.x;
        const dy = r.mouse.y - r.anchor.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const clamped = Math.min(d, MAX_PULL);
        const angle = Math.atan2(dy, dx);
        bob.x = r.anchor.x + Math.cos(angle) * clamped;
        bob.y = r.anchor.y + Math.sin(angle) * clamped;
        bob.px = bob.x;
        bob.py = bob.y;
      }

      // 3. Distance constraints
      for (let iter = 0; iter < ITERS; iter++) {
        // Pin anchor
        nodes[0].x = r.anchor.x;
        nodes[0].y = r.anchor.y;

        for (let i = 0; i < N - 1; i++) {
          const a = nodes[i],
            b = nodes[i + 1];
          const dx = b.x - a.x,
            dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const diff = (d - SEG) / d;
          const fx = dx * diff * 0.5;
          const fy = dy * diff * 0.5;
          if (i > 0) {
            a.x += fx;
            a.y += fy;
          }
          // Don't move dragged bob via constraints
          if (!(r.isDragging && i === N - 2)) {
            b.x -= fx;
            b.y -= fy;
          }
        }

        nodes[0].x = r.anchor.x;
        nodes[0].y = r.anchor.y;
      }
    };

    const draw = () => {
      const r = ropeRef.current;
      const nodes = r.nodes;
      const isDark = themeRef.current !== "light";

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!nodes.length) return;

      const bob = nodes[N - 1];
      const pullDist = Math.max(0, bob.y - r.anchor.y);
      const pullRatio = Math.min(1, pullDist / TRIGGER);

      // Rope base color
      const baseAlpha = 0.25 + pullRatio * 0.45;
      const ropeColor = isDark
        ? `rgba(255,255,255,${baseAlpha})`
        : `rgba(10,10,10,${baseAlpha})`;

      // Build smooth path through nodes
      const buildPath = () => {
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i < N - 1; i++) {
          const mx = (nodes[i].x + nodes[i + 1].x) / 2;
          const my = (nodes[i].y + nodes[i + 1].y) / 2;
          ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, mx, my);
        }
        ctx.lineTo(bob.x, bob.y);
      };

      // --- Rope glow (cyan, appears when approaching threshold) ---
      if (pullRatio > 0.25) {
        buildPath();
        const glowAlpha = ((pullRatio - 0.25) / 0.75) * 0.75;
        ctx.strokeStyle = `rgba(0,240,255,${glowAlpha})`;
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.filter = "blur(5px)";
        ctx.stroke();
        ctx.filter = "none";
      }

      // --- Rope base ---
      buildPath();
      ctx.strokeStyle = ropeColor;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // --- Threshold ring (shows where to pull to) ---
      if (r.isDragging && pullRatio < 1) {
        ctx.beginPath();
        ctx.arc(r.anchor.x, r.anchor.y + TRIGGER, 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,240,255,${0.2 + pullRatio * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // --- Anchor dot ---
      ctx.beginPath();
      ctx.arc(r.anchor.x, r.anchor.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
      ctx.fill();

      // --- Bob glow ---
      if (pullRatio > 0.4) {
        const g = ctx.createRadialGradient(
          bob.x,
          bob.y,
          0,
          bob.x,
          bob.y,
          BOB_RADIUS + 16,
        );
        const gA = (pullRatio - 0.4) / 0.6;
        g.addColorStop(0, `rgba(0,240,255,${gA * 0.5})`);
        g.addColorStop(1, "rgba(0,240,255,0)");
        ctx.beginPath();
        ctx.arc(bob.x, bob.y, BOB_RADIUS + 16, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // --- Bob body ---
      ctx.beginPath();
      ctx.arc(bob.x, bob.y, BOB_RADIUS, 0, Math.PI * 2);
      if (pullRatio >= 1) {
        ctx.fillStyle = "rgba(0,240,255,0.95)";
      } else {
        ctx.fillStyle = isDark
          ? "rgba(230,230,235,0.92)"
          : "rgba(18,18,20,0.92)";
      }
      ctx.fill();

      // Bob inner ring
      ctx.beginPath();
      ctx.arc(bob.x, bob.y, BOB_RADIUS - 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const loop = () => {
      simulate();
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [initRope]);

  // Pointer interaction (window-level since canvas is pointer-events-none)
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      // Don't hijack clicks on interactive page elements
      if (
        (e.target as HTMLElement).closest("a, button, input, select, textarea")
      )
        return;

      const r = ropeRef.current;
      const bob = r.nodes[N - 1];
      if (!bob) return;

      const dx = e.clientX - bob.x;
      const dy = e.clientY - bob.y;
      if (Math.sqrt(dx * dx + dy * dy) < HIT_RADIUS) {
        e.preventDefault();
        r.isDragging = true;
        r.mouse = { x: e.clientX, y: e.clientY };
        document.body.style.userSelect = "none";
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = ropeRef.current;
      if (!r.isDragging) return;
      r.mouse = { x: e.clientX, y: e.clientY };
    };

    const onUp = () => {
      const r = ropeRef.current;
      if (!r.isDragging) return;

      const bob = r.nodes[N - 1];
      const pullDist = bob.y - r.anchor.y;

      if (pullDist >= TRIGGER && !r.justToggled) {
        r.justToggled = true;
        setThemeRef.current(themeRef.current === "dark" ? "light" : "dark");
        setTimeout(() => {
          r.justToggled = false;
        }, 1000);
      }

      r.isDragging = false;
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[95]"
    />
  );
}
