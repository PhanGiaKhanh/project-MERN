const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username);
  console.log(password);
  // Simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Username already",
      });
    }

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/login
// @desc Register user
// @access Public
router.post("/login", async (req, res) => {});
module.exports = router;
