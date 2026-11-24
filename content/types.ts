export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A localised string. Values may contain [[PLACEHOLDER]] tokens. */
export type L = Record<Locale, string>;

/** A real, confirmed number — or null while it awaits confirmation (renders the token). */
export type Stat = {
  key: string;
  value: number | null;
  token: string;
  prefix?: string;
  suffix?: string;
  label: L;
  qualifier: L;
};

export type ImageRef = {
  src: string;
  width: number;
  height: number;
  alt: L;
  /** TEMPORARY stock image — must be replaced before launch (listed in CONTENT-TODO.md). */
  temp?: boolean;
};
