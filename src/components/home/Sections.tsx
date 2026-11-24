import Image from "next/image";
import Link from "next/link";
import { curricula } from "@content/admissions";
import { images } from "@content/images";
import { sortedNews, upcomingEvents } from "@content/news";
import { chancellor, testimonials } from "@content/people";
import { levels, programs, programsBySchool } from "@content/programs";
import { researchCentres } from "@content/research";
import { schools } from "@content/schools";
import { site } from "@content/site";
import { careerStats, lifeStats, researchStats, universityInNumbers } from "@content/stats";
import { fmt, type Dict } from "@content/translations";
import type { Locale } from "@content/types";
import { formatDate, href } from "@/lib/i18n";
import { Tx, TxF } from "@/lib/tokens";
import { Accordion, CTABand, Chip, Marquee, QuoteBlock, Stepper } from "../Blocks";
import { ArrowLink, ButtonLink } from "../Button";
import { ProgramCard, SchoolCard } from "../Cards";
import { Icon } from "../Icon";
import { Img, Slot } from "../Img";
import { SectionHeader } from "../SectionHeader";
import { StatBlock } from "../StatBlock";
import { DragCarousel } from "../client/DragCarousel";
import { Parallax } from "../client/Parallax";
import { Tabs } from "../client/Tabs";
import { TestimonialSlider } from "../client/TestimonialSlider";
import { EnquireButton } from "../client/UIProvider";
import { VisitForm } from "../client/VisitForm";
import { countryCodes } from "@content/admissions";

type P = { locale: Locale; dict: Dict; n: number };
const schoolName = (slug: string, locale: Locale) => schools.find((s) => s.slug === slug)?.name[locale] ?? "";

