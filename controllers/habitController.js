import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig);

// Get all habits
export const getHabits = async (req, res) => {
  try {
    const habits = await db("habits").select("*");
    res.status(200).json(habits);
  } catch (err) {
    console.error("Error fetching habits:", err);
    res.status(500).json({ error: "Failed to fetch habits" });
  }
};

// Get habit by ID
export const getHabitById = async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await db("habits").where({ id }).first();

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    res.status(200).json(habit);
  } catch (err) {
    console.error("Error fetching habit by ID:", err);
    res.status(500).json({ error: "Failed to fetch habit" });
  }
};

// Create a new habit
export const createHabit = async (req, res) => {
  const { user_id, name, frequency, progress, start_date, end_date } = req.body;

  if (!user_id || !name || !frequency || !start_date) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    const [id] = await db("habits").insert({
      user_id,
      name,
      frequency,
      progress: progress || 0, //default
      start_date,
      end_date,
    });

    const newHabit = await db("habits").where({ id }).first();
    res.status(201).json(newHabit);
  } catch (err) {
    console.error("Error creating habit:", err);
    res.status(500).json({ error: `Failed to create habit: ${err.message}` });
  }
};

//  (edit habit)
export const updateHabit = async (req, res) => {
  const { id } = req.params;
  const { name, frequency, progress, start_date, end_date } = req.body;

  // Check if the necessary fields are provided
  if (!name || !frequency || !start_date) {
    return res
      .status(400)
      .json({ error: "Name, frequency, and start date are required" });
  }

  try {
    //   habit details in the database
    const updatedRows = await db("habits")
      .where({ id })
      .update({
        name,
        frequency,
        progress: progress || 0, // Default
        start_date,
        end_date,
      });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const updatedHabit = await db("habits").where({ id }).first();
    res.status(200).json(updatedHabit); //
  } catch (err) {
    console.error("Error updating habit:", err);
    res.status(500).json({
      error: `Failed to update habit: ${err.message}`,
      details: err.message,
    });
  }
};

// Update habit progress
export const updateHabitProgress = async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;

  if (progress == null) {
    return res.status(400).json({ error: "Progress value is required" });
  }

  try {
    await db("habits").where({ id }).update({ progress });
    const updatedHabit = await db("habits").where({ id }).first();

    if (!updatedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    res.status(200).json(updatedHabit); // Return   updated habit
  } catch (err) {
    console.error("Error updating habit progress:", err);
    res.status(500).json({ error: "Failed to update habit progress" });
  }
};

// Delete
export const deleteHabit = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHabit = await db("habits").where({ id }).del();

    if (deletedHabit === 0) {
      return res.status(404).json({ error: "Habit not found" });
    }

    res.status(200).json({ message: "Habit deleted successfully" });  
  } catch (err) {
    console.error("Error deleting habit:", err);
    res.status(500).json({ error: "Failed to delete habit" });
  }
};
