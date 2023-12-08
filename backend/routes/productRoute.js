const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");



router.post("/", protect, createProduct); // Create a product


module.exports = router;
