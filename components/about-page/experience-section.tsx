import { Planted, Sprig, Tuft } from "@/components/about-page/botanicals";
import { SCENE_W, SCENE_X0, WAVE_EDGE, WAVE_H, hillPath, smoothLine, yAt } from "@/components/about-page/scene";
import { experience, type ExperienceRole } from "@/lib/about-content";
import styles from "./about-page.module.css";

/**
 * Layer 2 — the cream foreground hill: the top edge of the Professional
 * Experience section itself (rendered as its first child, sitting
 * entirely above the section with `bottom: 100%`), the same way
 * AboutCloud is the top edge of the homepage's About section. It moves
 * only because the section moves, in normal document flow: no scroll
 * listener, no transform.
 *
 * Two sprigs grow from the cream hill itself, so the depth reads both
 * ways — rear plants disappear behind this layer while these stand in
 * front of them.
 */
function ForegroundHill() {
  return (
    <div aria-hidden="true" className={styles.hill}>
      <svg
        viewBox={`${SCENE_X0} 0 ${SCENE_W} ${WAVE_H}`}
        className={styles.sceneSvg}
        style={{ height: "var(--wave-h)" }}
        overflow="visible"
      >
        <defs>
          <linearGradient id="about-hill-fill" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2={WAVE_H}>
            <stop offset="0" stopColor="var(--meadow-cream-edge)" />
            <stop offset="1" stopColor="var(--meadow-cream-mid)" />
          </linearGradient>
          <filter id="about-hill-soft" x="-5%" y="-100%" width="110%" height="300%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        {/* A whisper of shadow along the top edge only: layered paper,
            not an outline (a drop-shadow on the whole shape would also
            darken its bottom seam with the section below). */}
        <path
          d={smoothLine(WAVE_EDGE)}
          transform="translate(0 -3)"
          fill="none"
          stroke="var(--meadow-edge-shadow)"
          strokeWidth="8"
          filter="url(#about-hill-soft)"
        />
        <path d={hillPath(WAVE_EDGE, WAVE_H + 2)} fill="url(#about-hill-fill)" />
        <Planted x={150} y={yAt(WAVE_EDGE, 150) + 6} sway={9} phase={1.1}>
          <Sprig h={112} lean={-9} pairs={4} tone="var(--meadow-plant-front)" />
        </Planted>
        <Planted x={1236} y={yAt(WAVE_EDGE, 1236) + 6} sway={8.4} phase={2.6}>
          <Tuft h={92} tone="var(--meadow-plant-front)" />
        </Planted>
      </svg>
    </div>
  );
}

function RoleRow({ role }: { role: ExperienceRole }) {
  return (
    <li className={styles.roleRow}>
      <p className="text-sm tracking-[0.04em] tabular-nums" style={{ color: "var(--ap-muted)" }}>
        {role.start} – {role.end}
      </p>
      <div>
        <h3 className="font-display text-xl leading-snug font-medium sm:text-2xl">{role.role}</h3>
        <p className="mt-1 text-[15px]" style={{ color: "var(--ap-muted)" }}>
          {role.company}
          {role.location && <span> · {role.location}</span>}
        </p>
      </div>
      {role.summary && (
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ap-muted)" }}>
          {role.summary}
        </p>
      )}
    </li>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className={styles.experience}>
      <ForegroundHill />

      <div className="mx-auto w-full max-w-[100rem] px-6 sm:px-10 lg:px-12">
        <h2
          id="experience-heading"
          className="font-display text-[clamp(2.1rem,3.7vw,3.6rem)] leading-[1.08] font-medium tracking-[-0.015em]"
          style={{ color: "var(--meadow-heading)" }}
        >
          Professional Experience
        </h2>

        {/* Rows only once real roles exist — no placeholder cards. */}
        {experience.length > 0 && (
          <ol className="mt-10 sm:mt-14">
            {experience.map((role) => (
              <RoleRow key={`${role.company}-${role.start}`} role={role} />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
