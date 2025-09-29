const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Reg = require("./model/regSchema");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// POST /api/login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await Reg.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      profile: {
        name: user.name,
        email: user.email,
        qrId: user.qrId,
        noOfSaplings: user.noOfSaplings,
        ecoCoins: user.ecoCoins,
         registerDate: user.registerDate
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

module.exports = router;
