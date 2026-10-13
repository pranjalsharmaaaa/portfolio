"use client";

import { useId, useState } from "react";
import type { ExperienceRole } from "@/lib/about-content";
import styles from "./about-page.module.css";

/**
 * Professional Experience as an editorial accordion: company, then role
 * and dates beneath it, a hairline between entries, and a plus that
 * turns into a minus when the entry is open. The newest role starts
 * open so its detail is visible straight away.
 *
 * Entries open and close independently rather than one-at-a-time:
 * closing an entry above the one being opened would pull the page up
 * under the reader's cursor, the exact jump this list should never make.
 *
 * Opening and closing animate the panel's grid row from 0fr to 1fr, so
 * the height follows the real content with no measuring and no JS
 * animation; reduced motion snaps instead (about-page.module.css). A
 * closed panel is `inert`, so its text is skipped by keyboard and
 * assistive tech until it's opened.
 */
export function ExperienceList({ roles }: { roles: ExperienceRole[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const baseId = useId();

  function toggle(index: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <ol className={styles.roles}>
      {roles.map((role, i) => {
        const isOpen = open.has(i);
        const buttonId = `${baseId}-role-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li key={`${role.company}-${role.start}`} className={styles.role} data-open={isOpen}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className={styles.roleButton}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className={styles.company}>{role.company}</span>
                  <span className="text-[15px] leading-snug sm:text-base" style={{ color: "var(--ap-ink)" }}>
                    {role.role}
                  </span>
                  <span className="text-[13px] tracking-[0.02em] tabular-nums sm:text-sm" style={{ color: "var(--ap-muted)" }}>
                    {role.start} – {role.end}
                  </span>
                </span>
                <span aria-hidden="true" className={styles.toggleIcon}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 10h12" />
                    <path d="M10 4v12" className={styles.toggleBar} />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.rolePanel}
              inert={!isOpen}
            >
              <div className={styles.rolePanelInner}>
                {role.details.length > 1 ? (
                  <ul className={styles.details}>
                    {role.details.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.detailText}>{role.details[0]}</p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
