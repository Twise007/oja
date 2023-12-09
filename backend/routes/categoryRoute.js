const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminAuth");
const router = express.Router();

router.post("/createCategory", protect, adminOnly, createCategory); // Create a category
router.get("/getCategories", protect, adminOnly, getCategories); // Get the category
router.delete("/:slug", protect, adminOnly, deleteCategory); // Delete the category


module.exports = router;
