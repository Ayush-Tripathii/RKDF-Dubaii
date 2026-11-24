"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Dict } from "@content/translations";
import { fmt } from "@content/translations";
import type { Locale } from "@content/types";
import { Tx } from "@/lib/tokens";
import { buttonClass } from "../Button";
import { Icon } from "../Icon";
import { Dialog } from "./Dialog";
import { EnquiryForm, type FormOptions } from "./EnquiryForm";

export type SearchItem = { title: string; href: string; type: "program" | "school" | "page"; meta?: string };

type Ctx = { openEnquiry: (preset?: { program?: string; topic?: string }) => void; openSearch: () => void };
const UICtx = createContext<Ctx | null>(null);
export const useUI = () => {
  const c = useContext(UICtx);
  if (!c) throw new Error("useUI must be used inside <UIProvider>");
  return c;
};

export function UIProvider({ children, dict, locale, formOptions, searchIndex }: { children: ReactNode; dict: Dict; locale: Locale; formOptions: FormOptions; searchIndex: SearchItem[] }) {
  const [enquiry, setEnquiry] = useState<{ open: boolean; preset?: { program?: string; topic?: string }; key: number }>({ open: false, key: 0 });
  const [search, setSearch] = useState(false);
  const pathname = usePathname();

  // Routes stay mounted (Activity) — make sure overlays never survive a navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setSearch(false);
    setEnquiry((e) => ({ ...e, open: false }));
  }

  const openEnquiry = useCallback((preset?: { program?: string; topic?: string }) => setEnquiry((e) => ({ open: true, preset, key: e.key + 1 })), []);
  const openSearch = useCallback(() => setSearch(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "/" && !/input|textarea|select/i.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ openEnquiry, openSearch }), [openEnquiry, openSearch]);

  return (
    <UICtx.Provider value={value}>
      {children}
      <Dialog open={enquiry.open} onClose={() => setEnquiry((e) => ({ ...e, open: false }))} labelledBy="enquiry-title" closeLabel={dict.common.close}>
        <div className="overflow-y-auto p-6 sm:p-10">
          <p className="eyebrow">{dict.common.enquire}</p>
          <span aria-hidden="true" className="mt-3 block h-px w-10 bg-accent" />
          <h2 id="enquiry-title" className="font-display mt-6 text-display-3 font-light">
            {dict.forms.enquiryTitle}
          </h2>
          <p className="mt-3 mb-8">{dict.forms.enquiryIntro}</p>
          {enquiry.open && <EnquiryForm key={enquiry.key} dict={dict} locale={locale} options={formOptions} preset={enquiry.preset} />}
        </div>
      </Dialog>
      <Dialog open={search} onClose={() => setSearch(false)} labelledBy="search-title" closeLabel={dict.common.close} variant="top">
        {search && <SearchPanel dict={dict} locale={locale} index={searchIndex} />}
      </Dialog>
    </UICtx.Provider>
  );
}

function SearchPanel({ dict, index }: { dict: Dict; locale: Locale; index: SearchItem[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return index.filter((x) => (x.title + " " + (x.meta ?? "")).toLowerCase().includes(s)).slice(0, 12);
  }, [q, index]);
  const typeLabel = { program: dict.search.typeProgram, school: dict.search.typeSchool, page: dict.search.typePage };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[data-result]"));
    const input = e.currentTarget.querySelector<HTMLElement>("input");
    const all = input ? [input, ...links] : links;
    const i = all.indexOf(document.activeElement as HTMLElement);
    const next = e.key === "ArrowDown" ? Math.min(all.length - 1, i + 1) : Math.max(0, i - 1);
    e.preventDefault();
    all[next]?.focus();
  };

  return (
    <div className="flex max-h-[75vh] flex-col" onKeyDown={onKeyDown}>
      <div className="border-b border-line p-6 pe-16">
        <h2 id="search-title" className="eyebrow">
          {dict.search.title}
        </h2>
        <div className="mt-3 flex items-center gap-3">
          <Icon name="search" className="shrink-0 text-ink-soft" />
          <label htmlFor="site-search" className="sr-only">
            {dict.search.label}
          </label>
          <input
            id="site-search"
            type="search"
            autoFocus
            autoComplete="off"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={dict.search.placeholder}
            className="font-display w-full bg-transparent text-display-4 text-ink outline-none placeholder:text-ink-soft/70"
          />
        </div>
      </div>
      <div className="overflow-y-auto p-2">
        <p className="sr-only" aria-live="polite">
          {q ? (results.length ? fmt(dict.search.results, { n: results.length }) : fmt(dict.search.noResults, { q })) : ""}
        </p>
        {!q && <p className="p-4 text-sm">{dict.search.hint}</p>}
        {q && results.length === 0 && <p className="p-4 text-sm">{fmt(dict.search.noResults, { q })}</p>}
        <ul>
          {results.map((r) => (
            <li key={r.href}>
              <Link data-result href={r.href} className="flex items-baseline justify-between gap-4 px-4 py-3 text-ink transition-colors hover:bg-sand focus-visible:bg-sand">
                <span>
                  <Tx>{r.title}</Tx>
                  {r.meta && (
                    <span className="ms-2 text-sm text-ink-soft">
                      <Tx>{r.meta}</Tx>
                    </span>
                  )}
                </span>
                <span className="eyebrow shrink-0">{typeLabel[r.type]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Any element anywhere can open the enquiry modal. */
export function EnquireButton({ children, variant = "ghost", className = "", preset }: { children: ReactNode; variant?: "solid" | "ghost" | "ink" | "quiet"; className?: string; preset?: { program?: string; topic?: string } }) {
  const { openEnquiry } = useUI();
  return (
    <button type="button" onClick={() => openEnquiry(preset)} className={buttonClass(variant, className)} aria-haspopup="dialog">
      {children}
    </button>
  );
}

export function SearchButton({ label, className = "" }: { label: string; className?: string }) {
  const { openSearch } = useUI();
  return (
    <button type="button" onClick={openSearch} aria-label={label} aria-haspopup="dialog" className={`flex size-11 items-center justify-center text-ink transition-colors hover:text-accent-deep ${className}`}>
      <Icon name="search" />
    </button>
  );
}
