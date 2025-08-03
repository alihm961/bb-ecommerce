import React, { useState } from "react";
import "./Navbar.css";


import logo from "../../assets/images/ByteBazaar_Logo.svg";
import cartIcon from "../../assets/images/cart.svg";
import listIcon from "../../assets/images/list.svg";
import notificationIcon from "../../assets/images/notification.svg";
import profileIcon from "../../assets/images/profile.svg";

const Navbar = () => {
  const [active, setActive] = useState("");

  const handleClick = (name) => {
    setActive(name);
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>

      {/* Center: Section Links */}
      <div className="navbar-center">
        {["Features", "Categories", "Catalog"].map((item) => (
          <span
            key={item}
            className={`navbar-link ${active === item ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Right: Icons */}
      <div className="navbar-right">
        {[
          { name: "Cart", icon: cartIcon },
          { name: "List", icon: listIcon },
          { name: "Notifications", icon: notificationIcon },
          { name: "Profile", icon: profileIcon },
        ].map(({ name, icon }) => (
          <img
            key={name}
            src={icon}
            alt={name}
            className={`navbar-icon ${active === name ? "active" : ""}`}
            onClick={() => handleClick(name)}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
