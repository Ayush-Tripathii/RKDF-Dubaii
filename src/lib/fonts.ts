import localFont from "next/font/local";

/** Self-hosted from @fontsource. Only the two critical weights (display 300, sans 400) are preloaded. */
export const newsreader = localFont({
  variable: "--font-newsreader",
  display: "swap",
  preload: true,
  src: [
    { path: "../../node_modules/@fontsource/newsreader/files/newsreader-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../../node_modules/@fontsource/newsreader/files/newsreader-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/newsreader/files/newsreader-latin-300-italic.woff2", weight: "300", style: "italic" },
  ],
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const plex = localFont({
  variable: "--font-plex",
  display: "swap",
  preload: true,
  src: [
    { path: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const plexArabic = localFont({
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
  src: [
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2", weight: "600", style: "normal" },
  ],
  fallback: ["Tahoma", "sans-serif"],
});

export const naskh = localFont({
  variable: "--font-naskh",
  display: "swap",
  preload: false,
  src: [
    { path: "../../node_modules/@fontsource/noto-naskh-arabic/files/noto-naskh-arabic-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/noto-naskh-arabic/files/noto-naskh-arabic-arabic-500-normal.woff2", weight: "500", style: "normal" },
  ],
  fallback: ["serif"],
});

export const fontVariables = [newsreader.variable, plex.variable, plexArabic.variable, naskh.variable].join(" ");
