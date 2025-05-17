const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Report = sequelize.define("Report", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(
      "Annual Report",
      "Event Report",
      "Quarterly Report",
      "Analytics Report",
      "Financial Report"
    ),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Completed", "In Progress"),
    defaultValue: "In Progress",
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Report;
