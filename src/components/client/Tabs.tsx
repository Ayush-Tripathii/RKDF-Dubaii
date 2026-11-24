"use client";

import { useId, useRef, useState, type ReactNode } from "react";

/** WAI-ARIA tabs with roving tabindex; arrow keys mirror in RTL. All panels stay in the HTML. */
export function Tabs({ label, tabs }: { label: string; tabs: { id: string; label: ReactNode; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const focusTab = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    refs.current[n]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const fwd = rtl ? "ArrowLeft" : "ArrowRight";
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    if (e.key === fwd) { e.preventDefault(); focusTab(active + 1); }
    else if (e.key === back) { e.preventDefault(); focusTab(active - 1); }
    else if (e.key === "Home") { e.preventDefault(); focusTab(0); }
    else if (e.key === "End") { e.preventDefault(); focusTab(tabs.length - 1); }
  };

  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="no-scrollbar -mx-[var(--gutter)] flex gap-8 overflow-x-auto border-b border-line px-[var(--gutter)] md:mx-0 md:px-0">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${uid}-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`relative -mb-px shrink-0 border-b py-4 text-[0.9375rem] font-medium transition-colors duration-300 ${
              i === active ? "border-accent text-ink" : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`${uid}-panel-${t.id}`} aria-labelledby={`${uid}-tab-${t.id}`} hidden={i !== active} tabIndex={0} className="pt-10 focus-visible:outline-offset-8">
          {t.content}
        </div>
      ))}
    </div>
  );
}
