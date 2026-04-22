const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /register - Register a new user
router.post("/register", authController.register);

// POST /login - Authenticate user and return JWT token
router.post("/login", authController.login);

module.exports = router;
