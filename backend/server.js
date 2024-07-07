const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { dbConnect } = require("./config/database");
const foodRouter = require("./routes/foodRouter");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

// Use CORS middleware with options
app.use(cors());

app.use(express.json());

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send(`<h1>App is running at PORT:${port}</h1>`);
});

app.listen(port, () => {
  console.log(`app is running at :${port}`);
});


dbConnect();
