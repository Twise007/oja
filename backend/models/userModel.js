const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLenght: [6, "Password must be up to 6 character"],
    // maxLenght: [23, "Password must not be more than 23 character"],
  },
  role: {
    type: String,
    required: [true],
    default: "customer",
    enum: ["customer", "admin"],
  },
  photo: {
    type: String,
    required: [true, "Please add a picture"],
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  phone: {
    type: String,
    default: "+234",
  },
  address: {
    type: Object,
    //address, state, country
  },
});

// Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  //hashed the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
