const UserDb = require("../models/index").User;
const bcrypt = require("bcryptjs");

const controller = {
  getAllUsers: (req, res) => {
    UserDb.findAll({
      attributes: { exclude: ['password'] } // Exclude password from response
    })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  getUserById: (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    UserDb.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
      .then((user) => {
        if (user) {
          res.status(200).send(user);
        } else {
          res.status(404).send({ message: "User not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  addUser: async (req, res) => {
    const user = req.body;
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      res.status(400).send({ message: "Missing required fields!" });
      return;
    }

    try {
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await UserDb.create({
        ...user,
        password: hashedPassword
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = newUser.toJSON();
      res.status(201).send(userWithoutPassword);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  updateUserById: async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    try {
      // If password is being updated, hash it
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }

      const [rowsUpdated] = await UserDb.update(user, {
        where: { id: id }
      });

      if (rowsUpdated > 0) {
        res.status(200).send({ message: "User updated successfully!" });
      } else {
        res.status(404).send({ message: "User not found!" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  deleteUserById: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    UserDb.destroy({
      where: { id: id }
    })
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(200).send({ message: "User deleted successfully!" });
        } else {
          res.status(404).send({ message: "User not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  }
};

module.exports = controller; 