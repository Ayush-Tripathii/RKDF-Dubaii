import Link from "next/link";
import type { ReactNode } from "react";
import { getRoute } from "@content/routes";
import type { Dict } from "@content/translations";
import type { Locale } from "@content/types";
import { href } from "@/lib/i18n";
import { Tx } from "@/lib/tokens";
import { Icon } from "./Icon";

/** Inner-page header: breadcrumb, numbered eyebrow, the page's single h1, lead. */
export function PageHeader({ locale, dict, path, eyebrow, title, lead, children }: { locale: Locale; dict: Dict; path: string; eyebrow: ReactNode; title: string; lead?: string; children?: ReactNode }) {
  const segs = path.split("/").filter(Boolean);
  const crumbs = segs.slice(0, -1).map((_, i) => "/" + segs.slice(0, i + 1).join("/"));
  return (
    <header className="border-b border-line pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="shell">
        <nav aria-label={dict.common.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href={href(locale, "")} className="link-underline">
                {dict.common.home}
              </Link>
            </li>
            {crumbs.map((c) => {
              const r = getRoute(c);
              return r ? (
                <li key={c} className="flex items-center gap-2">
                  <Icon name="chevronRight" size={14} className="text-ink-soft" />
                  <Link href={href(locale, c)} className="link-underline">
                    <Tx>{r.title[locale]}</Tx>
                  </Link>
                </li>
              ) : null;
            })}
            <li className="flex items-center gap-2" aria-current="page">
              <Icon name="chevronRight" size={14} className="text-ink-soft" />
              <span className="text-ink">
                <Tx>{title}</Tx>
              </span>
            </li>
          </ol>
        </nav>
        <div className="mt-14 max-w-5xl" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <span aria-hidden="true" className="mt-4 block h-px w-12 bg-accent" />
          <h1 className="font-display mt-8 text-display-1 font-light">
            <Tx>{title}</Tx>
          </h1>
          {lead && (
            <p className="mt-8 max-w-measure text-lead">
              <Tx>{lead}</Tx>
            </p>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}
