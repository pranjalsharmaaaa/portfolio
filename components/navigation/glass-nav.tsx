"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navItems as defaultNavItems, type NavItem } from "@/lib/site-content";

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
  // The page you're on is outlined (About, on /about). Section links
  // like "/#work" never are.
  const current = usePathname() === href && href !== "/";

  if (emphasized) {
    // A frosted-glass pill (`.nav-cta`, globals.css): translucent and a
    // touch lighter than the nav at rest, warming to soft off-white on
    // hover, keyboard focus and press — the one call to action, without
    // a solid white block sitting in the sky.
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`nav-cta rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap ${FOCUS}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={`rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-ink/[0.06] hover:text-ink ${
        current ? "text-ink shadow-[inset_0_0_0_1px_var(--ink)]" : "text-ink-muted"
      } ${FOCUS}`}
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
function useScrollVisibility(onHide: () => void, enabled = true) {
  const [state, setState] = useState({ visible: true, atTop: true });
  const onHideRef = useRef(onHide);
  useEffect(() => {
    onHideRef.current = onHide;
  });

  useEffect(() => {
    if (!enabled) return;
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
  }, [enabled]);

  return state;
}

const noopSubscribe = () => () => {};

/** The fixed row for `align="start"`: the same gutters and max width as the page content. */
const PAGE_ROW = "mx-auto max-w-[100rem] items-center justify-between gap-3 px-5 sm:px-10 lg:px-12";

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
 * drop. Reduced motion keeps only a quick fade. Below `sm` the text
 * links move into a small menu; the photo, "Work with me" and the
 * theme toggle stay in the pill.
 *
 * Other pages reuse the same nav with `align="start"`: the pill sits at
 * the left of the page's own gutters instead of centred, its photo
 * leads home, and anything passed as `trailing` (the /about page's
 * theme controls) rides at the right edge of the same fixed row, so it
 * hides and returns with the pill. `items` and `themeToggle` let such a
 * page use its own link set and leave the in-pill toggle out, and
 * `hideOnScroll={false}` keeps the whole row in place the entire time
 * (the /about page, where the nav is the way back home).
 */
export function GlassNav({
  items = defaultNavItems,
  align = "center",
  themeToggle = true,
  trailing,
  hideOnScroll = true,
}: {
  items?: NavItem[];
  align?: "center" | "start";
  themeToggle?: boolean;
  trailing?: ReactNode;
  hideOnScroll?: boolean;
} = {}) {
  const [open, setOpen] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);
  const [homeTop, setHomeTop] = useState<number | null>(null);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reduceMotion = useReducedMotion();
  // Scrolling down hides the pill and closes the mobile menu with it.
  const { visible, atTop } = useScrollVisibility(() => setOpen(false), hideOnScroll);

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

  const links = items.filter((item) => !item.emphasized);
  const cta = items.find((item) => item.emphasized);
  const start = align === "start";

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
        {start ? (
          <Link href="/" aria-label="Pranjal Sharma, home" className={`rounded-full ${FOCUS}`}>
            <Avatar />
          </Link>
        ) : (
          <Avatar />
        )}

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

        {themeToggle && (
          <>
            <div className="mx-0.5 h-5 w-px bg-ink/10" aria-hidden="true" />
            <ThemeToggle />
          </>
        )}

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
      <div ref={spacerRef} className={`flex h-[50px] items-center ${start ? "justify-between gap-3" : "justify-center"}`}>
        {!mounted && pill}
        {!mounted && trailing}
      </div>

      {mounted &&
        createPortal(
          <motion.div
            className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex ${start ? PAGE_ROW : "justify-center px-4"}`}
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
            {trailing && (
              <div className={visible ? "pointer-events-auto" : "pointer-events-none"} inert={!visible}>
                {trailing}
              </div>
            )}
          </motion.div>,
          document.body,
        )}
    </>
  );
}
