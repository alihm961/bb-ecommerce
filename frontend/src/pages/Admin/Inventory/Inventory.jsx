import React, { useState } from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import "./Inventory.css"; 

const sampleData = [
  { id: 1, name: "Laptop", category: "Electronics", stock: 25, price: "$1000" },
  { id: 2, name: "Phone", category: "Electronics", stock: 50, price: "$700" },
  { id: 3, name: "Headphones", category: "Accessories", stock: 75, price: "$150" },
  { id: 4, name: "Keyboard", category: "Peripherals", stock: 30, price: "$80" },
  { id: 5, name: "Monitor", category: "Displays", stock: 20, price: "$300" },
  { id: 6, name: "Chair", category: "Furniture", stock: 10, price: "$250" },
  { id: 7, name: "Mouse", category: "Peripherals", stock: 60, price: "$50" },
  { id: 8, name: "Tablet", category: "Electronics", stock: 15, price: "$500" },
  { id: 9, name: "Webcam", category: "Peripherals", stock: 40, price: "$120" },
  { id: 10, name: "Router", category: "Networking", stock: 18, price: "$90" }
];

const InventoryPage = () => {
  const [products, setProducts] = useState(sampleData);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = () => {
    setProducts(products.filter((product) => !selected.includes(product.id)));
    setSelected([]);
  };

  const handleUpdate = () => {
    alert("Update action for selected IDs: " + selected.join(", "));
    // Implement actual update logic here
  };

  return (
    <AdminLayout>
      <div className="content-area">
        <div className="inventory-table">
          <div className="inventory-header">
            <div></div>
            <div>Product Name:</div>
            <div>Product Category:</div>
            <div>Stock Number:</div>
            <div>Price:</div>
          </div>
          {products.map((product) => (
            <div className="inventory-row" key={product.id}>
              <div
                className={`circle ${selected.includes(product.id) ? "selected" : ""}`}
                onClick={() => toggleSelect(product.id)}
              >
                {selected.includes(product.id) && <span>✔</span>}
              </div>
              <div><input type="text" value={product.name} readOnly /></div>
              <div><input type="text" value={product.category} readOnly /></div>
              <div><input type="number" value={product.stock} readOnly /></div>
              <div><input type="text" value={product.price} readOnly /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="button-row">
        <button className="update-btn" onClick={handleUpdate}>Update</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </AdminLayout>
  );
};

export default InventoryPage;
