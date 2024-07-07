const express = require("express");
const cartRouter = express.Router();
const { authMiddleware } = require("../middlewares/auth");

const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/list", authMiddleware, getCart);

module.exports = cartRouter