import { useId, useState } from "react";

const ORANGE = "#e88808";
const OUTLINE = "#a96717";

function Warehouse({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="#111" strokeWidth="2.5">
      <path d="M0 49H68M6 49V13L34 2L62 13V49M11 49V17L34 8L57 17V49M17 49V22H51V49" />
      <path d="M26 49V40H35V49M40 49V40H49M40 40V32H49V40M30 40V44M44 32V36M35 35V27H44V32" />
    </g>
  );
}

function Port({ x, y, mirrored = false }: { x: number; y: number; mirrored?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform={mirrored ? "translate(70 0) scale(-1 1)" : undefined}>
        <g fill="none" stroke="#282828" strokeWidth="1.7">
          <path d="M0 58H31M6 58L12 3H19L27 58M9 43H24L10 28H22L12 13H20M14 3V58M18 3V58M0 2H12V13H0ZM2 3V12M5 3V12M8 3V12M19 4L57 16H19M24 7V16M34 10V16M44 13V16M57 16V36M54 35H60" />
          <path d="M26 20H64V25H26ZM33 25V37M59 25V37M37 28V35M42 28V35M47 28V35M52 28V35" />
        </g>
        <path d="M34 37L49 33L66 39L62 57H39Z" fill="#282828" />
        <path d="M34 37L49 42L66 39M49 42V53" fill="none" stroke="white" strokeWidth="1.4" />
      </g>
    </g>
  );
}

function Ship({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#050505">
      <path d="M0 23H84L74 37H11Q0 37 0 27ZM6 23V10H12V0H16V14H23V6H28V23Z" />
      {[35, 47, 59].map((left) => (
        <g key={left}>
          <rect x={left} y="8" width="10" height="6" />
          <rect x={left} y="16" width="10" height="5" />
        </g>
      ))}
    </g>
  );
}

function Container({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} strokeLinejoin="round">
      <ellipse cx="53" cy="65" rx="44" ry="7" fill="#111" opacity="0.12" />
      <path d="M3 21L44 31L89 2L51 0Z" fill="#46a6d2" stroke="#2c85ae" />
      <path d="M44 31L89 2V42L42 73Z" fill="#1476a1" stroke="#145477" />
      <path d="M3 21L44 31L42 73L6 62Z" fill="#8ccde9" stroke="#2f7fa6" />
      {Array.from({ length: 10 }, (_, i) => (
        <path
          key={i}
          d={`M${47 + i * 4} ${30 - i * 2.6}L${45 + i * 4} ${70 - i * 2.6}`}
          stroke={i % 2 ? "#0c5c83" : "#53b0d7"}
          strokeWidth="2"
        />
      ))}
      <g fill="none" stroke="#3986ae" strokeWidth="1">
        <path d="M6 25L40 34L38 67L9 59ZM23 30V64M10 26L12 61M35 33L34 66M6 36L40 44M8 49L39 56" />
        <path d="M17 29V62M29 33V65" stroke="#e1f4fb" strokeWidth="2" />
        <path d="M14 43H20M26 46H32M14 49H20M26 52H32" stroke="#345e77" />
      </g>
    </g>
  );
}

