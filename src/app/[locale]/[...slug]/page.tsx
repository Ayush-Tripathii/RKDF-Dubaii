import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { admissionsFaqs, countryCodes, curricula } from "@content/admissions";
import { getNews, sortedNews, upcomingEvents } from "@content/news";
import { getProgram, levels, programs, programsBySchool } from "@content/programs";
import { allRoutes, childRoutes, getRoute, staticRoutes, type RouteDef } from "@content/routes";
import { getSchool, schools } from "@content/schools";
import { site, whatsappHref } from "@content/site";
import { fmt, getDict, type Dict } from "@content/translations";
import type { Locale } from "@content/types";
import { Accordion } from "@/components/Blocks";
import { ArrowLink, ButtonLink } from "@/components/Button";
import { ProgramCard, SchoolCard } from "@/components/Cards";
import { Img } from "@/components/Img";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { ProgramFinder } from "@/components/client/ProgramFinder";
import { EnquireButton } from "@/components/client/UIProvider";
import { VisitForm } from "@/components/client/VisitForm";
import { Licensing } from "@/components/home/Sections";
import { formatDate, href, isLocale } from "@/lib/i18n";
import { JsonLd, articleLd, breadcrumbLd, courseLd, faqLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getToday } from "@/lib/time";
import { Tx, TxF, plain } from "@/lib/tokens";
import { dummyText } from "@content/dummy";

export function generateStaticParams() {
  return allRoutes.filter((r) => r.path !== "").map((r) => ({ slug: r.path.slice(1).split("/") }));
}

const resolve = (slug: string[]) => getRoute("/" + slug.join("/"));

export async function generateMetadata({ params }: PageProps<"/[locale]/[...slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const route = resolve(slug);
  if (!isLocale(locale) || !route) return {};
  return buildMetadata(locale, route);
}

/** Top-level section name, used as the inner-page eyebrow. */
function sectionLabel(path: string, locale: Locale) {
  const top = "/" + path.split("/").filter(Boolean)[0];
  return top === path ? getDictLabel(locale) : (getRoute(top)?.title[locale] ?? "");
}
const getDictLabel = (locale: Locale) => (locale === "ar" ? "جامعة RKDF دبي" : "RKDF University Dubai");

export default async function Page({ params }: PageProps<"/[locale]/[...slug]">) {
  const { locale, slug } = await params;
  const route = resolve(slug);
  if (!isLocale(locale) || !route) notFound();
  const dict = getDict(locale);
  const path = route.path;

  return (
    <>
      <JsonLd data={breadcrumbLd(locale, path)} />
      <Body route={route} locale={locale} dict={dict} />
    </>
  );
}

