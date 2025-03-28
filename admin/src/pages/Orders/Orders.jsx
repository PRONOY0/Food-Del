import React from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../admin_assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/myorders");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    console.log("event",event.target.value);
    console.log("orderId",orderId);
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if(response.data.success){
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
    console.log("orders:", orders);
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <p className="order-item-address">
                <p>
                  {order.address.street +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.city +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode +
                    ", "}
                </p>

                <p className="order-item-phone">{order.address.phone}</p>

                <p>Items : {order.items.length}</p>

                <p>${order.amount}</p>

                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
