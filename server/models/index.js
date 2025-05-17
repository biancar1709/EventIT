const User = require("./User.model");
const Event = require("./Event.model");
const Task = require("./Task.model");
const sequelize = require("../config/database");

const {
  BudgetCategory,
  BudgetItem,
  Budget,
} = require("./Budget.model");
const Report = require("./Report.model");

// Event associations
Event.hasMany(Task);
Task.belongsTo(Event);

Event.hasMany(Report);
Report.belongsTo(Event);

// User associations
User.hasMany(Event);
Event.belongsTo(User);

User.hasMany(Task);
Task.belongsTo(User);

// Budget associations
Budget.hasOne(Event);
Event.belongsTo(Budget);

module.exports = {
  User,
  Event,
  Task,
  BudgetCategory,
  BudgetItem,
  Budget,
  Report,
  db:sequelize
};
