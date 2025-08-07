// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import NotificationPanel from "../NotificationBell/NotificationBell";
import "./Navbar.css";
import logo from "../../assets/images/whitelogo.svg";
import cartIcon from "../../assets/images/cart.svg";
import notificationIcon from "../../assets/images/notification.svg";
import profileIcon from "../../assets/images/profile.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifyWrapperRef = useRef();
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id"); // Adjust this based on your auth logic
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/user/notifications/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.data) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setActive("Notifications");
    if (!showNotifications) fetchNotifications();
  };

  const handleClickOutside = (e) => {
    if (
      notifyWrapperRef.current &&
      !notifyWrapperRef.current.contains(e.target)
    ) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        {["Catalog", "Features", "Categories"].map((item) => (
          <span
            key={item}
            className={`navbar-link ${active === item ? "active" : ""}`}
            onClick={() => {
              setActive(item);
              if (item === "Features") scrollToSection("features");
              if (item === "Categories") scrollToSection("categories");
              if (item === "Catalog") navigate("/catalog");
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="navbar-right">
        <div
          className="notification-wrapper"
          ref={notifyWrapperRef}
          style={{ position: "relative" }}
        >
          <img
            src={notificationIcon}
            alt="Notifications"
            className={`navbar-icon ${
              active === "Notifications" ? "active" : ""
            }`}
            onClick={toggleNotifications}
          />
          {showNotifications && (
            <NotificationPanel
              notifications={notifications}
            />
          )}
        </div>

        <img
          src={cartIcon}
          alt="Cart"
          className="navbar-icon"
          onClick={() => {
            setActive("Cart");
            navigate("/cartpage");
          }}
        />

        <img
          src={profileIcon}
          alt="Profile"
          className="navbar-icon"
          onClick={() => {
            setActive("Profile");
            navigate("/userdashboard");
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
