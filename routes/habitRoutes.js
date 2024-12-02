import express from "express";

import {
  getHabits,
  getHabitById,
  createHabit,
  updateHabitProgress,
  deleteHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.get("/", getHabits); // Get all habits
router.get("/:id", getHabitById); // Get habit by ID
router.post("/", createHabit); // Create new habit
router.put("/:id", updateHabitProgress); // Update habit progress
router.delete("/:id", deleteHabit); // Delete habit

export default router;
