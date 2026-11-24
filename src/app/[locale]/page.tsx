import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRoute } from "@content/routes";
import { getDict } from "@content/translations";
import { Admissions, Careers, Closing, Hero, Licensing, Life, NewsEvents, Numbers, Programs, Research, Schools, TwoHomes, Visit, Voices, Why } from "@/components/home/Sections";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getToday } from "@/lib/time";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, getRoute("")!);
}

/**
 * Section order. Numbering ("01 · …") is derived from this array,
 * so it is strictly sequential with no duplicates by construction.
 */
const ORDER = ["numbers", "twoHomes", "licensing", "schools", "programs", "why", "admissions", "life", "research", "careers", "voices", "news", "visit"] as const;
const num = (k: (typeof ORDER)[number]) => ORDER.indexOf(k) + 1;

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  const { iso } = await getToday();
  const p = { locale, dict };

  return (
    <>
      <Hero {...p} />
      <Numbers {...p} n={num("numbers")} />
      <TwoHomes {...p} n={num("twoHomes")} />
      <Licensing {...p} n={num("licensing")} />
      <Schools {...p} n={num("schools")} />
      <Programs {...p} n={num("programs")} />
      <Why {...p} n={num("why")} />
      <Admissions {...p} n={num("admissions")} />
      <Life {...p} n={num("life")} />
      <Research {...p} n={num("research")} />
      <Careers {...p} n={num("careers")} />
      <Voices {...p} n={num("voices")} />
      <NewsEvents {...p} n={num("news")} todayISO={iso} />
      <Visit {...p} n={num("visit")} />
      <Closing {...p} />
    </>
  );
}
