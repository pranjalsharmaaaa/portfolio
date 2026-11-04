# Stack Up — Case Study Film

> **Superseded by v4 (conversational rewrite, in production).** The live narration is `film/src/narration.json`: first-person and conversational; users choose where to begin (saving, insurance or investing), with mutual funds shown as one example path; Stack Up's recommendation is a suggestion the user can change. The text below is kept for history.

## Voiceover script, version 3.1 (final words, for approval)

**Status:** ✅ approved and produced. The narration is generated (Kokoro, open-source neural TTS, run locally, because ElevenLabs is blocked in this environment) and integrated into the film. Scene lengths were re-fitted to the measured voice (`film/src/timeline.ts`); the total is still exactly 1:48.
**Length:** 1:48, unchanged. About 200 words.
**Source:** `film/src/narration.json`. Measured fit (`npm run voiceover:check`): every line ends 0.23–1.13 s before the next begins; the last word ends at 1:45.5.

**How to read it:** `/` is a natural breath or pause. **Bold** is gentle emphasis, never a punch. `…` is a held, trailing thought that hands over to the next line. Times are estimates; they're re-measured on the real voice clips once generated.

### Changes in 3.1
1. **Opening (S1–S3):** rewritten as one continuous, conversational thought: the excitement of the first salary → the essentials first → looking at what's left → *what do I do with it now?* Each line hands over to the next.
2. **Personal journey (S4):** "Those were my questions too." Your own gap in understanding is named, and that curiosity leads into the semester project.
3. **Research (S6):** the 40+ broader participants and the 23 deeper conversations with early-career professionals aged 21–26 stay two separate groups, spoken separately and shown separately.
4. **S15:** now "Your first **practice** investment", with the practice-versus-real distinction stated: *no real money at stake, but real confidence gained.*
5. **Ending:** kept exactly: *Confidence isn't given. It's built — one step at a time.*

---

## ACT 1 — The problem

**S01 · Payday — 0:00**
*On screen:* the ground line draws in; at the desk, the phone buzzes; *Salary Credited ₹35,000* rises and settles into a stack of coins.
> Your first salary lands… / and honestly? / It feels **incredible**.

**S02 · Essentials first, then what's left — 0:04.5**
*On screen:* Rent → Electricity → Groceries → Transport drop in, each taking a coin into its own stack, ticked as *Essentials covered*. The remaining coins light up as **What's left**: *Essentials covered. Now, what's left.*
> Before anything else, the **essentials**: / rent, electricity, groceries, getting to work. / Then you look at what's **left**…

**S03 · The questions — 0:12.5**
*On screen:* the character, hand on chin, with "What's left" at their feet. Bubbles: *What do I do with what's left? · How do I track everything? · Should I save, invest or get insurance first?*, condensing into one orange "?".
> And you wonder: / what do I do with it **now**?

---

## ACT 2 — My journey

**S04 · These were my questions too — 0:17.5**
*On screen:* *You earn money. But how do you manage it?*; the character (you) with a notebook; the live-brief card with "manage" underlined and *…but did I know how?*; *I realised I first needed to understand the financial ecosystem myself.*
> Those were **my** questions too. / I didn't really understand money myself, / and that **curiosity** shaped my semester project.

**S05 · Exploring the ecosystem — 0:25.5**
*On screen:* Investments · Payments · Credit Cards · Net Worth · Paper Trading; Groww, Kuvera, IND Money, Money Bhai, Frontpage; sticky notes with the three benchmark insights.
> So I explored the apps people use. / Most assumed you **already** knew how to invest.

**S06 · Listening — 0:32**
*On screen:* the light **40+** disc (*broader research, across different levels of financial experience*), then the green **23** disc (*focused conversations, early-career professionals aged 21–26*), with real quotes rising from it.
> Then I **listened**. / Over forty people, / and twenty-three **deeper** conversations with early-career professionals, / aged twenty-one to twenty-six.

**S07 · Four patterns, one need — 0:40**
*On screen:* *People weren't struggling in the same way.*, then each behaviour in focus in turn: *Depend on others → Figure it out themselves → Manage it in fragments → Hesitate to ask*, converging on **guidance before action.**
> Some relied on others. / Some figured it out alone. / Some managed in fragments. / Some never asked. / All needed **guidance** before **action**.

---

## ACT 3 — The bigger picture

**S08 · The bigger picture — 0:50.5**
*On screen:* *Managing what's left isn't just investing.* Spending · Savings · Emergency fund · Insurance · Investments, side by side, linked by one line.
> What's left isn't only for investing. / Spending, saving, emergency funds, insurance, / it's all **connected**.

**S09 · The real problem — 0:57.5**
*On screen:* the problem statement, *Financial products help people execute decisions, but do little to build the understanding and confidence…*; the five areas compress into the Stack Up bars.
> Most products help you **act**. / Few help you **understand**.

---

## ACT 4 — Introducing Stack Up

**S10 · The reveal — 1:02**
*On screen:* the Stack Up mark completes and docks into the real Welcome screen.
> That gap became **Stack Up**.

