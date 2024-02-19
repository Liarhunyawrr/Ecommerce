const mongoose = require("mongoose");
const userdata = mongoose.Schema({
  email: String,
  password: String,
  cart: [],
});
const User = mongoose.model("User", userdata);
module.exports = User;
