// YANA case study — 01: fix page 38 (Step 01 chip clipped at the card bottom).
// Run in the case-study Figma file with the Scripter plugin (or any plugin console).
(async () => {
  const out = typeof print === "function" ? print : console.log;
  try {
    await Promise.all([["Instrument Sans", "Regular"], ["Instrument Sans", "SemiBold"], ["Instrument Sans", "Medium"], ["Instrument Serif", "Regular"]]
      .map(([family, style]) => figma.loadFontAsync({ family, style })));
    const page = figma.root.children.find(p => p.name === "YANA Case Study");
    await figma.setCurrentPageAsync(page);
    const frame = page.children.find(n => n.name === "YANA / 04 — From insights to experience");
    if (!frame) throw new Error("Page 38 frame not found");
    const steps = frame.children.filter(n => n.name.startsWith("Step "));
    for (const s of steps) { s.itemSpacing = 4; s.paddingTop = 16; }
    const s1 = steps.find(n => n.name.startsWith("Step 01"));
    const t = s1.findOne(n => n.type === "TEXT" && n.characters.startsWith("Onboarding"));
    t.characters = "Onboarding · DASS-21 · Snapshot";
    const chip = s1.findOne(n => n.name.startsWith("Chip"));
    const fits = chip.y + chip.height <= s1.height - 8;
    out(JSON.stringify({ fixed: s1.name, chipBottom: Math.round(chip.y + chip.height), cardHeight: Math.round(s1.height), fits }));
  } catch (e) { out("ERROR: " + e.message); }
})();
