import Link from "next/link";
import { CoverSection } from "@/components/stackup/cover-section";
import { OverviewSection } from "@/components/stackup/overview-section";
import { QuestionSection } from "@/components/stackup/question-section";
import { ProblemSection } from "@/components/stackup/problem-section";
import { HypothesisSection } from "@/components/stackup/hypothesis-section";
import { EcosystemSection } from "@/components/stackup/ecosystem-section";
import { BenchmarkSection } from "@/components/stackup/benchmark-section";
import { BenchmarkInsightSection } from "@/components/stackup/benchmark-insight-section";
import { PageStack } from "@/components/stackup/stack-page";
import { stackupBenchmarkInsights } from "@/lib/stackup-content";

/**
 * The Stack Up case study — reproduced section-by-section from Figma
 * reference screenshots, not designed here. Colors/typography in these
 * sections intentionally do NOT reuse the portfolio's own tokens
 * (--paper-ink, --accent, etc.): they belong to Stack Up's own brand,
 * scoped to this page only via the --stackup-* custom properties below.
 *
 * Sections are appended in batches as their reference screens arrive:
 * cover through "An initial hypothesis" first, then the ecosystem
 * exploration through the three benchmark-insight pages.
 */
export default function StackUpPage() {
  return (
    <main
      style={
        {
          "--stackup-bg": "#f5f5f5",
          "--stackup-card": "#ffffff",
          "--stackup-green": "#006326",
          "--stackup-ink": "#262626",
          "--stackup-muted": "#8e8e8c",
          "--stackup-label": "#9c9c99",
        } as React.CSSProperties
      }
    >
      <Link
        href="/"
        className="fixed top-4 left-4 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur transition-colors hover:bg-white sm:top-6 sm:left-6"
      >
        ← Back home
      </Link>

      <PageStack>
        <CoverSection />
        <OverviewSection />
        <QuestionSection />
        <ProblemSection />
        <HypothesisSection />
        <EcosystemSection />
        <BenchmarkSection />
        {stackupBenchmarkInsights.map((insight) => (
          <BenchmarkInsightSection key={insight.index} {...insight} />
        ))}
      </PageStack>
    </main>
  );
}
