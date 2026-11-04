import { stackupFilm } from "@/lib/stackup-content";
import { Container, SECTION_Y } from "@/components/stackup/container";
import { FilmPlayer } from "@/components/stackup/film-player";

/**
 * The narrated film, placed right after the overview as a cinematic
 * introduction to the case study. Same grid, rhythm and type scale as
 * the overview above it (label → two-tone heading → body), then the film
 * at full content width so it reads as part of the page, not an embed.
 */
export function FilmSection() {
  const { video } = stackupFilm;
  return (
    <section className={`relative ${SECTION_Y}`} style={{ background: "var(--stackup-bg)" }} aria-label="The Stack Up film">
      <Container className="flex flex-col gap-8 @min-[1024px]:gap-10">
        <div className="max-w-3xl">
          <p className="text-xl font-bold tracking-wide uppercase @min-[640px]:text-2xl @min-[1024px]:text-3xl" style={{ color: "var(--stackup-label)" }}>
            {stackupFilm.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold @min-[640px]:text-4xl" style={{ color: "var(--stackup-ink)" }}>
            {stackupFilm.headingPlain}
            <span style={{ color: "var(--stackup-green)" }}>{stackupFilm.headingAccent}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed @min-[640px]:text-lg" style={{ color: "var(--stackup-ink)" }}>
            {stackupFilm.body}
          </p>
        </div>

        <figure className="m-0 flex flex-col gap-4">
          <FilmPlayer {...video} />
          <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: "var(--stackup-muted)" }}>
            {stackupFilm.meta.map((m, i) => (
              <span key={m} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                {m}
              </span>
            ))}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
