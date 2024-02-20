// mongoose.connect("mongodb://127.0.0.1:27017/store");
//
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://LiarLio:7560294kpkp@cluster0.pbo2xii.mongodb.net/?retryWrites=true&w=majority"
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
