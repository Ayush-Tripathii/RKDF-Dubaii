"use client";

import { useMemo, useState, type ReactNode } from "react";

/**
 * Filterable program finder. Cards are server-rendered and passed in keyed by slug;
 * this component only filters (so every card is in the HTML for crawlers).
 */
export function ProgramFinder({
  items,
  levels,
  schools,
  labels,
}: {
  items: { slug: string; level: string; school: string; card: ReactNode }[];
  levels: { id: string; label: string }[];
  schools: { id: string; label: ReactNode }[];
  labels: { level: string; school: string; all: string; showing: string; reset: string };
}) {
  const [level, setLevel] = useState("all");
  const [school, setSchool] = useState("all");
  const shown = useMemo(() => items.filter((x) => (level === "all" || x.level === level) && (school === "all" || x.school === school)), [items, level, school]);

  const pill = (active: boolean) =>
    `min-h-10 border px-4 text-sm font-medium transition-colors ${active ? "border-ink bg-ink text-canvas" : "border-line bg-surface text-ink hover:border-ink/40"}`;

  return (
    <div>
      <div className="grid gap-8 border-b border-line pb-8">
        <fieldset>
          <legend className="eyebrow">{labels.level}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {[{ id: "all", label: labels.all }, ...levels].map((l) => (
              <button key={l.id} type="button" aria-pressed={level === l.id} onClick={() => setLevel(l.id)} className={pill(level === l.id)}>
                {l.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="eyebrow">{labels.school}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {[{ id: "all", label: labels.all as ReactNode }, ...schools].map((s) => (
              <button key={s.id} type="button" aria-pressed={school === s.id} onClick={() => setSchool(s.id)} className={pill(school === s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm tabular" aria-live="polite">
            {labels.showing.replace("{n}", String(shown.length))}
          </p>
          {(level !== "all" || school !== "all") && (
            <button type="button" className="link-underline text-sm text-ink" onClick={() => { setLevel("all"); setSchool("all"); }}>
              {labels.reset}
            </button>
          )}
        </div>
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((x) => (
          <li key={x.slug} hidden={!shown.includes(x)}>
            {x.card}
          </li>
        ))}
      </ul>
    </div>
  );
}
