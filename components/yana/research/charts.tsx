/**
 * The research screens' charts, rebuilt as vectors from the exact
 * values in the reference PDF (the source drew them as screenshots or
 * 3D renders). Data is never rescaled or rounded: bar heights are drawn
 * to their own axis, donut slices in proportion to the values shown.
 */

type Slice = { value: number; color: string; label: string };

const TAU = Math.PI * 2;

/**
 * A donut drawn clockwise from 12 o'clock, slices in the order given,
 * each labelled with `labelFor(slice)` just outside its midpoint.
 */
export function Donut({
  slices,
  labelFor,
  size = 220,
  thickness = 38,
  title,
}: {
  slices: Slice[];
  labelFor: (slice: Slice) => string;
  size?: number;
  thickness?: number;
  title: string;
}) {
  const pad = 46;
  const box = size + pad * 2;
  const c = box / 2;
  const r = (size - thickness) / 2;
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const circumference = TAU * r;

  const fractions = slices.map((slice) => slice.value / total);
  const arcs = slices.map((slice, i) => {
    const fraction = fractions[i];
    const start = fractions.slice(0, i).reduce((sum, f) => sum + f, 0);
    const mid = start + fraction / 2;
    const angle = mid * TAU - Math.PI / 2;
    const labelR = r + thickness / 2 + 22;
    const arc = {
      slice,
      dash: `${fraction * circumference} ${circumference}`,
      offset: -start * circumference,
      lx: c + Math.cos(angle) * labelR,
      ly: c + Math.sin(angle) * labelR,
    };
    return arc;
  });

  return (
    <svg viewBox={`0 0 ${box} ${box}`} role="img" aria-label={title} className="h-auto w-full">
      <g transform={`rotate(-90 ${c} ${c})`}>
        {arcs.map(({ slice, dash, offset }) => (
          <circle
            key={slice.label}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke={slice.color}
            strokeWidth={thickness}
            strokeDasharray={dash}
            strokeDashoffset={offset}
          />
        ))}
      </g>
      {arcs.map(({ slice, lx, ly }) => (
        <text
          key={slice.label}
          x={lx}
          y={ly}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="13"
          fontWeight="600"
          fill="var(--yana-ink)"
        >
          {labelFor(slice)}
        </text>
      ))}
    </svg>
  );
}

/** Legend dot shared by the donut/bar legends (lavender gets an outline so it shows on cream). */
export function LegendDot({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="mt-[0.2em] block size-3.5 shrink-0 rounded-full"
      style={{ background: color, boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--yana-ink) 10%, transparent)" }}
    />
  );
}

/**
 * Vertical bars on a 0..max axis with gridlines every `step`, values
 * printed under each bar (as in the source).
 */
export function Bars({
  bars,
  max,
  step,
  title,
  unit = "",
  showValuesBelow = true,
  barWidth = 30,
  gap = 26,
  height = 230,
  roundTop = true,
}: {
  bars: { label: string; value: number; color: string }[];
  max: number;
  step: number;
  title: string;
  unit?: string;
  showValuesBelow?: boolean;
  barWidth?: number;
  gap?: number;
  height?: number;
  roundTop?: boolean;
}) {
  const left = 40;
  const top = 26;
  const bottom = 30;
  const plotW = bars.length * barWidth + (bars.length + 1) * gap;
  const w = left + plotW + 6;
  const h = top + height + bottom;
  const y = (v: number) => top + height - (v / max) * height;
  const ticks = Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} className="h-auto w-full">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={left} x2={w - 6} y1={y(t)} y2={y(t)} stroke="color-mix(in srgb, var(--yana-ink) 12%, transparent)" strokeWidth="1" />
          <text x={left - 10} y={y(t)} textAnchor="end" dominantBaseline="central" fontSize="11" fill="var(--yana-muted)">
            {t}
            {unit}
          </text>
        </g>
      ))}
      {bars.map((bar, i) => {
        const x = left + gap + i * (barWidth + gap);
        const yTop = y(bar.value);
        const barH = top + height - yTop;
        const rr = roundTop ? Math.min(barWidth / 2, barH) : 4;
        return (
          <g key={bar.label}>
            <path
              d={`M${x} ${top + height}V${yTop + rr}a${rr} ${rr} 0 0 1 ${rr} ${-rr}h${barWidth - rr * 2}a${rr} ${rr} 0 0 1 ${rr} ${rr}V${top + height}Z`}
              fill={bar.color}
            />
            {showValuesBelow ? (
              <text x={x + barWidth / 2} y={top + height + 18} textAnchor="middle" fontSize="11.5" fill="var(--yana-ink)">
                {bar.value}
                {unit}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * "Mental Health Stigma in India" — the source is a 3D-rendered image
 * whose bars don't sit on their own axis; rebuilt flat and to scale on
 * the same 0–80% axis, with the same two values.
 */
export function StigmaChart({ title, bars }: { title: string; bars: readonly { label: string; value: number }[] }) {
  const colors = ["var(--yana-purple)", "var(--yana-periwinkle)"];
  const left = 46;
  const top = 34;
  const plotH = 220;
  const barW = 74;
  const w = 300;
  const h = top + plotH + 34;
  const y = (v: number) => top + plotH - (v / 80) * plotH;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${title}: ${bars.map((b) => `${b.label} ${b.value}%`).join(", ")}`} className="h-auto w-full">
      {[0, 20, 40, 60, 80].map((t) => (
        <g key={t}>
          <line x1={left} x2={w - 8} y1={y(t)} y2={y(t)} stroke="color-mix(in srgb, var(--yana-ink) 12%, transparent)" />
          <text x={left - 10} y={y(t)} textAnchor="end" dominantBaseline="central" fontSize="12" fill="var(--yana-muted)">
            {t} %
          </text>
        </g>
      ))}
      {bars.map((bar, i) => {
        const x = left + 30 + i * (barW + 50);
        return (
          <g key={bar.label}>
            <rect x={x} y={y(bar.value)} width={barW} height={top + plotH - y(bar.value)} rx="8" fill={colors[i]} />
            <rect x={x} y={y(bar.value) + 8} width={barW} height={top + plotH - y(bar.value) - 8} fill={colors[i]} />
            <text x={x + barW / 2} y={y(bar.value) - 10} textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--yana-ink)">
              {bar.value}%
            </text>
            <text x={x + barW / 2} y={top + plotH + 22} textAnchor="middle" fontSize="13" fill="var(--yana-ink)">
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