function LabelBox({
  x,
  y,
  width,
  height,
  lines,
  size = 11,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  lines: string[];
  size?: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={ORANGE}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
      <text x={x + width / 2} fill="white" fontSize={size} textAnchor="middle">
        {lines.map((line, index) => (
          <tspan
            key={line}
            x={x + width / 2}
            y={y + height / 2 + (index - (lines.length - 1) / 2) * (size + 3) + size * 0.35}
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function ProcessBox({ x, width, lines }: { x: number; width: number; lines: string[] }) {
  return (
    <g>
      <rect
        x={x}
        y="273"
        width={width}
        height="83"
        fill={ORANGE}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
      <text fill="white" fontSize="11.5" xmlSpace="preserve">
        {lines.map((line, index) => (
          <tspan key={line} x={x + 8} y={283 + index * 14}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

/** Redrawn from the supplied CURRENT OPERATION slide; no remote image dependencies. */
export function CurrentOperationDiagram() {
  const id = useId();
  const [expanded, setExpanded] = useState(false);

  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-white/12 bg-[#101820]">
      <figcaption className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/50 uppercase">
            Model Operasional
          </p>
          <h3 className="mt-2 text-[1.125rem] leading-tight font-semibold text-white">
            Kendali Ruang SOC
          </h3>
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${id}-viewport`}
          onClick={() => setExpanded((value) => !value)}
          className="min-h-11 rounded-full border border-white/25 px-4 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {expanded ? "Tampilkan utuh" : "Perbesar diagram"}
        </button>
      </figcaption>
      <div
        id={`${id}-viewport`}
        role="region"
        aria-label="Diagram operasional SOC; geser horizontal saat diperbesar"
        tabIndex={expanded ? 0 : undefined}
        data-lenis-prevent
        className="overflow-x-auto bg-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
      >
        <OperationArtwork id={id} expanded={expanded} />
      </div>
      {expanded && (
        <p className="px-5 py-3 text-sm text-white/70 sm:px-6">
          Geser ke samping untuk melihat seluruh alur operasional.
        </p>
      )}
    </figure>
  );
}

function OperationFlow() {
  return (
    <g>
      <g fill={ORANGE} stroke={OUTLINE} strokeWidth="1.6">
        <path d="M109 93H122V180H128L115 193L102 180H109Z" />
        <path d="M1144 195V127H1137L1150 114L1164 127H1157V195Z" />
        <path d="M178 271H230V265L243 278L230 291V284H178Z" />
        <path d="M386 218H449V214L458 222L449 230V225H386Z" />
        <path d="M563 218H593V215L601 222L593 229V225H563Z" />
        <path d="M707 221H736V217L744 225L736 232V228H707Z" />
        <path d="M845 213H909V209L917 217L909 225V221H845Z" />
        <path d="M1030 271H1081V265L1094 278L1081 291V284H1030Z" />
      </g>
      <Container x={102} y={228} />
      <Container x={1128} y={229} />
      <Warehouse x={297} y={189} />
      <Warehouse x={932} y={189} />
      <Port x={480} y={187} />
      <Port x={745} y={190} mirrored />
      <Ship x={611} y={194} />
      <LabelBox x={85} y={202} width={67} height={35} lines={["Import", "Containers"]} size={10} />
      <LabelBox x={301} y={135} width={74} height={46} lines={["Customer’s", "WH/Factory"]} />
      <LabelBox x={628} y={135} width={74} height={46} lines={["Sea Freight", "Activities"]} />
      <LabelBox
        x={932}
        y={135}
        width={95}
        height={46}
        lines={["Customer’s/", "Distributor’s", "WH/Factory"]}
      />
      <LabelBox x={1110} y={203} width={67} height={34} lines={["Empty", "containers"]} size={10} />
      <LabelBox x={1092} y={70} width={122} height={34} lines={["EXPORT"]} size={24} />
      <ProcessBox
        x={302}
        width={149}
        lines={[
          "Pick Up process",
          "1.     Empty",
          "2.     Stuffing",
          "3.     Documentation",
          "4.     Laden Delivery to",
          "        Port",
        ]}
      />
      <ProcessBox
        x={518}
        width={288}
        lines={[
          "",
          "Sea Freight",
          "1.     Documentation and Operation at Port",
          "2.     Sea delivery",
          "3.     Documentation and Operation at Destination Port",
        ]}
      />
      <ProcessBox
        x={849}
        width={178}
        lines={[
          "Delivery Process",
          "1.     Laden Delivery to Customer",
          "2.     Unstuffing Process",
          "3.     Empty Delivery back to",
          "        Lines’s depo",
        ]}
      />
      <path d="M124 472H1204" stroke="#9c9c9c" strokeWidth="1" />
      <g fill="white" stroke="#ac6200" strokeWidth="1.7">
        <path d="M144 308L329 490L338 481V516H303L312 507L127 325Z" />
        <path d="M1127 318L1145 332L984 543L994 550L960 557L955 523L964 531Z" />
      </g>
      <rect
        x="247"
        y="381"
        width="789"
        height="20"
        fill={ORANGE}
        stroke={OUTLINE}
        strokeWidth="1.6"
      />
      <text x="642" y="396" fill="white" fontSize="14" textAnchor="middle">
        POINT TO POINTTOTAL LOGISTICS PLAT FROM EQUIPPED WITH RIGHT INFORMATION SYSTEM
      </text>
    </g>
  );
}

function OperationSummary() {
  return (
    <g>
      <rect
        x="373"
        y="426"
        width="567"
        height="182"
        fill="#7fa8c5"
        stroke={OUTLINE}
        strokeWidth="1.6"
      />
      <text x="383" y="453" fill="white" fontSize="18" letterSpacing="0.3" xmlSpace="preserve">
        <tspan x="383">This is the process of utilizing our partner’s container (many major</tspan>
        <tspan x="383" dy="24">
          International Shipping Lines) to support this domestic activities.
        </tspan>
        <tspan x="383" dy="24">
          Some advantages points will be :
        </tspan>
        <tspan x="383" dy="23">
          1. Better container management and availability
        </tspan>
        <tspan x="383" dy="24">
          2. Different rate from lines as we are using SOC
        </tspan>
        <tspan x="383" dy="23">
          3. Bundling rate from liners
        </tspan>
      </text>
    </g>
  );
}

function OperationPartners() {
  return (
    <g>
      <svg x="25" y="395" width="89" height="64" viewBox="1 78 500 349">
        <image href="/img/partners/spil.png" width="502" height="502" />
      </svg>
      <rect x="20" y="482" width="105" height="105" fill="#101c74" />
      <svg x="42" y="500" width="61" height="59" viewBox="439 209 62 65">
        <image href="/img/partners/meratus.png" width="502" height="502" />
      </svg>
      <text
        x="72"
        y="573"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
      >
        MERATUS
      </text>
      <svg x="2" y="614" width="60" height="40" viewBox="4 50 496 404">
        <image href="/img/partners/ctp-line.png" width="502" height="502" />
      </svg>
      <text
        x="68"
        y="640"
        fill="#101c74"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        letterSpacing="1"
      >
        CTP Line
      </text>
      <g transform="translate(170 578)">
        <path d="M5 5L20 62" stroke="#c39e00" strokeWidth="4" />
        <circle cx="4" cy="5" r="3" fill="#c39e00" />
        <path
          d="M8 8Q28 0 43 7T71 7L81 43Q64 49 49 40T18 43Z"
          fill="#102671"
          stroke="#c39e00"
          strokeWidth="2"
        />
        <path d="M8 8Q28 0 43 7T71 7L75 23Q57 28 43 19T13 24Z" fill="#d81520" />
        <path d="M13 24Q29 16 43 23T75 25" fill="none" stroke="#c39e00" strokeWidth="3" />
        <ellipse cx="41" cy="25" rx="14" ry="15" fill="white" stroke="#c39e00" strokeWidth="2" />
        <path
          d="M42 15A10 10 0 1 0 42 35M44 15V35M43 24H52"
          fill="none"
          stroke="#b9a000"
          strokeWidth="3"
        />
        <text
          x="21"
          y="68"
          fill="#111"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontWeight="bold"
          fontSize="13"
        >
          TEMAS
        </text>
        <text x="62" y="70" fill="#111" fontFamily="Georgia, serif" fontStyle="italic" fontSize="8">
          LINE
        </text>
      </g>
      <g transform="translate(145 526)">
        <path d="M12 0A12 12 0 1 0 12 24" fill="none" stroke="#45bfee" strokeWidth="1.5" />
        <path d="M4 6L11 3V10L4 12ZM4 14L11 12V19L4 17Z" fill={ORANGE} />
        <text
          x="21"
          y="16"
          fontFamily="Arial, sans-serif"
          fontSize="21"
          fontWeight="bold"
          fill="#54c0e8"
        >
          ICON
        </text>
        <text x="32" y="21" fontSize="4.2" fill={ORANGE}>
          PT. Indo Container Lines
        </text>
      </g>
      <svg x="1048" y="470" width="105" height="46" viewBox="0 143 502 216">
        <image href="/img/partners/hmm.png" width="502" height="502" />
      </svg>
      <svg x="1028" y="531" width="18" height="21" viewBox="27 0 447 502">
        <image href="/img/partners/yang-ming.png" width="502" height="502" />
      </svg>
      <text
        x="1053"
        y="550"
        fill="#ed252a"
        fontFamily="Arial, sans-serif"
        fontSize="22"
        fontWeight="bold"
      >
        YANG MING
      </text>
      <text
        x="1028"
        y="562"
        fill="#111"
        fontFamily="Arial, sans-serif"
        fontSize="8"
        fontWeight="bold"
      >
        YANG MING MARINE TRANSPORT CORP.
      </text>
      <svg x="1029" y="584" width="37" height="37" viewBox="1 1 501 501">
        <image href="/img/partners/sinokor.png" width="502" height="502" />
      </svg>
      <text
        x="1071"
        y="599"
        fill="#00478a"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        letterSpacing="5"
      >
        SINOKOR
      </text>
      <text x="1071" y="608" fill="#111" fontSize="8" letterSpacing="5">
        長錦商船株式會社
      </text>
      <text x="1071" y="616" fill="#111" fontFamily="Arial, sans-serif" fontSize="7">
        Sinokor Merchant Marine Co., Ltd.
      </text>
      <rect x="1198" y="522" width="83" height="83" fill="#eed788" />
      <g fill="#050505" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle">
        <text x="1240" y="567" fontSize="44">
          m
        </text>
        <text x="1240" y="585" fontSize="30" letterSpacing="-3">
          sc
        </text>
        <path
          d="M1217 566Q1228 562 1240 566T1263 566"
          fill="none"
          stroke="#050505"
          strokeWidth="2"
        />
      </g>
    </g>
  );
}

function IntegraMark({ id }: { id: string }) {
  return (
    <g transform="translate(1226 22)">
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#777" />
          <stop offset="0.3" stopColor="#fff" />
          <stop offset="0.5" stopColor="#777" />
          <stop offset="0.75" stopColor="#f8f8f8" />
          <stop offset="1" stopColor="#777" />
        </linearGradient>
      </defs>
      <rect width="74" height="72" fill="#d9d9dc" />
      <circle cx="37" cy="37" r="31" fill="#080808" stroke={`url(#${id}-metal)`} strokeWidth="5" />
      <circle cx="37" cy="37" r="26" fill="#f2f2f2" stroke={`url(#${id}-metal)`} strokeWidth="3" />
      <path d="M32 24L37 20L43 24V51L37 57L32 50Z" fill="#171c21" stroke="#8997a2" />
      <path d="M37 24V54" stroke="#ebebeb" strokeWidth="1.4" />
      <circle cx="37" cy="22" r="5" fill="#4688ad" stroke="#173345" />
      <path
        d="M33 22H41M37 17Q33 22 37 27Q41 22 37 17Z"
        fill="none"
        stroke="#a9d2e6"
        strokeWidth="0.7"
      />
      <text
        x="37"
        y="88"
        fill="#142e62"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
      >
        Integra
      </text>
      <text x="37" y="96" fill="#142e62" fontSize="5" letterSpacing="1" textAnchor="middle">
        Sinergi Logitama
      </text>
    </g>
  );
}

function OperationArtwork({ id, expanded }: { id: string; expanded: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1308 672"
      width="1308"
      height="672"
      role="img"
      aria-labelledby={`${id}-title ${id}-description`}
      className={`block h-auto w-full ${expanded ? "min-w-[1308px]" : ""}`}
      style={{ fontFamily: "Calibri, Arial, sans-serif" }}
    >
      <title id={`${id}-title`}>CURRENT OPERATION — Kendali Ruang SOC</title>
      <desc id={`${id}-description`}>
        Alur kontainer impor menuju gudang pelanggan, pick up dan stuffing, pelayaran, pengiriman ke
        gudang penerima, lalu rotasi kontainer kosong untuk ekspor. Penggunaan kontainer mitra
        pelayaran mendukung kegiatan domestik dengan ketersediaan terkelola, skema tarif SOC, dan
        tarif bundling dari pelayaran.
      </desc>
      <rect width="1308" height="672" fill="white" />
      <text x="41" y="57" fontSize="42" fill="#292929">
        CURRENT OPERATION
      </text>
      <OperationFlow />
      <OperationPartners />
      <OperationSummary />
      <IntegraMark id={id} />
    </svg>
  );
}
