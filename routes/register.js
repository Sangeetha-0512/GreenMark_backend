const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Reg = require("./model/regSchema");

// Function to generate unique QR ID
function generateQrId() {
  return "QR" + Math.floor(100000 + Math.random() * 900000); // ex: QR123456
}

// POST /api/register
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await Reg.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with defaults
    const newUser = new Reg({
      name,
      email,
      password: hashedPassword,
      qrId: generateQrId(),
      noOfSaplings: 0,
      ecoCoins: 0
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        qrId: newUser.qrId,
        noOfSaplings: newUser.noOfSaplings,
        ecoCoins: newUser.ecoCoins,
        registerDate: newUser.registerDate,
          "saplings": [] 
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

module.exports = router;
