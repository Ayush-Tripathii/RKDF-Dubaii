"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { Dict } from "@content/translations";
import { fmt } from "@content/translations";
import type { Locale } from "@content/types";
import { Tx } from "@/lib/tokens";
import { buttonClass } from "../Button";
import { Icon } from "../Icon";
import { Field, controlClass, describedBy, isEmail, isPhone } from "./fields";

export type FormOptions = {
  countryCodes: { code: string; label: string }[];
  curricula: { id: string; name: string }[];
  programs: { slug: string; title: string }[];
  intakes: string[];
  responseDays: string;
};

type Values = { name: string; email: string; cc: string; phone: string; nationality: string; curriculum: string; program: string; intake: string; message: string; consent: boolean };

export function EnquiryForm({ dict, locale, options, preset }: { dict: Dict; locale: Locale; options: FormOptions; preset?: { program?: string; topic?: string } }) {
  const f = dict.forms;
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [v, setV] = useState<Values>({ name: "", email: "", cc: "+971", phone: "", nationality: "", curriculum: "", program: preset?.program ?? "", intake: "", message: preset?.topic ?? "", consent: false });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [ref, setRef] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (x: Values) => {
    const e: Partial<Record<keyof Values, string>> = {};
    if (x.name.trim().length < 2) e.name = f.errName;
    if (!isEmail(x.email)) e.email = f.errEmail;
    if (!isPhone(x.phone)) e.phone = f.errPhone;
    if (!x.nationality.trim()) e.nationality = f.errRequired;
    if (!x.curriculum) e.curriculum = f.errRequired;
    if (!x.program) e.program = f.errRequired;
    if (!x.intake) e.intake = f.errRequired;
    if (!x.consent) e.consent = f.errConsent;
    return e;
  };

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
        first?.focus();
      });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "enquiry", locale, ...v }) });
      const data = (await res.json()) as { ok: boolean; ref?: string };
      if (!res.ok || !data.ok) throw new Error();
      setRef(data.ref ?? "");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="py-6" role="status">
        <span className="flex size-12 items-center justify-center rounded-full border border-accent text-accent-deep">
          <Icon name="check" />
        </span>
        <h3 className="font-display mt-6 text-display-3 font-light" tabIndex={-1} ref={(el) => el?.focus()}>
          {f.successTitle}
        </h3>
        <p className="mt-4 text-ink-soft">
          <Tx>{fmt(f.successBody, { days: options.responseDays, ref })}</Tx>
        </p>
        <button type="button" className={buttonClass("ghost", "mt-8")} onClick={() => { setV({ ...v, message: "", consent: false }); setSubmitted(false); setStatus("idle"); }}>
          {f.another}
        </button>
      </div>
    );
  }

  const errCount = Object.keys(errors).length;
  const ctl = (k: keyof Values) => ({ id: id(k), "aria-invalid": errors[k] ? true : undefined, "aria-describedby": describedBy(id(k), errors[k]), className: controlClass(!!errors[k]) });

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-6">
      {submitted && errCount > 0 && (
        <div ref={summaryRef} role="alert" className="border-s-2 border-accent-deep bg-surface px-4 py-3 text-sm text-accent-deep">
          {fmt(f.errorsSummary, { n: errCount })}
        </div>
      )}
      <Field id={id("name")} label={f.name} error={errors.name} required requiredLabel={f.required}>
        <input type="text" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} {...ctl("name")} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("email")} label={f.email} error={errors.email} required requiredLabel={f.required}>
          <input type="email" autoComplete="email" inputMode="email" dir="ltr" value={v.email} onChange={(e) => set("email", e.target.value)} {...ctl("email")} />
        </Field>
        <Field id={id("phone")} label={f.phone} error={errors.phone} required requiredLabel={f.required}>
          <div className="flex gap-2" dir="ltr">
            <select aria-label={f.countryCode} value={v.cc} onChange={(e) => set("cc", e.target.value)} className={controlClass(false, "w-[7.5rem] shrink-0")} autoComplete="tel-country-code">
              {options.countryCodes.map((c) => (
                <option key={c.code + c.label} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <input type="tel" autoComplete="tel-national" inputMode="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} {...ctl("phone")} />
          </div>
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("nationality")} label={f.nationality} error={errors.nationality} required requiredLabel={f.required}>
          <input type="text" autoComplete="country-name" value={v.nationality} onChange={(e) => set("nationality", e.target.value)} {...ctl("nationality")} />
        </Field>
        <Field id={id("curriculum")} label={f.curriculum} error={errors.curriculum} required requiredLabel={f.required}>
          <select value={v.curriculum} onChange={(e) => set("curriculum", e.target.value)} {...ctl("curriculum")}>
            <option value="">{f.choose}</option>
            {options.curricula.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("program")} label={f.program} error={errors.program} required requiredLabel={f.required}>
          <select value={v.program} onChange={(e) => set("program", e.target.value)} {...ctl("program")}>
            <option value="">{f.choose}</option>
            <option value="undecided">{f.undecided}</option>
            {options.programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("intake")} label={f.intake} error={errors.intake} required requiredLabel={f.required}>
          <select value={v.intake} onChange={(e) => set("intake", e.target.value)} {...ctl("intake")}>
            <option value="">{f.choose}</option>
            {options.intakes.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
            <option value="undecided">{f.undecided}</option>
          </select>
        </Field>
      </div>
      <Field id={id("message")} label={f.message}>
        <textarea rows={3} value={v.message} onChange={(e) => set("message", e.target.value)} className={controlClass(false)} />
      </Field>
      <div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={id("consent")}
            checked={v.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy(id("consent"), errors.consent)}
            className="mt-1 size-5 shrink-0 accent-[var(--ink)]"
          />
          <label htmlFor={id("consent")} className="text-sm text-ink-soft">
            {f.consent}{" "}
            <Link href={`/${locale}/privacy`} className="link-underline text-ink" target="_blank">
              {f.privacyLink}
            </Link>
          </label>
        </div>
        {errors.consent && (
          <p id={`${id("consent")}-error`} className="mt-2 text-sm text-accent-deep">
            — {errors.consent}
          </p>
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-accent-deep">
          {f.errServer}
        </p>
      )}
      <div>
        <button type="submit" className={buttonClass("solid")} disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? f.submitting : f.submit}
        </button>
      </div>
    </form>
  );
}
