const ReportDb = require("../models/index").Report;

const controller = {
  getAllReports: (req, res) => {
    ReportDb.findAll()
      .then((reports) => {
        res.status(200).send(reports);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  getReportById: (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    ReportDb.findByPk(id)
      .then((report) => {
        if (report) {
          res.status(200).send(report);
        } else {
          res.status(404).send({ message: "Report not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  addReport: (req, res) => {
    const report = req.body;
    if (!report.name || !report.type || !report.date) {
      res.status(400).send({ message: "Missing required fields!" });
      return;
    }

    ReportDb.create(report)
      .then((newReport) => {
        res.status(201).send(newReport);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  updateReportById: (req, res) => {
    const { id } = req.params;
    const report = req.body;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    ReportDb.update(report, {
      where: { id: id }
    })
      .then(([rowsUpdated]) => {
        if (rowsUpdated > 0) {
          res.status(200).send({ message: "Report updated successfully!" });
        } else {
          res.status(404).send({ message: "Report not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  deleteReportById: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    ReportDb.destroy({
      where: { id: id }
    })
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(200).send({ message: "Report deleted successfully!" });
        } else {
          res.status(404).send({ message: "Report not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  }
};

module.exports = controller; 