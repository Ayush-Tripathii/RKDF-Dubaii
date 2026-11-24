"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Icon } from "../Icon";

/** Testimonial slider — user-controlled only (no autoplay), announced politely to screen readers. */
export function TestimonialSlider({ slides, label, prevLabel, nextLabel, counterTemplate }: { slides: ReactNode[]; label: string; prevLabel: string; nextLabel: string; counterTemplate: string }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const go = (d: 1 | -1) => {
    setDir(d);
    setI((x) => (x + d + slides.length) % slides.length);
  };
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="relative min-h-[22rem] sm:min-h-[18rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={counterTemplate.replace("{current}", String(i + 1)).replace("{total}", String(slides.length))}
            initial={reduce ? false : { opacity: 0, x: 24 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 * dir }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {slides[i]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex items-center gap-6">
        <p className="eyebrow tabular">
          {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label={prevLabel} className="flex size-12 items-center justify-center border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas">
            <Icon name="chevronLeft" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label={nextLabel} className="flex size-12 items-center justify-center border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas">
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>
    </div>
  );
}
