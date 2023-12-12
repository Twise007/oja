const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // orderTime: {
    //   type: String,
    //   required: [true, "Please add an order time"],
    //   trim: true,
    // },
    orderDate: {
      type: String,
      required: [true, "Please add an order date"],
      trim: true,
    },
    orderAmount: {
      type: Number,
      required: [true, "Please add an order amount"],
      trim: true,
    },
    orderStatus: {
      type: String,
      required: [true, "Please add an order status"],
      trim: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    cartItems: {
      //   type: [Object],
      type: String,
      required: [true],
    },
    shippingAddress: {
      //   type: Object,
      type: String,
      required: true,
    },
    coupon: {
      //   type: Object,
      type: String,
      required: true,
      default: {
        name: "nil",
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
