const UserDb = require("../models/index").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const controller = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required!" });
    }

    try {
      const user = await UserDb.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).send({ message: "Invalid password!" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "24h",
      });

      const { password: _, ...userWithoutPassword } = user.toJSON();
      res.status(200).send({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    try {
      const existingUser = await UserDb.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send({ message: "Email already registered!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserDb.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "24h",
      });

      const { password: _, ...userWithoutPassword } = user.toJSON();
      res.status(201).send({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
      console.log(error);
    }
  },
};

module.exports = controller;
