const ORDER = require("../models/order.model");
const USER = require("../models/user.model");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.placeOrder = async (req, res) => {
  try {
    const newOrder = new ORDER({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    await USER.findByIdAndUpdate({ _id: req.body.userId }, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Failed due to some ${error.message}`,
    });
  }
};

exports.verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    // Validate input
    if (!orderId || !success) {
      return res.status(401).json({
        success: false,
        message: "orderId and success are required",
      });
    }

    // Update or delete order based on success value
    if (success === "true") {
      await ORDER.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({
        success: true,
        message: "Payment Verified",
      });
    } else {
      await ORDER.findByIdAndDelete(orderId);
      res.status(404).json({
        success: false,
        message: "Payment Failed",
      });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.userOrders = async (req, res) => {
  try {
    const orders = await ORDER.find({ userId: req.body.userId });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

exports.allOrders = async (req, res) => {
  try {
    const orders = await ORDER.find({});
    res.status(200).json({
      success: true,
      message: "Fetched all orders",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    await ORDER.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.status(200).json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Status update failed",
    });
  }
};
