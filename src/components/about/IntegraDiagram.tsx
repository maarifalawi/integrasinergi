import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { LineReveal } from "@/components/motion/LineReveal";
import { headingLines } from "@/data/headings";

const EASE = [0.16, 1, 0.3, 1] as const;

type Node = {
  label: string;
  x: number;
  y: number;
  highlighted: boolean;
};

const CENTRE = { x: 450, y: 260, w: 200, h: 56 };

const satellites: Node[] = [
  { label: "International Trading", x: 450, y: 70, highlighted: false },
  { label: "Domestic Forwarding", x: 735, y: 199, highlighted: true },
  { label: "Project Cargo", x: 626, y: 441, highlighted: true },
  { label: "Construction", x: 274, y: 441, highlighted: false },
  { label: "Transportation", x: 165, y: 199, highlighted: false },
];

/** Auto width by label, at 13px font-sans, plus horizontal padding. */
const widthOf = (label: string) => Math.round(label.length * 7.1) + 44;
const SAT_H = 44;

/** Clip a ray leaving the centre of a rect to that rect's edge. */
function edge(cx: number, cy: number, w: number, h: number, tx: number, ty: number) {
  const dx = tx - cx;
  const dy = ty - cy;
  const sx = dx === 0 ? Infinity : w / 2 / Math.abs(dx);
  const sy = dy === 0 ? Infinity : h / 2 / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

// Sub-768px fallback: the SVG is hidden and a divide-y list carries the same
// hierarchy, with the two ISL lines kept in --primary.
export function IntegraDiagram() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const play = reduce || inView;

  // One shared timeline: glow → centre pop → connectors draw → satellites pop →
  // bracket draws → pulse dots and halos take over as ambient loops.
  const centreIn = 0.1;
  const lineStart = 0.35;
  const lineStagger = 0.09;
  const lineDur = 0.7;
  const linesEnd = lineStart + (satellites.length - 1) * lineStagger + lineDur;
  const nodeIn = (index: number) => lineStart + index * lineStagger + 0.55;
  const bracketIn = linesEnd + 0.5;

  return (
    <section className="bg-background px-6 py-16 md:px-10 md:py-[7.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[692px]">
          <LineReveal
            as="h2"
            lines={headingLines.grup}
            className="text-foreground text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
          />
        </div>

        <div ref={ref} className="mt-16">
          <div className="mx-auto hidden aspect-[900/520] w-full max-w-[900px] md:block">
            <svg
              viewBox="0 0 900 520"
              width="900"
              height="520"
              role="img"
              aria-label="Diagram posisi Integra Sinergi Logitama di dalam Integra Group"
              className="h-full w-full"
            >
              <defs>
                <radialGradient id="grup-glow">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.09" />
                  <stop offset="70%" stopColor="var(--primary)" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ambient glow that blooms behind the whole diagram. */}
              <motion.circle
                cx={CENTRE.x}
                cy={CENTRE.y}
                r={280}
                fill="url(#grup-glow)"
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={play ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.6, ease: EASE }}
                style={{ transformOrigin: "450px 260px" }}
              />

              {/* Halo rings pulsing out of the centre node, forever. */}
              {!reduce &&
                [0, 1].map((ring) => (
                  <motion.rect
                    key={`halo-${ring}`}
                    x={CENTRE.x - CENTRE.w / 2}
                    y={CENTRE.y - CENTRE.h / 2}
                    width={CENTRE.w}
                    height={CENTRE.h}
                    rx={28}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth={1}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={play ? { opacity: [0.4, 0], scale: [1, 1.45] } : {}}
                    transition={{
                      duration: 3.2,
                      ease: "easeOut",
                      repeat: Infinity,
                      delay: 1.2 + ring * 1.6,
                    }}
                    style={{ transformOrigin: "450px 260px" }}
                  />
                ))}

              {satellites.map((node, index) => {
                const w = widthOf(node.label);
                const from = edge(CENTRE.x, CENTRE.y, CENTRE.w, CENTRE.h, node.x, node.y);
                const to = edge(node.x, node.y, w, SAT_H, CENTRE.x, CENTRE.y);
                return (
                  <motion.line
                    key={node.label}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={node.highlighted ? "var(--primary)" : "var(--border)"}
                    strokeOpacity={node.highlighted ? 0.5 : 1}
                    strokeWidth={1}
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={play ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{
                      duration: lineDur,
                      ease: EASE,
                      delay: lineStart + index * lineStagger,
                    }}
                  />
                );
              })}

              {/* Cargo pulses travelling from the group out to each line of
                  business — brighter on the two lines ISL runs. */}
              {!reduce &&
                satellites.map((node, index) => {
                  const w = widthOf(node.label);
                  const from = edge(CENTRE.x, CENTRE.y, CENTRE.w, CENTRE.h, node.x, node.y);
                  const to = edge(node.x, node.y, w, SAT_H, CENTRE.x, CENTRE.y);
                  const dx = to.x - from.x;
                  const dy = to.y - from.y;
                  const peak = node.highlighted ? 0.95 : 0.4;
                  return (
                    <motion.g
                      key={`pulse-${node.label}`}
                      initial={{ x: 0, y: 0, opacity: 0 }}
                      animate={
                        play
                          ? {
                              x: [0, dx * 0.15, dx * 0.85, dx],
                              y: [0, dy * 0.15, dy * 0.85, dy],
                              opacity: [0, peak, peak, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2.8,
                        times: [0, 0.15, 0.85, 1],
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 0.9,
                        delay: linesEnd + 0.6 + index * 0.55,
                      }}
                    >
                      <circle
                        cx={from.x}
                        cy={from.y}
                        r={node.highlighted ? 3 : 2}
                        fill="var(--primary)"
                      />
                    </motion.g>
                  );
                })}

              <motion.g
                initial={reduce ? false : { opacity: 0, scale: 0.5 }}
                animate={play ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 22,
                  delay: centreIn,
                }}
                style={{ transformOrigin: "450px 260px" }}
              >
                <rect
                  x={CENTRE.x - CENTRE.w / 2}
                  y={CENTRE.y - CENTRE.h / 2}
                  width={CENTRE.w}
                  height={CENTRE.h}
                  rx={28}
                  fill="var(--foreground)"
                />
                <text
                  x={CENTRE.x}
                  y={CENTRE.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-sans font-semibold"
                  fontSize={13}
                  letterSpacing="0.04em"
                  fill="var(--foreground-on-dark)"
                >
                  INTEGRA GROUP
                </text>
              </motion.g>

              {satellites.map((node, index) => {
                const w = widthOf(node.label);
                return (
                  <motion.g
                    key={node.label}
                    initial={reduce ? false : { opacity: 0, scale: 0.6, y: 10 }}
                    animate={play ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: nodeIn(index),
                    }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  >
                    {/* Breathing aura around the two ISL-run lines. */}
                    {node.highlighted && !reduce && (
                      <motion.rect
                        x={node.x - w / 2 - 5}
                        y={node.y - SAT_H / 2 - 5}
                        width={w + 10}
                        height={SAT_H + 10}
                        rx={27}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth={1}
                        initial={{ opacity: 0.15 }}
                        animate={{ opacity: [0.15, 0.55, 0.15] }}
                        transition={{
                          duration: 2.6,
                          ease: "easeInOut",
                          repeat: Infinity,
                          delay: nodeIn(index) + 0.6 + index * 0.3,
                        }}
                      />
                    )}
                    <rect
                      x={node.x - w / 2}
                      y={node.y - SAT_H / 2}
                      width={w}
                      height={SAT_H}
                      rx={22}
                      fill={
                        node.highlighted
                          ? "color-mix(in srgb, var(--primary) 6%, white)"
                          : "var(--background)"
                      }
                      stroke={node.highlighted ? "var(--primary)" : "var(--border)"}
                      strokeWidth={node.highlighted ? 1.5 : 1}
                    />
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className={node.highlighted ? "font-sans font-semibold" : "font-sans"}
                      fontSize={13}
                      fill={node.highlighted ? "var(--primary)" : "var(--foreground)"}
                    >
                      {node.label}
                    </text>
                  </motion.g>
                );
              })}

              {/* Bracket grouping the ISL-run lines: draws itself, then the
                  label rises into place. */}
              <motion.path
                d="M735 221 V470 M626 463 V470 M626 470 H735 M680 470 V478"
                stroke="var(--primary)"
                strokeOpacity={0.4}
                strokeWidth={1}
                fill="none"
                initial={reduce ? false : { pathLength: 0 }}
                animate={play ? { pathLength: 1 } : {}}
                transition={{ duration: 0.9, ease: EASE, delay: bracketIn }}
              />
              <motion.text
                x={680}
                y={490}
                textAnchor="middle"
                dominantBaseline="central"
                className="font-mono"
                fontSize={10}
                letterSpacing="0.1em"
                fill="var(--primary)"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: bracketIn + 0.7,
                }}
              >
                INTEGRA SINERGI LOGITAMA
              </motion.text>
            </svg>
          </div>

          {/* Below md the diagram becomes a vertical tree: a solid parent
              node, a rail with a tick per business line, and the two ISL-run
              lines called out in --primary with their own label. */}
          <div className="md:hidden">
            <motion.p
              className="bg-foreground text-background w-fit rounded-full px-5 py-2.5 text-[0.9375rem] leading-[1.24] font-semibold tracking-[-0.016em]"
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              INTEGRA GROUP
            </motion.p>
            <div className="border-border mt-2 ml-5 border-l pl-6">
              {satellites.map((node, index) => (
                <div key={node.label}>
                  <motion.div
                    className="relative flex items-center py-3"
                    initial={reduce ? false : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: EASE, delay: (index + 1) * 0.07 }}
                  >
                    <span
                      aria-hidden
                      className={`absolute -left-6 h-px w-6 ${node.highlighted ? "bg-primary" : "bg-border"}`}
                    />
                    <span
                      className={`rounded-full border px-4 py-1.5 text-[0.9375rem] leading-[1.24] tracking-[-0.016em] ${
                        node.highlighted
                          ? "border-primary/40 bg-primary/5 text-primary font-semibold"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {node.label}
                    </span>
                  </motion.div>
                  {/* The label sits directly under the two ISL-run lines, so
                      the grouping reads without a bracket. */}
                  {index === 2 ? (
                    <motion.p
                      className="text-primary relative py-2 pl-1 font-mono text-[11px] tracking-[0.1em] uppercase"
                      initial={reduce ? false : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, ease: EASE, delay: (index + 1.5) * 0.07 }}
                    >
                      <span aria-hidden className="bg-primary absolute top-1/2 -left-7 h-px w-6" />
                      Dikelola Integra Sinergi Logitama
                    </motion.p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
