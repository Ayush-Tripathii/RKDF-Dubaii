"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict } from "@content/translations";
import { buttonClass } from "@/components/Button";

export default function NotFound() {
  const pathname = usePathname() ?? "/en";
  const locale = pathname.startsWith("/ar") ? "ar" : "en";
  const dict = getDict(locale);
  const links: [string, string][] = [
    [dict.nav.admissions, "/admissions"],
    [dict.nav.academics, "/programs"],
    [dict.footer.contact, "/contact"],
  ];
  return (
    <section className="shell section-pad">
      <p className="eyebrow">404</p>
      <span aria-hidden="true" className="mt-4 block h-px w-12 bg-accent" />
      <h1 className="font-display mt-8 max-w-3xl text-display-1 font-light">{dict.pages.notFoundTitle}</h1>
      <p className="mt-6 max-w-measure text-lead">{dict.pages.notFoundBody}</p>
      <ul className="mt-10 flex flex-wrap gap-3">
        <li>
          <Link href={`/${locale}`} className={buttonClass("ink")}>
            {dict.common.home}
          </Link>
        </li>
        {links.map(([label, p]) => (
          <li key={p}>
            <Link href={`/${locale}${p}`} className={buttonClass("ghost")}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
