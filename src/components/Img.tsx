import Image from "next/image";
import type { ImageRef, Locale } from "@content/types";
import { Tx, plain } from "@/lib/tokens";

/**
 * Image with reserved space (no layout shift). `ratio` crops via object-cover inside a fixed aspect box.
 * Temp images carry data-temp so they can be audited before launch.
 */
export function Img({
  image,
  locale,
  ratio,
  sizes,
  preload = false,
  className = "",
  imgClassName = "",
  decorative = false,
}: {
  image: ImageRef;
  locale: Locale;
  ratio?: string; // e.g. "4/3"
  sizes: string;
  preload?: boolean;
  className?: string;
  imgClassName?: string;
  decorative?: boolean;
}) {
  // ratio="fill": size comes from the parent (e.g. a grid row-span cell) instead of an aspect ratio.
  const style = ratio === "fill" ? undefined : { aspectRatio: ratio ?? `${image.width}/${image.height}` };
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`} style={style} data-temp={image.temp ? "true" : undefined}>
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt[locale]}
        fill
        sizes={sizes}
        preload={preload}
        loading={preload ? undefined : "lazy"}
        quality={70}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}

/** A deliberate empty slot for imagery that must not be stock (portraits, logos, maps). */
export function Slot({ label, token, ratio = "4/5", className = "" }: { label: string; token: string; ratio?: string; className?: string }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 border border-dashed border-ink/20 bg-sand p-4 text-center ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`${label}: ${plain(token)}`}
    >
      <span className="eyebrow">{label}</span>
      <span className="text-sm text-ink"><Tx>{token}</Tx></span>
    </div>
  );
}
