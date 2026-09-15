import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { coverage, type LatLng, type TabId } from "@/data/ports";

/**
 * Tier 3, the single signature moment on the site: a real map rendered from
 * Esri light canvas tiles, with curved routes drawn from the Jakarta origin
 * to every destination of the active tab.
 *
 * Leaflet is dynamically imported so its module never evaluates on the server,
 * and the whole map is torn down and rebuilt on every tab switch. The route
 * draw-in uses the Web Animations API, bound to the tab click, never to scroll.
 */

// Esri light canvas tiles keep the map itself clean and white while the
// surrounding coverage section retains its dark visual treatment.
const TILES_BASE =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const TILES_LABELS =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}";
const ATTRIBUTION =
  'Esri, TomTom, Garmin, FAO, NOAA, USGS &middot; &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

const ROUTE_COLOR = "#0066cc"; // var(--primary)

type LeafletModule = typeof import("leaflet");

/**
 * Shift a longitude into the copy of the world closest to the origin, so every
 * route takes the short way around the globe instead of crossing the whole map.
 */
function nearestLng(lng: number, originLng: number) {
  let adjusted = lng;
  while (adjusted - originLng > 180) adjusted -= 360;
  while (originLng - adjusted > 180) adjusted += 360;
  return adjusted;
}

/** Quadratic bezier between two geographic points, always bowing north on screen. */
function curvedRoute(map: LeafletMap, L: LeafletModule, from: LatLng, to: LatLng): LatLng[] {
  const zoom = map.getZoom();
  const p1 = map.project(L.latLng(from[0], from[1]), zoom);
  const p2 = map.project(L.latLng(to[0], to[1]), zoom);
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy);
  if (len === 0) return [from, to];

  // Perpendicular offset, 16% of the chord, always bowing north (up on screen).
  const nx = -dy / len;
  const ny = dx / len;
  const bow = len * 0.16 * (ny > 0 ? -1 : 1);
  const cx = (p1.x + p2.x) / 2 + nx * bow;
  const cy = (p1.y + p2.y) / 2 + ny * bow;

  const points: LatLng[] = [];
  for (let i = 0; i <= 40; i += 1) {
    const t = i / 40;
    const u = 1 - t;
    const x = u * u * p1.x + 2 * u * t * cx + t * t * p2.x;
    const y = u * u * p1.y + 2 * u * t * cy + t * t * p2.y;
    const latLng = map.unproject(L.point(x, y), zoom);
    points.push([latLng.lat, latLng.lng]);
  }
  return points;
}

/** Route draw-in plus marker fade-in, staggered per element. */
function animateIn(map: LeafletMap) {
  const routesPane = map.getPane("routes");
  const markersPane = map.getPane("markers");
  if (!routesPane || !markersPane) return;

  routesPane.querySelectorAll<SVGPathElement>("path").forEach((path, index) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    const animation = path.animate(
      [{ strokeDashoffset: String(length) }, { strokeDashoffset: "0" }],
      {
        duration: 900,
        delay: 250 + index * 45,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "forwards",
      },
    );
    animation.onfinish = () => {
      path.style.strokeDasharray = "";
      path.style.strokeDashoffset = "";
    };
  });

  markersPane.querySelectorAll<SVGPathElement>("path").forEach((path, index) => {
    path.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 350,
      delay: 300 + index * 45,
      fill: "backwards",
    });
  });
}

export default function CoverageMap({ tab }: { tab: TabId }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let map: LeafletMap | undefined;

    async function build() {
      const L = await import("leaflet");
      const container = containerRef.current;
      if (disposed || !container) return;

      const chart = coverage[tab];
      // Narrow screens sit one zoom level further out, so the network stays
      // inside the viewport without forcing the visitor to drag first.
      const wide = window.matchMedia("(min-width: 768px)").matches;

      map = L.map(container, {
        center: chart.center,
        zoom: wide ? chart.zoom : chart.zoom - 1,
        minZoom: 1,
        maxZoom: 10,
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        worldCopyJump: true,
      });
      map.attributionControl.setPrefix(false);

      L.tileLayer(TILES_BASE, { attribution: ATTRIBUTION }).addTo(map);
      // Labels sit in the marker pane's tile slot so they render above the
      // routes instead of being hidden underneath them.
      map.createPane("labels");
      map.getPane("labels")!.style.zIndex = "430";
      map.getPane("labels")!.style.pointerEvents = "none";
      L.tileLayer(TILES_LABELS, { pane: "labels" }).addTo(map);

      // Dedicated panes keep routes under markers and let the animation target
      // each layer without touching the tile pane.
      map.createPane("routes");
      map.getPane("routes")!.style.zIndex = "410";
      map.createPane("markers");
      map.getPane("markers")!.style.zIndex = "420";

      if (chart.bounds) {
        map.fitBounds(L.latLngBounds(chart.bounds[0], chart.bounds[1]));
      }

      const origin = chart.origin.position;
      const destinationPosition = (position: LatLng): LatLng => [
        position[0],
        nearestLng(position[1], origin[1]),
      ];

      chart.destinations.forEach((destination) => {
        L.polyline(curvedRoute(map!, L, origin, destinationPosition(destination.position)), {
          pane: "routes",
          color: ROUTE_COLOR,
          weight: 1.5,
          opacity: 0.7,
          lineCap: "round",
          interactive: false,
        }).addTo(map!);
      });

      chart.destinations.forEach((destination) => {
        L.circleMarker(destinationPosition(destination.position), {
          pane: "markers",
          radius: 4,
          stroke: false,
          fillColor: ROUTE_COLOR,
          fillOpacity: 0.9,
        })
          .addTo(map!)
          .bindTooltip(destination.name, { direction: "top", offset: [0, -6] });
      });

      L.circleMarker(origin, {
        pane: "markers",
        radius: 7,
        stroke: true,
        color: "#ffffff",
        weight: 2,
        fillColor: ROUTE_COLOR,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip(chart.origin.name, { direction: "top", offset: [0, -10] });

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animateIn(map);
      }
    }

    void build();

    return () => {
      disposed = true;
      map?.remove();
    };
  }, [tab]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Peta jaringan ${coverage[tab].label} secara umum, bukan daftar lengkap rute`}
      className="coverage-map aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-white md:aspect-[1000/420]"
    />
  );
}
