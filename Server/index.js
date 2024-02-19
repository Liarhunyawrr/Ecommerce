const express = require("express");
const app = express();
let port = 4000;
const bodyParser = require("body-parser");
const core = require("cors");
const postmodel = require("./Schema/Post");
const usermodel = require("./Schema/User");
let api = require("./Data.json");
// console.log(api);
app.use(express.json());
app.use(core());
app.use(bodyParser.json());
app.get("/check", async (req, res) => {
  let data = await postmodel.find();
  res.send(data);
});

app.get("/product/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let item = await postmodel.findById({ _id: id }).lean();

    res.json(item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
// app.get("/create", async (req,res)=>{
//   const result = await postmodel.insertMany(api);
//     res.send(result);
// })
// app.get("/delall",async (req,res)=>{
//   const result = await postmodel.deleteMany({});
//     res.send(result);
// })
app.post("/user", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const newUser = new usermodel({ email, password });

  try {
    await newUser.save();

    res.json({ user: newUser, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/loginuser/:email", async (req, res) => {
  let email = req.params.email;
  let data = await usermodel.findOne({ email: email });
  res.send(data);
});
app.get("/cart/:userid", async (req, res) => {
  let userid = req.params.userid;
  let data = await usermodel.findOne({ _id: userid });
  res.send(data);
});
app.delete("/cart/:userid/:productid", async (req, res) => {
  const userId = req.params.userid;
  const productIdToDelete = req.params.productid;
  const user = await usermodel.findById(userId);

  const productIndex = user.cart.findIndex(
    (item) => item.productId === productIdToDelete
  );
  if (productIndex !== -1) {
    user.cart.splice(productIndex, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Product removed from the cart successfully" });
  }
});
app.post("/cart/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const { productId, quan } = req.body;

    const user = await usermodel.findById(userId);

    const existingCartItemIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );

    if (existingCartItemIndex !== -1) {
      res.status(250).json({ message: "already" });
    } else {
      user.cart.push({ userId, productId, quan });
      await user.save();
      res.status(200).json({ message: "Operation completed successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, (req, res) => {
  console.log(`app is listen on port${port}`);
});
