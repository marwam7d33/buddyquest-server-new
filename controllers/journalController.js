import knexConfig from "../knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

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

export const createJournal = async (req, res) => {
  const { user_id, entry_date, entry, mood } = req.body;

  // Set a default user_id if not provided
  const defaultUserId = 1;
  const finalUserId = user_id || defaultUserId; // Use  provided user_id // defaultUserId

  if (!entry_date || !entry || !mood) {
    return res
      .status(400)
      .json({ error: "All fields except user_id are required" });
  }

  try {
    console.log("Creating new journal entry...");
    const [newJournal] = await db("journals")
      .insert({ user_id: finalUserId, entry_date, entry, mood })
      .returning("*");

    console.log("Created new journal entry:", newJournal);
    res.status(201).json(newJournal); // Return newly created journal entry
  } catch (err) {
    console.error("Error creating journal entry:", err.message);
    res
      .status(500)
      .json({ error: `Failed to create journal entry: ${err.message}` });
  }
};

// Update a journal entry
export const updateJournal = async (req, res) => {
  const { id } = req.params; // Journal ID from the URL
  const { entry_date, entry, mood } = req.body;

  if (!entry_date || !entry || !mood) {
    return res
      .status(400)
      .json({ error: "Entry date, entry, and mood are required" });
  }

  try {
    console.log("Updating journal entry...");
    const [updatedJournal] = await db("journals")
      .where({ id })
      .update({ entry_date, entry, mood })
      .returning("*");

    if (!updatedJournal) {
      return res.status(404).json({ error: "Journal entry not found" });
    }

    console.log("Updated journal entry:", updatedJournal);
    res.status(200).json(updatedJournal); // Return   updated journal entry
  } catch (err) {
    console.error("Error updating journal entry:", err.message);
    res
      .status(500)
      .json({ error: `Failed to update journal entry: ${err.message}` });
  }
};

// Delete a journal entry
export const deleteJournal = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Deleting journal entry...");
    const deletedJournal = await db("journals")
      .where({ id })
      .del()
      .returning("*");

    if (!deletedJournal.length) {
      return res.status(404).json({ error: "Journal entry not found" });
    }

    console.log("Deleted journal entry:", deletedJournal);
    res.status(200).json({ message: "Journal entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting journal entry:", err.message);
    res
      .status(500)
      .json({ error: `Failed to delete journal entry: ${err.message}` });
  }
};
