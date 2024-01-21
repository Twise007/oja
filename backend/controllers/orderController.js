const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { calculateTotalPrice } = require("../utils");
const Product = require("../models/productModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//create order
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderDate,
    orderTime,
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
    orderTime,
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
// const getOrders = asyncHandler(async (req, res) => {
//   let orders;

//   if (req.user.role === "admin") {
//     orders = await Order.find().sort("-createdAt");
//     return res.status(200).json(orders);
//   }
//   orders = await Order.find({ user: req.user._id }).sort("-createdAt");
//   return res.status(200).json(orders);
// });

const getOrders = asyncHandler(async (req, res) => {
  let orders;

  if (req.user.role === "admin") {
    orders = await Order.find().sort("-createdAt");
    return res.status(200).json(orders);
  }
  orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json(orders);
});

// Get single Order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (req.user.role === "admin") {
    return res.status(200).json(order);
  }
  // Match Order to its user
  if (order.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(order);
});

// //Getting a single order
// const getOrder = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) {
//     res.status(404);
//     throw new Error("Order not found");
//   }
//   if (req.user.role === "admin") {
//     return res.status(200).json(order);
//   }
//   // match order to user
//   if (order.user.toString() !== req.user._id) {
//     res.status(401);
//     throw new Error("User not authorized to view order");
//   }
//   return res.status(200).json(order);
// });

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

//pay with stripe
const payWithStripe = asyncHandler(async (req, res) => {
  const { items, shipping, description, coupon } = req.body;

  const products = await Product.find();

  let orderAmount;
  orderAmount = calculateTotalPrice(products, items);
  if (coupon !== null && coupon?.name !== "nil") {
    let totalAfterDiscount =
      orderAmount - (orderAmount * coupon.discount) / 100;
    orderAmount = totalAfterDiscount;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = {
  payWithStripe,
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};
