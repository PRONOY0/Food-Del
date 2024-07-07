// This controller is basically to store added items in cart to db so that even after refresh it doesn't disappear from the cart page

const mongoose = require("mongoose");
const User = require("../models/user.model");

//* add items to user cart

exports.addToCart = async (req, res) => {
  try {
    const id = req.body.userId;

    const userData = await User.findById(id);
    if(!userData){
      return res.json({
        success:false,
        message:"Failed to fetch user data"
      })
    }


    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await User.findByIdAndUpdate(req.body.userId, { cartData });

    res.status(200).json({
      success: true,
      message: "Added to Cart 🛒",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error due to ${error.message}`,
    });
  }
};

//* remove items from user cart

exports.removeFromCart = async (req, res) => {
  try {
    const id = req.body.userId;

    let user = await User.findById(id);

    let cartData = await user.cartData;

    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -= 1;
    }

    await User.findByIdAndUpdate(id,{cartData});
    res.status(200).json({
        "success": true,
        "message": "Removed from cart"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
        "success": false,
        "message": "Failed to remove from Cart"
    });
  }
};

//* remove items from user cart

exports.getCart = async (req, res) => {
  try {

    const id = req.body.userId;

    let userData = await User.findById(id);
    
    let cartData = await userData.cartData;

    res.status(200).json({
        "success": true,
        "message": "Fetched All Cart Data",
        cartData,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
        "success": false,
        "message": `Failed to fetch cart data due to ${error}`
    });
  }
};
