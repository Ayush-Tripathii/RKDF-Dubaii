import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type ButtonVariant = "solid" | "ghost" | "quiet" | "ink";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[2px] px-6 text-[0.9375rem] font-medium leading-none tracking-[0.01em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  /** The single filled accent CTA per viewport. */
  solid: "bg-accent-deep text-on-accent hover:bg-ink",
  ink: "bg-ink text-canvas hover:bg-accent-deep",
  ghost: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-canvas",
  quiet: "min-h-0 px-0 text-ink underline decoration-line decoration-1 underline-offset-[0.4em] hover:decoration-accent",
};

export const buttonClass = (variant: ButtonVariant = "solid", extra = "") => `${base} ${variants[variant]} ${extra}`;

type Common = { variant?: ButtonVariant; icon?: IconName; children: ReactNode; className?: string };

export function ButtonLink({ variant = "solid", icon, children, className = "", ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass(variant, className)} {...rest}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />}
    </Link>
  );
}

export function Button({ variant = "solid", icon, children, className = "", ...rest }: Common & ComponentProps<"button">) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} />}
    </button>
  );
}

/** Editorial text link with arrow — used for "Explore school", "View program" etc. */
export function ArrowLink({ children, className = "", ...rest }: { children: ReactNode; className?: string } & ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink underline decoration-line decoration-1 underline-offset-[0.4em] transition-colors duration-300 ease-editorial hover:decoration-accent ${className}`}
      {...rest}
    >
      {children}
      <Icon name="arrow" size={16} className="transition-transform duration-300 ease-editorial group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}
