const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user.model");
const { resetPasswordmail } = require("../mailTemplates/resetPassword");
const { otpSend } = require("../mailTemplates/otpSend");
const { profileUpdated } = require("../mailTemplates/profileUpdated");
const { signUpMail } = require("../mailTemplates/signUpMail");
const { loginmail } = require("../mailTemplates/loginMail");
const fs = require("fs");
const OTP = require("../models/otp.model");
const {mailSender} = require('../utils/mailSender');
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user,
    });

    mailSender(
      email,
      "Login Successful || TOMATO",
      loginmail(user.name)
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to Login 😭",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    //* import
    let image_filename = req.file ? req.file.filename : null;
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (phoneNumber.length < 10) {
      return res.json({
        success: false,
        message: "Phone number should be of 10 digits",
      });
    }

    //* validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exist",
      });
    }

    const phoneNumberExists = await User.findOne({ phoneNumber });
    if (phoneNumberExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this phone number",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password length should be more than 8 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //* name split and save as elements in array
    let nameArray = [];
    let userName = name;
    let nameParts = userName.trim().split(" ");
    for (let i = 0; i < nameParts.length; i++) {
      if (nameParts[i].trim() !== "") {
        // Trim to handle extra spaces
        nameArray.push(nameParts[i].trim());
      }
    }

    //* if user didn't provide any profile pic then we will use this default profile pic

    let profileUrl =
      image_filename ||
      `https://api.dicebear.com/5.x/initials/svg?seed=${nameArray[0]}%20${
        nameArray[nameArray.length - 1]
      }`;

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      imageUrl: profileUrl,
      phoneNumber,
    });

    const savedUser = await newUser.save();
    const token = createToken(savedUser._id);

    res.status(201).json({
      success: true,
      message: "Created user successfully",
      token,
      savedUser,
    });

    mailSender(email, "Welcome to TOMATO!", signUpMail(name));

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Server error due to ${error}`,
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const id = req.body.userId;
    const user = await User.findOne({ _id: id }).select("-password");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user data",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.body.userId;
    const { name, email, phoneNumber, currentPassword, password } = req.body;
    let image_filename = req.file ? req.file.filename : null;

    const user = await User.findById(id);

    if (image_filename) {
      fs.unlink(`uploads/${user.imageUrl}`, () => {});
    }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phoneNumber) updates.phoneNumber = phoneNumber;
    if (image_filename) updates.imageUrl = image_filename;
    if (
      currentPassword &&
      (await bcrypt.compare(currentPassword, user.password))
    )
      updates.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    mailSender(
      updatedUser.email,
      "Profile Updated || TOMATO",
      profileUpdated(updatedUser.name)
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to update details",
    });
  }
};

exports.otpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email }).populate("otp");
    const otpFromDb = user.otp.otp;

    const convertedOTP = otpFromDb.toString();

    const userId = user._id;

    const reset_url = `${process.env.frontend_url}/reset-password/${userId}`;

    console.log(reset_url);

    if (!otpFromDb) {
      return res.status(404).json({
        success: false,
        message: "No OTP found for the user",
      });
    }

    if (otp === convertedOTP) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});

      mailSender(
        email,
        "Reset Password || TOMATO",
        resetPasswordmail(user.name, reset_url)
      );

      return res.status(200).json({
        success: true,
        message: "OTP Matched",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Incorrect OTP",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    let generatedOTP = otpGenerator();

    const otp = new OTP({
      otp: generatedOTP,
    });

    const savedOtp = await otp.save();

    user.otp = savedOtp._id;
    await user.save();

    mailSender(
      user.email,
      "Account Verification OTP || TOMATO",
      otpSend(user.name, generatedOTP)
    );

    res.status(200).json({
      success: true,
      message: "OTP sent",
      otp: savedOtp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to generate OTP",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { userId } = req.params;

    const { password } = req.body;

    console.log(userId);

    if (!password || password.length < 8) {
      return res.status(404).json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = hashedPassword;
    await user.save();

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "Changed Password Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};
