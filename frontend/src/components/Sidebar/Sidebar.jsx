import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/images/whitelogo.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <div className="side-section">
        <div
          className={`side-button ${isActive("/admin/add-product") ? "active" : ""}`}
          onClick={() => navigate("/admin/add-product")}
        >
          Add Product
        </div>
        <div
          className={`side-button ${isActive("/admin/sales-users") ? "active" : ""}`}
          onClick={() => navigate("/admin/sales-users")}
        >
          Sales & User
        </div>
        <div
          className={`side-button ${isActive("/admin/inventory") ? "active" : ""}`}
          onClick={() => navigate("/admin/inventory")}
        >
          Inventory
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
