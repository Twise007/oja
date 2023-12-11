const express = require("express");
const {
  createBrand,
  getBrands,
  deleteBrand,
} = require("../controllers/brandController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminAuth");
const router = express.Router();

router.post("/createBrand", protect, adminOnly, createBrand); // Create a Brand
router.get("/getBrands", protect, adminOnly, getBrands); // Get the Brand
router.delete("/:slug", protect, adminOnly, deleteBrand); // Delete the Brand

module.exports = router;
