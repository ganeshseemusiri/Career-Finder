import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});


router.put("/me", authMiddleware, async (req, res) => {
  try {
    const { name, skills, experience, bio } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.skills = skills || user.skills;
    user.experience = experience || user.experience;
    user.bio = bio || user.bio;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});

export default router;
