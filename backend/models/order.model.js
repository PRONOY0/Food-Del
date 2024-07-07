const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  items: {
    type: Array,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "Food Processing",
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  payment: {
    type: Boolean,
    default: false,
  },

  address: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
