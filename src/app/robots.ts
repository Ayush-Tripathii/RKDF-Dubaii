import type { MetadataRoute } from "next";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/en/styleguide", "/ar/styleguide"] }],
    sitemap: absolute("/sitemap.xml"),
  };
}
