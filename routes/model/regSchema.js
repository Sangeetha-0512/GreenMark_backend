const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  qrId: { type: String },
  noOfSaplings: { type: Number, default: 0 },
  ecoCoins: { type: Number, default: 0 },
  registerDate: { type: Date, default: Date.now },
 saplings: { type: Array, default: [] }  // ensures all new users have empty array

});

module.exports = mongoose.model("Reg", regSchema);
