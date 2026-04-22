const Expense = require("../models/Expense");

// Add new expense
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!title || !amount || !category) {
      return res
        .status(400)
        .json({ message: "Title, amount, and category are required" });
    }

    const expense = new Expense({
      userId,
      title,
      amount,
      category,
      description: description || "",
      date: date || new Date(),
    });

    await expense.save();

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding expense", error: error.message });
  }
};

// Get all expenses for logged-in user
exports.getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { category, startDate, endDate } = req.query;

    let query = { userId };

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Filter by date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    const expenses = await Expense.find(query).sort({ date: -1 });

    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.status(200).json({
      message: "Expenses retrieved successfully",
      total,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving expenses", error: error.message });
  }
};

// Get single expense
exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense retrieved successfully",
      expense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving expense", error: error.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, amount, category, description, date } = req.body;

    let expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Update fields
    if (title) expense.title = title;
    if (amount !== undefined) expense.amount = amount;
    if (category) expense.category = category;
    if (description !== undefined) expense.description = description;
    if (date) expense.date = date;

    await expense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating expense", error: error.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const expense = await Expense.findOneAndDelete({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      expense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: error.message });
  }
};
