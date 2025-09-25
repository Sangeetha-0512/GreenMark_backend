const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./model/usercreateaccount"); // ✅ correct path (model is inside routes/)

const router = express.Router();

// POST /api/register
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📩 Incoming data:", req.body);

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, password: hash });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("❌ Error saving user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
