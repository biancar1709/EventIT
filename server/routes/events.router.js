const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events.controller");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventsById);
router.post("/", eventController.addEvent);
router.put("/:id", eventController.updateEventById);
router.delete("/:id", eventController.deleteEventById);

module.exports = router;
