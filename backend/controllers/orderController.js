const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderDate,
    // orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  } = req.body;

  if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
    res.status(400);
    throw new Error("Order data missing!!!");
  }

  await Order.create({
    user: req.user._id,
    orderDate,
    // orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  });
  res.status(200).json({ message: "Order created" });
});

//get orders
const getOrders = asyncHandler(async (req, res) => {
  let orders;

  if (req.user.role === "admin") {
    orders = await Order.find().sort("-createdAt");
    return res.status(200).json(orders);
  }
  orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  return res.status(200).json(orders);
});

//Get single order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (req.user.role === "admin") {
    return res.status(200).json(order);
  }
  // match order to user
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
});

// update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  // update order status
  await Order.findByIdAndUpdate(
    { _id: id },
    { orderStatus },
    { new: true, runValidators: true }
  );
  return res.status(200).json({ message: "Order status update" });
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};
