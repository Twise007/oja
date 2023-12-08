const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//register a User
const createProduct = asyncHandler(async (req, res) => {
  // const { name, email, password } = req.body;

  // //validation
  // if (!name || !email || !password) {
  //   res.status(400);
  //   throw new Error("Kindly fill in all require fields");
  // }

  // // password verfication
  // if (password.lenght < 6) {
  //   res.status(400);
  //   throw new Error("Password must be more than 6 character");
  // }

  // // Check if user already exist
  // const userExists = await User.findOne({ email });
  // if (userExists) {
  //   res.status(400);
  //   throw new Error("Email has already been registered");
  // }

  // //Create new user
  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  // });

  // // Generate Token for user
  // const token = generateToken(user._id);

  // if (user) {
  //   const { _id, name, email, role } = user;
  //   res.cookie("token", token, {
  //     path: "/",
  //     httpOnly: true,
  //     expires: new Date(Date.now() + 1000 * 86400), // 1 day
  //     //   sameSite: "none",
  //     //   secure: true,
  //   });
  //   //send user data
  //   res.status(201).json({
  //     _id,
  //     name,
  //     email,
  //     role,
  //     token,
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid user data");
  // }

  // res.send("register user...");
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found pls sign up");
  }

  //User exist, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Generate Token for user
  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    const newUser = await User.findOne({ email }).select("-password");
    //send HTTP-only Cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      //   sameSite: "none",
      //   secure: true,
    });
    //send user data
    res.status(200).json(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//Logout a User
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 0 sec
    //sameSite: "none",
    //secure: true,
  });
  return res.status(200).json({ message: "Successfully logged out" });
});

//Get a User data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//Get login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  //verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

// updating User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, phone, address } = user;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updatedUser = await user.save();
    res.status(200).json({
      name: updatedUser.name,
      phone: updatedUser.phone,
      address: updatedUser.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// updating User Photo
const updateUserPhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id);
  user.photo = photo;
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

module.exports = {
  createProduct,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  updateUserPhoto,

  //   changePassword,
  //   forgotPassword,
  //   resetPassword,
};
