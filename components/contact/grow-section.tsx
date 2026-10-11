"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Garden } from "@/components/contact/garden";
import gardenStyles from "@/components/contact/garden.module.css";
import { growContact } from "@/lib/site-content";

/**
 * Same reveal shape as selected-work.tsx / about-section.tsx
 * (duplicated rather than shared, per those files' own convention).
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/** The emphasis word inside a headline line, set in italic garden green. */
function withEmphasis(line: string, word: string) {
  const at = line.indexOf(word);
  if (at < 0) return line;
  return (
    <>
      {line.slice(0, at)}
      <em className="font-medium italic" style={{ color: "#5a7743" }}>
        {word}
      </em>
      {line.slice(at + word.length)}
    </>
  );
}

const ICON = "h-[18px] w-[18px] shrink-0";

const icons: Record<"linkedin" | "email" | "phone", ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.66 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4V9.75Z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path
        d="M6.6 3.75h2.1c.4 0 .75.27.86.66l.9 3.27a.9.9 0 0 1-.26.9L8.6 10.1a12.3 12.3 0 0 0 5.3 5.3l1.52-1.6a.9.9 0 0 1 .9-.26l3.27.9c.39.11.66.46.66.86v2.1A2.85 2.85 0 0 1 17.4 20.25 13.65 13.65 0 0 1 3.75 6.6 2.85 2.85 0 0 1 6.6 3.75Z"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

function ContactPill({ kind }: { kind: keyof typeof growContact.links }) {
  const link = growContact.links[kind];
  const external = kind === "linkedin";
  return (
    <a
      href={link.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${link.label} (opens in a new tab)` } : {})}
      className="inline-flex min-h-12 w-full max-w-[20rem] items-center justify-center gap-2.5 rounded-full border border-[color-mix(in_srgb,var(--paper-ink)_18%,transparent)] px-5 text-[15px] font-medium text-[var(--paper-ink)] transition-colors duration-300 hover:border-[var(--paper-ink)] hover:bg-[var(--paper-ink)] hover:text-[var(--shore-solid)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper-ink)] sm:w-auto sm:max-w-none"
    >
      {icons[kind]}
      <span>{link.label}</span>
      {external && (
        <span aria-hidden="true" className="-ml-1 text-sm">
          ↗
        </span>
      )}
    </a>
  );
}

/**
 * The homepage's closing section, right after Selected Work and on the
 * same --shore-solid cream: a short value line, the "Let's grow your
 * next idea." headline as the centrepiece, an invitation, three contact
 * pills, and the interactive garden along the very bottom. The garden
 * sits in normal flow below the text, so the two can never overlap at
 * any width.
 */
export function GrowSection() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;
  const { intro, headline, supporting, gardenHint } = growContact;

  return (
    <section
      id="contact"
      aria-labelledby="grow-heading"
      className="relative overflow-hidden"
      style={{ background: "var(--shore-solid)", color: "var(--paper-ink)" }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        variants={variants}
        className="mx-auto flex w-full max-w-[100rem] flex-col items-center px-6 pt-14 text-center sm:px-10 sm:pt-24 lg:px-12"
      >
        <p className="max-w-[46ch] text-[15px] leading-relaxed sm:text-lg" style={{ color: "var(--paper-ink-muted)" }}>
          {intro}
        </p>

        <h2
          id="grow-heading"
          className="mt-8 font-display text-[clamp(2.4rem,calc((100vw_-_48px)/7.3),3.5rem)] leading-[1.04] font-medium tracking-[-0.02em] text-balance sm:mt-10 sm:text-[clamp(3.5rem,7.4vw,7rem)]"
        >
          {headline.lines.map((line, i) => (
            <span key={line} className="sm:block">
              {withEmphasis(line, headline.emphasis)}
              {i < headline.lines.length - 1 && " "}
            </span>
          ))}
        </h2>

        <p className="mt-6 max-w-[40ch] text-base leading-relaxed sm:mt-8 sm:text-lg" style={{ color: "var(--paper-ink-muted)" }}>
          {supporting}
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <ContactPill kind="linkedin" />
          <ContactPill kind="email" />
          <ContactPill kind="phone" />
        </div>
      </motion.div>

      <p className="mt-14 text-center font-display text-sm italic sm:mt-16" style={{ color: "var(--paper-ink-muted)" }}>
        <span className={gardenStyles.hintPointer}>{gardenHint.pointer}</span>
        <span className={gardenStyles.hintTouch}>{gardenHint.touch}</span>
      </p>

      <div className="mt-2">
        <Garden />
      </div>
    </section>
  );
}
