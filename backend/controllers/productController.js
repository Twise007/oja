const asyncHandler = require("express-async-handler");

//creating product
const createProduct = asyncHandler(async (req, res) => {
  res.send("Correct");
});

module.exports = {
  createProduct
};
