# Stack Up — Case Study Film
## Phase 1 (Analysis) + Phase 2 (Creative Directions)

Status: awaiting approval of a direction and answers to the open questions (§6).
Source of truth: `lib/stackup-content.ts`, `app/stackup/page.tsx`, `public/images/stackup/*`, and the uploaded character kit / screens.

---

## 1. The product story (as the case study tells it)

| Beat | What the case study says (verbatim where quoted) |
|---|---|
| Spark | "You earn money. But how do you manage it?" |
| Brief | "Design a Personal Finance Management experience that helps people manage their overall net worth." |
| Personal turn | "I realised I first needed to **understand the financial ecosystem myself**… I found myself asking many of the same questions as **first-time earners**." |
| Hypothesis | "Earning money doesn't automatically mean **knowing how to manage it**." Pillars: Knowledge · Confidence · Experience |
| Ecosystem scan | Investments · Payments · Credit Cards · Net Worth · Paper Trading |
| Benchmark | Groww, Kuvera, IND Money (investing) · Frontpage, Money Bhai (practice) |
| Benchmark insights | 01 Products are built for investment-ready users · 02 Learning sits outside the investing journey · 03 Practice platforms remove the money risk, not the complexity |
| Research | **40+ people** across different levels of financial experience (broad). **23 user conversations** — early-career professionals aged **21–26**, managing money independently (focus group). These are two separate groups and must never be merged. |
| Insights | Four patterns: Depend on others · Figure it out themselves · Manage it in fragments · Hesitate to ask → "same underlying need: **guidance before action**." |
| Problem statement | "Financial products help people execute decisions, but do little to build the **understanding and confidence** needed to make those decisions independently." + "the **fear of losing money** often prevents people from taking their first step with confidence." |
| HMWs | Start · Understand · Experience · Confidence |
| Design principles | "simple, trustworthy and encouraging" · Bold Heading · Calm Interfaces · Hero Illustrations |
| Product flow | Onboarding (Welcome → Know You Better → Learn Without Risk → Practice Wallet ₹25,000 → All Set) → Journey (Home → First Move → Mutual Funds explained → 2 comfort questions) → Recommendation (Hybrid, with reasoning; Equity/Hybrid/Debt) → Fund selection (best match + 2 alternatives) → First investment (₹5,000, confidence 0% → 10%) → Portfolio (Confidence Jar, Assets, Practice Mode 100×) |
| Promise | Understand → Practise → Build Confidence → "A More Confident You" |

Usable real quotes for the film (from the 23 conversations): "Even after managing my own money, I still don't understand many financial terms." · "There are a lot of financial tools, overall I don't know where to start from." · "I'm scared of being judged for not knowing basic terms." · "I depend on my friend who manages my finances."

## 2. Visual language (extracted, not invented)

| Token | Value | Source |
|---|---|---|
| `green.brand` | `#006326` | `--stackup-green` |
| `green.deep` | `#035422` | research headings |
| `green.cta` | `#005028 → #007840` | button gradient sampled from UI |
| `green.tint` | `#e8f0e8` | opportunity cards / UI chips |
| `sage.card` | `#e2e5dc` | quote cards |
| `bg.warm` | `#f8f8f6` | UI background |
| `bg.page` | `#f5f5f5` | `--stackup-bg` |
| `ink` | `#262626` | `--stackup-ink` |
| `muted` | `#8e8e8c` | `--stackup-muted` |
| `slate` | `#3a3a3a` | cover / research text |
| `olive.shirt` | `#8a9c72` (shade `#6c8a66`) | sampled from illustrations |
| `skin` | `#fcd8a8` | sampled from illustrations |
| `accent.question` | warm orange (used only on "?" marks in the illustrations) | illustrations — use sparingly |

Type: **Inter** (variable, already bundled at `components/stackup/fonts/`). Hierarchy = small grey label → large two-tone heading (black + green accent word) → regular body with bold key phrases. UI: 16–24px radii, soft sage chips, dark green pill CTAs, cream 3D-ish product renders (wallet, jar, coin).

Illustration: hand-inked black outline, flat fills, olive shirt, no gradients, generous white space, speech bubbles with hand-drawn tails.

## 3. Asset inventory

Already in repo (character, same style as the uploaded kit): `illustration-stressed`, `illustration-steps`, `insight-depend`, `insight-figure-out`, `insight-fragments`, `insight-hesitate`, `illustration-knowledge`, `illustration-confidence`, `illustration-experience`.
Uploaded kit adds: working/earning, exploring/phone, confused, realisation, comparing A/B, confident, plus objects (salary, spending/EMI, credit card, emergency jar, insurance shield, investment chart, budget pie, sparkle/rays/arrow, progress bar).

