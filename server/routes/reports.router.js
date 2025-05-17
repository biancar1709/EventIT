const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reports.controller");

router.get("/", reportController.getAllReports);
router.get("/:id", reportController.getReportById);
router.post("/", reportController.addReport);
router.put("/:id", reportController.updateReportById);
router.delete("/:id", reportController.deleteReportById);

module.exports = router; 