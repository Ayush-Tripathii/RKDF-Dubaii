import type { Locale, Stat } from "@content/types";
import { dummyNumber } from "@content/dummy";
import { Tx } from "@/lib/tokens";
import { StatNumber } from "./client/StatNumber";

/**
 * Stat grid with hairline dividers (1px gap over a line-coloured ground).
 * Confirmed values are real numbers in the server HTML — count-up is progressive enhancement.
 * Unconfirmed values render their [[TOKEN]] — never "0" or "0+".
 */
export function StatBlock({ stats, locale, columns = 3, tone = "canvas" }: { stats: Stat[]; locale: Locale; columns?: 2 | 3 | 4; tone?: "canvas" | "sand" }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  const cell = tone === "sand" ? "bg-sand" : "bg-canvas";
  return (
    <dl className={`grid grid-cols-1 gap-px border-y border-line bg-line ${cols}`}>
      {stats.map((raw, i) => {
        // Unconfirmed stats fall back to a numeric dummy value (content/dummy.ts) while DUMMY_MODE is on.
        const s = raw.value === null && dummyNumber(raw.token) !== null ? { ...raw, value: dummyNumber(raw.token) } : raw;
        return (
        <div key={s.key} data-reveal style={{ ["--i" as string]: i % columns }} className={`flex flex-col gap-3 py-8 sm:px-8 sm:[&:last-child:nth-child(odd)]:col-span-2 ${columns !== 2 ? "lg:[&:last-child:nth-child(odd)]:col-span-1" : ""} ${cell}`}>
          <dt className="order-2 text-[0.9375rem] font-medium text-ink">{s.label[locale]}</dt>
          <dd className="order-1 flex min-h-[1em] items-end font-display text-stat font-light text-accent tabular">
            {s.value !== null ? (
              <StatNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
            ) : (
              <span className="font-sans text-base leading-tight">
                <Tx>{(s.prefix ?? "") + s.token + (s.suffix ?? "")}</Tx>
              </span>
            )}
          </dd>
          <dd className="order-3 text-sm text-ink-soft">
            <Tx>{s.qualifier[locale]}</Tx>
          </dd>
        </div>
        );
      })}
    </dl>
  );
}
