import React from "react";
import "./Sidebar.css";
import logo from "../../assets/images/ByteBazaar_Logo.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <div className="nav-section">
        <div className="nav-button">Add Product</div>
        <div className="nav-button">Sales & User</div>
        <div className="nav-button">Inventory</div>
      </div>
    </div>
  );
};

export default Sidebar;
