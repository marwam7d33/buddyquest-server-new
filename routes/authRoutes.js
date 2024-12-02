import express from "express";
import bcrypt from "bcryptjs";
import passport from "../config/passport.js";

const router = express.Router();
const { CORS_ORIGIN } = process.env;
let users = []; //   in-memory array for user data (//move to DB)

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the users array
  users.push({ username, password: hashedPassword });

  return res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res, next) => {
  console.log("Received request body:", req.body); //debugging

  const { username, password } = req.body;

  console.log("Login attempt:", { username, password }); // Debugging

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      console.log("Invalid credentials - User not found or password incorrect"); // Debugging
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      console.log("Login successful:", user); // Debugging
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

// Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${CORS_ORIGIN}`);
  }
);

// Profile route (GET user profile)
router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "User not logged in" });
  }

  return res.status(200).json({ profile: req.user });
});

// Logout route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    return res.status(200).json({ message: "Logout successful" });
  });
});

export default router;
