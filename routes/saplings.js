const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Reg = require("./model/regSchema");

// Create uploads folder automatically if not exists
const fs = require("fs");
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// POST /api/saplings
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { species, store, qrId, userEmail } = req.body;
    const imageFile = req.file ? req.file.filename : "";

    // Find user by email
    const user = await Reg.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure saplings array exists
    if (!user.saplings) user.saplings = [];

    // Create new sapling object
    const newSapling = {
      species,
      store,
      qrId,
      image: imageFile,
      plantedDate: new Date(),
      health: "Good",
      careTips: "Water regularly",
      timing: "Morning",
    };

    // Add to user's saplings
    user.saplings.push(newSapling);
    user.noOfSaplings = user.saplings.length;

    await user.save();

    res.status(201).json({
      message: "Sapling saved successfully",
      sapling: newSapling,
      totalSaplings: user.noOfSaplings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving sapling", error: err.message });
  }
});

module.exports = router;
