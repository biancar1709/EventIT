const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks.controller");

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.addTask);
router.put("/:id", taskController.updateTaskById);
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
