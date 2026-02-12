import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/me", authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    const { skills, experience, bio } = req.body;

    if (skills !== undefined) req.user.skills = skills;
    if (experience !== undefined) req.user.experience = experience;
    if (bio !== undefined) req.user.bio = bio;

    if (req.file) {
     
      if (req.user.resume) {
        const oldPath = path.join(process.cwd(), req.user.resume);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      req.user.resume = "/uploads/" + req.file.filename;
    }

    await req.user.save();
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});


router.post("/resume", authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    if (req.user.resume) {
      const oldPath = path.join(process.cwd(), req.user.resume);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    req.user.resume = "/uploads/" + req.file.filename;
    await req.user.save();

    res.json({
      message: "Resume updated successfully",
      resume: req.user.resume,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update resume" });
  }
});


router.delete("/resume", authMiddleware, async (req, res) => {
  try {
    if (!req.user.resume) {
      return res.status(400).json({ message: "No resume to delete" });
    }

    const filePath = path.join(process.cwd(), req.user.resume);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    req.user.resume = "";
    await req.user.save();

    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete resume" });
  }
});

export default router;
