"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navItems } from "@/lib/site-content";

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
    return (
      <Link
        href={href}
        onClick={onClick}
        className="rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap text-accent-on-strong transition-transform hover:scale-[1.03]"
        style={{ background: "var(--accent-strong)" }}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
    >
      {label}
    </Link>
  );
}

/**
 * Sticky glassmorphism nav (spec §07): photo, primary links, and the
 * emphasized "Work with me" action, in a translucent, blurred pill.
 *
 * Collapses into a disclosure menu below `md` so it stays usable on
 * narrow screens even though mobile visual polish is a later phase
 * (spec §11A).
 */
export function GlassNav() {
  const [open, setOpen] = useState(false);
  const links = navItems.filter((item) => !item.emphasized);
  const cta = navItems.find((item) => item.emphasized);

  return (
    <nav aria-label="Primary" className="relative w-full max-w-fit">
      <div
        className="flex items-center gap-1 rounded-full border px-2 py-2 shadow-lg backdrop-blur-xl"
        style={{
          background: "var(--nav-bg)",
          borderColor: "var(--nav-border)",
          boxShadow: "0 8px 30px var(--nav-shadow)",
        }}
      >
        <Avatar />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>

        {cta && (
          <div className="hidden md:block">
            <NavLink {...cta} />
          </div>
        )}

        <div className="mx-1 h-5 w-px bg-ink/10" aria-hidden="true" />
        <ThemeToggle />

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink md:hidden"
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
            className="absolute top-full right-0 mt-2 flex w-48 flex-col gap-1 rounded-2xl border p-2 shadow-lg backdrop-blur-xl md:hidden"
            style={{
              background: "var(--nav-bg)",
              borderColor: "var(--nav-border)",
            }}
          >
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} onClick={() => setOpen(false)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
