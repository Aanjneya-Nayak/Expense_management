const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const itemController = require("../controllers/itemController");

// POST /items - Add new item (Protected)
router.post("/", authenticateToken, itemController.addItem);

// GET /items/search - Search items (specific route before :id)
router.get("/search", itemController.searchItems);

// GET /items/my-items - Get user's own items (Protected) (specific route before :id)
router.get("/my-items", authenticateToken, itemController.getUserItems);

// GET /items/:id - Get single item (general route after specific ones)
router.get("/:id", itemController.getItemById);

// PUT /items/:id - Update item (Protected)
router.put("/:id", authenticateToken, itemController.updateItem);

// DELETE /items/:id - Delete item (Protected)
router.delete("/:id", authenticateToken, itemController.deleteItem);

// GET /items - Get all items (public) - must be last
router.get("/", itemController.getAllItems);

module.exports = router;
