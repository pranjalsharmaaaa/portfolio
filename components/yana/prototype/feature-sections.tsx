import {
  yanaHomeFeature,
  yanaJournalFeature,
  yanaOnboarding,
  yanaProfileFeature,
  yanaTherapyFeature,
} from "@/lib/yana-prototype-content";
import { YanaPhoneShowcase } from "@/components/yana/prototype/phone-showcase";
import { YANA_DEEP } from "@/components/yana/prototype/prototype-cta-section";

/* The reference's three 34px raster icons, redrawn as strokes. */
const ICONS = {
  heart: <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />,
  sliders: (
    <>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8M4 12h4M12 12h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
      <circle cx="10" cy="12" r="2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2.5" />
    </>
  ),
} as const;

/** "A more personal starting point": three promises, then the four onboarding steps. */
export function YanaOnboardingSection() {
  const { heading, features, screens } = yanaOnboarding;
  return (
    <YanaPhoneShowcase label="Onboarding" heading={heading} screens={screens} captions="none">
      <ul className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6 lg:mt-9">
        {features.map((f) => (
          <li key={f.title} className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-[16px]" style={{ background: "var(--yana-purple-light)" }}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none" stroke={YANA_DEEP} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                {ICONS[f.icon as keyof typeof ICONS]}
              </svg>
            </span>
            <span>
              <span className="block text-[17px] font-semibold sm:text-[18px]" style={{ color: YANA_DEEP }}>
                {f.title}
              </span>
              <span className="mt-0.5 block text-[15px] sm:text-[16px]" style={{ color: "color-mix(in srgb, var(--yana-purple) 88%, white)" }}>
                {f.body}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </YanaPhoneShowcase>
  );
}

/** "A home that meets you where you are": the four home/community screens on a lavender stage. */
export function YanaHomeFeatureSection() {
  const { heading, body, screens } = yanaHomeFeature;
  return <YanaPhoneShowcase label="Personalized home" heading={heading} body={body} screens={screens} captions="none" stage />;
}

/** "Small moments, big progress": reflection → learning → progress, on one track. */
export function YanaJournalFeatureSection() {
  const { heading, body, screens } = yanaJournalFeature;
  return <YanaPhoneShowcase label="Journal and minis" heading={heading} body={body} screens={screens} captions="timeline" />;
}

/** "Find the right support for you": a four-step journey, choose → personalise → discover → join. */
export function YanaTherapyFeatureSection() {
  const { heading, body, screens } = yanaTherapyFeature;
  return <YanaPhoneShowcase label="Therapy discovery" heading={heading} body={body} screens={screens} captions="steps" />;
}

/** "Everything in one place": the profile and the three places it leads. */
export function YanaProfileFeatureSection() {
  const { heading, body, screens } = yanaProfileFeature;
  return <YanaPhoneShowcase label="Profile" heading={heading} body={body} screens={screens} captions="hub" />;
}
