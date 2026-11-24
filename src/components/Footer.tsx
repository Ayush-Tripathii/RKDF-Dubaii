import Image from "next/image";
import Link from "next/link";
import { footerColumns } from "@content/navigation";
import { getRoute } from "@content/routes";
import { site, whatsappHref } from "@content/site";
import { fmt, type Dict } from "@content/translations";
import type { Locale } from "@content/types";
import { href } from "@/lib/i18n";
import { getToday } from "@/lib/time";
import { Tx, TxF } from "@/lib/tokens";
import { Icon } from "./Icon";

export async function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const { year } = await getToday();
  const f = dict.footer;
  const c = site.contact;
  return (
    <footer className="border-t border-line bg-canvas pt-20 pb-28 lg:pt-28 lg:pb-12">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Logo + contact */}
          <div className="lg:col-span-4">
            <Link href={href(locale, "")} className="inline-flex items-center gap-5" aria-label={site.name[locale]}>
              <Image src="/brand/rkdf-crest.png" alt="" width={172} height={251} className="h-24 w-auto" />
              <span className="font-display text-display-4 font-light text-ink">
                {locale === "ar" ? "جامعة RKDF" : "RKDF University"}
                <span className="block text-ink-soft">{locale === "ar" ? "دبي" : "Dubai"}</span>
              </span>
            </Link>
            <address className="mt-10 grid gap-3 not-italic">
              <p className="eyebrow">{f.contact}</p>
              <p className="flex gap-3">
                <Icon name="pin" className="mt-1 shrink-0 text-ink-soft" size={18} />
                <Tx>{c.address}</Tx>
              </p>
              <p className="flex gap-3">
                <Icon name="phone" className="mt-1 shrink-0 text-ink-soft" size={18} />
                {c.phoneE164 ? (
                  <a href={`tel:${c.phoneE164}`} className="link-underline text-ink" dir="ltr">
                    {c.phoneDisplay}
                  </a>
                ) : (
                  <span dir="ltr">
                    <Tx>{c.phoneDisplay}</Tx>
                  </span>
                )}
              </p>
              <p className="flex gap-3">
                <Icon name="whatsapp" className="mt-1 shrink-0 text-ink-soft" size={18} />
                <a href={whatsappHref(locale)} className="link-underline text-ink">
                  {dict.common.whatsapp}
                </a>
              </p>
              <p className="flex gap-3">
                <Icon name="mail" className="mt-1 shrink-0 text-ink-soft" size={18} />
                {c.email ? (
                  <a href={`mailto:${c.email}`} className="link-underline text-ink">
                    {c.email}
                  </a>
                ) : (
                  <Tx>{c.emailDisplay}</Tx>
                )}
              </p>
            </address>
          </div>

          {/* Five link columns */}
          <nav aria-label={dict.common.footerNav} className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h2 className="eyebrow">{f[col.heading]}</h2>
                <ul className="mt-5 grid gap-2.5 text-[0.9375rem]">
                  {col.links.map((p) => {
                    const r = getRoute(p);
                    return (
                      <li key={p}>
                        <Link href={href(locale, p)} className="text-ink-soft transition-colors hover:text-ink">
                          {r ? r.title[locale] : p}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Secondary row: regulatory status, Bhopal link, social */}
        <div className="mt-20 grid gap-6 border-t border-line pt-8 text-sm lg:grid-cols-12 lg:items-center">
          <p className="lg:col-span-6">
            <TxF template={f.statusLine} vars={{ khda: "[[KHDA_PERMIT_STATUS]]", caa: "[[MOHESR_CAA_STATUS]]" }} />{" "}
            <Link href={href(locale, "/about/accreditation")} className="link-underline text-ink">
              {getRoute("/about/accreditation")!.title[locale]}
            </Link>
          </p>
          <p className="lg:col-span-3">
            <a href={site.parentUrl} className="link-underline inline-flex items-center gap-1.5 text-ink" rel="noopener">
              {f.bhopal}
              <Icon name="external" size={14} />
            </a>
          </p>
          <div className="lg:col-span-3 lg:text-end">
            <span className="sr-only">{f.social}: </span>
            {site.social.length ? (
              <ul className="flex gap-4 lg:justify-end">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} rel="noopener me" className="link-underline text-ink capitalize">
                      {s.network}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Tx>{f.socialPending}</Tx>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular">{fmt(f.rights, { year })}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {(
              [
                ["privacy", "/privacy"],
                ["terms", "/terms"],
                ["accessibility", "/accessibility"],
                ["sitemap", "/sitemap"],
                ["styleguide", "/styleguide"],
              ] as const
            ).map(([k, p]) => (
              <li key={k}>
                <Link href={href(locale, p)} className="link-underline">
                  {f[k]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
