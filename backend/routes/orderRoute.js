const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminAuth");
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/", protect, createOrder); // Create a Order
router.get("/", protect, getOrders); // get all Order
router.get("/:id", protect, getOrder); // get a Order
router.patch("/:id", protect, adminOnly, updateOrderStatus); // update  Order status

module.exports = router;
