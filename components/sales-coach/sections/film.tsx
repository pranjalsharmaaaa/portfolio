import { scFilm } from "@/lib/sales-coach-content";
import { Container, SCREEN_Y, SectionTitle } from "@/components/sales-coach/primitives";
import { FilmPlayer } from "@/components/sales-coach/film-player";

/**
 * The 60-second narrated film, right after the cover as an introduction
 * to the case study. Same rhythm, grid and SectionTitle as every other
 * screen; the film is capped at 800px and centred (as on Stack Up), and
 * fills the content width on smaller screens.
 */
export function FilmScreen() {
  const c = scFilm;
  return (
    <section className={SCREEN_Y} aria-label="The Sales Coach film">
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <figure className="m-0 mx-auto mt-8 flex w-full max-w-[800px] flex-col gap-4 @min-[1024px]:mt-10">
          <FilmPlayer {...c.video} />
          <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--sc-muted)]">
            {c.meta.map((m, i) => (
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
