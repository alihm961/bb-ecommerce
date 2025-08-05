import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/images/ByteBazaar_Logo.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/"}><img src={logo} alt="Logo" className="navbar-logo" /></Link>
      <div className="nav-section">
        <div className="nav-button"><Link to={"/admin/add-product"}>Add Product</Link></div>
       <div className="nav-button"> <Link to={"/admin/sales-users"}>Sales & User</Link></div>
        <div className="nav-button"><Link to={"/admin/inventory"}>Inventory</Link></div>
      </div>
    </div>
  );
};

export default Sidebar;
