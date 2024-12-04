// import express from "express";
// import passport from "passport";
// import session from "express-session";
// import habitRoutes from "./routes/habitRoutes.js";
// import journalRoutes from "./routes/journalRoutes.js";
// import matchmakingRoutes from "./routes/matchmakingRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import cors from "cors";
// import "dotenv/config";

// // Passport configuration (local and Google strategies)
// import "./config/passport.js";

// const app = express();

// const { PORT, BACKEND_URL, CORS_ORIGIN, SESSION_SECRET } = process.env;

// app.use(
//   cors({
//     origin: CORS_ORIGIN,
//     credentials: true,
//   })
// );
// app.use(express.json());

// // Session setup (  for passport)
// app.use(
//   session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // Passport initialization
// app.use(passport.initialize());
// app.use(passport.session()); // Manage user sessions

// // Routes
// app.use("/habits", habitRoutes);
// app.use("/journals", journalRoutes);
// app.use("/matchmaking", matchmakingRoutes);

// // Auth routes (signup, login, Google auth)
// app.use("/auth", authRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on ${BACKEND_URL}:${PORT}`);
// });
import express from "express";
import http from "http"; // For creating an HTTP server
import { Server } from "socket.io"; // Importing Socket.IO
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
const server = http.createServer(app); // Create an HTTP server for Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN, // CORS configuration for Socket.IO
    credentials: true,
  },
});

const { PORT, BACKEND_URL, CORS_ORIGIN, SESSION_SECRET } = process.env;

// CORS configuration for the Express app
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// Session setup (for Passport)
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

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Example: Listen for habit updates
  socket.on("habitUpdated", (data) => {
    console.log("Habit updated:", data);

    // Broadcast the updated habit to other users
    socket.broadcast.emit("habitUpdated", data);
  });

  // Example: Notify when matchmaking happens
  socket.on("newMatch", (matchData) => {
    console.log("New match created:", matchData);

    // Broadcast the new match to all users
    io.emit("newMatch", matchData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on ${BACKEND_URL}:${PORT}`);
});
