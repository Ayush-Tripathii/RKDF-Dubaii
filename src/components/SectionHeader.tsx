import type { ReactNode } from "react";

/**
 * Editorial section opener: "01 · THE UNIVERSITY" + thin accent rule + serif h2.
 * `number` is passed from the page's ordered section list, so numbering is sequential by construction.
 */
export function SectionHeader({
  number,
  eyebrow,
  title,
  intro,
  id,
  action,
  wide = false,
  className = "",
}: {
  number?: number;
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
  action?: ReactNode;
  /** Title spans the full width of its container (for split layouts). */
  wide?: boolean;
  className?: string;
}) {
  return (
    <header className={`grid gap-8 lg:grid-cols-12 lg:gap-x-6 ${className}`}>
      <div className={wide ? "lg:col-span-12" : "lg:col-span-8"} data-reveal>
        <p className="eyebrow flex items-center gap-2">
          {number !== undefined && <span className="tabular text-accent-deep">{String(number).padStart(2, "0")}</span>}
          {number !== undefined && <span aria-hidden="true">·</span>}
          <span>{eyebrow}</span>
        </p>
        <span aria-hidden="true" className="mt-4 block h-px w-12 bg-accent" />
        <h2 id={id} className="font-display mt-8 text-display-2 font-light">
          {title}
        </h2>
      </div>
      {(intro || action) && (
        <div className="flex flex-col justify-end gap-6 lg:col-span-4" data-reveal style={{ ["--i" as string]: 1 }}>
          {intro && <p className="max-w-measure text-lead text-ink-soft">{intro}</p>}
          {action}
        </div>
      )}
    </header>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
