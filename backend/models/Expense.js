const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Please provide an expense title"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
      min: [0, "Amount cannot be negative"],
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Travel",
        "Bills",
        "Entertainment",
        "Shopping",
        "Health",
        "Other",
      ],
      required: [true, "Please select a category"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [250, "Description cannot exceed 250 characters"],
    },
    date: {
      type: Date,
      required: [true, "Please provide a date"],
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Expense", expenseSchema);
