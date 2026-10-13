"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navItems } from "@/lib/site-content";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

function NavLink({
  href,
  label,
  emphasized,
  onClick,
}: {
  href: string;
  label: string;
  emphasized?: boolean;
  onClick?: () => void;
}) {
  if (emphasized) {
    // A soft off-white pill with dark type and a hairline border, so it
    // stays the one clear call to action against the translucent nav in
    // either theme without the weight of a solid black button.
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap shadow-[0_1px_2px_rgb(28_34_48/8%)] transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.03] hover:bg-white hover:shadow-[0_4px_12px_rgb(28_34_48/14%)] ${FOCUS}`}
        style={{ background: "#fffaf2", color: "#1c2230", borderColor: "rgb(28 34 48 / 14%)" }}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap text-ink-muted transition-colors hover:bg-ink/[0.06] hover:text-ink ${FOCUS}`}
    >
      {label}
    </Link>
  );
}

/** How far from the top the nav is always shown, and how far a scroll must travel to count. */
const TOP_ZONE = 80;
const SCROLL_THRESHOLD = 10;

/**
 * Hides on a deliberate scroll down, returns on a deliberate scroll up,
 * always shown near the top. Movements smaller than SCROLL_THRESHOLD are
 * ignored (and don't reset the reference point), so jitter and tiny
 * touch drags never toggle it and a direction change can't flicker it.
 */
function useScrollVisibility(onHide: () => void) {
  const [state, setState] = useState({ visible: true, atTop: true });
  const onHideRef = useRef(onHide);
  useEffect(() => {
    onHideRef.current = onHide;
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y <= TOP_ZONE) {
        lastY = y;
        setState((s) => (s.visible && s.atTop ? s : { visible: true, atTop: true }));
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < SCROLL_THRESHOLD) return;
      lastY = y;
      const visible = delta < 0;
      if (!visible) onHideRef.current();
      setState((s) => (s.visible === visible && !s.atTop ? s : { visible, atTop: false }));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}

const noopSubscribe = () => () => {};

/**
 * The floating glass nav: photo, Home / Work / About, the "Work with me"
 * call to action and the theme toggle, in one translucent pill.
 *
 * It's placed in the hero's top row, but drawn above the whole page:
 * the hero is a sticky layer that About slides over, so a nav fixed
 * *inside* it would end up underneath About. Instead this renders an
 * invisible spacer of the pill's size in the hero (so the hero's layout
 * is exactly what it was), measures where that spacer sits, and portals
 * the real pill to <body> as a fixed element at that same spot. Before
 * hydration the pill renders in place, so the first paint already shows
 * it where it belongs.
 *
 * Scrolling down past the top hides it with a short lift-and-fade;
 * scrolling up brings the whole pill back together with a gentle spring
 * drop. Reduced motion keeps only a quick fade. Below `sm` the three
 * text links move into a small menu; the photo, "Work with me" and the
 * theme toggle stay in the pill.
 */
export function GlassNav() {
  const [open, setOpen] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);
  const [homeTop, setHomeTop] = useState<number | null>(null);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reduceMotion = useReducedMotion();
  // Scrolling down hides the pill and closes the mobile menu with it.
  const { visible, atTop } = useScrollVisibility(() => setOpen(false));

  // Where the pill sits in the hero at scroll 0 (its "home"), re-measured
  // on resize since the hero's top row moves with the breakpoints.
  useEffect(() => {
    const el = spacerRef.current;
    if (!el) return;
    const measure = () => setHomeTop(el.getBoundingClientRect().top + window.scrollY);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  const links = navItems.filter((item) => !item.emphasized);
  const cta = navItems.find((item) => item.emphasized);

  const pill = (
    <nav aria-label="Primary" className="relative w-full max-w-fit">
      <div
        className="flex items-center gap-1 rounded-full border py-1.5 pr-1.5 pl-1.5 shadow-lg backdrop-blur-xl sm:gap-1.5 sm:pr-2"
        style={{
          background: "var(--nav-bg)",
          borderColor: "var(--nav-border)",
          boxShadow: "0 8px 30px var(--nav-shadow)",
        }}
      >
        <Avatar />

        <div className="ml-1 hidden items-center gap-0.5 sm:flex">
          {links.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>

        {cta && (
          <div className="ml-1">
            <NavLink {...cta} />
          </div>
        )}

        <div className="mx-0.5 h-5 w-px bg-ink/10" aria-hidden="true" />
        <ThemeToggle />

        <button
          type="button"
          className={`flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/10 sm:hidden ${FOCUS}`}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 flex w-44 flex-col gap-1 rounded-2xl border p-2 shadow-lg backdrop-blur-xl sm:hidden"
            style={{
              background: "var(--nav-bg)",
              borderColor: "var(--nav-border)",
            }}
          >
            {links.map((item) => (
              <NavLink key={item.href} {...item} onClick={() => setOpen(false)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  // Once scrolled away from the top, it returns a little closer to the
  // edge than its hero spot (which on phones sits below the location
  // badge), so it never floats oddly low over the content.
  const top = atTop ? (homeTop ?? 0) : Math.min(homeTop ?? 16, 16);

  return (
    <>
      {/* Holds the pill's place in the hero layout (the original 50px row height), and is
          where the pill itself renders until the page has hydrated. */}
      <div ref={spacerRef} className="flex h-[50px] items-center justify-center">
        {!mounted && pill}
      </div>

      {mounted &&
        createPortal(
          <motion.div
            className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4"
            initial={false}
            animate={
              visible
                ? { opacity: 1, y: top }
                : { opacity: 0, y: reduceMotion ? top : top - 28 }
            }
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : visible
                  ? { type: "spring", stiffness: 520, damping: 34, mass: 0.7, opacity: { duration: 0.2 } }
                  : { duration: 0.22, ease: [0.4, 0, 1, 1] }
            }
          >
            <div className={visible ? "pointer-events-auto" : "pointer-events-none"} inert={!visible}>
              {pill}
            </div>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
