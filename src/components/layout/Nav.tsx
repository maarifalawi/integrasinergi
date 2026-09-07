import { useEffect, useRef, useState } from "react";
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
  const sentinel = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onLightHero = atTop && lightHeroRoutes.has(pathname);
  const linkIdle = onLightHero
    ? "text-foreground/70 hover:text-foreground"
    : "text-white/70 hover:text-white";

  // No scroll listener: a zero-height sentinel at the very top of the page
  // tells us, via IntersectionObserver, whether the page is still unscrolled.
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAtTop(Boolean(entry?.isIntersecting)),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-0 w-full" />
      <header
        className={`sticky top-0 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          atTop ? "border-transparent bg-transparent" : "bg-nav/80 border-white/10 backdrop-blur-xl"
        }`}
        style={{ zIndex: z.nav }}
      >
        <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-6 md:px-10">
          {/* TODO: replace with client SVG at /public/logos/isl.svg */}
          <Link
            to="/"
            className={`text-[19px] font-semibold tracking-[-0.04em] transition-colors duration-300 ${
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
              Login
            </button>
            <Link
              to="/kontak"
              hash="penawaran"
              className="bg-primary text-primary-foreground inline-flex items-center rounded-full px-4 py-2 text-[0.75rem] leading-none tracking-[-0.01em] transition-transform duration-[120ms] active:scale-[0.96]"
            >
              Minta Penawaran
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              aria-expanded={open}
              aria-controls="menu-mobile"
              className={`-mr-3 flex h-11 w-11 items-center justify-center transition-colors duration-300 lg:hidden ${
                onLightHero ? "text-foreground" : "text-foreground-on-dark"
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
