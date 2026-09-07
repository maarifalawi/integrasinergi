import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import "@fontsource-variable/inter";
import "@fontsource-variable/geist-mono";
import appCss from "../styles.css?url";
import { SkipLink } from "@/components/layout/SkipLink";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";

function NotFoundComponent() {
  return (
    <div className="bg-background flex min-h-[100dvh] items-center justify-center px-6">
      <div className="max-w-[692px] text-center">
        <h1 className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]">
          Halaman tidak ditemukan
        </h1>
        <p className="text-muted-foreground mt-4 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
          Alamat yang Anda buka tidak tersedia atau sudah dipindahkan.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="bg-primary text-primary-foreground inline-flex min-h-[44px] items-center justify-center rounded-full px-[22px] py-[11px] text-[17px] transition-transform duration-[120ms] active:scale-[0.96]"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-[100dvh] items-center justify-center px-6">
      <div className="max-w-[692px] text-center">
        <h1 className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]">
          Halaman ini gagal dimuat
        </h1>
        <p className="text-muted-foreground mt-4 text-[1.0625rem] leading-[1.47] tracking-[-0.022em]">
          Terjadi kesalahan di sisi kami. Silakan muat ulang halaman.
        </p>
        <div className="mt-8">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary text-primary-foreground inline-flex min-h-[44px] items-center justify-center rounded-full px-[22px] py-[11px] text-[17px] transition-transform duration-[120ms] active:scale-[0.96]"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "preload",
        as: "image",
        href: "/img/hero-container-yard.jpg",
        fetchPriority: "high",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScrollProvider>
        <SkipLink />
        <Nav />
        <main id="konten">
          <PageTransition>
            {/* Required: nested routes render here. */}
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
      </SmoothScrollProvider>
    </QueryClientProvider>
  );
}
