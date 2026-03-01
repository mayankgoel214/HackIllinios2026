import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Supermemory from "supermemory";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const client = new Supermemory({ apiKey: process.env.SUPERMEMORY_API_KEY });

const SEED_DATA = [
  // PIPE-001 — 3 past inspections showing degradation over time
  {
    containerTag: "PIPE-001",
    content: `Inspection of equipment PIPE-001 on 2025-12-15T09:00:00Z.
Overall Severity: Low.
Summary: Routine inspection of industrial pipe section B-7. Minor surface oxidation observed on exterior. No structural concerns.
Findings: Surface oxidation (Low): Light rust forming on exterior surface near joint connections, cosmetic only; Minor paint wear (Low): Protective coating showing early signs of weathering on south-facing side.
Recommendations: Monitor oxidation in next quarterly inspection; Schedule repainting within 6 months.`,
    metadata: {
      type: "inspection",
      equipmentId: "PIPE-001",
      date: "2025-12-15T09:00:00Z",
      severity: "Low",
    },
  },
  {
    containerTag: "PIPE-001",
    content: `Inspection of equipment PIPE-001 on 2026-01-20T14:30:00Z.
Overall Severity: Medium.
Summary: Follow-up inspection reveals oxidation has progressed beyond cosmetic stage. Pitting corrosion beginning to form at weld joints. Protective coating failure expanding.
Findings: Pitting corrosion (Medium): Early-stage pitting corrosion detected at two weld joint locations, penetration depth approximately 0.5mm; Coating failure (Medium): Protective paint has failed across 30% of the south-facing surface, exposing bare metal; Joint seal degradation (Low): Gasket material at flange connection showing early hardening.
Recommendations: Schedule corrosion treatment within 30 days; Apply rust inhibitor to exposed areas immediately; Order replacement gasket for flange connection; Increase inspection frequency to bi-weekly.`,
    metadata: {
      type: "inspection",
      equipmentId: "PIPE-001",
      date: "2026-01-20T14:30:00Z",
      severity: "Medium",
    },
  },
  {
    containerTag: "PIPE-001",
    content: `Inspection of equipment PIPE-001 on 2026-02-10T11:00:00Z.
Overall Severity: High.
Summary: Corrosion has significantly worsened since last inspection. Pitting depth has doubled. Structural integrity concerns emerging. Previous recommendations were not fully acted upon.
Findings: Advanced pitting corrosion (High): Pitting corrosion at weld joints has deepened to approximately 1.2mm, now affecting structural wall thickness; Widespread rust (Medium): Surface rust now covers 60% of exterior, with active flaking in multiple areas; Coating completely failed (High): Protective coating is non-functional across most of the pipe section; Potential leak risk (High): Wall thinning near joint B-7-3 approaching minimum safe thickness threshold.
Recommendations: URGENT: Schedule pipe section replacement or professional repair within 14 days; Install temporary corrosion wrap as stopgap measure; Pressure test to verify structural integrity; Escalate to maintenance supervisor for priority scheduling.`,
    metadata: {
      type: "inspection",
      equipmentId: "PIPE-001",
      date: "2026-02-10T11:00:00Z",
      severity: "High",
    },
  },

  // CAT-EXC-001 — Hydraulic Excavator with 2 past inspections
  {
    containerTag: "CAT-EXC-001",
    content: `Inspection of equipment CAT-EXC-001 on 2026-01-05T08:00:00Z.
Overall Severity: Low.
Summary: Caterpillar 320 Hydraulic Excavator in good working condition. Normal wear consistent with 2,400 operating hours. Minor hydraulic line seepage noted.
Findings: Minor hydraulic seepage (Low): Small amount of hydraulic fluid weeping at boom cylinder fitting, not dripping; Track pad wear (Low): Left track pads worn to approximately 60% remaining life; Bucket teeth wear (Low): Two of five bucket teeth showing moderate wear, still functional.
Recommendations: Monitor hydraulic fitting at next 250-hour service; Plan track pad replacement at next major service window; Rotate bucket teeth positions to even out wear.`,
    metadata: {
      type: "inspection",
      equipmentId: "CAT-EXC-001",
      date: "2026-01-05T08:00:00Z",
      severity: "Low",
    },
  },
  {
    containerTag: "CAT-EXC-001",
    content: `Inspection of equipment CAT-EXC-001 on 2026-02-15T10:00:00Z.
Overall Severity: Medium.
Summary: Hydraulic seepage has worsened to an active drip. Track tension has loosened. One bucket tooth is cracked and needs replacement. Machine still operational but maintenance overdue.
Findings: Hydraulic leak (Medium): Boom cylinder fitting now actively dripping, approximately 100ml per operating hour lost; Track tension (Medium): Left track running loose, risk of throwing track under lateral load; Cracked bucket tooth (Medium): Tooth #3 has a visible crack at the base, risk of breaking during operation; Undercarriage debris (Low): Packed mud and debris in undercarriage reducing track roller efficiency.
Recommendations: Replace boom cylinder fitting seal before next shift; Adjust left track tension to specification; Replace cracked bucket tooth #3 immediately; Power wash undercarriage to clear packed debris.`,
    metadata: {
      type: "inspection",
      equipmentId: "CAT-EXC-001",
      date: "2026-02-15T10:00:00Z",
      severity: "Medium",
    },
  },

  // CAT-BLD-002 — Bulldozer with 1 past inspection
  {
    containerTag: "CAT-BLD-002",
    content: `Inspection of equipment CAT-BLD-002 on 2026-02-01T13:00:00Z.
Overall Severity: Low.
Summary: D6 Bulldozer in excellent condition. Recently serviced at 1,800 hours. All systems operational. Minor cosmetic damage only.
Findings: Cab glass scratch (Low): Small scratch on right side cab window, does not impair visibility; Blade edge wear (Low): Cutting edge worn to 70% remaining life, consistent with hours; Paint chips (Low): Several paint chips on left fender from debris impact.
Recommendations: No urgent action required; Plan blade edge replacement at 2,500 hours; Touch up paint chips to prevent rust formation.`,
    metadata: {
      type: "inspection",
      equipmentId: "CAT-BLD-002",
      date: "2026-02-01T13:00:00Z",
      severity: "Low",
    },
  },
];

async function seed() {
  console.log("Seeding Supermemory with demo inspection data...\n");

  for (const entry of SEED_DATA) {
    try {
      // Store in equipment-specific container
      await client.add({
        content: entry.content,
        containerTag: entry.containerTag,
        metadata: entry.metadata,
      });

      // Also store in global container
      await client.add({
        content: entry.content,
        containerTag: "all-inspections",
        metadata: entry.metadata,
      });

      console.log(
        `  ✓ ${entry.metadata.equipmentId} — ${entry.metadata.date.slice(0, 10)} — ${entry.metadata.severity}`
      );
    } catch (err) {
      console.error(`  ✗ ${entry.metadata.equipmentId} — ${err.message}`);
    }
  }

  console.log("\nDone! Seeded data:");
  console.log("  PIPE-001:     3 inspections (Low → Medium → High) — shows degradation");
  console.log("  CAT-EXC-001:  2 inspections (Low → Medium) — hydraulic issue worsening");
  console.log("  CAT-BLD-002:  1 inspection (Low) — good condition baseline");
  console.log("\nNow when you inspect PIPE-001, the AI will see the full corrosion history.");
}

seed();
