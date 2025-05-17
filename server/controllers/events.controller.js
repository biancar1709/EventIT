const EventDb = require("../models/index").Event;

const controller = {
  getAllEvents: (req, res) => {
    EventDb.findAll()
      .then((events) => {
        if (events.length > 0) {  
          res.status(200).send(events);
        } else {
          res.status(404).send({ message: "No events found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: error.message });
      });
  },

  getEventsById: (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
    }

    EventDb.findByPk(id)
      .then((event) => {
        if (event) {
          res.status(200).send(event);
        } else {
          res.status(404).send({ message: "The event was not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  addEvent: (req, res) => {
    const event = req.body;
    if (
      !event.title ||
      !event.date ||
      !event.time ||
      !event.location ||
      !event.type
    ) {
      res.status(400).send({ message: "Missing required fields!" });
      return;
    }

    EventDb.create(event)
      .then((newEvent) => {
        res.status(201).send(newEvent);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  updateEventById: (req, res) => {
    const { id } = req.params;
    const event = req.body;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    EventDb.update(event, {
      where: { id: id },
    })
      .then(([rowsUpdated]) => {
        if (rowsUpdated > 0) {
          res.status(200).send({ message: "Event updated successfully!" });
        } else {
          res.status(404).send({ message: "Event not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  deleteEventById: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    EventDb.destroy({
      where: { id: id },
    })
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(200).send({ message: "Event deleted successfully!" });
        } else {
          res.status(404).send({ message: "Event not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },
};

module.exports = controller;
