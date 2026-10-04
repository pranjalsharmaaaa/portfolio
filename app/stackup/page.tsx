import Link from "next/link";
import { CoverSection } from "@/components/stackup/cover-section";
import { OverviewSection } from "@/components/stackup/overview-section";
import { QuestionSection } from "@/components/stackup/question-section";
import { ProblemSection } from "@/components/stackup/problem-section";
import { HypothesisSection } from "@/components/stackup/hypothesis-section";
import { EcosystemSection } from "@/components/stackup/ecosystem-section";
import { BenchmarkSection } from "@/components/stackup/benchmark-section";
import { BenchmarkInsightSection } from "@/components/stackup/benchmark-insight-section";
import { ResearchIntroSection } from "@/components/stackup/research-intro-section";
import { ConversationsSection } from "@/components/stackup/conversations-section";
import { InsightsSection } from "@/components/stackup/insights-section";
import { ProblemStatementSection } from "@/components/stackup/problem-statement-section";
import { DesignOpportunitySection } from "@/components/stackup/design-opportunity-section";
import { ResearchToDesignSection } from "@/components/stackup/research-to-design-section";
import { VisualLanguageSection } from "@/components/stackup/visual-language-section";
import { PrototypeSection } from "@/components/stackup/prototype-section";
import { OnboardingSection } from "@/components/stackup/onboarding-section";
import { JourneySection } from "@/components/stackup/journey-section";
import { RecommendationSection } from "@/components/stackup/recommendation-section";
import { FundSelectionSection } from "@/components/stackup/fund-selection-section";
import { FirstInvestmentSection } from "@/components/stackup/first-investment-section";
import { PortfolioSection } from "@/components/stackup/portfolio-section";
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
 * exploration through the three benchmark-insight pages, then the
 * research screens (11-17) and the product walkthrough (18-24), which
 * reproduce fixed 16:9 frames — see components/stackup/slide.tsx.
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
      {/* Outside the page-stack (phones, incl. landscape) the link sits
          in its own sticky, opaque top bar that occupies real space in
          the flow, so it never floats over a section's content. Where
          the page-stack is active (same gate as stack-page.tsx) the bar
          collapses (`display: contents`) and the link is the original
          floating pill. */}
      <div
        className="sticky top-0 z-20 px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:[@media(min-height:520px)]:contents"
        style={{ background: "var(--stackup-bg)" }}
      >
        <Link
          href="/"
          className="inline-block rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur transition-colors hover:bg-white sm:[@media(min-height:520px)]:fixed sm:[@media(min-height:520px)]:top-6 sm:[@media(min-height:520px)]:left-6 sm:[@media(min-height:520px)]:z-20"
        >
          ← Back home
        </Link>
      </div>

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
        <ResearchIntroSection />
        <ConversationsSection />
        <InsightsSection />
        <ProblemStatementSection />
        <DesignOpportunitySection />
        <ResearchToDesignSection />
        <VisualLanguageSection />
        <PrototypeSection />
        <OnboardingSection />
        <JourneySection />
        <RecommendationSection />
        <FundSelectionSection />
        <FirstInvestmentSection />
        <PortfolioSection />
      </PageStack>
    </main>
  );
}
