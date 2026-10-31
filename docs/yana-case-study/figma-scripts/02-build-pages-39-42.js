// YANA case study — 02: build pages 39–42 (the first step, self-reflection, finding support, reflection).
// Run in the case-study Figma file with the Scripter plugin. Safe to re-run: it replaces pages 39–42 only.
(async () => {
  const out = typeof print === "function" ? print : console.log;
  try {
    await Promise.all([["Instrument Sans", "Regular"], ["Instrument Sans", "Medium"], ["Instrument Sans", "SemiBold"], ["Instrument Serif", "Regular"], ["Instrument Serif", "Italic"]]
      .map(([family, style]) => figma.loadFontAsync({ family, style })));
    const vars = Object.fromEntries((await figma.variables.getLocalVariablesAsync("COLOR")).map(v => [v.name, v]));
    const P = n => { if (!vars[n]) throw new Error("Missing colour variable " + n); return figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", vars[n]); };
    const S = Object.fromEntries((await figma.getLocalTextStylesAsync()).map(s => [s.name, s]));
    const page = figma.root.children.find(p => p.name === "YANA Case Study");
    await figma.setCurrentPageAsync(page);

    const al = (dir, o = {}) => {
      const f = figma.createFrame(); f.layoutMode = dir; f.primaryAxisSizingMode = "AUTO"; f.counterAxisSizingMode = "AUTO"; f.fills = [];
      for (const k of ["name", "itemSpacing", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom"]) if (o[k] !== undefined) f[k] = o[k];
      return f;
    };
    async function T(parent, chars, style, color, o = {}) {
      if (!S[style]) throw new Error("Missing text style " + style);
      const t = figma.createText(); t.name = o.name || chars.slice(0, 40);
      await t.setTextStyleIdAsync(S[style].id); t.characters = chars; t.fills = [P(color)]; parent.appendChild(t);
      if (o.align) t.textAlignHorizontal = o.align;
      if (o.w) { t.resize(o.w, t.height); t.textAutoResize = "HEIGHT"; }
      if (o.fill) { t.textAutoResize = "HEIGHT"; t.layoutSizingHorizontal = "FILL"; }
      if (o.x !== undefined) t.x = o.x; if (o.y !== undefined) t.y = o.y;
      for (const a of (o.accent || [])) { const i = chars.indexOf(a.t); if (i >= 0) t.setRangeFills(i, i + a.t.length, [P(a.c)]); }
      return t;
    }
    async function pageFrame(num, title) {
      const name = `YANA / ${String(num - 34).padStart(2, "0")} — ${title}`;
      for (const old of page.children.filter(n => n.name === name)) old.remove();
      const f = figma.createFrame(); f.name = name; f.resize(842, 595); f.x = (num - 35) * 922; f.y = 0;
      f.fills = [P("bg/page")]; f.clipsContent = true;
      f.layoutGrids = [{ pattern: "COLUMNS", alignment: "STRETCH", count: 12, gutterSize: 16, offset: 40, visible: true, color: { r: 0.48, g: 0.38, b: 1, a: 0.06 } }];
      page.appendChild(f);
      await T(f, "YANA", "Portfolio/Footer", "text/body", { name: "Footer / project", x: 40, y: 555 });
      const pn = await T(f, String(num), "Portfolio/Footer", "text/body", { name: "Footer / page number" }); pn.x = 802 - pn.width; pn.y = 555;
      return f;
    }
    async function head(f, eyebrow, h1, accent, intro, w) {
      await T(f, eyebrow, "Portfolio/Section eyebrow", "text/muted", { name: "Section eyebrow", x: 40, y: 40 });
      await T(f, h1, "Portfolio/Headline", "text/primary", { name: "Headline", x: 40, y: 60.7, accent: [{ t: accent, c: "accent/portfolio-blue" }] });
      if (intro) await T(f, intro, "Portfolio/Intro", "text/statement", { name: "Intro", x: 40, y: 114, w: w || 640 });
    }
    function card(parent, { x, y, w, h, name, pad = 16, gap = 6 }) {
      const c = al("VERTICAL", { name, itemSpacing: gap, paddingLeft: pad, paddingRight: pad, paddingTop: pad, paddingBottom: pad });
      c.fills = [P("surface/card")]; c.cornerRadius = 12;
      c.effects = [{ type: "DROP_SHADOW", color: { r: 0.24, g: 0.2, b: 0.12, a: 0.06 }, offset: { x: 0, y: 4 }, radius: 16, spread: 0, visible: true, blendMode: "NORMAL" }];
      parent.appendChild(c); c.x = x; c.y = y; c.resize(w, h || 40);
      c.counterAxisSizingMode = "FIXED"; c.primaryAxisSizingMode = h ? "FIXED" : "AUTO";
      return c;
    }
    function hairline(parent, { x, y, w, h = 0.75 }) {
      const r = figma.createRectangle(); r.name = "Hairline"; r.resize(w, h); r.fills = [P("line/hairline")]; parent.appendChild(r); r.x = x; r.y = y; return r;
    }
    // Phone mockup sized for the original 390 x 846 frames. Screen slots are filled by script 03.
    async function phone(f, { x, y, w, label, src, missing }) {
      const b = w * 7 / 162, iw = w - 2 * b, ih = iw * 846 / 390, h = ih + 2 * b;
      const g = figma.createFrame(); g.name = `Phone / ${label}`; g.fills = []; g.clipsContent = false; g.resize(w, h); f.appendChild(g); g.x = x; g.y = y;
      const bz = figma.createRectangle(); bz.name = "Bezel"; bz.resize(w, h); bz.cornerRadius = w * 0.165; bz.fills = [P("device/bezel")]; g.appendChild(bz);
      const sc = figma.createFrame(); sc.name = missing ? `Screen ← MISSING: ${src}` : `Screen ← ${src}`; sc.resize(iw, ih); sc.x = b; sc.y = b;
      sc.cornerRadius = w * 0.165 - b; sc.clipsContent = true; sc.fills = [P(missing ? "accent/yana-purple-tint" : "surface/placeholder")]; g.appendChild(sc);
      const t = figma.createText(); await t.setTextStyleIdAsync(S["Portfolio/Caption"].id);
      t.characters = (missing ? "Original screen needed\n" : "Original screen\n") + src; t.fills = [P(missing ? "accent/yana-purple-deep" : "text/muted")];
      t.textAlignHorizontal = "CENTER"; t.name = "Pending label"; sc.appendChild(t); t.resize(iw - 12, t.height); t.textAutoResize = "HEIGHT"; t.x = 6; t.y = (ih - t.height) / 2;
      const isl = figma.createRectangle(); isl.name = "Dynamic island"; isl.resize(iw * 0.3, iw * 0.085); isl.cornerRadius = 20;
      isl.x = (w - iw * 0.3) / 2; isl.y = b + iw * 0.035; isl.fills = [P("device/bezel")]; g.appendChild(isl);
      return { g, h };
    }
    async function caption(f, { x, y, w, title, body }) {
      const g = al("VERTICAL", { name: `Caption / ${title}`, itemSpacing: 3 }); f.appendChild(g); g.x = x; g.y = y;
      g.resize(w, 10); g.counterAxisSizingMode = "FIXED"; g.primaryAxisSizingMode = "AUTO";
      await T(g, title, "Portfolio/Caption title", "text/primary", { fill: true, align: "CENTER" });
      await T(g, body, "Portfolio/Caption", "text/body", { fill: true, align: "CENTER" });
      return g;
    }
    async function phoneRow(f, { y, w, xs, items }) {
      let maxBottom = 0;
      for (const [i, it] of items.entries()) {
        const { h } = await phone(f, { x: xs[i], y, w, label: it.label, src: it.src, missing: it.missing });
        const c = await caption(f, { x: xs[i], y: y + h + 12, w, title: it.title, body: it.body });
        maxBottom = Math.max(maxBottom, c.y + c.height);
      }
      return maxBottom;
    }
    const report = {};

    // ---------- Page 39 — The first step ----------
    {
      const f = await pageFrame(39, "The first step");
      await head(f, "The first step", "A gentle check-in before any advice", "before any advice",
        "Onboarding asks how people feel and what they want help with, then offers the DASS-21, a validated self-report scale. It can be skipped or retaken later, and is framed as reflection, not diagnosis.", 720);
      const notes = [["Validated", "DASS-21 is a standard 21-item self-report scale developed at UNSW Sydney."],
        ["Private and optional", "The flow tells people their responses are private. They can skip straight to Home."],
        ["Reflection, not diagnosis", "Scores guide self-help and therapy suggestions. They don’t label a condition."]];
      for (const [i, [t, b]] of notes.entries()) {
        const g = al("VERTICAL", { name: `Principle / ${t}`, itemSpacing: 3 }); f.appendChild(g); g.x = 40 + i * 254; g.y = 166;
        g.resize(238, 10); g.counterAxisSizingMode = "FIXED"; g.primaryAxisSizingMode = "AUTO";
        await T(g, t, "Portfolio/Caption title", "accent/yana-purple", { fill: true });
        await T(g, b, "Portfolio/Caption", "text/body", { fill: true });
      }
      hairline(f, { x: 40, y: 214, w: 762 });
      const w = 108, gap = (762 - 5 * w) / 4, xs = [0, 1, 2, 3, 4].map(i => 40 + i * (w + gap));
      report.p39 = await phoneRow(f, { y: 230, w, xs, items: [
        { label: "Onboarding feeling", src: "Onboarding feeling", missing: true, title: "Check in", body: "“How have you been feeling lately?” More than one feeling can be chosen." },
        { label: "Onboarding areas", src: "Onboarding areas", missing: true, title: "Choose a focus", body: "Anxiety, stress, sleep, self-esteem and more." },
        { label: "DASS-21 question", src: "DASS-21 question", missing: true, title: "Answer the DASS-21", body: "21 short statements on depression, anxiety and stress." },
        { label: "DASS-21 result", src: "DASS-21 result", missing: true, title: "See a snapshot", body: "Results as a starting point for suggestions, not a label." },
        { label: "Profile", src: "Profile · 1626:1491", title: "Retake anytime", body: "Profile → Mental Wellbeing → Take Assessment." }] });
    }

    // ---------- Page 40 — Self-reflection ----------
    {
      const f = await pageFrame(40, "Self-reflection");
      await head(f, "Self-reflection", "A private space to notice patterns", "to notice patterns",
        "Most people start alone. YANA lets them write, draw and look back privately; sharing with others is always a separate, deliberate step.", 640);
      const w = 136, gap = (762 - 4 * w) / 3, xs = [0, 1, 2, 3].map(i => 40 + i * (w + gap));
      report.p40 = await phoneRow(f, { y: 166, w, xs, items: [
        { label: "Home · Share your thought", src: "Home Screen · 1626:1917", title: "Express first", body: "Draw or write what’s on your mind. Posting is a separate choice." },
        { label: "Share yourself", src: "Share Yourself · 1626:899", title: "Start from a topic", body: "A topic field with suggestions eases the blank page, added after testing." },
        { label: "Journal calendar", src: "Jornal · 1626:2432", title: "Look back", body: "Short daily notes make patterns easier to see." },
        { label: "Wellbeing snapshot", src: "Wellbeing snapshot", missing: true, title: "Progress, not scores", body: "A weekly view of entries, minis watched and mood trend." }] });
    }

    // ---------- Page 41 — Finding support ----------
    {
      const f = await pageFrame(41, "Finding support");
      await head(f, "Finding support", "Support at the level you’re ready for", "you’re ready for",
        "When self-reflection isn’t enough, YANA offers two routes: peers and professionals. Each screen shows cost, time and commitment before asking anything of the user.", 640);
      const w = 112, xs = [40, 178, 368, 506, 644];
      await T(f, "Peers", "Portfolio/Label", "accent/yana-purple", { name: "Group / Peers", x: 40, y: 166 });
      hairline(f, { x: 40, y: 180, w: 250 });
      await T(f, "Professionals", "Portfolio/Label", "accent/yana-purple", { name: "Group / Professionals", x: 368, y: 166 });
      hairline(f, { x: 368, y: 180, w: 388 });
      report.p41 = await phoneRow(f, { y: 194, w, xs, items: [
        { label: "Community", src: "Community · 1626:2080", title: "Find your people", body: "Communities by concern: anxiety, depression, LGBTQ+ support, awareness." },
        { label: "Group therapy", src: "Group Therapy · 1626:1127", title: "Small, therapist-led groups", body: "Up to 5 seats, ₹150–200 per person. Host, time and seats shown upfront." },
        { label: "Therapy style", src: "Choose Style · 1626:969", title: "Choose the setting", body: "One-on-one or group, before any matching." },
        { label: "Therapist preferences", src: "Choose therapy · 1626:1826", title: "Set preferences", body: "Concerns, gender, experience, price and approach." },
        { label: "Suggested therapists", src: "Choose a therepist · 1626:1027", title: "Meet your match", body: "Specialty and experience shown. First 10 minutes free, then ₹25–50/min." }] });
    }

    // ---------- Page 42 — Reflection ----------
    {
      const f = await pageFrame(42, "Reflection");
      await head(f, "Reflection", "What YANA taught me", "taught me",
        "YANA began as a question about access. It became a lesson in sequencing: support matters less if the first step doesn’t feel safe.", 600);
      const cols = [
        ["What I learned", [["Access is an experience problem", "The order and visibility of each step mattered as much as price."], ["Words carry weight", "In testing, wording that implied commitment made people hesitate."], ["Structure supports reflection", "A prompt can feel lighter than a blank page."]]],
        ["Limitations", [["Evidence base", "Mostly secondary research and a 50-response survey; the personas are composites."], ["Qualitative testing", "About 24 participants. I didn’t measure outcomes or long-term use."], ["No crisis pathway", "The flow doesn’t yet route people in acute distress to helplines such as Tele MANAS."], ["Clinical review", "Use of DASS-21 and therapist vetting need review by licensed professionals."]]],
        ["What I’d do next", [["Add a visible crisis route", "A helpline entry point on every screen."], ["Close the testing loop", "Ship softer group-joining language, then re-test."], ["Design for trust", "Therapist verification and community moderation."], ["Reach beyond cities", "Test with people in smaller towns and in regional languages."]]]];
      const cw = (762 - 2 * 14) / 3; let maxBottom = 0;
      for (const [i, [title, items]] of cols.entries()) {
        const c = card(f, { x: 40 + i * (cw + 14), y: 166, w: cw, h: 298, name: `Reflection / ${title}`, gap: 12, pad: 18 });
        await T(c, title, "Portfolio/Card title", "text/primary", { fill: true });
        for (const [j, [h, b]] of items.entries()) {
          const row = al("HORIZONTAL", { name: `Item / ${h}`, itemSpacing: 8 }); c.appendChild(row); row.layoutSizingHorizontal = "FILL";
          await T(row, String(j + 1).padStart(2, "0"), "Portfolio/Label", "accent/yana-purple");
          const col = al("VERTICAL", { name: "Text", itemSpacing: 2 }); row.appendChild(col); col.layoutSizingHorizontal = "FILL";
          await T(col, h, "Portfolio/Card emphasis", "text/primary", { fill: true });
          await T(col, b, "Portfolio/Card body", "text/body", { fill: true });
        }
        const last = c.children[c.children.length - 1];
        maxBottom = Math.max(maxBottom, last.y + last.height + 18);
      }
      await T(f, "Designing for mental wellbeing is less about adding features than about making the next step feel safe.", "Portfolio/Quote", "accent/portfolio-blue", { name: "Closing thought", x: 40, y: 486, w: 640 });
      report.p42ContentHeightInCards = Math.round(maxBottom) + " / 298";
    }

    for (const k of Object.keys(report)) if (typeof report[k] === "number") report[k] = "captions end at y=" + Math.round(report[k]) + " (footer at 555)";
    out(JSON.stringify({ built: ["39", "40", "41", "42"], report }, null, 1));
  } catch (e) { out("ERROR: " + e.message + "\n" + (e.stack || "")); }
})();
