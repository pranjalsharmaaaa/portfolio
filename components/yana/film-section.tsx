import { yanaFilm } from "@/lib/yana-content";
import { YanaFrame, YANA_SCREEN, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";
import { YanaFilmPlayer } from "@/components/yana/film-player";

/**
 * The 60-second narrated film, right after the overview: the overview
 * introduces the product, the film shows it. Same frame, rhythm and
 * section heading as every other YANA screen; the film is capped at 800px
 * and centred (as on Stack Up and Sales Coach), and fills the content
 * width on smaller screens.
 */
export function YanaFilmSection() {
  const c = yanaFilm;
  return (
    <section className={YANA_SCREEN} style={{ background: "var(--yana-bg)" }} aria-label="The YANA film">
      <YanaFrame className={YANA_SCREEN_Y}>
        <YanaSectionHeading>{c.heading}</YanaSectionHeading>
        <p className="mt-6 max-w-[640px] text-base leading-relaxed sm:mt-8 sm:text-[17px]" style={{ color: "var(--yana-muted)" }}>
          {c.sub}
        </p>
        <figure className="m-0 mx-auto mt-8 flex w-full max-w-[800px] flex-col gap-4 lg:mt-10">
          <YanaFilmPlayer {...c.video} />
          <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: "var(--yana-muted)" }}>
            {c.meta.map((m, i) => (
              <span key={m} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                {m}
              </span>
            ))}
          </figcaption>
        </figure>
      </YanaFrame>
    </section>
  );
}
