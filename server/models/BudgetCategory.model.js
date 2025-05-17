const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BudgetCategory = sequelize.define("BudgetCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iconColor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const BudgetSubcategory = sequelize.define("BudgetSubcategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const BudgetItem = sequelize.define("BudgetItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
    defaultValue: "Pending",
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define relationships
BudgetCategory.hasMany(BudgetSubcategory);
BudgetSubcategory.belongsTo(BudgetCategory);

BudgetSubcategory.hasMany(BudgetItem);
BudgetItem.belongsTo(BudgetSubcategory);

module.exports = {
  BudgetCategory,
  BudgetSubcategory,
  BudgetItem,
};
