import knexConfig from "../knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

const DEFAULT_USER_ID = 1; // Default user ID for new journal entries

// Get all journals
export const getJournals = async (req, res) => {
  try {
    console.log("Fetching all journals...");
    const journals = await db("journals").select("*");
    console.log("Fetched journals:", journals);
    res.status(200).json(journals);
  } catch (err) {
    console.error("Error fetching journals:", err.message);
    res.status(500).json({ error: `Failed to fetch journals: ${err.message}` });
  }
};

// Create a new journal entry
export const createJournal = async (req, res) => {
  const { entry_date, entry, mood, user_id } = req.body;

  // Validate required fields
  if (!entry_date || !entry || !mood) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Insert the new journal entry
    await db("journals").insert({
      entry_date,
      entry,
      mood,
      user_id: user_id || DEFAULT_USER_ID,
    });

    // Retrieve the newly created journal entry
    const newJournal = await db("journals")
      .where({ entry_date, entry, mood, user_id: user_id || DEFAULT_USER_ID })
      .first();

    res.status(201).json(newJournal);
  } catch (err) {
    console.error("Error inserting journal:", err);
    res.status(500).json({ error: "Failed to create journal entry." });
  }
};

// Update an existing journal entry
export const updateJournal = async (req, res) => {
  const { id } = req.params;
  const { entry_date, entry, mood, user_id } = req.body;

  // Validate required fields
  if (!entry_date || !entry || !mood) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if the journal exists before attempting to update
    const journalToUpdate = await db("journals").where({ id }).first();
    if (!journalToUpdate) {
      return res.status(404).json({ error: "Journal entry not found." });
    }

    // Update the journal entry
    await db("journals")
      .where({ id })
      .update({
        entry_date,
        entry,
        mood,
        user_id: user_id || DEFAULT_USER_ID,
      });

    // Retrieve the updated journal entry
    const updatedJournal = await db("journals").where({ id }).first();

    res.status(200).json(updatedJournal);
  } catch (err) {
    console.error("Error updating journal:", err);
    res.status(500).json({ error: "Failed to update journal entry." });
  }
};

// Delete a journal entry
export const deleteJournal = async (req, res) => {
  const { id } = req.params;

  try {
    const journalToDelete = await db("journals").where({ id }).first();
    if (!journalToDelete) {
      return res.status(404).json({ error: "Journal entry not found" });
    }

    // Delete the journal entry
    await db("journals").where({ id }).del();
    res.status(200).json({
      message: "Journal entry deleted successfully",
      deletedJournal: journalToDelete,
    });
  } catch (err) {
    console.error("Error deleting journal entry:", err.message);
    res
      .status(500)
      .json({ error: `Failed to delete journal entry: ${err.message}` });
  }
};
