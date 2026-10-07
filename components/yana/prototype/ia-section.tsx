import { yanaIa, type YanaIaNode } from "@/lib/yana-prototype-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

/*
 * The reference's IA is a 1503×745 raster. It's redrawn here as vectors
 * on that raster's own coordinate grid (so every node keeps its place
 * in the hierarchy), with Yana's purple for structure: the root filled,
 * the five destinations tinted lavender, everything else outlined.
 */

type Kind = "root" | "tab" | "entry" | "leaf";
type IaBox = { x: number; y: number; label: string; w?: number; h?: number; kind?: Kind; size?: number };

/** Column centres (raster-grid units), widened slightly from the source so every label has room. */
const C = {
  join: 120, receive: 255, notify: 394, draw: 536, home: 435, entryL: 303, entryR: 567,
  minis: 670, therapy: 876, group: 806, individual: 946,
  journal: 1147, newJournal: 1080, searchPrev: 1214,
  edit: 1206, settings: 1350, profile: 1420,
};
const W = 126;
const HW = W / 2;
/** Vertical buses between columns. */
const BUS = { community: 324, share: 465, settings: 1278, profile: 1428 };

const BOXES: IaBox[] = [
  { x: C.home, y: 72, label: "YANA", w: 118, h: 50, kind: "root" },
  { x: C.entryL, y: 157, label: "Take Assessment", kind: "entry" },
  { x: C.entryR, y: 157, label: "Skip", kind: "entry" },
  { x: C.entryL, y: 236, label: "Your Wellbeing\nSnapshot", h: 40, kind: "entry" },
  // The five destinations.
  { x: C.home, y: 300, label: "Home Screen", kind: "tab" },
  { x: C.minis, y: 300, label: "Minis", kind: "tab" },
  { x: C.therapy, y: 300, label: "Therapy", kind: "tab" },
  { x: C.journal, y: 300, label: "Journal", kind: "tab" },
  { x: C.profile, y: 300, label: "Profile", kind: "tab" },
  // Home
  { x: C.notify, y: 350, label: "Notification" },
  { x: C.receive, y: 350, label: "Receive\nNotification", h: 40 },
  { x: C.notify, y: 402, label: "Community" },
  { x: C.receive, y: 402, label: "Search\nCommunity", h: 40 },
  { x: C.join, y: 402, label: "Join Community" },
  { x: C.receive, y: 451, label: "Start Community" },
  { x: C.notify, y: 460, label: "Share Thoughts" },
  { x: C.draw, y: 428, label: "Draw Something" },
  { x: C.draw, y: 489, label: "Write Your\nThoughts", h: 40 },
  { x: 499, y: 531, label: "Post", w: 58, h: 18, size: 11.5 },
  { x: 573, y: 531, label: "Draft", w: 58, h: 18, size: 11.5 },
  { x: C.draw, y: 575, label: "Search\nOthers Post", w: 88, h: 40, size: 12.5 },
  { x: C.draw, y: 617, label: "Like/Share", w: 88, h: 24, size: 12.5 },
  { x: C.notify, y: 521, label: "Mood Relaxer" },
  { x: C.receive, y: 521, label: "Watch Videos" },
  // Minis
  { x: C.minis, y: 364, label: "Short Videos" },
  { x: C.minis, y: 430, label: "Connect with\nTherapists", h: 40 },
  // Therapy
  { x: C.group, y: 364, label: "Group Therapy" },
  { x: C.individual, y: 364, label: "Individual Therapy" },
  { x: C.group, y: 428, label: "Upcoming\nTherapies", h: 40 },
  { x: C.group, y: 486, label: "Pay and Confirm\nBooking", h: 40 },
  { x: C.individual, y: 428, label: "Filter Option" },
  { x: C.individual, y: 486, label: "Choose Therapist" },
  { x: C.individual, y: 546, label: "Attend Free\nSession", h: 40 },
  { x: C.individual, y: 604, label: "Confirm Therapist" },
  { x: C.individual, y: 662, label: "Proceed Further" },
  // Journal
  { x: C.newJournal, y: 364, label: "New Journal" },
  { x: C.searchPrev, y: 364, label: "Search Previous" },
  // Profile
  ...["Settings", "Your Posts", "Progress Report", "Take Assessment", "Message Therapist"].map((label, i) => ({ x: C.settings, y: 368 + i * 40, label })),
  ...["Edit Profile", "Change Password", "Languages", "Legal and Policies", "Help and Support", "Logout"].map((label, i) => ({
    x: C.edit,
    y: 416 + i * 35,
    label,
    h: 30,
  })),
];