async function Body({ route, locale, dict }: { route: RouteDef; locale: Locale; dict: Dict }) {
  const path = route.path;
  const header = (lead = route.description[locale], title = route.title[locale]) => (
    <PageHeader locale={locale} dict={dict} path={path} eyebrow={sectionLabel(path, locale)} title={title} lead={lead} />
  );
  const schoolName = (s: string) => schools.find((x) => x.slug === s)?.name[locale] ?? "";

  /* School template */
  if (route.kind === "school") {
    const school = getSchool(path.split("/").pop()!)!;
    const list = programsBySchool(school.slug);
    return (
      <>
        {header(school.summary[locale], school.name[locale])}
        <section className="section-pad" aria-labelledby="school-programs">
          <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-5">
              <Img image={school.image} locale={locale} ratio="4/5" sizes="(min-width:1024px) 38vw, 100vw" preload />
              <h2 className="eyebrow mt-8">{dict.pages.disciplines}</h2>
              <ul className="mt-4 grid gap-2">
                {school.disciplines.map((d) => (
                  <li key={d} className="border-b border-line pb-2 text-ink">
                    <Tx>{d}</Tx>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <SectionHeader number={1} id="school-programs" eyebrow={dict.pages.programsInSchool} title={fmt(list.length === 1 ? dict.home.schools.programCountOne : dict.home.schools.programCount, { n: list.length })} wide />
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {list.map((p) => (
                  <ProgramCard key={p.slug} program={p} locale={locale} dict={dict} schoolName={school.name[locale]} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* Program template */
  if (route.kind === "program") {
    const p = getProgram(path.split("/").pop()!)!;
    const facts: [string, string][] = [
      [dict.pages.level, dict.levels[p.level]],
      [dict.pages.school, schoolName(p.school)],
      [dict.programCard.duration, p.duration[locale]],
      [dict.programCard.intakes, p.intakes[locale]],
      [dict.programCard.tuition, `AED ${p.tuitionAed}`],
      [dict.programCard.entry, p.entry[locale]],
    ];
    return (
      <>
        <JsonLd data={courseLd(locale, p)} />
        {header(p.summary[locale], p.title[locale])}
        <section className="section-pad" aria-labelledby="program-facts">
          <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-7">
              <SectionHeader number={1} id="program-facts" eyebrow={dict.pages.programFacts} title={p.title[locale]} wide />
              <dl className="mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-2">
                {facts.map(([k, v]) => (
                  <div key={k} className="bg-canvas py-6 sm:px-6 sm:[&:nth-child(odd)]:ps-0">
                    <dt className="eyebrow">{k}</dt>
                    <dd className="mt-2 text-ink">
                      <Tx>{v}</Tx>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <aside className="flex flex-col gap-3 self-start border border-line bg-surface p-8 lg:col-span-4 lg:col-start-9">
              <ButtonLink href={href(locale, "/apply")} icon="arrow">
                {dict.common.applyNow}
              </ButtonLink>
              <EnquireButton variant="ghost" preset={{ program: p.slug }}>
                {dict.common.enquire}
              </EnquireButton>
              <ArrowLink href={href(locale, `/academics/${p.school}`)} className="mt-4">
                <Tx>{schoolName(p.school)}</Tx>
              </ArrowLink>
            </aside>
          </div>
        </section>
      </>
    );
  }

  /* Article template */
  if (route.kind === "article") {
    const a = getNews(path.split("/").pop()!)!;
    return (
      <>
        <JsonLd data={articleLd(locale, a)} />
        {header(a.excerpt[locale], a.title[locale])}
        <article className="section-pad">
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-8">
              <Img image={a.image} locale={locale} ratio="16/9" sizes="(min-width:1024px) 60vw, 100vw" preload />
              <p className="eyebrow mt-8">
                {a.category[locale]} · {dict.pages.published}: <time dateTime={a.date ?? undefined}>{a.date ? formatDate(a.date, locale) : dict.pages.dateTbc}</time>
              </p>
              <div className="mt-8 max-w-measure text-[1.0625rem]">
                {a.body[locale]}
              </div>
            </div>
          </div>
        </article>
      </>
    );
  }

  /* Bespoke static pages */
  switch (path) {
    case "/academics":
      return (
        <>
          {header()}
          <section className="section-pad">
            <ul className="shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {schools.map((s, i) => (
                <li key={s.slug}>
                  <SchoolCard school={s} index={i} programCount={programsBySchool(s.slug).length} locale={locale} dict={dict} />
                </li>
              ))}
            </ul>
          </section>
        </>
      );

    case "/programs":
      return (
        <>
          {header()}
          <section className="section-pad">
            <div className="shell">
              <ProgramFinder
                items={programs.map((p) => ({ slug: p.slug, level: p.level, school: p.school, card: <ProgramCard program={p} locale={locale} dict={dict} schoolName={schoolName(p.school)} /> }))}
                levels={levels.map((l) => ({ id: l, label: dict.levels[l] }))}
                schools={schools.map((s) => ({ id: s.slug, label: s.name[locale] }))}
                labels={{ level: dict.pages.filterLevel, school: dict.pages.filterSchool, all: dict.pages.all, showing: dict.pages.showing, reset: dict.pages.reset }}
              />
            </div>
          </section>
        </>
      );

    case "/about/accreditation":
      return (
        <>
          {header()}
          <Licensing locale={locale} dict={dict} n={1} />
          <Pending route={route} locale={locale} dict={dict} n={2} />
        </>
      );

    case "/admissions":
    case "/admissions/entry-requirements": {
      const faqs = admissionsFaqs.map((f) => ({ q: f.q[locale], a: f.a[locale] }));
      return (
        <>
          <JsonLd data={faqLd(faqs.map((f) => ({ q: f.q, a: plain(f.a, locale) })))} />
          {header()}
          <section className="section-pad" aria-labelledby="req">
            <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-x-12">
              <div>
                <SectionHeader number={1} id="req" eyebrow={dict.home.admissions.curriculaTitle} title={dict.home.admissions.curriculaTitle} wide />
                <div className="mt-10">
                  <Accordion
                    items={curricula.map((c) => ({
                      id: c.id,
                      title: <Tx>{c.name[locale]}</Tx>,
                      content: (
                        <dl className="grid gap-3">
                          <div><dt className="eyebrow">{dict.home.admissions.undergraduate}</dt><dd className="text-ink">{c.undergraduate[locale]}</dd></div>
                          <div><dt className="eyebrow">{dict.home.admissions.foundation}</dt><dd className="text-ink">{c.foundation[locale]}</dd></div>
                          <div><dt className="eyebrow">{dict.home.admissions.english}</dt><dd className="text-ink">{c.english[locale]}</dd></div>
                        </dl>
                      ),
                    }))}
                  />
                </div>
              </div>
              <div>
                <SectionHeader number={2} id="faq" eyebrow="FAQ" title={locale === "ar" ? "أسئلة شائعة" : "Frequently asked questions"} wide />
                <div className="mt-10">
                  <Accordion items={faqs.map((f, i) => ({ id: `faq-${i}`, title: f.q, content: <Tx>{f.a}</Tx> }))} />
                </div>
              </div>
            </div>
          </section>
          <ChildLinks route={route} locale={locale} dict={dict} n={3} />
        </>
      );
    }

    case "/news":
      return (
        <>
          {header()}
          <section className="section-pad">
            <ul className="shell grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {sortedNews().map((a) => (
                <li key={a.slug} className="group relative">
                  <Img image={a.image} locale={locale} ratio="16/10" sizes="(min-width:1024px) 30vw, 100vw" />
                  <p className="eyebrow mt-5">
                    {a.category[locale]} · {a.date ? formatDate(a.date, locale) : dict.pages.dateTbc}
                  </p>
                  <h2 className="font-display mt-2 text-display-4 font-normal">
                    <Link href={href(locale, `/news/${a.slug}`)} className="after:absolute after:inset-0">
                      {a.title[locale]}
                    </Link>
                  </h2>
                  <p className="mt-2 text-[0.9375rem]">
                    {a.excerpt[locale]}
                  </p>
                </li>
              ))}
            </ul>
            <p className="shell mt-14 text-sm">{fmt(dict.pages.page, { n: 1 })}</p>
          </section>
        </>
      );

    case "/events": {
      const { iso } = await getToday();
      const list = upcomingEvents(iso);
      return (
        <>
          {header()}
          <section className="section-pad">
            <div className="shell">
              {list.length === 0 ? (
                <p>{dict.home.news.noEvents}</p>
              ) : (
                <ul className="border-t border-line">
                  {list.map((e) => (
                    <li key={e.slug} className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-center">
                      <p className="eyebrow md:col-span-2">{e.date ? formatDate(e.date, locale) : dict.home.news.dateTbc}</p>
                      <div className="md:col-span-7">
                        <p className="eyebrow">{dict.home.news.kinds[e.kind]}</p>
                        <h2 className="font-display mt-1 text-display-4 font-normal">
                          {e.title[locale]}
                        </h2>
                        <p className="mt-1 text-sm">
                          <Tx>{`${e.time} · ${e.location}`}</Tx>
                        </p>
                      </div>
                      <div className="md:col-span-3 md:justify-self-end">
                        <EnquireButton variant="ghost" preset={{ topic: fmt(dict.forms.eventPrefix, { event: e.title[locale] }) }}>
                          {dict.home.news.rsvp}
                        </EnquireButton>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </>
      );
    }

    case "/visit":
      return (
        <>
          {header(dict.home.visit.intro)}
          <section className="section-pad">
            <div className="shell max-w-4xl">
              <VisitForm dict={dict} locale={locale} countryCodes={countryCodes} />
            </div>
          </section>
        </>
      );

    case "/contact":
      return (
        <>
          {header()}
          <section className="section-pad">
            <div className="shell grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {[
                [dict.footer.contact, site.contact.address],
                [dict.forms.phone, site.contact.phoneDisplay],
                [dict.forms.email, site.contact.emailDisplay],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-line pt-6">
                  <h2 className="eyebrow">{k}</h2>
                  <p className="mt-3 text-ink" dir={k === dict.forms.phone ? "ltr" : undefined}>
                    <Tx>{v}</Tx>
                  </p>
                </div>
              ))}
              <div id="whatsapp" className="border-t border-line pt-6">
                <h2 className="eyebrow">{dict.common.whatsapp}</h2>
                <p className="mt-3 text-ink">
                  {site.contact.whatsappE164 ? (
                    <a href={whatsappHref(locale)} className="link-underline">
                      {dict.common.chatOnWhatsapp}
                    </a>
                  ) : (
                    <Tx>{"[[WHATSAPP_NUMBER]]"}</Tx>
                  )}
                </p>
              </div>
            </div>
            <div className="shell mt-14">
              <EnquireButton variant="solid">{dict.common.enquire}</EnquireButton>
            </div>
          </section>
          <Pending route={route} locale={locale} dict={dict} n={1} />
        </>
      );

    case "/accessibility": {
      const a = dict.pages.a11y;
      const blocks: [string, React.ReactNode][] = [
        [a.commitmentTitle, <p key="c">{a.commitment}</p>],
        [a.standardTitle, <p key="s">{a.standard}</p>],
        [a.featuresTitle, <ul key="f" className="grid gap-2">{a.features.map((x) => <li key={x} className="flex gap-3"><span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />{x}</li>)}</ul>],
        [a.limitsTitle, <p key="l"><TxF template={a.limits} vars={{ x: a.limitsToken }} /></p>],
        [a.contactTitle, <p key="r"><TxF template={a.contact} vars={{ email: "[[ACCESSIBILITY_EMAIL]]", days: "[[ACCESSIBILITY_RESPONSE_DAYS]]" }} /></p>],
      ];
      return (
        <>
          {header()}
          <section className="section-pad">
            <div className="shell grid gap-14 lg:grid-cols-12">
              <div className="grid gap-14 lg:col-span-8">
                {blocks.map(([t, body], i) => (
                  <section key={t} aria-labelledby={`a11y-${i}`}>
                    <p className="eyebrow tabular text-accent-deep">{String(i + 1).padStart(2, "0")}</p>
                    <h2 id={`a11y-${i}`} className="font-display mt-3 text-display-3 font-light">{t}</h2>
                    <div className="mt-4 max-w-measure text-[1.0625rem]">{body}</div>
                  </section>
                ))}
                <p className="text-sm">
                  <TxF template={a.reviewed} vars={{ date: "[[ACCESSIBILITY_REVIEW_DATE]]" }} />
                </p>
              </div>
            </div>
          </section>
        </>
      );
    }

    case "/sitemap":
      return (
        <>
          {header()}
          <section className="section-pad">
            <ul className="shell columns-1 gap-12 sm:columns-2 lg:columns-3">
              {allRoutes.map((r) => (
                <li key={r.path} className="mb-2 break-inside-avoid" style={{ paddingInlineStart: `${Math.max(0, r.path.split("/").length - 2) * 1}rem` }}>
                  <Link href={href(locale, r.path)} className="link-underline">
                    <Tx>{r.title[locale]}</Tx>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      );
  }

  /* Generic template: content pending + section links */
  return (
    <>
      {header()}
      <Pending route={route} locale={locale} dict={dict} n={1} />
      <ChildLinks route={route} locale={locale} dict={dict} n={route.pending?.length ? 2 : 1} />
    </>
  );
}

function Pending({ route, locale, dict, n }: { route: RouteDef; locale: Locale; dict: Dict; n: number }) {
  if (!route.pending?.length) return null;
  // With dummy values available (content/dummy.ts), present the items as content rather than a to-do list.
  const filled = route.pending.every((t) => dummyText(t.slice(2, -2)) !== undefined);
  if (filled)
    return (
      <section className="section-pad border-b border-line" aria-labelledby="pending">
        <div className="shell">
          <SectionHeader number={n} id="pending" eyebrow={dict.common.overview} title={route.title[locale]} />
          <ul className="mt-12 grid gap-px border-y border-line bg-line md:grid-cols-2">
            {route.pending.map((t, i) => (
              <li key={t} className="flex gap-6 bg-canvas py-8 md:px-8 md:[&:nth-child(odd)]:ps-0">
                <span className="font-display text-display-4 font-light text-accent tabular" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <p className="max-w-measure text-[1.0625rem] text-ink">
                  <Tx>{t}</Tx>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  return (
    <section className="section-pad border-b border-line" aria-labelledby="pending">
      <div className="shell">
        <SectionHeader number={n} id="pending" eyebrow={dict.common.pendingTitle} title={dict.common.pendingTitle} intro={dict.common.pendingBody} />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {route.pending.map((t) => (
            <li key={t} className="border border-dashed border-ink/20 bg-sand px-4 py-5">
              <Tx>{t}</Tx>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ChildLinks({ route, locale, dict, n }: { route: RouteDef; locale: Locale; dict: Dict; n: number }) {
  const kids = childRoutes(route.path).filter((r) => staticRoutes.includes(r));
  if (!kids.length) return null;
  return (
    <section className="section-pad" aria-labelledby="children">
      <div className="shell">
        <SectionHeader number={n} id="children" eyebrow={dict.common.inThisSection} title={route.title[locale]} />
        <ul className="mt-12 grid gap-px border-y border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {kids.map((k) => (
            <li key={k.path} className="group relative bg-canvas p-8 md:[&:nth-child(odd)]:ps-0 lg:[&:nth-child(odd)]:ps-8 lg:[&:nth-child(3n+1)]:ps-0">
              <h3 className="font-display text-display-4 font-normal">
                <Link href={href(locale, k.path)} className="after:absolute after:inset-0">
                  {k.title[locale]}
                </Link>
              </h3>
              <p className="mt-2 text-[0.9375rem]">{k.description[locale]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
