import type { L } from "./types";

/**
 * Site-wide facts. Every unconfirmed value is a [[TOKEN]].
 * Set a field to a real value (and the matching `…Url`/`…E164` field) once confirmed.
 */
export const site = {
  name: { en: "RKDF University Dubai", ar: "جامعة RKDF دبي" } satisfies L,
  shortName: "RKDF Dubai",
  parent: { en: "RKDF University, Bhopal", ar: "جامعة RKDF، بوبال" } satisfies L,
  /** Official site of the home campus (supplied by the client). */
  parentUrl: "https://www.rkdf.ac.in/",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  intakeTerm: "[[INTAKE_TERM]]",
  intakes: "[[INTAKES]]",
  applicationDeadline: "[[DATE]]",
  campusLocation: "[[CAMPUS_LOCATION]]",
  licenceStatus: "[[LICENCE_STATUS]]",

  /** Which of the three hero headline options (see translations.home.hero.headlines) is live. */
  heroHeadline: 1 as 0 | 1 | 2,

  contact: {
    address: "[[DUBAI_ADDRESS]]",
    phoneDisplay: "+971 [[PHONE]]",
    /** e.g. "+97140000000" — when null, the phone is shown but not linked. */
    phoneE164: null as string | null,
    /** e.g. "97150000000" — when null, WhatsApp links fall back to /contact. */
    whatsappE164: null as string | null,
    emailDisplay: "[[EMAIL]]",
    email: null as string | null,
    hours: "[[OFFICE_HOURS]]",
  },

  /** For JSON-LD. Set when confirmed. */
  geo: null as { lat: number; lng: number } | null,

  /** Official social profiles. Empty until confirmed — no icons render for missing URLs. */
  social: [] as { network: "instagram" | "linkedin" | "youtube" | "x" | "facebook" | "tiktok"; href: string }[],

  regulator: {
    name: "[[REGULATOR]]",
    /** Public verification URL on the regulator's site. When null, the token is shown unlinked. */
    verifyUrl: "https://www.khda.gov.ae/" as string | null, // DUMMY: regulator homepage, not a verified register entry
  },

  prospectus: {
    /** e.g. "/downloads/rkdf-dubai-prospectus.pdf" */
    href: null as string | null,
  },
  virtualTourUrl: null as string | null,
  /** DUMMY: OpenStreetMap view of Dubai International Academic City. */
  mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=55.405%2C25.090%2C55.430%2C25.110&layer=mapnik&marker=25.1003%2C55.4174" as string | null,
} as const;

export function whatsappHref(locale: string) {
  return site.contact.whatsappE164 ? `https://wa.me/${site.contact.whatsappE164}` : `/${locale}/contact#whatsapp`;
}
