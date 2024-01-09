const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminAuth");
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  payWithStripe,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/", protect, createOrder); // Create a Order
router.get("/", protect, getOrders); // get all Order
router.get("/:id", protect, getOrder); // get a Order
router.patch("/:id", protect, adminOnly, updateOrderStatus); // update  Order status

router.post("/create-payment-intent", payWithStripe); // Payment with stripe

module.exports = router;
