const { Router } = require("express");
const eventController = require("./events.controller");

const router = Router();

router.use("/events", eventController);

module.exports = router;
