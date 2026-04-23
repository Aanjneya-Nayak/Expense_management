const Item = require("../models/Item");

// Add new item
exports.addItem = async (req, res) => {
  try {
    const {
      itemName,
      description,
      type,
      category,
      location,
      contactInfo,
      date,
    } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (
      !itemName ||
      !description ||
      !type ||
      !category ||
      !location ||
      !contactInfo
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const item = new Item({
      userId,
      itemName,
      description,
      type,
      category,
      location,
      contactInfo,
      date: date || new Date(),
      status: "Active",
    });

    await item.save();

    res.status(201).json({
      message: "Item reported successfully",
      item,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding item", error: error.message });
  }
};

// Get all items for logged-in user
exports.getUserItems = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { type, category, location } = req.query;

    let query = { userId };

    // Filter by type (Lost/Found)
    if (type) {
      query.type = type;
    }

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Filter by location if provided
    if (location) {
      query.location = new RegExp(location, "i");
    }

    const items = await Item.find(query).sort({ date: -1 });

    res.status(200).json({
      message: "Items retrieved successfully",
      count: items.length,
      items,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving items", error: error.message });
  }
};

// Get all items (public view)
exports.getAllItems = async (req, res) => {
  try {
    const { type, category, itemName, location } = req.query;

    let query = { status: "Active" };

    // Filter by type (Lost/Found)
    if (type) {
      query.type = type;
    }

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Filter by item name
    if (itemName) {
      query.itemName = new RegExp(itemName, "i");
    }

    // Filter by location
    if (location) {
      query.location = new RegExp(location, "i");
    }

    const items = await Item.find(query)
      .populate("userId", "name contactInfo")
      .sort({ date: -1 });

    res.status(200).json({
      message: "Items retrieved successfully",
      count: items.length,
      items,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving items", error: error.message });
  }
};

// Get single item
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id).populate("userId", "name contactInfo");
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item retrieved successfully",
      item,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving item", error: error.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const {
      itemName,
      description,
      type,
      category,
      location,
      contactInfo,
      date,
      status,
    } = req.body;

    let item = await Item.findOne({ _id: id, userId });
    if (!item) {
      return res
        .status(404)
        .json({ message: "Item not found or unauthorized" });
    }

    // Update fields
    if (itemName) item.itemName = itemName;
    if (description) item.description = description;
    if (type) item.type = type;
    if (category) item.category = category;
    if (location) item.location = location;
    if (contactInfo) item.contactInfo = contactInfo;
    if (date) item.date = date;
    if (status) item.status = status;

    await item.save();

    res.status(200).json({
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const item = await Item.findOneAndDelete({ _id: id, userId });
    if (!item) {
      return res
        .status(404)
        .json({ message: "Item not found or unauthorized" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
      item,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
};

// Search items
exports.searchItems = async (req, res) => {
  try {
    const { itemName, category, type } = req.query;

    let query = { status: "Active" };

    if (itemName) {
      query.itemName = new RegExp(itemName, "i");
    }

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    const items = await Item.find(query)
      .populate("userId", "name contactInfo")
      .sort({ date: -1 });

    res.status(200).json({
      message: "Search results",
      count: items.length,
      items,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching items", error: error.message });
  }
};
