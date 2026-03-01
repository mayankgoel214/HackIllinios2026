import { Router } from "express";
import { analyzeImage, generateReport } from "../services/openai.js";
import { storeInspection, buildHistoricalContext } from "../services/supermemory.js";
import { bufferToBase64 } from "../utils/imageUtils.js";

const router = Router();

// POST /api/inspect
// Accepts multipart form: image file + equipmentId + equipmentType
router.post("/", async (req, res) => {
  try {
    const { equipmentId, equipmentType } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    if (!equipmentId) {
      return res.status(400).json({ error: "equipmentId is required" });
    }

    // Convert uploaded image to base64
    const imageBase64 = bufferToBase64(req.file.buffer);

    // Get historical context from Supermemory
    let historicalContext = null;
    try {
      historicalContext = await buildHistoricalContext(equipmentId);
    } catch (err) {
      console.warn("Supermemory history fetch failed, continuing without history:", err.message);
    }

    // Analyze with OpenAI Vision
    const analysis = await analyzeImage(imageBase64, equipmentType, historicalContext);

    // Generate narration-friendly report
    const reportText = await generateReport(analysis, equipmentId, equipmentType, historicalContext);

    // Store inspection in Supermemory
    try {
      await storeInspection(equipmentId, analysis);
    } catch (err) {
      console.warn("Supermemory store failed, continuing:", err.message);
    }

    res.json({
      success: true,
      equipmentId,
      equipmentType: equipmentType || "General Equipment",
      analysis,
      reportText,
      inspectedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error("Inspection error:", err);
    res.status(500).json({ error: "Inspection failed", details: err.message });
  }
});

export default router;
