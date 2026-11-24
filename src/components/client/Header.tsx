"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@content/types";
import { Tx } from "@/lib/tokens";
import { buttonClass } from "../Button";
import { Icon } from "../Icon";
import { Dialog } from "./Dialog";
import { EnquireButton, SearchButton } from "./UIProvider";

export type NavLink = { label: string; href: string };
export type HeaderNavItem = {
  key: string;
  label: string;
  href: string;
  mega?: {
    overview: NavLink;
    columns: { heading: string; links: NavLink[] }[];
    featured: { eyebrow: string; title: string; href: string; image: string; imageW: number; imageH: number };
  };
};

export type HeaderLabels = {
  siteName: string;
  home: string;
  mainNav: string;
  search: string;
  enquire: string;
  apply: string;
  openMenu: string;
  closeMenu: string;
  menu: string;
  switchTo: string;
  switchToLabel: string;
};

const LOCALE_COOKIE = "NEXT_LOCALE";

export function Header({ locale, items, labels }: { locale: Locale; items: HeaderNavItem[]; labels: HeaderLabels }) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close menus when the route changes (adjust state during render — React-recommended over an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const k = open;
        setOpen(null);
        document.getElementById(`nav-btn-${k}`)?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const hoverOpen = (k: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(k), 90);
  };
  const hoverClose = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(null), 160);
  };

  const other: Locale = locale === "en" ? "ar" : "en";
  const switchHref = `/${other}${pathname.replace(/^\/(en|ar)(?=\/|$)/, "")}`;
  const rememberLocale = () => {
    document.cookie = `${LOCALE_COOKIE}=${other}; path=/; max-age=31536000; samesite=lax`;
    try {
      localStorage.setItem(LOCALE_COOKIE, other);
    } catch {}
  };

  const solid = scrolled || !isHome || open !== null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-500 ease-editorial ${
          solid ? "border-b border-line bg-canvas/95 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Lockup locale={locale} name={labels.siteName} homeLabel={labels.home} />

          <nav aria-label={labels.mainNav} className="hidden h-full xl:block">
            <ul className="flex h-full items-stretch gap-1">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex items-stretch"
                  onPointerEnter={item.mega ? (e) => e.pointerType === "mouse" && hoverOpen(item.key) : undefined}
                  onPointerLeave={item.mega ? (e) => e.pointerType === "mouse" && hoverClose() : undefined}
                  onBlur={
                    item.mega
                      ? (e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen((o) => (o === item.key ? null : o));
                        }
                      : undefined
                  }
                >
                  {item.mega ? (
                    <>
                      <button
                        id={`nav-btn-${item.key}`}
                        type="button"
                        aria-expanded={open === item.key}
                        aria-controls={`mega-${item.key}`}
                        onClick={() => setOpen((o) => (o === item.key ? null : item.key))}
                        className={`relative flex items-center gap-1 px-2.5 text-[0.9375rem] whitespace-nowrap 2xl:px-3 font-medium text-ink transition-colors hover:text-accent-deep ${
                          pathname.startsWith(`/${locale}${item.href}`) ? "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-accent" : ""
                        }`}
                      >
                        {item.label}
                        <Icon name="chevronDown" size={16} className={`transition-transform duration-300 ${open === item.key ? "rotate-180" : ""}`} />
                      </button>
                      <MegaPanel item={item} open={open === item.key} onPointerEnter={() => hoverOpen(item.key)} onPointerLeave={hoverClose} />
                    </>
                  ) : (
                    <Link
                      href={`/${locale}${item.href}`}
                      aria-current={pathname.startsWith(`/${locale}${item.href}`) ? "page" : undefined}
                      className="relative flex items-center px-2.5 text-[0.9375rem] whitespace-nowrap 2xl:px-3 font-medium text-ink transition-colors hover:text-accent-deep aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-accent"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <SearchButton label={labels.search} />
            <Link
              href={switchHref}
              hrefLang={other}
              lang={other}
              onClick={rememberLocale}
              aria-label={labels.switchToLabel}
              className="hidden h-11 items-center px-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent-deep sm:flex"
            >
              <span aria-hidden="true" className={locale === "ar" ? "font-arabic text-ink-soft" : "text-ink-soft"}>{locale === "en" ? "EN" : "عربي"}</span>
              <span aria-hidden="true" className="mx-1.5 text-line">|</span>
              <span lang={other} className={other === "ar" ? "font-arabic" : ""}>{labels.switchTo}</span>
            </Link>
            <EnquireButton variant="ghost" className="min-h-11 px-5 max-lg:hidden">
              {labels.enquire}
            </EnquireButton>
            <Link href={`/${locale}/apply`} className={buttonClass("solid", "min-h-11 px-5 max-sm:hidden")}>
              {labels.apply}
            </Link>
            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-label={labels.openMenu}
              aria-haspopup="dialog"
              className="flex size-11 items-center justify-center text-ink xl:hidden"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <Dialog open={mobile} onClose={() => setMobile(false)} labelledBy="mobile-menu-title" closeLabel={labels.closeMenu} variant="full">
        <div className="flex h-full flex-col overflow-y-auto bg-canvas">
          <div className="shell flex h-[var(--header-h)] shrink-0 items-center border-b border-line pe-16">
            <Lockup locale={locale} name={labels.siteName} homeLabel={labels.home} />
            <h2 id="mobile-menu-title" className="sr-only">
              {labels.menu}
            </h2>
          </div>
          <nav aria-label={labels.mainNav} className="shell flex-1 py-8">
            <ul>
              {items.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={mobile ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.08 + i * 0.06 }}
                  className="border-b border-line"
                >
                  {item.mega ? (
                    <details className="group">
                      <summary className="font-display flex cursor-pointer list-none items-center justify-between py-4 text-display-3 font-light text-ink [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <Icon name="chevronDown" className="transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <ul className="grid gap-1 pb-6">
                        {[item.mega.overview, ...item.mega.columns.flatMap((c) => c.links)].map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="block py-2 text-[1.0625rem] text-ink-soft hover:text-ink">
                              <Tx>{l.label}</Tx>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={`/${locale}${item.href}`} className="font-display block py-4 text-display-3 font-light text-ink">
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="shell grid shrink-0 gap-4 border-t border-line py-6">
            <Link href={switchHref} hrefLang={other} lang={other} onClick={rememberLocale} className={buttonClass("quiet", "justify-self-start")}>
              {labels.switchToLabel}
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <EnquireButton variant="ghost">{labels.enquire}</EnquireButton>
              <Link href={`/${locale}/apply`} className={buttonClass("solid")}>
                {labels.apply}
              </Link>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function Lockup({ locale, name, homeLabel }: { locale: Locale; name: string; homeLabel: string }) {
  return (
    <Link href={`/${locale}`} className="flex shrink-0 items-center gap-4" aria-label={`${name} — ${homeLabel}`}>
      {/* Supplied crest — unaltered. Clear space is enforced by the gap + rule. */}
      <Image src="/brand/rkdf-crest.png" alt="" width={172} height={251} preload className="h-11 w-auto lg:h-[52px]" />
      <span aria-hidden="true" className="h-9 w-px bg-line" />
      <span className="font-display text-[1.0625rem] leading-[1.1] font-normal text-ink lg:text-[1.1875rem]">
        {locale === "ar" ? (
          <>
            جامعة RKDF
            <span className="block text-ink-soft">دبي</span>
          </>
        ) : (
          <>
            RKDF University
            <span className="block text-ink-soft">Dubai</span>
          </>
        )}
      </span>
    </Link>
  );
}

function MegaPanel({ item, open, onPointerEnter, onPointerLeave }: { item: HeaderNavItem; open: boolean; onPointerEnter: () => void; onPointerLeave: () => void }) {
  const m = item.mega!;
  return (
    <div
      id={`mega-${item.key}`}
      hidden={!open}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="absolute inset-x-0 top-full border-b border-line bg-canvas shadow-[0_32px_48px_-40px_rgb(26_44_91/0.4)]"
    >
      <div className="shell grid grid-cols-5 gap-10 py-12">
        {m.columns.map((col, ci) => (
          <div key={col.heading} className={ci === 0 && col.links.length > 8 ? "col-span-2" : ""}>
            <p className="eyebrow">{col.heading}</p>
            <span aria-hidden="true" className="mt-3 block h-px w-8 bg-accent" />
            <ul className={`mt-5 grid gap-x-8 gap-y-2.5 ${ci === 0 && col.links.length > 8 ? "grid-cols-2" : ""}`}>
              {ci === 0 && (
                <li>
                  <Link href={m.overview.href} className="font-medium text-ink hover:text-accent-deep">
                    {m.overview.label}
                  </Link>
                </li>
              )}
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-soft transition-colors hover:text-ink">
                    <Tx>{l.label}</Tx>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link href={m.featured.href} className="group block bg-sand">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src={m.featured.image} alt="" fill sizes="22vw" quality={70} className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]" />
          </div>
          <div className="p-5">
            <p className="eyebrow">{m.featured.eyebrow}</p>
            <p className="font-display mt-2 text-display-4 font-light text-ink">{m.featured.title}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink">
              <Icon name="arrow" size={16} />
              <span className="sr-only">{m.featured.title}</span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
