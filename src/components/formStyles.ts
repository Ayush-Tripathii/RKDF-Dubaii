/** Shared form styles & validators — plain module, usable from server and client components. */
const control =
  "mt-2 block min-w-0 rounded-[2px] border bg-surface px-4 py-3 text-[1rem] text-ink placeholder:text-ink-soft/70 transition-colors duration-200 hover:border-ink/40 focus-visible:border-ink disabled:cursor-not-allowed disabled:bg-sand disabled:opacity-70";

export const controlClass = (invalid: boolean, width = "w-full") => `${control} ${width} ${invalid ? "border-accent-deep" : "border-line"}`;
export const describedBy = (id: string, error?: string) => (error ? `${id}-error` : undefined);
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isPhone = (v: string) => /^\d{6,15}$/.test(v.replace(/[\s\-()]/g, ""));
