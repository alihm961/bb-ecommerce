import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import "./UserDashboardPage.css";
import axios from "axios";

const UserProfile = () => {
  const [orders, setOrders] = useState([]);

  const id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const getOrders = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/user/orders/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setOrders(response.data.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="user-profile-container">
        <div className="profile-form-card">
          <h2>User Profile</h2>
          <form className="profile-form">
            <div className="form-grid">
              <Input
                label="Full name"
                name="fullName"
                placeholder="Enter your name"
              />
              <Input
                label="Payment method"
                name="payment"
                placeholder="e.g. card"
              />
              <Input
                type="email"
                label="Email"
                name="email"
                placeholder="email@example.com"
              />
              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="********"
              />
              <Input
                type="tel"
                label="Phone number"
                name="phone"
                placeholder="+961..."
              />
              <Input
                label="Address"
                name="address"
                placeholder="enter your address"
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>

        <div className="order-history-card">
          <h2>Order History</h2>
          <div className="table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length !== 0 &&
                  orders.map((order) => {
                    return <tr key={order.id}>
                      <th>{order.id}</th>
                      <th>{new Date(order.created_at).toISOString().split('T')[0]}</th>
                      <th>{order.items_count}</th>
                      <th>${order.price}</th>
                      <th>{order.status}</th>
                    </tr>;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
