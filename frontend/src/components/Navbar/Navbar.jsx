import React, { useState, useEffect, useRef } from "react";
import NotificationPanel from "../NotificationBell/NotificationBell";
import "./Navbar.css";
import logo from "../../assets/images/ByteBazaar_Logo.svg";
import cartIcon from "../../assets/images/cart.svg";
import listIcon from "../../assets/images/list.svg";
import notificationIcon from "../../assets/images/notification.svg";
import profileIcon from "../../assets/images/profile.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notifyWrapperRef = useRef();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  const notifications = [
    { message: "New sign in to your account", time: "3 mins ago" },
    { message: "Order #1234 has shipped", time: "10 mins ago" },
    { message: "Password changed successfully", time: "1 hour ago" },
  ];

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setActive("Notifications");
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
          src={listIcon}
          alt="List"
          className="navbar-icon"
          onClick={() => setActive("List")}
        />

        <div className="notification-wrapper" ref={notifyWrapperRef} style={{ position: "relative" }}>
          <img
            src={notificationIcon}
            alt="Notifications"
            className={`navbar-icon ${active === "Notifications" ? "active" : ""}`}
            onClick={toggleNotifications}
          />
          {showNotifications && (
            <NotificationPanel
              notifications={notifications}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        <img
          src={profileIcon}
          alt="Profile"
          className="navbar-icon"
          onClick={() => {
            setActive("Profile")
            navigate("/userdashboard")
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
