import { motion, useReducedMotion } from "motion/react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsapp } from "@/data/contacts";
import { z } from "@/lib/z";

/** Minimal contact affordance: a quiet, icon-only pill that only
 *  gains a little presence on hover. Arrives late so it never
 *  competes with the page content. */
export function WhatsAppButton() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi ISLI melalui WhatsApp"
      title="Chat WhatsApp"
      className="group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.08] bg-background/90 text-whatsapp shadow-[0_6px_20px_rgba(0,0,0,0.08)] ring-1 ring-transparent backdrop-blur-sm transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-whatsapp/25 hover:bg-whatsapp hover:text-whatsapp-foreground hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] active:translate-y-0 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/50 focus-visible:ring-offset-2 md:right-[max(1.5rem,env(safe-area-inset-right))] md:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
      style={{ zIndex: z.whatsapp }}
      {...(reduce
        ? { initial: false as const }
        : {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: {
              duration: 0.35,
              delay: 1.6,
              ease: [0.16, 1, 0.3, 1] as const,
            },
          })}
    >
      <WhatsappLogo
        size={24}
        weight="fill"
        className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
      />
    </motion.a>
  );
}
