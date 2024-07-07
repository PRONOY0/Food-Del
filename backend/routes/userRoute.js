const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const {
  login,
  signUp,
  profile,
  updateProfile,
  forgotPassword,
  resetPassword,
  otpVerification,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/auth");
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

userRouter.post("/login", login);
userRouter.post("/signup", upload.single("image"), signUp);
userRouter.post("/profile", authMiddleware, profile);
userRouter.put(
  "/edit-profile",
  upload.single("image"),
  authMiddleware,
  updateProfile
);

userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/verify-otp", otpVerification);

userRouter.post("/reset-password/:userId", resetPassword);

module.exports = userRouter;
