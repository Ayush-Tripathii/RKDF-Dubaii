"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { Dict } from "@content/translations";
import { fmt } from "@content/translations";
import type { Locale } from "@content/types";
import { buttonClass } from "../Button";
import { Icon } from "../Icon";
import { Field, controlClass, describedBy, isEmail, isPhone } from "./fields";

type Values = { date: string; time: string; visitors: string; name: string; email: string; cc: string; phone: string; consent: boolean };

const tomorrowISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai" }).format(d);
};

/** Campus tour booking — date picker + contact details, with inline validation and a real success state. */
export function VisitForm({ dict, locale, countryCodes }: { dict: Dict; locale: Locale; countryCodes: { code: string; label: string }[] }) {
  const f = dict.forms;
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [v, setV] = useState<Values>({ date: "", time: "morning", visitors: "1", name: "", email: "", cc: "+971", phone: "", consent: false });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [ref, setRef] = useState("");

  const validate = (x: Values) => {
    const e: Partial<Record<keyof Values, string>> = {};
    if (!x.date || x.date < tomorrowISO()) e.date = f.errDate;
    if (x.name.trim().length < 2) e.name = f.errName;
    if (!isEmail(x.email)) e.email = f.errEmail;
    if (!isPhone(x.phone)) e.phone = f.errPhone;
    if (!x.consent) e.consent = f.errConsent;
    return e;
  };
  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (submitted) setErrors(validate(next));
  };
  const ctl = (k: keyof Values) => ({ id: id(k), "aria-invalid": errors[k] ? true : undefined, "aria-describedby": describedBy(id(k), errors[k]), className: controlClass(!!errors[k]) });

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setSubmitted(true);
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) {
      const form = ev.currentTarget;
      requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "visit", locale, ...v }) });
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
      <div role="status" className="border border-line bg-surface p-8">
        <span className="flex size-12 items-center justify-center rounded-full border border-accent text-accent-deep">
          <Icon name="check" />
        </span>
        <h3 className="font-display mt-6 text-display-3 font-light">{f.successVisitTitle}</h3>
        <p className="mt-4">{fmt(f.successVisitBody, { ref })}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 border border-line bg-surface p-6 lg:p-8">
      {submitted && Object.keys(errors).length > 0 && (
        <div role="alert" className="border-s-2 border-accent-deep px-4 py-2 text-sm text-accent-deep">
          {fmt(f.errorsSummary, { n: Object.keys(errors).length })}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-3">
        <Field id={id("date")} label={f.visitDate} error={errors.date} required requiredLabel={f.required}>
          <input type="date" ref={(el) => { if (el) el.min = tomorrowISO(); }} value={v.date} onChange={(e) => set("date", e.target.value)} {...ctl("date")} />
        </Field>
        <Field id={id("time")} label={f.visitTime}>
          <select value={v.time} onChange={(e) => set("time", e.target.value)} className={controlClass(false)} id={id("time")}>
            <option value="morning">{f.morning}</option>
            <option value="afternoon">{f.afternoon}</option>
          </select>
        </Field>
        <Field id={id("visitors")} label={f.visitors}>
          <select value={v.visitors} onChange={(e) => set("visitors", e.target.value)} className={controlClass(false)} id={id("visitors")}>
            {["1", "2", "3", "4", "5", "6"].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id={id("name")} label={f.name} error={errors.name} required requiredLabel={f.required}>
        <input type="text" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} {...ctl("name")} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("email")} label={f.email} error={errors.email} required requiredLabel={f.required}>
          <input type="email" autoComplete="email" dir="ltr" value={v.email} onChange={(e) => set("email", e.target.value)} {...ctl("email")} />
        </Field>
        <Field id={id("phone")} label={f.phone} error={errors.phone} required requiredLabel={f.required}>
          <div className="flex gap-2" dir="ltr">
            <select aria-label={f.countryCode} value={v.cc} onChange={(e) => set("cc", e.target.value)} className={controlClass(false, "w-[7.5rem] shrink-0")}>
              {countryCodes.map((c) => (
                <option key={c.code + c.label} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <input type="tel" autoComplete="tel-national" inputMode="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} {...ctl("phone")} />
          </div>
        </Field>
      </div>
      <div>
        <div className="flex items-start gap-3">
          <input type="checkbox" id={id("consent")} checked={v.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={errors.consent ? true : undefined} aria-describedby={describedBy(id("consent"), errors.consent)} className="mt-1 size-5 shrink-0 accent-[var(--ink)]" />
          <label htmlFor={id("consent")} className="text-sm">
            {f.consent}{" "}
            <Link href={`/${locale}/privacy`} className="link-underline text-ink">
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
        <button type="submit" className={buttonClass("ink")} disabled={status === "sending"}>
          {status === "sending" ? f.submitting : f.bookTour}
        </button>
      </div>
    </form>
  );
}
