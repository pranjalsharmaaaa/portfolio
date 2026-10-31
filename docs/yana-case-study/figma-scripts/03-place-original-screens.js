// YANA case study — 03: place copies of the ORIGINAL YANA frames into every phone mockup, then verify.
// 1) Paste the original frames onto the page "Source screens" (they are never edited).
// 2) Run this in the case-study Figma file with the Scripter plugin. Safe to re-run.
// Frames are matched by their original name plus a text fingerprint (two frames are both called "Jornal",
// two "Home Screen"). Screens that are not in the YANA design file are matched by the exact frame
// name you give them on "Source screens": "Onboarding feeling", "Onboarding areas", "DASS-21 question",
// "DASS-21 result", "Wellbeing snapshot".
(async () => {
  const out = typeof print === "function" ? print : console.log;
  try {
    const src = figma.root.children.find(p => p.name === "Source screens");
    const cs = figma.root.children.find(p => p.name === "YANA Case Study");
    if (!src || !cs) throw new Error("Pages 'Source screens' and 'YANA Case Study' are both required");
    await src.loadAsync(); await cs.loadAsync();

    const FINGERPRINT = {
      "1626:2488": ["Jornal", /Finding Self/], "1626:2432": ["Jornal", /Journal Calendar/],
      "1626:2323": ["share", /Feed/], "1626:1127": ["Group Therapy", /Upcoming Group Sessions/],
      "1626:1027": ["Choose a therepist", /Suggested Therapists/], "1626:1491": ["Profile", /Take Assessment/],
      "1626:1917": ["Home Screen", /Express Yourself/], "1626:899": ["Share Yourself", /Topic/],
      "1626:2080": ["Community", /Your Communities/], "1626:969": ["Choose Style", /Therapy Style/],
      "1626:1826": ["Choose therapy", /Perfect Therapist/],
    };
    const sources = src.children.filter(n => n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE");
    const textOf = n => ("findAll" in n ? n.findAll(c => c.type === "TEXT").map(c => c.characters).join(" ") : "");
    const findSource = key => {
      if (FINGERPRINT[key]) {
        const [name, re] = FINGERPRINT[key];
        return sources.find(n => n.name.trim() === name && re.test(textOf(n)));
      }
      return sources.find(n => n.name.trim().toLowerCase() === key.toLowerCase());
    };

    const slots = cs.findAll(n => n.type === "FRAME" && n.name.startsWith("Screen ← "));
    const placed = [], missing = [], problems = [];
    for (const sc of slots) {
      const raw = sc.name.replace("Screen ← ", "");
      const isMissing = raw.startsWith("MISSING: ");
      const key = isMissing ? raw.replace("MISSING: ", "") : (raw.split(" · ")[1] || raw);
      const source = findSource(key.trim());
      const pageFrame = (() => { let p = sc.parent; while (p && p.parent && p.parent.type !== "PAGE") p = p.parent; return p; })();
      const where = `${pageFrame ? pageFrame.name : "?"} / ${sc.parent.name}`;
      if (!source) { missing.push(`${where} — needs "${key}"`); continue; }

      for (const old of sc.children.filter(c => c.name.startsWith("Original ·"))) old.remove();
      const copy = source.clone();
      copy.name = `Original · ${source.name}`;
      const scale = sc.width / copy.width;
      copy.rescale(scale);
      sc.appendChild(copy); copy.x = 0; copy.y = 0;
      const label = sc.findOne(c => c.name === "Pending label"); if (label) label.visible = false;
      sc.fills = Array.isArray(copy.fills) && copy.fills.length ? JSON.parse(JSON.stringify(copy.fills)) : [];

      // Verification: proportions kept, width fills the screen, no vertical crop beyond 1pt.
      const ratioSrc = source.width / source.height, ratioCopy = copy.width / copy.height;
      const overflow = copy.height - sc.height;
      const ok = Math.abs(ratioSrc - ratioCopy) < 0.002 && Math.abs(copy.width - sc.width) < 0.5 && overflow <= 1;
      const row = { slot: where, source: source.name, scale: +scale.toFixed(4), copy: `${copy.width.toFixed(1)}×${copy.height.toFixed(1)}`, screen: `${sc.width.toFixed(1)}×${sc.height.toFixed(1)}`, verticalGap: +(-overflow).toFixed(1) };
      (ok ? placed : problems).push(row);
    }
    // Pages where a phone intentionally runs off the page edge (approved intro layout).
    const bleed = [];
    for (const f of cs.children.filter(n => n.type === "FRAME")) {
      for (const ph of f.findAll(n => n.name.startsWith("Phone / "))) {
        const t = ph.absoluteTransform, fx = f.absoluteTransform[0][2], fy = f.absoluteTransform[1][2];
        const x = t[0][2] - fx, y = t[1][2] - fy;
        const cut = Math.max(0, -y) + Math.max(0, y + ph.height - f.height) + Math.max(0, x + ph.width - f.width);
        if (cut > 0.5) bleed.push(`${f.name} / ${ph.name}: ${cut.toFixed(0)}pt runs off the page edge (layout choice)`);
      }
    }
    out(JSON.stringify({ placed: placed.length, missing, problems, bleed, details: placed }, null, 1));
  } catch (e) { out("ERROR: " + e.message + "\n" + (e.stack || "")); }
})();
