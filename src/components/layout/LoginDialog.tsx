import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { z } from "@/lib/z";

const PIN = "9909";
const EASE = [0.16, 1, 0.3, 1] as const;

type Step = "confirm" | "pin" | "done";

/**
 * IntegraOps gate. Confirmation first, then a four digit PIN. There is no
 * backend behind this: a correct PIN only unlocks the confirmation screen.
 */
export function LoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("confirm");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setStep("confirm");
    setPin("");
    setError(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (step === "pin") inputRef.current?.focus();
  }, [step]);

  // While the dialog is up, the page behind it must not scroll.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (pin.trim() !== PIN) {
      setError(true);
      return;
    }
    setError(false);
    setStep("done");
  };

  return (
    <AnimatePresence>
      {open ? (
        <div
          data-lenis-prevent
          className="fixed inset-0 flex items-center justify-center px-6"
          style={{ zIndex: z.mobileSheet }}
        >
          {/* data-lenis-prevent stops Lenis (desktop smooth scroll) from
              hijacking wheel events over the dialog; body overflow:hidden
              above covers native scroll everywhere else.
              backdropFilter is animated (not a static class) so the blur
              interpolates smoothly instead of snapping in fully applied. */}
          <motion.button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
            initial={reduce ? false : { opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.32, ease: EASE }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Login internal IntegraOps, khusus tim ISLI"
            className="bg-background relative w-full max-w-[420px] rounded-[var(--radius-card)] p-8"
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup dialog"
              className="text-muted-foreground absolute top-4 right-4 flex h-11 w-11 items-center justify-center"
            >
              <X size={18} />
            </button>

            {step === "confirm" ? (
              <>
                <span className="border-border text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.08em] uppercase">
                  Khusus tim internal
                </span>
                <h2 className="text-foreground mt-4 text-[1.3125rem] leading-[1.19] font-semibold tracking-[-0.012em]">
                  Login ini hanya untuk tim internal ISLI
                </h2>
                <p className="text-muted-foreground mt-4 text-[0.9375rem] leading-[1.47] tracking-[-0.016em]">
                  Area ini adalah akses ke sistem internal IntegraOps. Jika Anda pengunjung atau
                  calon klien, Anda tidak perlu login &mdash; semua informasi layanan tersedia
                  langsung di situs ini.
                </p>
                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("pin")}
                    className="bg-primary text-primary-foreground inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full px-[22px] text-[0.9375rem] transition-transform duration-[120ms] active:scale-[0.96]"
                  >
                    Saya tim ISLI
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="border-border text-foreground inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border px-[22px] text-[0.9375rem] transition-transform duration-[120ms] active:scale-[0.96]"
                  >
                    Kembali
                  </button>
                </div>
              </>
            ) : null}

            {step === "pin" ? (
              <form onSubmit={submit} noValidate>
                <h2 className="text-foreground text-[1.3125rem] leading-[1.19] font-semibold tracking-[-0.012em]">
                  Masukkan PIN akses
                </h2>
                <label
                  htmlFor="pin-integraops"
                  className="text-muted-foreground mt-4 block text-[0.875rem] leading-[1.43] tracking-[-0.016em]"
                >
                  PIN IntegraOps
                </label>
                <input
                  id="pin-integraops"
                  ref={inputRef}
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={8}
                  value={pin}
                  onChange={(event) => setPin(event.target.value)}
                  aria-invalid={error}
                  {...(error ? { "aria-describedby": "pin-error" } : {})}
                  className={`mt-3 h-[52px] w-full rounded-[var(--radius-input)] border bg-transparent px-4 font-mono text-[17px] tracking-[0.3em] outline-none transition-colors duration-150 focus:border-[var(--primary)] ${
                    error ? "border-[var(--destructive)]" : "border-border"
                  }`}
                />
                {error ? (
                  <p
                    id="pin-error"
                    className="mt-3 text-[0.875rem] leading-[1.43] tracking-[-0.016em] text-[var(--destructive)]"
                  >
                    PIN salah. Coba lagi.
                  </p>
                ) : null}
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-[22px] text-[0.9375rem] transition-transform duration-[120ms] active:scale-[0.96]"
                >
                  Masuk
                </button>
              </form>
            ) : null}

            {step === "done" ? (
              <>
                <h2 className="text-foreground text-[1.3125rem] leading-[1.19] font-semibold tracking-[-0.012em]">
                  PIN diterima.
                </h2>
                <p className="text-muted-foreground mt-4 text-[0.9375rem] leading-[1.47] tracking-[-0.016em]">
                  Sistem IntegraOps sedang disiapkan. Tim internal akan mendapatkan akses penuh di
                  tahap berikutnya.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-primary text-primary-foreground mt-8 inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-[22px] text-[0.9375rem] transition-transform duration-[120ms] active:scale-[0.96]"
                >
                  Tutup
                </button>
              </>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
