const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  updateUserPhoto,
  saveCart,
  getCart,
} = require("../controllers/userController");

router.post("/register", registerUser); // Register a user
router.post("/login", loginUser); // login a user
router.get("/logout", logout); // logout a user
router.get("/getuser", protect, getUser); // get a users Route(data)
router.get("/loginStatus", loginStatus); // logged in a user
router.patch("/updateUser", protect, updateUser); // updating User
router.patch("/updatePhoto", protect, updateUserPhoto); // updating User photo
router.patch("/saveCart", protect, saveCart); // save users cart
router.get("/getCart", protect, getCart); // get users cart

// router.patch("/changepassword", protect, changePassword) //change password of User
// router.post("/forgotpassword", forgotPassword) // forgot password
// router.put("/resetpassword/:resetToken", resetPassword) // Reseting password

module.exports = router;
