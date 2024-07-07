const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 2, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OTP", otpSchema);
