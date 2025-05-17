const express = require("express");
const router = express.Router();
const eventRoutes = require("./events.router");
const userRoutes = require("./users.router");
const taskRoutes = require("./tasks.router");
const budgetRoutes = require("./budget.router");
const reportRoutes = require("./reports.router");
const authRoutes = require("./auth.router");

router.use("/events", eventRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/budget", budgetRoutes);
router.use("/reports", reportRoutes);
router.use("/auth", authRoutes);

module.exports = router;
