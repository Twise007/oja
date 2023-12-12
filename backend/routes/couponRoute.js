const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminAuth");
const {
  createCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
} = require("../controllers/couponController");
const router = express.Router();

router.post("/createCoupon", protect, adminOnly, createCoupon); // Create a Coupon
router.get("/getCoupons", protect, adminOnly, getCoupons); // get all Coupon
router.get("/:couponName", protect, getCoupon); // get a Coupon
router.delete("/:id", protect, adminOnly, deleteCoupon); // delete a Coupon

module.exports = router;
