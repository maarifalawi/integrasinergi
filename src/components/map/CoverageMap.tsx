import { useEffect, useRef } from "react";
import gsap from "gsap";
import { charts, ORIGIN, type Point, type TabId } from "@/data/ports";

/**
 * Tier 3, the single signature moment on the site, and the only file allowed
 * to import GSAP. The route drawing is bound to a tab click, never to scroll,
 * so the heaviest animation on the site runs while the page is stationary.
 *
 * Sub-768px fallback: this whole figure is removed from the layout and from
 * the accessibility tree. The tabs and the summary list carry the same
 * information there, and no GSAP context is ever created.
 */

const EASE_OUT_EXPO = "expo.out";

function arc(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  // perpendicular offset, 16% of the chord, always bowing north
  const nx = -dy / len;
  const ny = dx / len;
  const bow = len * 0.16 * (ny > 0 ? -1 : 1);
  return `M ${x1} ${y1} Q ${mx + nx * bow} ${my + ny * bow} ${x2} ${y2}`;
}

function Graticule({ width, height }: { width: number; height: number }) {
  const verticals: number[] = [];
  for (let x = 100; x < width; x += 100) verticals.push(x);
  const horizontals: number[] = [];
  for (let y = 60; y < height; y += 60) horizontals.push(y);

  return (
    <g shapeRendering="crispEdges">
      {verticals.map((x) => (
        <line
          key={`v${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      ))}
      {horizontals.map((y) => (
        <line
          key={`h${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      ))}
    </g>
  );
}

type Destination = { point: Point; d: string; length: number };

function Chart({ tab, active }: { tab: TabId; active: boolean }) {
  const chart = charts[tab];
  const origin = chart.origin;

  const destinations: Destination[] = chart.nodes
    .map((point) => ({
      point,
      d: arc(origin.x, origin.y, point.x, point.y),
      length: Math.hypot(point.x - origin.x, point.y - origin.y),
    }))
    // nearest destination draws first
    .sort((a, b) => a.length - b.length);

  return (
    <svg
      viewBox={`0 0 ${chart.width} ${chart.height}`}
      className="absolute inset-0 h-full w-full"
      data-chart={tab}
      role="img"
      aria-label={`Peta jaringan ${chart.label} secara umum, bukan daftar lengkap rute`}
      style={{ opacity: active ? 1 : 0 }}
    >
      <Graticule width={chart.width} height={chart.height} />

      <line
        x1={0}
        y1={chart.equatorY}
        x2={chart.width}
        y2={chart.equatorY}
        stroke="rgba(255,255,255,0.14)"
        strokeDasharray="4 6"
      />

      <g data-routes>
        {destinations.map((destination, index) => (
          <path
            key={index}
            d={destination.d}
            stroke="var(--primary-on-dark)"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
            opacity={0.75}
          />
        ))}
      </g>

      <g data-ghosts />

      <g
        data-marker
        data-origin="true"
        className="group focus:outline-none"
        tabIndex={0}
        role="img"
        aria-label="Titik asal"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle cx={origin.x} cy={origin.y} r={16} fill="transparent" className="cursor-pointer" />
        <circle
          data-dot
          cx={origin.x}
          cy={origin.y}
          r={5}
          fill="var(--primary-on-dark)"
          className="transition-[r] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[r:5.5] group-focus-visible:[r:5.5]"
        />
      </g>

      {chart.nodes.map((point, index) => (
        <g
          key={index}
          data-marker
          className="group focus:outline-none"
          tabIndex={0}
          role="img"
          aria-label="Titik tujuan"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx={point.x} cy={point.y} r={14} fill="transparent" className="cursor-pointer" />
          <circle
            data-dot
            cx={point.x}
            cy={point.y}
            r={3.5}
            fill="rgba(255,255,255,0.55)"
            className="transition-[r] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[r:5.5] group-focus-visible:[r:5.5]"
          />
        </g>
      ))}
    </svg>
  );
}

export default function CoverageMap({ tab }: { tab: TabId }) {
  const figureRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const root = figureRef.current;
    if (!root) return;

    const wide = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const svgs = Array.from(root.querySelectorAll<SVGSVGElement>("svg[data-chart]"));
    const incoming = svgs.find((svg) => svg.dataset["chart"] === tab);
    const outgoing = svgs.filter((svg) => svg.dataset["chart"] !== tab);
    if (!incoming) return;

    const routes = Array.from(incoming.querySelectorAll<SVGPathElement>("[data-routes] path"));
    const markers = Array.from(incoming.querySelectorAll<SVGGElement>("[data-marker]"));
    const ghostLayer = incoming.querySelector<SVGGElement>("[data-ghosts]");

    // Reduced motion, and every viewport below 768px, render the final state
    // and never create a GSAP context at all.
    if (!wide || reduce) {
      incoming.style.opacity = "1";
      outgoing.forEach((svg) => {
        svg.style.opacity = "0";
      });
      routes.forEach((path) => {
        path.style.strokeDasharray = "";
        path.style.strokeDashoffset = "";
      });
      markers.forEach((marker) => {
        marker.style.transform = "";
      });
      return;
    }

    const ctx = gsap.context(() => {
      timelineRef.current?.kill();
      if (ghostLayer) ghostLayer.replaceChildren();

      // Hard reset, so a rapid tab switch can never leave a route half drawn
      // or a marker mid scale.
      const lengths = routes.map((path) => path.getTotalLength());
      routes.forEach((path, index) => {
        const length = lengths[index] ?? 0;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });
      gsap.set(markers, { scale: 0.6, willChange: "transform" });
      gsap.set(outgoing, { opacity: 0 });

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.to(outgoing, { opacity: 0, duration: 0.24, ease: "power1.inOut" }, 0);
      tl.fromTo(
        incoming,
        { opacity: 0 },
        { opacity: 1, duration: 0.24, ease: "power1.inOut" },
        0.24,
      );

      tl.to(
        routes,
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: EASE_OUT_EXPO,
          stagger: 0.04,
        },
        0.3,
      );

      tl.to(
        markers,
        {
          scale: 1,
          duration: 0.4,
          ease: EASE_OUT_EXPO,
          stagger: 0.04,
          onComplete: () => {
            gsap.set(markers, { willChange: "auto" });
          },
        },
        0.3,
      );

      // One ghost pulse per marker, on its own arrival. Nothing repeats.
      markers.forEach((marker, index) => {
        const dot = marker.querySelector<SVGCircleElement>("[data-dot]");
        if (!dot || !ghostLayer) return;
        const r = Number(dot.getAttribute("r"));
        tl.call(
          () => {
            const ghost = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            ghost.setAttribute("cx", dot.getAttribute("cx")!);
            ghost.setAttribute("cy", dot.getAttribute("cy")!);
            ghost.setAttribute("r", String(r));
            ghost.setAttribute("fill", dot.getAttribute("fill")!);
            ghostLayer.appendChild(ghost);
            gsap.to(ghost, {
              attr: { r: r * 1.9 },
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
              onComplete: () => ghost.remove(),
            });
          },
          [],
          0.3 + index * 0.04,
        );
      });
    }, root);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      // Ghost pulses are created inside timeline callbacks, so they live
      // outside the context and must be cleared by hand.
      if (ghostLayer) {
        gsap.killTweensOf(Array.from(ghostLayer.children));
        ghostLayer.replaceChildren();
      }
      ctx.revert();
    };
  }, [tab]);

  return (
    <div
      ref={figureRef}
      className="relative aspect-[1000/420] w-full overflow-hidden rounded-[var(--radius-card)] bg-[var(--tile-dark-2)]"
    >
      <Chart tab="domestik" active={tab === "domestik"} />
      <Chart tab="internasional" active={tab === "internasional"} />
    </div>
  );
}
