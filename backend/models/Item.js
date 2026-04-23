const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    itemName: {
      type: String,
      required: [true, "Please provide an item name"],
      trim: true,
      maxlength: [100, "Item name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    type: {
      type: String,
      enum: ["Lost", "Found"],
      required: [true, "Please specify if item is Lost or Found"],
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Clothing",
        "Documents",
        "Accessories",
        "Books",
        "Bags",
        "Keys",
        "Other",
      ],
      required: [true, "Please select a category"],
    },
    location: {
      type: String,
      required: [true, "Please provide the location"],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    date: {
      type: Date,
      required: [true, "Please provide a date"],
      default: Date.now,
    },
    contactInfo: {
      type: String,
      required: [true, "Please provide contact information"],
      trim: true,
      maxlength: [20, "Contact info cannot exceed 20 characters"],
    },
    status: {
      type: String,
      enum: ["Active", "Resolved"],
      default: "Active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Item", itemSchema);
