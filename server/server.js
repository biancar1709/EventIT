const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { db } = require("./models/index");
const routes = require("./routes");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Your frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EventIT API" });
});

// Initialize database
const initializeDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Database connection has been established successfully.");
    await db.sync();
    // await db.sync({ force: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initializeDatabase();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
