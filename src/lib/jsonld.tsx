import { site } from "@content/site";
import { getRoute } from "@content/routes";
import type { Locale } from "@content/types";
import type { Program } from "@content/programs";
import type { NewsItem } from "@content/news";
import { absolute } from "./seo";
import { plain } from "./tokens";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function universityLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": absolute("/#university"),
    name: site.name[locale],
    alternateName: site.name[locale === "en" ? "ar" : "en"],
    url: absolute(`/${locale}`),
    logo: absolute("/brand/rkdf-crest.png"),
    parentOrganization: { "@type": "CollegeOrUniversity", name: site.parent.en, url: site.parentUrl },
    address: { "@type": "PostalAddress", streetAddress: plain(site.contact.address, locale), addressLocality: "Dubai", addressCountry: "AE" },
    ...(site.geo ? { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } } : {}),
    ...(site.contact.phoneE164 ? { telephone: site.contact.phoneE164 } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    sameAs: [site.parentUrl, ...site.social.map((s) => s.href)],
  };
}

export function breadcrumbLd(locale: Locale, path: string) {
  const segments = path.split("/").filter(Boolean);
  const items = [{ name: locale === "ar" ? "الرئيسية" : "Home", item: absolute(`/${locale}`) }];
  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    const r = getRoute(acc);
    if (r) items.push({ name: r.title[locale], item: absolute(`/${locale}${acc}`) });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, ...x })),
  };
}

export function courseLd(locale: Locale, p: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: p.title[locale],
    description: p.summary[locale],
    url: absolute(`/${locale}/programs/${p.slug}`),
    provider: { "@id": absolute("/#university"), "@type": "CollegeOrUniversity", name: site.name[locale] },
    educationalLevel: p.level,
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "onsite", location: plain(site.contact.address, locale), courseWorkload: p.duration[locale] },
    offers: { "@type": "Offer", category: "Tuition", priceCurrency: "AED", price: p.tuitionAed.replace(/,/g, "") },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
  };
}

export function articleLd(locale: Locale, n: NewsItem) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.title,
    description: n.excerpt,
    image: [absolute(n.image.src)],
    ...(n.date ? { datePublished: n.date } : {}),
    inLanguage: locale,
    publisher: { "@type": "CollegeOrUniversity", name: site.name[locale], logo: { "@type": "ImageObject", url: absolute("/brand/rkdf-crest.png") } },
    mainEntityOfPage: absolute(`/${locale}/news/${n.slug}`),
  };
}
