const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);
const postdets = mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  feature: {
    type: Boolean,
    default: false,
  },
  rating: {
    rate: Number,
    count: Number,
  },
  category: String,
  img: String,
});
const Detail = mongoose.model("Detail", postdets);
module.exports = Detail;
