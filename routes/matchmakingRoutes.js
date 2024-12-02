import express from "express";
import {
  getMatchmakingPairs,
  createMatchmakingPair,
} from "../controllers/matchmakingController.js";

const router = express.Router();

router.get("/", getMatchmakingPairs); // Get all matchmaking pairs
router.post("/", createMatchmakingPair); // Create new matchmaking pair

export default router;