const PROFILE_YS = [368, 408, 448, 488, 528];
const SETTINGS_YS = [416, 451, 486, 521, 556, 591];

/** Plain connector segments (no arrowhead). */
const LINES = [
  `M${C.home} 97 V120`,
  `M${C.entryL} 120 H${C.entryR}`,
  `M${C.entryL} 256 V270 H${C.home}`,
  `M${C.entryR} 173 V228 H${C.home}`,
  `M${C.therapy} 316 V332`,
  `M${C.group} 332 H${C.individual}`,
  `M${C.journal} 316 V332`,
  `M${C.newJournal} 332 H${C.searchPrev}`,
  `M${BUS.profile} 316 V528`,
  `M${C.settings - HW} 368 H${BUS.settings} V591`,
  `M${C.notify - HW} 402 H${BUS.community}`,
  `M${C.notify + HW} 460 H${BUS.share}`,
  `M${C.draw} 509 V516`,
  "M499 516 H573",
  "M499 540 V547 H573 V540",
];

/** Segments that end in an arrowhead at the node they point to. */
const ARROWS = [
  `M${C.entryL} 120 V141`,
  `M${C.entryR} 120 V141`,
  `M${C.entryL} 173 V215`,
  `M${C.home} 228 V283`,
  `M${C.home + HW} 300 H${C.minis - HW - 1}`,
  `M${C.minis + HW} 300 H${C.therapy - HW - 1}`,
  `M${C.therapy + HW} 300 H${C.journal - HW - 1}`,
  `M${C.journal + HW} 300 H${C.profile - HW - 1}`,
  `M${C.home} 316 V325`,
  `M${C.minis} 316 V347`,
  `M${C.minis} 380 V409`,
  `M${C.group} 332 V347`,
  `M${C.individual} 332 V347`,
  `M${C.group} 380 V407`,
  `M${C.group} 448 V465`,
  `M${C.individual} 380 V411`,
  `M${C.individual} 444 V469`,
  `M${C.individual} 502 V525`,
  `M${C.individual} 566 V587`,
  `M${C.individual} 620 V645`,
  `M${C.newJournal} 332 V347`,
  `M${C.searchPrev} 332 V347`,
  ...PROFILE_YS.map((y) => `M${BUS.profile} ${y} H${C.settings + HW + 1}`),
  ...SETTINGS_YS.map((y) => `M${BUS.settings} ${y} H${C.edit + HW + 1}`),
  `M${C.notify - HW} 350 H${C.receive + HW + 1}`,
  `M${BUS.community} 402 H${C.receive + HW + 1}`,
  `M${BUS.community} 402 V451 H${C.receive + HW + 1}`,
  `M${C.receive - HW} 402 H${C.join + HW + 1}`,
  `M${BUS.share} 460 V428 H${C.draw - HW - 1}`,
  `M${BUS.share} 460 V489 H${C.draw - HW - 1}`,
  "M499 516 V521",
  "M573 516 V521",
  `M${C.draw} 547 V554`,
  `M${C.draw} 595 V604`,
  `M${C.notify - HW} 521 H${C.receive + HW + 1}`,
];

const STROKE = "color-mix(in srgb, var(--yana-purple) 45%, transparent)";

const KIND_STYLE: Record<Kind, { fill: string; stroke: string; text: string; weight: number }> = {
  root: { fill: "var(--yana-purple)", stroke: "var(--yana-purple)", text: "#ffffff", weight: 700 },
  tab: { fill: "var(--yana-purple-light)", stroke: "var(--yana-purple)", text: "var(--yana-purple)", weight: 700 },
  entry: { fill: "#ffffff", stroke: "color-mix(in srgb, var(--yana-purple) 60%, transparent)", text: "var(--yana-ink)", weight: 600 },
  leaf: { fill: "#ffffff", stroke: "color-mix(in srgb, var(--yana-purple) 32%, transparent)", text: "var(--yana-ink)", weight: 500 },
};

