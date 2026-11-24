"use client";

import { useEffect, useRef, useState } from "react";

const fmtNum = (n: number) => n.toLocaleString("en-US");

/**
 * Renders the REAL value on the server. When scrolled into view (once), counts up from 60% of
 * the value to the value — no bounce, no overshoot. Width is reserved so nothing shifts.
 * Disabled under prefers-reduced-motion.
 */
export function StatNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const from = Math.round(value * 0.6);
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 4); // ease-out quart — monotonic, never overshoots
          setDisplay(Math.round(from + (value - from) * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(from);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const full = prefix + fmtNum(value) + suffix;
  return (
    <span ref={ref} className="inline-block max-w-full tabular" style={{ minWidth: `${full.length * 0.56}em` }}>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {prefix}
        {fmtNum(display)}
        {suffix}
      </span>
    </span>
  );
}
