"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { selectedWork, type SelectedWorkProject } from "@/lib/site-content";

/**
 * Same reveal shape as about-section.tsx's own `EASE`/`reveal`/
 * `reducedReveal` (duplicated here rather than imported/shared — see
 * that file's own note on why).
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

/**
 * The image + its hover reveal, shared by the featured project and the
 * two secondary cards alike — only the aspect ratio differs per call
 * site. The description no longer sits below the title as a separate
 * block (an earlier round's approach); it now lives *on* the image
 * itself, centered over a soft blur + tint that only appears on hover,
 * so revealing it costs zero layout height anywhere — the image box
 * never changes size, at rest or hovered.
 *
 * Both overlay layers key off the shared `group` on the enclosing
 * `<Link>`, exactly like the image's own hover scale — no local state,
 * one hover source of truth per card.
 */
function ProjectImage({
  project,
  aspectClass,
}: {
  project: SelectedWorkProject;
  aspectClass: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden rounded-[1.75rem] ${aspectClass}`}>
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] group-focus-within:scale-[1.015]"
      />

      {/* Tint + blur, both derived from the existing --paper-ink token
          (no new color introduced) — dark and soft enough that the
          screens underneath stay recognizable, not blacked out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 backdrop-blur-[3px] transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ background: "color-mix(in srgb, var(--paper-ink) 44%, transparent)" }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <p
          className="max-w-sm translate-y-1 text-center text-sm leading-relaxed opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          style={{ color: "var(--shore-solid)" }}
        >
          {project.description}
        </p>
      </div>
    </div>
  );
}

/** The label row below a card's image: number, title, and an arrow that only appears on hover. */
function ProjectLabel({
  project,
  align,
  titleClassName,
}: {
  project: SelectedWorkProject;
  align: "center" | "left";
  titleClassName: string;
}) {
  return (
    <div
      className={`flex items-baseline gap-2 ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      <span className="font-display text-xs tracking-[0.1em]" style={{ color: "var(--paper-ink-muted)" }}>
        {project.number}
      </span>
      <h3 className={`font-display leading-tight font-semibold ${titleClassName}`} style={{ color: "var(--paper-ink)" }}>
        {project.title}
      </h3>
      <span
        aria-hidden="true"
        className="inline-block text-base opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-within:translate-x-0.5 group-focus-within:opacity-100"
        style={{ color: "var(--paper-ink)" }}
      >
        ↗
      </span>
    </div>
  );
}

/**
 * The one featured project (Stack Up): centered, its image the
 * dominant visual element but sized to stay comfortably within a
 * single desktop viewport alongside its own label — not the
 * near-full-height treatment an earlier round used.
 */
function FeaturedProject({ project }: { project: SelectedWorkProject }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
      className="flex flex-col items-center"
    >
      <Link href={project.href} className="group flex w-full flex-col items-center">
        <div className="w-full shadow-[0_28px_56px_-26px_rgb(20_30_50/40%)] sm:w-[65%] md:w-[44%]">
          <ProjectImage project={project} aspectClass="aspect-[1672/941]" />
        </div>

        <div className="mt-4">
          <ProjectLabel project={project} align="center" titleClassName="text-xl sm:text-2xl" />
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * One of the two smaller projects below the featured one. Same image +
 * hover-overlay mechanics as `FeaturedProject`, just smaller and
 * left-aligned.
 */
function SecondaryCard({ project }: { project: SelectedWorkProject }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px -10% 0px" }} variants={variants}>
      <Link href={project.href} className="group block">
        <div className="shadow-[0_18px_36px_-20px_rgb(20_30_50/36%)]">
          <ProjectImage project={project} aspectClass="aspect-[4/3]" />
        </div>

        <div className="mt-3">
          <ProjectLabel project={project} align="left" titleClassName="text-lg" />
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Stack Up featured, centered and modestly larger; Sales Coach and
 * YANA follow as two equal, smaller cards below it, both narrower than
 * the section's full content width so they read as supporting projects
 * rather than a second full-width row. Sits directly after
 * AboutSection on the same `--shore-solid` cream surface.
 *
 * `pt-10 sm:pt-8` (paired with AboutSection's own `pb-10 sm:pb-12`)
 * is what lands the philosophy statement → this heading gap at ~80px
 * at both the mobile and `sm:`+ breakpoints, without touching
 * AboutSection itself.
 */
export function SelectedWork() {
  return (
    <section
      aria-label="Selected work"
      className="relative"
      style={{ background: "var(--shore-solid)", color: "var(--paper-ink)" }}
    >
      <div className="mx-auto flex w-full max-w-[100rem] flex-col px-6 pt-10 pb-16 sm:px-10 sm:pt-8 sm:pb-20 lg:px-12">
        <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: "var(--paper-ink)" }}>
          {selectedWork.heading}
        </p>

        <div className="mt-6 sm:mt-8">
          <FeaturedProject project={selectedWork.featured} />
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[46rem] grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2">
          {selectedWork.secondary.map((project) => (
            <SecondaryCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
