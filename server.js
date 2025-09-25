const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const registerRoute = require("./routes/model/usercreateaccount");
const loginRoute = require("./routes/login"); 

mongoose.connect("mongodb://localhost:27017/GreenMark", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api", registerRoute);
app.use("/api", loginRoute);

app.get("/", (req, res) => res.send("🚀 Server is running"));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = 3001; 
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);