**S11 · What's left → Practice Wallet — 1:05**
*On screen:* *Learn Without Risk*; the "What's left" coins become the Practice Wallet and fly into *Meet Your Practice Wallet*; *A safe space to practise managing what's left* and *Understand · Explore · Practise*.
> Your Practice Wallet is a **safe space** / to understand, explore and practise managing what's left.

---

## ACT 5 — Learning through doing

**S12 · First move — 1:11.5**
*On screen:* *First Move* (Mutual Funds, unlocked); the sprout jar lifts out; *Mutual Funds* explained, with one coin splitting into many and *Beginner Friendly · Many Companies · Lower Risk* highlighted.
> The first move: a mutual fund, / **one idea** at a time.

**S13 · Guided questions — 1:17**
*On screen:* *How do you feel about changes in your investment value?* → *How long would you feel comfortable leaving this money invested?* → *Finding your best starting point…* → *Best Starting Point: Hybrid Mutual Fund*.
> Then, simple questions: / how you feel about **change**, / how long you'd stay **invested**.

**S14 · Recommendation, with reasons — 1:23.5**
*On screen:* *ICICI Prudential Balanced Advantage Fund · Your Best Match*, with *Why it fits you?* highlighted; then the two real alternatives (*More Growth*, *More Stable*) fan out.
> It suggests a fund, and explains **why** — / yet the choice stays **yours**.

**S15 · The first practice investment — 1:29.5**
*On screen:* *How to Invest* → ₹5,000 → *Ready to Invest?* (corrected: no balance row). The camera leans in; one coin, tagged *₹5,000 · practice money*, leaves the Practice Wallet and travels into the fund; *First Investment Complete!*; the Confidence Jar rises from 0% to 10%.
> Your first **practice** investment — / no real money at stake, / but **real** confidence gained.

*Why:* "practice" is spoken as the coin leaves the *Practice* Wallet; "real confidence gained" lands on the 0% → 10% moment. It contrasts practice money with confidence that's genuinely earned.

---

## ACT 6 — The destination

**S16 · The Confidence Jar — 1:36.5**
*On screen:* *Your Confidence Jar*; the decisions practised so far drop in; the meter rises and holds at about 80%; *Confidence, before real money.*
> Every decision fills your **Confidence Jar**, / until you're ready for real money.

**S17 · Understand → Practise → Build Confidence — 1:42**
*On screen:* the "What's left" coins return and become your steps illustration: the same character climbing *Understand → Practise → Build Confidence* towards *A More Confident You*. Then *Understand money. Build confidence. Make informed decisions.* and the end card.
> Confidence isn't **given**. / It's built — / one step at a time.

*The closing tagline then plays without voice, over music only, like a title card.*

---

## Voice and audio direction (for generation)
- **Voice:** young adult female, Indian English. Warm, articulate, conversational, confident. A thoughtful storyteller, not an advert, not dramatic.
- **Pace:** unhurried. Real pauses at every `/`; trailing `…` handovers in Act 1; Act 2 a touch more reflective; Act 5 slightly brighter.
- **Music:** the existing bed stays. It ducks to about a third of its level under the voice and returns in the pauses. This is already built.

## Scene lengths this script uses (total 1:48)

| Scene | v2 film | v3.1 | | Scene | v2 film | v3.1 |
|---|---|---|---|---|---|---|
| S01 | 4.0 | **4.5** | | S10 | 3.0 | 3.0 |
| S02 | 8.0 | 8.0 | | S11 | 8.0 | **6.5** |
| S03 | 5.0 | 5.0 | | S12 | 6.0 | **5.5** |
| S04 | 10.0 | **8.0** | | S13 | 6.5 | 6.5 |
| S05 | 6.0 | **6.5** | | S14 | 6.0 | 6.0 |
| S06 | 8.0 | 8.0 | | S15 | 7.5 | **7.0** |
| S07 | 6.0 | **10.5** | | S16 | 6.0 | **5.5** |
| S08 | 7.5 | **7.0** | | S17 | 6.0 | 6.0 |
| S09 | 4.5 | 4.5 | | | | |

S7 (the four behaviours) gains the most, so each behaviour is in focus while it's narrated. These are applied, and the animation inside each scene retimed, only after you approve the words.

## Screen correction applied: "Ready to Invest?"
The **"Remaining Balance ₹20,000 / after this investment"** row is removed from the film's copy of the screen. Everything else is preserved:
- the card now closes under *Source · Practice Wallet* with its original rounded corners and padding;
- the *Practice Money* note moves up with it;
- the space opens above the bottom-pinned Invest button, as the real layout would reflow;
- the phone frame is untouched.

This is a film-only override (`film/public/film-assets/screens/`, built reproducibly by `film/scripts/prepare-assets.py`). Your portfolio's own image and live case study are unchanged; they still show ₹20,000 and ₹25,000, if you'd like those updated too.
With this, no wallet balance figure appears anywhere in the film. The only amounts are the illustrative ₹35,000 salary and the ₹5,000 practice investment.
