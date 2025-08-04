import React, { useState } from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "./SalesUsers.css";

const SalesUsers = () => {
  const [view, setView] = useState("table");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [orderStatus, setOrderStatus] = useState({});

  const toggleView = () => {
    setView(view === "table" ? "graph" : "table");
  };

  const handleRowSelect = (id) => {
    setSelectedRowId(id);
  };

  const handleStatusChange = (status) => {
    if (selectedRowId !== null) {
      setOrderStatus((prev) => ({ ...prev, [selectedRowId]: status }));
    }
  };

  const data = [
    { name: "Mon", revenue: 2400 },
    { name: "Tue", revenue: 1398 },
    { name: "Wed", revenue: 9800 },
    { name: "Thu", revenue: 3908 },
    { name: "Fri", revenue: 4800 },
    { name: "Sat", revenue: 3800 },
    { name: "Sun", revenue: 4300 },
  ];

  const statuses = ["Pending", "Processing", "Shipped", "Delivered"];
  const statusColors = {
    Pending: "#FF8C00",
    Processing: "#FFD700",
    Shipped: "#1E90FF",
    Delivered: "#32CD32",
  };

  const orders = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    user: "User " + (i + 1),
    items: Math.floor(Math.random() * 10 + 1),
    amount: Math.floor(Math.random() * 100 + 20),
  }));

  return (
    <AdminLayout>
      <div className="content-area">
        {view === "graph" ? (
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#FF8C00" strokeWidth={3} />
          </LineChart>
        ) : (
          <div className="sales-table">
            <div className="table-header">
              <div>Order Number / Status</div>
              <div>User</div>
              <div>Number of Items</div>
              <div>Amount Spent</div>
            </div>
            {orders.map((order) => (
              <div
                key={order.id}
                className={`table-row ${selectedRowId === order.id ? "selected" : ""}`}
                onClick={() => handleRowSelect(order.id)}
              >
                <div
                  className="status-cell"
                  style={{ backgroundColor: statusColors[orderStatus[order.id]] || "#ccc" }}
                >
                  #{order.id + 1000}
                </div>
                <div>{order.user}</div>
                <div>{order.items}</div>
                <div>${order.amount}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="button-row">
        <button className="toggle-btn" onClick={toggleView}>
          {view === "table" ? "View Graph" : "View Data"}
        </button>
        <div className="status-indicators">
          {statuses.map((status) => (
            <button
              key={status}
              className="status-btn"
              style={{ backgroundColor: statusColors[status] }}
              onClick={() => handleStatusChange(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SalesUsers;
