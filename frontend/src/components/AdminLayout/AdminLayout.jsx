import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./AdminLayout.css";
import backgroundImage from "../../assets/images/Neonbeam.png"; // import your background image

const AdminLayout = ({ children }) => {
  return (
    <div
      className="admin-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Sidebar />
      <div className="main-content">
        <div className="inner-box">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
