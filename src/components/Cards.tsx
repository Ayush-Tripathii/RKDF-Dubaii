import Link from "next/link";
import type { Program } from "@content/programs";
import type { School } from "@content/schools";
import type { Dict } from "@content/translations";
import type { Locale } from "@content/types";
import { fmt } from "@content/translations";
import { href } from "@/lib/i18n";
import { Tx } from "@/lib/tokens";
import { ArrowLink } from "./Button";
import { Icon } from "./Icon";
import { Img } from "./Img";

export function ProgramCard({ program, locale, dict, schoolName, wide = false }: { program: Program; locale: Locale; dict: Dict; schoolName: string; wide?: boolean }) {
  const facts: [string, string][] = [
    [dict.programCard.duration, program.duration[locale]],
    [dict.programCard.intakes, program.intakes[locale]],
    [dict.programCard.tuition, `AED ${program.tuitionAed}`],
  ];
  return (
    <article
      className={`group relative flex h-full flex-col border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-500 ease-editorial hover:border-ink/30 hover:shadow-[0_24px_48px_-32px_rgb(26_44_91/0.35)] lg:p-8 ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow">
          {dict.levels[program.level]} · <Tx>{schoolName}</Tx>
        </p>
        {program.flagship && <span className="eyebrow shrink-0 text-accent-deep">{dict.programCard.flagship}</span>}
      </div>
      <h3 className={`font-display mt-6 font-light ${wide ? "text-display-3" : "text-display-4"}`}>
        <Link href={href(locale, `/programs/${program.slug}`)} className="after:absolute after:inset-0 after:content-['']">
          {program.title[locale]}
        </Link>
      </h3>
      {wide && (
        <p className="mt-4 max-w-measure text-ink-soft">
          {program.summary[locale]}
        </p>
      )}
      <dl className={`mt-8 grid gap-x-6 gap-y-4 border-t border-line pt-6 text-sm ${wide ? "sm:grid-cols-3" : "grid-cols-1"}`}>
        {facts.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1">
            <dt className="eyebrow">{k}</dt>
            <dd className="text-ink">
              <Tx>{v}</Tx>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-ink-soft">
        <span className="font-medium text-ink">{dict.programCard.entry}: </span>
        {program.entry[locale]}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.9375rem] font-medium text-ink">
        {dict.common.viewProgram}
        <Icon name="arrow" size={16} className="transition-transform duration-300 ease-editorial group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </span>
    </article>
  );
}

export function SchoolCard({ school, index, programCount, locale, dict }: { school: School; index: number; programCount: number; locale: Locale; dict: Dict }) {
  const count = programCount === 1 ? dict.home.schools.programCountOne : fmt(dict.home.schools.programCount, { n: programCount });
  return (
    <article className="flex h-full flex-col bg-surface">
      <Img image={school.image} locale={locale} ratio="4/3" sizes="(min-width: 1024px) 30vw, 80vw" />
      <div className="flex flex-1 flex-col border border-t-0 border-line p-6 lg:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-display text-display-3 font-light text-accent tabular" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="eyebrow tabular">{count}</span>
        </div>
        <h3 className="font-display mt-6 text-display-4 font-normal">
          {school.name[locale]}
        </h3>
        <ul className="mt-4 flex flex-col gap-1.5 text-sm text-ink-soft" aria-label={dict.pages.disciplines}>
          {school.disciplines.map((d) => (
            <li key={d} className="flex gap-2">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
              <Tx>{d}</Tx>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <ArrowLink href={href(locale, `/academics/${school.slug}`)} draggable={false}>
            {dict.common.exploreSchool}
            <span className="sr-only">
              : {school.name[locale]}
            </span>
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}
