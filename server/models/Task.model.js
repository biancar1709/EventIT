const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM("High", "Medium", "Low"),
    defaultValue: "Medium",
  },
  status: {
    type: DataTypes.ENUM("Not Started", "In Progress", "Completed"),
    defaultValue: "Not Started",
  },
  assignee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Task;
