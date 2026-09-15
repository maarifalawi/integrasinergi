import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { List } from "@phosphor-icons/react";
import { z } from "@/lib/z";
import { MobileSheet, type NavLink } from "./MobileSheet";
import { LoginDialog } from "./LoginDialog";

const links: NavLink[] = [
  { label: "Beranda", to: "/" },
  { label: "Tentang Kami", to: "/tentang-kami" },
  { label: "Layanan", to: "/layanan" },
  { label: "Kontak", to: "/kontak" },
];

// Routes whose hero sits on a light surface. At the very top of those pages
// the nav is transparent, so its text must flip to dark to stay readable.
const lightHeroRoutes = new Set(["/", "/layanan", "/tentang-kami", "/kontak"]);

export function Nav() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [navVisible, setNavVisible] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onLightHero = atTop && lightHeroRoutes.has(pathname);
  const linkIdle = onLightHero
    ? "text-foreground/70 hover:text-foreground"
    : "text-white/70 hover:text-white";

  // Keep the bar out of the content's way while moving down the page, then
  // reveal it when the visitor reverses direction. The accumulated threshold
  // filters out touch jitter and mobile address-bar resize noise.
  useEffect(() => {
    let frame = 0;
    let currentAtTop = window.scrollY <= 12;
    let previousY = Math.max(0, window.scrollY);
    let direction: "up" | "down" | null = null;
    let distance = 0;
    setAtTop(currentAtTop);
    setNavVisible(currentAtTop);

    const update = () => {
      frame = 0;
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - previousY;
      const nextAtTop = currentAtTop ? currentY <= 18 : currentY <= 6;

      if (nextAtTop !== currentAtTop) {
        currentAtTop = nextAtTop;
        setAtTop(nextAtTop);
      }

      if (nextAtTop) {
        direction = null;
        distance = 0;
        setNavVisible(true);
      } else if (Math.abs(delta) >= 1) {
        const nextDirection = delta > 0 ? "down" : "up";
        if (nextDirection !== direction) {
          direction = nextDirection;
          distance = 0;
        }
        distance += Math.abs(delta);

        if (distance >= 12) {
          setNavVisible(nextDirection === "up");
          distance = 0;
        }
      }

      previousY = currentY;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Hidden shortcut for staff: two quick Enter presses open the internal
  // login gate. Ignored while typing or while focus sits on any
  // interactive element, so normal keyboard use is never hijacked.
  useEffect(() => {
    let lastPress = 0;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a, [contenteditable]")) {
        lastPress = 0;
        return;
      }
      const now = Date.now();
      if (now - lastPress < 400) {
        lastPress = 0;
        setLogin(true);
      } else {
        lastPress = now;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Route changes return the page to the top, so the navigation should never
  // inherit a hidden state from the previous page.
  useEffect(() => {
    setNavVisible(true);
  }, [pathname]);

  return (
    <>
      {/* Fixed positioning is more stable than sticky while mobile browser
          chrome changes the visual viewport. These two explicit layers keep
          the flow spacer in sync without relying on a calc() height. */}
      <div aria-hidden>
        <div className="h-[env(safe-area-inset-top)]" />
        <div className="h-14 lg:h-12" />
      </div>
      <header
        className={`fixed inset-x-0 top-0 isolate transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:duration-0 lg:translate-y-0 ${
          navVisible || open ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ zIndex: z.nav }}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 border-b border-white/10 bg-nav/82 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-0 ${
            atTop ? "opacity-0" : "opacity-100"
          }`}
        />
        <div aria-hidden className="h-[env(safe-area-inset-top)]" />
        <div className="relative mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 md:px-10 lg:h-12">
          {/* TODO: replace with client SVG at /public/logos/isl.svg */}
          <Link
            to="/"
            className={`text-[19px] font-semibold tracking-[-0.04em] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-0 ${
              onLightHero ? "text-foreground" : "text-foreground-on-dark"
            }`}
          >
            ISLI
          </Link>

          <nav aria-label="Navigasi utama" className="hidden gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className={`text-[0.75rem] leading-none tracking-[-0.01em] transition-colors duration-150 ${linkIdle}`}
                activeProps={{
                  className: onLightHero ? "text-foreground" : "text-white",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLogin(true)}
              className={`hidden text-[0.75rem] leading-none tracking-[-0.01em] transition-colors duration-150 lg:inline ${linkIdle}`}
            >
              Login Internal
            </button>
            <Link
              to="/kontak"
              hash="penawaran"
              className={`bg-primary text-primary-foreground inline-flex items-center rounded-full px-4 py-2 text-[0.75rem] leading-none tracking-[-0.01em] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.96] ${
                atTop ? "shadow-none" : "shadow-[0_8px_24px_-8px_rgba(0,102,204,0.65)]"
              }`}
            >
              Minta Penawaran
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              aria-expanded={open}
              aria-controls="menu-mobile"
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-[color,background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 lg:hidden ${
                onLightHero
                  ? "text-foreground"
                  : "text-foreground-on-dark bg-white/[0.06] active:bg-white/[0.12]"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileSheet
        id="menu-mobile"
        open={open}
        onClose={() => setOpen(false)}
        links={links}
        onLogin={() => setLogin(true)}
      />

      <LoginDialog open={login} onClose={() => setLogin(false)} />
    </>
  );
}
