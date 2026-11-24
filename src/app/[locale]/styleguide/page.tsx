import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { curricula } from "@content/admissions";
import { programs } from "@content/programs";
import { schools } from "@content/schools";
import { getDict } from "@content/translations";
import type { Stat } from "@content/types";
import { Accordion, CTABand, Chip, Marquee, QuoteBlock, Stepper } from "@/components/Blocks";
import { ArrowLink, ButtonLink, buttonClass } from "@/components/Button";
import { ProgramCard, SchoolCard } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import { Slot } from "@/components/Img";
import { SectionHeader } from "@/components/SectionHeader";
import { StatBlock } from "@/components/StatBlock";
import { DragCarousel } from "@/components/client/DragCarousel";
import { Swatches } from "@/components/client/Swatches";
import { Tabs } from "@/components/client/Tabs";
import { EnquireButton } from "@/components/client/UIProvider";
import { controlClass } from "@/components/formStyles";
import { href, isLocale } from "@/lib/i18n";
import { Tx } from "@/lib/tokens";

export const metadata: Metadata = { title: "Style guide", robots: { index: false, follow: false } };

const tokens = [
  { name: "canvas", role: "Default page background" },
  { name: "surface", role: "Cards, panels" },
  { name: "sand", role: "Alternating bands, mattes" },
  { name: "line", role: "1px hairlines" },
  { name: "ink", role: "Headings, nav — crest blue deepened" },
  { name: "ink-brand", role: "Crest blue as sampled", sampled: true },
  { name: "ink-soft", role: "Body copy" },
  { name: "accent", role: "Crest red — rules, large numerals", sampled: true },
  { name: "accent-deep", role: "Text-safe accent, solid CTA" },
  { name: "focus", role: "Keyboard focus ring only" },
  { name: "whatsapp", role: "WhatsApp affordance only" },
  { name: "sand-deep", role: "Pressed / selection" },
];

