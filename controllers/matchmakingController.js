import knexConfig from "../knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

// Get all matchmaking pairs
export const getMatchmakingPairs = async (req, res) => {
  try {
    console.log("Fetching all matchmaking pairs...");
    const matchmakingPairs = await db("matchmaking").select("*");
    console.log("Fetched matchmaking pairs:", matchmakingPairs);
    res.status(200).json(matchmakingPairs); // Return the fetched matchmaking pairs
  } catch (err) {
    console.error("Error fetching matchmaking pairs:", err.message);
    res
      .status(500)
      .json({ error: `Failed to fetch matchmaking pairs: ${err.message}` });
  }
};

// Create a new matchmaking pair
export const createMatchmakingPair = async (req, res) => {
  const { habit_id, user_id, partner_id } = req.body;

   if (!habit_id || !user_id || !partner_id) {
    return res.status(400).json({
      error: "All fields (habit_id, user_id, partner_id) are required",
    });
  }

  try {
    console.log("Creating new matchmaking pair...");
    const [newPair] = await db("matchmaking")
      .insert({ habit_id, user_id, partner_id })
      .returning("*");

    console.log("Created new matchmaking pair:", newPair);
    res.status(201).json(newPair); // Return newly created matchmaking pair
  } catch (err) {
    console.error("Error creating matchmaking pair:", err.message);
    res
      .status(500)
      .json({ error: `Failed to create matchmaking pair: ${err.message}` });
  }
};
