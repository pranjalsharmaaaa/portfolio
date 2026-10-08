import type { Metadata } from "next";
import Link from "next/link";
import { ScreenStack } from "@/components/sales-coach/screen-stack";
import { BriefMoreScreen, CoverScreen, EnvironmentScreen, FindingScreen } from "@/components/sales-coach/sections/intro";
import { AiPossibleScreen, PatternsScreen, PrinciplesScreen, PrototypeScreen } from "@/components/sales-coach/sections/explore";
import { ConfidenceScreen, PartnerScreen, ScrutinyScreen, SharpenedScreen, TalkingScreen } from "@/components/sales-coach/sections/validate";
import { AskScreen, PractiseScreen, UnderstandScreen } from "@/components/sales-coach/sections/product";

export const metadata: Metadata = {
  title: "Sales Coach — Pranjal Sharma",
  description:
    "A voice-first AI experience that helps Airtel KAMs prepare, practise, and act on customer opportunities.",
};

/**
 * The Sales Coach case study — translated screen-by-screen from the
 * 16-page Sales Coach PDF (one screen per PDF page, in order).
 *
 * Colors belong to Sales Coach's own Airtel identity, not the
 * portfolio's tokens, and are scoped to this route through the --sc-*
 * custom properties below. Fixed light palette regardless of the
 * site's theme, as in the PDF.
 */
export default function SalesCoachPage() {
  return (
    <main
      id="main"
      className="bg-[var(--sc-bg)] text-[var(--sc-ink)]"
      style={
        {
          colorScheme: "light",
          "--sc-bg": "#f8f8f6",
          "--sc-card": "#fafaf8",
          "--sc-ink": "#0b0b0b",
          "--sc-muted": "#5c5c5c",
          "--sc-label": "#857c79",
          "--sc-red": "#c60a18",
          "--sc-red-bright": "#ee1133",
          "--sc-red-line": "#e9979c",
          "--sc-pink": "#fdf3f2",
          "--sc-pink-strong": "#fde5e4",
          "--sc-chip": "#f9ced1",
          "--sc-num": "#ffe1de",
        } as React.CSSProperties
      }
    >
      <Link
        href="/"
        className="fixed top-4 left-4 z-30 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm ring-1 ring-black/5 backdrop-blur transition-colors hover:bg-white sm:top-6 sm:left-6"
      >
        ← Back home
      </Link>

      <ScreenStack>
        <CoverScreen />
        <EnvironmentScreen />
        <FindingScreen />
        <BriefMoreScreen />
        <AiPossibleScreen />
        <PatternsScreen />
        <PrinciplesScreen />
        <PrototypeScreen />
        <ScrutinyScreen />
        <TalkingScreen />
        <SharpenedScreen />
        <PartnerScreen />
        <ConfidenceScreen />
        <UnderstandScreen />
        <AskScreen />
        <PractiseScreen />
      </ScreenStack>
    </main>
  );
}
