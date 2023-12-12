const asyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, expiresAt, discount } = req.body;

  if (!name || !expiresAt || !discount) {
    res.status(404);
    throw new Error("Please fill in all fields");
  }
  const coupon = await Coupon.create({
    name,
    expiresAt,
    discount,
  });
  res.status(201).json(coupon);
});

//get Coupon
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort("-createdAt");
  res.status(200).json(coupons);
});

//get a single coupon
const getCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({
    name: req.params.couponName,
    expiresAt: { $gt: Date.now() },
  });
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found or has expired");
  }

  res.status(200).json(coupon);
});

//delete Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOneAndDelete(req.params.id);

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  res.status(200).json({ message: "Coupon Deleted" });
});

module.exports = {
  createCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
};
