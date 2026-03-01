import { Router } from "express";
import { getEquipmentProfile } from "../services/supermemory.js";

const router = Router();

// GET /api/equipment/:equipmentId
router.get("/:equipmentId", async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const profileData = await getEquipmentProfile(equipmentId);

    res.json({
      success: true,
      equipmentId,
      profile: profileData.profile || { static: [], dynamic: [] },
      searchResults: profileData.searchResults || { results: [] }
    });
  } catch (err) {
    console.error("Equipment profile error:", err);
    res.status(500).json({ error: "Failed to fetch equipment profile", details: err.message });
  }
});

export default router;
