import { Fragment, type ReactNode } from "react";
import { DUMMY, DUMMY_MODE, dummyText } from "@content/dummy";

const TOKEN = /(\[\[[^\]]+\]\])/g;

export const hasToken = (s: string) => /\[\[[^\]]+\]\]/.test(s);

/**
 * Renders a content string.
 * - A [[TOKEN]] with a dummy value (content/dummy.ts, DUMMY_MODE) renders that value. Bilingual
 *   values render both languages; CSS shows the one matching the page direction.
 * - A [[TOKEN]] without a value renders as a visible placeholder marker.
 */
export function Tx({ children }: { children: string }): ReactNode {
  const parts = children.split(TOKEN);
  if (parts.length === 1) return children;
  return parts.map((part, i) => {
    if (!(part.startsWith("[[") && part.endsWith("]]"))) return <Fragment key={i}>{part}</Fragment>;
    const key = part.slice(2, -2);
    const v = DUMMY_MODE ? DUMMY[key] : undefined;
    if (typeof v === "string") return <Fragment key={i}>{v}</Fragment>;
    if (v)
      return (
        <Fragment key={i}>
          <span className="l-en">{v.en}</span>
          <span className="l-ar">{v.ar}</span>
        </Fragment>
      );
    return (
      <span key={i} className="ph" data-token={key}>
        {part}
      </span>
    );
  });
}

/** Interpolate {vars} into a template and render tokens. */
export function TxF({ template, vars }: { template: string; vars: Record<string, string | number> }) {
  const out = template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
  return <Tx>{out}</Tx>;
}

/** Plain-text resolution for attribute contexts (alt, aria-label, meta, JSON-LD, <option>). */
export const plain = (s: string, locale: "en" | "ar" = "en") =>
  s.replace(/\[\[([^\]]+)\]\]/g, (_, k) => dummyText(k, locale) ?? `[${k}]`);
