import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

let users = []; //   in-memory array for user data

// User creation function with hashed password
const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  users.push({ username, password: hashedPassword }); // Save user
};

// tester//  test user for login
addUser("testuser", "password123").then(() => {
  console.log("Test user added");
});

// Local authentication strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = users.find((user) => user.username === username);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  })
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      // perform database lookups // user creation  
      let user = users.find((user) => user.googleId === profile.id);

      if (!user) {
        user = {
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        };
        users.push(user); // Save user
      }

      return done(null, user); //
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id || user.username);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id || user.username === id);
  done(null, user);
});

export default passport;



















//TODO //Fixes 
//1) change from in memory to DB for user data 
//2) Issue with /login (new user created only tester working)   /profile not loading 
//3) 