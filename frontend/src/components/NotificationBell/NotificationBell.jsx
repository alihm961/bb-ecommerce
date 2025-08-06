// src/components/NotificationBell/NotificationBell.jsx
import React from "react";
import "./NotificationBell.css";
import notifIcon from "../../assets/images/notification2.svg";

const NotificationPanel = ({ notifications }) => {
  return (
    <div className="notification-panel">
      <div className="panel-header">
        <strong>Notifications</strong>
      </div>
      <ul className="notification-list">
        {notifications.length === 0 && (
          <li className="notification-item">No new notifications</li>
        )}
        {notifications.map((notif, index) => (
          <li className="notification-item" key={index}>
            <div className="notif-content">
              <img src={notifIcon} alt="icon" className="notif-icon" />
              <div className="notif-main">
                <div className="notif-top">
                  <div className="notif-text">{notif.message}</div>
                  {/* You can keep or remove the button if needed */}
                  {/* <button className="mark-read-btn">Mark as read</button> */}
                </div>
                <div className="notif-time">{notif.time || "Just now"}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
