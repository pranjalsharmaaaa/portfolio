import Link from "next/link";

/**
 * Shared shell for routes that exist in the nav today but whose real
 * content is designed in a later phase (spec §17A). Deliberately does
 * not invent portfolio content — just holds the place.
 */
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 bg-sky-bottom px-6 text-center">
      <p className="text-xs font-semibold tracking-[0.25em] text-ink-muted uppercase">
        Coming soon
      </p>
      <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-sm text-ink-muted">
        This section is still being designed. In the meantime, head back
        to the intro.
      </p>
      <Link
        href="/"
        className="rounded-full px-5 py-2 text-sm font-medium text-accent-on-strong transition-transform hover:scale-[1.03]"
        style={{ background: "var(--accent-strong)" }}
      >
        ← Back home
      </Link>
    </main>
  );
}
