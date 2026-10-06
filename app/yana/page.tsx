import Link from "next/link";
import { YanaCoverSection } from "@/components/yana/cover-section";
import { YanaOverviewSection } from "@/components/yana/overview-section";
import { YanaProcessSection } from "@/components/yana/process-section";
import { YanaChapterDivider } from "@/components/yana/chapter-divider";
import { YanaDiscoverSection } from "@/components/yana/discover-section";
import { YANA_SCREEN } from "@/components/yana/frame";
import { yanaDiscoverChapter } from "@/lib/yana-content";

/**
 * The YANA case study, reproduced from the supplied reference PDF. Its
 * colors live ONLY in the --yana-* custom properties below, scoped to
 * this page's <main> (same pattern as Stack Up's --stackup-*): no global
 * token is read or changed, so nothing here can leak into the rest of
 * the portfolio, and nothing outside can restyle it.
 *
 * Color system: a warm cream foundation (--yana-bg) with Yana purple
 * as the primary accent, the same family as the rest of the portfolio.
 * The night sky is kept only where it's the reference's own artwork —
 * the cover — and pink survives as one controlled accent. The first
 * seven are the approved working values; --yana-night and
 * --yana-pink-light are measured from the reference's vector data.
 *
 * Sections are appended in batches as their reference pages arrive —
 * currently the cover through the Discover chapter's first page.
 */
export default function YanaPage() {
  return (
    <main
      style={
        {
          "--yana-bg": "#fffaf2",
          "--yana-card": "#ffffff",
          "--yana-purple": "#6a4ad8",
          "--yana-purple-light": "#e6e6fa",
          "--yana-ink": "#171717",
          "--yana-muted": "#6b6b6b",
          "--yana-label": "#6a4ad8",
          "--yana-night": "#09086f",
          "--yana-pink-light": "#ffabf9",
          background: "var(--yana-bg)",
        } as React.CSSProperties
      }
    >
      <Link
        href="/"
        className="fixed top-4 left-4 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur transition-colors hover:bg-white sm:top-6 sm:left-6"
      >
        ← Back home
      </Link>

      <YanaCoverSection />
      <YanaOverviewSection />
      <YanaProcessSection />

      {/* The chapter band and its first page of content share ONE screen:
          in the reference they're a 193 + 464 split of what is otherwise
          a single ~650-tall page (the same height as the process page),
          and a lone band stretched to a full viewport would be mostly
          empty color. */}
      <div className={YANA_SCREEN}>
        <YanaChapterDivider number={yanaDiscoverChapter.number} title={yanaDiscoverChapter.title} />
        <YanaDiscoverSection />
      </div>
    </main>
  );
}
