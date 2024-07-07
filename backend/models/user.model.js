const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: Number,
      unique: true,
    },

    cartData: {
      type: Object,
      default: {},
    },

    imageUrl: {
      type: String,
      required: false,
    },

    currnetPassword:{
      type:String,
      required: false,
    },

    otp:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'OTP'
    }
  },
  { minimize: false }
);

module.exports = mongoose.model("User", userSchema);