The six required screens, full-res in repo (1312×2656):
1. Welcome → `app-onboarding-1` · 2. Practice Wallet → `app-onboarding-4` · 3. First Move → `app-journey-2` · 4. Comfort question → `app-journey-4` · 5. Recommendation → `app-recommendation-2` · 6. Confidence Jar → `app-portfolio-1`.
Supporting: Mutual Funds explained, Three Categories, Choose Fund, First Investment Complete (0→10%), Practice Mode, benchmark screenshots and logos.

Gaps: the kit is a single flattened sheet, so poses must be cut out (or redrawn as layered SVG for limb motion). No "receiving salary on phone" or "notification shower" pose exists yet.

## 4. Three creative directions

### A — "The Sketchbook" (editorial ink-on-paper)
- **Character:** the existing illustrations, cut out; secondary motion only (blink, breathing, head tilt, thought bubbles drawing on). Feels like the case study came to life.
- **Illustration:** objects "draw themselves" with a stroke-on reveal, then fill with flat colour.
- **Background:** warm off-white `#f8f8f6` paper, faint dotted grid (the case study already uses a subtle radial dot pattern), large empty margins.
- **Type:** Inter, two-tone headings exactly like the case study; hand-written annotation arrows in research beats.
- **Motion:** stroke draw-ons, ease-out slides, held pauses. A slow-moving camera across one continuous "page."
- **UI integration:** screens are dropped onto the page like printed cards, annotated with hand arrows and margin notes, then lift into a phone frame.
- **Risk:** can feel static or "slideshow" if pacing isn't strong.

### B — "One Continuous Stack" (spatial, object-led) — **recommended**
- **Character:** same illustrations, gently rigged (head/arm layers) so they can react, point and hold objects. They're always on the same horizon line, which becomes the film's floor.
- **Illustration:** the **stack** is the central metaphor. Salary arrives as a coin stack that gets eaten by spending/EMI/cards; later, rebuilt as a stack of Understand → Practise → Build Confidence (echoing the logo bars and `illustration-steps`). Objects transform into each other (coin → jar, wallet → phone) instead of cutting.
- **Background:** off-white with a single soft sage ground plane; depth from 2–3 parallax layers, never gradients.
- **Type:** Inter kinetic typography, two-tone (ink + `#006326`), words that settle into the layout rather than bounce.
- **Motion:** one long horizontal camera dolly through the whole story; scenes are "rooms" on one track. Match cuts on shapes (the jar on screen 6 is the jar the character fills in Act 3).
- **UI integration:** real screenshots inside a phone frame that is itself an object in the world. The character stands beside it, and illustrated objects slide out of the UI (e.g. the wallet render pops out of screen 2) to bridge illustration ↔ product.
- **Why it fits:** the logo *is* a stack, the case study's promise is literally steps, and match-cutting between illustrated objects and the product's 3D renders makes the illustrations and the UI feel like one system, which was your hardest requirement.

### C — "Research Wall" (documentary, designer's desk)
- **Character:** appears mostly in Acts 1, 3 and 6. Acts 2 and 4 are top-down on the designer's desk.
- **Illustration:** sticky notes, quote cards (`#e2e5dc`), benchmark screenshots pinned and connected with string.
- **Background:** top-down desk/board, cream with sage cards.
- **Type:** research-style labels ("01 / Benchmark Insight"), counters for 40+ and 23.
- **Motion:** camera pans and zooms across a large board; cards flip and cluster into the four patterns.
- **UI integration:** screens appear as printed prototypes on the wall, then the camera "enters" one.
- **Risk:** strongest for showing process, weakest for character continuity, and it can drift toward a generic "research board" trope.

**Recommendation: B**, borrowing A's stroke-on annotations for the research act (Act 2) so the designer's hand is visible there.

## 5. Proposed act timing (for direction B, ~104s @ 30fps)

| Act | Time | Lead layer |
|---|---|---|
| 1 Problem | 0–18s | Character + objects |
| 2 My journey | 18–42s | Typography + research artefacts |
| 3 Bigger picture | 42–54s | Objects |
| 4 Introducing Stack Up | 54–66s | Product |
| 5 Learning through doing | 66–92s | Product + character + objects |
| 6 Destination | 92–104s | Character + type |

## 6. Open questions (need answers before storyboarding)
See chat reply / next revision.
