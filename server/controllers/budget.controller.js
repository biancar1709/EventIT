const {
  BudgetCategory,
  BudgetSubcategory,
  BudgetItem,
  Budget,
  Event
} = require("../models/index");

const controller = {
  // Budget CRUD Operations
  getAllBudgets: (req, res) => {
    Budget.findAll({
      include: [
        {
          model: BudgetCategory,
          include: [
            {
              model: BudgetSubcategory,
              include: [BudgetItem],
            },
          ],
        },
      ],
    })
      .then((budgets) => {
        res.status(200).send(budgets);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  getBudgetById: (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    Budget.findByPk(id, {
      include: [
        {
          model: BudgetCategory,
          include: [BudgetItem],
        },
      ],
    })
      .then((budget) => {
        if (budget) {
          res.status(200).send(budget);
        } else {
          res.status(404).send({ message: "Budget not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  createBudget: (req, res) => {
    const budget = req.body;
    Budget.create(budget)
      .then((newBudget) => {
        res.status(201).send(newBudget);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  updateBudgetById: (req, res) => {
    const { id } = req.params;
    const budget = req.body;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    Budget.update(budget, {
      where: { id: id },
    })
      .then(([rowsUpdated]) => {
        if (rowsUpdated > 0) {
          res.status(200).send({ message: "Budget updated successfully!" });
        } else {
          res.status(404).send({ message: "Budget not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  deleteBudgetById: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    Budget.destroy({
      where: { id: id },
    })
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(200).send({ message: "Budget deleted successfully!" });
        } else {
          res.status(404).send({ message: "Budget not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },



  // Budget Categories
  getAllCategories: (req, res) => {
    BudgetCategory.findAll({
      include: [
        {
          model: BudgetSubcategory,
          include: [BudgetItem],
        },
      ],
    })
      .then((categories) => {
        res.status(200).send(categories);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  getCategoryById: (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    BudgetCategory.findByPk(id, {
      include: [
        {
          model: BudgetSubcategory,
          include: [BudgetItem],
        },
      ],
    })
      .then((category) => {
        if (category) {
          res.status(200).send(category);
        } else {
          res.status(404).send({ message: "Category not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  addCategory: (req, res) => {
    const category = req.body;
    console.log("Category", category);
    if (!category.name || !category.icon || !category.iconColor || !category.BudgetId) {
      res.status(400).send({ message: "Missing required fields!" });
      return;
    }

    BudgetCategory.create(category)
      .then((newCategory) => {
        res.status(201).send(newCategory);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  updateCategoryById: (req, res) => {
    const { id } = req.params;
    const category = req.body;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    BudgetCategory.update(category, {
      where: { id: id },
    })
      .then(([rowsUpdated]) => {
        if (rowsUpdated > 0) {
          res.status(200).send({ message: "Category updated successfully!" });
        } else {
          res.status(404).send({ message: "Category not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  deleteCategoryById: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    BudgetCategory.destroy({
      where: { id: id },
    })
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(200).send({ message: "Category deleted successfully!" });
        } else {
          res.status(404).send({ message: "Category not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  // Budget Subcategories
  getAllSubcategories: (req, res) => {
    BudgetSubcategory.findAll({
      include: [BudgetItem],
    })
      .then((subcategories) => {
        res.status(200).send(subcategories);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  getSubcategoryById: (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    BudgetSubcategory.findByPk(id, {
      include: [BudgetItem],
    })
      .then((subcategory) => {
        if (subcategory) {
          res.status(200).send(subcategory);
        } else {
          res.status(404).send({ message: "Subcategory not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  addSubcategory: (req, res) => {
    const subcategory = req.body;
    if (!subcategory.name || !subcategory.BudgetCategoryId) {
      res.status(400).send({ message: "Missing required fields!" });
      return;
    }

    BudgetSubcategory.create(subcategory)
      .then((newSubcategory) => {
        res.status(201).send(newSubcategory);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  updateSubcategoryById: (req, res) => {
    const { id } = req.params;
    const subcategory = req.body;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    BudgetSubcategory.update(subcategory, {
      where: { id: id },
    })
      .then(([rowsUpdated]) => {
        if (rowsUpdated > 0) {
          res
            .status(200)
            .send({ message: "Subcategory updated successfully!" });
        } else {
          res.status(404).send({ message: "Subcategory not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  deleteSubcategoryById: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    BudgetSubcategory.destroy({
      where: { id: id },
    })
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res
            .status(200)
            .send({ message: "Subcategory deleted successfully!" });
        } else {
          res.status(404).send({ message: "Subcategory not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  // Budget Items
  getAllItems: (req, res) => {
    BudgetItem.findAll()
      .then((items) => {
        res.status(200).send(items);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  getItemById: (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    BudgetItem.findByPk(id)
      .then((item) => {
        if (item) {
          res.status(200).send(item);
        } else {
          res.status(404).send({ message: "Item not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  addItem: (req, res) => {
    const item = req.body;
    if (!item.description || !item.amount || !item.BudgetCategoryId || !item.amount) {
      res.status(400).send({ message: "Missing required fields!" });
      return;
    }

    BudgetItem.create(item)
      .then((newItem) => {
        res.status(201).send(newItem);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  updateItemById: (req, res) => {
    const { id } = req.params;
    const item = req.body;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    BudgetItem.update(item, {
      where: { id: id },
    })
      .then(([rowsUpdated]) => {
        if (rowsUpdated > 0) {
          res.status(200).send({ message: "Item updated successfully!" });
        } else {
          res.status(404).send({ message: "Item not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },

  deleteItemById: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "An id must be specified!" });
      return;
    }

    BudgetItem.destroy({
      where: { id: id },
    })
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(200).send({ message: "Item deleted successfully!" });
        } else {
          res.status(404).send({ message: "Item not found!" });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  },
};

module.exports = controller;
