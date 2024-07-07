const express = require("express");
const orderRoute = express.Router();
const {
  placeOrder,
  verifyOrder,
  userOrders,
  allOrders,
  updateStatus,
} = require("../controllers/orderController");
const { authMiddleware } = require("../middlewares/auth");

orderRoute.post("/place", authMiddleware, placeOrder);

orderRoute.post("/verify", verifyOrder);

orderRoute.post("/userorders", authMiddleware, userOrders);

orderRoute.get("/myorders", allOrders);

orderRoute.post("/status", updateStatus);

module.exports = orderRoute;

