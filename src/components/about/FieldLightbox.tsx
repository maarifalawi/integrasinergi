import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { z } from "@/lib/z";
import { galleryPhotos } from "@/data/gallery";

const EASE = [0.16, 1, 0.3, 1] as const;
const PHOTO_WIDTH = 1080;
const PHOTO_HEIGHT = 1350;

const control =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-foreground-on-dark transition-all duration-[120ms] ease-out hover:border-white/50 hover:bg-white/10 active:scale-[0.96]";

/**
 * Field viewer. The same manual modal pattern as LoginDialog: no portal and no
 * Radix, Escape closes, body scroll is locked while it is up. Arrow keys and
 * the two 44px buttons walk the set; closing hands focus back to the
 * thumbnail that opened it, which the gallery owns.
 */
export function FieldLightbox({
  index,
  onClose,
  onNavigate,
}: {
  /** null while the viewer is closed */
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = galleryPhotos.length;
  const open = index !== null;
  const photo = index === null ? null : (galleryPhotos[index] ?? null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight") onNavigate((index + 1) % total);
      if (event.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNavigate, total]);

  // The viewer, not the page, owns the keyboard while it is up.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  // While the viewer is up, the page behind it must not scroll.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {photo && index !== null ? (
        <div
          data-lenis-prevent
          className="fixed inset-0 flex items-center justify-center px-4 py-8 md:px-6"
          style={{ zIndex: z.mobileSheet }}
        >
          {/* data-lenis-prevent stops Lenis (desktop smooth scroll) from
              hijacking wheel events over the viewer; body overflow:hidden
              above covers native scroll everywhere else.
              backdropFilter is animated (not a static class) so the blur
              interpolates smoothly instead of snapping in fully applied. */}
          <motion.button
            type="button"
            aria-label="Tutup galeri"
            onClick={onClose}
            className="absolute inset-0 bg-black/80"
            initial={reduce ? false : { opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.32, ease: EASE }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Galeri lapangan"
            className="relative flex w-full max-w-[1000px] flex-col items-center"
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.995 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            {/* keyed on the frame, so stepping through the set crossfades
                instead of snapping between two unrelated images. */}
            <AnimatePresence mode="wait">
              <motion.figure
                key={photo.src}
                className="flex flex-col items-center"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: EASE }}
              >
                <img
                  src={photo.src}
                  width={PHOTO_WIDTH}
                  height={PHOTO_HEIGHT}
                  alt={photo.alt}
                  decoding="async"
                  className="max-h-[68svh] w-auto rounded-[var(--radius-card)] object-contain"
                />
                <figcaption className="mt-5 text-center">
                  <p className="text-foreground-on-dark text-[1.0625rem] leading-[1.24] font-semibold tracking-[-0.022em]">
                    {photo.title}
                  </p>
                  <p className="text-muted-foreground-on-dark mt-1 font-mono text-[11px] tracking-[0.1em] uppercase">
                    {photo.meta}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate((index - 1 + total) % total)}
                aria-label="Foto sebelumnya"
                className={control}
              >
                <ArrowLeft aria-hidden size={18} />
              </button>
              <p className="text-muted-foreground-on-dark min-w-[92px] text-center font-mono text-[11px] tracking-[0.14em] tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => onNavigate((index + 1) % total)}
                aria-label="Foto berikutnya"
                className={control}
              >
                <ArrowRight aria-hidden size={18} />
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Tutup galeri"
                className="text-foreground-on-dark ml-2 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-4 text-[0.9375rem] transition-all duration-[120ms] ease-out hover:border-white/50 hover:bg-white/10 active:scale-[0.96]"
              >
                <X aria-hidden size={16} />
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
