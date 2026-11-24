import { locales, type Locale } from "@content/types";
import type { L } from "@content/types";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");
export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "ar" : "en");

/** Prefix a site path with the locale. "" → "/en". */
export const href = (locale: Locale, path: string) => `/${locale}${path === "/" ? "" : path}`;

export const t = (l: L, locale: Locale) => l[locale];

/** Western Arabic numerals in both locales (brief §4). */
export const intlLocale = (locale: Locale) => (locale === "ar" ? "ar-AE-u-nu-latn" : "en-AE");

export function formatDate(iso: string, locale: Locale, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  return new Intl.DateTimeFormat(intlLocale(locale), { timeZone: "Asia/Dubai", ...opts }).format(new Date(iso + "T12:00:00+04:00"));
}
