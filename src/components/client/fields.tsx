"use client";

import type { ReactNode } from "react";

export { controlClass, describedBy, isEmail, isPhone } from "../formStyles";

export function Field({ id, label, error, required, requiredLabel, children, hint }: { id: string; label: ReactNode; error?: string; required?: boolean; requiredLabel?: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="text-accent-deep" aria-hidden="true">
            {" "}*
          </span>
        )}
        {required && requiredLabel && <span className="sr-only"> ({requiredLabel})</span>}
      </label>
      {hint && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-accent-deep">
          <span aria-hidden="true">—</span>
          {error}
        </p>
      )}
    </div>
  );
}

