import type { Metadata } from "next";
import { site } from "@content/site";
import { getDict } from "@content/translations";
import type { Locale } from "@content/types";
import type { RouteDef } from "@content/routes";
import { plain } from "./tokens";

export const absolute = (path: string) => new URL(path, site.url).toString();

/** Per-route metadata: unique title/description, canonical, hreflang pairs, OG + Twitter. */
export function buildMetadata(locale: Locale, route: RouteDef): Metadata {
  const dict = getDict(locale);
  const isHome = route.path === "";
  const title = isHome ? dict.meta.homeTitle : plain(route.title[locale], locale);
  const description = plain(route.description[locale], locale);
  const path = `/${locale}${route.path}`;

  return {
    metadataBase: new URL(site.url),
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: { en: `/en${route.path}`, ar: `/ar${route.path}`, "x-default": `/en${route.path}` },
    },
    openGraph: {
      type: route.kind === "article" ? "article" : "website",
      siteName: site.name[locale],
      title,
      description,
      url: path,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      alternateLocale: locale === "ar" ? ["en_AE"] : ["ar_AE"],
      images: [{ url: "/brand/rkdf-crest.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/brand/rkdf-crest.png"] },
    robots: route.noindex ? { index: false, follow: false } : undefined,
  };
}
