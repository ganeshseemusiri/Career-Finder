import express from "express";
import Application from "../models/Application.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user._id }).populate("job");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

router.post(
  "/",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      const { jobId } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Resume file is required" });
      }

      const app = await Application.create({
        user: req.user._id,
        job: jobId,
        resume: req.file.path, 
      });

      res.status(201).json(app);
    } catch (err) {
      res.status(500).json({ message: "Failed to apply" });
    }
  }
);

export default router;
