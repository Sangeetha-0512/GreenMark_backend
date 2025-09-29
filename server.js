// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());
// const registerRoute = require("./routes/model/usercreateaccount");
// const loginRoute = require("./routes/login"); 

// mongoose.connect("mongodb://localhost:27017/GreenMark", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch((err) => console.error("❌ MongoDB error:", err));

// app.use("/api", registerRoute);
// app.use("/api", loginRoute);

// app.get("/", (req, res) => res.send("🚀 Server is running"));

// app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// const PORT = 3001; 
// app.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const profileRoute = require("./routes/profile");
const saplingsRoute = require("./routes/saplings");
// Use routes
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/profile", profileRoute);
app.use("/api/saplings", saplingsRoute);
app.use("/uploads", express.static("uploads"));
// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/GreenMark", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
