const TaskDb = require("../models/index").Task;

const controller = {
  getAllTasks: (req, res) => {
    TaskDb.findAll()
      .then((tasks) => {
        res.status(200).send(tasks);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  getTaskById: (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    TaskDb.findByPk(id)
      .then((task) => {
        if (task) {
          res.status(200).send(task);
        } else {
          res.status(404).send({ message: "Task not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  addTask: (req, res) => {
    const task = req.body;
    if (!task.title || !task.description || !task.dueDate || !task.assignee) {
      res.status(400).send({ message: "Missing required fields!" });
      return;
    }

    TaskDb.create(task)
      .then((newTask) => {
        res.status(201).send(newTask);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  updateTaskById: (req, res) => {
    const { id } = req.params;
    const task = req.body;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    TaskDb.update(task, {
      where: { id: id },
    })
      .then(([rowsUpdated]) => {
        if (rowsUpdated > 0) {
          res.status(200).send({ message: "Task updated successfully!" });
        } else {
          res.status(404).send({ message: "Task not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  deleteTaskById: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    TaskDb.destroy({
      where: { id: id },
    })
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(200).send({ message: "Task deleted successfully!" });
        } else {
          res.status(404).send({ message: "Task not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },
};

module.exports = controller;
