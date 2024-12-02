import express from "express";
import passport from "passport";
import session from "express-session";
import habitRoutes from "./routes/habitRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import matchmakingRoutes from "./routes/matchmakingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import "dotenv/config";

// Passport configuration (local and Google strategies)
import "./config/passport.js";

const app = express();

const { PORT, BACKEND_URL, CORS_ORIGIN, SESSION_SECRET } = process.env;

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// Session setup (  for passport)
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session()); // Manage user sessions

// Routes
app.use("/habits", habitRoutes);
app.use("/journals", journalRoutes);
app.use("/matchmaking", matchmakingRoutes);

// Auth routes (signup, login, Google auth)
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${BACKEND_URL}:${PORT}`);
});
