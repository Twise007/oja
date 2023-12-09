const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const adminOnly = require("../middleware/adminAuth");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
} = require("../controllers/productController");

router.post("/", protect, adminOnly, createProduct); // Create a product
router.get("/", getProducts); // get all product
router.get("/:id", getProduct); // get a product
router.delete("/:id", protect, adminOnly, deleteProduct); // Delete a product
router.patch("/:id", protect, adminOnly, updateProduct); // Update a product

router.patch("/review/:id", protect, reviewProduct); // review a product
router.patch("/deleteReview/:id", protect, deleteReview); // delete review
router.patch("/updateReview/:id", protect, updateReview); // update review


module.exports = router;
