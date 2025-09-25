// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ecoCoins: { type: Number, default: 0 },
  registerDate: { type: Date, default: Date.now },
  sponsorName: String,
  shopName: String,
  ownerName: String,
  profilePic: String, // file path
  qrCode: String, // generated QR string
});

module.exports = mongoose.model("User", userSchema);
