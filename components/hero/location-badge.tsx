import { site } from "@/lib/site-content";

/**
 * "● INDIA" — a location marker with the quiet confidence of a magazine
 * masthead credit, not a standard site label (spec §06).
 */
export function LocationBadge() {
  return (
    <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-ink-muted uppercase">
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--accent)" }}
      />
      {site.location}
    </p>
  );
}
