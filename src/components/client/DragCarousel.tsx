"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "../Icon";

/**
 * Horizontal drag carousel.
 * - Touch: native scrolling (momentum + CSS snap).
 * - Mouse: drag with momentum, then snap.
 * - Keyboard: focus the region, ←/→ move one card (mirrored in RTL), Home/End.
 * - Visible progress rail + counter. Prev/next buttons.
 * - RTL-aware (negative scrollLeft). Reduced motion: no smooth scroll, no momentum.
 */
export function DragCarousel({
  items,
  label,
  prevLabel,
  nextLabel,
  hint,
  slideTemplate,
}: {
  items: ReactNode[];
  label: string;
  prevLabel: string;
  nextLabel: string;
  hint: string;
  /** e.g. "{current} of {total}" */
  slideTemplate: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number; lastX: number; lastT: number; v: number; moved: boolean; id: number } | null>(null);
  const suppressClick = useRef(false);
  const raf = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState({ thumb: 1, offset: 0, atStart: true, atEnd: false, index: 0 });

  const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isRTL = () => (trackRef.current ? getComputedStyle(trackRef.current).direction === "rtl" : false);

  const measure = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    const pos = Math.abs(t.scrollLeft);
    const thumb = t.scrollWidth > 0 ? Math.min(1, t.clientWidth / t.scrollWidth) : 1;
    const p = max > 0 ? pos / max : 0;
    const first = t.querySelector<HTMLElement>("[data-slide]");
    const step = first ? first.offsetWidth + 24 : 1;
    setState({ thumb, offset: p * (1 - thumb), atStart: pos <= 2, atEnd: pos >= max - 2, index: Math.min(items.length - 1, Math.round(pos / step)) });
  }, [items.length]);

  useEffect(() => {
    measure();
    const t = trackRef.current;
    if (!t) return;
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    return () => ro.disconnect();
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const first = t.querySelector<HTMLElement>("[data-slide]");
    const w = first ? first.offsetWidth + 24 : t.clientWidth * 0.8;
    t.scrollBy({ left: dir * w * (isRTL() ? -1 : 1), behavior: reduced() ? "auto" : "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const t = trackRef.current;
    if (!t) return;
    const rtl = isRTL();
    if (e.key === "ArrowRight") { e.preventDefault(); step(rtl ? -1 : 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(rtl ? 1 : -1); }
    else if (e.key === "Home") { e.preventDefault(); t.scrollTo({ left: 0, behavior: reduced() ? "auto" : "smooth" }); }
    else if (e.key === "End") { e.preventDefault(); t.scrollTo({ left: (rtl ? -1 : 1) * t.scrollWidth, behavior: reduced() ? "auto" : "smooth" }); }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !trackRef.current) return;
    cancelAnimationFrame(raf.current);
    drag.current = { x: e.clientX, scroll: trackRef.current.scrollLeft, lastX: e.clientX, lastT: performance.now(), v: 0, moved: false, id: e.pointerId };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const t = trackRef.current;
    if (!d || !t) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      setDragging(true);
      t.setPointerCapture(d.id);
    }
    if (d.moved) {
      t.scrollLeft = d.scroll - dx;
      const now = performance.now();
      const dt = Math.max(1, now - d.lastT);
      d.v = (e.clientX - d.lastX) / dt;
      d.lastX = e.clientX;
      d.lastT = now;
    }
  };

  const endDrag = () => {
    const d = drag.current;
    const t = trackRef.current;
    drag.current = null;
    if (!d || !t || !d.moved) return;
    suppressClick.current = true;
    setTimeout(() => (suppressClick.current = false), 0);
    let v = reduced() ? 0 : d.v * 16;
    const glide = () => {
      if (Math.abs(v) < 0.5) {
        setDragging(false); // re-enables snap → browser settles on nearest card
        return;
      }
      t.scrollLeft -= v;
      v *= 0.92;
      raf.current = requestAnimationFrame(glide);
    };
    glide();
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        aria-describedby="carousel-hint"
        className={`no-scrollbar relative flex gap-6 overflow-x-auto overscroll-x-contain px-[var(--gutter)] scroll-px-[var(--gutter)] focus-visible:outline-offset-[-2px] ${
          dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {items.map((item, i) => (
          <div
            key={i}
            data-slide
            role="group"
            aria-roledescription="slide"
            aria-label={slideTemplate.replace("{current}", String(i + 1)).replace("{total}", String(items.length))}
            className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[27%]"
          >
            {item}
          </div>
        ))}
        <div aria-hidden="true" className="w-px shrink-0" />
      </div>

      <div className="shell mt-10 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-line" aria-hidden="true">
          <div
            className="absolute inset-y-[-1px] start-0 bg-ink transition-[inset-inline-start] duration-150"
            style={{ width: `${state.thumb * 100}%`, insetInlineStart: `${state.offset * 100}%` }}
          />
        </div>
        <p className="eyebrow tabular min-w-[4.5rem] text-end" aria-live="polite">
          {String(state.index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={state.atStart} aria-label={prevLabel} className="flex size-12 items-center justify-center border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas disabled:pointer-events-none disabled:opacity-35">
            <Icon name="chevronLeft" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={state.atEnd} aria-label={nextLabel} className="flex size-12 items-center justify-center border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas disabled:pointer-events-none disabled:opacity-35">
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>
      <p id="carousel-hint" className="sr-only">
        {hint}
      </p>
    </div>
  );
}
