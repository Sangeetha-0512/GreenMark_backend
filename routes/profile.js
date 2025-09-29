// // routes/profile.js
// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const Reg = require("./model/regSchema");

// const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// router.get("/", async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await Reg.findById(decoded.userId);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({
//       name: user.name,
//       email: user.email,
//       qrId: user.qrId,
//       noOfSaplings: user.noOfSaplings,
//       ecoCoins: user.ecoCoins
//       
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching profile", error: err.message });
//   }
// });

// module.exports = router;
// routes/profile.js
const express = require("express");
const router = express.Router();
const User = require("./model/userSchema"); // your user model
const authMiddleware = require("../routes/middleware/auth"); // if using JWT

// GET /api/profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user.id from JWT
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      saplings: user.saplings,
      ecoCoins: user.ecoCoins,
      noOfSaplings: user.noOfSaplings,
         qrId: user.qrId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
