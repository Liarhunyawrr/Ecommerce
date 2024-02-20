const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://LiarLio:7560294kpkp@cluster0.v8vkaxv.mongodb.net/?retryWrites=true&w=majority"
);
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
