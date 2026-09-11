# Pranjal Sharma — Portfolio

Personal portfolio, built with Next.js (App Router), TypeScript, Tailwind
CSS v4, and Framer Motion.

## Current scope

Per the project spec, this phase builds and polishes **only the hero
screen** — the sky environment, glass navigation, animated headline,
and side vocabulary. The transition from the hero into the rest of the
site (work, about, playground) is a separate, later phase and has
intentionally not been designed yet.

`/work`, `/about`, `/playground` and `/contact` exist as routes so the
navigation is never a dead link, but each currently renders a clearly
labeled "Coming soon" placeholder (`components/ui/placeholder-page.tsx`)
rather than invented content.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Replacing placeholder assets

- **Profile photo** — swap `public/images/avatar-placeholder.svg` for a
  real photo (e.g. `avatar.jpg`) and update the `src` in
  `components/ui/avatar.tsx`. Nothing else needs to change.

## Project structure

```text
app/
  layout.tsx        Root layout: fonts, theme provider, metadata
  page.tsx           Hero-only home page
  globals.css        Design tokens (light + dark) and base styles
  work/, about/, playground/, contact/   Placeholder routes

components/
  hero/              Sky background, headline, side vocabulary, hero shell
  navigation/        Glass nav bar
  ui/                Theme toggle, avatar, placeholder page shell
  providers/         next-themes wrapper

lib/
  site-content.ts    Copy, kept separate from presentation
  use-mounted.ts      Hydration-safe "mounted" hook
```

## Notable decisions

- **Theming**: light/dark are two moods of the same sky, defined
  together as CSS custom properties from the start (see
  `app/globals.css`), not bolted on afterward. Preference persists via
  `next-themes` (localStorage + system preference).
- **Animated headline**: "Designer who solves / builds / vibe codes"
  cycles via Framer Motion. A visually-hidden static sentence carries
  the same content for screen readers, so the animated word is purely
  presentational. Reduced-motion preference is respected — the loop
  keeps cycling (it's real content) but drops the sliding transform in
  favor of a much shorter opacity change.
- **Sky background**: composed from layered CSS gradients, soft radial
  cloud shapes and a whisper of SVG grain — no photo, no sun/moon
  illustration.
- **Responsive foundation**: fluid type (`clamp()`), CSS Grid for the
  side vocabulary (so it can never overlap the headline at any width),
  and a collapsible nav — even though visual polish below desktop is a
  later phase per the spec.
