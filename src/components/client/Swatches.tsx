"use client";

import { useSyncExternalStore } from "react";

/** Reads the live token values from :root and computes WCAG contrast against canvas and sand — no hex duplicated here. */
const lum = (hex: string) => {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

export function Swatches({ tokens }: { tokens: { name: string; role: string; sampled?: boolean }[] }) {
  const snapshot = useSyncExternalStore(
    () => () => {},
    () => tokens.map((t) => getComputedStyle(document.documentElement).getPropertyValue(`--${t.name}`).trim()).join("|"),
    () => "",
  );
  const vals: Record<string, string> = snapshot ? Object.fromEntries(tokens.map((t, i) => [t.name, snapshot.split("|")[i]])) : {};
  const canvas = vals.canvas;
  const sand = vals.sand;
  return (
    <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {tokens.map((t) => {
        const v = vals[t.name];
        return (
          <li key={t.name} className="bg-canvas">
            <div className="h-28 border-b border-line" style={{ background: `var(--${t.name})` }} />
            <div className="p-5 text-sm">
              <p className="flex items-center justify-between font-medium text-ink">
                --{t.name}
                {t.sampled && <span className="eyebrow text-accent-deep">Sampled</span>}
              </p>
              <p className="mt-1 font-mono text-xs uppercase" dir="ltr">{v || "…"}</p>
              <p className="mt-2">{t.role}</p>
              {v && canvas && (
                <p className="mt-2 font-mono text-xs tabular" dir="ltr">
                  {ratio(v, canvas).toFixed(2)}:1 canvas · {ratio(v, sand).toFixed(2)}:1 sand
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
