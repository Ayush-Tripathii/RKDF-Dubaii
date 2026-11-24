import type { ReactNode } from "react";
import { Tx } from "@/lib/tokens";

/** Stepper — horizontal on desktop, vertical on mobile. Ordered list semantics. */
export function Stepper({ steps, label }: { steps: { title: string; body: ReactNode }[]; label: string }) {
  return (
    <ol aria-label={label} className="grid gap-0 lg:grid-cols-5">
      {steps.map((s, i) => (
        <li key={s.title} data-reveal style={{ ["--i" as string]: i }} className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-6 lg:pb-0 lg:pe-6">
          {/* connector */}
          <span aria-hidden="true" className="absolute start-[19px] top-10 bottom-0 w-px bg-line lg:start-10 lg:end-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto [li:last-child>&]:hidden" />
          <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-accent bg-canvas font-display text-lg text-ink tabular">
            {i + 1}
          </span>
          <div>
            <h3 className="font-display text-display-4 font-normal">{s.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-ink-soft">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Accordion — native <details>, fully keyboard and screen-reader operable without JS. */
export function Accordion({ items, name }: { items: { id: string; title: ReactNode; content: ReactNode }[]; name?: string }) {
  return (
    <div className="border-t border-line">
      {items.map((it) => (
        <details key={it.id} name={name} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-start text-[1.0625rem] font-medium text-ink transition-colors hover:text-accent-deep [&::-webkit-details-marker]:hidden">
            <span>{it.title}</span>
            <span aria-hidden="true" className="relative size-4 shrink-0">
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
              <span className="absolute inset-y-0 start-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-editorial group-open:scale-y-0 rtl:translate-x-1/2" />
            </span>
          </summary>
          <div className="pb-6 text-[0.9375rem] text-ink-soft">{it.content}</div>
        </details>
      ))}
    </div>
  );
}

/** Marquee — CSS-only, pauses on hover/focus, static under reduced motion. */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  const row = (dup: boolean) => (
    <ul className={`flex shrink-0 items-center gap-4 pe-4 ${dup ? "marquee-dup" : ""}`} aria-hidden={dup || undefined}>
      {items.map((x) => (
        <li key={x} className="font-display flex h-20 w-56 shrink-0 items-center justify-center border border-line bg-surface px-4 text-center text-[1.0625rem] text-ink-soft">
          <Tx>{x}</Tx>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden" role="region" aria-label={label}>
      <div className="marquee-track flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function QuoteBlock({ quote, name, role, portrait }: { quote: string; name: string; role: ReactNode; portrait?: ReactNode }) {
  return (
    <figure className="grid gap-6 bg-sand p-6 sm:grid-cols-[120px_1fr] sm:gap-8 lg:p-10">
      {portrait && <div className="w-28 sm:w-full">{portrait}</div>}
      <div>
        <span aria-hidden="true" className="block h-px w-10 bg-accent" />
        <blockquote className="font-display mt-6 text-display-4 font-light text-ink">
          <p>
            <Tx>{quote}</Tx>
          </p>
        </blockquote>
        <figcaption className="mt-6 text-sm">
          <span className="block font-medium text-ink">
            <Tx>{name}</Tx>
          </span>
          <span className="text-ink-soft">{role}</span>
        </figcaption>
      </div>
    </figure>
  );
}

/** Full-bleed sand band with a single CTA. */
export function CTABand({ eyebrow, title, body, action, id }: { eyebrow: ReactNode; title: ReactNode; body?: ReactNode; action: ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="bg-sand section-pad">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <span aria-hidden="true" className="mt-4 block h-px w-12 bg-accent" />
          <h2 id={id} className="font-display mt-8 text-display-1 font-light">
            {title}
          </h2>
          {body && <p className="mt-6 text-lead text-ink-soft">{body}</p>}
        </div>
        <div className="lg:col-span-4 lg:justify-self-end" data-reveal style={{ ["--i" as string]: 1 }}>
          {action}
        </div>
      </div>
    </section>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 border border-line bg-surface/80 px-3 py-1.5 text-[0.8125rem] text-ink backdrop-blur-sm">{children}</span>;
}
