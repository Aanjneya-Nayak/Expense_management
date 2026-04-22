const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const expenseController = require("../controllers/expenseController");

// All expense routes are protected
router.use(authenticateToken);

// POST /expense - Add new expense (Protected)
router.post("/", expenseController.addExpense);

// GET /expenses - Get all expenses of logged-in user
router.get("/", expenseController.getAllExpenses);

// GET /expense/:id - Get single expense
router.get("/:id", expenseController.getExpenseById);

// PUT /expense/:id - Update expense
router.put("/:id", expenseController.updateExpense);

// DELETE /expense/:id - Delete expense
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
