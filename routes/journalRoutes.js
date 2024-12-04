import express from "express";
import {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";

const router = express.Router();

// Route to get all journals
router.get("/", getJournals);

// Route to create a new journal
router.post("/", createJournal);

// Route to update a journal
router.put("/:id", updateJournal);

// Route to delete a journal
router.delete("/:id", deleteJournal);

export default router;
