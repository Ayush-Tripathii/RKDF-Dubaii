import type { MetadataRoute } from "next";
import { allRoutes } from "@content/routes";
import { locales } from "@content/types";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes
    .filter((r) => !r.noindex)
    .flatMap((r) =>
      locales.map((l) => ({
        url: absolute(`/${l}${r.path}`),
        changeFrequency: r.kind === "article" || r.path === "/news" || r.path === "/events" ? ("weekly" as const) : ("monthly" as const),
        priority: r.path === "" ? 1 : r.path === "/about/accreditation" || r.path.startsWith("/admissions") ? 0.9 : 0.7,
        alternates: { languages: { en: absolute(`/en${r.path}`), ar: absolute(`/ar${r.path}`) } },
      })),
    );
}