function IaDiagram() {
  return (
    <svg viewBox="40 38 1458 650" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <marker id="yana-ia-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0.5 L7.5 4 L0 7.5 Z" fill={STROKE} />
        </marker>
      </defs>
      {/* Home Screen's own features, grouped as one family under it. */}
      <rect
        x={48}
        y={326}
        width={570}
        height={314}
        rx={22}
        fill="color-mix(in srgb, var(--yana-purple-light) 55%, transparent)"
        stroke="color-mix(in srgb, var(--yana-purple) 14%, transparent)"
      />
      <g fill="none" stroke={STROKE} strokeWidth={1.4} strokeLinejoin="round">
        {LINES.map((d) => (
          <path key={d} d={d} />
        ))}
        {ARROWS.map((d) => (
          <path key={d} d={d} markerEnd="url(#yana-ia-arrow)" />
        ))}
      </g>
      {BOXES.map(({ x, y, label, w = W, h = 32, kind = "leaf", size = 13 }) => {
        const s = KIND_STYLE[kind];
        const lines = label.split("\n");
        return (
          <g key={`${label}-${x}-${y}`}>
            <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={kind === "root" ? 16 : Math.min(h / 2, 16)} fill={s.fill} stroke={s.stroke} strokeWidth={1.2} />
            <text
              x={x}
              textAnchor="middle"
              fontSize={kind === "root" ? 16 : size}
              fontWeight={s.weight}
              fill={s.text}
              letterSpacing={kind === "root" ? 1.5 : 0}
            >
              {lines.map((line, i) => (
                <tspan key={line} x={x} y={y + (i - (lines.length - 1) / 2) * (size + 2)} dy="0.35em">
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------------------------------------- phone / tablet flow */

function Pill({ label, kind = "leaf" }: { label: string; kind?: Kind }) {
  const s = KIND_STYLE[kind];
  return (
    <span
      className="inline-flex rounded-full border px-3.5 py-1.5 text-[14px] leading-snug sm:text-[15px]"
      style={{ background: s.fill, borderColor: s.stroke, color: s.text, fontWeight: s.weight }}
    >
      {label}
    </span>
  );
}

function Down() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 18" className="my-1 ml-4 h-[18px] w-3" fill="none" stroke={STROKE} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 1v15M2 12l4 4 4-4" />
    </svg>
  );
}

/** A node, then its single successor below an arrow, or its branches as an indented group. */
function IaFlow({ node, kind }: { node: YanaIaNode; kind?: Kind }) {
  const children = node.children ?? [];
  return (
    <>
      <Pill label={node.label} kind={kind} />
      {children.length === 1 ? (
        <div className="flex flex-col items-start">
          <Down />
          <IaFlow node={children[0]} />
        </div>
      ) : children.length > 1 ? (
        <ul className="mt-2.5 ml-4 flex flex-col gap-2.5 border-l pl-4" style={{ borderColor: STROKE }}>
          {children.map((child) => (
            <li key={child.label} className="flex flex-col items-start">
              <IaFlow node={child} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function IaOutline() {
  const { entry, sections } = yanaIa;
  return (
    <div className="flex flex-col items-start">
      <Pill label={entry.root} kind="root" />
      <Down />
      <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
        <div className="flex flex-col items-start">
          <Pill label={entry.options[0]} kind="entry" />
          <Down />
          <Pill label={entry.snapshot} kind="entry" />
        </div>
        <Pill label={entry.options[1]} kind="entry" />
      </div>
      <Down />
      <ol className="flex w-full flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-5">
        {sections.map((section) => (
          <li
            key={section.label}
            className="flex flex-col items-start rounded-[22px] border p-4 sm:p-5"
            style={{ background: "color-mix(in srgb, var(--yana-purple-light) 40%, white)", borderColor: "color-mix(in srgb, var(--yana-purple) 14%, transparent)" }}
          >
            <IaFlow node={section} kind="tab" />
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * "Information Architecture": on desktop the full tree as one large
 * diagram; below that the same tree re-flowed top to bottom (sequences
 * as arrowed steps, branches as indented groups) so no label shrinks.
 * The outline is also what screen readers get on desktop.
 */
export function YanaIaSection() {
  return (
    <section aria-label="Information architecture" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <YanaSectionHeading>{yanaIa.heading}</YanaSectionHeading>
        <div className="mt-10 hidden lg:block">
          <IaDiagram />
        </div>
        <div className="mt-10 lg:sr-only">
          <IaOutline />
        </div>
      </YanaFrame>
    </section>
  );
}
