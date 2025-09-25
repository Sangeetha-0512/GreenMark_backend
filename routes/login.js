// var express = require("express");
// var router = express.Router();
// var User = require("./model/regSchema");
// var bcrypt = require("bcrypt");
// var jwt = require("jsonwebtoken");

// const SECRET_KEY = "4fd890289ab2403c76eb997f20397ec1b6784fb493a5ebf6031e6dab8601679f";

// router.get("/", (req, res) => {
//   res.send("login page...");
// });

// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1️⃣ Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "no user found" });
//     }

//     // 2️⃣ Compare password
//     const isPasswordValid = await bcrypt.compare(password, user.hash);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "invalid password" });
//     }

//     // 3️⃣ Generate JWT
//     const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, {
//       expiresIn: "10h",
//     });

//     // 4️⃣ Send response
//     res.status(200).json({
//       message: "login success",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error in login route:", error);
//     res.status(500).json({ message: "server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Reg = require("./model/userSchema"); 


// Secret key for JWT (keep safe in .env)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    console.log("Incoming body:", req.body); 
    const { email, password } = req.body;

    // ✅ Check email exists
 const user = await Reg.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Compare password with hash
   const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
