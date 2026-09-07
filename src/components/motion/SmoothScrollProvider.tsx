import Lenis from "lenis";
import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One Lenis instance at the app root. Created only above 1024px and only when
 * the visitor has not asked for reduced motion. Native scroll everywhere else.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const destroy = () => {
      if (tickerRef.current) gsap.ticker.remove(tickerRef.current);
      tickerRef.current = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const create = () => {
      if (lenisRef.current) return;
      const lenis = new Lenis({
        lerp: 0.075,
        duration: 1.45,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      tickerRef.current = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerRef.current);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.config({ ignoreMobileResize: true });

      void document.fonts?.ready.then(() => ScrollTrigger.refresh());
    };

    const sync = () => {
      if (desktop.matches && !reduce.matches) create();
      else destroy();
    };

    sync();
    desktop.addEventListener("change", sync);
    reduce.addEventListener("change", sync);

    return () => {
      desktop.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      destroy();
    };
  }, []);

  useEffect(() => {
    // On every route change: jump to top, then re-measure.
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
