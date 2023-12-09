const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminAuth");

router.post("/", protect, adminOnly, createProduct); // Create a product

module.exports = router;
