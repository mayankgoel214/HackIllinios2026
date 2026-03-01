import { Router } from "express";
import { getInspectionHistory, searchAllInspections } from "../services/supermemory.js";

const router = Router();

// GET /api/history/:equipmentId
router.get("/:equipmentId", async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const history = await getInspectionHistory(equipmentId);

    res.json({
      success: true,
      equipmentId,
      results: history.results || [],
      total: history.total || 0
    });
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({ error: "Failed to fetch history", details: err.message });
  }
});

// GET /api/history — search across all inspections
router.get("/", async (req, res) => {
  try {
    const query = req.query.q || "recent inspections";
    const results = await searchAllInspections(query);

    res.json({
      success: true,
      results: results.results || [],
      total: results.total || 0
    });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed", details: err.message });
  }
});

export default router;
