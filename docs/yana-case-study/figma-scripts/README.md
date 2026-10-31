# Finishing the YANA case study in Figma

The Figma MCP connection hit the Starter-plan tool-call limit while building, so the
remaining steps are packaged as scripts you run yourself. They use the same tokens,
text styles and layout system as pages 35–38, which are already in the file.

**Runner:** install the free Figma Community plugin **Scripter**, open the case-study
file, run Plugins → Scripter, paste a script, press Run. Each script prints a report.

| Order | Script | What it does |
|---|---|---|
| 1 | `01-fix-page-38.js` | Fixes the clipped chip in Step 01 on page 38. |
| 2 | `02-build-pages-39-42.js` | Builds pages 39–42 with phone mockups sized for the original 390×846 frames. Re-runnable. |
| 3 | `03-place-original-screens.js` | After you paste the originals onto **Source screens**, places scaled copies into every phone (pages 35, 39, 40, 41) and reports scale, size and any crop. Never edits the originals. Re-runnable. |

Screens not in the YANA design file: paste them on **Source screens** and name the frames
exactly `Onboarding feeling`, `Onboarding areas`, `DASS-21 question`, `DASS-21 result`,
`Wellbeing snapshot`, then run script 3 again.
