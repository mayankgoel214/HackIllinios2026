import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import multer from "multer";

import inspectRouter from "./routes/inspect.js";
import historyRouter from "./routes/history.js";
import equipmentRouter from "./routes/equipment.js";
import voiceRouter from "./routes/voice.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Multer — stores uploaded images in memory as buffers
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/inspect", upload.single("image"), inspectRouter);
app.use("/api/history", historyRouter);
app.use("/api/equipment", equipmentRouter);
app.use("/api/voice", voiceRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`FieldSense server running on http://localhost:${PORT}`);
});
