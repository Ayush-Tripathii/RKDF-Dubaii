import Link from "next/link";
import { whatsappHref } from "@content/site";
import type { Dict } from "@content/translations";
import type { Locale } from "@content/types";
import { EnquireButton } from "./client/UIProvider";
import { Icon } from "./Icon";

/** Mobile sticky bar: Enquire · WhatsApp · Apply. */
export function MobileBar({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="grid h-16 grid-cols-3">
        <EnquireButton variant="quiet" className="h-full !min-h-0 rounded-none border-e border-line !no-underline">
          {dict.common.enquire}
        </EnquireButton>
        <a href={whatsappHref(locale)} className="flex h-full items-center justify-center gap-2 border-e border-line text-[0.9375rem] font-medium text-ink">
          <Icon name="whatsapp" size={18} className="text-whatsapp" />
          {dict.common.whatsapp}
        </a>
        <Link href={`/${locale}/apply`} className="flex h-full items-center justify-center bg-accent-deep text-[0.9375rem] font-medium text-on-accent">
          {dict.common.apply}
        </Link>
      </div>
    </div>
  );
}

/** Floating WhatsApp button — desktop (mobile has it in the sticky bar). */
export function WhatsAppFab({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <a
      href={whatsappHref(locale)}
      aria-label={dict.common.chatOnWhatsapp}
      className="fixed end-6 bottom-6 z-30 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_32px_-12px_rgb(26_44_91/0.5)] transition-transform duration-300 ease-editorial hover:-translate-y-0.5 lg:flex"
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
