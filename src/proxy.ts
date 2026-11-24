import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ar"];
const COOKIE = "NEXT_LOCALE";

/** Locale routing: every page lives under /en or /ar. Remembers the switcher choice via cookie. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const cookie = request.cookies.get(COOKIE)?.value;
  const accept = request.headers.get("accept-language") ?? "";
  const locale = cookie && locales.includes(cookie) ? cookie : /^\s*ar\b/i.test(accept) ? "ar" : "en";

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|og|images|brand|fonts|favicon|icon|apple-icon|sitemap.xml|robots.txt|.*\\..*).*)"],
};
