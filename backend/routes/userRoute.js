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
} = require("../controllers/userController");

router.post("/register", registerUser); // Register a user
router.post("/login", loginUser); // login a user
router.get("/logout", logout); // logout a user
router.get("/getuser", protect, getUser); // get a users Route(data)
router.get("/getStatus", loginStatus); // logged in a user
router.patch("/updateUser", protect, updateUser); // updating User
// router.patch("/changepassword", protect, changePassword) //change password of User
// router.post("/forgotpassword", forgotPassword) // forgot password
// router.put("/resetpassword/:resetToken", resetPassword) // Reseting password

module.exports = router;
