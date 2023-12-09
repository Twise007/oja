// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = adminOnly 
