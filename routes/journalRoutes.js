import express from "express";
import {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js"; // Add update and delete methods

const router = express.Router();

// Route to get all journals
router.get("/", getJournals);

// Route to create a new journal
router.post("/", createJournal);

// Route to update an existing journal (using journal id)
router.put("/:id", updateJournal); // PUT for updating a journal entry

// Route to delete a journal (using journal id)
router.delete("/:id", deleteJournal); // DELETE for deleting a journal entry

export default router;
