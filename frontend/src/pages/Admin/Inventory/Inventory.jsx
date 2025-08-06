import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import "./Inventory.css";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [editedProducts, setEditedProducts] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/guest/products");
      setProducts(res.data.data.products);
    } catch (err) {
      console.error("Failed to fetch products", err.response?.data || err);
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFieldChange = (id, field, value) => {
    setEditedProducts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async () => {
    try {
      await Promise.all(
        selected.map((id) => {
          const product = editedProducts[id];
          if (!product) return;

          return axios.post(
            `http://localhost:8000/api/v1/admin/update-product/${id}`,
            product,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
      );

      alert("Products updated successfully");
      setSelected([]);
      setEditedProducts({});
      fetchProducts();
    } catch (err) {
      console.error(" Failed to update products", err.response?.data || err);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selected.map((id) =>
          axios.get(`http://localhost:8000/api/v1/admin/delete-product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      alert("🗑️ Products deleted successfully");
      setSelected([]);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete products", err.response?.data || err);
    }
  };

  return (
    <AdminLayout>
      <div className="content-area">
        <div className="inventory-table">
          <div className="inventory-header">
            <div></div>
            <div>Product Name</div>
            <div>Product Category</div>
            <div>Stock Number</div>
            <div>Price</div>
          </div>

          {products.map((product) => (
            <div className="inventory-row" key={product.id}>
              <div
                className={`circle ${selected.includes(product.id) ? "selected" : ""}`}
                onClick={() => toggleSelect(product.id)}
              >
                {selected.includes(product.id) && <span>✔</span>}
              </div>
              <div>
                <input
                  type="text"
                  value={editedProducts[product.id]?.name ?? product.name}
                  onChange={(e) =>
                    handleFieldChange(product.id, "name", e.target.value)
                  }
                />
              </div>
              <div>
                <input
                  type="text"
                  value={editedProducts[product.id]?.category ?? product.category}
                  onChange={(e) =>
                    handleFieldChange(product.id, "category", e.target.value)
                  }
                />
              </div>
              <div>
                <input
                  type="number"
                  value={editedProducts[product.id]?.stock ?? product.stock}
                  onChange={(e) =>
                    handleFieldChange(product.id, "stock", e.target.value)
                  }
                />
              </div>
              <div>
                <input
                  type="text"
                  value={editedProducts[product.id]?.price ?? product.price}
                  onChange={(e) =>
                    handleFieldChange(product.id, "price", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="button-row">
        <button className="update-btn" onClick={handleUpdate}>
          Update
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </AdminLayout>
  );
};

export default InventoryPage;
