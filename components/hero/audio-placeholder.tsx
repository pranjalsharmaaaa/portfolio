import { audioPlaceholder } from "@/lib/site-content";

/**
 * Reserved slot for a future audio moment ("my design journey,
 * rapped") — not built yet, no lyrics or audio invented here.
 *
 * Deliberately not a cassette/tape deck: it's built from the same
 * glass material as the nav (blur, subtle border, soft shadow) so it
 * reads as an object that belongs to this sky world rather than a
 * borrowed skeuomorph. A disabled control + a static waveform signal
 * "not yet active" without pretending to be a finished player.
 *
 * To wire up real audio later: replace the inner content with an
 * actual player, drop the `aria-hidden`/`disabled` treatment below,
 * and give the control a real accessible name — the layout slot
 * around it (this component's own size and position in Hero) doesn't
 * need to change.
 */
export function AudioPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="flex w-fit items-center gap-3 rounded-full border px-3 py-2 opacity-90 motion-safe:animate-float-slow"
      style={{
        background: "var(--nav-bg)",
        borderColor: "var(--nav-border)",
        boxShadow: "0 8px 30px var(--nav-shadow)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ background: "var(--accent-strong)", color: "var(--accent-on-strong)" }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" opacity="0.55" />
        </svg>
      </span>

      <span className="flex flex-col leading-tight">
        <span className="text-xs font-medium text-ink-muted">{audioPlaceholder.title}</span>
        <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-ink-quiet uppercase">
          {audioPlaceholder.status}
        </span>
      </span>

      <span className="flex items-end gap-[3px] pr-0.5 pl-1">
        {[7, 12, 5, 10, 6].map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full opacity-40"
            style={{ height: h, background: "var(--ink-quiet)" }}
          />
        ))}
      </span>
    </div>
  );
}