/* ── HERO ─────────────────────────────────────────────────────── */
export function Hero({ locale, dict }: Omit<P, "n">) {
  const h = dict.home.hero;
  const chips = [site.licenceStatus, site.intakes, site.campusLocation, fmt(h.nationalities, { n: "[[STUDENT_NATIONALITIES]]" })];
  return (
    <section aria-labelledby="hero-title" className="relative -mt-[var(--header-h)] flex min-h-[640px] flex-col overflow-hidden lg:min-h-[max(760px,100svh)]" style={{ minHeight: "100svh" }}>
      <Image
        src={images.hero.src}
        alt={images.hero.alt[locale]}
        fill
        preload
        sizes="100vw"
        quality={75}
        className="object-cover object-[60%_center]"
        data-temp="true"
      />
      {/* Warm ivory scrim (35%) + a lighter-still wash behind the text column. Never darkens the image. */}
      <div aria-hidden="true" className="absolute inset-0 bg-canvas/35" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-canvas/90 via-canvas/55 to-transparent rtl:bg-linear-to-l" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-canvas/95 to-transparent" />

      <div className="shell relative flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+48px)] pb-10 lg:pb-14">
        <div className="max-w-[54rem]">
          <p className="eyebrow text-ink">
            <TxF template={h.eyebrow} vars={{ intake: site.intakeTerm }} />
          </p>
          <span aria-hidden="true" className="mt-4 block h-px w-12 bg-accent" />
          <h1 id="hero-title" className="font-display mt-8 text-display-1 font-light text-ink">
            {h.headlines[site.heroHeadline]}
          </h1>
          <p className="mt-8 max-w-[52ch] text-lead text-ink">
            <TxF template={h.sub} vars={{ location: site.campusLocation }} />
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={href(locale, "/apply")} icon="arrow">
              {h.ctaPrimary}
            </ButtonLink>
            <ButtonLink href={site.prospectus.href ?? href(locale, "/downloads")} variant="ghost" icon="download" className="bg-canvas/60 backdrop-blur-sm">
              {h.ctaSecondary}
            </ButtonLink>
          </div>
        </div>
        <ul aria-label={h.chipsLabel} className="mt-14 flex flex-wrap gap-2 border-t border-ink/15 pt-6 lg:mt-20">
          {chips.map((c) => (
            <li key={c}>
              <Chip>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                <Tx>{c}</Tx>
              </Chip>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 01 · NUMBERS ─────────────────────────────────────────────── */
export function Numbers({ locale, dict, n }: P) {
  const s = dict.home.numbers;
  return (
    <section aria-labelledby="s-numbers" className="section-pad">
      <div className="shell">
        <SectionHeader number={n} id="s-numbers" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
        <div className="mt-16 lg:mt-24">
          <StatBlock stats={universityInNumbers} locale={locale} columns={3} />
        </div>
      </div>
    </section>
  );
}

/* ── 02 · TWO HOMES ───────────────────────────────────────────── */
export function TwoHomes({ locale, dict, n }: P) {
  const s = dict.home.twoHomes;
  return (
    <section aria-labelledby="s-homes" className="section-pad border-t border-line">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-6">
          <SectionHeader number={n} id="s-homes" eyebrow={s.eyebrow} title={s.title} wide />
          <div className="mt-10 grid max-w-measure gap-6 text-[1.0625rem]" data-reveal>
            <p>
              <TxF template={s.p1} vars={{ founded: "[[YEAR_BHOPAL_ESTABLISHED]]", act: "[[HOME_CAMPUS_ESTABLISHING_ACT]]" }} />
            </p>
            <p>{s.p2}</p>
            <p>
              <TxF template={s.p3} vars={{ intake: site.intakeTerm }} />
            </p>
          </div>
          <div className="mt-12" data-reveal>
            <Parallax>
              <Img image={images.heritage} locale={locale} ratio="3/2" sizes="(min-width: 1024px) 45vw, 100vw" />
            </Parallax>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h3 className="eyebrow" data-reveal>
            {s.timelineLabel}
          </h3>
          <ol className="relative mt-8 grid gap-10 border-s border-line ps-8">
            {s.timeline.map((t, i) => (
              <li key={i} className="relative" data-reveal style={{ ["--i" as string]: i }}>
                <span aria-hidden="true" className="absolute -start-[37px] top-2 size-2.5 rounded-full border border-accent bg-canvas" />
                <p className="font-display text-display-4 font-light text-accent-deep tabular">
                  <Tx>{t.year}</Tx>
                </p>
                <p className="mt-1 text-ink">
                  <Tx>{t.text}</Tx>
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-14" data-reveal>
            <QuoteBlock
              quote={chancellor.quote}
              name={chancellor.name}
              role={s.chancellorRole}
              portrait={<Slot label={s.portraitSlot} token="[[CHANCELLOR_PORTRAIT]]" ratio="4/5" className="!p-2 text-[0.7rem]" />}
            />
            <div className="mt-6">
              <ArrowLink href={href(locale, "/about/chancellor")}>{s.chancellorLink}</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 03 · LICENSING ───────────────────────────────────────────── */
export function Licensing({ locale, dict, n }: P) {
  const s = dict.home.licensing;
  return (
    <section aria-labelledby="s-licensing" className="section-pad bg-sand">
      <div className="shell">
        <SectionHeader number={n} id="s-licensing" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
        <ul className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {s.cards.map((c, i) => (
            <li key={c.name} data-reveal style={{ ["--i" as string]: i }}>
              <article className="flex h-full flex-col bg-surface p-8 outline outline-1 -outline-offset-8 outline-line lg:p-10">
                <p className="eyebrow">{c.body}</p>
                <h3 className="font-display mt-5 text-display-4 font-normal">{c.name}</h3>
                <p className="mt-4 text-[0.9375rem]">{c.what}</p>
                <dl className="mt-auto border-t border-line pt-6">
                  <div className="mt-6 flex flex-col gap-1">
                    <dt className="eyebrow">{s.statusLabel}</dt>
                    <dd className="text-ink">
                      <Tx>{c.status}</Tx>
                    </dd>
                  </div>
                  <dd className="mt-2 text-sm">
                    <Tx>{c.ref}</Tx>
                  </dd>
                </dl>
              </article>
            </li>
          ))}
        </ul>
        <div className="mt-16 grid gap-10 border-t border-ink/15 pt-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7" data-reveal>
            <h3 className="font-display text-display-4 font-normal">{s.meaningTitle}</h3>
            <p className="mt-4 max-w-measure">
              <TxF template={s.meaning} vars={{ guidance: "[[ATTESTATION_GUIDANCE]]" }} />
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9" data-reveal style={{ ["--i" as string]: 1 }}>
            <p className="text-ink">
              <TxF template={s.verify} vars={{ regulator: site.regulator.name }} />
            </p>
            {site.regulator.verifyUrl ? (
              <a href={site.regulator.verifyUrl} rel="noopener" className="link-underline inline-flex items-center gap-2 font-medium text-ink">
                {s.verifyLinkLabel}
                <Icon name="external" size={16} />
              </a>
            ) : (
              <p className="text-sm">
                {s.verifyLinkLabel}: <Tx>{"[[REGULATOR_VERIFY_URL]]"}</Tx>
              </p>
            )}
            <ArrowLink href={href(locale, "/about/accreditation")}>{s.more}</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 04 · SCHOOLS ─────────────────────────────────────────────── */
export function Schools({ locale, dict, n }: P) {
  const s = dict.home.schools;
  // Card count and program totals are computed from the data — they cannot disagree.
  const title = fmt(s.title, { schools: schools.length, programs: programs.length });
  return (
    <section aria-labelledby="s-schools" className="section-pad overflow-hidden">
      <div className="shell">
        <SectionHeader number={n} id="s-schools" eyebrow={s.eyebrow} title={title} intro={s.intro} action={<ArrowLink href={href(locale, "/academics")}>{s.all}</ArrowLink>} />
      </div>
      <div className="mt-16 lg:mt-20" data-reveal>
        <DragCarousel
          label={s.eyebrow}
          prevLabel={dict.common.previous}
          nextLabel={dict.common.next}
          hint={dict.common.carouselHint}
          items={schools.map((sc, i) => (
            <SchoolCard key={sc.slug} school={sc} index={i} programCount={programsBySchool(sc.slug).length} locale={locale} dict={dict} />
          ))}
          slideTemplate={dict.common.slideOf}
        />
      </div>
    </section>
  );
}

/* ── 05 · PROGRAMS ────────────────────────────────────────────── */
export function Programs({ locale, dict, n }: P) {
  const s = dict.home.programs;
  return (
    <section aria-labelledby="s-programs" className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeader number={n} id="s-programs" eyebrow={s.eyebrow} title={s.title} intro={s.intro} action={<ArrowLink href={href(locale, "/programs")}>{s.browse}</ArrowLink>} />
        <div className="mt-14" data-reveal>
          <Tabs
            label={s.tabsLabel}
            tabs={levels.map((lv) => {
              const all = programs.filter((p) => p.level === lv).sort((a, b) => Number(!!b.flagship) - Number(!!a.flagship));
              // Homepage shows a curated six per level; the program finder lists everything.
              const list = all.slice(0, 6);
              return {
                id: lv,
                label: (
                  <>
                    {dict.levels[lv]} <span className="tabular text-ink-soft">({all.length})</span>
                  </>
                ),
                content: list.length ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((p, i) => (
                      <ProgramCard key={p.slug} program={p} locale={locale} dict={dict} schoolName={schoolName(p.school, locale)} wide={i === 0 && !!p.flagship && list.length > 1} />
                    ))}
                  </div>
                ) : (
                  <p>
                    <TxF template={s.empty} vars={{ level: dict.levels[lv].toLowerCase(), intake: site.intakeTerm }} />
                  </p>
                ),
              };
            })}
          />
        </div>
      </div>
    </section>
  );
}

/* ── 06 · WHY ─────────────────────────────────────────────────── */
export function Why({ dict, n }: P) {
  const s = dict.home.why;
  return (
    <section aria-labelledby="s-why" className="section-pad bg-sand">
      <div className="shell">
        <SectionHeader number={n} id="s-why" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
        <ol className="mt-16 grid gap-px border-y border-ink/15 bg-ink/15 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {s.reasons.map((r, i) => (
            <li key={r.title} className="flex flex-col bg-sand py-10 md:px-8 md:[&:nth-child(odd)]:ps-0 lg:[&:nth-child(odd)]:ps-8 lg:[&:nth-child(3n+1)]:ps-0" data-reveal style={{ ["--i" as string]: i % 3 }}>
              <span className="font-display text-display-3 font-light text-accent tabular" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-6 text-display-4 font-normal">{r.title}</h3>
              <p className="mt-3 text-[0.9375rem]">
                <TxF template={r.body} vars={{ x: r.token, y: "token2" in r && r.token2 ? r.token2 : "" }} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 07 · ADMISSIONS ──────────────────────────────────────────── */
export function Admissions({ locale, dict, n }: P) {
  const s = dict.home.admissions;
  return (
    <section aria-labelledby="s-admissions" className="section-pad">
      <div className="shell">
        <SectionHeader number={n} id="s-admissions" eyebrow={s.eyebrow} title={s.title} />
        <div className="mt-16 lg:mt-20">
          <Stepper label={s.stepsLabel} steps={s.steps.map((st) => ({ title: st.title, body: <TxF template={st.body} vars={{ days: "[[OFFER_TURNAROUND_DAYS]]" }} /> }))} />
        </div>
        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7" data-reveal>
            <h3 className="font-display text-display-4 font-normal">{s.curriculaTitle}</h3>
            <div className="mt-6">
              <Accordion
                name="curricula"
                items={curricula.map((c) => ({
                  id: c.id,
                  title: <Tx>{c.name[locale]}</Tx>,
                  content: (
                    <dl className="grid gap-4 sm:grid-cols-3">
                      {(
                        [
                          [s.undergraduate, c.undergraduate],
                          [s.foundation, c.foundation],
                          [s.english, c.english],
                        ] as const
                      ).map(([k, v]) => (
                        <div key={k}>
                          <dt className="eyebrow">{k}</dt>
                          <dd className="mt-1 text-ink">
                            {v[locale]}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ),
                }))}
              />
            </div>
            <div className="mt-6">
              <ArrowLink href={href(locale, "/admissions/entry-requirements")}>{s.allRequirements}</ArrowLink>
            </div>
          </div>
          <aside className="flex flex-col justify-between gap-8 border border-line bg-surface p-8 lg:col-span-4 lg:col-start-9 lg:p-10" data-reveal style={{ ["--i" as string]: 1 }}>
            <div>
              <p className="eyebrow">{dict.home.closing.eyebrow}</p>
              <p className="font-display mt-4 text-display-4 font-light text-ink">
                <TxF template={dict.home.closing.body} vars={{ intake: site.intakeTerm, date: site.applicationDeadline }} />
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href={href(locale, "/apply")} icon="arrow">
                {dict.common.applyNow}
              </ButtonLink>
              <EnquireButton variant="ghost">{s.counsellor}</EnquireButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ── 08 · LIFE IN DUBAI ───────────────────────────────────────── */
export function Life({ locale, dict, n }: P) {
  const s = dict.home.life;
  return (
    <section aria-labelledby="s-life" className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeader number={n} id="s-life" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
        <div className="mt-16 grid grid-cols-2 gap-3 lg:mt-20 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(0,1fr))] lg:gap-4">
          <div className="col-span-2 lg:col-span-7 lg:row-span-2" data-reveal>
            <Parallax className="h-full">
              <Img image={images.lifeSkyline} locale={locale} ratio="3/2" sizes="(min-width: 1024px) 58vw, 100vw" />
            </Parallax>
          </div>
          <div className="lg:col-span-3" data-reveal style={{ ["--i" as string]: 1 }}>
            <Img image={images.lifeStudents} locale={locale} ratio="4/3" sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
          <div className="row-span-2 lg:col-span-2" data-reveal style={{ ["--i" as string]: 2 }}>
            <Img image={images.lifeCoast} locale={locale} ratio="fill" className="h-full min-h-[280px] w-full" sizes="(min-width: 1024px) 17vw, 50vw" />
          </div>
          <div className="lg:col-span-3" data-reveal style={{ ["--i" as string]: 3 }}>
            <Img image={images.lifeSport} locale={locale} ratio="4/3" sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
        </div>

        <div className="mt-16">
          <StatBlock stats={lifeStats} locale={locale} columns={4} />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <ul className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-8">
            {s.points.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--i" as string]: i }} className="lg:grid lg:grid-cols-[10rem_1fr] lg:gap-6">
                <h3 className="font-display text-display-4 font-normal">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] lg:mt-1">
                  <TxF template={p.body} vars={{ x: p.token }} />
                </p>
              </li>
            ))}
          </ul>
          <aside aria-labelledby="accom-title" className="bg-sand p-8 lg:col-span-5 lg:p-10" data-reveal style={{ ["--i" as string]: 1 }}>
            <h3 id="accom-title" className="font-display text-display-4 font-normal">
              {s.accommodationTitle}
            </h3>
            <p className="mt-3 text-sm">{s.accommodationBody}</p>
            <dl className="mt-6 border-t border-ink/15">
              {s.accommodationRows.map((r) => (
                <div key={r.label} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/15 py-4">
                  <dt className="text-[0.9375rem] text-ink">{r.label}</dt>
                  <dd className="tabular text-sm">
                    <Tx>{r.value}</Tx>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <ArrowLink href={href(locale, "/student-life/accommodation")}>{s.accommodationLink}</ArrowLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ── 09 · RESEARCH ────────────────────────────────────────────── */
export function Research({ locale, dict, n }: P) {
  const s = dict.home.research;
  return (
    <section aria-labelledby="s-research" className="section-pad bg-sand">
      <div className="shell">
        <SectionHeader number={n} id="s-research" eyebrow={s.eyebrow} title={s.title} intro={s.intro} action={<ArrowLink href={href(locale, "/research")}>{s.more}</ArrowLink>} />
        <ul className="mt-16 grid gap-6 md:grid-cols-3 lg:mt-20">
          {researchCentres.map((c, i) => (
            <li key={c.slug} data-reveal style={{ ["--i" as string]: i }}>
              <article className="h-full bg-surface">
                <Img image={c.image} locale={locale} ratio="16/10" sizes="(min-width: 768px) 30vw, 100vw" />
                <div className="p-6 lg:p-8">
                  <h3 className="font-display text-display-4 font-normal">
                    {c.name[locale]}
                  </h3>
                  <p className="mt-3 text-[0.9375rem]">
                    {c.focus[locale]}
                  </p>
                  <p className="mt-6 border-t border-line pt-4 text-sm">
                    <span className="eyebrow block">{s.lead}</span>
                    <span className="mt-1 block text-ink">
                      {c.lead[locale]}
                    </span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <StatBlock stats={researchStats} locale={locale} columns={4} tone="sand" />
        </div>
      </div>
    </section>
  );
}

/* ── 10 · CAREERS ─────────────────────────────────────────────── */
export function Careers({ locale, dict, n }: P) {
  const s = dict.home.careers;
  // DUMMY: fictional employer names for the preview. Show only confirmed partners before launch.
  const slots = ["Meridian Gulf Logistics", "Sandline Construction", "Qasr Digital", "Corniche Health", "Falcon Ridge Energy", "Bayan Analytics", "Dune & Delta Consulting", "Marsa Pharma", "Oasis Grid Systems", "Saffron Hospitality", "Tidewater Finance", "Lumen Architecture"];
  return (
    <section aria-labelledby="s-careers" className="section-pad overflow-hidden">
      <div className="shell">
        <SectionHeader number={n} id="s-careers" eyebrow={s.eyebrow} title={s.title} intro={s.intro} action={<ArrowLink href={href(locale, "/careers")}>{s.more}</ArrowLink>} />
        <div className="mt-16 lg:mt-20">
          <StatBlock stats={careerStats} locale={locale} columns={3} />
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6" data-reveal>
            <Parallax>
              <Img image={images.careers1} locale={locale} ratio="4/3" sizes="(min-width: 1024px) 45vw, 100vw" />
            </Parallax>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="eyebrow" data-reveal>
              {s.serviceTitle}
            </h3>
            <ol className="mt-6 border-t border-line">
              {s.service.map((x, i) => (
                <li key={x.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6" data-reveal style={{ ["--i" as string]: i }}>
                  <span className="font-display text-display-4 font-light text-accent-deep tabular" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-display text-display-4 font-normal">{x.title}</h4>
                    <p className="mt-2 text-[0.9375rem]">
                      <TxF template={x.body} vars={{ x: "token" in x && x.token ? x.token : "" }} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="shell">
          <p className="eyebrow mb-6">{s.partnersLabel}</p>
        </div>
        <Marquee items={slots} label={s.partnersLabel} />
      </div>
    </section>
  );
}

/* ── 11 · VOICES ──────────────────────────────────────────────── */
export function Voices({ locale, dict, n }: P) {
  const s = dict.home.voices;
  return (
    <section aria-labelledby="s-voices" className="section-pad bg-sand">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <SectionHeader number={n} id="s-voices" eyebrow={s.eyebrow} title={s.title} wide />
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal>
          <TestimonialSlider
            label={s.label}
            prevLabel={dict.common.previous}
            nextLabel={dict.common.next}
            counterTemplate={dict.common.slideOf}
            slides={testimonials.map((t) => (
              <figure key={t.name} className="grid gap-8 sm:grid-cols-[9rem_1fr]">
                <Img image={t.portrait} locale={locale} ratio="4/5" sizes="144px" className="w-36 sm:w-full" />
                <div>
                  <blockquote className="font-display text-display-3 font-light text-ink">
                    <p>
                      <span aria-hidden="true" className="text-accent">“</span>
                      {t.quote[locale]}
                      <span aria-hidden="true" className="text-accent">”</span>
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 border-t border-ink/15 pt-4 text-sm">
                    <span className="block font-medium text-ink">
                      {t.name}
                    </span>
                    <span>
                      {`${t.program[locale]} · ${t.nationality[locale]} · ${t.year}`}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          />
        </div>
      </div>
    </section>
  );
}

/* ── 12 · NEWS & EVENTS ───────────────────────────────────────── */
export function NewsEvents({ locale, dict, n, todayISO }: P & { todayISO: string }) {
  const s = dict.home.news;
  const [featured, ...rest] = sortedNews();
  const compact = rest.slice(0, 4);
  const upcoming = upcomingEvents(todayISO);
  const date = (d: string | null) => (d ? formatDate(d, locale) : s.dateTbc);
  return (
    <section aria-labelledby="s-news" className="section-pad">
      <div className="shell">
        <SectionHeader number={n} id="s-news" eyebrow={s.eyebrow} title={s.title} action={<ArrowLink href={href(locale, "/news")}>{s.allNews}</ArrowLink>} />
        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <article className="group relative lg:col-span-7" data-reveal>
            <Img image={featured.image} locale={locale} ratio="16/10" sizes="(min-width: 1024px) 55vw, 100vw" imgClassName="transition-transform duration-700 ease-editorial group-hover:scale-[1.02]" />
            <p className="eyebrow mt-6">
              {featured.category[locale]} · <time dateTime={featured.date ?? undefined}>{date(featured.date)}</time>
            </p>
            <h3 className="font-display mt-3 text-display-3 font-light">
              <Link href={href(locale, `/news/${featured.slug}`)} className="after:absolute after:inset-0">
                {featured.title[locale]}
              </Link>
            </h3>
            <p className="mt-3 max-w-measure">
              {featured.excerpt[locale]}
            </p>
          </article>
          <ul className="border-t border-line lg:col-span-5">
            {compact.map((a, i) => (
              <li key={a.slug} className="group relative grid grid-cols-[1fr_6.5rem] gap-5 border-b border-line py-5" data-reveal style={{ ["--i" as string]: i }}>
                <div>
                  <p className="eyebrow">
                    {a.category[locale]} · <time dateTime={a.date ?? undefined}>{date(a.date)}</time>
                  </p>
                  <h3 className="mt-2 text-[1.0625rem] font-medium text-ink">
                    <Link href={href(locale, `/news/${a.slug}`)} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-accent group-hover:underline-offset-4">
                      {a.title[locale]}
                    </Link>
                  </h3>
                </div>
                <Img image={a.image} locale={locale} ratio="1/1" sizes="104px" decorative />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="font-display text-display-3 font-light">{s.eventsTitle}</h3>
            <ArrowLink href={href(locale, "/events")}>{s.allEvents}</ArrowLink>
          </div>
          {upcoming.length === 0 ? (
            <p className="mt-8">{s.noEvents}</p>
          ) : (
            <ul className="no-scrollbar relative -mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2">
              {upcoming.map((e) => {
                const d = e.date ? new Date(e.date + "T12:00:00+04:00") : null;
                return (
                  <li key={e.slug} className="flex w-[78%] shrink-0 snap-start flex-col border border-line bg-surface p-6 sm:w-[44%] lg:w-[calc(25%-12px)]">
                    <div className="flex items-start gap-4">
                      <div className="flex min-w-16 flex-col items-center border border-accent px-3 py-2 text-center">
                        {d ? (
                          <time dateTime={e.date!} className="contents">
                            <span className="font-display text-display-3 leading-none font-light text-ink tabular">{formatDate(e.date!, locale, { day: "numeric" })}</span>
                            <span className="eyebrow mt-1">{formatDate(e.date!, locale, { month: "short" })}</span>
                          </time>
                        ) : (
                          <span aria-hidden="true" className="font-display py-1 text-display-3 leading-none font-light text-ink-soft">—</span>
                        )}
                      </div>
                      <p className="eyebrow pt-1">{s.kinds[e.kind]}</p>
                    </div>
                    <h4 className="font-display mt-6 text-display-4 font-normal">
                      {e.title[locale]}
                    </h4>
                    <p className="mt-2 text-sm">
                      {!d && <span className="block">{s.dateTbc}</span>}
                      <Tx>{`${e.time} · ${e.location}`}</Tx>
                    </p>
                    <div className="mt-auto pt-6">
                      <EnquireButton variant="ghost" className="w-full" preset={{ topic: fmt(dict.forms.eventPrefix, { event: e.title[locale] }) }}>
                        {s.rsvp}
                        <span className="sr-only">
                          : {e.title[locale]}
                        </span>
                      </EnquireButton>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── 13 · VISIT ───────────────────────────────────────────────── */
export function Visit({ locale, dict, n }: P) {
  const s = dict.home.visit;
  return (
    <section aria-labelledby="s-visit" className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeader number={n} id="s-visit" eyebrow={s.eyebrow} title={s.title} intro={<Tx>{s.intro}</Tx>} />
        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7" data-reveal>
            <h3 className="font-display mb-6 text-display-4 font-normal">{s.formTitle}</h3>
            <VisitForm dict={dict} locale={locale} countryCodes={countryCodes} />
          </div>
          <div className="grid gap-6 lg:col-span-5" data-reveal style={{ ["--i" as string]: 1 }}>
            <div className="relative overflow-hidden bg-sand">
              <Img image={images.visit} locale={locale} ratio="16/10" sizes="(min-width: 1024px) 38vw, 100vw" decorative />
              <div className="p-6 lg:p-8">
                <h3 className="font-display text-display-4 font-normal">{s.virtualTitle}</h3>
                <p className="mt-2 text-[0.9375rem]">{s.virtualBody}</p>
                <div className="mt-5">
                  {site.virtualTourUrl ? (
                    <ButtonLink href={site.virtualTourUrl} variant="ghost" icon="play">
                      {s.virtualCta}
                    </ButtonLink>
                  ) : (
                    <p className="text-sm">
                      {s.virtualCta}: <Tx>{"[[VIRTUAL_TOUR_URL]]"}</Tx>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="eyebrow mb-3">{s.mapTitle}</h3>
              {site.mapEmbedUrl ? (
                <iframe src={site.mapEmbedUrl} title={s.mapTitle} loading="lazy" className="aspect-[4/3] w-full border border-line" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <Slot label={s.mapSlot} token="[[DUBAI_CAMPUS_MAP_EMBED]]" ratio="16/9" />
              )}
              <p className="mt-3 flex gap-2 text-sm">
                <Icon name="pin" size={18} className="shrink-0" />
                <Tx>{"[[DUBAI_CAMPUS_ADDRESS]]"}</Tx>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CLOSING ──────────────────────────────────────────────────── */
export function Closing({ locale, dict }: Omit<P, "n">) {
  const s = dict.home.closing;
  return (
    <CTABand
      id="s-closing"
      eyebrow={s.eyebrow}
      title={s.title}
      body={<TxF template={s.body} vars={{ intake: site.intakeTerm, date: site.applicationDeadline }} />}
      action={
        <ButtonLink href={href(locale, "/apply")} icon="arrow">
          {s.cta}
        </ButtonLink>
      }
    />
  );
}

