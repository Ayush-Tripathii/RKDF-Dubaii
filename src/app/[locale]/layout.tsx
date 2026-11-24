import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { countryCodes, curricula } from "@content/admissions";
import { mainNav } from "@content/navigation";
import { programs } from "@content/programs";
import { getRoute, staticRoutes } from "@content/routes";
import { schools } from "@content/schools";
import { site } from "@content/site";
import { getDict } from "@content/translations";
import { locales, type Locale } from "@content/types";
import { Footer } from "@/components/Footer";
import { MobileBar, WhatsAppFab } from "@/components/PersistentUI";
import { Header, type HeaderNavItem } from "@/components/client/Header";
import { RevealObserver, revealBootScript } from "@/components/client/RevealObserver";
import { UIProvider, type SearchItem } from "@/components/client/UIProvider";
import { fontVariables } from "@/lib/fonts";
import { dirOf, href, isLocale } from "@/lib/i18n";
import { JsonLd, universityLd } from "@/lib/jsonld";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#fcfbf8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.homeTitle, template: dict.meta.titleTemplate },
    applicationName: site.name[locale],
    formatDetection: { telephone: false },
  };
}

function buildNav(locale: Locale): HeaderNavItem[] {
  const dict = getDict(locale);
  const link = (path: string) => ({ label: getRoute(path)?.title[locale] ?? path, href: href(locale, path) });
  return mainNav.map((item) => ({
    key: item.key,
    label: dict.nav[item.key],
    href: item.href,
    mega: item.mega
      ? {
          overview: { label: dict.nav[item.mega.overview], href: href(locale, item.href) },
          columns: item.mega.columns.map((c) => ({
            heading: dict.nav[c.heading],
            links: c.links.flatMap((p) => (p === "@schools" ? schools.map((s) => ({ label: s.name[locale], href: href(locale, `/academics/${s.slug}`) })) : [link(p)])),
          })),
          featured: { ...item.mega.featured, eyebrow: dict.nav[item.mega.featured.eyebrow], title: dict.nav[item.mega.featured.title], href: href(locale, item.mega.featured.href) },
        }
      : undefined,
  }));
}

function buildSearchIndex(locale: Locale): SearchItem[] {
  const dict = getDict(locale);
  return [
    ...programs.map((p) => ({
      title: p.title[locale],
      href: href(locale, `/programs/${p.slug}`),
      type: "program" as const,
      meta: `${dict.levels[p.level]} · ${schools.find((s) => s.slug === p.school)?.name[locale] ?? ""}`,
    })),
    ...schools.map((s) => ({ title: s.name[locale], href: href(locale, `/academics/${s.slug}`), type: "school" as const })),
    ...staticRoutes.map((r) => ({ title: r.title[locale], href: href(locale, r.path), type: "page" as const, meta: r.description[locale] })),
  ];
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  return (
    <html lang={locale} dir={dirOf(locale)} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body className="pb-16 lg:pb-0">
        <a
          href="#main"
          className="sr-only z-[60] bg-ink px-4 py-3 text-canvas focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {dict.common.skip}
        </a>
        <UIProvider
          dict={dict}
          locale={locale}
          searchIndex={buildSearchIndex(locale)}
          formOptions={{
            countryCodes,
            curricula: curricula.map((c) => ({ id: c.id, name: c.name[locale] })),
            programs: programs.map((p) => ({ slug: p.slug, title: p.title[locale] })),
            intakes: [site.intakeTerm],
            responseDays: "[[ENQUIRY_RESPONSE_DAYS]]",
          }}
        >
          <Header
            locale={locale}
            items={buildNav(locale)}
            labels={{
              siteName: site.name[locale],
              home: dict.common.home,
              mainNav: dict.common.mainNav,
              search: dict.common.search,
              enquire: dict.common.enquire,
              apply: dict.common.apply,
              openMenu: dict.common.openMenu,
              closeMenu: dict.common.closeMenu,
              menu: dict.common.menu,
              switchTo: dict.common.switchTo,
              switchToLabel: dict.common.switchToLabel,
            }}
          />
          <main id="main" tabIndex={-1} className="pt-[var(--header-h)] outline-none">
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
          <MobileBar locale={locale} dict={dict} />
          <WhatsAppFab locale={locale} dict={dict} />
        </UIProvider>
        <RevealObserver />
        <JsonLd data={universityLd(locale)} />
      </body>
    </html>
  );
}
