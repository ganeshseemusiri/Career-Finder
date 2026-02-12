import express from "express";
import Application from "../models/Application.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get my applications
router.get("/", authMiddleware, async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user._id }).populate("job");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

// Apply to a job with resume URL
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;

    if (!resumeUrl) {
      return res.status(400).json({ message: "Resume URL is required" });
    }

    const app = await Application.create({
      user: req.user._id,
      job: jobId,
      resume: resumeUrl,
    });

    res.status(201).json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to apply" });
  }
});

export default router;
