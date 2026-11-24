"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "../Icon";

/**
 * Modal built on native <dialog>: focus is contained, the page behind is inert,
 * Esc closes, focus returns to the opener. Backdrop click closes.
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  closeLabel,
  children,
  variant = "panel",
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  closeLabel: string;
  children: ReactNode;
  variant?: "panel" | "full" | "top";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const shape = {
    panel: "m-auto w-[min(100vw-2rem,44rem)] max-h-[min(100dvh-2rem,56rem)] border border-line",
    full: "m-0 h-dvh max-h-none w-screen max-w-none",
    top: "mx-auto mt-[10vh] w-[min(100vw-2rem,44rem)] max-h-[75vh] border border-line",
  }[variant];

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={`dialog bg-canvas p-0 text-ink-soft backdrop:bg-ink/30 backdrop:backdrop-blur-[2px] ${shape}`}
    >
      <div className="relative h-full">
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute end-3 top-3 z-10 flex size-11 items-center justify-center text-ink transition-colors hover:text-accent-deep"
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
