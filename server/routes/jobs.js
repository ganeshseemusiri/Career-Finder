import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// ✅ Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// ✅ TEMP: Add sample jobs (run once)
router.post("/seed", async (req, res) => {
  try {
    await Job.deleteMany();

    const sampleJobs = [
      {
        title: "Frontend Developer",
        company: "Google",
        location: "Bangalore",
        type: "Full Time",
        experience: "0-1 years",
        salary: "6 LPA",
        description: "React developer role",
      },
      {
        title: "Backend Developer",
        company: "Amazon",
        location: "Hyderabad",
        type: "Full Time",
        experience: "1-3 years",
        salary: "8 LPA",
        description: "Node.js developer role",
      },
      {
        title: "Full Stack Developer",
        company: "Microsoft",
        location: "Remote",
        type: "Full Time",
        experience: "0-2 years",
        salary: "10 LPA",
        description: "MERN stack role",
      },
    ];

    const created = await Job.insertMany(sampleJobs);
    res.json({ message: "Jobs seeded", jobs: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Seeding failed" });
  }
});

export default router;
