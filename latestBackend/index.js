const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(express.json());
const mongoose = require("mongoose");


const loginRoute = require("./routes/authRoutes")

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: "*", // Include PATCH and OPTIONS
    credentials: true, // Allow cookies to be sent cross-origin
  })
);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ManasDeveloper:manas14@cluster0.lck1f65.mongodb.net/Hr-Portal"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Failed to connect to the database", err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});




app.use('/api/v0/auth',loginRoute)

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
