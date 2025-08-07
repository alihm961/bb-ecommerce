import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import "./SalesUsers.css";

const SalesUsers = () => {
  const [view, setView] = useState("table");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [revenue, setRevenue] = useState(0);

  const [statusColors] = useState({
    Pending: "#FF8C00",
    Processing: "#FFD700",
    Shipped: "#1E90FF",
    Delivered: "#32CD32",
  });

  const statuses = Object.keys(statusColors);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (status) => {
  if (!selectedRowId) return;
  try {
    await axios.post(
      `http://localhost:8000/api/v1/admin/orders/${selectedRowId}`,
      { status },
      {
        headers: {
          Authorization:` Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedRowId ? { ...order, status } : order
      )
    );
  } catch (error) {
    console.error("Failed to update status:", error);
  }
};


  const fetchGraphData = async (date) => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/orders-analytics",
        {
          params: { date },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const perHour = res.data.data["orders per hour"];
      setRevenue(res.data.data["Revenue"]);

      setGraphData(
        perHour.map((hour) => ({
          name: hour.hour,
          revenue: hour.total_price,
        }))
      );
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const toggleView = () => {
    setView((prev) => (prev === "table" ? "graph" : "table"));
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchGraphData(date);
  };

  useEffect(() => {
    fetchOrders();
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    fetchGraphData(today);
  }, []);

  return (
    <AdminLayout>
      <div className="content-area">
        {view === "graph" ? (
          <div className="graph-section">
            <div className="graph-controls">
              <label>
                Select Date:{" "}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </label>
              <div className="revenue-display">Revenue: ${revenue}</div>
            </div>
            <LineChart
              width={800}
              height={400}
              data={graphData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FF8C00"
                strokeWidth={3}
              />
            </LineChart>
          </div>
        ) : (
          <div className="sales-table">
            <div className="table-header">
              <div>Order ID / Status</div>
              <div>User</div>
              <div>Items</div>
              <div>Amount</div>
            </div>
            {orders.map((order) => (
              <div
                key={order.id}
                className={`table-row ${
                  selectedRowId === order.id ? "selected" : ""
                }`}
                onClick={() => setSelectedRowId(order.id)}
              >
                <div
                  className="status-cell"
                  style={{
                    backgroundColor: statusColors[order.status] || "#ccc",
                  }}
                >
                  #{order.id}
                </div>
                <div>{order.user?.name || "Unknown"}</div>
                <div>{order.items_count}</div>
                <div>${order.price}</div>
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
              onClick={() => updateOrderStatus(status)}
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