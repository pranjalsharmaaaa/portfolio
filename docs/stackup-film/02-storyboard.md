# Stack Up — Case Study Film
## Phase 2b: Scene-by-scene storyboard (Direction B "One Continuous Stack", with A's hand-drawn annotations)

Status: **for review**. No animation code is written until this is approved.
Specs: 1920×1080 · 30 fps · **1:48 (108 s, 3,240 frames)** · 17 scenes in 6 acts.

---

## 0. Rules for the whole film

**The world.** One continuous horizontal track. A single ink ground line (2px, `#262626`, hand-drawn wobble) runs the whole film. The camera dollies left-to-right through it, so every scene is a "room" further along the same line. Scenes don't cut; the camera travels, or a shape match-cuts into the next scene.

**Background.** Warm off-white `#f8f8f6`. A soft sage ground plane (`#e2e5dc`) under the line, about 22% of frame height. A faint dot grid (the case study's own 3% radial pattern) appears **only in Act 2**, marking it as "the designer's notebook." No gradients except the real UI's button gradient.

**Depth.** Three parallax layers. Far: dot grid and large pale shapes, 0.3× camera speed. Mid: character and objects, 1×. Near: occasional out-of-focus coins/leaves passing, 1.4× with 4px blur, used at most 3 times.

**The stack (central metaphor).** A coin stack is born in S1, eaten in S2, ignored in S3, rebuilt as "the bigger picture" in S8, compressed into the Stack Up logo in S10, becomes the Practice Wallet in S11, feeds the Confidence Jar in S15–S16, and becomes the Understand → Practise → Build Confidence steps in S17.

**Character.** Always the same person (your reference). They are the young earner, and in Act 2 they're also *you*: the film's turn is "these were my questions too." Poses come from the existing art (repo + kit). Motion is limited to secondary animation: blink every 3–4 s, breathing (1.5% scale on torso, 4 s loop), head tilt ≤ 4°, and pose swaps hidden behind a 3-frame squash/smear or an object passing in front. No walking cycles, no bounce.

**Typography (Inter only).**

| Style | Size @1080p | Weight | Use |
|---|---|---|---|
| Label | 22px, +4% tracking, `#8e8e8c` | 500 | section eyebrows ("Research") |
| Display | 96px / 104 lh | 700 | the big two-tone lines (ink + `#006326` accent) |
| Statement | 48px / 60 lh | 600 | insights, problem statement |
| Body | 30px / 42 lh | 400, bold for key phrase | supporting lines |
| Chip | 24px | 500 | notification pills, object labels |
| Annotation | Inter Italic 24px, `#035422` | 500 | hand-drawn notes in Act 2 (paired with stroked arrows) |
| Caption | 30px, white text on 85% `#262626` pill | 500 | subtitle band, bottom 8% |

Kinetic type rule: words **settle** (12px rise + fade over 10 frames, ease-out cubic). No bounce, no per-letter scatter. Two-tone headings reveal the ink part first, then the green accent 6 frames later.

**Captions.** VO is subtitled in a fixed bottom band. When on-screen kinetic type already says the same words, the caption is suppressed so the frame never says one thing twice.

**Colour.** Only the tokens from `01-analysis-and-directions.md`. Warm orange is reserved for the "?" marks, exactly as in your illustrations (used in S3 and S6 only).

**UI handling.** Real screenshots from `public/images/stackup/`, untouched, inside one phone frame (your existing bezel style + `app-phone-shadow.webp`). The phone appears **only in Acts 4–6** (S10–S16). The only overlays allowed on top of UI are a soft tap ripple (a 40px sage circle) and a highlight ring around an element that already exists on the screen.

**Easing vocabulary.** Enter: `cubic-bezier(0.22, 1, 0.36, 1)`. Exit: `cubic-bezier(0.64, 0, 0.78, 0)`. Camera: `easeInOutSine`. Springs only for coins landing (damping 18, no overshoot past 4px).

---

## ACT 1 — THE PROBLEM (0:00–0:16)

### S1 · Payday — 0:00–0:04 (4 s)
- **Background/composition:** Empty off-white frame. The ground line draws itself left to right (stroke-on, 20 frames). Wide shot; the horizon sits at 72% height.
- **Character:** "Working / Earning" pose (kit): at a desk with a laptop and mug, right third of frame. Blinks once, glances down at the desk.
- **Objects:** A phone on the desk buzzes (2px shake, 6 frames). The **"Salary Credited ₹35,000"** card (kit) rises from the phone, holds, then folds into **a neat stack of 7 gold-green coins** that lands at centre-left with a soft spring. Sparkle rays (kit) flick on above the stack and fade.
- **UI:** none.
- **Type:** Label, top-left: `PAYDAY`.
- **VO:** "You start earning. And for the first time, the money is yours."
- **Transition →** The camera stays put; the first notification drops in from the top of frame.

### S2 · Where did it go? — 0:04–0:09 (5 s)
- **Background/composition:** Same frame. The camera eases 5% closer to the coin stack.
- **Character:** Swaps (hidden behind the first chip passing) to "Exploring / phone" pose, looking at the phone. By the last chip, the head tilts down and the brows drop (expression swap).
- **Objects:** Five rounded notification chips (white card, 16px radius, Inter 24px, small icon) drop in a staggered column, 18 frames apart: `Shopping` · `EMI due` · `Credit card bill` · `Subscriptions` · `Monthly expenses`. Each chip lands, then **pulls one coin off the stack**. The coin arcs into its matching kit object (shopping bags, a card, a calendar-receipt shape), which appears for 12 frames and dissolves. The stack shrinks **7 → 2**.
- **UI:** none (these chips are illustrative, not Stack Up UI).
- **Type:** the chip labels only.
- **VO:** "Then comes shopping. EMIs. A credit card bill. Subscriptions. And somehow, the month gets ahead of you."
- **Transition →** The chips slide off frame right; the camera pushes in on the character.

### S3 · The questions — 0:09–0:16 (7 s)
- **Background/composition:** Medium shot on the character. The sage ground plane rises slightly, giving a quieter, more inward mood. The two remaining coins sit at the character's feet.
- **Character:** Main "Thinking" pose (hand on chin, kit hero pose). Slow head tilt left → right across the beat.
- **Objects:** Three thought bubbles **draw on** (stroke reveal, then the text fades in), one every ~1.6 s:
  1. "How do I start managing money?"
  2. "How do I track everything?"
  3. "Should I save, invest or get insurance first?"
  An orange "?" pops above the head (the only bounce in the film: 1 overshoot, 4px). The two coins wobble once.
- **Type:** bubble text only (Inter 28px, ink).
- **VO:** "How do I start managing money? Should I save, invest, or get insurance first?"
- **Transition →** The three bubbles drift together and **condense into the single orange "?"**, which shrinks into a blinking text cursor at centre frame. Match cut into Act 2.

---

## ACT 2 — MY JOURNEY (0:16–0:46)

### S4 · These were my questions too — 0:16–0:26 (10 s)
- **Background/composition:** The dot grid fades in (Act 2's notebook texture). Type-led, centred-left. The character stays on the ground line at right, the same person, now with a notebook (the `insight-fragments` pose).
- **Character:** Looks from the phone to the notebook, then up and out of frame (a moment of recognition). This is *you*.
- **Objects:** A paper "brief" card (white, 24px radius, slight 1.5° tilt) slides in from the left:
  > **Semester project · Live brief**
  > "Design a Personal Finance Management experience that helps people manage their overall net worth."
  A hand-drawn green underline strokes under "manage", with the annotation (Inter Italic, `#035422`) "…but did I know how?"
- **Type (verbatim from case study, two-tone):**
  - Display: "You earn money." (ink)
  - Display: "But how do you manage it?" (green), 1 s later
  - Then Body, replacing the display lines: "I realised I first needed to **understand the financial ecosystem myself.**"
- **VO:** "Those were my questions too. Starting my semester project, I realised I didn't really understand money myself — and I wondered if other young earners felt the same."
- **Transition →** The camera dollies right; the brief card slides into the next scene and becomes the first of a row of cards.

### S5 · Exploring the ecosystem — 0:26–0:33 (7 s)
- **Background/composition:** Dot grid. A horizontal row of five ecosystem cards sits on the ground line: `Investments` · `Payments` · `Credit Cards` · `Net Worth` · `Paper Trading` (verbatim). Above them, five benchmark logos pin in with real screenshots tilted behind (`benchmark-groww-investready`, `benchmark-kuvera-learning`, `benchmark-indmoney-learning`, `benchmark-moneybhai-practice`, `benchmark-frontpage-practice-2`).
- **Character:** "Figure it out" pose (laptop, from `insight-figure-out`), small, at the left end of the row, as if browsing the wall.
- **Objects:** Hand-drawn arrows stroke between the screenshots and three sticky-note cards (`#e2e5dc`) that appear one by one:
  1. "Built for investment-ready users"
  2. "Learning sits outside the journey"
  3. "Practice removes the risk, not the complexity"
  (Each is a short form of your Benchmark Insights 01–03.)
- **Type:** Label `BENCHMARKING`.
- **VO:** "So I studied the apps people actually use. Most assumed you were already ready to invest — and learning sat outside the journey."
- **Transition →** The screenshots and logos fade back to 20% opacity. Camera continues right; the sticky notes stay and become the "quote card" style for S6.

### S6 · Listening — 0:33–0:40 (7 s)
- **Background/composition:** Split frame. **Two separate research groups, never overlapping, never one shape inside the other:**
  - Left (lighter, smaller, `#e2e5dc` disc): counter `40+` → Body "people across different levels of financial experience"
  - Right (stronger, `#006326` disc, white numeral): counter `23` → Body "focused conversations · early-career professionals, aged 21–26"
  Counters tick up over 24 frames (ease-out).
- **Character:** Stands between the two discs on the ground line, "Exploring / phone" pose, looking at the right disc.
- **Objects:** Three real quote cards (`#e2e5dc`, 24px radius) rise from the right disc, staggered:
  - "Even after managing my own money, I **still don't understand many financial terms.**"
  - "There are a lot of financial tools, overall I **don't know where to start from.**"
  - "I'm **scared of being judged** for not knowing basic terms."
- **Type:** Label `RESEARCH`.
- **VO:** "Then I listened. I spoke with over forty people — and had twenty-three focused conversations with early-career professionals, aged twenty-one to twenty-six."
- **Transition →** The quote cards drift together and sort into four columns.

### S7 · Four patterns, one need — 0:40–0:46 (6 s)
- **Background/composition:** Four columns on the ground line, each becoming one of your existing insight illustrations, cross-fading from the card cluster: `insight-depend`, `insight-figure-out`, `insight-fragments`, `insight-hesitate`, with labels `DEPEND ON OTHERS` · `FIGURE IT OUT THEMSELVES` · `MANAGE IT IN FRAGMENTS` · `HESITATE TO ASK`.
- **Character:** Here the character *is* the four illustrations, the same person in four behaviours. This is a deliberate echo: the user is plural.
- **Objects:** A single hand-drawn green line strokes beneath all four and gathers to one point at centre.
- **Type:** Statement: "Different behaviours pointed to the same underlying need:" → Display (green) "**guidance before action.**"
- **VO:** "Their habits were different. But the need was the same: guidance before action."
- **Transition →** The four illustrations exit left with the camera; the green line becomes the ground line again; the dot grid fades out (leaving the notebook). The two coins from S3 roll back into frame.

---

## ACT 3 — THE BIGGER PICTURE (0:46–0:58)

> Framed as **the landscape and the problem**, not product features. No phone appears in this act.

### S8 · Money is a stack, not a single move — 0:46–0:53 (7 s)
- **Background/composition:** Clean off-white, sage ground. Centre: the character in "Realisation / Insight" pose (lightbulb). To their left, a vertical stack builds bottom-up, each layer an object from your kit with a chip label:
  1. `Spending` (shopping bags + budget pie)
  2. `Savings` (the two returning coins grow back into a stack of 5)
  3. `Emergency fund` (coin jar)
  4. `Insurance` (shield)
  5. `Investments` (bar chart with arrow)
  Each layer lands with a soft spring, 20 frames apart. Thin hand-drawn connectors link neighbouring layers so they read as **one connected system**.
- **Character:** Lightbulb flicks on as layer 5 lands. Then a small nod.
- **Type:** Display: "Managing money" (ink) / "isn't just investing." (green). Under it, Label: `THE BIGGER PICTURE`.
- **VO:** "And managing money isn't only investing. It's spending, saving, an emergency fund, insurance — all connected."
- **Transition →** The stack holds while the camera eases slightly left to make room for type.

### S9 · The real problem — 0:53–0:58 (5 s)
- **Background/composition:** The stack recedes to 60% scale at far left and softens (desaturate 30%). Right two-thirds: the problem statement.
- **Character:** Turns from the stack toward the viewer: "Confused / Overwhelmed" pose for 1.5 s, then settles.
- **Objects:** A faint question mark ring around the stack (stroke), then it fades.
- **Type (verbatim problem statement):** Statement: "Financial products help people execute decisions, but do little to build the **understanding and confidence** needed to make those decisions independently." (accent phrase in green)
- **VO:** "Most products help you act. Very few help you understand first."
- **Transition →** **Key transformation:** the five layers slide together and compress into **three green bars**, which become the Stack Up logo mark.

---

## ACT 4 — INTRODUCING STACK UP (0:58–1:09)

### S10 · The reveal — 0:58–1:03 (5 s)
- **Background/composition:** Centre stage. The three bars settle into the real logo mark (`logo.webp`, rebuilt as vector for crispness); the wordmark "stack up" fades in beside it. Hold 1 s.
- **Character:** Steps into frame right, the "Exploring / phone" pose, looking at the logo.
- **Objects:** none besides the logo.
- **UI:** The logo shrinks and docks into place at the top of the **Welcome screen** (`app-onboarding-1`), while the phone frame draws around it (bezel stroke-on, then the screen fades up beneath the logo). The **first phone appearance of the film.**
- **Type:** Display: "Practise first." (green), 1 s, then cleared so the real screen's copy ("Finances Made Easy · Practice first with virtual money. Build confidence. Invest when ready.") speaks for itself.
- **VO:** "So I designed Stack Up — a place to practise with money before you risk it."
- **Transition →** The phone slides right; a coin stack rises on its left.

### S11 · Coin stack → Practice Wallet → phone — 1:03–1:09 (6 s)
- **Background/composition:** Phone right-of-centre. Left: a fresh coin stack (the film's motif) rises.
- **Character:** Stands between stack and phone, holding up their own phone, "Exploring" pose, then a small smile (expression swap).
- **Objects + UI (the signature transformation):**
  1. The coin stack **morphs** into the cream 3D **Practice Wallet** render (cut out of `app-onboarding-4`), 18 frames.
  2. The wallet floats into the phone, landing **exactly** where it sits on the **Meet Your Practice Wallet** screen (`app-onboarding-4`); the screen fades up around it.
  3. Swipe to **You're All Set** (`app-onboarding-5`) with its **₹25,000** balance.
- **Type:** Display beside the phone: "₹25,000" (counts up over 20 frames) / Body: "of **virtual money**. Real decisions, no real risk."
- **VO:** "You start with a Practice Wallet — twenty-five thousand rupees of virtual money. Real decisions, no real risk."
- **Transition →** Phone screen advances to the Home screen; the camera follows the phone right.

---

## ACT 5 — LEARNING THROUGH DOING (1:09–1:35)

> The real prototype order: Home → First Move → Mutual Funds → 2 questions → Finding → Best Starting Point → Choose Mutual Fund (ICICI) → compare → How to Invest → ₹5,000 → Review → Complete.

### S12 · First move — 1:09–1:15 (6 s)
- **Background/composition:** Phone centre-left; open "explainer space" on the right.
- **UI:** `app-journey-1` (Home, "First Step Starts Here", 0.8 s) → `app-journey-2` (**First Move · Mutual Funds**, Unlocked) → `app-journey-3` (**Mutual Funds** explained).
- **Objects:** The coin jar with the sprout **lifts out of the First Move card** into the world (match-cut) and lands on the ground line. Then, beside the Mutual Funds screen, **one coin splits into many small coins** that flow into small company icons (echoing the hub illustration on the real screen), the concept of a fund in one image. The screen's three chips `Beginner Friendly · Many Companies · Lower Risk` get a highlight ring in sequence.
- **Character:** Kneels beside the jar, then stands and watches the coins split, "Exploring" pose.
- **Type:** Label `ONE CONCEPT AT A TIME`.
- **VO:** "Your first move is mutual funds — explained simply, one concept at a time."
- **Transition →** The small coins regroup into a single coin, which drops behind the phone as the screen advances.

### S13 · Guided questions — 1:15–1:21 (6 s)
- **Background/composition:** Phone centre. Character left.
- **UI:** `app-journey-4` ("How do you feel about changes in your investment value?"); tap ripple on the already-selected "I prefer it to stay steady" → `app-journey-5` ("How long would you feel comfortable leaving this money invested?"), ripple on "Less than 3 years" (already-selected state in the real screen) → `app-recommendation-1` (Finding your best starting point…, 0.8 s, its real loader) → `app-recommendation-2` (**Best Starting Point: Hybrid Mutual Fund**, 1.2 s).
- **Character:** "Comparing / Deciding" pose (A/B cards), tilting head between them; settles when the result appears.
- **Objects:** A soft sage balance-dot pair floats near the phone, steady vs. moving, mirroring the question; it fades by the loader.
- **Type:** Body: "**Guided questions**, not jargon."
- **VO:** "Then a few guided questions — how you feel about change, and how long you can stay invested."
- **Transition →** The phone pans (screen swipe) to the fund selection.

### S14 · Recommendation, with reasons, and alternatives — 1:21–1:28 (7 s)
- **Background/composition:** Starts with **one phone, hero, centre**: `app-fund-selection-1`, **ICICI Prudential Balanced Advantage Fund · Your Best Match** with "Why it fits you?". Hold 2.5 s. Then two more phones fan out behind it, left and right: `app-fund-selection-2` (SBI Equity Hybrid · More Growth) and `app-fund-selection-3` (HDFC Balanced Advantage · More Stable).
- **Character:** Steps forward with the A/B cards from S13; the cards flip to show a small growth arrow (left) and a shield (right), mirroring the two alternatives. Then puts both cards down and points at the centre phone.
- **Objects:** Growth-arrow and shield icons (kit) above the side phones.
- **Highlight:** ring on "Why it fits you?" on the ICICI screen.
- **Type:** Body (left): "**Recommended** — with the reasoning." · Body (right, 1.5 s later): "**Compare** before you choose."
- **VO:** "You get a recommendation with the reasoning behind it — and you can still compare alternatives before choosing."
- **Transition →** The side phones slide back behind the hero; the hero advances to the next screen.

### S15 · The first investment — 1:28–1:35 (7 s)
- **Background/composition:** Phone right-of-centre. Left: the Practice Wallet render (from S11) and the S12 coin jar on the ground line.
- **UI (≈1.5 s each):** `app-first-investment-1` (How to Invest: One-Time / Monthly SIP) → `-2` (₹5,000 on the keypad; the number pad's digits get tap ripples 5-0-0-0) → `-3` (**Ready to Invest?** Practice Wallet → ICICI fund) → `-4` (**First Investment Complete!** Confidence **0% → 10%**).
- **Objects:** As screen 3 confirms, **one coin leaves the wallet**, arcs across, and drops into the jar. The jar's fill line rises to 10%, timed exactly with the screen's "10%".
- **Character:** "Realisation / Insight" pose (finger up, lightbulb) on the 10% beat.
- **Type:** Body: "Small, guided steps." · Chip: "₹5,000 · practice money".
- **VO:** "Your first investment happens in small, guided steps. And your confidence grows."
- **Transition →** **Match cut:** the jar on the ground and the jar in the screen align, and the camera follows the screen jar into Act 6.

---

## ACT 6 — THE DESTINATION (1:35–1:48)

### S16 · The Confidence Jar — 1:35–1:41 (6 s)
- **Background/composition:** Phone left: `app-portfolio-1` (**Your Confidence Jar**: "Reach 100% and you'll be ready to start investing with real money"). The jar from the screen (with its arrow) **lifts out** and scales into a large jar right-of-centre on the ground line.
- **Character:** "Confident / Ready" pose (arms crossed, rays) beside the big jar.
- **Objects:** Coins drop into the jar in a slow rhythm, each one labelled for 10 frames with a decision the product actually has: `Practice Wallet` · `Mutual Funds` · `Guided questions` · `Compared alternatives` · `First investment`. The fill rises from 10% **toward** 100%, holding at ~80% (the destination is implied, not claimed).
- **Type:** Display: "Confidence," (ink) / "before real money." (green).
- **VO:** "Every practice decision fills your Confidence Jar. Reach a hundred percent, and you're ready for real money."
- **Transition →** The camera pulls back and up. The jar, wallet and coin stack slide together and become three steps.

### S17 · Understand → Practise → Build Confidence — 1:41–1:48 (7 s)
- **Background/composition:** Wide. Three green steps, the logo mark's bars at landscape scale, rise on the ground line, recreating your `illustration-steps` composition. Labels stroke on: `UNDERSTAND` → `PRACTISE` → `BUILD CONFIDENCE`.
- **Character:** The `illustration-steps` pose: climbing, one step at a time, reaching the top step on the last word. The flag reads "A More Confident You" (from your illustration).
- **Objects:** none new. Everything we've met is now the steps.
- **Type (end card, after the climb):**
  - Display: "Understand money." (ink) / "Build confidence." (ink) / "Make informed decisions." (green), each settling 12 frames apart.
  - Then the logo mark + wordmark, centre, and below it: Label "A product design case study by **Pranjal Sharma**" · "pranjaldesign.vercel.app"
- **VO:** "Stack Up. Understand money. Build confidence. Make informed decisions."
- **End:** Hold the end card for 1.5 s; the ground line draws itself out right to left (a mirror of S1). Fade to `#f8f8f6`.

---

## Full voiceover script (≈265 words, ~150 wpm, first person from S4)

> Tone: natural, conversational, confident. Spoken like explaining your project to a friend in a design review, not a commercial. Short sentences, real pauses (marked ·).

| # | Time | Line |
|---|---|---|
| S1 | 0:00 | You start earning. · And for the first time, the money is yours. |
| S2 | 0:04 | Then comes shopping. EMIs. A credit card bill. Subscriptions. · And somehow, the month gets ahead of you. |
| S3 | 0:09 | How do I start managing money? · Should I save, invest, or get insurance first? |
| S4 | 0:16 | Those were my questions too. · Starting my semester project, I realised I didn't really understand money myself — and I wondered if other young earners felt the same. |
| S5 | 0:26 | So I studied the apps people actually use. Most assumed you were already ready to invest — and learning sat outside the journey. |
| S6 | 0:33 | Then I listened. I spoke with over forty people — and had twenty-three focused conversations with early-career professionals, aged twenty-one to twenty-six. |
| S7 | 0:40 | Their habits were different. · But the need was the same: guidance before action. |
| S8 | 0:46 | And managing money isn't only investing. It's spending, saving, an emergency fund, insurance — all connected. |
| S9 | 0:53 | Most products help you act. · Very few help you understand first. |
| S10 | 0:58 | So I designed Stack Up — a place to practise with money before you risk it. |
| S11 | 1:03 | You start with a Practice Wallet — twenty-five thousand rupees of virtual money. · Real decisions, no real risk. |
| S12 | 1:09 | Your first move is mutual funds — explained simply, one concept at a time. |
| S13 | 1:15 | Then a few guided questions — how you feel about change, and how long you can stay invested. |
| S14 | 1:21 | You get a recommendation with the reasoning behind it — and you can still compare alternatives before choosing. |
| S15 | 1:28 | Your first investment happens in small, guided steps. · And your confidence grows. |
| S16 | 1:35 | Every practice decision fills your Confidence Jar. · Reach a hundred percent, and you're ready for real money. |
| S17 | 1:41 | Stack Up. · Understand money. Build confidence. Make informed decisions. |

---

## Rhythm check (lead layer per scene)

| Act | Scenes | Character-led | Object-led | Type-led | Product-led |
|---|---|---|---|---|---|
| 1 Problem | S1–S3 | ●●● | ●● | ○ | — |
| 2 Journey | S4–S7 | ●● | ● | ●●● | — (benchmark screenshots only) |
| 3 Bigger picture | S8–S9 | ●● | ●●● | ●● | — |
| 4 Stack Up | S10–S11 | ● | ●●● | ● | ●● |
| 5 Doing | S12–S15 | ●● | ●● | ● | ●●● |
| 6 Destination | S16–S17 | ●●● | ●● | ●●● | ● |

The phone is on screen for ~43 s of 108 s (S10–S16), and is never alone: every product scene has the character and at least one object moving outside the screen.

---

## Asset list this storyboard needs (preview of Phase 4)

**Reuse as-is (repo):** 6 onboarding/journey screens, 4 recommendation, 3 fund-selection, 4 first-investment, `app-portfolio-1`, benchmark screenshots + logos, `logo.webp`, `insight-*` (4), `illustration-steps`, `app-phone-shadow`.
**Cut out from the uploaded kit (needs a hi-res kit or per-pose PNGs):** Working/Earning, Exploring/phone, Confused, Realisation, Comparing A/B, Confident, Thinking (hero); objects: salary card, bags, credit card, jar, shield, chart, pie, sparkle/rays/arrow.
**Cut out from screens:** Practice Wallet render (onboarding-4), sprout jar (journey-2), Confidence Jar + arrow (portfolio-1).
**Create new (vector, in the same ink style):** coin (the motif), ground line, notification chips, thought-bubble shapes, brief card, quote cards, hand-drawn arrows/underlines, the three-step bars, phone bezel.
**Rigging:** split each character pose into head / torso / arm layers for blink, breathe, tilt. Only blink-capable heads are needed; no new poses beyond the kit.

---

## Notes and decisions for you to confirm

1. **₹35,000 salary (S1)** comes from your asset kit illustration. It's illustrative only, not research data. Keep it, or show no number?
2. **"Should I save, invest or get insurance first?" (S3)** is your line, not a research quote. It's framed as the character's thought, never as a participant quote.
3. **Act 3 order (S8):** I stacked Spending → Savings → Emergency fund → Insurance → Investments, foundation-first. That's a creative reading of "connected parts", not a claim from your research. OK, or would you prefer a side-by-side arrangement with no implied order?
4. **Character as "you" in Act 2:** the same character represents both the young earner and you. The alternative is a portrait or photo moment of you; I recommend the character, because it keeps one visual system.
5. **Tap ripples and highlight rings** are the only overlays on real UI; screen content is never altered.
6. **Benchmark logos (S5)** are shown exactly as in your case study.
7. **S16 jar** stops at ~80%, so the film doesn't imply the prototype includes graduating to real money.
