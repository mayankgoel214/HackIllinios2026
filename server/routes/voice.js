import { Router } from "express";
import { generateSpeech } from "../services/elevenlabs.js";

const router = Router();

// POST /api/voice
// Body: { text: "Report text to narrate" }
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }

    const audioBuffer = await generateSpeech(text);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length
    });

    res.send(audioBuffer);
  } catch (err) {
    console.error("Voice generation error:", err);
    res.status(500).json({ error: "Voice generation failed", details: err.message });
  }
});

export default router;