const demoStats: Stat[] = [
  { key: "a", value: 128, token: "", label: { en: "Confirmed value (example)", ar: "قيمة مؤكدة (مثال)" }, qualifier: { en: "Real number in HTML; counts up from 60%", ar: "رقم حقيقي في HTML" } },
  { key: "b", value: 94, token: "", suffix: "%", label: { en: "Percentage (example)", ar: "نسبة (مثال)" }, qualifier: { en: "Suffix variant", ar: "مع لاحقة" } },
  { key: "c", value: null, token: "[[STAT_TOKEN]]", label: { en: "Unconfirmed value", ar: "قيمة غير مؤكدة" }, qualifier: { en: "Renders its token, never 0", ar: "يظهر الرمز، لا صفر" } },
];

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-16 lg:py-24" aria-labelledby={`sg-${n}`}>
      <div className="shell">
        <SectionHeader number={n} id={`sg-${n}`} eyebrow={title} title={title} />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export default async function Styleguide({ params }: PageProps<"/[locale]/styleguide">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  return (
    <>
      <header className="shell pt-16 pb-12 lg:pt-24">
        <p className="eyebrow">RKDF University Dubai · Design system</p>
        <span aria-hidden="true" className="mt-4 block h-px w-12 bg-accent" />
        <h1 className="font-display mt-8 text-display-1 font-light">{dict.styleguide.title}</h1>
        <p className="mt-6 max-w-measure text-lead">Palette sampled from the supplied crest, type scale, and every component state. Tokens are defined once in globals.css and consumed through Tailwind utilities.</p>
      </header>

      <Block n={1} title="Palette">
        <div className="mb-10 flex items-center gap-8 bg-surface p-6 outline outline-1 -outline-offset-8 outline-line">
          <Image src="/brand/rkdf-crest.png" alt="RKDF University crest, as supplied" width={172} height={251} className="h-28 w-auto" />
          <p className="max-w-measure text-sm">
            Pixel-frequency sampling of the supplied crest gives two brand colours: <strong className="text-ink">crest red</strong> and <strong className="text-ink">crest blue</strong>. The crest has no gold, so red is the structural accent. Blue is deepened at the same hue for Ink so headings reach AAA contrast.
          </p>
        </div>
        <Swatches tokens={tokens} />
      </Block>

      <Block n={2} title="Type scale">
        <div className="grid gap-10">
          {[
            ["display-1 · Newsreader 300", "text-display-1 font-display font-light", "A university of two cities"],
            ["display-2 · Newsreader 300", "text-display-2 font-display font-light", "Our standing, stated plainly."],
            ["display-3 · Newsreader 300", "text-display-3 font-display font-light", "Find the program that fits."],
            ["display-4 · Newsreader 400", "text-display-4 font-display", "Small cohorts"],
            ["lead · Plex Sans 400", "text-lead", "Every program lists its duration, intakes and annual tuition in AED."],
            ["body · Plex Sans 400 / 1.65 / 68ch", "max-w-measure", "Body copy is capped at 68 characters per line with a line-height of 1.65. Arabic uses its own stack and a line-height of 1.9."],
            ["eyebrow · 11px / 0.18em / uppercase", "eyebrow", "01 · The university"],
            ["stat · Newsreader 300, tabular lining", "font-display text-stat font-light text-accent tabular", "1,280"],
          ].map(([label, cls, sample]) => (
            <div key={label} className="grid gap-3 border-b border-line pb-8 lg:grid-cols-[16rem_1fr]">
              <p className="font-mono text-xs" dir="ltr">{label}</p>
              <p className={`${cls} text-ink`}>{sample}</p>
            </div>
          ))}
          <div className="grid gap-3 lg:grid-cols-[16rem_1fr]" dir="rtl" lang="ar">
            <p className="font-mono text-xs" dir="ltr">Arabic · Noto Naskh / IBM Plex Sans Arabic</p>
            <div>
              <p className="font-display text-display-2 text-ink" style={{ fontFamily: "var(--font-arabic-display)" }}>جامعة لمدينتين</p>
              <p className="mt-3 max-w-measure" style={{ fontFamily: "var(--font-arabic)", lineHeight: 1.9 }}>يُنشر كل رقم مع تاريخه ومصدره، وتبقى الأرقام بالأرقام الغربية 0-9 في اللغتين.</p>
            </div>
          </div>
        </div>
      </Block>

      <Block n={3} title="Buttons & links">
        <div className="grid gap-10">
          {[
            ["Default", ""],
            ["Hover", "hover"],
            ["Focus", "focus"],
            ["Disabled", "disabled"],
          ].map(([label, state]) => {
            const forced = (v: "solid" | "ghost" | "ink") =>
              state === "hover" ? { solid: "!bg-ink", ghost: "!bg-ink !text-canvas !border-ink", ink: "!bg-accent-deep" }[v] : state === "focus" ? "outline-2 outline-offset-3 outline-focus outline" : "";
            return (
              <div key={label} className="grid items-center gap-4 lg:grid-cols-[10rem_1fr]">
                <p className="eyebrow">{label}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <button type="button" className={buttonClass("solid", forced("solid"))} disabled={state === "disabled"}>Start your application</button>
                  <button type="button" className={buttonClass("ghost", forced("ghost"))} disabled={state === "disabled"}>Download prospectus</button>
                  <button type="button" className={buttonClass("ink", forced("ink"))} disabled={state === "disabled"}>Request tour</button>
                  <span className={`text-ink underline underline-offset-[0.4em] ${state === "hover" ? "decoration-accent" : "decoration-line"}`}>Quiet link</span>
                </div>
              </div>
            );
          })}
          <div className="flex flex-wrap items-center gap-6">
            <ButtonLink href={href(locale, "/apply")} icon="arrow">Live solid link</ButtonLink>
            <EnquireButton variant="ghost">Opens enquiry modal</EnquireButton>
            <ArrowLink href={href(locale, "/programs")}>Arrow link</ArrowLink>
            <Chip><span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />Chip</Chip>
            <span className="flex items-center gap-3 text-ink"><Icon name="search" /><Icon name="arrow" /><Icon name="download" /><Icon name="whatsapp" /><Icon name="pin" /></span>
          </div>
        </div>
      </Block>

      <Block n={4} title="Form controls">
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          {[
            ["Default", false, false, ""],
            ["Filled", false, false, "Aisha Rahman"],
            ["Error", true, false, "aisha@"],
            ["Disabled", false, true, ""],
          ].map(([label, err, dis, val]) => (
            <div key={label as string}>
              <label className="text-sm font-medium text-ink" htmlFor={`sg-${label}`}>{label as string}</label>
              <input id={`sg-${label}`} className={controlClass(err as boolean)} disabled={dis as boolean} defaultValue={val as string} aria-invalid={(err as boolean) || undefined} />
              {err && <p className="mt-2 text-sm text-accent-deep">— Enter a valid email address, like name@example.com.</p>}
            </div>
          ))}
          <label className="flex items-start gap-3 text-sm sm:col-span-2"><input type="checkbox" className="mt-1 size-5 accent-[var(--ink)]" defaultChecked /> Consent checkbox</label>
        </div>
      </Block>

      <Block n={5} title="Placeholder tokens">
        <p className="max-w-measure">Unconfirmed facts render as visible tokens: <Tx>{"[[KHDA_PERMIT_NO]]"}</Tx>. They are styled to be impossible to mistake for real content, and are all listed in CONTENT-TODO.md.</p>
      </Block>

      <Block n={6} title="StatBlock">
        <StatBlock stats={demoStats} locale={locale} columns={3} />
      </Block>

      <Block n={7} title="Cards">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2"><ProgramCard program={programs[2]} locale={locale} dict={dict} schoolName={schools[0].name[locale]} wide /></div>
          <ProgramCard program={programs[3]} locale={locale} dict={dict} schoolName={schools[1].name[locale]} />
          <SchoolCard school={schools[0]} index={0} programCount={3} locale={locale} dict={dict} />
          <div className="md:col-span-2"><QuoteBlock quote="[[CHANCELLOR_QUOTE]]" name="[[CHANCELLOR_NAME]]" role="Chancellor, RKDF University" portrait={<Slot label="Portrait" token="[[PORTRAIT]]" className="!p-2 text-[0.7rem]" />} /></div>
        </div>
      </Block>

      <Block n={8} title="Stepper">
        <Stepper label="Example steps" steps={dict.home.admissions.steps.map((s) => ({ title: s.title, body: <Tx>{s.body.replace("{days}", "[[OFFER_TURNAROUND_DAYS]]")}</Tx> }))} />
      </Block>

      <Block n={9} title="Accordion & tabs">
        <div className="grid gap-12 lg:grid-cols-2">
          <Accordion items={curricula.slice(0, 3).map((c) => ({ id: c.id, title: c.name[locale], content: c.undergraduate[locale] }))} />
          <Tabs label="Example tabs" tabs={[{ id: "a", label: "Undergraduate", content: <p>Panel one</p> }, { id: "b", label: "Postgraduate", content: <p>Panel two</p> }, { id: "c", label: "Doctoral", content: <p>Panel three</p> }]} />
        </div>
      </Block>

      <section className="border-t border-line py-16 lg:py-24" aria-labelledby="sg-10">
        <div className="shell"><SectionHeader number={10} id="sg-10" eyebrow="DragCarousel" title="DragCarousel" /></div>
        <div className="mt-12">
          <DragCarousel label="Example carousel" prevLabel="Previous" nextLabel="Next" hint={dict.common.carouselHint} slideTemplate={dict.common.slideOf} items={schools.map((s, i) => <SchoolCard key={s.slug} school={s} index={i} programCount={2} locale={locale} dict={dict} />)} />
        </div>
      </section>

      <section className="border-t border-line py-16 lg:py-24" aria-labelledby="sg-11">
        <div className="shell"><SectionHeader number={11} id="sg-11" eyebrow="Marquee" title="Marquee" intro="Pauses on hover and focus; static under reduced motion." /></div>
        <div className="mt-12"><Marquee label="Example marquee" items={Array.from({ length: 8 }, (_, i) => `[[EMPLOYER_LOGO_SLOT_${i + 1}]]`)} /></div>
      </section>

      <CTABand id="sg-cta" eyebrow="12 · CTABand" title="Begin your application." body="Full-bleed sand band with a single CTA." action={<ButtonLink href={href(locale, "/apply")} icon="arrow">Start your application</ButtonLink>} />
    </>
  );
}
