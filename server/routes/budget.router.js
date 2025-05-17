const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budget.controller");

// Category routes
router.get("/categories", budgetController.getAllCategories);
router.get("/categories/:id", budgetController.getCategoryById);
router.post("/categories", budgetController.addCategory);
router.put("/categories/:id", budgetController.updateCategoryById);
router.delete("/categories/:id", budgetController.deleteCategoryById);

router.get("/", budgetController.getAllBudgets);
router.get("/:id", budgetController.getBudgetById);
router.post("/", budgetController.createBudget);
router.put("/:id", budgetController.updateBudgetById);
router.delete("/:id", budgetController.deleteBudgetById);


// Item routes
router.get("/items", budgetController.getAllItems);
router.get("/items/:id", budgetController.getItemById);
router.post("/items", budgetController.addItem);
router.put("/items/:id", budgetController.updateItemById);
router.delete("/items/:id", budgetController.deleteItemById);

module.exports = router;
