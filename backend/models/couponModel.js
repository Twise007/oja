const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
      required: "Please add coupon name",
      minLength: [6, "Coupon must be up to 6 characters"],
      maxLength: [12, "Coupon must not be up to 12 characters"],
    },
    discount: {
      type: Number,
      require: true,
    },
    expiresAt: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
