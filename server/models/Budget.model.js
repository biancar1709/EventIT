const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Budget = sequelize.define("Budget", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

});




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

BudgetCategory.hasMany(BudgetItem);
BudgetItem.belongsTo(BudgetCategory);

Budget.hasMany(BudgetCategory);
BudgetCategory.belongsTo(Budget); 

module.exports = {
  BudgetCategory,
  BudgetItem,
  Budget,
};
